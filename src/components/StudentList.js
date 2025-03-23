import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', age: '', class: '' });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const response = await axios.get('http://localhost:5000/students');
        setStudents(response.data);
    };

    const handleAddStudent = async () => {
        await axios.post('http://localhost:5000/students/add', newStudent);
        setNewStudent({ name: '', age: '', class: '' });
        fetchStudents();
    };

    const handleDeleteStudent = async (id) => {
        await axios.delete(`http://localhost:5000/students/delete/${id}`);
        fetchStudents();
    };

    return (
        <div>
            <h3>Students List</h3>
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        {student.name} - Age: {student.age}, Class: {student.class}
                        <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Add Student</h3>
            <input type="text" placeholder="Name" value={newStudent.name} 
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
            <input type="number" placeholder="Age" value={newStudent.age} 
                onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })} />
            <input type="text" placeholder="Class" value={newStudent.class} 
                onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })} />
            <button onClick={handleAddStudent}>Add Student</button>
        </div>
    );
};

export default StudentList;
