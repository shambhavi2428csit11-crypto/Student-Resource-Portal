const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Simple in-memory resource data.
// No database is used, so the project stays beginner-friendly.
const resources = [
  {
    id: 1,
    title: "Data Structures Notes",
    description: "Concise notes for arrays, linked lists, stacks, queues, and trees.",
    category: "Subjects",
    url: "https://www.geeksforgeeks.org/data-structures/",
  },
  {
    id: 2,
    title: "DBMS Revision Guide",
    description: "Quick revision points for SQL, normalization, transactions, and ER diagrams.",
    category: "Subjects",
    url: "https://www.geeksforgeeks.org/dbms/",
  },
  {
    id: 3,
    title: "JavaScript Roadmap",
    description: "Learn core JavaScript concepts and build confidence step by step.",
    category: "Coding",
    url: "https://roadmap.sh/javascript",
  },
  {
    id: 4,
    title: "Practice Coding Problems",
    description: "A set of coding practice platforms for daily problem solving.",
    category: "Coding",
    url: "https://leetcode.com/",
  },
  {
    id: 5,
    title: "AWS Free Tier",
    description: "Explore cloud basics with free-tier services from AWS.",
    category: "Cloud",
    url: "https://aws.amazon.com/free/",
  },
  {
    id: 6,
    title: "Azure Learning Hub",
    description: "Beginner-friendly cloud learning resources from Microsoft Azure.",
    category: "Cloud",
    url: "https://learn.microsoft.com/training/azure/",
  },
  {
    id: 7,
    title: "Resume Building Guide",
    description: "Helpful tips to create a clean, effective resume for placements.",
    category: "Placement Preparation",
    url: "https://www.linkedin.com/",
  },
  {
    id: 8,
    title: "Interview Preparation",
    description: "Practice aptitude, communication, and interview questions regularly.",
    category: "Placement Preparation",
    url: "https://www.geeksforgeeks.org/interview-preparation-for-software-developer/",
  },
  {
    id: 9,
    title: "University Exam Portal",
    description: "A placeholder for official academic exam updates and timetables.",
    category: "Important Academic Links",
    url: "https://www.ugc.gov.in/",
  },
  {
    id: 10,
    title: "Academic Calendar",
    description: "Check semester schedules, deadlines, and important academic events.",
    category: "Important Academic Links",
    url: "https://www.education.gov.in/",
  },
];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API route that sends the resource list to the frontend.
app.get("/api/resources", (req, res) => {
  res.json(resources);
});

// Serve the home page for the root route.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Student Resource Portal is running at http://localhost:${PORT}`);
});
