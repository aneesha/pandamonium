import * as Blockly from 'blockly';

// Color scheme matching playground
const COLORS = {
  output: '#8E24AA',
  comment: 160
};

export const commonBlocks: Record<string, object> = {
  // --- OUTPUT ---
  output: {
    type: 'output',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['Print', 'print'],
          ['Save as CSV', 'csv'],
          ['Save as Excel', 'excel']
        ]), 'TYPE')
        .appendField(new Blockly.FieldTextInput('df'), 'VAR');
      this.appendDummyInput()
        .appendField('Path:')
        .appendField(new Blockly.FieldTextInput('output.csv'), 'PATH');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.output);
      this.setTooltip('Output data');
    }
  },

  // --- COMMENT ---
  comment: {
    type: 'comment',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('#')
        .appendField(new Blockly.FieldTextInput('comment'), 'TEXT');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.comment);
      this.setTooltip('Add a comment');
    }
  }
};

export function registerCommonBlocks(): void {
  Object.entries(commonBlocks).forEach(([name, definition]) => {
    if (typeof (definition as any).init === 'function') {
      Blockly.Blocks[name] = {
        init: (definition as any).init
      };
    } else {
      Blockly.Blocks[name] = {
        init: function(this: Blockly.Block) {
          this.jsonInit(definition);
        }
      };
    }
  });
}
