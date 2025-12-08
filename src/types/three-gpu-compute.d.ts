import * as THREE from "three";

declare module "three/examples/jsm/misc/GPUComputationRenderer.js" {
  export class GPUComputationRendererVariable {
    name: string;
    initialValueTexture: THREE.DataTexture;
    material: THREE.ShaderMaterial;
    dependencies: GPUComputationRendererVariable[];
  }

  export class GPUComputationRenderer {
    constructor(width: number, height: number, renderer: THREE.WebGLRenderer);
    compute(): void;
    init(): string | null;
    addVariable(
      variableName: string,
      fragmentShader: string,
      initialValueTexture: THREE.DataTexture,
    ): GPUComputationRendererVariable;
    setVariableDependencies(
      variable: GPUComputationRendererVariable,
      dependencies: GPUComputationRendererVariable[],
    ): void;
    getCurrentRenderTarget(
      variable: GPUComputationRendererVariable,
    ): THREE.WebGLRenderTarget;
    createTexture(): THREE.DataTexture;
  }
}

