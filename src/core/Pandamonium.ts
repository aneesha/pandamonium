import * as Blockly from 'blockly';
import { registerPandasBlocks } from '../blocks/pandas';
import { registerSklearnBlocks } from '../blocks/sklearn';
import { registerCommonBlocks } from '../blocks/common';
import { pythonGenerator, PythonGenerator } from '../generators/python';
import { defaultToolbox } from './toolbox';
import type { PandamoniumConfig } from './types';

export class Pandamonium {
  private workspace: Blockly.WorkspaceSvg | null = null;
  private container: HTMLElement;
  private config: PandamoniumConfig;
  private generator: PythonGenerator;
  private onChangeCallbacks: Array<(code: string) => void> = [];

  constructor(config: PandamoniumConfig) {
    this.config = config;
    this.container = config.container;
    this.generator = pythonGenerator;

    this.registerBlocks();
    this.initWorkspace();
  }

  private registerBlocks(): void {
    registerPandasBlocks();
    registerSklearnBlocks();
    registerCommonBlocks();
  }

  private initWorkspace(): void {
    const toolbox = this.config.toolbox || defaultToolbox;

    this.workspace = Blockly.inject(this.container, {
      toolbox,
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      readOnly: this.config.readOnly || false,
      theme: this.config.theme
    });

    this.workspace.addChangeListener(() => {
      const code = this.generateCode();
      this.onChangeCallbacks.forEach(cb => cb(code));
    });
  }

  generateCode(): string {
    if (!this.workspace) return '';
    return this.generator.generateCode(this.workspace);
  }

  getWorkspace(): Blockly.WorkspaceSvg | null {
    return this.workspace;
  }

  onChange(callback: (code: string) => void): void {
    this.onChangeCallbacks.push(callback);
  }

  offChange(callback: (code: string) => void): void {
    const index = this.onChangeCallbacks.indexOf(callback);
    if (index > -1) {
      this.onChangeCallbacks.splice(index, 1);
    }
  }

  loadWorkspace(json: object): void {
    if (!this.workspace) return;
    Blockly.serialization.workspaces.load(json, this.workspace);
  }

  saveWorkspace(): object {
    if (!this.workspace) return {};
    return Blockly.serialization.workspaces.save(this.workspace);
  }

  clearWorkspace(): void {
    if (!this.workspace) return;
    this.workspace.clear();
  }

  resize(): void {
    if (!this.workspace) return;
    Blockly.svgResize(this.workspace);
  }

  dispose(): void {
    if (this.workspace) {
      this.workspace.dispose();
      this.workspace = null;
    }
    this.onChangeCallbacks = [];
  }

  undo(): void {
    if (!this.workspace) return;
    this.workspace.undo(false);
  }

  redo(): void {
    if (!this.workspace) return;
    this.workspace.undo(true);
  }

  setReadOnly(readOnly: boolean): void {
    if (!this.workspace) return;
    this.workspace.options.readOnly = readOnly;
  }
}
