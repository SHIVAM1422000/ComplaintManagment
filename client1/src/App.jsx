import React, { use } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Inbox from "./components/Inbox";
import AddFake from "./pages/AddFake";
import QueryView from "./pages/QueryView";
import Login from "./pages/Auth/Login";
import { Navigate } from "react-router-dom";
import RouteGuard from "./components/RouteGaurd";
import Register from "./pages/Auth/Register";
import { useAuth } from "./context/AuthContext";
// WE have to check why the headers are auto populated in the api and tampering token doesn't effects it
const App = () => {
  return (
    <BrowserRouter>
      <div className="flex bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route
              exact
              path="/dashboard"
              element={
                <RouteGuard roles={["admin", "agent"]}>
                  <Dashboard />
                </RouteGuard>
              }
            />
            <Route
              exact
              path="/"
              element={
                <RouteGuard roles={["admin", "agent"]}>
                  <Inbox />
                </RouteGuard>
              }
            />
            <Route
              exact
              path="/inbox" 
              element={
                <RouteGuard roles={["admin", "agent"]}>
                  <Inbox />
                </RouteGuard>
              }
            />
            
            <Route
              exact
              path="/add-fake"
              element={
                <RouteGuard roles={["user"]}>
                  <AddFake />
                </RouteGuard>
              }
            />
            <Route
              exact
              path="/query/:id"
              element={
                <RouteGuard roles={["admin", "agent"]}>
                  <QueryView />
                </RouteGuard>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
