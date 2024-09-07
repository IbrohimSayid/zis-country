import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { setAllData } from "../features/data";

const MamlakatKartasi = ({ mamlakat }) => (
  <Link
    to={`/info/${mamlakat.name.slug}`}
    className="w-full max-w-xs rounded-lg shadow-md overflow-hidden hover:scale-105 transition mx-auto"
  >
    <img
      src={mamlakat.flags.png}
      alt={mamlakat.flags.alt || `${mamlakat.name.common} bayrog'i`}
      className="w-full h-40 object-cover"
    />
    <div className="p-6">
      <h2 className="text-lg font-bold mb-2">{mamlakat.name.common}</h2>
      <p className="text-sm mb-1">
        <strong>Aholi:</strong> {mamlakat.population.toLocaleString()}
      </p>
      <p className="text-sm mb-1">
        <strong>Mintaqa:</strong> {mamlakat.region}
      </p>
      <p className="text-sm">
        <strong>Poytaxt:</strong> {mamlakat.capital?.[0] || "Ma'lum emas"}
      </p>
    </div>
  </Link>
);

const Asosiy = () => {
  const dispatch = useDispatch();
  const { allData } = useSelector((store) => store.data);
  const { data, loading } = useFetchData("/countries");

  useEffect(() => {
    if (data) dispatch(setAllData(data));
  }, [data, dispatch]);

  return (
    <div className="max-w-screen-xl mx-auto px-5 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {allData?.data?.map((mamlakat, index) => (
          <MamlakatKartasi key={index} mamlakat={mamlakat} />
        ))}
      </div>
      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default Asosiy;
