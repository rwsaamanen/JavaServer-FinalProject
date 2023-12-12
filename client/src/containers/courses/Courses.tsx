import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../context/userprovider/UserProvider';

// Courses

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useUser();

  const isAdmin = user && user.role === 'admin';

  const [newCourse, setNewCourse] = useState({
    id: '',
    courseName: '',
    teacherName: ''
  });

  // Fetch courses.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/courses');
        
        if (response.status === 200) {
          setCourses(response.data);
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

  const handleEdit = (course: any) => {
    if (selectedCourse && selectedCourse.id === course.id && isEditing) {
      setIsEditing(false);
    } else {
      setSelectedCourse(course);
      setIsEditing(true);
    }
  };

  // handleAddCourse i.e. Add new course.

  const handleAddCourse = async () => {
    try {
      const response = await axios.post('http://localhost:8080/courses', newCourse);

      if (response.status === 200) {
        console.log('New course added successfully!');
        setNewCourse({ id: '', courseName: '', teacherName: '' });

        const updatedCourses = [...courses, response.data];
        setCourses(updatedCourses);
      } else {
        console.error('Failed to add course:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  // handleSubmitChange

  const handleSubmitChanges = async () => {
    if (!selectedCourse || !selectedCourse.courseName || !selectedCourse.teacherName) {
      return;
    }

    try {
      await axios.put(`http://localhost:8080/courses/${selectedCourse.id}`, selectedCourse);

      const updatedCourses = courses.map(course =>
        course.id === selectedCourse.id ? { ...course, ...selectedCourse } : course
      );
      setCourses(updatedCourses);

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  // handleDeleteCourse i.e. Delete existing course.

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await axios.delete(`http://localhost:8080/courses/${courseId}`);

      const updatedCourses = courses.filter((course) => course.id !== courseId);
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <>
      <div className="w-full md:w-auto lg:w-auto border border-neutral-500 rounded-md p-2 px-5 mt-10 shadow-white/40 shadow-md">
        <div className='flex items-center justify-between'>
          <h1 className="text-sm font-bold">Courses</h1>
          <input className='ml-auto bg-neutral-900 border border-neutral-700 rounded-sm px-1 focus:border-neutral-400 focus:outline-none'
            placeholder='Search'></input>
        </div>
        <div>
          <div className="flex justify-between border-b border-neutral-700 py-1 mt-4 mb-4">
            <div style={{ flex: "1" }}>
              <p className="font-bold">ID</p>
            </div>
            <div style={{ flex: "3" }}>
              <p className="font-bold">Course</p>
            </div>
            <div style={{ flex: "2" }}>
              <p className="font-bold">Teacher</p>
            </div>
          </div>
          <ul>
            {courses.map((course, index) => (
              <React.Fragment key={course.id}>
                <li
                  key={index}
                  className="flex justify-between py-1 cursor-pointer"
                  onClick={() => handleEdit(course)}
                >
                  <div style={{ flex: "1" }}>
                    <p>{course.id}</p>
                  </div>
                  <div style={{ flex: "3" }}>
                    <p>{course.courseName}</p>
                  </div>
                  <div style={{ flex: "2" }}>
                    <p>{course.teacherName}</p>
                  </div>
                </li>
                {selectedCourse && selectedCourse.id === course.id && isEditing && isAdmin && (
                  <div className="mt-2 flex flex-col">
                    <h1 className='mb-5 text-sm font-bold underline pointer-events-none'>Modify course details</h1>
                    <div className="flex items-center mb-4 text-sm">
                      <label className="w-24">Course Name:</label>
                      <input type="text" value={selectedCourse.courseName} onChange={(e) => setSelectedCourse({ ...selectedCourse, courseName: e.target.value })} className="w-64 px-1 border bg-neutral-900 border-neutral-700 rounded-sm focus:border-neutral-400 focus:outline-none" />
                    </div>
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <label className="w-24">Teacher Name:</label>
                      <input type="text" value={selectedCourse.teacherName} onChange={(e) => setSelectedCourse({ ...selectedCourse, teacherName: e.target.value })} className="w-64 px-1 border bg-neutral-900 border-neutral-700 rounded-sm focus:border-neutral-400 focus:outline-none mr-auto" />
                      <button className="w-32 rounded-sm border border-neutral-800 bg-black px-2 text-sm text-white transition-all hover:bg-white/10 shadow-sm shadow-neutral-900 mr-2" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
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
          <h2 className="text-sm font-bold mb-10">Add New Course</h2>
          <div className="flex flex-col text-sm">
            <div className="flex items-center mb-2">
              <label className="w-24">ID:</label>
              <input
                type="text"
                value={newCourse.id}
                onChange={(e) => setNewCourse({ ...newCourse, id: e.target.value })}
                className="w-64 px-1 border bg-neutral-900 border-neutral-700 rounded-sm focus:border-neutral-400 focus:outline-none"
              />
            </div>
            <div className="flex items-center mb-2">
              <label className="w-24">Course Name:</label>
              <input
                type="text"
                value={newCourse.courseName}
                onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
                className="w-64 px-1 border bg-neutral-900 border-neutral-700 rounded-sm focus:border-neutral-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between mb-2">
              <label className="w-24">Teacher Name:</label>
              <input
                type="text"
                value={newCourse.teacherName}
                onChange={(e) => setNewCourse({ ...newCourse, teacherName: e.target.value })}
                className="w-64 px-1 border bg-neutral-900 border-neutral-700 rounded-sm focus:border-neutral-400 focus:outline-none mr-auto"
              />
              <button
                onClick={handleAddCourse}
                className="w-32 rounded-sm border-1 border-neutral-500 bg-white px-2 text-sm text-black transition-all hover:bg-white/80 shadow-sm shadow-neutral-900"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
