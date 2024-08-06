import React, { useState, useEffect } from 'react';
import './CoursesList.css'; 
import coursesData from '../../CoursesData.json';
import { Link } from 'react-router-dom';
import GTable from '../../components/GTable';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCourses(coursesData);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const columns = [
    {
      id: 'image',
      label: 'Image',
      numeric: false,
    },
    {
      id: 'title',
      label: 'Title',
      numeric: false,
    },
    {
      id: 'description',
      label: 'Description',
      numeric: false,
    },
    {
      id: 'professor',
      label: 'Professor',
      numeric: false,
    },
    {
      id: 'department',
      label: 'Department',
      numeric: false,
    },
    {
      id: 'duration',
      label: 'Duration',
      numeric: false,
    },
    {
      id: 'actions',
      label: 'Actions',
      numeric: false,
    },
  ];

  const rows = courses
    .filter(course => course.title && course.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((course) => ({
      id: course.id,
      image: course.image,
      title:course.title,
      description: course.description,
      professor: course.professor,
      department: course.department,
      duration: course.duration,
      actions: (
        <div>
          <button className="action-btn" onClick={() => console.log(`Edit course with ID ${course.id}`)}>
            Edit
          </button>
          <button className="action-btn" onClick={() => console.log(`Delete course with ID ${course.id}`)}>
            Delete
          </button>
        </div>
      ),
    }));

  return (
    <div className="courses-list-container">
      <h2 className="courses-list-header">Courses List</h2>
      <div className="add-new-btn">
        <Link to="../courses/addcourse"><button>+ Add new</button></Link>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <GTable
        columns={columns}
        rows={rows}
        title="Courses"
        tableName="course"
      />
    </div>
  );
};

export default CoursesList;
