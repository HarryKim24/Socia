/* eslint-disable react/prop-types */
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import TopBar from "../components/TopBar";
import { Navigate } from "react-router-dom";

const AppRouter = ({ currentUser, setCurrentUser }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={<LoginPage setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/signup"
          element={<SignupPage />}
        />
        <Route
          path="/home"
          element={
            currentUser ? (
              <>
                <TopBar currentUser={currentUser} />
                <HomePage currentUser={currentUser} />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
