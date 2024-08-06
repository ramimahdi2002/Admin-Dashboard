import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import GTextfield from '../../components/GTextfiled';
import ProfessorData from '../../ProfessorData.json';

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    startDate: '',
    endDate: '',
    professor: '',
    description: '',
    department: '',
    credits: '',
    photo: null,
    photoPreview: '',
  });

  const [professors, setProfessors] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    setProfessors(ProfessorData);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          photo: file,
          photoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    resetForm();
  };

  const handleReset = () => {
    resetForm();
    navigate('../courses/index');
  };

  const resetForm = () => {
    setFormData({
      courseName: '',
      courseCode: '',
      startDate: '',
      endDate: '',
      professor: '',
      description: '',
      department: '',
      credits: '',
      photo: null,
      photoPreview: '',
    });
  };

  return (
    <div className="form-container">
      <div className="form-header">Add New Course</div>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="form-grid">
          <GTextfield
            type="text"
            label="Course Name"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
          />
          <GTextfield
            type="text"
            label="Course Code"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            required
          />
          <GTextfield
            type="date"
            label="Start Date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          <GTextfield
            type="date"
            label="End Date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
          <GTextfield
            select
            label="Professor"
            name="professor"
            value={formData.professor}
            onChange={handleChange}
            options={professors.map((professor) => ({
              value: professor.id,
              label: `${professor.firstName} ${professor.lastName}`,
            }))}
            required
          />
          <GTextfield
            multiline
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <GTextfield
            select
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            options={[
              { value: 'hr', label: 'HR' },
              { value: 'development', label: 'Development' },
              { value: 'marketing', label: 'Marketing' },
            ]}
            required
          />
          <GTextfield
            type="number"
            label="Credits"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            required
          />
           <div className="form-group">
            <label className="form-label">Photo</label>
            <input
              type="file"
              className="form-control"
              name="photo"
              onChange={handleChange}
              required
            />
          </div>
          {formData.photoPreview && (
            <div className="form-group">
              <img src={formData.photoPreview} alt="Preview" className="photo-preview" />
            </div>
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="reset" className="btn btn-light ml-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
