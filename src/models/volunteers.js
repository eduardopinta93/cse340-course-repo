import db from './db.js';

const addVolunteer = async (projectId, userId) => {
    const query = `
        INSERT INTO public.project_volunteers (project_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (project_id, user_id) DO NOTHING
        RETURNING project_id, user_id;
    `;

    const queryParams = [projectId, userId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const removeVolunteer = async (projectId, userId) => {
    const query = `
        DELETE FROM public.project_volunteers
        WHERE project_id = $1
          AND user_id = $2
        RETURNING project_id, user_id;
    `;

    const queryParams = [projectId, userId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const getVolunteerProjectsByUserId = async (userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date AS date,
            sp.organization_id,
            o.name AS organization_name
        FROM public.project_volunteers pv
        JOIN public.service_projects sp
            ON pv.project_id = sp.project_id
        JOIN public.organizations o
            ON sp.organization_id = o.organization_id
        WHERE pv.user_id = $1
        ORDER BY sp.project_date ASC;
    `;

    const queryParams = [userId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const isUserVolunteerForProject = async (projectId, userId) => {
    const query = `
        SELECT project_id, user_id
        FROM public.project_volunteers
        WHERE project_id = $1
          AND user_id = $2;
    `;

    const queryParams = [projectId, userId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0;
};

export {
    addVolunteer,
    removeVolunteer,
    getVolunteerProjectsByUserId,
    isUserVolunteerForProject
};