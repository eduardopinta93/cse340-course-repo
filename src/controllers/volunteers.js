import { addVolunteer, removeVolunteer } from '../models/volunteers.js';

const processAddVolunteer = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    try {
        await addVolunteer(projectId, userId);

        req.flash('success', 'You have volunteered for this project!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error volunteering for project:', error);
        req.flash('error', 'There was an error volunteering for this project.');
        res.redirect(`/project/${projectId}`);
    }
};

const processRemoveVolunteer = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    try {
        await removeVolunteer(projectId, userId);

        req.flash('success', 'You have been removed as a volunteer from this project.');
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error removing volunteer from project:', error);
        req.flash('error', 'There was an error removing you from this project.');
        res.redirect('/dashboard');
    }
};

export {
    processAddVolunteer,
    processRemoveVolunteer
};