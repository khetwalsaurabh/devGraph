import { useState } from "react";
import PropTypes from "prop-types";

const DeveloperSearch = ({ onSearch }) => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        onSearch(name.trim());
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter developer name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button type="submit">
                Search
            </button>
        </form>
    );
};

DeveloperSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default DeveloperSearch;