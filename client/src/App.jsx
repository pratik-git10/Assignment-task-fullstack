import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StoresList from "./pages/user/StoresList";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import ProtectedRoute from "./routes/protectedRoute";
import GuestRoute from "./routes/guestRoutes";
import Users from "./pages/admin/users";
import UserDetails from "./pages/admin/UserDetails";
import CreateUser from "./pages/admin/CreateUser";
import GetStores from "./pages/admin/GetStores";
import CreateStore from "./pages/admin/CreateStore";
import GetStores from "./pages/admin/GetStores";
import ChangePassword from "./pages/profile/changePassword";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="ADMIN">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/admin/users/:id`}
          element={
            <ProtectedRoute role="ADMIN">
              <UserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-user"
          element={
            <ProtectedRoute role="ADMIN">
              <CreateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute role="ADMIN">
              <GetStores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/ratings"
          element={
            <ProtectedRoute role="ADMIN">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-store"
          element={
            <ProtectedRoute role="ADMIN">
              <CreateStore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stores"
          element={
            <ProtectedRoute role="USER">
              <StoresList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute role="STORE_OWNER">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
