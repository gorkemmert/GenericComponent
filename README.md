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
```

## JSON Formatı
  
  API yanıtı gibi JSON formatındaki verileri de belirli bir biçimde gösterebilirsiniz:
  
  #### JSON Formatı:
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
  ```
### Props

| Prop Name      | Type       | Required | Default    | Description                                                   |
| -------------- | ---------- | -------- | ---------- | ------------------------------------------------------------- |
| `id`           | `string`   | Yes      |            | The ID of the input field.                                     |
| `name`         | `string`   | Yes      |            | The name of the input field (used for form submission).        |
| `label`        | `string`   | Yes      |            | The label that will be displayed for the input field.          |
| `methods`      | `object`   | Yes      |            | Methods from `react-hook-form`.                                |
| `valueName`    | `string`   | Yes      |            | The key used to display the value in the dropdown list.        |
| `keyName`      | `string`   | Yes      |            | The key used to identify the selected option.                  |
| `url`          | `string`   | Yes      |            | The API endpoint to fetch the data from.                       |
| `disabledPort` | `boolean`  | No       | `false`    | Disable the portal (dropdown will not be rendered in a portal).|
| `size`         | `string`   | No       | `'small'`  | The size of the input (e.g., `'small'`, `'medium'`).           |

