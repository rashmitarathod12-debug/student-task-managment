import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  NavLink,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./Auth/AuthGuard";


const DefaultRoute = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  //console.log(logindata)
  if (authData) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
};

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <DefaultRoute/>
    },
    {
      path: "/login",
      element: (<AuthGuard
       required ={false}>
        <Login />
        </AuthGuard>
    ),

    },
    {
      path: "/register",
      element: (<AuthGuard required ={false}>
        <Register />
      </AuthGuard>
      ),
    },
    {
      path:"/dashboard",
      element:(<AuthGuard required ={true}>
        <Dashboard/>
        </AuthGuard>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;