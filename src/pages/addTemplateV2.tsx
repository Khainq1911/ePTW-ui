import { useState } from "react";
import TemplateContent from "../components/ui/addTemplateV2/templateContent";
import SidebarTemplate from "../components/ui/addTemplateV2/sidebar";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
export default function CreateTemplateV2() {
  const [templateItems, setTemplateItems] = useState<any[]>([]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    console.log(source, destination, draggableId);
    
    if (!destination) return;

    if (source.droppableId === "sidebar" && destination.droppableId === "1") {
      const newItem = {
        id: `${draggableId}-${Date.now()}`,
        type: draggableId,
      };
      setTemplateItems(prev => ([...prev, newItem]))
    }

    //note to repair
    if (
      source.droppableId === "1" &&
      destination.droppableId === "1" &&
      source.index !== destination.index
    ) {
      const reorderedItems = Array.from(templateItems);
      const [moved] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, moved);
      setTemplateItems(reorderedItems);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ height: "calc(100vh - 70px)" }}>
        <SidebarTemplate />
        <TemplateContent id={"1"} items={templateItems} />
      </div>
    </DragDropContext>
  );
}
