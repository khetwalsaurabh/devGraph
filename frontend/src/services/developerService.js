import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getDeveloperDetails = async (name) => {
    const response = await axios.get(
        `${API_URL}/developers/${name}`
    );

    return response.data;
};