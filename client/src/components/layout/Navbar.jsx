import { logoutUser } from "../../api/authApi";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();

    setUser(null);

    navigate("/");
  };

  return (
    <nav className="flex justify-between p-4 border-b items-center">
      <h2>Store Rating System</h2>

      <div className="flex gap-7 items-center">
        {user?.name}

        <button
          onClick={handleLogout}
          className="ml-4 border px-4 py-1 rounded-lg cursor-pointer active:scale-95 ">
          Logout
        </button>
        <Link
          to={"/profile/change-password"}
          className="ml-4 border px-4 py-1 rounded-lg cursor-pointer active:scale-95 ">
          Change Password
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
