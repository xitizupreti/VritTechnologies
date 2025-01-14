import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Card from "./Card";

type ColumnProps = {
  column: {
    id: string;
    title: string;
    tasks: string[];
  };
};

const Column: React.FC<ColumnProps> = ({ column }) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className="border border-gray-300 p-4 w-72 bg-gray-50 rounded-md shadow-sm"
    >
      <h3 className="font-bold text-lg mb-2">{column.title}</h3>
      <SortableContext
        items={column.tasks}
        strategy={verticalListSortingStrategy}
      >
        {column.tasks.map((task) => (
          <Card key={task} id={task} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
