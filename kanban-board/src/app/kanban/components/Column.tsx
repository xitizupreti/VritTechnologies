import React, { useState } from "react";
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
  deleteColumn: (columnId: string) => void;
  renameColumn: (columnId: string, newTitle: string) => void;
  addTaskToColumn: (columnId: string, task: string) => void;
};

const Column: React.FC<ColumnProps> = ({
  column,
  deleteColumn,
  renameColumn,
  addTaskToColumn,
}) => {
  const { setNodeRef } = useDroppable({ id: column.id });
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState("");

  return (
    <div
      ref={setNodeRef}
      className="border border-gray-300 p-4 w-72 bg-gray-50 rounded-md shadow-sm"
    >
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <input
            type="text"
            defaultValue={column.title}
            onBlur={(e) => {
              renameColumn(column.id, e.target.value);
              setIsEditing(false);
            }}
            autoFocus
            className="border border-gray-300 rounded w-full p-1"
          />
        ) : (
          <h3
            className="font-bold text-lg cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {column.title}
          </h3>
        )}
        <button
          onClick={() => deleteColumn(column.id)}
          className="text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
      <SortableContext
        items={column.tasks}
        strategy={verticalListSortingStrategy}
      >
        {column.tasks.map((task) => (
          <Card key={task} id={task} />
        ))}
      </SortableContext>
      <div className="mt-4">
        <input
          type="text"
          value={newTask}
          placeholder="Add a task"
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={() => {
            if (newTask.trim()) {
              addTaskToColumn(column.id, newTask);
              setNewTask("");
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 w-full"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Column;
