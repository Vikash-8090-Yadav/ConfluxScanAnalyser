import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  Link,
} from "react-router-dom";

import Login from "./pages/Login";
import AccountDashboard from "./components/AccountDashboard";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const address = localStorage.getItem("Address");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="pt-8">
      <AccountDashboard address={address} onLogout={handleLogout} />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element:<Login/>,
  },
  {
    path: "/home",
    element: <DashBoard/>,
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;