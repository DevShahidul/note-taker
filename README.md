# 📝 Note Tacker

![License](https://img.shields.io/badge/License-MIT-green)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-4.4.0-lightgrey)
![Node](https://img.shields.io/badge/Node-22.18.0-brightgreen)

A simple and modular **note-taking app** built with modern React and TypeScript.
This project demonstrates clean architecture using **Zustand**, **Shadcn/UI**, and **TailwindCSS 4**, bundled with **Vite** for lightning-fast development.

---

## 🔗 Live Demo

You can try the app here:
**[live demo link here:]**

> [https://note-tacker.netlify.app](https://note-tacker.netlify.app)

---

## ⚙️ Tech Stack

* ⚛️ **React 19**
* 🎨 **Shadcn/UI** + **TailwindCSS v4**
* 🧠 **Zustand** (state management with slices)
* ⚡ **Vite** with HMR
* 🧹 **ESLint** for consistent code style
* 🟢 Node.js **v22.18.0**

---

## ✨ Features

* ➕ Create new notes
* ✏️ Edit or update existing notes
* ❌ Delete notes
* 🧩 Modular structure for easy integration into larger projects

---

## 🧱 Architecture Overview

This app uses a **feature-based module structure**, making it easy to reuse or embed in other React applications.

Each feature folder (like `note`) contains:

* **Zustand slice** (state management)
* **Components** (UI for the feature)
* **Service functions** (business logic, CRUD operations)
* **Types and utilities**

📁 Main logic lives in:
`src/features/note/`

---

## 🖼 Screenshots

Example:

![Empty Note](https://raw.githubusercontent.com/DevShahidul/note-tacker/main/screenshots/empty-note-list.png)

*Empty note list*

![Create Note](https://raw.githubusercontent.com/DevShahidul/note-tacker/main/screenshots/create-new-note.png)

*Create Note*

![Note List](https://raw.githubusercontent.com/DevShahidul/note-tacker/main/screenshots/note-list.png)

*Note list view with edit & delete actions*

![Edit Note](https://raw.githubusercontent.com/DevShahidul/note-tacker/main/screenshots/edit-note.png)

*Edit note in inline editor*

![Delete Note](https://raw.githubusercontent.com/DevShahidul/note-tacker/main/screenshots/delete-note.png)

*Delete note in inline editor*


---

## 🚀 Getting Started

Clone the repository and run the app locally:

```bash
# Clone the repository
git clone https://github.com/DevShahidul/note-tacker.git

# Navigate to project folder
cd note-tacker

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Then open your browser at **[http://localhost:5173](http://localhost:5173)**

---

## 📦 Project Goals

This project is designed to:

* Be a **reusable module** that can be dropped into any React app
* Showcase **feature-based architecture** using Zustand
* Provide a **lightweight, simple note-taking experience**
* Demonstrate **clean component and service separation**

---

## 🧑‍💻 Author

**Shahidul Islam**
📍 [GitHub @DevShahidul](https://github.com/DevShahidul)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it.
