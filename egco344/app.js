const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Mock student data
const students = [
    {
        id: 'ENG001',
        name: 'John Smith',
        department: 'Civil Engineering',
        gpa: 3.85
    },
    {
        id: 'ENG002',
        name: 'Sarah Johnson',
        department: 'Electrical Engineering',
        gpa: 3.92
    },
    {
        id: 'ENG003',
        name: 'Mike Chen',
        department: 'Mechanical Engineering',
        gpa: 3.65
    },
    {
        id: 'ENG004',
        name: 'Emily Davis',
        department: 'Civil Engineering',
        gpa: 3.78
    },
    {
        id: 'ENG005',
        name: 'Alex Rodriguez',
        department: 'Chemical Engineering',
        gpa: 3.88
    },
    {
        id: 'ENG006',
        name: 'Lisa Wong',
        department: 'Electrical Engineering',
        gpa: 3.95
    }
];

// API to get all students with GPA organized by department
app.get('/api/students/gpa', (req, res) => {
    const byDepartment = {};
    
    students.forEach(student => {
        if (!byDepartment[student.department]) {
            byDepartment[student.department] = [];
        }
        byDepartment[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
    });
    
    res.json(byDepartment);
});

// API to get individual student GPA by student ID
app.get('/api/students/:studentId/gpa', (req, res) => {
    const student = students.find(s => s.id === req.params.studentId);
    
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json({
        id: student.id,
        name: student.name,
        department: student.department,
        gpa: student.gpa
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});