# Kanban Board with Drag-and-Drop Functionality

## Overview
This project is a Kanban board application built with **Next.js** (App Router) and **@dnd-kit** for drag-and-drop functionality. The application allows users to organize tasks across multiple columns, with full keyboard accessibility and persistence using local storage.

---

## Features
- **Drag-and-Drop**: Smooth and flexible drag-and-drop interactions for task management using `@dnd-kit`.
- **Keyboard Accessibility**: Fully navigable and operable using the keyboard.
- **Local Storage Persistence**: Automatically saves and restores the board state.
- **Customizable Columns**: Easy to add or modify columns.

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

### **4. Local Storage**
- **Why**: Persistent storage for browser-based applications.
- **Rationale**: Simple and effective for small-scale data persistence without requiring a backend.

---

## Known Limitations and Trade-Offs

### **1. State Management**
- **Limitation**: State is stored locally in React components. Large-scale applications may require more sophisticated state management (e.g., Redux, Zustand).

### **2. Local Storage**
- **Limitation**: Local storage persistence is limited to the client and doesn’t support multi-user or cloud synchronization.

### **3. Accessibility Trade-Offs**
- **Limitation**: While keyboard accessibility is implemented, screen readers may require further ARIA enhancements for live announcements during drag-and-drop.

### **4. Performance**
- **Limitation**: For boards with hundreds of tasks, performance may degrade without optimization techniques like virtualization.

---

## Future Improvements

### **1. Multi-User Support**
- Integrate a backend (e.g., Firebase, Supabase) to support real-time collaboration and synchronization.

### **2. Undo/Redo Functionality**
- Add an action history stack to allow users to revert or reapply changes.

### **3. Search and Filtering**
- Enable task filtering and searching for better organization and usability.

### **4. Advanced Animations**
- Improve drag-and-drop animations using `framer-motion` for smoother interactions.

### **5. Custom Column Management**
- Allow users to dynamically create, rename, and delete columns.

### **6. Enhanced Accessibility**
- Add ARIA live regions to improve screen reader support during drag-and-drop operations.

---

## Feedback and Contributions
Feedback and contributions are welcome! Feel free to open issues or submit pull requests to enhance the project.
