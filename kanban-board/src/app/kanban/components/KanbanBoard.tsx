"use client";

import React, { useState, useEffect } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Column from "./Column";

const INITIAL_COLUMNS = [
  { id: "todo", title: "To Do", tasks: ["Task 1", "Task 2", "Task 3"] },
  { id: "in-progress", title: "In Progress", tasks: ["Task 4", "Task 5"] },
  { id: "done", title: "Done", tasks: ["Task 6"] },
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Load columns from localStorage on mount
  useEffect(() => {
    const storedColumns = localStorage.getItem("kanbanColumns");
    if (storedColumns) {
      setColumns(JSON.parse(storedColumns));
    }
  }, []);

  // Save columns to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  const handleDragStart = ({ active }: any) => {
    setActiveId(active.id);
  };

  const handleDragEnd = ({ active, over }: any) => {
    setActiveId(null);

    if (!over) return;

    const fromColumn = columns.find((col) => col.tasks.includes(active.id));
    const toColumn = columns.find(
      (col) => col.id === over.id || col.tasks.includes(over.id)
    );

    if (fromColumn && toColumn) {
      if (fromColumn === toColumn) {
        // Reorder within the same column
        const oldIndex = fromColumn.tasks.indexOf(active.id);
        const newIndex = fromColumn.tasks.indexOf(over.id);

        setColumns((prev) =>
          prev.map((col) =>
            col.id === fromColumn.id
              ? {
                  ...col,
                  tasks: arrayMove(fromColumn.tasks, oldIndex, newIndex),
                }
              : col
          )
        );
      } else {
        // Move between columns
        setColumns((prev) =>
          prev.map((col) =>
            col.id === fromColumn.id
              ? {
                  ...col,
                  tasks: fromColumn.tasks.filter((task) => task !== active.id),
                }
              : col.id === toColumn.id
              ? { ...col, tasks: [...toColumn.tasks, active.id] }
              : col
          )
        );
      }
    }
  };

  const resetBoard = () => {
    localStorage.removeItem("kanbanColumns");
    setColumns(INITIAL_COLUMNS);
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
          {activeId && (
            <div className="p-4 bg-white border border-gray-300 rounded shadow-md">
              {activeId}
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <div className="mt-8 text-center">
        <button
          onClick={resetBoard}
          className="px-8 py-4 bg-red-500 text-white rounded-lg text-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Reset Board
        </button>
      </div>
    </div>
  );
}
