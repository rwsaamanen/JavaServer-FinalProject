import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Root from './routes/root.tsx'
import './index.css'
import { Login, Signup } from './components/index.ts'
import Page from './containers/page/Page.tsx'
import { UserProvider } from './context/userprovider/UserProvider.tsx'
import ManageUsers from './containers/manageusers/ManageUsers.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Page />,
      },
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "manage-users",
        element: <ManageUsers />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
