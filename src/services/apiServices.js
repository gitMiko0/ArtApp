const API_URL = "https://nodea1.onrender.com/api";
const API_URL_V2 = "https://elysiana-backend.up.railway.app/api";

/**
 * Generic function to fetch data from a given endpoint.
 * @param {string} route - The API route to fetch (e.g., "artists", "paintings/artist/123").
 * @returns {Promise<any>} - Returns the fetched data.
 */
export const fetchData = async (route) => {
  try {
    const response = await fetch(`${API_URL_V2}/${route}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array on error to prevent crashes
  }
};

