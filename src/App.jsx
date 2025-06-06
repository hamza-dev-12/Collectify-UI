import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Group from "./pages/Group";
import Signup from "./pages/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import LogoDemo from "./pages/Logo";
import DarkNavbarDemo from "./pages/Logo";
import LightNavbarDemo from "./pages/Logo";

function App() {
  const [login, setLogin] = useState(false);
  const [groupData, setGroupData] = useState(null);

  console.log(login);
  return (
    <main className="h-dvh bg-background">
      <LightNavbarDemo />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`${login ? "/home" : "/login"}`} replace />}
        />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login setLogin={setLogin} />}></Route>
        <Route
          path="/home"
          element={<Home setGroupData={setGroupData} />}
        ></Route>
        <Route
          path="group/:id"
          element={<Group groupData={groupData}></Group>}
        ></Route>
        {/* <Route path="/logo" element={<DarkNavbarDemo></DarkNavbarDemo>}></Route> */}
      </Routes>
    </main>
  );
}

export default App;
