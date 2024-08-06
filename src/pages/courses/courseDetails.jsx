import { useParams } from 'react-router-dom';
import coursesData from '../../CoursesData.json';
import { Link } from 'react-router-dom'; 
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const course = coursesData.find(course => course.id === parseInt(id));

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="course-details-card">
      <Link to="/courses/index" className="return-button">
        Return
      </Link>
      <h2>{course.title}</h2>
      <img src={course.image} alt={course.title} />
      <p>{course.description}</p>
      <p><strong>Professor:</strong> {course.professor}</p>
      <p><strong>Department:</strong> {course.department}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <button className="join-button">Join Course</button>
    </div>
  );
};

export default CourseDetails;
