import * as Blockly from 'blockly';

const ORDER = {
  ATOMIC: 0,
  COLLECTION: 1,
  STRING_CONVERSION: 1,
  MEMBER: 2.1,
  FUNCTION_CALL: 2,
  EXPONENTIATION: 3,
  UNARY_SIGN: 4,
  BITWISE_NOT: 4,
  MULTIPLICATIVE: 5,
  ADDITIVE: 6,
  BITWISE_SHIFT: 7,
  BITWISE_AND: 8,
  BITWISE_XOR: 9,
  BITWISE_OR: 10,
  RELATIONAL: 11,
  NOT: 12,
  AND: 13,
  OR: 14,
  CONDITIONAL: 15,
  LAMBDA: 16,
  NONE: 99
};

export class PythonGenerator extends Blockly.Generator {
  private imports: Set<string> = new Set();

  constructor() {
    super('Python');
    this.INDENT = '    ';

    this.registerGenerators();
  }

  getImports(): string[] {
    return Array.from(this.imports);
  }

  clearImports(): void {
    this.imports.clear();
  }

  private addImport(importStatement: string): void {
    this.imports.add(importStatement);
  }

  private getVarName(block: Blockly.Block, fieldName: string, defaultName: string): string {
    const field = block.getField(fieldName);
    if (field && typeof (field as Blockly.FieldVariable).getText === 'function') {
      return (field as Blockly.FieldVariable).getText() || defaultName;
    }
    return defaultName;
  }

