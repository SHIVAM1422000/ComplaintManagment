import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RouteGuard({ roles, children }) {



  const { user, loading } = useAuth();
  // console.log("route Gaurd USER" , user)
  const slug = localStorage.getItem("company_slug");

  if (loading) return <p>Loading...</p>;

  if (!user || !slug || !roles.includes(user?.role)) {
    alert("No User Found, Please Login");
    return <Navigate to="/login" replace />;
  }

  return children;
}
