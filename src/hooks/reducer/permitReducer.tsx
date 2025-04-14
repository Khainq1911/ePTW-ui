export const initialState = {};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_INFOR":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_VALUE":
      return {
        ...state,
        data: state.data.map((item: any) =>
          item.id === action.payload.id
            ? { ...item, value: action.payload.value }
            : item,
        ),
      };
    case "SET_START_DATE":
      return {
        ...state,
        data: state.data.map((item: any) =>
          item.id === action.payload.id
            ? { ...item, value: { start: action.payload.start, ...item.value } }
            : item,
        ),
      };
    case "SET_END_DATE":
      return {
        ...state,
        data: state.data.map((item: any) =>
          item.id === action.payload.id
            ? { ...item, value: { end: action.payload.end, ...item.value } }
            : item,
        ),
      };
    default:
      return state;
  }
};
