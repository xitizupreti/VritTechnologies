"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [history, setHistory] = useState<{ columns: typeof INITIAL_COLUMNS }[]>(
    []
  );
  const [redoStack, setRedoStack] = useState<(typeof INITIAL_COLUMNS)[]>([]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    const storedColumns = localStorage.getItem("kanbanColumns");
    if (storedColumns) {
      setColumns(JSON.parse(storedColumns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  const saveHistory = (newColumns: typeof INITIAL_COLUMNS) => {
    setHistory((prev) => [...prev, { columns }]);
    setRedoStack([]);
    setColumns(newColumns);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);

    if (!over) return;

    const fromColumn = columns.find((col) =>
      col.tasks.includes(active.id as string)
    );
    const toColumn = columns.find(
      (col) => col.id === over.id || col.tasks.includes(over.id as string)
    );

    if (fromColumn && toColumn) {
      if (fromColumn === toColumn) {
        const oldIndex = fromColumn.tasks.indexOf(active.id as string);
        const newIndex = fromColumn.tasks.indexOf(over.id as string);

        saveHistory(
          columns.map((col) =>
            col.id === fromColumn.id
              ? {
                  ...col,
                  tasks: arrayMove(fromColumn.tasks, oldIndex, newIndex),
                }
              : col
          )
        );
      } else {
        saveHistory(
          columns.map((col) =>
            col.id === fromColumn.id
              ? {
                  ...col,
                  tasks: fromColumn.tasks.filter(
                    (task) => task !== (active.id as string)
                  ),
                }
              : col.id === toColumn.id
              ? { ...col, tasks: [...toColumn.tasks, active.id as string] }
              : col
          )
        );
      }
    }
  };

  const addColumn = () => {
    const newColumn = {
      id: `column-${Date.now()}`,
      title: `New Column`,
      tasks: [],
    };
    saveHistory([...columns, newColumn]);
  };

  const deleteColumn = (columnId: string) => {
    saveHistory(columns.filter((col) => col.id !== columnId));
  };

  const renameColumn = (columnId: string, newTitle: string) => {
    saveHistory(
      columns.map((col) =>
        col.id === columnId ? { ...col, title: newTitle } : col
      )
    );
  };

  const addTaskToColumn = (columnId: string, task: string) => {
    saveHistory(
      columns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );
  };

  const resetBoard = () => {
    localStorage.removeItem("kanbanColumns");
    saveHistory(INITIAL_COLUMNS);
  };

  const undo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setRedoStack((prev) => [columns, ...prev]);
      setColumns(lastState.columns);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setRedoStack((prev) => prev.slice(1));
      saveHistory(nextState);
    }
  };

  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter((task) =>
      task.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
          aria-label="Search tasks"
        />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columns.map((col) => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-4 p-4">
            {filteredColumns.map((column) => (
              <Column
                key={column.id}
                column={column}
                deleteColumn={deleteColumn}
                renameColumn={renameColumn}
                addTaskToColumn={addTaskToColumn}
              />
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
          onClick={undo}
          disabled={history.length === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 mr-2 focus-visible:ring-2 focus-visible:ring-blue-300"
          aria-label="Undo last action"
        >
          Undo
        </button>
        <button
          onClick={redo}
          disabled={redoStack.length === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 mr-2 focus-visible:ring-2 focus-visible:ring-blue-300"
          aria-label="Redo last action"
        >
          Redo
        </button>
        <button
          onClick={addColumn}
          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 mr-2 focus-visible:ring-2 focus-visible:ring-green-300"
          aria-label="Add a new column"
        >
          Add Column
        </button>
        <button
          onClick={resetBoard}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-300"
          aria-label="Reset board to default"
        >
          Reset Board
        </button>
      </div>
    </div>
  );
}
