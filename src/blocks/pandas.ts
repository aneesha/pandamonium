import * as Blockly from 'blockly';

const PANDAS_COLOR = 20;

export const pandasBlocks: Record<string, object> = {
  // Data Loading
  pandas_read_csv: {
    type: 'pandas_read_csv',
    message0: 'read CSV from %1',
    args0: [
      { type: 'input_value', name: 'PATH', check: 'String' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Read a CSV file into a DataFrame',
    helpUrl: ''
  },

  pandas_read_excel: {
    type: 'pandas_read_excel',
    message0: 'read Excel from %1 sheet %2',
    args0: [
      { type: 'input_value', name: 'PATH', check: 'String' },
      { type: 'input_value', name: 'SHEET', check: 'String' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Read an Excel file into a DataFrame',
    helpUrl: ''
  },

  pandas_read_json: {
    type: 'pandas_read_json',
    message0: 'read JSON from %1',
    args0: [
      { type: 'input_value', name: 'PATH', check: 'String' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Read a JSON file into a DataFrame',
    helpUrl: ''
  },

  // DataFrame Creation
  pandas_create_dataframe: {
    type: 'pandas_create_dataframe',
    message0: 'create DataFrame from %1',
    args0: [
      { type: 'input_value', name: 'DATA', check: 'Dict' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Create a DataFrame from a dictionary',
    helpUrl: ''
  },

  pandas_dataframe_var: {
    type: 'pandas_dataframe_var',
    message0: 'DataFrame %1',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'df' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Reference a DataFrame variable',
    helpUrl: ''
  },

  pandas_set_dataframe: {
    type: 'pandas_set_dataframe',
    message0: 'set %1 to %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'df' },
      { type: 'input_value', name: 'VALUE', check: 'DataFrame' }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: PANDAS_COLOR,
    tooltip: 'Assign a DataFrame to a variable',
    helpUrl: ''
  },

  // Column Operations
  pandas_select_columns: {
    type: 'pandas_select_columns',
    message0: 'select columns %1 from %2',
    args0: [
      { type: 'input_value', name: 'COLUMNS', check: 'Array' },
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Select specific columns from a DataFrame',
    helpUrl: ''
  },

  pandas_select_column: {
    type: 'pandas_select_column',
    message0: 'column %1 from %2',
    args0: [
      { type: 'input_value', name: 'COLUMN', check: 'String' },
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'Series',
    colour: PANDAS_COLOR,
    tooltip: 'Select a single column as a Series',
    helpUrl: ''
  },

  pandas_drop_columns: {
    type: 'pandas_drop_columns',
    message0: 'drop columns %1 from %2',
    args0: [
      { type: 'input_value', name: 'COLUMNS', check: 'Array' },
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Drop columns from a DataFrame',
    helpUrl: ''
  },

  pandas_rename_columns: {
    type: 'pandas_rename_columns',
    message0: 'rename columns %1 in %2',
    args0: [
      { type: 'input_value', name: 'MAPPING', check: 'Dict' },
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Rename columns in a DataFrame',
    helpUrl: ''
  },

  // Row Operations
  pandas_head: {
    type: 'pandas_head',
    message0: 'first %1 rows of %2',
    args0: [
      { type: 'field_number', name: 'N', value: 5, min: 1 },
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Get the first n rows',
    helpUrl: ''
  },

  pandas_tail: {
    type: 'pandas_tail',
    message0: 'last %1 rows of %2',
    args0: [
      { type: 'field_number', name: 'N', value: 5, min: 1 },
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Get the last n rows',
    helpUrl: ''
  },

  pandas_sample: {
    type: 'pandas_sample',
    message0: 'sample %1 rows from %2',
    args0: [
      { type: 'field_number', name: 'N', value: 5, min: 1 },
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Random sample of rows',
    helpUrl: ''
  },

  // Filtering
  pandas_filter: {
    type: 'pandas_filter',
    message0: 'filter %1 where %2',
    args0: [
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' },
      { type: 'input_value', name: 'CONDITION', check: 'Condition' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Filter DataFrame rows based on condition',
    helpUrl: ''
  },

  pandas_condition: {
    type: 'pandas_condition',
    message0: '%1 %2 %3',
    args0: [
      { type: 'input_value', name: 'COLUMN', check: 'Series' },
      { type: 'field_dropdown', name: 'OP', options: [
        ['==', '=='],
        ['!=', '!='],
        ['>', '>'],
        ['<', '<'],
        ['>=', '>='],
        ['<=', '<=']
      ]},
      { type: 'input_value', name: 'VALUE' }
    ],
    output: 'Condition',
    colour: PANDAS_COLOR,
    tooltip: 'Create a filter condition',
    helpUrl: ''
  },

  pandas_isnull: {
    type: 'pandas_isnull',
    message0: '%1 is null',
    args0: [
      { type: 'input_value', name: 'COLUMN', check: 'Series' }
    ],
    output: 'Condition',
    colour: PANDAS_COLOR,
    tooltip: 'Check for null values',
    helpUrl: ''
  },

  pandas_notnull: {
    type: 'pandas_notnull',
    message0: '%1 is not null',
    args0: [
      { type: 'input_value', name: 'COLUMN', check: 'Series' }
    ],
    output: 'Condition',
    colour: PANDAS_COLOR,
    tooltip: 'Check for non-null values',
    helpUrl: ''
  },

  pandas_dropna: {
    type: 'pandas_dropna',
    message0: 'drop null rows from %1',
    args0: [
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Drop rows with null values',
    helpUrl: ''
  },

  pandas_fillna: {
    type: 'pandas_fillna',
    message0: 'fill null values in %1 with %2',
    args0: [
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' },
      { type: 'input_value', name: 'VALUE' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Fill null values with a specified value',
    helpUrl: ''
  },

  // Aggregation
  pandas_groupby: {
    type: 'pandas_groupby',
    message0: 'group %1 by %2',
    args0: [
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' },
      { type: 'input_value', name: 'COLUMNS', check: ['String', 'Array'] }
    ],
    output: 'GroupBy',
    colour: PANDAS_COLOR,
    tooltip: 'Group DataFrame by columns',
    helpUrl: ''
  },

  pandas_agg: {
    type: 'pandas_agg',
    message0: 'aggregate %1 with %2',
    args0: [
      { type: 'input_value', name: 'GROUPED', check: 'GroupBy' },
      { type: 'field_dropdown', name: 'FUNC', options: [
        ['sum', 'sum'],
        ['mean', 'mean'],
        ['median', 'median'],
        ['min', 'min'],
        ['max', 'max'],
        ['count', 'count'],
        ['std', 'std'],
        ['var', 'var']
      ]}
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Apply aggregation function',
    helpUrl: ''
  },

  // Statistics
  pandas_describe: {
    type: 'pandas_describe',
    message0: 'describe %1',
    args0: [
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Generate descriptive statistics',
    helpUrl: ''
  },

  pandas_value_counts: {
    type: 'pandas_value_counts',
    message0: 'value counts of %1',
    args0: [
      { type: 'input_value', name: 'SERIES', check: 'Series' }
    ],
    output: 'Series',
    colour: PANDAS_COLOR,
    tooltip: 'Count unique values',
    helpUrl: ''
  },

  pandas_corr: {
    type: 'pandas_corr',
    message0: 'correlation matrix of %1',
    args0: [
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Compute correlation matrix',
    helpUrl: ''
  },

  // Sorting
  pandas_sort_values: {
    type: 'pandas_sort_values',
    message0: 'sort %1 by %2 %3',
    args0: [
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' },
      { type: 'input_value', name: 'COLUMNS', check: ['String', 'Array'] },
      { type: 'field_dropdown', name: 'ORDER', options: [
        ['ascending', 'True'],
        ['descending', 'False']
      ]}
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Sort DataFrame by columns',
    helpUrl: ''
  },

  // Merging
  pandas_merge: {
    type: 'pandas_merge',
    message0: 'merge %1 with %2 on %3 how %4',
    args0: [
      { type: 'input_value', name: 'LEFT', check: 'DataFrame' },
      { type: 'input_value', name: 'RIGHT', check: 'DataFrame' },
      { type: 'input_value', name: 'ON', check: ['String', 'Array'] },
      { type: 'field_dropdown', name: 'HOW', options: [
        ['inner', 'inner'],
        ['left', 'left'],
        ['right', 'right'],
        ['outer', 'outer']
      ]}
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Merge two DataFrames',
    helpUrl: ''
  },

  pandas_concat: {
    type: 'pandas_concat',
    message0: 'concatenate %1 axis %2',
    args0: [
      { type: 'input_value', name: 'DATAFRAMES', check: 'Array' },
      { type: 'field_dropdown', name: 'AXIS', options: [
        ['rows (0)', '0'],
        ['columns (1)', '1']
      ]}
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Concatenate DataFrames',
    helpUrl: ''
  },

  // Pivot
  pandas_pivot_table: {
    type: 'pandas_pivot_table',
    message0: 'pivot %1 index %2 columns %3 values %4 aggfunc %5',
    args0: [
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' },
      { type: 'input_value', name: 'INDEX', check: ['String', 'Array'] },
      { type: 'input_value', name: 'COLUMNS', check: ['String', 'Array'] },
      { type: 'input_value', name: 'VALUES', check: ['String', 'Array'] },
      { type: 'field_dropdown', name: 'AGGFUNC', options: [
        ['mean', 'mean'],
        ['sum', 'sum'],
        ['count', 'count'],
        ['min', 'min'],
        ['max', 'max']
      ]}
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Create pivot table',
    helpUrl: ''
  },

  // Apply
  pandas_apply: {
    type: 'pandas_apply',
    message0: 'apply %1 to %2 axis %3',
    args0: [
      { type: 'input_value', name: 'FUNC', check: 'Function' },
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' },
      { type: 'field_dropdown', name: 'AXIS', options: [
        ['rows (0)', '0'],
        ['columns (1)', '1']
      ]}
    ],
    output: 'DataFrame',
    colour: PANDAS_COLOR,
    tooltip: 'Apply function along axis',
    helpUrl: ''
  },

  // Shape & Info
  pandas_shape: {
    type: 'pandas_shape',
    message0: 'shape of %1',
    args0: [
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'Tuple',
    colour: PANDAS_COLOR,
    tooltip: 'Get DataFrame shape (rows, columns)',
    helpUrl: ''
  },

  pandas_columns: {
    type: 'pandas_columns',
    message0: 'columns of %1',
    args0: [
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'Array',
    colour: PANDAS_COLOR,
    tooltip: 'Get column names',
    helpUrl: ''
  },

  pandas_dtypes: {
    type: 'pandas_dtypes',
    message0: 'data types of %1',
    args0: [
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' }
    ],
    output: 'Series',
    colour: PANDAS_COLOR,
    tooltip: 'Get column data types',
    helpUrl: ''
  },

  // Output
  pandas_to_csv: {
    type: 'pandas_to_csv',
    message0: 'save %1 to CSV %2',
    args0: [
      { type: 'input_value', name: 'DATAFRAME', check: 'DataFrame' },
      { type: 'input_value', name: 'PATH', check: 'String' }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: PANDAS_COLOR,
    tooltip: 'Save DataFrame to CSV file',
    helpUrl: ''
  },

  pandas_print: {
    type: 'pandas_print',
    message0: 'print %1',
    args0: [
      { type: 'input_value', name: 'VALUE' }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: PANDAS_COLOR,
    tooltip: 'Print value to console',
    helpUrl: ''
  }
};

export function registerPandasBlocks(): void {
  Object.entries(pandasBlocks).forEach(([name, definition]) => {
    Blockly.Blocks[name] = {
      init: function(this: Blockly.Block) {
        this.jsonInit(definition);
      }
    };
  });
}
