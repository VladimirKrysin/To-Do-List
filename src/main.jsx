import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from './components/root/root.jsx';
import { Login } from './components/login/login.jsx';
import { Register } from './components/register/register.jsx';
import { Dashboard } from './components/dashboard/dashboard.jsx';
import { Tasks } from './components/tasks.jsx';
import { Info } from './components/info.jsx';
import { VitalTasks } from './components/vitalTasks/vitalTasks.jsx';
import '@fontsource-variable/montserrat';
import "@mantine/core/styles.css";
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from "@mantine/core";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "vital-tasks",
        element: <VitalTasks />,
      },
      {
        path: "info",
        element: <Info />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)
