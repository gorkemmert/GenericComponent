# GenericComponent

This is a reusable React component that integrates with Material-UI's Autocomplete and Redux to fetch data dynamically from an API. The component is designed to handle asynchronous data loading, refreshing, and form validation using React Hook Form.

## Features

- **Dynamic Data Fetching:** Retrieves data from a given API URL.
- **Asynchronous Loading:** Displays a loading spinner while fetching data.
- **Data Refresh:** Manually refresh the data using the refresh icon.
- **Form Validation:** Integrates with `react-hook-form` for form validation.
- **Customizable:** Allows customization of labels, keys, values, and other props.

## Installation

To use this component in your project, clone the repository and install the dependencies:

## Usage

```jsx
import GenericComponent from './path/to/GenericComponent';

function MyForm() {
  const methods = useForm();

  return (
    <form>
      <GenericComponent
        size="medium"
        id="BudgetId"
        name="BudgetId"
        label="Bütçe"
        methods={methods}
        disabledPort={false}
        valueName="Description"
        keyName="id"
        url="api/v1/budget"
      />
    </form>
  );
}


### 3. **JSON Formatı:**

API yanıtı gibi JSON formatındaki verileri de belirli bir biçimde gösterebilirsiniz:

#### JSON Formatı:
```json
```json
[
  {
    "id": 1,
    "Description": "Budget 2024"
  },
  {
    "id": 2,
    "Description": "Budget 2023"
  }
]

