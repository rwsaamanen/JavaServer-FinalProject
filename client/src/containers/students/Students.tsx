import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../context/userprovider/UserProvider';

// Students

const Students = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { user } = useUser();

    const isAdmin = user && user.role === 'admin';

    const [newStudent, setNewStudent] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    // Fetch students.

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/students');

                if (response.status === 200) {
                    console.log(response);
                    setStudents(response.data);
                } else {
                    console.error('Response not okay:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // handleEdit

    const handleEdit = (student: any) => {
        if (selectedStudent && selectedStudent.id === student.id && isEditing) {
            setIsEditing(false);
        } else {
            setSelectedStudent(student);
            setIsEditing(true);
        }
    };

    // handleAddStudent i.e. Add new student.

    const handleAddStudent = async () => {
        try {
            const response = await axios.post('http://localhost:8080/students', newStudent);

            if (response.status === 200) {
                console.log('New student added successfully!');
                setNewStudent({ id: '', firstName: '', lastName: '', email: '' });
            } else {
                console.error('Failed to add student:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    // handleSubmitChanges

    const handleSubmitChanges = async () => {
        if (!selectedStudent || !selectedStudent.firstName || !selectedStudent.lastName || !selectedStudent.email) {
            return;
        }
        try {
            await axios.put(`http://localhost:8080/students/${selectedStudent.id}`, selectedStudent);
            
            const updatedStudents = students.map(student =>
                student.id === selectedStudent.id ? { ...student, ...selectedStudent } : student
            );
            setStudents(updatedStudents);

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    // handleDeleteStudent i.e. Delete existing student.

    const handleDeleteStudent = async (studentId: string) => {
        try {
            await axios.delete(`http://localhost:8080/students/${studentId}`);

            const updatedStudents = students.filter((student) => student.id !== studentId);
            setStudents(updatedStudents);
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (
        <>
            <div className="w-full md:w-auto lg:w-auto border border-neutral-500 rounded-md p-2 px-5 mt-10 shadow-white/40 shadow-md">
                <div className='flex items-center justify-between'>
                    <h1 className="text-sm font-bold pointer-events-none">Students</h1>
                    <input className='ml-auto bg-neutral-900 border border-neutral-700 rounded-sm px-1 focus:border-neutral-400 focus:outline-none'
                        placeholder='Search'></input>
                </div>
                <div>
                    <div className="flex justify-between border-b border-neutral-700 py-1 mt-4 mb-4 pointer-events-none">
                        <div style={{ flex: "1" }}>
                            <p className="font-bold">ID</p>
                        </div>
                        <div style={{ flex: "2" }}>
                            <p className="font-bold">Name</p>
                        </div>
                        <div style={{ flex: "3" }}>
                            <p className="font-bold">Email</p>
                        </div>
                    </div>
                    <ul>
                        {students.map((student, index) => (
                            <React.Fragment key={student}>
                                <li
                                    key={index}
                                    className="flex justify-between py-1 cursor-pointer"
                                    onClick={() => handleEdit(student)}
                                >
                                    <div style={{ flex: "1" }}>
                                        <p>{student.id}</p>
                                    </div>
                                    <div style={{ flex: "2" }}>
                                        <p>
                                            <span>{student.firstName} {student.lastName}</span>
                                        </p>
                                    </div>
                                    <div style={{ flex: "3" }}>
                                        <p>{student.email}</p>
                                    </div>
                                </li>
                                {selectedStudent && selectedStudent.id === student.id && isEditing && isAdmin && (
                                    <div className="mt-2 flex flex-col">
                                        <h1 className='mb-5 text-sm font-bold underline pointer-events-none'>Modify student details</h1>
                                        <div className="flex items-center mb-4 text-sm">
                                            <label className="w-24">First Name:</label>
                                            <input type="text" value={selectedStudent.firstName} onChange={(e) => setSelectedStudent({ ...selectedStudent, firstName: e.target.value })} className="w-64 px-1 border bg-neutral-900 border-neutral-700 rounded-sm focus:border-neutral-400 focus:outline-none" />
                                        </div>
                                        <div className="flex items-center mb-4 text-sm">
                                            <label className="w-24">Last Name:</label>
                                            <input type="text" value={selectedStudent.lastName} onChange={(e) => setSelectedStudent({ ...selectedStudent, lastName: e.target.value })} className="w-64 px-1 border bg-neutral-900 border-neutral-700 rounded-sm focus:border-neutral-400 focus:outline-none" />
                                        </div>
                                        <div className="flex items-center justify-between mb-4 text-sm">
                                            <label className="w-24">Email:</label>
                                            <input type="text" value={selectedStudent.email} onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })} className="w-64 px-1 border bg-neutral-900 border-neutral-700 rounded-sm focus:border-neutral-400 focus:outline-none mr-auto" />
                                            <button className="w-32 rounded-sm border border-neutral-800 bg-black px-2 text-sm text-white transition-all hover:bg-white/10 shadow-sm shadow-neutral-900 mr-2" onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                                            <button className="w-32 rounded-sm border border-neutral-500 bg-white px-2 text-sm text-black transition-all hover:bg-white/80 shadow-sm shadow-neutral-900" onClick={handleSubmitChanges}>Submit Changes</button>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
            {isAdmin && (
                <div className="w-full md:w-auto lg:w-auto border border-neutral-500 rounded-md p-2 px-5 mt-10 shadow-white/40 shadow-md">
                    <h2 className="text-sm font-bold mb-10">Add New Student</h2>
                    <div className="flex flex-col text-sm">
                        <div className="flex items-center mb-2">
                            <label className="w-24">ID:</label>
                            <input
                                type="text"
                                value={newStudent.id}
                                onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
                                className="w-64 px-1 border bg-neutral-900 border-neutral-700 rounded-sm focus:border-neutral-400 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center mb-2">
                            <label className="w-24">First Name:</label>
                            <input
                                type="text"
                                value={newStudent.firstName}
                                onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                                className="w-64 px-1 border bg-neutral-900 border-neutral-700 rounded-sm focus:border-neutral-400 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center mb-2">
                            <label className="w-24">Last Name:</label>
                            <input
                                type="text"
                                value={newStudent.lastName}
                                onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                                className="w-64 px-1 border bg-neutral-900 border-neutral-700 rounded-sm focus:border-neutral-400 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="w-24">Email:</label>
                            <input
                                type="text"
                                value={newStudent.email}
                                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                                className="w-64 px-1 border bg-neutral-900 border-neutral-700 rounded-sm focus:border-neutral-400 focus:outline-none mr-auto"
                            />
                            <button
                                onClick={handleAddStudent}
                                className="w-32 rounded-sm border-1 border-neutral-500 bg-white px-2 text-sm text-black transition-all hover:bg-white/80 shadow-sm shadow-neutral-900"
                            >
                                Add Student
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Students;
