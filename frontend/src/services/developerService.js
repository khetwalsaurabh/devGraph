import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getDeveloperDetails = async (name) => {
    const response = await axios.get(
        `${API_URL}/developers/${name}`
    );

    return response.data;
};