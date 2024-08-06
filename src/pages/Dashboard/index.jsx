import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfessorData from ".//../../ProfessorData.json";
import StudentData from ".//../../studentData.json";
import CoursesData from ".//../../CoursesData.json";
import MedalData from ".//../../graphData.json";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { Button} from "@mui/material";
import "./Dashboard.css";
import GButton from "../../components/GButton";
import GTable from "../../components/GTable";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const Dashboard = () => {
  const [professors, setProfessors] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setProfessors(ProfessorData);
      setStudents(StudentData);
      setCourses(CoursesData);
      setLoading(false);
    } catch (error) {
      setError("Error loading data");
      setLoading(false);
    }
  }, []);

  const numberOfStudents = students.length;
  const numberOfProfessors = professors.length;
  const numberOfClasses = courses.length;

  const chartData = {
    labels: ["Students", "Professors", "Classes"],
    datasets: [
      {
        label: "Number of Individuals",
        data: [numberOfStudents, numberOfProfessors, numberOfClasses],
        backgroundColor: [
          "#007bff", 
          "#87CEEB", 
          "rgba(255, 206, 86, 0.6)", 
        ],
        borderColor: [
          "rgba(0, 123, 255, 1)", 
          "rgba(135, 206, 235, 1)", 
          "rgba(255, 206, 86, 1)", 
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        fill: true,
      },
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const generateLineData = (dataPoints, backgroundColor) => ({
    labels: Array(dataPoints.length).fill(""),
    datasets: [
      {
        data: dataPoints,
        backgroundColor: backgroundColor,
      },
    ],
  });

  const calculateAverageGrowth = data => {
    const total = data.reduce((sum, value) => sum + value, 0);
    return total / data.length;
  };

  const goldAverage = calculateAverageGrowth(MedalData.goldMedal.dataPoints);
  const silverAverage = calculateAverageGrowth(
    MedalData.silverMedal.dataPoints
  );
  const bronzeAverage = calculateAverageGrowth(
    MedalData.bronzeMedal.dataPoints
  );

  const averageGrowthData = {
    labels: ["Gold", "Silver", "Bronze"],
    datasets: [
      {
        label: "Average Growth",
        data: [goldAverage, silverAverage, bronzeAverage],
        backgroundColor: [
          "rgba(255, 215, 0, 0.6)", 
          "rgba(192, 192, 192, 0.6)", 
          "rgba(205, 127, 50, 0.6)", 
        ],
        borderColor: [
          "rgba(255, 215, 0, 1)", 
          "rgba(192, 192, 192, 1)", 
          "rgba(205, 127, 50, 1)", 
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="analytics">
        <div className="chart">
          <h3>Dashboard Overview</h3>
          <Doughnut data={chartData} />
        </div>
        <div className="chart">
          <h3>Average Growth Comparison</h3>
          <Doughnut data={averageGrowthData} />
        </div>
      </div>

      <div className="medals-container">
        <div className="medal-item">
          <h2>Gold Medal</h2>
          <div className="medal">
            <div className="medal-info">
              <span>Overall Growth</span>
              <span>{MedalData.goldMedal.overallGrowth}</span>
              <span>Monthly</span>
              <span>{MedalData.goldMedal.monthly}</span>
              <span>Daily</span>
              <span>{MedalData.goldMedal.daily}</span>
              <span style={{ color: "green" }}>
                {MedalData.goldMedal.growthComparison}
              </span>
            </div>
            <div className="medal-chart">
              <Line
                data={generateLineData(
                  MedalData.goldMedal.dataPoints,
                  "rgba(0, 123, 255, 0.2)"
                )}
                options={{
                  ...lineOptions,
                  elements: {
                    ...lineOptions.elements,
                    line: {
                      ...lineOptions.elements.line,
                      backgroundColor: "rgba(0, 123, 255, 0.2)",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="medal-item">
          <h2>Silver Medal</h2>
          <div className="medal">
            <div className="medal-info">
              <span>Overall Growth</span>
              <span>{MedalData.silverMedal.overallGrowth}</span>
              <span>Monthly</span>
              <span>{MedalData.silverMedal.monthly}</span>
              <span>Daily</span>
              <span>{MedalData.silverMedal.daily}</span>
              <span style={{ color: "green" }}>
                {MedalData.silverMedal.growthComparison}
              </span>
            </div>
            <div className="medal-chart">
              <Line
                data={generateLineData(
                  MedalData.silverMedal.dataPoints,
                  "rgba(255, 165, 0, 0.2)"
                )}
                options={{
                  ...lineOptions,
                  elements: {
                    ...lineOptions.elements,
                    line: {
                      ...lineOptions.elements.line,
                      backgroundColor: "rgba(255, 165, 0, 0.2)",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="medal-item">
          <h2>Bronze Medal</h2>
          <div className="medal">
            <div className="medal-info">
              <span>Overall Growth</span>
              <span>{MedalData.bronzeMedal.overallGrowth}</span>
              <span>Monthly</span>
              <span>{MedalData.bronzeMedal.monthly}</span>
              <span>Daily</span>
              <span>{MedalData.bronzeMedal.daily}</span>
              <span style={{ color: "green" }}>
                {MedalData.bronzeMedal.growthComparison}
              </span>
            </div>
            <div className="medal-chart">
              <Line
                data={generateLineData(
                  MedalData.bronzeMedal.dataPoints,
                  "rgba(160, 82, 45, 0.2)"
                )}
                options={{
                  ...lineOptions,
                  elements: {
                    ...lineOptions.elements,
                    line: {
                      ...lineOptions.elements.line,
                      backgroundColor: "rgba(160, 82, 45, 0.2)",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="list-container">
        <h2>Professors List</h2>
        <GTable
          columns={[
            { id: "image", label: "image" },
            { id: "firstName", label: "First Name" },
            { id: "lastName", label: "Last Name" },
            { id: "email", label: "Email" },
            { id: "classes", label: "Classes" },
            { id: "available", label: "Availability " },
          ]}
          rows={professors}
          tableName="Professor"
          title="Professors"
      
        />
        <Link to="/professor/index">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GButton
              label="View All"
              variant="text"
              sx={{
                padding: "10px 20px",
              }}
            />
          </div>
        </Link>
      </div>

      <div className="list-container">
        <h2>Student List</h2>
        <GTable
          columns={[
            { id: "image", label: "image" },
            { id: "firstName", label: "First Name" },
            { id: "lastName", label: "Last Name" },
            { id: "email", label: "Email" },
            { id: "phoneNumber", label: "Phone Number" },
            { id: "address", label: "Address" },
          ]}
          rows={students}
          tableName="student"
          title="Students"
        
        />
        <Link to="/students/index">
          <Button className="view-all-button">View All</Button>
        </Link>
      </div>

      <div className="list-container">
        <h2>Course List</h2>
        <GTable
          columns={[
            { id: "image", label: "Image" },
            { id: "title", label: "Title" },
            { id: "professor", label: "Professor" },
            { id: "department", label: "Department" },
            { id: "duration", label: "Duration" },
          ]}
          rows={courses}
          tableName="course"
          title="Courses"
      
        />
        <Link to="/courses/index">
          <Button className="view-all-button">View All</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
