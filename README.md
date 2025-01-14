# Kanban Board with Drag-and-Drop Functionality

## Overview

This project is a Kanban board application built with **Next.js** (App Router) and **@dnd-kit** for drag-and-drop functionality. The application allows users to organize tasks across multiple columns, with features like task search, undo/redo, and full keyboard accessibility. The board state is persistently saved using local storage.

---

## Features

- **Drag-and-Drop**: Smooth and flexible drag-and-drop interactions for task management using `@dnd-kit`.
- **Keyboard Accessibility**: Fully navigable and operable using the keyboard.
- **Task Search and Filtering**: Quickly find tasks by typing in the search bar.
- **Undo/Redo Functionality**: Revert or reapply changes to your board with ease.
- **Local Storage Persistence**: Automatically saves and restores the board state.
- **Customizable Columns**: Add, rename, or delete columns as needed.
- **Dynamic Task Management**: Add and organize tasks directly within columns.

---

## Setup Instructions

### 1. Prerequisites

Ensure the following tools are installed:

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 2. Clone the Repository

```bash
git clone <repository-url>
cd kanban-board
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Technology Choices and Rationale

### **1. Next.js (App Router)**

- **Why**: Modern, server-rendered React framework with excellent developer experience and built-in optimizations.
- **Rationale**: Simplifies routing, API integration, and project structure.

### **2. @dnd-kit**

- **Why**: Flexible, lightweight, and accessible drag-and-drop library.
- **Rationale**: Offers granular control over interactions, excellent keyboard support, and modern browser support.

### **3. TypeScript**

- **Why**: Statically typed language that adds safety and tooling support to JavaScript.
- **Rationale**: Improves code maintainability and developer productivity.

### **4. Tailwind CSS**

- **Why**: Utility-first CSS framework for rapid UI development.
- **Rationale**: Ensures consistent styling and fast prototyping.

### **5. Local Storage**

- **Why**: Persistent storage for browser-based applications.
- **Rationale**: Simple and effective for small-scale data persistence without requiring a backend.

---

## Known Limitations and Trade-Offs

### **1. State Management**

- **Limitation**: State is stored locally in React components. Large-scale applications may require more sophisticated state management (e.g., Redux, Zustand).

### **2. Local Storage**

- **Limitation**: Local storage persistence is limited to the client and doesn’t support multi-user or cloud synchronization.

### **3. Performance**

- **Limitation**: For boards with hundreds of tasks, performance may degrade without optimization techniques like virtualization.

---

## Accessibility Highlights

This project is designed to be accessible:

- Full keyboard support for drag-and-drop interactions.
- Clear focus outlines for all interactive elements.
- ARIA roles and labels for improved screen reader support.
- Search and filtering features are operable via keyboard navigation.

---

## Future Improvements

### **1. Multi-User Support**

- Integrate a backend (e.g., Firebase, Supabase) to support real-time collaboration and synchronization.

### **2. Real-Time Updates**

- Enable real-time updates and collaboration with WebSockets or a database backend.

### **3. Advanced Animations**

- Improve drag-and-drop animations using `framer-motion` for smoother interactions.

### **4. Enhanced Accessibility**

- Add ARIA live regions to improve screen reader support during drag-and-drop operations.

---

## Feedback and Contributions

Feedback and contributions are welcome! Feel free to open issues or submit pull requests to enhance the project.
