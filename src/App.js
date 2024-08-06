import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/footer";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login/Login";
import AddProfessor from "./pages/professor/addProfessor";
import RegisterPage from "./pages/Register/Register";
import AddStudent from "./pages/students/AddStudent";
import AddCourse from "./pages/courses/AddCourse";
import ProfessorList from "./pages/professor/index";
import StudentList from "./pages/students/index";
import ProfessorDetails from "./pages/professor/Professordetails";
import ForgotPassword from './pages/forgotpass/ForgorPassword';
import StudentDetails from './pages/students/StudentDetails';
import CourseDetails from './pages/courses/courseDetails';
import CourseList from './pages/courses/index';
import EditProfile from './pages/editprofile/EditProfile';
import ChangePassword from './pages/changepass/ChangePassword';

const AppContent = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const isAuthPage = location.pathname.toLowerCase() === "/login" || location.pathname.toLowerCase() === "/register";

  return (
    <div className="app">
      {!isAuthPage && <Topbar toggleSidebar={toggleSidebar} />}
      {!isAuthPage && <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />}
      <div className={`main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<h1>Page not found</h1>} />
          <Route path="/professor/addProfessor" element={<AddProfessor />} />{" "}
          <Route path="/professor/Professordetails/:id" element={<ProfessorDetails />} />
          <Route path="/professor/index" element={<ProfessorList />} />{" "}
          <Route path="/students/addStudent" element={<AddStudent />} />
          <Route path="/students/index" element={<StudentList />} />
          <Route path="/students/StudentDetails/:id" element={<StudentDetails />} />
          <Route path="/forgotpass" element={<ForgotPassword />} />
          <Route path="/courses/addCourse" element={<AddCourse />} />
          <Route path="/courses/index" element={<CourseList />} />
          <Route path="/courses/courseDetails/:id" element={<CourseDetails />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/changepass" element={<ChangePassword />} />
        </Routes>
      </div>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
