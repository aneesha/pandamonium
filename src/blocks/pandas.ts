import * as Blockly from 'blockly';

// Color scheme matching playground
const COLORS = {
  data: '#E65C00',
  transform: '#FB8C00'
};

export const pandasBlocks: Record<string, object> = {
  // --- DATA LOADING ---
  load_data: {
    type: 'load_data',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Load')
        .appendField(new Blockly.FieldDropdown([
          ['CSV', 'csv'],
          ['Excel', 'excel'],
          ['JSON', 'json'],
          ['from URL', 'url']
        ]), 'TYPE')
        .appendField('→')
        .appendField(new Blockly.FieldTextInput('df'), 'VAR');
      this.appendDummyInput()
        .appendField('Path:')
        .appendField(new Blockly.FieldTextInput('data.csv'), 'PATH');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.data);
      this.setTooltip('Load data from file into a DataFrame');
    }
  },

  // --- DATA PREVIEW ---
  preview_data: {
    type: 'preview_data',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Preview')
        .appendField(new Blockly.FieldTextInput('df'), 'VAR')
        .appendField(':')
        .appendField(new Blockly.FieldDropdown([
          ['first rows', 'head'],
          ['last rows', 'tail'],
          ['statistics', 'describe'],
          ['shape', 'shape'],
          ['columns', 'columns'],
          ['data types', 'dtypes'],
          ['info', 'info'],
          ['sample', 'sample']
        ]), 'TYPE')
        .appendField(new Blockly.FieldNumber(5, 1, 100), 'N');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.data);
      this.setTooltip('Preview data in different ways');
    }
  },

  // --- SELECT COLUMNS ---
  select_columns: {
    type: 'select_columns',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['Keep columns', 'keep'],
          ['Drop columns', 'drop']
        ]), 'ACTION')
        .appendField('from')
        .appendField(new Blockly.FieldTextInput('df'), 'VAR');
      this.appendDummyInput()
        .appendField('Columns:')
        .appendField(new Blockly.FieldTextInput('col1, col2'), 'COLUMNS');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.transform);
      this.setTooltip('Keep or drop specific columns');
    }
  },

  // --- FILTER ROWS ---
  filter_rows: {
    type: 'filter_rows',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Filter')
        .appendField(new Blockly.FieldTextInput('df'), 'VAR')
        .appendField('where');
      this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('column'), 'COLUMN')
        .appendField(new Blockly.FieldDropdown([
          ['==', '=='],
          ['!=', '!='],
          ['>', '>'],
          ['<', '<'],
          ['>=', '>='],
          ['<=', '<='],
          ['contains', 'contains'],
          ['is null', 'isnull'],
          ['not null', 'notnull']
        ]), 'OP')
        .appendField(new Blockly.FieldTextInput('value'), 'VALUE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.transform);
      this.setTooltip('Filter rows based on condition');
    }
  },

  // --- HANDLE MISSING ---
  handle_missing: {
    type: 'handle_missing',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Handle missing in')
        .appendField(new Blockly.FieldTextInput('df'), 'VAR');
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['Drop rows with nulls', 'drop'],
          ['Fill with value', 'value'],
          ['Fill with mean', 'mean'],
          ['Fill with median', 'median'],
          ['Fill with mode', 'mode'],
          ['Forward fill', 'ffill'],
          ['Backward fill', 'bfill']
        ]), 'METHOD')
        .appendField(new Blockly.FieldTextInput('0'), 'FILL_VALUE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.transform);
      this.setTooltip('Handle missing values');
    }
  },

  // --- SORT DATA ---
  sort_data: {
    type: 'sort_data',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Sort')
        .appendField(new Blockly.FieldTextInput('df'), 'VAR')
        .appendField('by')
        .appendField(new Blockly.FieldTextInput('column'), 'COLUMN')
        .appendField(new Blockly.FieldDropdown([
          ['ascending', 'True'],
          ['descending', 'False']
        ]), 'ORDER');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.transform);
      this.setTooltip('Sort data by column');
    }
  },

  // --- GROUP & SUMMARIZE ---
  group_summarize: {
    type: 'group_summarize',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Group')
        .appendField(new Blockly.FieldTextInput('df'), 'VAR')
        .appendField('by')
        .appendField(new Blockly.FieldTextInput('group_col'), 'GROUP_COL');
      this.appendDummyInput()
        .appendField('Calc')
        .appendField(new Blockly.FieldDropdown([
          ['sum', 'sum'],
          ['mean', 'mean'],
          ['count', 'count'],
          ['min', 'min'],
          ['max', 'max'],
          ['median', 'median'],
          ['std', 'std']
        ]), 'AGG')
        .appendField('of')
        .appendField(new Blockly.FieldTextInput('value_col'), 'VALUE_COL')
        .appendField('→')
        .appendField(new Blockly.FieldTextInput('result'), 'RESULT_VAR');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.transform);
      this.setTooltip('Group by column and aggregate');
    }
  },

  // --- MERGE DATA ---
  merge_data: {
    type: 'merge_data',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Merge')
        .appendField(new Blockly.FieldTextInput('df1'), 'LEFT')
        .appendField('with')
        .appendField(new Blockly.FieldTextInput('df2'), 'RIGHT');
      this.appendDummyInput()
        .appendField('On:')
        .appendField(new Blockly.FieldTextInput('key'), 'ON')
        .appendField('How:')
        .appendField(new Blockly.FieldDropdown([
          ['inner', 'inner'],
          ['left', 'left'],
          ['right', 'right'],
          ['outer', 'outer']
        ]), 'HOW')
        .appendField('→')
        .appendField(new Blockly.FieldTextInput('merged'), 'RESULT');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.transform);
      this.setTooltip('Merge two DataFrames');
    }
  }
};

export function registerPandasBlocks(): void {
  Object.entries(pandasBlocks).forEach(([name, definition]) => {
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
