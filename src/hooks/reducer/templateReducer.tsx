export const initialState = {
  name: "",
  description: "",
  fields: [],
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_INITAL_DATA":
      return { ...state, ...action.payload };
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "REORDER_ITEM":
      return {
        ...state,
        fields: action.payload,
      };
    case "ADD_ITEM":
      return {
        ...state,
        fields: [...state.fields, action.payload],
      };
    case "UPDATE_TITLE":
      return {
        ...state,
        fields: state.fields.map((field: any) => {
          return field.id === action.payload.id
            ? { ...field, label: action.payload.title }
            : field;
        }),
      };
    case "ADD_OPTION":
      return {
        ...state,
        fields: state.fields.map((field: any) => {
          return field.id === action.payload.id
            ? {
                ...field,
                options: [...(field.options || []), action.payload.option],
              }
            : field;
        }),
      };
    case "DELETE_OPTION":
      return {
        ...state,
        fields: state.fields.map((field: any) =>
          field.id === action.payload.id
            ? {
                ...field,
                options: field.options.filter(
                  (opt: string) => opt !== action.payload.option,
                ),
              }
            : field,
        ),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        fields: state.fields?.filter((item:any) => item.id !== action.payload),
      };
  }
};
