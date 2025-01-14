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
      } rounded-md shadow-sm mb-2 cursor-pointer`}
    >
      {id}
    </div>
  );
};

export default Card;
