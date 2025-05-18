import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignInPage from "./components/auth/SignInPage";
import SignUpPage from "./components/auth/SignupPage";
import DashboardPage from "./components/dashboard";
import { AuthRoute } from "./components/auth/AuthRoute";
import "./App.css";

function App() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <DashboardPage />
            </AuthRoute>
          }
        />

        <Route
          path="/signin"
          element={
            accessToken ? <Navigate to="/dashboard" replace /> : <SignInPage />
          }
        />
        <Route
          path="/signup"
          element={
            accessToken ? <Navigate to="/dashboard" replace /> : <SignUpPage />
          }
        />

        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <DashboardPage />
            </AuthRoute>
          }
        />

        <Route
          path="*"
          element={
            accessToken ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
