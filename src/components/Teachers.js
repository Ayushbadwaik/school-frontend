import React, { useState, useEffect } from "react";
import axios from "axios";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/teachers") // Make sure route matches backend
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const addTeacher = () => {
    axios.post("http://localhost:5000/api/teachers", { name, subject }) // Ensure "/api/teachers"
      .then((res) => {
        setTeachers([...teachers, res.data]);
        setName("");
        setSubject("");
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div>
      <h2>Teachers List</h2>
      <ul>
        {teachers.map((teacher, index) => (
          <li key={index}>{teacher.name} - {teacher.subject}</li>
        ))}
      </ul>

      <h3>Add Teacher</h3>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <button onClick={addTeacher}>Add Teacher</button>
    </div>
  );
}

export default Teachers;
