import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard1 from "./pages/dashboard1.jsx";
import Inbox from "./pages/inbox.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Inbox />} />
      {/* <Route path="/create" element={<CreateFake />} /> */}
      <Route path="/dashboard" element={<Dashboard1 />} />
    </Routes>
  </BrowserRouter>
);
