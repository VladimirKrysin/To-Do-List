import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from './components/root.jsx';
import { Login } from './components/login/login.jsx';
import { Register } from './components/register.jsx';
import { Dashboard } from './components/dashboard.jsx';
import { Tasks } from './components/tasks.jsx';
import { Account } from './components/account.jsx';
import { Info } from './components/info.jsx';
import { VitalTasks } from './components/vital-tasks.jsx';
import '@fontsource-variable/montserrat';

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/account",
    element: <Account />,
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
  }]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)
