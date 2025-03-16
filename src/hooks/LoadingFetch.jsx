import { useState, useEffect } from "react";
import { fetchData } from "../services/apiServices.js";

/*
    Handle states for fetches in order to simplify loading screens and error handling
    for the SortedList component, which is used in all views.
*/
const LoadingFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Loading state before fetch:", loading); // Log before fetching

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      console.log("Set loading to true!");

      try {
        const response = await fetchData(endpoint);
        console.log("Fetched data:", response);
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

  console.log("Returning from hook - loading:", loading); // Log after fetch

  return { data, loading, error };
};


export default LoadingFetch;
