import { Draggable, Droppable } from "@hello-pangea/dnd";
import { columns } from "../../../constants/createTemplateSidebar";

export default function SidebarTemplate() {
  return (
    <Droppable droppableId="sidebar" isDropDisabled={true}>
      {(provided) => {
        let globalIndex = 0;

        return (
          <div
            className="w-[300px] fixed shadow px-3 py-4 overflow-y-scroll"
            style={{ height: "calc(100vh - 70px)" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columns.map((item, i) => (
              <div className="grid gap-2 mb-4" key={i}>
                <p className="font-medium text-lg">{item.header}</p>
                {item.fields?.map((field) => {
                  const draggable = (
                    <Draggable
                      draggableId={`${field.type}`}
                      index={globalIndex}
                      key={globalIndex}
                    >
                      {(provided) => (
                        <div
                          className="border-gray-300 border-2 rounded cursor-move flex items-center p-3 space-x-2"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {item?.icon}
                          <span className="font-medium">{field.title}</span>
                        </div>
                      )}
                    </Draggable>
                  );

                  globalIndex++;
                  return draggable;
                })}
              </div>
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
}
