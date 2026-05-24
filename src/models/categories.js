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

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            name AS category_name
        FROM public.categories
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.name AS category_name
        FROM public.categories c
        JOIN public.project_categories pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

export { getAllCategories, getCategoryById, getCategoriesByProjectId };