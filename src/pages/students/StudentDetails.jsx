import { useParams, Link } from 'react-router-dom';
import studentsData from '../../studentData.json'; 
import './StudentDetails.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const StudentDetails = () => {
  const { id } = useParams();
  const student = studentsData.find(student => student.id === parseInt(id));

  if (!student) {
    return <div>Student not found</div>;
  }

  const handleEdit = () => {
    console.log(`Editing student with ID ${student.id}`);
  
  };

  const handleDelete = () => {
    console.log(`Deleting student with ID ${student.id}`);

  };

  return (
    <div className="student-details-card">
      <div className="return-button-container">
        <Link to="../students/index" className="return-button">
           Return
        </Link>
      </div>
      <div className="student-details-header">
        <h2>{`${student.firstName} ${student.lastName}`}</h2>
        <img src={student.image} alt={`${student.firstName} ${student.lastName}`} />
      </div>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Username:</strong> {student.username}</p>
      <p><strong>Role:</strong> {student.role}</p>
      <p><strong>Status:</strong> {student.status}</p>
      <p><strong>Phone:</strong> {student.phoneNumber}</p>
      <p><strong>Address:</strong> {student.address}</p>
      <div className="student-actions">
        <button className="action-btn" onClick={handleEdit}>
          <FaEdit /> Edit
        </button>
        <button className="action-btn" onClick={handleDelete}>
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;
