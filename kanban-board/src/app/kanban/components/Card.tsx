import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  id: string;
}

const Card: React.FC<CardProps> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const isDragging = transform !== null;

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
      className={`p-4 bg-white border ${
        isDragging ? "opacity-50 border-dashed" : "border-solid"
      } rounded-md shadow-sm mb-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-300`}
      role="listitem"
      tabIndex={0}
      aria-label={`Task ${id}`}
    >
      {id}
    </div>
  );
};

export default Card;
