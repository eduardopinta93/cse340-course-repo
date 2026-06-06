import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, 
    showOrganizationDetailsPage, 
    showNewOrganizationForm, 
    processNewOrganizationForm, 
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm } from './controllers/organizations.js';
import {showProjectsPage, 
    showProjectDetailsPage, 
    showNewProjectForm, 
    processNewProjectForm, 
    showEditProjectForm, 
    processEditProjectForm, 
    projectValidation} from './controllers/projects.js';
import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation
    } from './controllers/categories.js';
import {showUserRegistrationForm, 
        processUserRegistrationForm, 
        showLoginForm, 
        processLoginForm, 
        processLogout,
        requireLogin,
        showDashboard} from './controllers/users.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);

router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);

router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);

// Route for new category page
router.get('/new-category', showNewCategoryForm);

// Route to display the edit category form
router.get('/edit-category/:id', showEditCategoryForm);

// error-handling routes
router.get('/test-error', testErrorPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/new-organization', showNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to display the edit project form
router.get('/edit-project/:id', showEditProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);

// User registration routes
router.get('/register', showUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.get('/logout', processLogout);

router.get('/dashboard', requireLogin, showDashboard);

router.post('/login', processLoginForm);

router.post('/register', processUserRegistrationForm);

// Route to handle new category form submission
router.post('/new-category', categoryValidation, processNewCategoryForm);

// Route to handle the edit category form submission
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Route to handle the edit project form submission
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

export default router;