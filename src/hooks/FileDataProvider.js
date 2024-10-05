// useFileData.js
import { useConfigContext } from '../contexts/ConfigContext'; // Import useConfigContext
import axios from 'axios';

/**
 * Custom hook for file operations.
 * @returns {object} - Contains methods to fetch and save files.
 */
export const useFileData = () => {
    const { restUrl } = useConfigContext(); // Access configuration directly

    /**
     * Fetch the Lua code file from the server.
     * @param {string} fileId - The identifier of the file to fetch.
     * @returns {Promise<string>} - The Lua code as a string.
     */
    const fetchFile = async (fileId) => {
        try {
            const response = await axios.get(`${restUrl}/api/files/${fileId}`);
            return response.data.code; // Assuming the server returns `{ code: "lua code" }`
        } catch (error) {
            console.error('Error fetching file:', error);
            throw error;
        }
    };

    /**
     * Save the Lua code file to the server.
     * @param {string} fileId - The identifier of the file to save.
     * @param {string} code - The Lua code to save.
     * @returns {Promise<void>}
     */
    const saveFile = async (fileId, code) => {
        try {
            await axios.post(`${restUrl}/api/files/${fileId}`, { code });
        } catch (error) {
            console.error('Error saving file:', error);
            throw error;
        }
    };

    return { fetchFile, saveFile };
};
