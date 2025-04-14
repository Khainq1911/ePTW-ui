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
        data: [
          state.data.map((item: any) =>
            item.id === action.payload.id
              ? { ...item, value: action.payload.value }
              : item,
          ),
        ],
      };
    default:
      return state;
  }
};
