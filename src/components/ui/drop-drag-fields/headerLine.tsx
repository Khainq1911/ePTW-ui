import { TextField } from "@mui/material";

export default function HeaderLine({ dispatch, value, id }: any) {
  return (
    <TextField
      label="Header"
      value={value}
      onChange={(e) =>
        dispatch({
          type: "UPDATE_TITLE",
          payload: { title: e.target.value, id },
        })
      }
    />
  );
}
