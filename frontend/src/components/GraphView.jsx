import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import PropTypes from "prop-types";


const GraphView = ({ developer }) => {

    if (!developer) {
        return null;
    }


    // create unique skills
    const skillNames = [
        ...developer.skills.map((skill) => skill.name),

        ...developer.relatedSkills.flatMap((relation) => [
            relation.skill,
            relation.relatedSkill,
        ]),
    ].filter(
        (name, index, array) =>
            array.indexOf(name) === index
    );



    // create unique technologies
    const technologyNames = [
        ...developer.technologies.map(
            (technology) => technology.technology
        ),
    ].filter(
        (name, index, array) =>
            array.indexOf(name) === index
    );



    // nodes
    const nodes = [

        // Developer
        {
            id: "developer",
            position: {
                x: 500,
                y: 300,
            },
            data: {
                label: developer.developer,
            },
        },


        // skills
        ...skillNames.map((skillName, index) => ({
            id: `skill-${index}`,

            position: {
                x: 100 + index * 180,
                y: 50,
            },

            data: {
                label: skillName,
            },
        })),


        // projects
        ...developer.projects.map((project, index) => ({
            id: `project-${index}`,

            position: {
                x: 300 + index * 350,
                y: 500,
            },

            data: {
                label: project.name,
            },
        })),


        // technologies
        ...technologyNames.map((technologyName, index) => ({
            id: `technology-${index}`,

            position: {
                x: 100 + index * 200,
                y: 750,
            },

            data: {
                label: technologyName,
            },
        })),
    ];



    // edges
       const edges = [

   
        // Developer ki Skills
        ...developer.skills.map((skill) => {

            const skillIndex = skillNames.indexOf(
                skill.name
            );

            return {
                id: `developer-skill-${skillIndex}`,

                source: "developer",

                target: `skill-${skillIndex}`,

                label: "HAS_SKILL",
            };
        }),


        // developer Projects
           ...developer.projects.map((project, index) => ({
            id: `developer-project-${index}`,

            source: "developer",

            target: `project-${index}`,

            label: "WORKED_ON",
        })),


        // project technology
        ...developer.technologies.map(
            (technology, index) => {

                const projectIndex =
                    developer.projects.findIndex(
                        (project) =>
                            project.name ===
                            technology.project
                    );


                const technologyIndex =
                    technologyNames.indexOf(
                        technology.technology
                    );


                return {
                    id: `project-technology-${index}`,

                    source: `project-${projectIndex}`,

                    target: `technology-${technologyIndex}`,

                    label: "BUILT_WITH",
                };
            }
        ),


        // skill related Skill
        ...developer.relatedSkills.map(
            (relation, index) => {

                const sourceIndex =
                    skillNames.indexOf(
                        relation.skill
                    );


                const targetIndex =
                    skillNames.indexOf(
                        relation.relatedSkill
                    );


                return {
                    id: `related-skill-${index}`,

                    source: `skill-${sourceIndex}`,

                    target: `skill-${targetIndex}`,

                    label: "RELATED_TO",
                };
            }
        ),
    ];


  

       return (
        <div
            style={{
                width: "100%",
                height: "700px",
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
};



GraphView.propTypes = {
    developer: PropTypes.shape({
        developer: PropTypes.string.isRequired,

        skills: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                category: PropTypes.string,
            })
        ).isRequired,

        projects: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                description: PropTypes.string,
            })
        ).isRequired,

        technologies: PropTypes.arrayOf(
            PropTypes.shape({
                project: PropTypes.string.isRequired,
                technology: PropTypes.string.isRequired,
                category: PropTypes.string,
            })
        ).isRequired,

        relatedSkills: PropTypes.arrayOf(
            PropTypes.shape({
                skill: PropTypes.string.isRequired,
                relatedSkill: PropTypes.string.isRequired,
                category: PropTypes.string,
            })
        ).isRequired,
    }),
};


export default GraphView;