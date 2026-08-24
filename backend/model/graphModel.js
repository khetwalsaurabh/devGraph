import driver from "../db/db.js";

export const createDeveloper = async (name, experience, location) => {
    const session = driver.session();

    try {
        const result = await session.run(
            `
            CREATE (d:Developer {
                name: $name,
                experience: $experience,
                location: $location
            })
            RETURN d
            `,
            {
                name,
                experience,
                location
            }
        );

        return result.records[0].get("d").properties;
    } finally {
        await session.close();
    }
};


export const createSkillForDeveloper = async (
    developerName,
    skillName,
    category
) => {
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (d:Developer {name: $developerName})

            MERGE (s:Skill {name: $skillName})
            ON CREATE SET s.category = $category

            MERGE (d)-[:KNOWS]->(s)

            RETURN d, s
            `,
            {
                developerName,
                skillName,
                category
            }
        );

        if (result.records.length === 0) {
            throw new Error("Developer not found");
        }

        const skill = result.records[0].get("s");

        return skill.properties;
    } finally {
        await session.close();
    }
};



export const getDeveloperSkills = async (developerName) => {
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (d:Developer {name: $developerName})
                  -[:KNOWS]->
                  (s:Skill)

            RETURN s.name AS name,
                   s.category AS category
            ORDER BY s.name
            `,
            {
                developerName
            }
        );

        return result.records.map((record) => ({
            name: record.get("name"),
            category: record.get("category")
        }));
    } finally {
        await session.close();
    }
};


export const getRelatedSkills = async (developerName) => {
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (d:Developer {name: $developerName})
                  -[:KNOWS]->
                  (s:Skill)
                  -[:RELATED_TO]->
                  (related:Skill)

            RETURN s.name AS skill,
                   related.name AS relatedSkill,
                   related.category AS category
            ORDER BY relatedSkill
            `,
            {
                developerName
            }
        );

        return result.records.map((record) => ({
            skill: record.get("skill"),
            relatedSkill: record.get("relatedSkill"),
            category: record.get("category")
        }));

    } finally {
        await session.close();
    }
};


export const getDeveloperTechnologies = async (developerName) => {
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (d:Developer {name: $developerName})
                  -[:WORKED_ON]->
                  (p:Project)
                  -[:BUILT_WITH]->
                  (t:Technology)

            RETURN p.name AS project,
                   t.name AS technology,
                   t.category AS category
            ORDER BY project, technology
            `,
            {
                developerName
            }
        );

        return result.records.map((record) => ({
            project: record.get("project"),
            technology: record.get("technology"),
            category: record.get("category")
        }));

    } finally {
        await session.close();
    }
};


export const getDeveloperProjects = async (developerName) => {
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (d:Developer {name: $developerName})
                  -[:WORKED_ON]->
                  (p:Project)

            RETURN p.name AS name,
                   p.description AS description
            ORDER BY p.name
            `,
            {
                developerName
            }
        );

        return result.records.map((record) => ({
            name: record.get("name"),
            description: record.get("description")
        }));

    } finally {
        await session.close();
    }
};