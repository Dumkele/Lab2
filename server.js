const ProjectAssignment = require('./models/ProjectAssignment');
require('./models/Employee');
require('./models/Project');



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(cors({
    origin: 'http://localhost:8080'
  }));
app.use(express.json());

mongoose.connect('mongodb+srv://dumkele1109:edenhazard10...@recipe.5qiinql.mongodb.net/ProjectManagement')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));









app.get('/', (req, res) => {    
    res.send('Hej!');
});


// routes/api.js or wherever you set up your routes
app.get('/api/project-assignments', async (req, res) => {
    try {
        const assignments = await ProjectAssignment.find()
            .populate('employee_id')
            .populate('project_code')
            .sort({ start_date: -1 })
            .limit(5);
        console.log("Populated Assignments: ", assignments);
        res.json(assignments);
    } catch (err) {
        console.error('Failed to fetch project assignments:', err);
        res.status(500).send({ message: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
