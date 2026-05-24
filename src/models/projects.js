import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date,
            o.name AS organization_name
        FROM public.service_projects sp
        JOIN public.organizations o
            ON sp.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM public.service_projects
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date
        FROM public.service_projects sp
        JOIN public.project_categories pc
            ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.project_date;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.project_date AS date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name
    FROM public.service_projects sp
    JOIN public.organizations o
      ON sp.organization_id = o.organization_id
    WHERE sp.project_date >= CURRENT_DATE
    ORDER BY sp.project_date ASC
    LIMIT $1;
  `;

  const queryParams = [number_of_projects];

  const result = await db.query(query, queryParams);

  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.project_date AS date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name
    FROM public.service_projects sp
    JOIN public.organizations o
      ON sp.organization_id = o.organization_id
    WHERE sp.project_id = $1;
  `;

  const queryParams = [id];

  const result = await db.query(query, queryParams);

  return result.rows.length > 0 ? result.rows[0] : null;
};

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId, getProjectsByCategoryId, getUpcomingProjects, getProjectDetails };