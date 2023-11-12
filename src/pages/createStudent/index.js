import React, { useState } from "react";
import Input from "../../coreComponent/input";
import DropDown from "../../coreComponent/dropDown";
import axios from "axios";
import "./style.scss";

const CreateStudent = () => {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const [student, setStudent] = useState({
    name: "",
    class: "",
    section: "",
    age: "",
    nationality: "",
    phoneNum: "",
    absencesNum: 0,
    absencesDates: [],
  });
  const [errorName, setErrorName] = useState("");
  const [errorClass, setErrorClass] = useState("");
  const [errorSection, setErrorSection] = useState("");

  const handleChange = (key, value) => {
    setStudent((prev) => {
      return { ...student, [key]: value };
    });
  };

  const createStudent = async () => {
    const updatedData = [
      ...students,
      {
        ...student,
        id: Math.random() * 9999,
        absencesDates: [],
      },
    ];
    localStorage.setItem("students", JSON.stringify(updatedData));
  };
  return (
    <div className="add-student-form">
      <Input
        placeholder="e.g. Student Name"
        onChange={(value) => handleChange("name", value)}
        value={student?.name}
        size="medium"
        type="text"
        clearable={true}
        onClear={() => handleChange("name", "")}
        errorMessage={errorName}
        label="اسم الطالب"
      />
      <DropDown
        options={["التاسع", "العاشر", "الاول ثانوي", "الثاني ثانوي"]}
        setValue={(value) => handleChange("class", value)}
        value={student?.class}
        label="الصف"
        clearable={true}
        errorMessage={errorClass}
        placeholder="التاسع"
      />
      <Input
        placeholder="ج"
        onChange={(value) => handleChange("section", value)}
        value={student?.section}
        size="medium"
        type="text"
        clearable={true}
        errorMessage={errorSection}
        onClear={() => handleChange("section", "")}
        label="الشعبة"
      />
      <Input
        placeholder="16"
        onChange={(value) => handleChange("age", value)}
        value={student.age}
        size="medium"
        type="text"
        clearable={true}
        onClear={() => handleChange("age", "")}
        label="العمر"
      />
      <Input
        placeholder="jordanian"
        onChange={(value) => handleChange("nationality", value)}
        value={student?.nationality}
        size="medium"
        type="text"
        clearable={true}
        onClear={() => handleChange("nationality", "")}
        label="الجنسية"
      />
      <Input
        placeholder="0798576241"
        onChange={(value) => handleChange("phoneNum", value)}
        value={student?.phoneNum}
        size="medium"
        type="text"
        clearable={true}
        onClear={() => handleChange("phoneNum", "")}
        label="رقم الهاتف"
      />

      <button
        className="add-student-button"
        onClick={() => {
          if (student?.name && student?.class && student?.section) {
            createStudent();
          }
          if (!student?.name) {
            setErrorName("يجب ادخال اسم الطالب");
          } else {
            setErrorName("");
          }
          if (!student?.class) {
            setErrorClass("يجب ادخال الصف");
          } else {
            setErrorClass("");
          }
          if (!student?.section) {
            setErrorSection("يجب ادخال الشعبة ");
          } else {
            setErrorSection("");
          }
        }}
      >
        Add Student
      </button>
    </div>
  );
};

export default CreateStudent;
