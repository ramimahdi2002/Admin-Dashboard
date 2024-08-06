import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  FaChevronDown,
  FaChevronUp,
  FaBell,
  FaBook,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen, sidebarColor, closeSidebar }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sidebarRef = useRef(null);

  Sidebar.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    sidebarColor: PropTypes.string.isRequired,
    closeSidebar: PropTypes.func.isRequired,
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaCog />, path: "/" },
    {
      name: "Professor",
      icon: <FaChalkboardTeacher />,
      submenu: [
        { name: "Add Professor", path: "/professor/addProfessor" },
        { name: "View Professors", path: "/professor/index" },
      ],
    },
    {
      name: "Students",
      icon: <FaUserGraduate />,
      submenu: [
        { name: "Add Student", path: "/students/addStudent" },
        { name: "View Students", path: "students/index" },
      ],
    },
    {
      name: "Courses",
      icon: <FaBook />,
      submenu: [
        { name: "Add Course", path: "/courses/addCourse" },
        { name: "View Courses", path: "/courses/index" },
      ],
    },
    {
      name: "Notifications",
      icon: <FaBell />,
      submenu: [{ name: "View Notifications", path: "*" }],
    },
  ];

  useEffect(() => {
    if (sidebarOpen) {
      const handleClickOutside = event => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          closeSidebar();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    } else {
      setActiveIndex(null);
    }
  }, [sidebarOpen, closeSidebar]);

  const handleToggle = (index) => {
    if (sidebarOpen) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${sidebarOpen ? "open" : ""}`}
      style={{ backgroundColor: sidebarColor }}
    >
      <div className="menu-items">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${activeIndex === index ? "active" : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {item.path ? (
              <Link to={item.path}>
                <div className="menu-title">
                  <span className="icon">{item.icon}</span>
                  {sidebarOpen && item.name}
                </div>
              </Link>
            ) : (
              <div className="menu-title" onClick={() => handleToggle(index)}>
                <span className="icon">{item.icon}</span>
                {sidebarOpen && item.name}
                {sidebarOpen && (
                  <span className="toggle-icon">
                    {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                )}
              </div>
            )}
            {activeIndex === index &&
              item.submenu &&
              item.submenu.length > 0 && (
                <div className="submenu">
                  {item.submenu.map((subItem, subIndex) => (
                    <Link to={subItem.path} key={subIndex}>
                      <div className="submenu-item">
                        {subItem.name}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
