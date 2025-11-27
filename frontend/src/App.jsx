import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SignUp from "./SignUp";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./utils/hooks/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/inscription" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
