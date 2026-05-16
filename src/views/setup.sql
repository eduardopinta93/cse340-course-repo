CREATE TABLE Organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO Organizations (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

CREATE TABLE Service_Projects (
    project_id SERIAL PRIMARY KEY,
    
    organization_id INTEGER NOT NULL,
    
    title VARCHAR(150) NOT NULL,
    
    description TEXT NOT NULL,
    
    location VARCHAR(150) NOT NULL,
    
    project_date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES Organizations(organization_id)
        ON DELETE CASCADE
);

INSERT INTO Service_Projects (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES

-- Organization 1: BrightFuture Builders
(1, 'Community Housing Renovation',
 'Renovating homes for low-income families.',
 'Chicago, Illinois',
 '2026-06-10'),

(1, 'School Playground Construction',
 'Building a new playground for an elementary school.',
 'Denver, Colorado',
 '2026-07-15'),

(1, 'Neighborhood Cleanup Initiative',
 'Improving public spaces and repairing sidewalks.',
 'Austin, Texas',
 '2026-08-05'),

(1, 'Senior Center Repairs',
 'Repairing facilities for a local senior center.',
 'Phoenix, Arizona',
 '2026-09-12'),

(1, 'Sustainable Housing Workshop',
 'Teaching eco-friendly construction techniques.',
 'Seattle, Washington',
 '2026-10-03'),

-- Organization 2: GreenHarvest Growers
(2, 'Urban Garden Expansion',
 'Expanding urban gardens in underserved communities.',
 'Portland, Oregon',
 '2026-06-20'),

(2, 'Community Compost Program',
 'Launching a compost education initiative.',
 'San Diego, California',
 '2026-07-08'),

(2, 'Youth Farming Camp',
 'Teaching children sustainable farming practices.',
 'Madison, Wisconsin',
 '2026-07-25'),

(2, 'Farmers Market Support',
 'Helping organize local organic farmers markets.',
 'Boulder, Colorado',
 '2026-08-18'),

(2, 'Tree Planting Event',
 'Planting trees to improve urban green spaces.',
 'Sacramento, California',
 '2026-09-09'),

-- Organization 3: UnityServe Volunteers
(3, 'Food Bank Volunteer Drive',
 'Coordinating volunteers for local food banks.',
 'Atlanta, Georgia',
 '2026-06-14'),

(3, 'Back-to-School Supply Donation',
 'Providing school supplies to children in need.',
 'Miami, Florida',
 '2026-07-30'),

(3, 'Holiday Shelter Support',
 'Supporting homeless shelters during the holidays.',
 'Boston, Massachusetts',
 '2026-11-22'),

(3, 'Community Health Fair',
 'Organizing free health screenings and services.',
 'Dallas, Texas',
 '2026-09-28'),

(3, 'Disaster Relief Coordination',
 'Helping communities affected by natural disasters.',
 'New Orleans, Louisiana',
 '2026-10-15');


 CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Project_Categories (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES Service_Projects(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES Categories(category_id)
        ON DELETE CASCADE
);

INSERT INTO Categories (name)
VALUES
('Community Service'),
('Education'),
('Environment');



INSERT INTO Project_Categories (
    project_id,
    category_id
)
VALUES
(1, 1),
(1, 2),

(2, 1),

(3, 1),
(3, 3),

(4, 1),

(5, 2),

(6, 3),

(7, 3),

(8, 2),

(9, 1),

(10, 3),

(11, 1),

(12, 2),

(13, 1),

(14, 2),

(15, 3);