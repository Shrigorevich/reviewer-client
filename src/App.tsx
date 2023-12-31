import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Recovery from "./pages/Recovery";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
