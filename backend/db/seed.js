import "dotenv/config";
import driver from "./db.js";

const seedDatabase = async () => {
    const session = driver.session();

    try {
      
        //developers
        await session.run(
            `
            UNWIND $developers AS developer

            MERGE (d:Developer {
                name: developer.name
            })

            SET d.experience = developer.experience,
                d.location = developer.location
            `,
            {
                developers: [
                    {
                        name: "Saurabh",
                        experience: 3,
                        location: "Faridabad"
                    },
                    {
                        name: "Aman",
                        experience: 4,
                        location: "Delhi"
                    },
                    {
                        name: "Rahul",
                        experience: 2,
                        location: "Gurgaon"
                    },
                    {
                        name: "Priya",
                        experience: 5,
                        location: "Bangalore"
                    }
                ]
            }
        );

        console.log("Developers seeded");


        // skills
        await session.run(
            `
            UNWIND $skills AS skill

            MERGE (s:Skill {
                name: skill.name
            })

            SET s.category = skill.category
            `,
            {
                skills: [
                    {
                        name: "React",
                        category: "Frontend"
                    },
                    {
                        name: "JavaScript",
                        category: "Programming"
                    },
                    {
                        name: "TypeScript",
                        category: "Programming"
                    },
                    {
                        name: "Node.js",
                        category: "Backend"
                    },
                    {
                        name: "Express.js",
                        category: "Backend"
                    },
                    {
                        name: "Next.js",
                        category: "Frontend"
                    },
                    {
                        name: "Redux",
                        category: "Frontend"
                    },
                    {
                        name: "GraphQL",
                        category: "Backend"
                    }
                ]
            }
        );

        console.log("Skills seeded");


        // projects
        await session.run(
            `
            UNWIND $projects AS project

            MERGE (p:Project {
                name: project.name
            })

            SET p.description = project.description
            `,
            {
                projects: [
                    {
                        name: "Attendance SaaS",
                        description:
                            "Employee attendance management platform"
                    },
                    {
                        name: "Analytics Dashboard",
                        description:
                            "User behaviour analytics platform"
                    },
                    {
                        name: "E-Commerce Platform",
                        description:
                            "Online shopping application"
                    },
                    {
                        name: "Hotel Management System",
                        description:
                            "Hotel booking and management platform"
                    }
                ]
            }
        );

        console.log("Projects seeded");


        // technologies
        await session.run(
            `
            UNWIND $technologies AS technology

            MERGE (t:Technology {
                name: technology.name
            })

            SET t.category = technology.category
            `,
            {
                technologies: [
                    {
                        name: "React",
                        category: "Frontend"
                    },
                    {
                        name: "Node.js",
                        category: "Backend"
                    },
                    {
                        name: "Express.js",
                        category: "Backend"
                    },
                    {
                        name: "MongoDB",
                        category: "Database"
                    },
                    {
                        name: "Next.js",
                        category: "Frontend"
                    }
                ]
            }
        );

        console.log("Technologies seeded");


        // developer ki skill
        await session.run(
            `
            UNWIND $relationships AS item

            MATCH (d:Developer {
                name: item.developer
            })

            MATCH (s:Skill {
                name: item.skill
            })

            MERGE (d)-[:KNOWS]->(s)
            `,
            {
                relationships: [
                    {
                        developer: "Saurabh",
                        skill: "React"
                    },
                    {
                        developer: "Saurabh",
                        skill: "JavaScript"
                    },
                    {
                        developer: "Saurabh",
                        skill: "Node.js"
                    },
                    {
                        developer: "Saurabh",
                        skill: "TypeScript"
                    },

                    {
                        developer: "Aman",
                        skill: "React"
                    },
                    {
                        developer: "Aman",
                        skill: "Next.js"
                    },
                    {
                        developer: "Aman",
                        skill: "TypeScript"
                    },

                    {
                        developer: "Rahul",
                        skill: "Node.js"
                    },
                    {
                        developer: "Rahul",
                        skill: "Express.js"
                    },
                    {
                        developer: "Rahul",
                        skill: "GraphQL"
                    },

                    {
                        developer: "Priya",
                        skill: "React"
                    },
                    {
                        developer: "Priya",
                        skill: "Redux"
                    },
                    {
                        developer: "Priya",
                        skill: "Next.js"
                    }
                ]
            }
        );

        console.log("Developer-Skill relationships seeded");


       // developer ke projects
        await session.run(
            `
            UNWIND $relationships AS item

            MATCH (d:Developer {
                name: item.developer
            })

            MATCH (p:Project {
                name: item.project
            })

            MERGE (d)-[:WORKED_ON]->(p)
            `,
            {
                relationships: [
                    {
                        developer: "Saurabh",
                        project: "Attendance SaaS"
                    },
                    {
                        developer: "Saurabh",
                        project: "Analytics Dashboard"
                    },
                    {
                        developer: "Aman",
                        project: "E-Commerce Platform"
                    },
                    {
                        developer: "Rahul",
                        project: "Analytics Dashboard"
                    },
                    {
                        developer: "Priya",
                        project: "Hotel Management System"
                    }
                ]
            }
        );

        console.log("Developer-Project relationships seeded");


       // projects ki technologies
        await session.run(
            `
            UNWIND $relationships AS item

            MATCH (p:Project {
                name: item.project
            })

            MATCH (t:Technology {
                name: item.technology
            })

            MERGE (p)-[:BUILT_WITH]->(t)
            `,
            {
                relationships: [
                    {
                        project: "Attendance SaaS",
                        technology: "React"
                    },
                    {
                        project: "Attendance SaaS",
                        technology: "Node.js"
                    },
                    {
                        project: "Attendance SaaS",
                        technology: "Express.js"
                    },
                    {
                        project: "Attendance SaaS",
                        technology: "MongoDB"
                    },

                    {
                        project: "Analytics Dashboard",
                        technology: "React"
                    },
                    {
                        project: "Analytics Dashboard",
                        technology: "Node.js"
                    },
                    {
                        project: "Analytics Dashboard",
                        technology: "MongoDB"
                    },

                    {
                        project: "E-Commerce Platform",
                        technology: "Next.js"
                    },

                    {
                        project: "Hotel Management System",
                        technology: "React"
                    },
                    {
                        project: "Hotel Management System",
                        technology: "Node.js"
                    },
                    {
                        project: "Hotel Management System",
                        technology: "MongoDB"
                    }
                ]
            }
        );

        console.log("Project-Technology relationships seeded");


        // skill related skill
         await session.run(
            `
            UNWIND $relationships AS item

            MATCH (s1:Skill {
                name: item.from
            })

            MATCH (s2:Skill {
                name: item.to
            })

            MERGE (s1)-[:RELATED_TO]->(s2)
            `,
            {
                relationships: [
                    {
                        from: "React",
                        to: "JavaScript"
                    },
                    {
                        from: "React",
                        to: "TypeScript"
                    },
                    {
                        from: "React",
                        to: "Next.js"
                    },
                    {
                        from: "React",
                        to: "Redux"
                    },
                    {
                        from: "Node.js",
                        to: "Express.js"
                    },
                    {
                        from: "TypeScript",
                        to: "Next.js"
                    }
                ]
            }
        );

        console.log("Skill-Skill relationships seeded");


      
        // skill projects
        await session.run(
            `
            UNWIND $relationships AS item

            MATCH (s:Skill {
                name: item.skill
            })

            MATCH (p:Project {
                name: item.project
            })

            MERGE (s)-[:USED_IN]->(p)
            `,
            {
                relationships: [
                    {
                        skill: "React",
                        project: "Attendance SaaS"
                    },
                    {
                        skill: "Node.js",
                        project: "Attendance SaaS"
                    },
                    {
                        skill: "TypeScript",
                        project: "Attendance SaaS"
                    },

                    {
                        skill: "React",
                        project: "Analytics Dashboard"
                    },
                    {
                        skill: "JavaScript",
                        project: "Analytics Dashboard"
                    },

                    {
                        skill: "Next.js",
                        project: "E-Commerce Platform"
                    },

                    {
                        skill: "React",
                        project: "Hotel Management System"
                    }
                ]
            }
        );

        console.log("Skill-Project relationships seeded");


      // complete
        console.log("Seed completed successfully!");

    } catch (error) {
        console.error("Seed failed:", error.message);

    } finally {
        await session.close();
        await driver.close();
    }
};

seedDatabase();