  private registerGenerators(): void {
    // Common blocks
    this.forBlock['text_value'] = (block: Blockly.Block) => {
      const text = block.getFieldValue('TEXT');
      return [`"${text}"`, ORDER.ATOMIC];
    };

    this.forBlock['number_value'] = (block: Blockly.Block) => {
      const num = block.getFieldValue('NUM');
      return [String(num), ORDER.ATOMIC];
    };

    this.forBlock['array_create'] = (block: Blockly.Block) => {
      const items = block.getFieldValue('ITEMS');
      const itemList = items.split(',').map((s: string) => s.trim()).filter((s: string) => s);
      return [`[${itemList.join(', ')}]`, ORDER.COLLECTION];
    };

    this.forBlock['array_create_with'] = (block: Blockly.Block) => {
      const items = block.getFieldValue('ITEMS');
      const itemList = items.split(',').map((s: string) => `"${s.trim()}"`).filter((s: string) => s !== '""');
      return [`[${itemList.join(', ')}]`, ORDER.COLLECTION];
    };

    this.forBlock['array_length'] = (block: Blockly.Block) => {
      const array = this.valueToCode(block, 'ARRAY', ORDER.NONE) || '[]';
      return [`len(${array})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['dict_create'] = (block: Blockly.Block) => {
      const items = block.getFieldValue('ITEMS');
      const pairs = items.split(',').map((pair: string) => {
        const [key, value] = pair.split(':').map((s: string) => s.trim());
        if (key && value) {
          return `"${key}": ${value}`;
        }
        return null;
      }).filter(Boolean);
      return [`{${pairs.join(', ')}}`, ORDER.COLLECTION];
    };

    this.forBlock['dict_get'] = (block: Blockly.Block) => {
      const key = this.valueToCode(block, 'KEY', ORDER.NONE) || '""';
      const dict = this.valueToCode(block, 'DICT', ORDER.MEMBER) || '{}';
      return [`${dict}[${key}]`, ORDER.MEMBER];
    };

    this.forBlock['boolean_value'] = (block: Blockly.Block) => {
      const bool = block.getFieldValue('BOOL');
      return [bool, ORDER.ATOMIC];
    };

    this.forBlock['logic_compare'] = (block: Blockly.Block) => {
      const a = this.valueToCode(block, 'A', ORDER.RELATIONAL) || '0';
      const b = this.valueToCode(block, 'B', ORDER.RELATIONAL) || '0';
      const op = block.getFieldValue('OP');
      return [`${a} ${op} ${b}`, ORDER.RELATIONAL];
    };

    this.forBlock['logic_operation'] = (block: Blockly.Block) => {
      const a = this.valueToCode(block, 'A', ORDER.AND) || 'False';
      const b = this.valueToCode(block, 'B', ORDER.AND) || 'False';
      const op = block.getFieldValue('OP');
      const order = op === 'and' ? ORDER.AND : ORDER.OR;
      return [`${a} ${op} ${b}`, order];
    };

    this.forBlock['logic_not'] = (block: Blockly.Block) => {
      const bool = this.valueToCode(block, 'BOOL', ORDER.NOT) || 'False';
      return [`not ${bool}`, ORDER.NOT];
    };

    this.forBlock['math_arithmetic'] = (block: Blockly.Block) => {
      const ops: Record<string, [string, number]> = {
        'ADD': ['+', ORDER.ADDITIVE],
        'MINUS': ['-', ORDER.ADDITIVE],
        'MULTIPLY': ['*', ORDER.MULTIPLICATIVE],
        'DIVIDE': ['/', ORDER.MULTIPLICATIVE],
        'POWER': ['**', ORDER.EXPONENTIATION]
      };
      const op = block.getFieldValue('OP');
      const [symbol, order] = ops[op] || ['+', ORDER.ADDITIVE];
      const a = this.valueToCode(block, 'A', order) || '0';
      const b = this.valueToCode(block, 'B', order) || '0';
      return [`${a} ${symbol} ${b}`, order];
    };

    this.forBlock['lambda_simple'] = (block: Blockly.Block) => {
      const expr = block.getFieldValue('EXPR');
      return [`lambda x: ${expr}`, ORDER.LAMBDA];
    };

    this.forBlock['comment_block'] = (block: Blockly.Block) => {
      const comment = block.getFieldValue('COMMENT');
      return `# ${comment}\n`;
    };

    this.forBlock['var_set'] = (block: Blockly.Block) => {
      const varName = this.getVarName(block, 'VAR', 'x');
      const value = this.valueToCode(block, 'VALUE', ORDER.NONE) || 'None';
      return `${varName} = ${value}\n`;
    };

    this.forBlock['var_get'] = (block: Blockly.Block) => {
      const varName = this.getVarName(block, 'VAR', 'x');
      return [varName, ORDER.ATOMIC];
    };

    this.forBlock['none_value'] = () => {
      return ['None', ORDER.ATOMIC];
    };

    // Pandas blocks
    this.registerPandasGenerators();

    // Sklearn blocks
    this.registerSklearnGenerators();
  }

  private registerPandasGenerators(): void {
    this.forBlock['pandas_read_csv'] = (block: Blockly.Block) => {
      this.addImport('import pandas as pd');
      const path = this.valueToCode(block, 'PATH', ORDER.NONE) || '""';
      return [`pd.read_csv(${path})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_read_excel'] = (block: Blockly.Block) => {
      this.addImport('import pandas as pd');
      const path = this.valueToCode(block, 'PATH', ORDER.NONE) || '""';
      const sheet = this.valueToCode(block, 'SHEET', ORDER.NONE) || '0';
      return [`pd.read_excel(${path}, sheet_name=${sheet})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_read_json'] = (block: Blockly.Block) => {
      this.addImport('import pandas as pd');
      const path = this.valueToCode(block, 'PATH', ORDER.NONE) || '""';
      return [`pd.read_json(${path})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_create_dataframe'] = (block: Blockly.Block) => {
      this.addImport('import pandas as pd');
      const data = this.valueToCode(block, 'DATA', ORDER.NONE) || '{}';
      return [`pd.DataFrame(${data})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_dataframe_var'] = (block: Blockly.Block) => {
      const varName = this.getVarName(block, 'VAR', 'df');
      return [varName, ORDER.ATOMIC];
    };

    this.forBlock['pandas_set_dataframe'] = (block: Blockly.Block) => {
      const varName = this.getVarName(block, 'VAR', 'df');
      const value = this.valueToCode(block, 'VALUE', ORDER.NONE) || 'pd.DataFrame()';
      return `${varName} = ${value}\n`;
    };

    this.forBlock['pandas_select_columns'] = (block: Blockly.Block) => {
      const cols = this.valueToCode(block, 'COLUMNS', ORDER.NONE) || '[]';
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}[${cols}]`, ORDER.MEMBER];
    };

    this.forBlock['pandas_select_column'] = (block: Blockly.Block) => {
      const col = this.valueToCode(block, 'COLUMN', ORDER.NONE) || '""';
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}[${col}]`, ORDER.MEMBER];
    };

    this.forBlock['pandas_drop_columns'] = (block: Blockly.Block) => {
      const cols = this.valueToCode(block, 'COLUMNS', ORDER.NONE) || '[]';
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}.drop(columns=${cols})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_rename_columns'] = (block: Blockly.Block) => {
      const mapping = this.valueToCode(block, 'MAPPING', ORDER.NONE) || '{}';
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}.rename(columns=${mapping})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_head'] = (block: Blockly.Block) => {
      const n = block.getFieldValue('N') || 5;
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}.head(${n})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_tail'] = (block: Blockly.Block) => {
      const n = block.getFieldValue('N') || 5;
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}.tail(${n})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_sample'] = (block: Blockly.Block) => {
      const n = block.getFieldValue('N') || 5;
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}.sample(${n})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_filter'] = (block: Blockly.Block) => {
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      const condition = this.valueToCode(block, 'CONDITION', ORDER.NONE) || 'True';
      return [`${df}[${condition}]`, ORDER.MEMBER];
    };

    this.forBlock['pandas_condition'] = (block: Blockly.Block) => {
      const col = this.valueToCode(block, 'COLUMN', ORDER.RELATIONAL) || 'df["col"]';
      const op = block.getFieldValue('OP') || '==';
      const value = this.valueToCode(block, 'VALUE', ORDER.RELATIONAL) || '0';
      return [`(${col} ${op} ${value})`, ORDER.RELATIONAL];
    };

    this.forBlock['pandas_isnull'] = (block: Blockly.Block) => {
      const col = this.valueToCode(block, 'COLUMN', ORDER.MEMBER) || 'df["col"]';
      return [`${col}.isnull()`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_notnull'] = (block: Blockly.Block) => {
      const col = this.valueToCode(block, 'COLUMN', ORDER.MEMBER) || 'df["col"]';
      return [`${col}.notnull()`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_dropna'] = (block: Blockly.Block) => {
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}.dropna()`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_fillna'] = (block: Blockly.Block) => {
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      const value = this.valueToCode(block, 'VALUE', ORDER.NONE) || '0';
      return [`${df}.fillna(${value})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_groupby'] = (block: Blockly.Block) => {
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      const cols = this.valueToCode(block, 'COLUMNS', ORDER.NONE) || '"col"';
      return [`${df}.groupby(${cols})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_agg'] = (block: Blockly.Block) => {
      const grouped = this.valueToCode(block, 'GROUPED', ORDER.MEMBER) || 'df.groupby("col")';
      const func = block.getFieldValue('FUNC') || 'sum';
      return [`${grouped}.${func}()`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_describe'] = (block: Blockly.Block) => {
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}.describe()`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_value_counts'] = (block: Blockly.Block) => {
      const series = this.valueToCode(block, 'SERIES', ORDER.MEMBER) || 'df["col"]';
      return [`${series}.value_counts()`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_corr'] = (block: Blockly.Block) => {
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}.corr()`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_sort_values'] = (block: Blockly.Block) => {
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      const cols = this.valueToCode(block, 'COLUMNS', ORDER.NONE) || '"col"';
      const asc = block.getFieldValue('ORDER') || 'True';
      return [`${df}.sort_values(by=${cols}, ascending=${asc})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_merge'] = (block: Blockly.Block) => {
      this.addImport('import pandas as pd');
      const left = this.valueToCode(block, 'LEFT', ORDER.NONE) || 'df1';
      const right = this.valueToCode(block, 'RIGHT', ORDER.NONE) || 'df2';
      const on = this.valueToCode(block, 'ON', ORDER.NONE) || '"key"';
      const how = block.getFieldValue('HOW') || 'inner';
      return [`pd.merge(${left}, ${right}, on=${on}, how="${how}")`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_concat'] = (block: Blockly.Block) => {
      this.addImport('import pandas as pd');
      const dfs = this.valueToCode(block, 'DATAFRAMES', ORDER.NONE) || '[]';
      const axis = block.getFieldValue('AXIS') || '0';
      return [`pd.concat(${dfs}, axis=${axis})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_pivot_table'] = (block: Blockly.Block) => {
      this.addImport('import pandas as pd');
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.NONE) || 'df';
      const index = this.valueToCode(block, 'INDEX', ORDER.NONE) || '"index"';
      const cols = this.valueToCode(block, 'COLUMNS', ORDER.NONE) || '"columns"';
      const values = this.valueToCode(block, 'VALUES', ORDER.NONE) || '"values"';
      const aggfunc = block.getFieldValue('AGGFUNC') || 'mean';
      return [`pd.pivot_table(${df}, index=${index}, columns=${cols}, values=${values}, aggfunc="${aggfunc}")`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_apply'] = (block: Blockly.Block) => {
      const func = this.valueToCode(block, 'FUNC', ORDER.NONE) || 'lambda x: x';
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      const axis = block.getFieldValue('AXIS') || '0';
      return [`${df}.apply(${func}, axis=${axis})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_shape'] = (block: Blockly.Block) => {
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}.shape`, ORDER.MEMBER];
    };

    this.forBlock['pandas_columns'] = (block: Blockly.Block) => {
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}.columns.tolist()`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['pandas_dtypes'] = (block: Blockly.Block) => {
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      return [`${df}.dtypes`, ORDER.MEMBER];
    };

    this.forBlock['pandas_to_csv'] = (block: Blockly.Block) => {
      const df = this.valueToCode(block, 'DATAFRAME', ORDER.MEMBER) || 'df';
      const path = this.valueToCode(block, 'PATH', ORDER.NONE) || '"output.csv"';
      return `${df}.to_csv(${path}, index=False)\n`;
    };

    this.forBlock['pandas_print'] = (block: Blockly.Block) => {
      const value = this.valueToCode(block, 'VALUE', ORDER.NONE) || '""';
      return `print(${value})\n`;
    };
  }

  private registerSklearnGenerators(): void {
    // Train/Test Split
    this.forBlock['sklearn_train_test_split'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.model_selection import train_test_split');
      const x = this.valueToCode(block, 'X', ORDER.NONE) || 'X';
      const y = this.valueToCode(block, 'Y', ORDER.NONE) || 'y';
      const testSize = block.getFieldValue('TEST_SIZE') || 0.2;
      const randomState = block.getFieldValue('RANDOM_STATE') || 42;
      return [`train_test_split(${x}, ${y}, test_size=${testSize}, random_state=${randomState})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_get_train_data'] = (block: Blockly.Block) => {
      const type = block.getFieldValue('TYPE') || 'X_train';
      const split = this.valueToCode(block, 'SPLIT', ORDER.NONE) || 'split_data';
      const index = type === 'X_train' ? 0 : 2;
      return [`${split}[${index}]`, ORDER.MEMBER];
    };

    this.forBlock['sklearn_get_test_data'] = (block: Blockly.Block) => {
      const type = block.getFieldValue('TYPE') || 'X_test';
      const split = this.valueToCode(block, 'SPLIT', ORDER.NONE) || 'split_data';
      const index = type === 'X_test' ? 1 : 3;
      return [`${split}[${index}]`, ORDER.MEMBER];
    };

    // Scalers
    this.forBlock['sklearn_standard_scaler'] = () => {
      this.addImport('from sklearn.preprocessing import StandardScaler');
      return ['StandardScaler()', ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_minmax_scaler'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.preprocessing import MinMaxScaler');
      const min = block.getFieldValue('MIN') || 0;
      const max = block.getFieldValue('MAX') || 1;
      return [`MinMaxScaler(feature_range=(${min}, ${max}))`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_robust_scaler'] = () => {
      this.addImport('from sklearn.preprocessing import RobustScaler');
      return ['RobustScaler()', ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_fit_transform'] = (block: Blockly.Block) => {
      const data = this.valueToCode(block, 'DATA', ORDER.NONE) || 'X';
      const transformer = this.valueToCode(block, 'TRANSFORMER', ORDER.MEMBER) || 'scaler';
      return [`${transformer}.fit_transform(${data})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_transform'] = (block: Blockly.Block) => {
      const data = this.valueToCode(block, 'DATA', ORDER.NONE) || 'X';
      const transformer = this.valueToCode(block, 'TRANSFORMER', ORDER.MEMBER) || 'scaler';
      return [`${transformer}.transform(${data})`, ORDER.FUNCTION_CALL];
    };

    // Encoders
    this.forBlock['sklearn_label_encoder'] = () => {
      this.addImport('from sklearn.preprocessing import LabelEncoder');
      return ['LabelEncoder()', ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_onehot_encoder'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.preprocessing import OneHotEncoder');
      const sparse = block.getFieldValue('SPARSE') || 'False';
      return [`OneHotEncoder(sparse_output=${sparse})`, ORDER.FUNCTION_CALL];
    };

    // Classification Models
    this.forBlock['sklearn_logistic_regression'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.linear_model import LogisticRegression');
      const c = block.getFieldValue('C') || 1.0;
      const maxIter = block.getFieldValue('MAX_ITER') || 100;
      return [`LogisticRegression(C=${c}, max_iter=${maxIter})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_decision_tree_classifier'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.tree import DecisionTreeClassifier');
      const maxDepth = block.getFieldValue('MAX_DEPTH') || 5;
      const randomState = block.getFieldValue('RANDOM_STATE') || 42;
      return [`DecisionTreeClassifier(max_depth=${maxDepth}, random_state=${randomState})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_random_forest_classifier'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.ensemble import RandomForestClassifier');
      const nEst = block.getFieldValue('N_ESTIMATORS') || 100;
      const maxDepth = block.getFieldValue('MAX_DEPTH') || 5;
      const randomState = block.getFieldValue('RANDOM_STATE') || 42;
      return [`RandomForestClassifier(n_estimators=${nEst}, max_depth=${maxDepth}, random_state=${randomState})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_svc'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.svm import SVC');
      const kernel = block.getFieldValue('KERNEL') || 'rbf';
      const c = block.getFieldValue('C') || 1.0;
      const randomState = block.getFieldValue('RANDOM_STATE') || 42;
      return [`SVC(kernel="${kernel}", C=${c}, random_state=${randomState})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_knn_classifier'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.neighbors import KNeighborsClassifier');
      const nNeighbors = block.getFieldValue('N_NEIGHBORS') || 5;
      return [`KNeighborsClassifier(n_neighbors=${nNeighbors})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_naive_bayes'] = () => {
      this.addImport('from sklearn.naive_bayes import GaussianNB');
      return ['GaussianNB()', ORDER.FUNCTION_CALL];
    };

    // Regression Models
    this.forBlock['sklearn_linear_regression'] = () => {
      this.addImport('from sklearn.linear_model import LinearRegression');
      return ['LinearRegression()', ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_ridge'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.linear_model import Ridge');
      const alpha = block.getFieldValue('ALPHA') || 1.0;
      return [`Ridge(alpha=${alpha})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_lasso'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.linear_model import Lasso');
      const alpha = block.getFieldValue('ALPHA') || 1.0;
      return [`Lasso(alpha=${alpha})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_decision_tree_regressor'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.tree import DecisionTreeRegressor');
      const maxDepth = block.getFieldValue('MAX_DEPTH') || 5;
      const randomState = block.getFieldValue('RANDOM_STATE') || 42;
      return [`DecisionTreeRegressor(max_depth=${maxDepth}, random_state=${randomState})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_random_forest_regressor'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.ensemble import RandomForestRegressor');
      const nEst = block.getFieldValue('N_ESTIMATORS') || 100;
      const maxDepth = block.getFieldValue('MAX_DEPTH') || 5;
      const randomState = block.getFieldValue('RANDOM_STATE') || 42;
      return [`RandomForestRegressor(n_estimators=${nEst}, max_depth=${maxDepth}, random_state=${randomState})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_svr'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.svm import SVR');
      const kernel = block.getFieldValue('KERNEL') || 'rbf';
      const c = block.getFieldValue('C') || 1.0;
      return [`SVR(kernel="${kernel}", C=${c})`, ORDER.FUNCTION_CALL];
    };

    // Clustering
    this.forBlock['sklearn_kmeans'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.cluster import KMeans');
      const nClusters = block.getFieldValue('N_CLUSTERS') || 3;
      const randomState = block.getFieldValue('RANDOM_STATE') || 42;
      return [`KMeans(n_clusters=${nClusters}, random_state=${randomState})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_dbscan'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.cluster import DBSCAN');
      const eps = block.getFieldValue('EPS') || 0.5;
      const minSamples = block.getFieldValue('MIN_SAMPLES') || 5;
      return [`DBSCAN(eps=${eps}, min_samples=${minSamples})`, ORDER.FUNCTION_CALL];
    };

    // Model Operations
    this.forBlock['sklearn_fit'] = (block: Blockly.Block) => {
      const model = this.valueToCode(block, 'MODEL', ORDER.MEMBER) || 'model';
      const x = this.valueToCode(block, 'X', ORDER.NONE) || 'X_train';
      const y = this.valueToCode(block, 'Y', ORDER.NONE) || 'y_train';
      return [`${model}.fit(${x}, ${y})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_predict'] = (block: Blockly.Block) => {
      const model = this.valueToCode(block, 'MODEL', ORDER.MEMBER) || 'model';
      const x = this.valueToCode(block, 'X', ORDER.NONE) || 'X_test';
      return [`${model}.predict(${x})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_predict_proba'] = (block: Blockly.Block) => {
      const model = this.valueToCode(block, 'MODEL', ORDER.MEMBER) || 'model';
      const x = this.valueToCode(block, 'X', ORDER.NONE) || 'X_test';
      return [`${model}.predict_proba(${x})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_score'] = (block: Blockly.Block) => {
      const model = this.valueToCode(block, 'MODEL', ORDER.MEMBER) || 'model';
      const x = this.valueToCode(block, 'X', ORDER.NONE) || 'X_test';
      const y = this.valueToCode(block, 'Y', ORDER.NONE) || 'y_test';
      return [`${model}.score(${x}, ${y})`, ORDER.FUNCTION_CALL];
    };

    // Metrics - Classification
    this.forBlock['sklearn_accuracy_score'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.metrics import accuracy_score');
      const yTrue = this.valueToCode(block, 'Y_TRUE', ORDER.NONE) || 'y_true';
      const yPred = this.valueToCode(block, 'Y_PRED', ORDER.NONE) || 'y_pred';
      return [`accuracy_score(${yTrue}, ${yPred})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_precision_score'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.metrics import precision_score');
      const yTrue = this.valueToCode(block, 'Y_TRUE', ORDER.NONE) || 'y_true';
      const yPred = this.valueToCode(block, 'Y_PRED', ORDER.NONE) || 'y_pred';
      const average = block.getFieldValue('AVERAGE') || 'binary';
      return [`precision_score(${yTrue}, ${yPred}, average="${average}")`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_recall_score'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.metrics import recall_score');
      const yTrue = this.valueToCode(block, 'Y_TRUE', ORDER.NONE) || 'y_true';
      const yPred = this.valueToCode(block, 'Y_PRED', ORDER.NONE) || 'y_pred';
      const average = block.getFieldValue('AVERAGE') || 'binary';
      return [`recall_score(${yTrue}, ${yPred}, average="${average}")`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_f1_score'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.metrics import f1_score');
      const yTrue = this.valueToCode(block, 'Y_TRUE', ORDER.NONE) || 'y_true';
      const yPred = this.valueToCode(block, 'Y_PRED', ORDER.NONE) || 'y_pred';
      const average = block.getFieldValue('AVERAGE') || 'binary';
      return [`f1_score(${yTrue}, ${yPred}, average="${average}")`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_confusion_matrix'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.metrics import confusion_matrix');
      const yTrue = this.valueToCode(block, 'Y_TRUE', ORDER.NONE) || 'y_true';
      const yPred = this.valueToCode(block, 'Y_PRED', ORDER.NONE) || 'y_pred';
      return [`confusion_matrix(${yTrue}, ${yPred})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_classification_report'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.metrics import classification_report');
      const yTrue = this.valueToCode(block, 'Y_TRUE', ORDER.NONE) || 'y_true';
      const yPred = this.valueToCode(block, 'Y_PRED', ORDER.NONE) || 'y_pred';
      return [`classification_report(${yTrue}, ${yPred})`, ORDER.FUNCTION_CALL];
    };

    // Metrics - Regression
    this.forBlock['sklearn_mse'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.metrics import mean_squared_error');
      const yTrue = this.valueToCode(block, 'Y_TRUE', ORDER.NONE) || 'y_true';
      const yPred = this.valueToCode(block, 'Y_PRED', ORDER.NONE) || 'y_pred';
      return [`mean_squared_error(${yTrue}, ${yPred})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_rmse'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.metrics import mean_squared_error');
      this.addImport('import numpy as np');
      const yTrue = this.valueToCode(block, 'Y_TRUE', ORDER.NONE) || 'y_true';
      const yPred = this.valueToCode(block, 'Y_PRED', ORDER.NONE) || 'y_pred';
      return [`np.sqrt(mean_squared_error(${yTrue}, ${yPred}))`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_mae'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.metrics import mean_absolute_error');
      const yTrue = this.valueToCode(block, 'Y_TRUE', ORDER.NONE) || 'y_true';
      const yPred = this.valueToCode(block, 'Y_PRED', ORDER.NONE) || 'y_pred';
      return [`mean_absolute_error(${yTrue}, ${yPred})`, ORDER.FUNCTION_CALL];
    };

    this.forBlock['sklearn_r2_score'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.metrics import r2_score');
      const yTrue = this.valueToCode(block, 'Y_TRUE', ORDER.NONE) || 'y_true';
      const yPred = this.valueToCode(block, 'Y_PRED', ORDER.NONE) || 'y_pred';
      return [`r2_score(${yTrue}, ${yPred})`, ORDER.FUNCTION_CALL];
    };

    // Cross Validation
    this.forBlock['sklearn_cross_val_score'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.model_selection import cross_val_score');
      const model = this.valueToCode(block, 'MODEL', ORDER.NONE) || 'model';
      const x = this.valueToCode(block, 'X', ORDER.NONE) || 'X';
      const y = this.valueToCode(block, 'Y', ORDER.NONE) || 'y';
      const cv = block.getFieldValue('CV') || 5;
      return [`cross_val_score(${model}, ${x}, ${y}, cv=${cv})`, ORDER.FUNCTION_CALL];
    };

    // PCA
    this.forBlock['sklearn_pca'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.decomposition import PCA');
      const nComponents = block.getFieldValue('N_COMPONENTS') || 2;
      return [`PCA(n_components=${nComponents})`, ORDER.FUNCTION_CALL];
    };

    // Model variable
    this.forBlock['sklearn_model_var'] = (block: Blockly.Block) => {
      const varName = this.getVarName(block, 'VAR', 'model');
      return [varName, ORDER.ATOMIC];
    };

    this.forBlock['sklearn_set_model'] = (block: Blockly.Block) => {
      const varName = this.getVarName(block, 'VAR', 'model');
      const value = this.valueToCode(block, 'VALUE', ORDER.NONE) || 'None';
      return `${varName} = ${value}\n`;
    };
  }

  generateCode(workspace: Blockly.Workspace): string {
    this.clearImports();

    const code = this.workspaceToCode(workspace);
    const imports = this.getImports();

    let fullCode = '';
    if (imports.length > 0) {
      fullCode = imports.join('\n') + '\n\n';
    }
    fullCode += code;

    return fullCode;
  }
}

export const pythonGenerator = new PythonGenerator();
