import * as Blockly from 'blockly';

const STRING_COLOR = 260;
const ARRAY_COLOR = 280;
const DICT_COLOR = 300;
const LOGIC_COLOR = 210;

export const commonBlocks: Record<string, object> = {
  // String blocks
  text_value: {
    type: 'text_value',
    message0: '"%1"',
    args0: [
      { type: 'field_input', name: 'TEXT', text: '' }
    ],
    output: 'String',
    colour: STRING_COLOR,
    tooltip: 'A text string',
    helpUrl: ''
  },

  // Number blocks
  number_value: {
    type: 'number_value',
    message0: '%1',
    args0: [
      { type: 'field_number', name: 'NUM', value: 0 }
    ],
    output: 'Number',
    colour: 230,
    tooltip: 'A number',
    helpUrl: ''
  },

  // Array/List blocks
  array_create: {
    type: 'array_create',
    message0: 'list %1',
    args0: [
      { type: 'field_input', name: 'ITEMS', text: 'item1, item2, item3' }
    ],
    output: 'Array',
    colour: ARRAY_COLOR,
    tooltip: 'Create a list of items (comma-separated)',
    helpUrl: ''
  },

  array_create_with: {
    type: 'array_create_with',
    message0: 'list of strings %1',
    args0: [
      { type: 'field_input', name: 'ITEMS', text: 'col1, col2' }
    ],
    output: 'Array',
    colour: ARRAY_COLOR,
    tooltip: 'Create a list of strings (comma-separated)',
    helpUrl: ''
  },

  array_length: {
    type: 'array_length',
    message0: 'length of %1',
    args0: [
      { type: 'input_value', name: 'ARRAY', check: 'Array' }
    ],
    output: 'Number',
    colour: ARRAY_COLOR,
    tooltip: 'Get length of an array',
    helpUrl: ''
  },

  // Dictionary blocks
  dict_create: {
    type: 'dict_create',
    message0: 'dict { %1 }',
    args0: [
      { type: 'field_input', name: 'ITEMS', text: 'key1: value1, key2: value2' }
    ],
    output: 'Dict',
    colour: DICT_COLOR,
    tooltip: 'Create a dictionary (key: value pairs)',
    helpUrl: ''
  },

  dict_get: {
    type: 'dict_get',
    message0: 'get %1 from %2',
    args0: [
      { type: 'input_value', name: 'KEY', check: 'String' },
      { type: 'input_value', name: 'DICT', check: 'Dict' }
    ],
    output: null,
    colour: DICT_COLOR,
    tooltip: 'Get value from dictionary by key',
    helpUrl: ''
  },

  // Boolean blocks
  boolean_value: {
    type: 'boolean_value',
    message0: '%1',
    args0: [
      { type: 'field_dropdown', name: 'BOOL', options: [
        ['True', 'True'],
        ['False', 'False']
      ]}
    ],
    output: 'Boolean',
    colour: LOGIC_COLOR,
    tooltip: 'Boolean value',
    helpUrl: ''
  },

  logic_compare: {
    type: 'logic_compare',
    message0: '%1 %2 %3',
    args0: [
      { type: 'input_value', name: 'A' },
      { type: 'field_dropdown', name: 'OP', options: [
        ['=', '=='],
        ['≠', '!='],
        ['<', '<'],
        ['≤', '<='],
        ['>', '>'],
        ['≥', '>=']
      ]},
      { type: 'input_value', name: 'B' }
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: LOGIC_COLOR,
    tooltip: 'Compare two values',
    helpUrl: ''
  },

  logic_operation: {
    type: 'logic_operation',
    message0: '%1 %2 %3',
    args0: [
      { type: 'input_value', name: 'A', check: 'Boolean' },
      { type: 'field_dropdown', name: 'OP', options: [
        ['and', 'and'],
        ['or', 'or']
      ]},
      { type: 'input_value', name: 'B', check: 'Boolean' }
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: LOGIC_COLOR,
    tooltip: 'Logical operation',
    helpUrl: ''
  },

  logic_not: {
    type: 'logic_not',
    message0: 'not %1',
    args0: [
      { type: 'input_value', name: 'BOOL', check: 'Boolean' }
    ],
    output: 'Boolean',
    colour: LOGIC_COLOR,
    tooltip: 'Negate boolean',
    helpUrl: ''
  },

  // Math operations
  math_arithmetic: {
    type: 'math_arithmetic',
    message0: '%1 %2 %3',
    args0: [
      { type: 'input_value', name: 'A', check: 'Number' },
      { type: 'field_dropdown', name: 'OP', options: [
        ['+', 'ADD'],
        ['-', 'MINUS'],
        ['×', 'MULTIPLY'],
        ['÷', 'DIVIDE'],
        ['^', 'POWER']
      ]},
      { type: 'input_value', name: 'B', check: 'Number' }
    ],
    inputsInline: true,
    output: 'Number',
    colour: 230,
    tooltip: 'Arithmetic operation',
    helpUrl: ''
  },

  // Function/Lambda
  lambda_simple: {
    type: 'lambda_simple',
    message0: 'lambda x: %1',
    args0: [
      { type: 'field_input', name: 'EXPR', text: 'x * 2' }
    ],
    output: 'Function',
    colour: 320,
    tooltip: 'Create a simple lambda function',
    helpUrl: ''
  },

  // Comment block
  comment_block: {
    type: 'comment_block',
    message0: '# %1',
    args0: [
      { type: 'field_input', name: 'COMMENT', text: 'comment' }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: 'Add a comment to the code',
    helpUrl: ''
  },

  // Variable assignment
  var_set: {
    type: 'var_set',
    message0: 'set %1 = %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'x' },
      { type: 'input_value', name: 'VALUE' }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: 'Set a variable',
    helpUrl: ''
  },

  var_get: {
    type: 'var_get',
    message0: '%1',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'x' }
    ],
    output: null,
    colour: 330,
    tooltip: 'Get a variable',
    helpUrl: ''
  },

  // None/null
  none_value: {
    type: 'none_value',
    message0: 'None',
    output: null,
    colour: 120,
    tooltip: 'Python None value',
    helpUrl: ''
  }
};

export function registerCommonBlocks(): void {
  Object.entries(commonBlocks).forEach(([name, definition]) => {
    Blockly.Blocks[name] = {
      init: function(this: Blockly.Block) {
        this.jsonInit(definition);
      }
    };
  });
}
