// src/pages/AllTouristSpots.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import planeAnimation from "../assets/lottie/travel-plane.json"; // same lottie as home page
import { FaMoneyBillWave, FaClock, FaUmbrellaBeach } from "react-icons/fa";

const AllTouristSpots = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // '' | 'asc' | 'desc'

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Fetch all tourist spots
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetch(`${API_BASE}/all_tourist_spots`)
      .then((res) => res.json())
      .then((data) => {
        if (ignore) return;
        setSpots(data || []);
        setError("");
      })
      .catch((err) => setError(err.message || "Failed to fetch spots"))
      .finally(() => setLoading(false));
    return () => (ignore = true);
  }, [API_BASE]);

  // Sort spots
  const sortedSpots = [...spots].sort((a, b) => {
    if (!sortOrder) return 0;
    return sortOrder === "asc"
      ? a.average_cost - b.average_cost
      : b.average_cost - a.average_cost;
  });

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">All Tourist Spots</h1>

      {/* Sort dropdown */}
      <div className="flex justify-end mb-6">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded-lg p-2 dark:bg-gray-900 dark:text-white"
        >
          <option value="">Sort by Average Cost</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-40 h-40">
            <Lottie animationData={planeAnimation} loop />
          </div>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Loading tourist spots…</p>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Spot Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSpots.map((spot) => (
            <div
              key={spot._id}
              className="group rounded-2xl overflow-hidden shadow hover:shadow-lg bg-white dark:bg-gray-900 border dark:border-gray-800"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={spot.image}
                  alt={spot.tourists_spot_name}
                  className="h-full w-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{spot.tourists_spot_name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {spot.location} • {spot.country_Name}
                </p>

                <div className="flex flex-wrap gap-3 text-sm mt-2">
                  <span className="inline-flex items-center gap-1">
                    <FaMoneyBillWave /> ${spot.average_cost}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FaClock /> {spot.travel_time}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FaUmbrellaBeach /> {spot.seasonality}
                  </span>
                </div>

                <p className="text-sm mt-2">Visitors per year: {spot.totalVisitorsPerYear}</p>

                <div className="pt-3">
                  <Link
                    to={`/spots/${spot._id}`}
                    className="inline-block px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No data */}
      {!loading && !error && spots.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
          No tourist spots available yet.
        </p>
      )}
    </div>
  );
};

export default AllTouristSpots;
