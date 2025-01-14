import "./globals.css";

export const metadata = {
  title: "Kanban Board",
  description: "A simple drag-and-drop Kanban board built with Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
