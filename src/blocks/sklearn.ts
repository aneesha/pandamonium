import * as Blockly from 'blockly';

// Color scheme matching playground
const COLORS = {
  ml_prep: '#00897B',
  ml_model: '#5C6BC0',
  ml_eval: '#EF5350'
};

export const sklearnBlocks: Record<string, object> = {
  // --- PREPARE FEATURES (ML) ---
  prepare_features: {
    type: 'prepare_features',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Prepare ML data from')
        .appendField(new Blockly.FieldTextInput('df'), 'VAR');
      this.appendDummyInput()
        .appendField('Features:')
        .appendField(new Blockly.FieldTextInput('col1, col2, col3'), 'FEATURES');
      this.appendDummyInput()
        .appendField('Target:')
        .appendField(new Blockly.FieldTextInput('target'), 'TARGET');
      this.appendDummyInput()
        .appendField('→ X:')
        .appendField(new Blockly.FieldTextInput('X'), 'X_VAR')
        .appendField('y:')
        .appendField(new Blockly.FieldTextInput('y'), 'Y_VAR');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.ml_prep);
      this.setTooltip('Extract features (X) and target (y) for ML');
    }
  },

  // --- SPLIT DATA ---
  split_data: {
    type: 'split_data',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Split')
        .appendField(new Blockly.FieldTextInput('X'), 'X_VAR')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('y'), 'Y_VAR')
        .appendField('test:')
        .appendField(new Blockly.FieldNumber(0.2, 0.1, 0.5, 0.05), 'TEST_SIZE');
      this.appendDummyInput()
        .appendField('→ X_train, X_test, y_train, y_test');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.ml_prep);
      this.setTooltip('Split into train and test sets');
    }
  },

  // --- SCALE FEATURES ---
  scale_features: {
    type: 'scale_features',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Scale features')
        .appendField(new Blockly.FieldDropdown([
          ['StandardScaler (z-score)', 'standard'],
          ['MinMaxScaler (0-1)', 'minmax'],
          ['RobustScaler (outliers)', 'robust']
        ]), 'SCALER');
      this.appendDummyInput()
        .appendField('Fit on X_train, transform X_train & X_test');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.ml_prep);
      this.setTooltip('Scale/normalize features');
    }
  },

  // --- CREATE MODEL ---
  create_model: {
    type: 'create_model',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Create')
        .appendField(new Blockly.FieldDropdown([
          ['Linear Regression', 'linear_reg'],
          ['Logistic Regression', 'logistic_reg'],
          ['Decision Tree', 'decision_tree'],
          ['Random Forest', 'random_forest'],
          ['KNN', 'knn'],
          ['SVM', 'svm'],
          ['Naive Bayes', 'naive_bayes'],
          ['Gradient Boosting', 'gradient_boost']
        ]), 'MODEL_TYPE')
        .appendField('→')
        .appendField(new Blockly.FieldTextInput('model'), 'MODEL_VAR');
      this.appendDummyInput()
        .appendField('Task:')
        .appendField(new Blockly.FieldDropdown([
          ['Classification', 'classifier'],
          ['Regression', 'regressor']
        ]), 'TASK');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.ml_model);
      this.setTooltip('Create an ML model');
    }
  },

  // --- TRAIN MODEL ---
  train_model: {
    type: 'train_model',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Train')
        .appendField(new Blockly.FieldTextInput('model'), 'MODEL_VAR')
        .appendField('on X_train, y_train');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.ml_model);
      this.setTooltip('Train the model on training data');
    }
  },

  // --- PREDICT ---
  predict: {
    type: 'predict',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Predict with')
        .appendField(new Blockly.FieldTextInput('model'), 'MODEL_VAR')
        .appendField('on')
        .appendField(new Blockly.FieldDropdown([
          ['X_test', 'X_test'],
          ['X_train', 'X_train'],
          ['X', 'X']
        ]), 'DATA')
        .appendField('→')
        .appendField(new Blockly.FieldTextInput('y_pred'), 'PRED_VAR');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.ml_model);
      this.setTooltip('Make predictions');
    }
  },

  // --- GRID SEARCH ---
  grid_search: {
    type: 'grid_search',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Grid Search')
        .appendField(new Blockly.FieldTextInput('model'), 'MODEL_VAR');
      this.appendDummyInput()
        .appendField('Params:')
        .appendField(new Blockly.FieldTextInput('n_estimators: [50,100], max_depth: [3,5,10]'), 'PARAMS');
      this.appendDummyInput()
        .appendField('CV folds:')
        .appendField(new Blockly.FieldNumber(5, 2, 10), 'CV')
        .appendField('Scoring:')
        .appendField(new Blockly.FieldDropdown([
          ['accuracy', 'accuracy'],
          ['f1', 'f1'],
          ['precision', 'precision'],
          ['recall', 'recall'],
          ['r2', 'r2'],
          ['neg_mse', 'neg_mean_squared_error']
        ]), 'SCORING');
      this.appendDummyInput()
        .appendField('→ best model in')
        .appendField(new Blockly.FieldTextInput('model'), 'BEST_VAR');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.ml_model);
      this.setTooltip('Find best hyperparameters with grid search');
    }
  },

  // --- CROSS VALIDATE ---
  cross_validate: {
    type: 'cross_validate',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Cross-validate')
        .appendField(new Blockly.FieldTextInput('model'), 'MODEL_VAR')
        .appendField('folds:')
        .appendField(new Blockly.FieldNumber(5, 2, 10), 'CV');
      this.appendDummyInput()
        .appendField('Print mean score ± std');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.ml_eval);
      this.setTooltip('Evaluate with cross-validation');
    }
  },

  // --- EVALUATE ---
  evaluate: {
    type: 'evaluate',
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('Evaluate:')
        .appendField(new Blockly.FieldDropdown([
          ['Accuracy', 'accuracy'],
          ['Precision', 'precision'],
          ['Recall', 'recall'],
          ['F1 Score', 'f1'],
          ['Confusion Matrix', 'confusion'],
          ['Classification Report', 'class_report'],
          ['MSE', 'mse'],
          ['RMSE', 'rmse'],
          ['MAE', 'mae'],
          ['R² Score', 'r2']
        ]), 'METRIC');
      this.appendDummyInput()
        .appendField('y_true:')
        .appendField(new Blockly.FieldDropdown([
          ['y_test', 'y_test'],
          ['y_train', 'y_train'],
          ['y', 'y']
        ]), 'Y_TRUE')
        .appendField('y_pred:')
        .appendField(new Blockly.FieldTextInput('y_pred'), 'Y_PRED');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.ml_eval);
      this.setTooltip('Calculate evaluation metric');
    }
  }
};

export function registerSklearnBlocks(): void {
  Object.entries(sklearnBlocks).forEach(([name, definition]) => {
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
