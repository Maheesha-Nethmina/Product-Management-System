# 📦 Produit - Product Management System

Produit is a modern, responsive, client-side product management dashboard built as part of the Full Stack Intern Assessment. It allows users to efficiently add, view, edit, and delete products while offering a sleek, dual-theme (Light/Dark) user interface.
## Getting Started

## ✨ Features

### Core Requirements Met:
- **Add Product:** Form to add a product with Name, Price, Description, and an optional Image URL.
- **View Products:** Clean, responsive table layout displaying all inventory items.
- **Edit Product:** Update existing product details seamlessly.
- **Delete Product:** Remove items from inventory with a safety confirmation dialog.
- **Data Persistence:** Uses browser `localStorage` to save data across page reloads (No backend required).

### Bonus & Extra Features:
- **Interactive Dashboard:** Live calculation of *Total Products*, *Average Price*, and *Total Inventory Value*.
- **Advanced Search & Filtering:** Case-insensitive search by Name/Description, and a custom Price Bracket filter (e.g., Under $50, Over $200).
- **True Dark/Light Mode:** Custom-built theme toggle using Tailwind v4, ensuring high-contrast readability in both modes without relying strictly on the OS system preference.
- **Form Validation:** Prevents negative price inputs and ensures required fields are filled.
- **Responsive Design:** Fluid layout with a horizontally scrollable data table for mobile devices.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** React (Hooks: `useState`, `useEffect`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Storage:** Web Storage API (`localStorage`)
- **Icons:** Standard emojis and SVG (No external icon libraries required)

---
## 🚀 Getting Started (Setup Instructions)

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-link>
   cd Product-Management-System

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

