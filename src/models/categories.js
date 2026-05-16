import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT
            c.category_id,
            c.name AS category_name,
            sp.project_id,
            sp.title AS project_title
        FROM public.categories c
        JOIN public.project_categories pc
            ON c.category_id = pc.category_id
        JOIN public.service_projects sp
            ON pc.project_id = sp.project_id
        ORDER BY c.name, sp.title;
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllCategories };