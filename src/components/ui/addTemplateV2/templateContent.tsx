import { Droppable, Draggable } from "@hello-pangea/dnd";
import SingleLineInput from "./templateField/text/singleLineInput";
import MultipleLineInput from "./templateField/text/multipleLineInput";
import HeaderLine from "./templateField/text/headerLine";
import Date from "./templateField/date/date";
import DateRange from "./templateField/date/dateRange";
import YesNo from "./templateField/yesNo";
import ListItem from "./templateField/listItem";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTemplateService } from "../../../services/templates.service";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../hooks/useNotify";
import { useState } from "react";

enum TYPE {
  HEADER = "header",
  SINGLE_LINE = "singleLineInput",
  MULTIPLE_LINE = "multipleLineInput",
  DATE_PICKER = "date",
  DATE_RANGE = "dateRange",
  YES_NO = "yesNo",
  YES_NO_NA = "yesNoNa",
  LIST = "list",
}

export default function TemplateContent({
  id,
  items,
  dispatch,
  name,
  state,
}: any) {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const renderItem = (
    type: string,
    value: string,
    id: string,
    options: any,
  ) => {
    switch (type) {
      case TYPE.SINGLE_LINE:
        return <SingleLineInput dispatch={dispatch} value={value} id={id} />;
      case TYPE.MULTIPLE_LINE:
        return <MultipleLineInput dispatch={dispatch} value={value} id={id} />;
      case TYPE.HEADER:
        return <HeaderLine dispatch={dispatch} value={value} id={id} />;
      case TYPE.DATE_PICKER:
        return <Date dispatch={dispatch} value={value} id={id} />;
      case TYPE.DATE_RANGE:
        return <DateRange dispatch={dispatch} value={value} id={id} />;
      case TYPE.YES_NO:
        return <YesNo dispatch={dispatch} value={value} id={id} />;
      case TYPE.YES_NO_NA:
        return <YesNo dispatch={dispatch} value={value} id={id} type={type} />;
      case TYPE.LIST:
        return (
          <ListItem
            dispatch={dispatch}
            value={value}
            id={id}
            options={options}
          />
        );
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createTemplateService(state);
      notify("Template created successfully", "success", "Success");

      navigate("/");
    } catch {
      notify("An error occurred while saving the template", "error", "Error");
    }
  };

  return (
    <div className="ml-[300px] bg-[#F5F6F7] p-4 flex h-full overflow-scroll flex-col">
      <div className="flex justify-end mb-3">
        <Button
          className="float-left"
          color="success"
          variant="contained"
          onClick={handleClickOpen}
        >
          Save
        </Button>
      </div>

      <div className="w-[800px] mx-auto bg-white p-4">
        <Grid container spacing={2}>
          <Grid>
            <TextField
              fullWidth
              label="Template Name"
              value={name}
              onChange={(e) =>
                dispatch({ type: "SET_NAME", payload: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Divider
          textAlign="center"
          sx={{
            my: 2,
            color: "#1976d2",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          DROPABLE
        </Divider>

        <Droppable droppableId={id}>
          {(provided) => (
            <div
              className=" p-4 border-2 rounded border-dashed border-gray-300 relative"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item: any, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className="group border border-gray-400 bg-white p-4 rounded mb-6 relative"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        className="absolute -top-4 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded shadow hover:bg-gray-100 cursor-pointer p-1 text-gray-400"
                        onClick={() =>
                          dispatch({ type: "DELETE_ITEM", payload: item.id })
                        }
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                        <span className="ml-1">Delete</span>
                      </div>
                      {renderItem(
                        item.type,
                        item.title,
                        item.id,
                        item?.options,
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="save-template-title"
        aria-describedby="save-template-description"
      >
        <DialogTitle id="save-template-title">Confirm Save</DialogTitle>
        <DialogContent>
          <DialogContentText id="save-template-description">
            Are you sure you want to save this template? You can still edit it
            later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
