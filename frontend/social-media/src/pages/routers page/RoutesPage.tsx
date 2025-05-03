import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Home from "../homepage/Home";
import RegisterSection from "../register/RegisterSection";
import ProfileSection from "../profilePage/ProfileSection";
import LogInPage from "../loginPage/LogInPage";
import NavigationPage from "../navigation/NavigationPage";
import ProfileHomeSection from "../profilePage/childComponent/ProfileHomeSection";

function RoutesPages() {
  const location = useLocation();

  const hideNav = location.pathname.startsWith("/profile");
  return (
    <>
      {!hideNav && <NavigationPage />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterSection />} />
        <Route path="/login" element={<LogInPage />} />{" "}
        <Route path="/profile/*" element={<ProfileSection />} />
      </Routes>
    </>
  );
}
export default function RoutesPage() {
  return (
    <Router>
      <RoutesPages />
    </Router>
  );
}
