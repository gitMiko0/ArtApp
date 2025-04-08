import { useState, useEffect } from "react";
import { fetchData } from "../services/apiServices.js";

/*
    Mainly a helper for SortedList component--trying a different approach. 
    This handles states for fetches in order to simplify loading screens and error handling
    for the SortedList component, which is used in all views.
*/
const LoadingFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Loading state before fetch:", loading);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      console.log("Set loading to true!");

      // Check localStorage before fetching
      const cachedData = localStorage.getItem(endpoint);
      if (cachedData) {
        console.log("Using cached data for:", endpoint);
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await fetchData(endpoint);
        console.log("Fetched data:", response);

        // Store in localStorage
        localStorage.setItem(endpoint, JSON.stringify(response));

        setData(response);
      } catch (err) {
        console.log("Fetch error:", err);
        setError(err.message || "Something went wrong");
        setData([]);
      } finally {
        console.log("Setting loading to false");
        setLoading(false);
      }
    };

    loadData();
  }, [endpoint]);

  console.log("Returning from hook - loading:", loading);

  return { data, loading, error };
};

export default LoadingFetch;
