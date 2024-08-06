import { useState } from "react";
import "./AddProfessor.css";
import GTextfield from "../../components/GTextfiled";

const AddProfessor = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    joiningDate: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    designation: "",
    dateOfBirth: "",
    gender: "",
    department: "",
    education: "",
    photo: null,
    photoPreview: "",
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
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

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);

    resetForm();
  };

  const handleReset = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      joiningDate: "",
      password: "",
      confirmPassword: "",
      mobileNumber: "",
      designation: "",
      dateOfBirth: "",
      gender: "",
      department: "",
      education: "",
      photo: null,
      photoPreview: "",
    });
  };

  return (
    <div className="form-container">
      <div className="form-header">Add New Professor</div>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="form-grid">
          <GTextfield
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <GTextfield
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <GTextfield
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <GTextfield
            label="Joining Date"
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            required
          />
          <GTextfield
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <GTextfield
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <GTextfield
            label="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
          <GTextfield
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
          <GTextfield
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
          <GTextfield
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            select
            options={[
              { label: "Gender", value: "" },
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
          />
          <GTextfield
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            select
            options={[
              { label: "Department", value: "" },
              { label: "HR", value: "hr" },
              { label: "Development", value: "development" },
              { label: "Marketing", value: "marketing" },
            ]}
          />
          <GTextfield
            label="Education"
            name="education"
            value={formData.education}
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
              <img
                src={formData.photoPreview}
                alt="Preview"
                className="photo-preview"
              />
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

export default AddProfessor;
