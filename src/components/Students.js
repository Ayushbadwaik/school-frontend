import React, { useState, useEffect } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [studentClass, setStudentClass] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/students").then((res) => {
      setStudents(res.data);
    });
  }, []);

  const addStudent = () => {
    if (name && age && studentClass) {
      axios.post("http://localhost:5000/students", { name, age, studentClass })
        .then((res) => {
          setStudents([...students, res.data]);
          setName("");
          setAge("");
          setStudentClass("");
        });
    }
  };

  return (
    <div>
      <h2>Students List</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <strong>{student.name}</strong>, Age: {student.age}, Class: {student.studentClass}
          </li>
        ))}
      </ul>

      <h3>Add Student</h3>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <input type="text" placeholder="Class" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} />
      <button onClick={addStudent}>Add Student</button>
    </div>
  );
}

export default Students;
