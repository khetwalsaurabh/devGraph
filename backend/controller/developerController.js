import { createDeveloper, createSkillForDeveloper, getDeveloperSkills, getRelatedSkills, getDeveloperTechnologies,
    getDeveloperProjects
 } from "../model/graphModel.js";

 import driver from "../db/db.js";

export const addDeveloper = async (req, res) => {
    try {
        const { name, experience, location } = req.body;

        if (!name || experience === undefined || !location) {
            return res.status(400).json({
                success: false,
                message: "Name, experience and location are required"
            });
        }

        const developer = await createDeveloper(
            name,
            experience,
            location
        );

        res.status(201).json({
            success: true,
            message: "Developer created successfully",
            developer
        });

    } catch (error) {
        console.error("Add developer error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to create developer"
        });
    }
};

export const addSkillForDeveloper = async (req, res) => {
    try {
        const {
            developerName,
            skillName,
            category
        } = req.body;

        if (!developerName || !skillName || !category) {
            return res.status(400).json({
                success: false,
                message: "Developer name, skill name and category are required"
            });
        }

        const skill = await createSkillForDeveloper(
            developerName,
            skillName,
            category
        );

        res.status(201).json({
            success: true,
            message: "Skill added successfully",
            skill
        });

    } catch (error) {
        console.error("Add skill error:", error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getSkills = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Developer name is required"
            });
        }

        const skills = await getDeveloperSkills(name);

        res.status(200).json({
            success: true,
            developer: name,
            skills
        });

    } catch (error) {
        console.error("Get developer skills error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch developer skills"
        });
    }
};


export const getRelatedSkillsForDeveloper = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Developer name is required"
            });
        }

        const relatedSkills = await getRelatedSkills(name);

        res.status(200).json({
            success: true,
            developer: name,
            relatedSkills
        });

    } catch (error) {
        console.error(
            "Get related skills error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch related skills"
        });
    }
};

export const getTechnologiesForDeveloper = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Developer name is required"
            });
        }

        const technologies = await getDeveloperTechnologies(name);

        res.status(200).json({
            success: true,
            developer: name,
            technologies
        });

    } catch (error) {
        console.error(
            "Get developer technologies error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch developer technologies"
        });
    }
};

export const getDeveloperDetails = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Developer name is required"
            });
        }

        // check that developer exists in db
        const session = driver.session();

        const result = await session.run(
            `
            MATCH (d:Developer)
            WHERE toLower(d.name) = toLower($name)
            RETURN d
            `,
            { name }
        );

        await session.close();

        if (result.records.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Developer not found"
            });
        }

        const [
            skills,
            projects,
            technologies,
            relatedSkills
        ] = await Promise.all([
            getDeveloperSkills(name),
            getDeveloperProjects(name),
            getDeveloperTechnologies(name),
            getRelatedSkills(name)
        ]);

        res.status(200).json({
            success: true,
            developer: name,
            skills,
            projects,
            technologies,
            relatedSkills
        });

    } catch (error) {
        console.error(
            "Get developer details error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch developer details"
        });
    }
};