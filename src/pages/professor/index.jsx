import React, { useState, useEffect } from 'react';
import './ProfessorList.css';
import ProfessorData from '../../ProfessorData.json';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import GTable from '../../components/GTable';

const ProfessorList = () => {
  const [professors, setProfessors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const history = useNavigate();

  useEffect(() => {
    setProfessors(ProfessorData);
  }, []);

  const handleEdit = (professorId) => {
    console.log(`Edit professor with ID ${professorId}`);
  };

  const handleDelete = (professorId) => {
    console.log(`Delete professor with ID ${professorId}`);
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

  const sortedProfessors = [...professors].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredProfessors = sortedProfessors.filter((professor) =>
    professor.firstName && professor.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { id: 'image', label: 'Image' },
    { id: 'firstName', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'username', label: 'Username' },
    { id: 'classes', label: 'Role' },
    { id: 'available', label: 'Status' },
    { id: 'phoneNumber', label: 'Phone' },
    { id: 'address', label: 'Address' },
    { id: 'actions', label: 'Actions' },
  ];

  const rows = filteredProfessors.map(professor => ({
    id: professor.id,
    image: professor.image,
    firstName: `${professor.firstName} ${professor.lastName}`,
    email: professor.email,
    username: professor.username,
    classes: professor.classes,
    available: professor.available,
    phoneNumber: professor.phoneNumber,
    address: professor.address,
    actions: (
      <>
        <button className="action-btn" onClick={() => handleEdit(professor.id)}>
          <FaEdit /> Edit
        </button>
        <button className="action-btn" onClick={() => handleDelete(professor.id)}>
          <FaTrash /> Delete
        </button>
      </>
    ),
    onDoubleClick: () => {
      history.push(`/professor/Professordetails/${professor.id}`);
    },
  }));

  return (
    <div className="professors-list-container">
      <h2 className="professors-list-header">Professors List</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="add-new-btn">
        <Link to="../professor/AddProfessor">
          <button>+ Add New</button>
        </Link>
      </div>
      <GTable
        columns={columns}
        rows={rows}
        title="Professors"
        actions={[
          {
            tooltip: "Add New Professor",
            icon: <FaEdit />,
            onClick: () => console.log('Add New Professor')
          }
        ]}
        tableName="Professor"
        onSort={handleSort}
      />
    </div>
  );
};

export default ProfessorList;
