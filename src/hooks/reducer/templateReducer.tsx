export const initialState = {
  name: "",
  description: "",
  fields: {
    attachments: {
      type: null,
      fields: [],
    },
    ppe_required: {
      type: null,
      fields: [],
    },
    prework_checks: {
      type: null,
      fields: [],
    },
  },
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
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
    case "SET_TYPE":
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.part]: {
            ...state.fields[action.part],
            type: action.payload,
          },
        },
      };
    case "ADD_ATTACHMENTS":
      return {
        ...state,
        fields: {
          ...state.fields,
          attachments: {
            ...state.fields.attachments,
            fields: [...state.fields.attachments.fields, action.payload],
          },
        },
      };
    case "ADD_PPE_REQUIRED":
      return {
        ...state,
        fields: {
          ...state.fields,
          ppe_required: {
            ...state.fields.ppe_required,
            fields: [...state.fields.ppe_required.fields, action.payload],
          },
        },
      };
    case "ADD_PREWORK_CHECKS":
      return {
        ...state,
        fields: {
          ...state.fields,
          prework_checks: {
            ...state.fields.prework_checks,
            fields: [...state.fields.prework_checks.fields, action.payload],
          },
        },
      };
    case "DELETE_ATTACHMENTS":
      return {
        ...state,
        fields: {
          ...state.fields,
          attachments: {
            ...state.fields.attachments,
            fields: state.fields.attachments.fields.filter(
              (item: any) => item !== action.payload,
            ),
          },
        },
      };
    case "DELETE_PPE_REQUIRED":
      return {
        ...state,
        fields: {
          ...state.fields,
          ppe_required: {
            ...state.fields.ppe_required,
            fields: state.fields.ppe_required.fields.filter(
              (item: any) => item !== action.payload,
            ),
          },
        },
      };
    case "DELETE_PREWORK_CHECKS":
      return {
        ...state,
        fields: {
          ...state.fields,
          prework_checks: {
            ...state.fields.prework_checks,
            fields: state.fields.prework_checks.fields.filter(
              (item: any) => item !== action.payload,
            ),
          },
        },
      };
    default:
      return state;
  }
};
