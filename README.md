# 🐼 Pandamonium

> Visual programming for Data Science with Pandas and Scikit-Learn

Pandamonium is a Blockly-based visual programming library that lets you build data science workflows by dragging and dropping blocks. It generates clean Python code that you can run with Pandas and Scikit-Learn.

![Pandamonium Screenshot](https://via.placeholder.com/800x400?text=Pandamonium+Visual+Data+Science)

## Features

- **Visual Block Editor** - Drag-and-drop interface powered by Blockly
- **Pandas Blocks** - Data loading, manipulation, filtering, grouping, merging
- **Scikit-Learn Blocks** - Preprocessing, classification, regression, clustering, metrics
- **Python Code Generation** - Generates clean, runnable Python with proper imports
- **Interactive Playground** - Built-in playground with Pyodide for live Python execution
- **TypeScript Support** - Fully typed for great IDE support

## Installation

### Via npm

```bash
npm install pandamonium
```

### Via CDN

```html
<script src="https://unpkg.com/blockly/blockly.min.js"></script>
<script src="https://unpkg.com/pandamonium/dist/pandamonium.umd.js"></script>
```

## Quick Start

### Using as ES Module

```typescript
import { Pandamonium } from 'pandamonium';

const pandamonium = new Pandamonium({
  container: document.getElementById('blockly-container')
});

// Listen for code changes
pandamonium.onChange((code) => {
  console.log('Generated Python:', code);
});

// Generate code manually
const code = pandamonium.generateCode();
```

### Using via CDN

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/blockly/blockly.min.js"></script>
  <script src="./dist/pandamonium.umd.js"></script>
</head>
<body>
  <div id="blockly" style="width: 100%; height: 600px;"></div>

  <script>
    const pandamonium = new Pandamonium.Pandamonium({
      container: document.getElementById('blockly')
    });

    pandamonium.onChange((code) => {
      console.log(code);
    });
  </script>
</body>
</html>
```

## API Reference

### `Pandamonium`

Main class for creating a Pandamonium editor.

```typescript
const pandamonium = new Pandamonium(config: PandamoniumConfig);
```

#### Config Options

| Option | Type | Description |
|--------|------|-------------|
| `container` | `HTMLElement` | Required. The container element for the Blockly workspace |
| `toolbox` | `ToolboxDefinition` | Optional. Custom toolbox configuration |
| `readOnly` | `boolean` | Optional. Make the workspace read-only |
| `theme` | `Blockly.Theme` | Optional. Custom Blockly theme |

#### Methods

| Method | Description |
|--------|-------------|
| `generateCode()` | Returns the generated Python code as a string |
| `onChange(callback)` | Register a callback for when the workspace changes |
| `offChange(callback)` | Unregister a change callback |
| `loadWorkspace(json)` | Load a workspace from JSON |
| `saveWorkspace()` | Save the workspace to JSON |
| `clearWorkspace()` | Clear all blocks |
| `resize()` | Resize the workspace (call after container resize) |
| `dispose()` | Clean up and destroy the workspace |
| `undo()` | Undo the last action |
| `redo()` | Redo the last undone action |
| `getWorkspace()` | Get the underlying Blockly workspace |

## Available Blocks

### Pandas - Data Loading
- `read CSV` - Load CSV file into DataFrame
- `read Excel` - Load Excel file into DataFrame
- `read JSON` - Load JSON file into DataFrame
- `create DataFrame` - Create DataFrame from dictionary

### Pandas - DataFrame Operations
- `head` / `tail` - Get first/last n rows
- `sample` - Random sample of rows
- `shape` - Get DataFrame dimensions
- `columns` - Get column names
- `dtypes` - Get column data types
- `describe` - Descriptive statistics

### Pandas - Column Operations
- `select column` - Select single column as Series
- `select columns` - Select multiple columns
- `drop columns` - Remove columns
- `rename columns` - Rename columns

### Pandas - Filtering & Cleaning
- `filter` - Filter rows by condition
- `dropna` - Drop rows with null values
- `fillna` - Fill null values

### Pandas - Aggregation
- `groupby` - Group by columns
- `aggregate` - Apply aggregation (sum, mean, count, etc.)
- `value_counts` - Count unique values
- `correlation` - Correlation matrix

### Pandas - Transform
- `sort values` - Sort by columns
- `merge` - Merge DataFrames
- `concat` - Concatenate DataFrames
- `pivot table` - Create pivot table
- `apply` - Apply function

### Scikit-Learn - Data Splitting
- `train_test_split` - Split into train/test sets
- `get train/test data` - Extract split parts

### Scikit-Learn - Preprocessing
- `StandardScaler` - Standardize features
- `MinMaxScaler` - Scale to range
- `RobustScaler` - Outlier-robust scaling
- `LabelEncoder` - Encode labels
- `OneHotEncoder` - One-hot encoding
- `PCA` - Dimensionality reduction
- `fit_transform` / `transform` - Apply transformers

### Scikit-Learn - Classification Models
- `LogisticRegression`
- `DecisionTreeClassifier`
- `RandomForestClassifier`
- `SVC` (Support Vector Classifier)
- `KNeighborsClassifier`
- `GaussianNB`

### Scikit-Learn - Regression Models
- `LinearRegression`
- `Ridge`
- `Lasso`
- `DecisionTreeRegressor`
- `RandomForestRegressor`
- `SVR`

### Scikit-Learn - Clustering
- `KMeans`
- `DBSCAN`

### Scikit-Learn - Model Operations
- `fit` - Train model
- `predict` - Make predictions
- `predict_proba` - Predict probabilities
- `score` - Calculate score
- `cross_val_score` - Cross-validation

### Scikit-Learn - Metrics
- `accuracy_score`
- `precision_score`
- `recall_score`
- `f1_score`
- `confusion_matrix`
- `classification_report`
- `mean_squared_error`
- `r2_score`
- `mean_absolute_error`

### Common Blocks
- Text, Number, Boolean values
- Arrays and Dictionaries
- Variables (set/get)
- Lambda functions
- Comments
- Print

## Examples

The `examples/` folder contains ready-to-use examples:

- **basic-usage.html** - Simple data loading and viewing
- **data-exploration.html** - Exploratory data analysis workflow
- **classification-pipeline.html** - Complete classification with Random Forest
- **regression-pipeline.html** - Regression with feature scaling
- **clustering.html** - K-Means clustering with PCA

## Playground

The `playground/` folder contains an interactive playground with:

- Full Blockly editor
- Live Python execution via Pyodide
- Code/Blocks view toggle
- Pre-built example workflows
- Save/Load workspace

To use the playground:

```bash
# Open directly in browser
open playground/index.html

# Or serve with any HTTP server
npx serve .
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Type check
npm run lint
```

## Project Structure

```
pandamonium/
├── src/
│   ├── blocks/
│   │   ├── pandas.ts      # Pandas block definitions
│   │   ├── sklearn.ts     # Scikit-Learn block definitions
│   │   └── common.ts      # Common utility blocks
│   ├── generators/
│   │   └── python.ts      # Python code generator
│   ├── core/
│   │   ├── Pandamonium.ts # Main class
│   │   ├── toolbox.ts     # Toolbox configuration
│   │   └── types.ts       # TypeScript types
│   └── index.ts           # Library entry point
├── dist/                   # Built library files
├── examples/               # Example HTML files
├── playground/             # Interactive playground
├── tests/                  # Test files
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- [Blockly](https://developers.google.com/blockly) - Visual programming library
- [Pandas](https://pandas.pydata.org/) - Data analysis library
- [Scikit-Learn](https://scikit-learn.org/) - Machine learning library
- [Pyodide](https://pyodide.org/) - Python in the browser
