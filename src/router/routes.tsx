import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Home from "../pages/Home";
import Search from "../pages/Search";
import ShowDetails from "../pages/ShowDetails";

const router = createBrowserRouter([
    {
    element: <AppLayout />,
    children: [
        { path: "/", element: <Home /> },
        { path: "/search", element: <Search /> },
        { path: "/show/:id", element: <ShowDetails /> },
    ],
    },
]);

export default router;
