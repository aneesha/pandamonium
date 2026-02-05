import type Blockly from 'blockly';

export interface BlockDefinition {
  type: string;
  message0: string;
  args0?: Blockly.BlockSvg['inputList'][number]['fieldRow'];
  output?: string | string[] | null;
  previousStatement?: string | string[] | null;
  nextStatement?: string | string[] | null;
  colour: number;
  tooltip: string;
  helpUrl?: string;
  inputsInline?: boolean;
  mutator?: string;
}

export interface PandamoniumConfig {
  container: HTMLElement;
  toolbox?: Blockly.utils.toolbox.ToolboxDefinition;
  readOnly?: boolean;
  theme?: Blockly.Theme;
}

export interface GeneratedCode {
  code: string;
  imports: Set<string>;
}

export type BlockGenerator = (block: Blockly.Block) => string | [string, number];
