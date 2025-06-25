import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Group from "./pages/Group";
import Signup from "./pages/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import LightNavbarDemo from "./pages/Logo";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const [login, setLogin] = useState(false);
  const [groupData, setGroupData] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <main className="h-dvh bg-background">
      <LightNavbarDemo />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`${login ? "/home" : "/login"}`} replace />}
        />
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/login"
          element={<Login setLogin={setLogin} setUserId={setUserId} />}
        ></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home setGroupData={setGroupData} userId={userId} />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="group/:id"
          element={
            <ProtectedRoute>
              <Group></Group>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </main>
  );
}

export default App;
