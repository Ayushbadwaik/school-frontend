import React, { useState, useEffect } from "react";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/courses").then((res) => {
      setCourses(res.data);
    });
  }, []);

  const addCourse = () => {
    if (name && description) {
      axios
        .post("http://localhost:5000/courses", { name, description })
        .then((res) => {
          setCourses([...courses, res.data]); // Add new course to list
          setName("");
          setDescription("");
        });
    }
  };

  return (
    <div>
      <h2>Courses List</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            <strong>{course.name}</strong>: {course.description}
          </li>
        ))}
      </ul>

      <h3>Add Course</h3>
      <input
        type="text"
        placeholder="Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addCourse}>Add Course</button>
    </div>
  );
}

export default Courses;
