/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import TopBar from "../components/Topbar";

const AppRouter = ({ currentUser, setCurrentUser }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage setCurrentUser={setCurrentUser} />
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
            <>
              <TopBar currentUser={currentUser} />
              <HomePage currentUser={currentUser} />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
