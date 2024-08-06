import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import studentsData from '../../studentData.json'; 
import GTable from '../../components/GTable';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import './studentsList.css';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setStudents(studentsData);
      setFilteredStudents(studentsData);
      setLoading(false);
    } catch (error) {
      setError('Error loading data');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const sortedAndFilteredStudents = students
      .filter(student => student.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    setFilteredStudents(sortedAndFilteredStudents);
  }, [students, searchTerm, sortConfig]);

  const handleEdit = (studentId) => {
    console.log(`Edit student with ID ${studentId}`);
    // Add your edit logic here
  };

  const handleDelete = (studentId) => {
    console.log(`Delete student with ID ${studentId}`);
    // Add your delete logic here
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="students-list-container">
      <h2 className="students-list-header">Students List</h2>
      <div className="add-new-btn">
        <Link to="../students/AddStudent">
          <button>+ Add New</button>
        </Link>
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
        columns={[
          { id: 'image', label: 'image' },
          { id: 'firstName', label: 'Name' },
          { id: 'email', label: 'Email' },
          { id: 'username', label: 'Username' },
          { id: 'role', label: 'Role' },
          { id: 'status', label: 'Status' },
          { id: 'phoneNumber', label: 'Phone' },
          { id: 'address', label: 'Address' },
          { id: 'actions', label: 'Actions' },
        ]}
        rows={filteredStudents.map(student => ({
          ...student,
          actions: (
            <>
            
              <button className="action-btn" onClick={() => handleEdit(student.id)}>
                <FaEdit /> Edit
              </button>
              <button className="action-btn" onClick={() => handleDelete(student.id)}>
                <FaTrash /> Delete
              </button>
            </>
          ),
        }))}
        tableName="student"
        title="Students"
     
        onSort={handleSort}
      />
    </div>
  );
};

export default StudentsList;
