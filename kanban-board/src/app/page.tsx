import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center mt-8">
      <h1 className="text-2xl font-bold">Welcome to the Kanban Board</h1>
      <Link href="/kanban">
        <button className="mt-4 px-6 py-3 text-lg text-white bg-red-500 rounded hover:bg-red-600 transition">
          Go to Kanban Board
        </button>
      </Link>
    </div>
  );
}
