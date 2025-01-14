import KanbanBoard from "./components/KanbanBoard";

export default function KanbanPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-semibold mb-4">Kanban Board</h1>
      <KanbanBoard />
    </main>
  );
}
