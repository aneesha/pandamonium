import type Blockly from 'blockly';

export const defaultToolbox: Blockly.utils.toolbox.ToolboxDefinition = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Data Loading',
      colour: '#E65C00',
      contents: [
        { kind: 'block', type: 'pandas_read_csv' },
        { kind: 'block', type: 'pandas_read_excel' },
        { kind: 'block', type: 'pandas_read_json' },
        { kind: 'block', type: 'pandas_create_dataframe' }
      ]
    },
    {
      kind: 'category',
      name: 'DataFrame',
      colour: '#E65C00',
      contents: [
        { kind: 'block', type: 'pandas_dataframe_var' },
        { kind: 'block', type: 'pandas_set_dataframe' },
        { kind: 'block', type: 'pandas_head' },
        { kind: 'block', type: 'pandas_tail' },
        { kind: 'block', type: 'pandas_sample' },
        { kind: 'block', type: 'pandas_shape' },
        { kind: 'block', type: 'pandas_columns' },
        { kind: 'block', type: 'pandas_dtypes' },
        { kind: 'block', type: 'pandas_describe' }
      ]
    },
    {
      kind: 'category',
      name: 'Column Operations',
      colour: '#E67300',
      contents: [
        { kind: 'block', type: 'pandas_select_column' },
        { kind: 'block', type: 'pandas_select_columns' },
        { kind: 'block', type: 'pandas_drop_columns' },
        { kind: 'block', type: 'pandas_rename_columns' }
      ]
    },
    {
      kind: 'category',
      name: 'Filtering',
      colour: '#E68A00',
      contents: [
        { kind: 'block', type: 'pandas_filter' },
        { kind: 'block', type: 'pandas_condition' },
        { kind: 'block', type: 'pandas_isnull' },
        { kind: 'block', type: 'pandas_notnull' },
        { kind: 'block', type: 'pandas_dropna' },
        { kind: 'block', type: 'pandas_fillna' }
      ]
    },
    {
      kind: 'category',
      name: 'Aggregation',
      colour: '#E6A000',
      contents: [
        { kind: 'block', type: 'pandas_groupby' },
        { kind: 'block', type: 'pandas_agg' },
        { kind: 'block', type: 'pandas_value_counts' },
        { kind: 'block', type: 'pandas_corr' }
      ]
    },
    {
      kind: 'category',
      name: 'Transform',
      colour: '#E6B700',
      contents: [
        { kind: 'block', type: 'pandas_sort_values' },
        { kind: 'block', type: 'pandas_merge' },
        { kind: 'block', type: 'pandas_concat' },
        { kind: 'block', type: 'pandas_pivot_table' },
        { kind: 'block', type: 'pandas_apply' }
      ]
    },
    {
      kind: 'category',
      name: 'Output',
      colour: '#E6CE00',
      contents: [
        { kind: 'block', type: 'pandas_to_csv' },
        { kind: 'block', type: 'pandas_print' }
      ]
    },
    { kind: 'sep' },
    {
      kind: 'category',
      name: 'Train/Test Split',
      colour: '#00897B',
      contents: [
        { kind: 'block', type: 'sklearn_train_test_split' },
        { kind: 'block', type: 'sklearn_get_train_data' },
        { kind: 'block', type: 'sklearn_get_test_data' }
      ]
    },
    {
      kind: 'category',
      name: 'Preprocessing',
      colour: '#00ACC1',
      contents: [
        { kind: 'block', type: 'sklearn_standard_scaler' },
        { kind: 'block', type: 'sklearn_minmax_scaler' },
        { kind: 'block', type: 'sklearn_robust_scaler' },
        { kind: 'block', type: 'sklearn_label_encoder' },
        { kind: 'block', type: 'sklearn_onehot_encoder' },
        { kind: 'block', type: 'sklearn_pca' },
        { kind: 'block', type: 'sklearn_fit_transform' },
        { kind: 'block', type: 'sklearn_transform' }
      ]
    },
    {
      kind: 'category',
      name: 'Classification',
      colour: '#5C6BC0',
      contents: [
        { kind: 'block', type: 'sklearn_logistic_regression' },
        { kind: 'block', type: 'sklearn_decision_tree_classifier' },
        { kind: 'block', type: 'sklearn_random_forest_classifier' },
        { kind: 'block', type: 'sklearn_svc' },
        { kind: 'block', type: 'sklearn_knn_classifier' },
        { kind: 'block', type: 'sklearn_naive_bayes' }
      ]
    },
    {
      kind: 'category',
      name: 'Regression',
      colour: '#7E57C2',
      contents: [
        { kind: 'block', type: 'sklearn_linear_regression' },
        { kind: 'block', type: 'sklearn_ridge' },
        { kind: 'block', type: 'sklearn_lasso' },
        { kind: 'block', type: 'sklearn_decision_tree_regressor' },
        { kind: 'block', type: 'sklearn_random_forest_regressor' },
        { kind: 'block', type: 'sklearn_svr' }
      ]
    },
    {
      kind: 'category',
      name: 'Clustering',
      colour: '#AB47BC',
      contents: [
        { kind: 'block', type: 'sklearn_kmeans' },
        { kind: 'block', type: 'sklearn_dbscan' }
      ]
    },
    {
      kind: 'category',
      name: 'Model Operations',
      colour: '#EC407A',
      contents: [
        { kind: 'block', type: 'sklearn_model_var' },
        { kind: 'block', type: 'sklearn_set_model' },
        { kind: 'block', type: 'sklearn_fit' },
        { kind: 'block', type: 'sklearn_predict' },
        { kind: 'block', type: 'sklearn_predict_proba' },
        { kind: 'block', type: 'sklearn_score' },
        { kind: 'block', type: 'sklearn_cross_val_score' }
      ]
    },
    {
      kind: 'category',
      name: 'Metrics',
      colour: '#EF5350',
      contents: [
        { kind: 'block', type: 'sklearn_accuracy_score' },
        { kind: 'block', type: 'sklearn_precision_score' },
        { kind: 'block', type: 'sklearn_recall_score' },
        { kind: 'block', type: 'sklearn_f1_score' },
        { kind: 'block', type: 'sklearn_confusion_matrix' },
        { kind: 'block', type: 'sklearn_classification_report' },
        { kind: 'block', type: 'sklearn_mse' },
        { kind: 'block', type: 'sklearn_rmse' },
        { kind: 'block', type: 'sklearn_mae' },
        { kind: 'block', type: 'sklearn_r2_score' }
      ]
    },
    { kind: 'sep' },
    {
      kind: 'category',
      name: 'Values',
      colour: '#9575CD',
      contents: [
        { kind: 'block', type: 'text_value' },
        { kind: 'block', type: 'number_value' },
        { kind: 'block', type: 'boolean_value' },
        { kind: 'block', type: 'none_value' }
      ]
    },
    {
      kind: 'category',
      name: 'Collections',
      colour: '#4DB6AC',
      contents: [
        { kind: 'block', type: 'array_create' },
        { kind: 'block', type: 'array_create_with' },
        { kind: 'block', type: 'array_length' },
        { kind: 'block', type: 'dict_create' },
        { kind: 'block', type: 'dict_get' }
      ]
    },
    {
      kind: 'category',
      name: 'Logic',
      colour: '#42A5F5',
      contents: [
        { kind: 'block', type: 'logic_compare' },
        { kind: 'block', type: 'logic_operation' },
        { kind: 'block', type: 'logic_not' }
      ]
    },
    {
      kind: 'category',
      name: 'Math',
      colour: '#66BB6A',
      contents: [
        { kind: 'block', type: 'math_arithmetic' }
      ]
    },
    {
      kind: 'category',
      name: 'Functions',
      colour: '#FF7043',
      contents: [
        { kind: 'block', type: 'lambda_simple' }
      ]
    },
    {
      kind: 'category',
      name: 'Variables',
      colour: '#8D6E63',
      contents: [
        { kind: 'block', type: 'var_set' },
        { kind: 'block', type: 'var_get' },
        { kind: 'block', type: 'comment_block' }
      ]
    }
  ]
};
