import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  DataTexture,
  MathUtils,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";
import type { Variable } from "three/examples/jsm/misc/GPUComputationRenderer.js";

const PARTICLE_SIDE = 256;
const PARTICLE_BOUND = 140;

const POSITION_FRAGMENT_SHADER = `
uniform float deltaTime;
uniform float bounds;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 positionState = texture2D(texturePosition, uv);
  vec3 velocity = texture2D(textureVelocity, uv).xyz;

  vec3 nextPos = positionState.xyz + velocity * deltaTime;
  nextPos = clamp(nextPos, vec3(-bounds), vec3(bounds));

  gl_FragColor = vec4(nextPos, 1.0);
}
`;

const VELOCITY_FRAGMENT_SHADER = `
uniform float time;
uniform float speed;
uniform float drag;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 pos = texture2D(texturePosition, uv).xyz * 0.01;

  float a = 0.12;
  float dx = -a * pos.x + sin(pos.y + time * 0.05);
  float dy = -a * pos.y + sin(pos.z + time * 0.05);
  float dz = -a * pos.z + sin(pos.x + time * 0.05);

  vec3 target = vec3(dx, dy, dz) * speed * 20.0;
  vec3 current = texture2D(textureVelocity, uv).xyz;
  vec3 velocity = mix(current, target, drag);

  gl_FragColor = vec4(velocity, 1.0);
}
`;

const PARTICLE_VERTEX_SHADER = `
uniform sampler2D texturePosition;
uniform float pointSize;
varying float vDepth;

void main() {
  vec3 pos = texture2D(texturePosition, position.xy).xyz;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mvPosition.z;
  gl_PointSize = pointSize * (1.0 + vDepth * 0.003);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const PARTICLE_FRAGMENT_SHADER = `
varying float vDepth;

