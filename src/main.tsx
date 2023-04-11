import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { Home } from "./pages/Home"
import { Caption } from "./pages/Caption"
import { NotFound } from "./pages/NotFound"
import "./style/main.scss"
import { Root } from "./pages/Root"
import { Lyrics } from "./pages/Lyrics"

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/caption",
//     element: <Caption />,
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ])

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/lyrics",
        element: <Lyrics />,
      },
      {
        path: "/caption",
        element: <Caption />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
