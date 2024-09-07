import axios from "axios";
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setAllData } from "../features/data";

const API_URL = "https://frontend-mentor-apis-6efy.onrender.com/countries";

const SearchAndFilter = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`${API_URL}?search=${e.target.value}`)
      .then((res) => dispatch(setAllData(res.data)))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleRegionFilter = useCallback(
    async (e) => {
      e.preventDefault();
      const selectedRegion = e.target.value;

      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        const data = res.data.data;

        const filteredData =
          selectedRegion === "all"
            ? data
            : data.filter((item) => item.region === selectedRegion);

        dispatch(setAllData({ data: filteredData }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1 w-full">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search for a country..."
            className="w-full md:w-3/12 p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          <span
            role="img"
            aria-label="Search"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
          >
            🔍
          </span>
        </div>
        {loading && (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        <div className="w-full md:w-auto">
          <select
            onChange={handleRegionFilter}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="all">Mintaqaga qarab filtrlash</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
