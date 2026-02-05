import * as n from "blockly";
import { default as v } from "blockly";
const d = {
  data: "#E65C00",
  transform: "#FB8C00"
}, _ = {
  // --- DATA LOADING ---
  load_data: {
    type: "load_data",
    init: function() {
      this.appendDummyInput().appendField("Load").appendField(new n.FieldDropdown([
        ["CSV", "csv"],
        ["Excel", "excel"],
        ["JSON", "json"],
        ["from URL", "url"]
      ]), "TYPE").appendField("→").appendField(new n.FieldTextInput("df"), "VAR"), this.appendDummyInput().appendField("Path:").appendField(new n.FieldTextInput("data.csv"), "PATH"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(d.data), this.setTooltip("Load data from file into a DataFrame");
    }
  },
  // --- DATA PREVIEW ---
  preview_data: {
    type: "preview_data",
    init: function() {
      this.appendDummyInput().appendField("Preview").appendField(new n.FieldTextInput("df"), "VAR").appendField(":").appendField(new n.FieldDropdown([
        ["first rows", "head"],
        ["last rows", "tail"],
        ["statistics", "describe"],
        ["shape", "shape"],
        ["columns", "columns"],
        ["data types", "dtypes"],
        ["info", "info"],
        ["sample", "sample"]
      ]), "TYPE").appendField(new n.FieldNumber(5, 1, 100), "N"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(d.data), this.setTooltip("Preview data in different ways");
    }
  },
  // --- SELECT COLUMNS ---
  select_columns: {
    type: "select_columns",
    init: function() {
      this.appendDummyInput().appendField(new n.FieldDropdown([
        ["Keep columns", "keep"],
        ["Drop columns", "drop"]
      ]), "ACTION").appendField("from").appendField(new n.FieldTextInput("df"), "VAR"), this.appendDummyInput().appendField("Columns:").appendField(new n.FieldTextInput("col1, col2"), "COLUMNS"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(d.transform), this.setTooltip("Keep or drop specific columns");
    }
  },
  // --- FILTER ROWS ---
  filter_rows: {
    type: "filter_rows",
    init: function() {
      this.appendDummyInput().appendField("Filter").appendField(new n.FieldTextInput("df"), "VAR").appendField("where"), this.appendDummyInput().appendField(new n.FieldTextInput("column"), "COLUMN").appendField(new n.FieldDropdown([
        ["==", "=="],
        ["!=", "!="],
        [">", ">"],
        ["<", "<"],
        [">=", ">="],
        ["<=", "<="],
        ["contains", "contains"],
        ["is null", "isnull"],
        ["not null", "notnull"]
      ]), "OP").appendField(new n.FieldTextInput("value"), "VALUE"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(d.transform), this.setTooltip("Filter rows based on condition");
    }
  },
  // --- HANDLE MISSING ---
  handle_missing: {
    type: "handle_missing",
    init: function() {
      this.appendDummyInput().appendField("Handle missing in").appendField(new n.FieldTextInput("df"), "VAR"), this.appendDummyInput().appendField(new n.FieldDropdown([
        ["Drop rows with nulls", "drop"],
        ["Fill with value", "value"],
        ["Fill with mean", "mean"],
        ["Fill with median", "median"],
        ["Fill with mode", "mode"],
        ["Forward fill", "ffill"],
        ["Backward fill", "bfill"]
      ]), "METHOD").appendField(new n.FieldTextInput("0"), "FILL_VALUE"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(d.transform), this.setTooltip("Handle missing values");
    }
  },
  // --- SORT DATA ---
  sort_data: {
    type: "sort_data",
    init: function() {
      this.appendDummyInput().appendField("Sort").appendField(new n.FieldTextInput("df"), "VAR").appendField("by").appendField(new n.FieldTextInput("column"), "COLUMN").appendField(new n.FieldDropdown([
        ["ascending", "True"],
        ["descending", "False"]
      ]), "ORDER"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(d.transform), this.setTooltip("Sort data by column");
    }
  },
  // --- GROUP & SUMMARIZE ---
  group_summarize: {
    type: "group_summarize",
    init: function() {
      this.appendDummyInput().appendField("Group").appendField(new n.FieldTextInput("df"), "VAR").appendField("by").appendField(new n.FieldTextInput("group_col"), "GROUP_COL"), this.appendDummyInput().appendField("Calc").appendField(new n.FieldDropdown([
        ["sum", "sum"],
        ["mean", "mean"],
        ["count", "count"],
        ["min", "min"],
        ["max", "max"],
        ["median", "median"],
        ["std", "std"]
      ]), "AGG").appendField("of").appendField(new n.FieldTextInput("value_col"), "VALUE_COL").appendField("→").appendField(new n.FieldTextInput("result"), "RESULT_VAR"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(d.transform), this.setTooltip("Group by column and aggregate");
    }
  },
  // --- MERGE DATA ---
  merge_data: {
    type: "merge_data",
    init: function() {
      this.appendDummyInput().appendField("Merge").appendField(new n.FieldTextInput("df1"), "LEFT").appendField("with").appendField(new n.FieldTextInput("df2"), "RIGHT"), this.appendDummyInput().appendField("On:").appendField(new n.FieldTextInput("key"), "ON").appendField("How:").appendField(new n.FieldDropdown([
        ["inner", "inner"],
        ["left", "left"],
        ["right", "right"],
        ["outer", "outer"]
      ]), "HOW").appendField("→").appendField(new n.FieldTextInput("merged"), "RESULT"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(d.transform), this.setTooltip("Merge two DataFrames");
    }
  }
};
function g() {
  Object.entries(_).forEach(([o, e]) => {
    typeof e.init == "function" ? n.Blocks[o] = {
      init: e.init
    } : n.Blocks[o] = {
      init: function() {
        this.jsonInit(e);
      }
    };
  });
}
const l = {
  ml_prep: "#00897B",
  ml_model: "#5C6BC0",
  ml_eval: "#EF5350"
}, y = {
  // --- PREPARE FEATURES (ML) ---
  prepare_features: {
    type: "prepare_features",
    init: function() {
      this.appendDummyInput().appendField("Prepare ML data from").appendField(new n.FieldTextInput("df"), "VAR"), this.appendDummyInput().appendField("Features:").appendField(new n.FieldTextInput("col1, col2, col3"), "FEATURES"), this.appendDummyInput().appendField("Target:").appendField(new n.FieldTextInput("target"), "TARGET"), this.appendDummyInput().appendField("→ X:").appendField(new n.FieldTextInput("X"), "X_VAR").appendField("y:").appendField(new n.FieldTextInput("y"), "Y_VAR"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(l.ml_prep), this.setTooltip("Extract features (X) and target (y) for ML");
    }
  },
  // --- SPLIT DATA ---
  split_data: {
    type: "split_data",
    init: function() {
      this.appendDummyInput().appendField("Split").appendField(new n.FieldTextInput("X"), "X_VAR").appendField(",").appendField(new n.FieldTextInput("y"), "Y_VAR").appendField("test:").appendField(new n.FieldNumber(0.2, 0.1, 0.5, 0.05), "TEST_SIZE"), this.appendDummyInput().appendField("→ X_train, X_test, y_train, y_test"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(l.ml_prep), this.setTooltip("Split into train and test sets");
    }
  },
  // --- SCALE FEATURES ---
  scale_features: {
    type: "scale_features",
    init: function() {
      this.appendDummyInput().appendField("Scale features").appendField(new n.FieldDropdown([
        ["StandardScaler (z-score)", "standard"],
        ["MinMaxScaler (0-1)", "minmax"],
        ["RobustScaler (outliers)", "robust"]
      ]), "SCALER"), this.appendDummyInput().appendField("Fit on X_train, transform X_train & X_test"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(l.ml_prep), this.setTooltip("Scale/normalize features");
    }
  },
  // --- CREATE MODEL ---
  create_model: {
    type: "create_model",
    init: function() {
      this.appendDummyInput().appendField("Create").appendField(new n.FieldDropdown([
        ["Linear Regression", "linear_reg"],
        ["Logistic Regression", "logistic_reg"],
        ["Decision Tree", "decision_tree"],
        ["Random Forest", "random_forest"],
        ["KNN", "knn"],
        ["SVM", "svm"],
        ["Naive Bayes", "naive_bayes"],
        ["Gradient Boosting", "gradient_boost"]
      ]), "MODEL_TYPE").appendField("→").appendField(new n.FieldTextInput("model"), "MODEL_VAR"), this.appendDummyInput().appendField("Task:").appendField(new n.FieldDropdown([
        ["Classification", "classifier"],
        ["Regression", "regressor"]
      ]), "TASK"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(l.ml_model), this.setTooltip("Create an ML model");
    }
  },
  // --- TRAIN MODEL ---
  train_model: {
    type: "train_model",
    init: function() {
      this.appendDummyInput().appendField("Train").appendField(new n.FieldTextInput("model"), "MODEL_VAR").appendField("on X_train, y_train"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(l.ml_model), this.setTooltip("Train the model on training data");
    }
  },
  // --- PREDICT ---
  predict: {
    type: "predict",
    init: function() {
      this.appendDummyInput().appendField("Predict with").appendField(new n.FieldTextInput("model"), "MODEL_VAR").appendField("on").appendField(new n.FieldDropdown([
        ["X_test", "X_test"],
        ["X_train", "X_train"],
        ["X", "X"]
      ]), "DATA").appendField("→").appendField(new n.FieldTextInput("y_pred"), "PRED_VAR"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(l.ml_model), this.setTooltip("Make predictions");
    }
  },
  // --- GRID SEARCH ---
  grid_search: {
    type: "grid_search",
    init: function() {
      this.appendDummyInput().appendField("Grid Search").appendField(new n.FieldTextInput("model"), "MODEL_VAR"), this.appendDummyInput().appendField("Params:").appendField(new n.FieldTextInput("n_estimators: [50,100], max_depth: [3,5,10]"), "PARAMS"), this.appendDummyInput().appendField("CV folds:").appendField(new n.FieldNumber(5, 2, 10), "CV").appendField("Scoring:").appendField(new n.FieldDropdown([
        ["accuracy", "accuracy"],
        ["f1", "f1"],
        ["precision", "precision"],
        ["recall", "recall"],
        ["r2", "r2"],
        ["neg_mse", "neg_mean_squared_error"]
      ]), "SCORING"), this.appendDummyInput().appendField("→ best model in").appendField(new n.FieldTextInput("model"), "BEST_VAR"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(l.ml_model), this.setTooltip("Find best hyperparameters with grid search");
    }
  },
  // --- CROSS VALIDATE ---
  cross_validate: {
    type: "cross_validate",
    init: function() {
      this.appendDummyInput().appendField("Cross-validate").appendField(new n.FieldTextInput("model"), "MODEL_VAR").appendField("folds:").appendField(new n.FieldNumber(5, 2, 10), "CV"), this.appendDummyInput().appendField("Print mean score ± std"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(l.ml_eval), this.setTooltip("Evaluate with cross-validation");
    }
  },
  // --- EVALUATE ---
  evaluate: {
    type: "evaluate",
    init: function() {
      this.appendDummyInput().appendField("Evaluate:").appendField(new n.FieldDropdown([
        ["Accuracy", "accuracy"],
        ["Precision", "precision"],
        ["Recall", "recall"],
        ["F1 Score", "f1"],
        ["Confusion Matrix", "confusion"],
        ["Classification Report", "class_report"],
        ["MSE", "mse"],
        ["RMSE", "rmse"],
        ["MAE", "mae"],
        ["R² Score", "r2"]
      ]), "METRIC"), this.appendDummyInput().appendField("y_true:").appendField(new n.FieldDropdown([
        ["y_test", "y_test"],
        ["y_train", "y_train"],
        ["y", "y"]
      ]), "Y_TRUE").appendField("y_pred:").appendField(new n.FieldTextInput("y_pred"), "Y_PRED"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(l.ml_eval), this.setTooltip("Calculate evaluation metric");
    }
  }
};
function $() {
  Object.entries(y).forEach(([o, e]) => {
    typeof e.init == "function" ? n.Blocks[o] = {
      init: e.init
    } : n.Blocks[o] = {
      init: function() {
        this.jsonInit(e);
      }
    };
  });
}
const m = {
  output: "#8E24AA",
  comment: 160
}, w = {
  // --- OUTPUT ---
  output: {
    type: "output",
    init: function() {
      this.appendDummyInput().appendField(new n.FieldDropdown([
        ["Print", "print"],
        ["Save as CSV", "csv"],
        ["Save as Excel", "excel"]
      ]), "TYPE").appendField(new n.FieldTextInput("df"), "VAR"), this.appendDummyInput().appendField("Path:").appendField(new n.FieldTextInput("output.csv"), "PATH"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(m.output), this.setTooltip("Output data");
    }
  },
  // --- COMMENT ---
  comment: {
    type: "comment",
    init: function() {
      this.appendDummyInput().appendField("#").appendField(new n.FieldTextInput("comment"), "TEXT"), this.setPreviousStatement(!0, null), this.setNextStatement(!0, null), this.setColour(m.comment), this.setTooltip("Add a comment");
    }
  }
};
function V() {
  Object.entries(w).forEach(([o, e]) => {
    typeof e.init == "function" ? n.Blocks[o] = {
      init: e.init
    } : n.Blocks[o] = {
      init: function() {
        this.jsonInit(e);
      }
    };
  });
}
class I extends n.Generator {
  constructor() {
    super("Python"), this.imports = /* @__PURE__ */ new Set(), this.INDENT = "    ", this.registerGenerators(), this.setupScrub();
  }
  setupScrub() {
    this.scrub_ = (e, t, i) => {
      const s = e.nextConnection && e.nextConnection.targetBlock();
      return s && !i ? t + this.blockToCode(s) : t;
    };
  }
  getImports() {
    return Array.from(this.imports);
  }
  clearImports() {
    this.imports.clear();
  }
  addImport(e) {
    this.imports.add(e);
  }
  registerGenerators() {
    this.forBlock.load_data = (e) => {
      this.addImport("import pandas as pd");
      const t = e.getFieldValue("TYPE"), i = e.getFieldValue("VAR"), s = e.getFieldValue("PATH");
      let r = "";
      return t === "csv" || t === "url" ? r = `${i} = pd.read_csv("${s}")
` : t === "excel" ? r = `${i} = pd.read_excel("${s}")
` : t === "json" && (r = `${i} = pd.read_json("${s}")
`), r;
    }, this.forBlock.preview_data = (e) => {
      const t = e.getFieldValue("VAR"), i = e.getFieldValue("TYPE"), s = e.getFieldValue("N");
      let r = "";
      return i === "head" ? r = `print(${t}.head(${s}))
` : i === "tail" ? r = `print(${t}.tail(${s}))
` : i === "describe" ? r = `print(${t}.describe())
` : i === "shape" ? r = `print(f"Shape: {${t}.shape}")
` : i === "columns" ? r = `print(f"Columns: {${t}.columns.tolist()}")
` : i === "dtypes" ? r = `print(${t}.dtypes)
` : i === "info" ? r = `print(${t}.info())
` : i === "sample" && (r = `print(${t}.sample(${s}))
`), r;
    }, this.forBlock.select_columns = (e) => {
      const t = e.getFieldValue("ACTION"), i = e.getFieldValue("VAR"), s = e.getFieldValue("COLUMNS").split(",").map((r) => `"${r.trim()}"`).join(", ");
      return t === "keep" ? `${i} = ${i}[[${s}]]
` : `${i} = ${i}.drop(columns=[${s}])
`;
    }, this.forBlock.filter_rows = (e) => {
      const t = e.getFieldValue("VAR"), i = e.getFieldValue("COLUMN"), s = e.getFieldValue("OP"), r = e.getFieldValue("VALUE");
      let a = "";
      if (s === "isnull")
        a = `${t} = ${t}[${t}["${i}"].isnull()]
`;
      else if (s === "notnull")
        a = `${t} = ${t}[${t}["${i}"].notnull()]
`;
      else if (s === "contains")
        a = `${t} = ${t}[${t}["${i}"].str.contains("${r}", na=False)]
`;
      else {
        const u = isNaN(Number(r)) ? `"${r}"` : r;
        a = `${t} = ${t}[${t}["${i}"] ${s} ${u}]
`;
      }
      return a;
    }, this.forBlock.handle_missing = (e) => {
      const t = e.getFieldValue("VAR"), i = e.getFieldValue("METHOD"), s = e.getFieldValue("FILL_VALUE");
      let r = "";
      if (i === "drop")
        r = `${t} = ${t}.dropna()
`;
      else if (i === "value") {
        const a = isNaN(Number(s)) ? `"${s}"` : s;
        r = `${t} = ${t}.fillna(${a})
`;
      } else i === "mean" ? r = `${t} = ${t}.fillna(${t}.mean(numeric_only=True))
` : i === "median" ? r = `${t} = ${t}.fillna(${t}.median(numeric_only=True))
` : i === "mode" ? r = `${t} = ${t}.fillna(${t}.mode().iloc[0])
` : i === "ffill" ? r = `${t} = ${t}.ffill()
` : i === "bfill" && (r = `${t} = ${t}.bfill()
`);
      return r;
    }, this.forBlock.sort_data = (e) => {
      const t = e.getFieldValue("VAR"), i = e.getFieldValue("COLUMN"), s = e.getFieldValue("ORDER");
      return `${t} = ${t}.sort_values("${i}", ascending=${s})
`;
    }, this.forBlock.group_summarize = (e) => {
      const t = e.getFieldValue("VAR"), i = e.getFieldValue("GROUP_COL"), s = e.getFieldValue("AGG"), r = e.getFieldValue("VALUE_COL"), a = e.getFieldValue("RESULT_VAR");
      return `${a} = ${t}.groupby("${i}")["${r}"].${s}().reset_index()
print(${a})
`;
    }, this.forBlock.merge_data = (e) => {
      this.addImport("import pandas as pd");
      const t = e.getFieldValue("LEFT"), i = e.getFieldValue("RIGHT"), s = e.getFieldValue("ON"), r = e.getFieldValue("HOW");
      return `${e.getFieldValue("RESULT")} = pd.merge(${t}, ${i}, on="${s}", how="${r}")
`;
    }, this.forBlock.prepare_features = (e) => {
      const t = e.getFieldValue("VAR"), i = e.getFieldValue("FEATURES").split(",").map((u) => `"${u.trim()}"`).join(", "), s = e.getFieldValue("TARGET"), r = e.getFieldValue("X_VAR"), a = e.getFieldValue("Y_VAR");
      return `${r} = ${t}[[${i}]]
${a} = ${t}["${s}"]
`;
    }, this.forBlock.split_data = (e) => {
      this.addImport("from sklearn.model_selection import train_test_split");
      const t = e.getFieldValue("X_VAR"), i = e.getFieldValue("Y_VAR"), s = e.getFieldValue("TEST_SIZE");
      return `X_train, X_test, y_train, y_test = train_test_split(${t}, ${i}, test_size=${s}, random_state=42)
`;
    }, this.forBlock.scale_features = (e) => {
      const t = e.getFieldValue("SCALER");
      let i = "StandardScaler";
      return t === "minmax" ? i = "MinMaxScaler" : t === "robust" && (i = "RobustScaler"), this.addImport(`from sklearn.preprocessing import ${i}`), `scaler = ${i}()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
`;
    }, this.forBlock.create_model = (e) => {
      const t = e.getFieldValue("MODEL_TYPE"), i = e.getFieldValue("TASK"), s = e.getFieldValue("MODEL_VAR");
      let r = "";
      return t === "linear_reg" ? (this.addImport("from sklearn.linear_model import LinearRegression"), r = `${s} = LinearRegression()
`) : t === "logistic_reg" ? (this.addImport("from sklearn.linear_model import LogisticRegression"), r = `${s} = LogisticRegression(max_iter=1000)
`) : t === "decision_tree" ? i === "classifier" ? (this.addImport("from sklearn.tree import DecisionTreeClassifier"), r = `${s} = DecisionTreeClassifier(random_state=42)
`) : (this.addImport("from sklearn.tree import DecisionTreeRegressor"), r = `${s} = DecisionTreeRegressor(random_state=42)
`) : t === "random_forest" ? i === "classifier" ? (this.addImport("from sklearn.ensemble import RandomForestClassifier"), r = `${s} = RandomForestClassifier(n_estimators=100, random_state=42)
`) : (this.addImport("from sklearn.ensemble import RandomForestRegressor"), r = `${s} = RandomForestRegressor(n_estimators=100, random_state=42)
`) : t === "knn" ? i === "classifier" ? (this.addImport("from sklearn.neighbors import KNeighborsClassifier"), r = `${s} = KNeighborsClassifier(n_neighbors=5)
`) : (this.addImport("from sklearn.neighbors import KNeighborsRegressor"), r = `${s} = KNeighborsRegressor(n_neighbors=5)
`) : t === "svm" ? i === "classifier" ? (this.addImport("from sklearn.svm import SVC"), r = `${s} = SVC(random_state=42)
`) : (this.addImport("from sklearn.svm import SVR"), r = `${s} = SVR()
`) : t === "naive_bayes" ? (this.addImport("from sklearn.naive_bayes import GaussianNB"), r = `${s} = GaussianNB()
`) : t === "gradient_boost" && (i === "classifier" ? (this.addImport("from sklearn.ensemble import GradientBoostingClassifier"), r = `${s} = GradientBoostingClassifier(random_state=42)
`) : (this.addImport("from sklearn.ensemble import GradientBoostingRegressor"), r = `${s} = GradientBoostingRegressor(random_state=42)
`)), r;
    }, this.forBlock.train_model = (e) => {
      const t = e.getFieldValue("MODEL_VAR");
      return `${t}.fit(X_train, y_train)
print(f"Model trained: {type(${t}).__name__}")
`;
    }, this.forBlock.predict = (e) => {
      const t = e.getFieldValue("MODEL_VAR"), i = e.getFieldValue("DATA");
      return `${e.getFieldValue("PRED_VAR")} = ${t}.predict(${i})
`;
    }, this.forBlock.grid_search = (e) => {
      this.addImport("from sklearn.model_selection import GridSearchCV");
      const t = e.getFieldValue("MODEL_VAR"), i = e.getFieldValue("PARAMS"), s = e.getFieldValue("CV"), r = e.getFieldValue("SCORING"), a = e.getFieldValue("BEST_VAR");
      return `param_grid = {${i.split(",").map((c) => {
        const [h, f] = c.split(":").map((F) => F.trim());
        return `"${h}": ${f}`;
      }).join(", ")}}
grid_search = GridSearchCV(${t}, param_grid, cv=${s}, scoring="${r}")
grid_search.fit(X_train, y_train)
${a} = grid_search.best_estimator_
print(f"Best params: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_:.4f}")
`;
    }, this.forBlock.cross_validate = (e) => {
      this.addImport("from sklearn.model_selection import cross_val_score"), this.addImport("import numpy as np");
      const t = e.getFieldValue("MODEL_VAR"), i = e.getFieldValue("CV");
      return `cv_scores = cross_val_score(${t}, X_train, y_train, cv=${i})
print(f"CV Score: {cv_scores.mean():.4f} (+/- {cv_scores.std()*2:.4f})")
`;
    }, this.forBlock.evaluate = (e) => {
      const t = e.getFieldValue("METRIC"), i = e.getFieldValue("Y_TRUE"), s = e.getFieldValue("Y_PRED");
      let r = "";
      return t === "accuracy" ? (this.addImport("from sklearn.metrics import accuracy_score"), r = `print(f"Accuracy: {accuracy_score(${i}, ${s}):.4f}")
`) : t === "precision" ? (this.addImport("from sklearn.metrics import precision_score"), r = `print(f"Precision: {precision_score(${i}, ${s}, average='weighted'):.4f}")
`) : t === "recall" ? (this.addImport("from sklearn.metrics import recall_score"), r = `print(f"Recall: {recall_score(${i}, ${s}, average='weighted'):.4f}")
`) : t === "f1" ? (this.addImport("from sklearn.metrics import f1_score"), r = `print(f"F1 Score: {f1_score(${i}, ${s}, average='weighted'):.4f}")
`) : t === "confusion" ? (this.addImport("from sklearn.metrics import confusion_matrix"), r = `print("Confusion Matrix:")
print(confusion_matrix(${i}, ${s}))
`) : t === "class_report" ? (this.addImport("from sklearn.metrics import classification_report"), r = `print("Classification Report:")
print(classification_report(${i}, ${s}))
`) : t === "mse" ? (this.addImport("from sklearn.metrics import mean_squared_error"), r = `print(f"MSE: {mean_squared_error(${i}, ${s}):.4f}")
`) : t === "rmse" ? (this.addImport("from sklearn.metrics import mean_squared_error"), this.addImport("import numpy as np"), r = `print(f"RMSE: {np.sqrt(mean_squared_error(${i}, ${s})):.4f}")
`) : t === "mae" ? (this.addImport("from sklearn.metrics import mean_absolute_error"), r = `print(f"MAE: {mean_absolute_error(${i}, ${s}):.4f}")
`) : t === "r2" && (this.addImport("from sklearn.metrics import r2_score"), r = `print(f"R² Score: {r2_score(${i}, ${s}):.4f}")
`), r;
    }, this.forBlock.output = (e) => {
      const t = e.getFieldValue("TYPE"), i = e.getFieldValue("VAR"), s = e.getFieldValue("PATH");
      return t === "print" ? `print(${i})
` : t === "csv" ? `${i}.to_csv("${s}", index=False)
print(f"Saved to ${s}")
` : t === "excel" ? `${i}.to_excel("${s}", index=False)
print(f"Saved to ${s}")
` : "";
    }, this.forBlock.comment = (e) => `# ${e.getFieldValue("TEXT")}
`;
  }
  generateCode(e) {
    this.clearImports();
    const t = this.workspaceToCode(e), i = this.getImports();
    let s = "";
    return i.length > 0 && (s = i.sort().join(`
`) + `

`), s += t, s;
  }
}
const T = new I(), p = {
  data: "#E65C00",
  transform: "#FB8C00",
  ml_prep: "#00897B",
  ml_model: "#5C6BC0",
  ml_eval: "#EF5350",
  output: "#8E24AA"
}, k = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "📂 Load Data",
      colour: p.data,
      contents: [
        { kind: "block", type: "load_data" },
        { kind: "block", type: "preview_data" }
      ]
    },
    {
      kind: "category",
      name: "🔧 Transform",
      colour: p.transform,
      contents: [
        { kind: "block", type: "select_columns" },
        { kind: "block", type: "filter_rows" },
        { kind: "block", type: "handle_missing" },
        { kind: "block", type: "sort_data" },
        { kind: "block", type: "group_summarize" },
        { kind: "block", type: "merge_data" }
      ]
    },
    {
      kind: "category",
      name: "🎯 ML Prep",
      colour: p.ml_prep,
      contents: [
        { kind: "block", type: "prepare_features" },
        { kind: "block", type: "split_data" },
        { kind: "block", type: "scale_features" }
      ]
    },
    {
      kind: "category",
      name: "🤖 Models",
      colour: p.ml_model,
      contents: [
        { kind: "block", type: "create_model" },
        { kind: "block", type: "train_model" },
        { kind: "block", type: "predict" },
        { kind: "block", type: "grid_search" },
        { kind: "block", type: "cross_validate" }
      ]
    },
    {
      kind: "category",
      name: "📊 Evaluate",
      colour: p.ml_eval,
      contents: [
        { kind: "block", type: "evaluate" }
      ]
    },
    {
      kind: "category",
      name: "📤 Output",
      colour: p.output,
      contents: [
        { kind: "block", type: "output" },
        { kind: "block", type: "comment" }
      ]
    }
  ]
};
class S {
  constructor(e) {
    this.workspace = null, this.onChangeCallbacks = [], this.config = e, this.container = e.container, this.generator = T, this.registerBlocks(), this.initWorkspace();
  }
  registerBlocks() {
    g(), $(), V();
  }
  initWorkspace() {
    const e = this.config.toolbox || k;
    this.workspace = n.inject(this.container, {
      toolbox: e,
      grid: {
        spacing: 20,
        length: 3,
        colour: "#ccc",
        snap: !0
      },
      zoom: {
        controls: !0,
        wheel: !0,
        startScale: 1,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      trashcan: !0,
      move: {
        scrollbars: !0,
        drag: !0,
        wheel: !0
      },
      readOnly: this.config.readOnly || !1,
      theme: this.config.theme
    }), this.workspace.addChangeListener(() => {
      const t = this.generateCode();
      this.onChangeCallbacks.forEach((i) => i(t));
    });
  }
  generateCode() {
    return this.workspace ? this.generator.generateCode(this.workspace) : "";
  }
  getWorkspace() {
    return this.workspace;
  }
  onChange(e) {
    this.onChangeCallbacks.push(e);
  }
  offChange(e) {
    const t = this.onChangeCallbacks.indexOf(e);
    t > -1 && this.onChangeCallbacks.splice(t, 1);
  }
  loadWorkspace(e) {
    this.workspace && n.serialization.workspaces.load(e, this.workspace);
  }
  saveWorkspace() {
    return this.workspace ? n.serialization.workspaces.save(this.workspace) : {};
  }
  clearWorkspace() {
    this.workspace && this.workspace.clear();
  }
  resize() {
    this.workspace && n.svgResize(this.workspace);
  }
  dispose() {
    this.workspace && (this.workspace.dispose(), this.workspace = null), this.onChangeCallbacks = [];
  }
  undo() {
    this.workspace && this.workspace.undo(!1);
  }
  redo() {
    this.workspace && this.workspace.undo(!0);
  }
  setReadOnly(e) {
    this.workspace && (this.workspace.options.readOnly = e);
  }
}
export {
  v as Blockly,
  S as Pandamonium,
  I as PythonGenerator,
  w as commonBlocks,
  k as defaultToolbox,
  _ as pandasBlocks,
  T as pythonGenerator,
  V as registerCommonBlocks,
  g as registerPandasBlocks,
  $ as registerSklearnBlocks,
  y as sklearnBlocks
};
