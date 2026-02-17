# Mister Task Manager

A modern, feature-rich Task Manager application built with **Nuxt 3**, **Pinia**, and **Tailwind CSS**.

## Features

-   **User Authentication**: Secure login and registration (JWT-based mock).
-   **Task Management**: Create, read, update, and delete tasks.
-   **Task Filters**: Filter tasks by status (Pending/Completed) and Priority (Low/Medium/High).
-   **Dashboard**: Visual statistics of your tasks and CSV export.
-   **Dark Mode**: toggle between light and dark themes.
-   **Responsive Design**: Works seamlessly on desktop and mobile.

## Tech Stack

-   **Framework**: [Nuxt 3](https://nuxt.com/)
-   **State Management**: [Pinia](https://pinia.vuejs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Heroicons](https://heroicons.com/) (via Tailwind/UI)

## Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd MisterTaskManager
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` in your browser.

## Building for Production

To build the application for production:

```bash
npm run build
```

This will generate a `.output` directory ready for deployment.

## Deployment

### Vercel (Recommended)

1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel` in the project root.
3.  Follow the prompts.

### Netlify

1.  Drag and drop the `.output/public` folder (for static site) or configure Netlify to run `npm run build`.

## Project Structure

-   `/components`: Reusable UI components (Navbar, TaskCard, etc.)
-   `/pages`: Application routes/views.
-   `/server`: Backend API routes (Mock API).
-   `/stores`: Pinia state stores (User, Task).
-   `/composables`: Shared logic (useAuth).

## License

MIT
