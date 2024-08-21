import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Post from "./post/Post"; // Ensure this path is correct
import Authentication from "./pages/authentication/authentication";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import PostUpload from "./pages/postupload/PostUpload";
import Feeds from "./pages/feeds/Feeds";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/posts", // Updated path for posts
          element: <Products />, // Products is the component showing the list of posts
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/authentication",
          element: <Authentication />,
        },
        {
          path: "/uploads",
          element: <PostUpload />,
        },
        {
          path: "/feeds",
          element: <Feeds />,
        },
        {
          path: "/posts/:id", // Updated path for individual post details
          element: <Post />, // Post component shows the details of a selected post
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
