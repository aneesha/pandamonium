import * as Blockly from 'blockly';

const ORDER = {
  ATOMIC: 0,
  COLLECTION: 1,
  FUNCTION_CALL: 2,
  MEMBER: 2.1,
  NONE: 99
};

export class PythonGenerator extends Blockly.Generator {
  private imports: Set<string> = new Set();

  constructor() {
    super('Python');
    this.INDENT = '    ';

    this.registerGenerators();
    this.setupScrub();
  }

  private setupScrub(): void {
    // Handle block connections (next statements)
    this.scrub_ = (block: Blockly.Block, code: string, thisOnly?: boolean): string => {
      const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
      if (nextBlock && !thisOnly) {
        return code + this.blockToCode(nextBlock);
      }
      return code;
    };
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

  private registerGenerators(): void {
    // ============================================
    // DATA BLOCKS
    // ============================================

    this.forBlock['load_data'] = (block: Blockly.Block) => {
      this.addImport('import pandas as pd');
      const type = block.getFieldValue('TYPE');
      const varName = block.getFieldValue('VAR');
      const path = block.getFieldValue('PATH');

      let code = '';
      if (type === 'csv' || type === 'url') {
        code = `${varName} = pd.read_csv("${path}")\n`;
      } else if (type === 'excel') {
        code = `${varName} = pd.read_excel("${path}")\n`;
      } else if (type === 'json') {
        code = `${varName} = pd.read_json("${path}")\n`;
      }
      return code;
    };

    this.forBlock['preview_data'] = (block: Blockly.Block) => {
      const varName = block.getFieldValue('VAR');
      const type = block.getFieldValue('TYPE');
      const n = block.getFieldValue('N');

      let code = '';
      if (type === 'head') code = `print(${varName}.head(${n}))\n`;
      else if (type === 'tail') code = `print(${varName}.tail(${n}))\n`;
      else if (type === 'describe') code = `print(${varName}.describe())\n`;
      else if (type === 'shape') code = `print(f"Shape: {${varName}.shape}")\n`;
      else if (type === 'columns') code = `print(f"Columns: {${varName}.columns.tolist()}")\n`;
      else if (type === 'dtypes') code = `print(${varName}.dtypes)\n`;
      else if (type === 'info') code = `print(${varName}.info())\n`;
      else if (type === 'sample') code = `print(${varName}.sample(${n}))\n`;
      return code;
    };

    this.forBlock['select_columns'] = (block: Blockly.Block) => {
      const action = block.getFieldValue('ACTION');
      const varName = block.getFieldValue('VAR');
      const columns = block.getFieldValue('COLUMNS').split(',').map((c: string) => `"${c.trim()}"`).join(', ');

      if (action === 'keep') {
        return `${varName} = ${varName}[[${columns}]]\n`;
      } else {
        return `${varName} = ${varName}.drop(columns=[${columns}])\n`;
      }
    };

    this.forBlock['filter_rows'] = (block: Blockly.Block) => {
      const varName = block.getFieldValue('VAR');
      const column = block.getFieldValue('COLUMN');
      const op = block.getFieldValue('OP');
      const value = block.getFieldValue('VALUE');

      let code = '';
      if (op === 'isnull') {
        code = `${varName} = ${varName}[${varName}["${column}"].isnull()]\n`;
      } else if (op === 'notnull') {
        code = `${varName} = ${varName}[${varName}["${column}"].notnull()]\n`;
      } else if (op === 'contains') {
        code = `${varName} = ${varName}[${varName}["${column}"].str.contains("${value}", na=False)]\n`;
      } else {
        const val = isNaN(Number(value)) ? `"${value}"` : value;
        code = `${varName} = ${varName}[${varName}["${column}"] ${op} ${val}]\n`;
      }
      return code;
    };

    this.forBlock['handle_missing'] = (block: Blockly.Block) => {
      const varName = block.getFieldValue('VAR');
      const method = block.getFieldValue('METHOD');
      const fillValue = block.getFieldValue('FILL_VALUE');

      let code = '';
      if (method === 'drop') {
        code = `${varName} = ${varName}.dropna()\n`;
      } else if (method === 'value') {
        const val = isNaN(Number(fillValue)) ? `"${fillValue}"` : fillValue;
        code = `${varName} = ${varName}.fillna(${val})\n`;
      } else if (method === 'mean') {
        code = `${varName} = ${varName}.fillna(${varName}.mean(numeric_only=True))\n`;
      } else if (method === 'median') {
        code = `${varName} = ${varName}.fillna(${varName}.median(numeric_only=True))\n`;
      } else if (method === 'mode') {
        code = `${varName} = ${varName}.fillna(${varName}.mode().iloc[0])\n`;
      } else if (method === 'ffill') {
        code = `${varName} = ${varName}.ffill()\n`;
      } else if (method === 'bfill') {
        code = `${varName} = ${varName}.bfill()\n`;
      }
      return code;
    };

    this.forBlock['sort_data'] = (block: Blockly.Block) => {
      const varName = block.getFieldValue('VAR');
      const column = block.getFieldValue('COLUMN');
      const order = block.getFieldValue('ORDER');
      return `${varName} = ${varName}.sort_values("${column}", ascending=${order})\n`;
    };

    this.forBlock['group_summarize'] = (block: Blockly.Block) => {
      const varName = block.getFieldValue('VAR');
      const groupCol = block.getFieldValue('GROUP_COL');
      const agg = block.getFieldValue('AGG');
      const valueCol = block.getFieldValue('VALUE_COL');
      const resultVar = block.getFieldValue('RESULT_VAR');
      return `${resultVar} = ${varName}.groupby("${groupCol}")["${valueCol}"].${agg}().reset_index()\nprint(${resultVar})\n`;
    };

    this.forBlock['merge_data'] = (block: Blockly.Block) => {
      this.addImport('import pandas as pd');
      const left = block.getFieldValue('LEFT');
      const right = block.getFieldValue('RIGHT');
      const on = block.getFieldValue('ON');
      const how = block.getFieldValue('HOW');
      const result = block.getFieldValue('RESULT');
      return `${result} = pd.merge(${left}, ${right}, on="${on}", how="${how}")\n`;
    };

    // ============================================
    // ML PREP BLOCKS
    // ============================================

    this.forBlock['prepare_features'] = (block: Blockly.Block) => {
      const varName = block.getFieldValue('VAR');
      const features = block.getFieldValue('FEATURES').split(',').map((c: string) => `"${c.trim()}"`).join(', ');
      const target = block.getFieldValue('TARGET');
      const xVar = block.getFieldValue('X_VAR');
      const yVar = block.getFieldValue('Y_VAR');
      return `${xVar} = ${varName}[[${features}]]\n${yVar} = ${varName}["${target}"]\n`;
    };

    this.forBlock['split_data'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.model_selection import train_test_split');
      const xVar = block.getFieldValue('X_VAR');
      const yVar = block.getFieldValue('Y_VAR');
      const testSize = block.getFieldValue('TEST_SIZE');
      return `X_train, X_test, y_train, y_test = train_test_split(${xVar}, ${yVar}, test_size=${testSize}, random_state=42)\n`;
    };

    this.forBlock['scale_features'] = (block: Blockly.Block) => {
      const scaler = block.getFieldValue('SCALER');
      let scalerClass = 'StandardScaler';
      if (scaler === 'minmax') scalerClass = 'MinMaxScaler';
      else if (scaler === 'robust') scalerClass = 'RobustScaler';
      this.addImport(`from sklearn.preprocessing import ${scalerClass}`);
      return `scaler = ${scalerClass}()\nX_train = scaler.fit_transform(X_train)\nX_test = scaler.transform(X_test)\n`;
    };

    // ============================================
    // MODEL BLOCKS
    // ============================================

    this.forBlock['create_model'] = (block: Blockly.Block) => {
      const modelType = block.getFieldValue('MODEL_TYPE');
      const task = block.getFieldValue('TASK');
      const modelVar = block.getFieldValue('MODEL_VAR');

      let code = '';
      if (modelType === 'linear_reg') {
        this.addImport('from sklearn.linear_model import LinearRegression');
        code = `${modelVar} = LinearRegression()\n`;
      } else if (modelType === 'logistic_reg') {
        this.addImport('from sklearn.linear_model import LogisticRegression');
        code = `${modelVar} = LogisticRegression(max_iter=1000)\n`;
      } else if (modelType === 'decision_tree') {
        if (task === 'classifier') {
          this.addImport('from sklearn.tree import DecisionTreeClassifier');
          code = `${modelVar} = DecisionTreeClassifier(random_state=42)\n`;
        } else {
          this.addImport('from sklearn.tree import DecisionTreeRegressor');
          code = `${modelVar} = DecisionTreeRegressor(random_state=42)\n`;
        }
      } else if (modelType === 'random_forest') {
        if (task === 'classifier') {
          this.addImport('from sklearn.ensemble import RandomForestClassifier');
          code = `${modelVar} = RandomForestClassifier(n_estimators=100, random_state=42)\n`;
        } else {
          this.addImport('from sklearn.ensemble import RandomForestRegressor');
          code = `${modelVar} = RandomForestRegressor(n_estimators=100, random_state=42)\n`;
        }
      } else if (modelType === 'knn') {
        if (task === 'classifier') {
          this.addImport('from sklearn.neighbors import KNeighborsClassifier');
          code = `${modelVar} = KNeighborsClassifier(n_neighbors=5)\n`;
        } else {
          this.addImport('from sklearn.neighbors import KNeighborsRegressor');
          code = `${modelVar} = KNeighborsRegressor(n_neighbors=5)\n`;
        }
      } else if (modelType === 'svm') {
        if (task === 'classifier') {
          this.addImport('from sklearn.svm import SVC');
          code = `${modelVar} = SVC(random_state=42)\n`;
        } else {
          this.addImport('from sklearn.svm import SVR');
          code = `${modelVar} = SVR()\n`;
        }
      } else if (modelType === 'naive_bayes') {
        this.addImport('from sklearn.naive_bayes import GaussianNB');
        code = `${modelVar} = GaussianNB()\n`;
      } else if (modelType === 'gradient_boost') {
        if (task === 'classifier') {
          this.addImport('from sklearn.ensemble import GradientBoostingClassifier');
          code = `${modelVar} = GradientBoostingClassifier(random_state=42)\n`;
        } else {
          this.addImport('from sklearn.ensemble import GradientBoostingRegressor');
          code = `${modelVar} = GradientBoostingRegressor(random_state=42)\n`;
        }
      }
      return code;
    };

    this.forBlock['train_model'] = (block: Blockly.Block) => {
      const modelVar = block.getFieldValue('MODEL_VAR');
      return `${modelVar}.fit(X_train, y_train)\nprint(f"Model trained: {type(${modelVar}).__name__}")\n`;
    };

    this.forBlock['predict'] = (block: Blockly.Block) => {
      const modelVar = block.getFieldValue('MODEL_VAR');
      const data = block.getFieldValue('DATA');
      const predVar = block.getFieldValue('PRED_VAR');
      return `${predVar} = ${modelVar}.predict(${data})\n`;
    };

    this.forBlock['grid_search'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.model_selection import GridSearchCV');
      const modelVar = block.getFieldValue('MODEL_VAR');
      const paramsStr = block.getFieldValue('PARAMS');
      const cv = block.getFieldValue('CV');
      const scoring = block.getFieldValue('SCORING');
      const bestVar = block.getFieldValue('BEST_VAR');

      // Parse params string like "n_estimators: [50,100], max_depth: [3,5]"
      const params = paramsStr.split(',').map((p: string) => {
        const [key, val] = p.split(':').map((s: string) => s.trim());
        return `"${key}": ${val}`;
      }).join(', ');

      return `param_grid = {${params}}\ngrid_search = GridSearchCV(${modelVar}, param_grid, cv=${cv}, scoring="${scoring}")\ngrid_search.fit(X_train, y_train)\n${bestVar} = grid_search.best_estimator_\nprint(f"Best params: {grid_search.best_params_}")\nprint(f"Best score: {grid_search.best_score_:.4f}")\n`;
    };

    this.forBlock['cross_validate'] = (block: Blockly.Block) => {
      this.addImport('from sklearn.model_selection import cross_val_score');
      this.addImport('import numpy as np');
      const modelVar = block.getFieldValue('MODEL_VAR');
      const cv = block.getFieldValue('CV');
      return `cv_scores = cross_val_score(${modelVar}, X_train, y_train, cv=${cv})\nprint(f"CV Score: {cv_scores.mean():.4f} (+/- {cv_scores.std()*2:.4f})")\n`;
    };

    // ============================================
    // EVALUATE BLOCKS
    // ============================================

    this.forBlock['evaluate'] = (block: Blockly.Block) => {
      const metric = block.getFieldValue('METRIC');
      const yTrue = block.getFieldValue('Y_TRUE');
      const yPred = block.getFieldValue('Y_PRED');

      let code = '';
      if (metric === 'accuracy') {
        this.addImport('from sklearn.metrics import accuracy_score');
        code = `print(f"Accuracy: {accuracy_score(${yTrue}, ${yPred}):.4f}")\n`;
      } else if (metric === 'precision') {
        this.addImport('from sklearn.metrics import precision_score');
        code = `print(f"Precision: {precision_score(${yTrue}, ${yPred}, average='weighted'):.4f}")\n`;
      } else if (metric === 'recall') {
        this.addImport('from sklearn.metrics import recall_score');
        code = `print(f"Recall: {recall_score(${yTrue}, ${yPred}, average='weighted'):.4f}")\n`;
      } else if (metric === 'f1') {
        this.addImport('from sklearn.metrics import f1_score');
        code = `print(f"F1 Score: {f1_score(${yTrue}, ${yPred}, average='weighted'):.4f}")\n`;
      } else if (metric === 'confusion') {
        this.addImport('from sklearn.metrics import confusion_matrix');
        code = `print("Confusion Matrix:")\nprint(confusion_matrix(${yTrue}, ${yPred}))\n`;
      } else if (metric === 'class_report') {
        this.addImport('from sklearn.metrics import classification_report');
        code = `print("Classification Report:")\nprint(classification_report(${yTrue}, ${yPred}))\n`;
      } else if (metric === 'mse') {
        this.addImport('from sklearn.metrics import mean_squared_error');
        code = `print(f"MSE: {mean_squared_error(${yTrue}, ${yPred}):.4f}")\n`;
      } else if (metric === 'rmse') {
        this.addImport('from sklearn.metrics import mean_squared_error');
        this.addImport('import numpy as np');
        code = `print(f"RMSE: {np.sqrt(mean_squared_error(${yTrue}, ${yPred})):.4f}")\n`;
      } else if (metric === 'mae') {
        this.addImport('from sklearn.metrics import mean_absolute_error');
        code = `print(f"MAE: {mean_absolute_error(${yTrue}, ${yPred}):.4f}")\n`;
      } else if (metric === 'r2') {
        this.addImport('from sklearn.metrics import r2_score');
        code = `print(f"R² Score: {r2_score(${yTrue}, ${yPred}):.4f}")\n`;
      }
      return code;
    };

    // ============================================
    // OUTPUT BLOCKS
    // ============================================

    this.forBlock['output'] = (block: Blockly.Block) => {
      const type = block.getFieldValue('TYPE');
      const varName = block.getFieldValue('VAR');
      const path = block.getFieldValue('PATH');

      if (type === 'print') {
        return `print(${varName})\n`;
      } else if (type === 'csv') {
        return `${varName}.to_csv("${path}", index=False)\nprint(f"Saved to ${path}")\n`;
      } else if (type === 'excel') {
        return `${varName}.to_excel("${path}", index=False)\nprint(f"Saved to ${path}")\n`;
      }
      return '';
    };

    this.forBlock['comment'] = (block: Blockly.Block) => {
      const text = block.getFieldValue('TEXT');
      return `# ${text}\n`;
    };
  }

  generateCode(workspace: Blockly.Workspace): string {
    this.clearImports();

    const code = this.workspaceToCode(workspace);
    const imports = this.getImports();

    let fullCode = '';
    if (imports.length > 0) {
      fullCode = imports.sort().join('\n') + '\n\n';
    }
    fullCode += code;

    return fullCode;
  }
}

export const pythonGenerator = new PythonGenerator();
