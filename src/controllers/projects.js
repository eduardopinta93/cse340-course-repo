//app.get('/projects', async (req, res) => {
//    const projects = await getAllProjects();
//    const title = 'Community Service Projects';
//    res.render('projects', { title, projects });
//});

// Import any needed model functions
import { getAllProjects } from '../models/projects.js';

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';

    res.render('projects', { title, projects });
};  

// Export any controller functions
export { showProjectsPage };