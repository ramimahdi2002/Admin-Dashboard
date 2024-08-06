import "../styles/App.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>Admin Panel</h3>
          <p>&copy; 2024 Rami Mahdi</p>
        </div>
        <div className="footer-right">
          <ul className="footer-links">
            <li>
              <a href="../">Home</a>
            </li>
            <li>
              <a href="../CoursesList">Coursess</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