void main() {
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);
  if (r > 1.0) discard;

  float falloff = smoothstep(1.0, 0.2, r);
  float glow = clamp(vDepth * 0.004, 0.0, 1.0);
  vec3 violet = vec3(0.78, 0.55, 0.98);
  vec3 magenta = vec3(0.42, 0.18, 0.78);
  vec3 color = mix(magenta, violet, glow);

  gl_FragColor = vec4(color, falloff * 0.82);
}
`;

type ComputeContext = {
  gpuCompute: GPUComputationRenderer;
  positionVariable: Variable;
  velocityVariable: Variable;
};

function fillPositionTexture(texture: DataTexture) {
  const data = texture.image.data as Float32Array;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = (Math.random() - 0.5) * PARTICLE_BOUND;
    data[i + 1] = (Math.random() - 0.5) * PARTICLE_BOUND;
    data[i + 2] = (Math.random() - 0.5) * PARTICLE_BOUND;
    data[i + 3] = 1;
  }
}

function fillVelocityTexture(texture: DataTexture) {
  const data = texture.image.data as Float32Array;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = MathUtils.randFloatSpread(4);
    data[i + 1] = MathUtils.randFloatSpread(4);
    data[i + 2] = MathUtils.randFloatSpread(4);
    data[i + 3] = 1;
  }
}

function initCompute(renderer: WebGLRenderer): ComputeContext {
  const gpuCompute = new GPUComputationRenderer(
    PARTICLE_SIDE,
    PARTICLE_SIDE,
    renderer,
  );

  const dtPosition = gpuCompute.createTexture();
  const dtVelocity = gpuCompute.createTexture();
  fillPositionTexture(dtPosition);
  fillVelocityTexture(dtVelocity);

  const positionVariable = gpuCompute.addVariable(
    "texturePosition",
    POSITION_FRAGMENT_SHADER,
    dtPosition,
  );

  const velocityVariable = gpuCompute.addVariable(
    "textureVelocity",
    VELOCITY_FRAGMENT_SHADER,
    dtVelocity,
  );

  gpuCompute.setVariableDependencies(positionVariable, [
    positionVariable,
    velocityVariable,
  ]);
  gpuCompute.setVariableDependencies(velocityVariable, [
    velocityVariable,
    positionVariable,
  ]);

  positionVariable.material.uniforms["deltaTime"] = { value: 0.016 };
  positionVariable.material.uniforms["bounds"] = { value: PARTICLE_BOUND };

  velocityVariable.material.uniforms["time"] = { value: 0 };
  velocityVariable.material.uniforms["speed"] = { value: 0.8 };
  velocityVariable.material.uniforms["drag"] = { value: 0.35 };

  const error = gpuCompute.init();
  if (error) {
    throw new Error(error);
  }

  return { gpuCompute, positionVariable, velocityVariable };
}

function createParticleMesh() {
  const geometry = new BufferGeometry();
  const references = new Float32Array(PARTICLE_SIDE * PARTICLE_SIDE * 3);
  for (let i = 0; i < PARTICLE_SIDE * PARTICLE_SIDE; i += 1) {
    references[i * 3] = (i % PARTICLE_SIDE) / PARTICLE_SIDE;
    references[i * 3 + 1] = Math.floor(i / PARTICLE_SIDE) / PARTICLE_SIDE;
    references[i * 3 + 2] = 0;
  }
  geometry.setAttribute("position", new BufferAttribute(references, 3));

  const material = new ShaderMaterial({
    uniforms: {
      texturePosition: { value: null },
      pointSize: { value: 2.6 },
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexShader: PARTICLE_VERTEX_SHADER,
    fragmentShader: PARTICLE_FRAGMENT_SHADER,
  });

  return { mesh: new Points(geometry, material), material, geometry };
}

/**
 * Mounts the WebGL particle system and returns a cleanup function.
 */
export function initWebGLParticles(container: HTMLDivElement): () => void {
  let renderer: WebGLRenderer | null = null;
  let scene: Scene | null = null;
  let camera: PerspectiveCamera | null = null;
  let frameId = 0;
  let resizeObserver: ResizeObserver | null = null;

  const clock = new Clock();

  try {
    renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch (error) {
    console.error("Unable to initialize WebGLRenderer", error);
    return () => undefined;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(new Color(0x020208), 0);

  const setRendererSize = () => {
    if (!renderer || !camera) return;
    const { clientWidth, clientHeight } = container;
    renderer.setSize(clientWidth, clientHeight);
    camera.aspect = clientWidth / clientHeight || 1;
    camera.updateProjectionMatrix();
  };

  scene = new Scene();
  camera = new PerspectiveCamera(55, 1, 0.1, 1000);
  camera.position.set(0, 0, 260);

  const { gpuCompute, positionVariable, velocityVariable } = initCompute(
    renderer,
  );
  const particleBundle = createParticleMesh();
  scene.add(particleBundle.mesh);

  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  container.appendChild(renderer.domElement);
  setRendererSize();

  const animate = () => {
    if (!renderer || !scene || !camera) return;
    const deltaTime = Math.min(clock.getDelta(), 0.05);
    positionVariable.material.uniforms["deltaTime"].value = deltaTime;
    velocityVariable.material.uniforms["time"].value += deltaTime;

    gpuCompute.compute();

    const positionTexture =
      gpuCompute.getCurrentRenderTarget(positionVariable).texture;
    particleBundle.material.uniforms["texturePosition"].value = positionTexture;

    camera.position.lerp(new Vector3(0, 0, 260), deltaTime * 0.2);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  };

  animate();

  resizeObserver = new ResizeObserver(() => setRendererSize());
  resizeObserver.observe(container);

  return () => {
    cancelAnimationFrame(frameId);
    resizeObserver?.disconnect();
    if (container.contains(renderer!.domElement)) {
      container.removeChild(renderer!.domElement);
    }
    particleBundle.geometry.dispose();
    particleBundle.material.dispose();
    renderer?.dispose();
    scene = null;
    camera = null;
    renderer = null;
  };
}

