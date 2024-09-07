import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const API_URL = "https://frontend-mentor-apis-6efy.onrender.com/countries";

const CountryInfo = () => {
  const { slug } = useParams();
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${slug}`);
        setCountryData(response.data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountryData();
  }, [slug]);

  if (!countryData) {
    return (
      <>
        <Header />
        <div className="flex justify-center mt-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </>
    );
  }

  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    cioc,
    currencies,
    languages,
    borders,
  } = countryData;

  return (
    <>
      <Header />
      <div className="flex flex-col p-6 min-h-screen items-center">
        <div className="w-full max-w-4xl mb-6">
          <Link
            to="/"
            className="bg-white py-2 px-4 rounded-md bg-gray-700"
          >
            Orqaga
          </Link>
        </div>

        <div className="flex flex-col md:flex-row shadow-md p-6 rounded-lg w-full max-w-5xl h-auto md:h-96 items-center">
          <div className="mb-6 md:mb-0 md:mr-8">
            <img
              src={flags.svg}
              alt={`${name.common} Flag`}
              className="w-full h-48 object-cover rounded-lg shadow-sm"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{name.common}</h1>
            <ul className="text-base space-y-2 flex flex-col md:flex-row justify-between">
              <div className="left">
                <InfoItem label="Native Name" value={name.nativeName} />
                <InfoItem
                  label="Population"
                  value={population.toLocaleString("en-US")}
                />
                <InfoItem label="Region" value={region} />
                <InfoItem label="Sub Region" value={subregion} />
                <InfoItem label="Capital" value={capital} />
              </div>
              <div className="right">
                <InfoItem label="Top Level Domain" value={cioc} />
                <InfoItem label="Currencies" value={currencies} />
                <InfoItem label="Languages" value={languages.join(", ")} />
              </div>
            </ul>

            <div className="mt-6">
              <strong>Border Countries:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {borders.map((border) => (
                  <Link
                    key={border._id}
                    to={`/info/${border.slug}`}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm shadow-sm"
                  >
                    {border.common}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InfoItem = ({ label, value }) => (
  <li>
    <strong>{label}:</strong> {value}
  </li>
);

export default CountryInfo;
