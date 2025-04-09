import { Droppable, Draggable } from "@hello-pangea/dnd";
import SingleLineInput from "./templateField/singleLineInput";
import MultipleLineInput from "./templateField/multipleLineInput";

enum TYPE {
  SINGLE_LINE = "singleLineInput",
  MULTIPLE_LINE = "multipleLineInput",
}

export default function TemplateContent({ id, items }: any) {
  const renderItem = (type: string) => {
    switch (type) {
      case TYPE.SINGLE_LINE:
        return <SingleLineInput />;
      case TYPE.MULTIPLE_LINE:
        return <MultipleLineInput />;
    }
  };

  return (
    <div className="ml-[300px] bg-[#F5F6F7] p-4 flex h-full overflow-scroll ">
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="w-[800px] min-h-[200px] bg-white mx-auto p-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item: any, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className="border border-dashed border-gray-400 bg-white p-4 rounded mb-3 "
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {renderItem(item.type)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
