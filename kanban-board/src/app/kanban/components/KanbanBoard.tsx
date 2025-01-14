"use client";

import React, { useState, useEffect } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Column from "./Column";

export default function KanbanBoard() {
  const initialColumns = [
    { id: "todo", title: "To Do", tasks: ["Task 1", "Task 2", "Task 3"] },
    { id: "in-progress", title: "In Progress", tasks: ["Task 4", "Task 5"] },
    { id: "done", title: "Done", tasks: ["Task 6"] },
  ];

  // State for columns
  const [columns, setColumns] = useState(initialColumns);
  const [isClient, setIsClient] = useState(false); // Tracks if rendering on the client
  const [activeId, setActiveId] = useState<string | null>(null);

  // On mount, load columns from localStorage if available
  useEffect(() => {
    setIsClient(true); // Mark as client-side rendering

    const storedColumns = localStorage.getItem("kanbanColumns");
    if (storedColumns) {
      setColumns(JSON.parse(storedColumns));
    }
  }, []);

  // Save columns to localStorage whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("kanbanColumns", JSON.stringify(columns));
    }
  }, [columns, isClient]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return; // If no drop location, do nothing

    // Find the column where the task was dragged
    const fromColumn = columns.find((col) => col.tasks.includes(active.id));
    const toColumn = columns.find(
      (col) => col.id === over.id || col.tasks.includes(over.id)
    );

    if (fromColumn && toColumn) {
      if (fromColumn === toColumn) {
        // If the task is moved within the same column
        const oldIndex = fromColumn.tasks.indexOf(active.id);
        const newIndex = fromColumn.tasks.indexOf(over.id);

        const updatedTasks = arrayMove(fromColumn.tasks, oldIndex, newIndex);

        setColumns((prev) =>
          prev.map((col) =>
            col.id === fromColumn.id ? { ...col, tasks: updatedTasks } : col
          )
        );
      } else {
        // If the task is moved between different columns
        const updatedFromTasks = fromColumn.tasks.filter(
          (task) => task !== active.id
        );
        const updatedToTasks = [...toColumn.tasks, active.id];

        setColumns((prev) =>
          prev.map((col) =>
            col.id === fromColumn.id
              ? { ...col, tasks: updatedFromTasks }
              : col.id === toColumn.id
              ? { ...col, tasks: updatedToTasks }
              : col
          )
        );
      }
    }
  };

  const handleClearStorage = () => {
    localStorage.removeItem("kanbanColumns"); // Clear the stored data
    setColumns(initialColumns); // Reset to initial state
  };

  return (
    <div>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columns.map((col) => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-4 p-4">
            {columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <div className="p-4 bg-white border border-gray-300 rounded shadow-md">
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="mt-8 text-center">
        <button
          onClick={handleClearStorage}
          className="px-8 py-4 bg-red-500 text-white rounded-lg text-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Clear Local Storage
        </button>
      </div>
    </div>
  );
}
