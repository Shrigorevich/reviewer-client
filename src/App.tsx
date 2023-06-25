import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";

function App() {
  fetch("http://127.0.0.1:4433/sessions/whoami", { credentials: "include" })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch(console.log);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
