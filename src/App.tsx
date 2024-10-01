import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Post from "./post/Post";
import Authentication from "./pages/authentication/authentication";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Feeds from "./pages/feeds/Feeds";
import { useSelector } from "react-redux";

const queryClient = new QueryClient();

function App() {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

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

  const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Layout /> : <Navigate to="/login" />,
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
          path: "/posts",
          element: <Products />,
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
          path: "/feeds",
          element: <Feeds />,
        },
        {
          path: "/posts/:id",
          element: <Post />,
        },
      ],
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" /> : <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
