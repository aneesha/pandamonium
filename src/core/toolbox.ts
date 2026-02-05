import type Blockly from 'blockly';

// Color scheme matching playground
const COLORS = {
  data: '#E65C00',
  transform: '#FB8C00',
  ml_prep: '#00897B',
  ml_model: '#5C6BC0',
  ml_eval: '#EF5350',
  output: '#8E24AA'
};

export const defaultToolbox: Blockly.utils.toolbox.ToolboxDefinition = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: '📂 Load Data',
      colour: COLORS.data,
      contents: [
        { kind: 'block', type: 'load_data' },
        { kind: 'block', type: 'preview_data' }
      ]
    },
    {
      kind: 'category',
      name: '🔧 Transform',
      colour: COLORS.transform,
      contents: [
        { kind: 'block', type: 'select_columns' },
        { kind: 'block', type: 'filter_rows' },
        { kind: 'block', type: 'handle_missing' },
        { kind: 'block', type: 'sort_data' },
        { kind: 'block', type: 'group_summarize' },
        { kind: 'block', type: 'merge_data' }
      ]
    },
    {
      kind: 'category',
      name: '🎯 ML Prep',
      colour: COLORS.ml_prep,
      contents: [
        { kind: 'block', type: 'prepare_features' },
        { kind: 'block', type: 'split_data' },
        { kind: 'block', type: 'scale_features' }
      ]
    },
    {
      kind: 'category',
      name: '🤖 Models',
      colour: COLORS.ml_model,
      contents: [
        { kind: 'block', type: 'create_model' },
        { kind: 'block', type: 'train_model' },
        { kind: 'block', type: 'predict' },
        { kind: 'block', type: 'grid_search' },
        { kind: 'block', type: 'cross_validate' }
      ]
    },
    {
      kind: 'category',
      name: '📊 Evaluate',
      colour: COLORS.ml_eval,
      contents: [
        { kind: 'block', type: 'evaluate' }
      ]
    },
    {
      kind: 'category',
      name: '📤 Output',
      colour: COLORS.output,
      contents: [
        { kind: 'block', type: 'output' },
        { kind: 'block', type: 'comment' }
      ]
    }
  ]
};
