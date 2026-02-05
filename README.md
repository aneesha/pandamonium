# 🐼 Pandamonium

> Visual programming for Data Science with Pandas and Scikit-Learn

Pandamonium is a Blockly-based visual programming library that lets you build data science workflows by dragging and dropping blocks. It generates clean Python code that you can run with Pandas and Scikit-Learn.

## Features

- **Visual Block Editor** - Drag-and-drop interface powered by Blockly
- **High-Level Blocks** - Simplified blocks that group related operations with built-in options
- **Pandas Blocks** - Data loading, transformation, filtering, grouping, merging
- **Scikit-Learn Blocks** - ML preparation, model creation, training, prediction, evaluation
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

Pandamonium uses high-level, self-contained blocks with built-in dropdowns and text inputs for configuration. This design reduces drag-and-drop complexity while maintaining flexibility.

### 📂 Load Data

| Block | Description |
|-------|-------------|
| **Load Data** | Load CSV, Excel, JSON, or URL into a DataFrame. Includes file type dropdown and path input. |
| **Preview Data** | View data: head, tail, describe, shape, columns, dtypes, info, sample. Count parameter included. |

### 🔧 Transform

| Block | Description |
|-------|-------------|
| **Select Columns** | Keep or drop specific columns from DataFrame |
| **Filter Rows** | Filter by condition: ==, !=, >, <, >=, <=, contains, is null, not null |
| **Handle Missing** | Drop nulls, or fill with value/mean/median/mode/ffill/bfill |
| **Sort Data** | Sort by column ascending or descending |
| **Group & Summarize** | Group by column and calculate sum/mean/count/min/max/median/std |
| **Merge Data** | Merge two DataFrames with inner/left/right/outer join |

### 🎯 ML Prep

| Block | Description |
|-------|-------------|
| **Prepare Features** | Extract features (X) and target (y) from DataFrame |
| **Split Data** | Train/test split with configurable test size |
| **Scale Features** | StandardScaler, MinMaxScaler, or RobustScaler |

### 🤖 Models

| Block | Description |
|-------|-------------|
| **Create Model** | Choose from 8 model types with classifier/regressor task selection |
| **Train Model** | Fit model on X_train, y_train |
| **Predict** | Make predictions on X_test, X_train, or X |
| **Grid Search** | Hyperparameter tuning with custom param grid and scoring metric |
| **Cross Validate** | K-fold cross-validation with mean ± std output |

#### Model Types
- Linear Regression
- Logistic Regression
- Decision Tree (Classifier/Regressor)
- Random Forest (Classifier/Regressor)
- KNN (Classifier/Regressor)
- SVM (SVC/SVR)
- Naive Bayes (GaussianNB)
- Gradient Boosting (Classifier/Regressor)

### 📊 Evaluate

| Block | Description |
|-------|-------------|
| **Evaluate** | Calculate metrics: Accuracy, Precision, Recall, F1, Confusion Matrix, Classification Report, MSE, RMSE, MAE, R² |

### 📤 Output

| Block | Description |
|-------|-------------|
| **Output** | Print data or save as CSV/Excel |
| **Comment** | Add Python comment to code |

## Examples

The `examples/` folder contains ready-to-use examples:

- **basic-usage.html** - Simple data loading and viewing
- **data-exploration.html** - Exploratory data analysis workflow
- **classification-pipeline.html** - Complete classification with Random Forest
- **regression-pipeline.html** - Regression with Linear Regression
- **data-cleaning.html** - Data cleaning and transformation

## Playground

The `playground/` folder contains an interactive playground with:

- Full Blockly editor
- Live Python execution via Pyodide
- Code/Blocks view toggle
- Pre-built example workflows (Explore, Clean, Classify, Regress)
- Dark theme UI

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
│   │   ├── pandas.ts      # Data loading & transform blocks
│   │   ├── sklearn.ts     # ML prep, model, evaluate blocks
│   │   └── common.ts      # Output & comment blocks
│   ├── generators/
│   │   └── python.ts      # Python code generator
│   ├── core/
│   │   ├── Pandamonium.ts # Main class
│   │   ├── toolbox.ts     # Toolbox configuration
│   │   └── types.ts       # TypeScript types
│   └── index.ts           # Library entry point
├── dist/                   # Built library files
├── examples/               # Example HTML files
├── playground/             # Interactive playground with Pyodide
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
