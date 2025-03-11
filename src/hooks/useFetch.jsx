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

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchData(endpoint);
        setData(response);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setData([]); // Ensure data is empty on error
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [endpoint]);

  return { data, loading, error };
};

export default LoadingFetch;
