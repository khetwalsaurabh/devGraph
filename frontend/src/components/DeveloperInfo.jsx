import PropTypes from "prop-types";

const DeveloperInfo = ({ developer }) => {
    if (!developer) {
        return null;
    }

    return (
        <div
            style={{
                width: "280px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
        >
            {/* Developer */}
            <h2 style={{ marginTop: 0 }}>
                {developer.developer}
            </h2>

            <p style={{ color: "#666" }}>
                Developer
            </p>

            {/* kills */}
            <div>
                <h3>Skills</h3>

                {developer.skills.map((skill) => (
                    <div
                        key={skill.name}
                        style={{
                            padding: "6px 10px",
                            marginBottom: "6px",
                            backgroundColor: "#f3f4f6",
                            borderRadius: "6px",
                        }}
                    >
                        {skill.name}
                    </div>
                ))}
            </div>

            {/* p  rojects */}
            <div style={{ marginTop: "20px" }}>
                <h3>Projects</h3>

                {developer.projects.map((project) => (
                    <div
                        key={project.name}
                        style={{
                            marginBottom: "12px",
                        }}
                    >
                        <strong>{project.name}</strong>

                        <p
                            style={{
                                margin: "4px 0",
                                color: "#666",
                                fontSize: "14px",
                            }}
                        >
                            {project.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* technologies */}
            <div style={{ marginTop: "20px" }}>
                <h3>Technologies</h3>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                    }}
                >
                    {[
                        ...new Set(
                            developer.technologies.map(
                                (item) => item.technology
                            )
                        ),
                    ].map((technology) => (
                        <span
                            key={technology}
                            style={{
                                padding: "5px 8px",
                                backgroundColor: "#eef2ff",
                                borderRadius: "5px",
                                fontSize: "13px",
                            }}
                        >
                            {technology}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

DeveloperInfo.propTypes = {
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
    }),
};

export default DeveloperInfo;