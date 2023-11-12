import React from "react";
import Student from "../../component/student";
import { Routes, Route } from "react-router-dom";
import "./style.scss";
import SideDrower from "../../coreComponent/sideDrower";
import Header from "../../coreComponent/header";
import LandingPage from "../landingPage";
import CreateStudent from "../createStudent";
import StudentDetails from "../studentDetails";
const MainPage = () => {

  return (
    <div className="main-page-container">
      <SideDrower />
      <div className="main-container">
        <Header />
        <Routes>
          <Route path="/main" element={<Student />} />
          <Route path="/main/:studentClass" element={<Student />} />
          <Route path="/sections" element={<LandingPage />} />
          <Route path="/newstudent" element={<CreateStudent />} />
          <Route path="/studentDetails/:id" element={<StudentDetails/>} />

        </Routes>
      </div>
    </div>
  );
};

export default MainPage;
