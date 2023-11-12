import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "../../coreComponent/table";
import "./style.scss";

const Student = () => {
  const students = JSON.parse(localStorage.getItem("students")) || [];

  const [data, setData] = useState();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { studentClass } = useParams();
  const navigate = useNavigate();

  const handleDateChangeDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const headCells = [
    {
      id: "name",
      label: "الطلاب",
    },
    {
      id: "class",
      label: "الصف",
    },
    {
      id: "section",
      label: "الشعبة",
    },
    {
      id: "nationality",
      label: "الجنسية",
    },
    {
      id: "phoneNum",
      label: "رقم الهاتف",
    },
    {
      id: "absencesNum",
      label: "عدد الغيابات",
    },
    {
      id: "actions",
      label: "actions",
    },
    {
      id: "absences",
      label: "الحضور و الغياب",
    },
    {
      id: "deleteStudent",
      label: "حذف الطالب",
    },
  ];
  const deleteStudent = async (id) => {
    const updatedData = data?.filter((item) => {
      return item.id !== id;
    });
    setData(updatedData);

    //
    const originData = students?.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem("students", JSON.stringify(originData));
  };

  const getStudent = async () => {
    const studentData = JSON.parse(localStorage.getItem("students")) || [];
    try {
      if (!studentClass) {
        setData(
          studentData?.reduce((prev, student) => {
            prev.push({
              id: student?.id,
              absencesDates: student?.absencesDates,
              name: student?.name,
              class: student?.class,
              section: student?.section,
              nationality: student?.nationality,
              phoneNum: student?.phoneNum,
              absencesNum: student?.absencesDates?.length,
              actions: (
                <div className="actions-container">
                  <button
                    className="record-absence"
                    onClick={() => {
                      recordAbsence(student);
                    }}
                  >
                    غياب
                  </button>
                  <button
                    className="remove-absence"
                    onClick={() => {
                      removeAbsence(student);
                    }}
                  >
                    حضور
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/studentDetails/${student?.id}`);
                    }}
                  >
                    عرض المزيد
                  </button>
                </div>
              ),
              absences: student?.absencesDates?.includes(selectedDate)
                ? "غياب"
                : "حضور",
              deleteStudent: (
                <div>
                  <button
                    className="delete-student"
                    onClick={() => deleteStudent(student?.id)}
                  >
                    حذف الطالب
                  </button>
                </div>
              ),
            });
            return prev;
          }, [])
        );
      } else {
        setData(
          studentData
            ?.filter((item) => {
              return item.class === studentClass;
            })
            .reduce((prev, student) => {
              prev.push({
                id: student.id,
                name: student?.name,
                class: student?.class,
                section: student?.section,
                nationality: student?.nationality,
                phoneNum: student?.phoneNum,
                absencesNum: student?.absencesDates?.length,
                actions: (
                  <div className="actions-container">
                    <button
                      className="record-absence"
                      onClick={() => {
                        recordAbsence(student);
                      }}
                    >
                      غياب
                    </button>
                    <button
                      className="remove-absence"
                      onClick={() => {
                        removeAbsence(student);
                      }}
                    >
                      حضور
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/studentDetails/${student?.id}`);
                      }}
                    >
                      عرض المزيد
                    </button>
                  </div>
                ),
                absences: student?.absencesDates?.includes(selectedDate)
                  ? "غياب"
                  : "حضور",
                deleteStudent: (
                  <div>
                    <button
                      className="delete-student"
                      onClick={() => deleteStudent(student?.id)}
                    >
                      حذف الطالب
                    </button>
                  </div>
                ),
              });
              return prev;
            }, [])
        );
      }
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };
  // وضع الغياب
  const recordAbsence = async (student) => {
    const updatedData = data?.map((item) => {
      if (item.id === student.id) {
        return {
          ...item,
          absencesDates: item?.absencesDates.includes(selectedDate)
            ? item?.absencesDates
            : [...item.absencesDates, selectedDate],
        };
      } else {
        return item;
      }
    });

    const originData = students?.map((item) => {
      if (item.id === student.id) {
        return {
          ...item,
          absencesDates: item?.absencesDates.includes(selectedDate)
            ? item?.absencesDates
            : [...item.absencesDates, selectedDate],
        };
      } else {
        return item;
      }
    });

    localStorage.setItem("students", JSON.stringify(originData));
    setData(updatedData);
  };
  // ازالة الغياب
  const removeAbsence = async (student) => {
    const updatedData = data?.map((item) => {
      if (item.id === student.id) {
        return {
          ...item,
          absencesDates: item?.absencesDates.filter(
            (item) => item !== selectedDate
          ),
        };
      } else {
        return item;
      }
    });
    const originData = students?.map((item) => {
      if (item.id === student.id) {
        return {
          ...item,
          absencesDates: item?.absencesDates.filter(
            (item) => item !== selectedDate
          ),
        };
      } else {
        return item;
      }
    });

    localStorage.setItem("students", JSON.stringify(originData));
    setData(updatedData);
  };

  useEffect(() => {
    getStudent();
  }, [studentClass, selectedDate, students]);

  return (
    <div className="students-table-container">
      <input
        className="date"
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={handleDateChangeDate}
      />
      <Table headCells={headCells} data={data} />
    </div>
  );
};

export default Student;
