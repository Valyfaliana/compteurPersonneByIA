import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inscription" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
