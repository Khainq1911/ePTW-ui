import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Button, Divider, Grid, Tab, Tabs, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createTemplateService,
  updateTemplateService,
} from "../../../../services/templates.service";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../../hooks/useNotify";
import { useState } from "react";
import { renderItem } from "../../../../utils/renderTemplateItem";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Confirm from "../../confirm";
import TemplatePreview from "../preview/previewTemplate";

enum PATH {
  CREATE = "/template/add",
}

export default function TemplateContent({
  id,
  items,
  dispatch,
  state,
  updateId,
}: any) {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<string>("edit");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (location.pathname.includes(PATH.CREATE)) {
        await createTemplateService(state);
        notify("Template created successfully", "success", "Success");
      } else {
        await updateTemplateService(state, Number(updateId));
        notify("Template updated successfully", "success", "Success");
      }
      navigate("/");
    } catch {
      notify("An error occurred while saving the template", "error", "Error");
    }
  };

  return (
    <div className="ml-[300px] bg-[#F5F6F7] p-4 flex h-full overflow-scroll flex-col">
      <div className="flex justify-between mb-8">
        <Button
          className="float-left"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
        <Tabs value={tab} onChange={handleChange}>
          <Tab value="edit" label="Edit" />
          <Tab value="preview" label="Preview" />
        </Tabs>
        <Button
          className="float-left"
          color="success"
          variant="contained"
          onClick={handleClickOpen}
        >
          Save
        </Button>
      </div>

      <div
        className={`w-[800px] mx-auto bg-white rounded ${
          tab === "preview" ? "" : "hidden"
        }`}
      >
        <TemplatePreview item={state} />
      </div>

      <div
        className={`w-[800px] mx-auto bg-white p-4 rounded ${
          tab === "edit" ? "" : "hidden"
        }`}
      >
        <Grid container spacing={2}>
          <Grid>
            <TextField
              fullWidth
              label="Template Name"
              value={state.name}
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
              className="p-4 border-2 rounded border-dashed border-gray-300 relative"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items?.map((item: any, index: number) => (
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
                        item.label,
                        item.id,
                        item?.options,
                        dispatch,
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

      <Confirm
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        content="Are you sure you want to save this template? You can still edit it
          later."
      />
    </div>
  );
}
