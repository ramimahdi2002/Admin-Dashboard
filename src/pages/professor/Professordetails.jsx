import { useParams, Link } from 'react-router-dom';
import ProfessorData from '../../ProfessorData.json'; 
import './ProfessorDetails.css'; 
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProfessorDetails = () => {
  const { id } = useParams();
  const professor = ProfessorData.find(professor => professor.id === parseInt(id));

  if (!professor) {
    return <div>Professor not found</div>;
  }

  const handleEdit = (professorId) => {
    console.log(`Edit professor with ID ${professorId}`);
 
  };

  const handleDelete = (professorId) => {
    console.log(`Delete professor with ID ${professorId}`);
  
  };

  return (
    <div className="professor-details-card">   
    <Link to="../professor/index">
          <button className="return-button">Return</button>
        </Link>
      <h2>{`${professor.firstName} ${professor.lastName}`}</h2>
      {professor.image && (
        <img
          src={professor.image}
          alt={`${professor.firstName} ${professor.lastName}`}
          className="professor-photo"
        />
      )}
      <p><strong>Email:</strong> {professor.email}</p>
      <p><strong>Username:</strong> {professor.username}</p>
      <p><strong>Courses:</strong> {professor.classes}</p>
      <p><strong>Status:</strong> {professor.available ? 'Available' : 'Not Available'}</p>
      <p><strong>Phone:</strong> {professor.phoneNumber}</p>
      <p><strong>Address:</strong> {professor.address}</p>

      <div className="buttons-container">
     
        <button className="action-btn" onClick={() => handleEdit(professor.id)}>
          <FaEdit /> Edit
        </button>
        <button className="action-btn" onClick={() => handleDelete(professor.id)}>
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default ProfessorDetails;
