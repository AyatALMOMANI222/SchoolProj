import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import SimpleLabelValue from "../../coreComponent/SimpleLabelValue";
import "./style.scss";
const StudentDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const getDayFromDate = (inputDate) => {
    const daysOfWeek = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    const date = new Date(inputDate);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };
  const getStudentById = async () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const item = students.filter((e) => {
      return e?.id == id;
    });
    setData(item[0]);
  };

  useEffect(() => {
    getStudentById();
  }, []);

  return (
    <div>
      <div className="details-container">
        <SimpleLabelValue label="الصف" value={data?.class} />
        <SimpleLabelValue label="الاسم" value={data?.name} />
        <SimpleLabelValue label="الشعبة" value={data?.section} />
        <SimpleLabelValue label="العمر" value={data?.age} />
        <SimpleLabelValue label="الجنسية" value={data?.nationality} />
        <SimpleLabelValue label="رقم الهاتف" value={data?.phoneNum} />
        <SimpleLabelValue
          label="عدد الغيابات"
          value={data?.absencesDates?.length}
        />
      </div>
      <div className="dates-container">
        <span className="days">ايام الغياب</span>
        {data?.absencesDates?.map((item) => {
          return (
            <div>
              {item} , {getDayFromDate(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentDetails;
