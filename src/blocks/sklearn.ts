import * as Blockly from 'blockly';

const SKLEARN_COLOR = 160;
const PREPROCESSING_COLOR = 180;
const METRICS_COLOR = 200;

export const sklearnBlocks: Record<string, object> = {
  // Data Splitting
  sklearn_train_test_split: {
    type: 'sklearn_train_test_split',
    message0: 'train/test split X: %1 y: %2 test size: %3 random state: %4',
    args0: [
      { type: 'input_value', name: 'X', check: ['DataFrame', 'Array'] },
      { type: 'input_value', name: 'Y', check: ['Series', 'Array'] },
      { type: 'field_number', name: 'TEST_SIZE', value: 0.2, min: 0.1, max: 0.9, precision: 0.1 },
      { type: 'field_number', name: 'RANDOM_STATE', value: 42, min: 0 }
    ],
    output: 'SplitData',
    colour: SKLEARN_COLOR,
    tooltip: 'Split data into training and test sets',
    helpUrl: ''
  },

  sklearn_get_train_data: {
    type: 'sklearn_get_train_data',
    message0: 'training %1 from %2',
    args0: [
      { type: 'field_dropdown', name: 'TYPE', options: [
        ['X', 'X_train'],
        ['y', 'y_train']
      ]},
      { type: 'input_value', name: 'SPLIT', check: 'SplitData' }
    ],
    output: ['DataFrame', 'Series', 'Array'],
    colour: SKLEARN_COLOR,
    tooltip: 'Get training data from split',
    helpUrl: ''
  },

  sklearn_get_test_data: {
    type: 'sklearn_get_test_data',
    message0: 'test %1 from %2',
    args0: [
      { type: 'field_dropdown', name: 'TYPE', options: [
        ['X', 'X_test'],
        ['y', 'y_test']
      ]},
      { type: 'input_value', name: 'SPLIT', check: 'SplitData' }
    ],
    output: ['DataFrame', 'Series', 'Array'],
    colour: SKLEARN_COLOR,
    tooltip: 'Get test data from split',
    helpUrl: ''
  },

  // Preprocessing - Scalers
  sklearn_standard_scaler: {
    type: 'sklearn_standard_scaler',
    message0: 'StandardScaler',
    output: 'Scaler',
    colour: PREPROCESSING_COLOR,
    tooltip: 'Standardize features by removing mean and scaling to unit variance',
    helpUrl: ''
  },

  sklearn_minmax_scaler: {
    type: 'sklearn_minmax_scaler',
    message0: 'MinMaxScaler min: %1 max: %2',
    args0: [
      { type: 'field_number', name: 'MIN', value: 0 },
      { type: 'field_number', name: 'MAX', value: 1 }
    ],
    output: 'Scaler',
    colour: PREPROCESSING_COLOR,
    tooltip: 'Scale features to a given range',
    helpUrl: ''
  },

  sklearn_robust_scaler: {
    type: 'sklearn_robust_scaler',
    message0: 'RobustScaler',
    output: 'Scaler',
    colour: PREPROCESSING_COLOR,
    tooltip: 'Scale features using statistics robust to outliers',
    helpUrl: ''
  },

  sklearn_fit_transform: {
    type: 'sklearn_fit_transform',
    message0: 'fit and transform %1 with %2',
    args0: [
      { type: 'input_value', name: 'DATA', check: ['DataFrame', 'Array'] },
      { type: 'input_value', name: 'TRANSFORMER', check: ['Scaler', 'Encoder', 'Transformer'] }
    ],
    output: 'Array',
    colour: PREPROCESSING_COLOR,
    tooltip: 'Fit transformer and transform data',
    helpUrl: ''
  },

  sklearn_transform: {
    type: 'sklearn_transform',
    message0: 'transform %1 with %2',
    args0: [
      { type: 'input_value', name: 'DATA', check: ['DataFrame', 'Array'] },
      { type: 'input_value', name: 'TRANSFORMER', check: ['Scaler', 'Encoder', 'Transformer'] }
    ],
    output: 'Array',
    colour: PREPROCESSING_COLOR,
    tooltip: 'Transform data using fitted transformer',
    helpUrl: ''
  },

  // Preprocessing - Encoders
  sklearn_label_encoder: {
    type: 'sklearn_label_encoder',
    message0: 'LabelEncoder',
    output: 'Encoder',
    colour: PREPROCESSING_COLOR,
    tooltip: 'Encode labels as integers',
    helpUrl: ''
  },

  sklearn_onehot_encoder: {
    type: 'sklearn_onehot_encoder',
    message0: 'OneHotEncoder sparse: %1',
    args0: [
      { type: 'field_dropdown', name: 'SPARSE', options: [
        ['False', 'False'],
        ['True', 'True']
      ]}
    ],
    output: 'Encoder',
    colour: PREPROCESSING_COLOR,
    tooltip: 'Encode categorical features as one-hot',
    helpUrl: ''
  },

  // Classification Models
  sklearn_logistic_regression: {
    type: 'sklearn_logistic_regression',
    message0: 'LogisticRegression C: %1 max_iter: %2',
    args0: [
      { type: 'field_number', name: 'C', value: 1.0, min: 0.001, precision: 0.001 },
      { type: 'field_number', name: 'MAX_ITER', value: 100, min: 1 }
    ],
    output: 'Classifier',
    colour: SKLEARN_COLOR,
    tooltip: 'Logistic Regression classifier',
    helpUrl: ''
  },

  sklearn_decision_tree_classifier: {
    type: 'sklearn_decision_tree_classifier',
    message0: 'DecisionTreeClassifier max_depth: %1 random_state: %2',
    args0: [
      { type: 'field_number', name: 'MAX_DEPTH', value: 5, min: 1 },
      { type: 'field_number', name: 'RANDOM_STATE', value: 42, min: 0 }
    ],
    output: 'Classifier',
    colour: SKLEARN_COLOR,
    tooltip: 'Decision Tree classifier',
    helpUrl: ''
  },

  sklearn_random_forest_classifier: {
    type: 'sklearn_random_forest_classifier',
    message0: 'RandomForestClassifier n_estimators: %1 max_depth: %2 random_state: %3',
    args0: [
      { type: 'field_number', name: 'N_ESTIMATORS', value: 100, min: 1 },
      { type: 'field_number', name: 'MAX_DEPTH', value: 5, min: 1 },
      { type: 'field_number', name: 'RANDOM_STATE', value: 42, min: 0 }
    ],
    output: 'Classifier',
    colour: SKLEARN_COLOR,
    tooltip: 'Random Forest classifier',
    helpUrl: ''
  },

  sklearn_svc: {
    type: 'sklearn_svc',
    message0: 'SVC kernel: %1 C: %2 random_state: %3',
    args0: [
      { type: 'field_dropdown', name: 'KERNEL', options: [
        ['rbf', 'rbf'],
        ['linear', 'linear'],
        ['poly', 'poly'],
        ['sigmoid', 'sigmoid']
      ]},
      { type: 'field_number', name: 'C', value: 1.0, min: 0.001, precision: 0.001 },
      { type: 'field_number', name: 'RANDOM_STATE', value: 42, min: 0 }
    ],
    output: 'Classifier',
    colour: SKLEARN_COLOR,
    tooltip: 'Support Vector Classifier',
    helpUrl: ''
  },

  sklearn_knn_classifier: {
    type: 'sklearn_knn_classifier',
    message0: 'KNeighborsClassifier n_neighbors: %1',
    args0: [
      { type: 'field_number', name: 'N_NEIGHBORS', value: 5, min: 1 }
    ],
    output: 'Classifier',
    colour: SKLEARN_COLOR,
    tooltip: 'K-Nearest Neighbors classifier',
    helpUrl: ''
  },

  sklearn_naive_bayes: {
    type: 'sklearn_naive_bayes',
    message0: 'GaussianNB',
    output: 'Classifier',
    colour: SKLEARN_COLOR,
    tooltip: 'Gaussian Naive Bayes classifier',
    helpUrl: ''
  },

  // Regression Models
  sklearn_linear_regression: {
    type: 'sklearn_linear_regression',
    message0: 'LinearRegression',
    output: 'Regressor',
    colour: SKLEARN_COLOR,
    tooltip: 'Linear Regression model',
    helpUrl: ''
  },

  sklearn_ridge: {
    type: 'sklearn_ridge',
    message0: 'Ridge alpha: %1',
    args0: [
      { type: 'field_number', name: 'ALPHA', value: 1.0, min: 0, precision: 0.1 }
    ],
    output: 'Regressor',
    colour: SKLEARN_COLOR,
    tooltip: 'Ridge Regression model',
    helpUrl: ''
  },

  sklearn_lasso: {
    type: 'sklearn_lasso',
    message0: 'Lasso alpha: %1',
    args0: [
      { type: 'field_number', name: 'ALPHA', value: 1.0, min: 0, precision: 0.1 }
    ],
    output: 'Regressor',
    colour: SKLEARN_COLOR,
    tooltip: 'Lasso Regression model',
    helpUrl: ''
  },

  sklearn_decision_tree_regressor: {
    type: 'sklearn_decision_tree_regressor',
    message0: 'DecisionTreeRegressor max_depth: %1 random_state: %2',
    args0: [
      { type: 'field_number', name: 'MAX_DEPTH', value: 5, min: 1 },
      { type: 'field_number', name: 'RANDOM_STATE', value: 42, min: 0 }
    ],
    output: 'Regressor',
    colour: SKLEARN_COLOR,
    tooltip: 'Decision Tree regressor',
    helpUrl: ''
  },

  sklearn_random_forest_regressor: {
    type: 'sklearn_random_forest_regressor',
    message0: 'RandomForestRegressor n_estimators: %1 max_depth: %2 random_state: %3',
    args0: [
      { type: 'field_number', name: 'N_ESTIMATORS', value: 100, min: 1 },
      { type: 'field_number', name: 'MAX_DEPTH', value: 5, min: 1 },
      { type: 'field_number', name: 'RANDOM_STATE', value: 42, min: 0 }
    ],
    output: 'Regressor',
    colour: SKLEARN_COLOR,
    tooltip: 'Random Forest regressor',
    helpUrl: ''
  },

  sklearn_svr: {
    type: 'sklearn_svr',
    message0: 'SVR kernel: %1 C: %2',
    args0: [
      { type: 'field_dropdown', name: 'KERNEL', options: [
        ['rbf', 'rbf'],
        ['linear', 'linear'],
        ['poly', 'poly'],
        ['sigmoid', 'sigmoid']
      ]},
      { type: 'field_number', name: 'C', value: 1.0, min: 0.001, precision: 0.001 }
    ],
    output: 'Regressor',
    colour: SKLEARN_COLOR,
    tooltip: 'Support Vector Regressor',
    helpUrl: ''
  },

  // Clustering
  sklearn_kmeans: {
    type: 'sklearn_kmeans',
    message0: 'KMeans n_clusters: %1 random_state: %2',
    args0: [
      { type: 'field_number', name: 'N_CLUSTERS', value: 3, min: 2 },
      { type: 'field_number', name: 'RANDOM_STATE', value: 42, min: 0 }
    ],
    output: 'Clusterer',
    colour: SKLEARN_COLOR,
    tooltip: 'K-Means clustering',
    helpUrl: ''
  },

  sklearn_dbscan: {
    type: 'sklearn_dbscan',
    message0: 'DBSCAN eps: %1 min_samples: %2',
    args0: [
      { type: 'field_number', name: 'EPS', value: 0.5, min: 0.01, precision: 0.01 },
      { type: 'field_number', name: 'MIN_SAMPLES', value: 5, min: 1 }
    ],
    output: 'Clusterer',
    colour: SKLEARN_COLOR,
    tooltip: 'DBSCAN clustering',
    helpUrl: ''
  },

  // Model Operations
  sklearn_fit: {
    type: 'sklearn_fit',
    message0: 'fit %1 with X: %2 y: %3',
    args0: [
      { type: 'input_value', name: 'MODEL', check: ['Classifier', 'Regressor', 'Clusterer'] },
      { type: 'input_value', name: 'X', check: ['DataFrame', 'Array'] },
      { type: 'input_value', name: 'Y', check: ['Series', 'Array'] }
    ],
    output: ['Classifier', 'Regressor', 'Clusterer'],
    colour: SKLEARN_COLOR,
    tooltip: 'Fit model to training data',
    helpUrl: ''
  },

  sklearn_predict: {
    type: 'sklearn_predict',
    message0: 'predict with %1 on %2',
    args0: [
      { type: 'input_value', name: 'MODEL', check: ['Classifier', 'Regressor', 'Clusterer'] },
      { type: 'input_value', name: 'X', check: ['DataFrame', 'Array'] }
    ],
    output: 'Array',
    colour: SKLEARN_COLOR,
    tooltip: 'Make predictions',
    helpUrl: ''
  },

  sklearn_predict_proba: {
    type: 'sklearn_predict_proba',
    message0: 'predict probabilities with %1 on %2',
    args0: [
      { type: 'input_value', name: 'MODEL', check: 'Classifier' },
      { type: 'input_value', name: 'X', check: ['DataFrame', 'Array'] }
    ],
    output: 'Array',
    colour: SKLEARN_COLOR,
    tooltip: 'Predict class probabilities',
    helpUrl: ''
  },

  sklearn_score: {
    type: 'sklearn_score',
    message0: 'score %1 on X: %2 y: %3',
    args0: [
      { type: 'input_value', name: 'MODEL', check: ['Classifier', 'Regressor'] },
      { type: 'input_value', name: 'X', check: ['DataFrame', 'Array'] },
      { type: 'input_value', name: 'Y', check: ['Series', 'Array'] }
    ],
    output: 'Number',
    colour: SKLEARN_COLOR,
    tooltip: 'Calculate model score',
    helpUrl: ''
  },

  // Metrics - Classification
  sklearn_accuracy_score: {
    type: 'sklearn_accuracy_score',
    message0: 'accuracy score y_true: %1 y_pred: %2',
    args0: [
      { type: 'input_value', name: 'Y_TRUE', check: ['Series', 'Array'] },
      { type: 'input_value', name: 'Y_PRED', check: 'Array' }
    ],
    output: 'Number',
    colour: METRICS_COLOR,
    tooltip: 'Calculate accuracy score',
    helpUrl: ''
  },

  sklearn_precision_score: {
    type: 'sklearn_precision_score',
    message0: 'precision score y_true: %1 y_pred: %2 average: %3',
    args0: [
      { type: 'input_value', name: 'Y_TRUE', check: ['Series', 'Array'] },
      { type: 'input_value', name: 'Y_PRED', check: 'Array' },
      { type: 'field_dropdown', name: 'AVERAGE', options: [
        ['binary', 'binary'],
        ['micro', 'micro'],
        ['macro', 'macro'],
        ['weighted', 'weighted']
      ]}
    ],
    output: 'Number',
    colour: METRICS_COLOR,
    tooltip: 'Calculate precision score',
    helpUrl: ''
  },

  sklearn_recall_score: {
    type: 'sklearn_recall_score',
    message0: 'recall score y_true: %1 y_pred: %2 average: %3',
    args0: [
      { type: 'input_value', name: 'Y_TRUE', check: ['Series', 'Array'] },
      { type: 'input_value', name: 'Y_PRED', check: 'Array' },
      { type: 'field_dropdown', name: 'AVERAGE', options: [
        ['binary', 'binary'],
        ['micro', 'micro'],
        ['macro', 'macro'],
        ['weighted', 'weighted']
      ]}
    ],
    output: 'Number',
    colour: METRICS_COLOR,
    tooltip: 'Calculate recall score',
    helpUrl: ''
  },

  sklearn_f1_score: {
    type: 'sklearn_f1_score',
    message0: 'F1 score y_true: %1 y_pred: %2 average: %3',
    args0: [
      { type: 'input_value', name: 'Y_TRUE', check: ['Series', 'Array'] },
      { type: 'input_value', name: 'Y_PRED', check: 'Array' },
      { type: 'field_dropdown', name: 'AVERAGE', options: [
        ['binary', 'binary'],
        ['micro', 'micro'],
        ['macro', 'macro'],
        ['weighted', 'weighted']
      ]}
    ],
    output: 'Number',
    colour: METRICS_COLOR,
    tooltip: 'Calculate F1 score',
    helpUrl: ''
  },

  sklearn_confusion_matrix: {
    type: 'sklearn_confusion_matrix',
    message0: 'confusion matrix y_true: %1 y_pred: %2',
    args0: [
      { type: 'input_value', name: 'Y_TRUE', check: ['Series', 'Array'] },
      { type: 'input_value', name: 'Y_PRED', check: 'Array' }
    ],
    output: 'Array',
    colour: METRICS_COLOR,
    tooltip: 'Generate confusion matrix',
    helpUrl: ''
  },

  sklearn_classification_report: {
    type: 'sklearn_classification_report',
    message0: 'classification report y_true: %1 y_pred: %2',
    args0: [
      { type: 'input_value', name: 'Y_TRUE', check: ['Series', 'Array'] },
      { type: 'input_value', name: 'Y_PRED', check: 'Array' }
    ],
    output: 'String',
    colour: METRICS_COLOR,
    tooltip: 'Generate classification report',
    helpUrl: ''
  },

  // Metrics - Regression
  sklearn_mse: {
    type: 'sklearn_mse',
    message0: 'mean squared error y_true: %1 y_pred: %2',
    args0: [
      { type: 'input_value', name: 'Y_TRUE', check: ['Series', 'Array'] },
      { type: 'input_value', name: 'Y_PRED', check: 'Array' }
    ],
    output: 'Number',
    colour: METRICS_COLOR,
    tooltip: 'Calculate Mean Squared Error',
    helpUrl: ''
  },

  sklearn_rmse: {
    type: 'sklearn_rmse',
    message0: 'root mean squared error y_true: %1 y_pred: %2',
    args0: [
      { type: 'input_value', name: 'Y_TRUE', check: ['Series', 'Array'] },
      { type: 'input_value', name: 'Y_PRED', check: 'Array' }
    ],
    output: 'Number',
    colour: METRICS_COLOR,
    tooltip: 'Calculate Root Mean Squared Error',
    helpUrl: ''
  },

  sklearn_mae: {
    type: 'sklearn_mae',
    message0: 'mean absolute error y_true: %1 y_pred: %2',
    args0: [
      { type: 'input_value', name: 'Y_TRUE', check: ['Series', 'Array'] },
      { type: 'input_value', name: 'Y_PRED', check: 'Array' }
    ],
    output: 'Number',
    colour: METRICS_COLOR,
    tooltip: 'Calculate Mean Absolute Error',
    helpUrl: ''
  },

  sklearn_r2_score: {
    type: 'sklearn_r2_score',
    message0: 'R² score y_true: %1 y_pred: %2',
    args0: [
      { type: 'input_value', name: 'Y_TRUE', check: ['Series', 'Array'] },
      { type: 'input_value', name: 'Y_PRED', check: 'Array' }
    ],
    output: 'Number',
    colour: METRICS_COLOR,
    tooltip: 'Calculate R-squared score',
    helpUrl: ''
  },

  // Cross Validation
  sklearn_cross_val_score: {
    type: 'sklearn_cross_val_score',
    message0: 'cross validation score model: %1 X: %2 y: %3 cv: %4',
    args0: [
      { type: 'input_value', name: 'MODEL', check: ['Classifier', 'Regressor'] },
      { type: 'input_value', name: 'X', check: ['DataFrame', 'Array'] },
      { type: 'input_value', name: 'Y', check: ['Series', 'Array'] },
      { type: 'field_number', name: 'CV', value: 5, min: 2 }
    ],
    output: 'Array',
    colour: SKLEARN_COLOR,
    tooltip: 'Evaluate model with cross-validation',
    helpUrl: ''
  },

  // Dimensionality Reduction
  sklearn_pca: {
    type: 'sklearn_pca',
    message0: 'PCA n_components: %1',
    args0: [
      { type: 'field_number', name: 'N_COMPONENTS', value: 2, min: 1 }
    ],
    output: 'Transformer',
    colour: PREPROCESSING_COLOR,
    tooltip: 'Principal Component Analysis',
    helpUrl: ''
  },

  // Model variable
  sklearn_model_var: {
    type: 'sklearn_model_var',
    message0: 'model %1',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'model' }
    ],
    output: ['Classifier', 'Regressor', 'Clusterer'],
    colour: SKLEARN_COLOR,
    tooltip: 'Reference a model variable',
    helpUrl: ''
  },

  sklearn_set_model: {
    type: 'sklearn_set_model',
    message0: 'set %1 to %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'model' },
      { type: 'input_value', name: 'VALUE', check: ['Classifier', 'Regressor', 'Clusterer', 'Scaler', 'Encoder', 'Transformer'] }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: SKLEARN_COLOR,
    tooltip: 'Assign a model to a variable',
    helpUrl: ''
  }
};

export function registerSklearnBlocks(): void {
  Object.entries(sklearnBlocks).forEach(([name, definition]) => {
    Blockly.Blocks[name] = {
      init: function(this: Blockly.Block) {
        this.jsonInit(definition);
      }
    };
  });
}
