// src/pages/AddTouristSpot.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddTouristSpot = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image: "",
    tourists_spot_name: "",
    country_Name: "",
    location: "",
    short_description: "",
    average_cost: "",
    seasonality: "",
    travel_time: "",
    totalVisitorsPerYear: "",
  });

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add user info
    const dataToSend = {
      ...formData,
      userEmail: user?.email,
      userName: user?.displayName || "Anonymous",
    };

    fetch(`${API_BASE}/add_tourist_spot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
          Swal.fire({
          icon: "success",
          title: "Tourist Spot Added",
          text: `${formData.tourists_spot_name} has been added successfully!`,
        });
        // Reset form
        setFormData({
          image: "",
          tourists_spot_name: "",
          country_Name: "",
          location: "",
          short_description: "",
          average_cost: "",
          seasonality: "",
          travel_time: "",
          totalVisitorsPerYear: "",
        });
        navigate("/my-list"); // optional: navigate to user's list
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed to Add",
          text: err.message || "Something went wrong!",
        });
      });
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Add Tourist Spot</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow space-y-4"
      >
        {/* Image URL */}
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Spot Name */}
        <input
          type="text"
          name="tourists_spot_name"
          placeholder="Tourist Spot Name"
          value={formData.tourists_spot_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Country Name */}
        <input
          type="text"
          name="country_Name"
          placeholder="Country Name"
          value={formData.country_Name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Short Description */}
        <textarea
          name="short_description"
          placeholder="Short Description"
          value={formData.short_description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Average Cost */}
        <input
          type="number"
          name="average_cost"
          placeholder="Average Cost ($)"
          value={formData.average_cost}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Seasonality */}
        <input
          type="text"
          name="seasonality"
          placeholder="Seasonality (Summer/Winter)"
          value={formData.seasonality}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Travel Time */}
        <input
          type="text"
          name="travel_time"
          placeholder="Travel Time (e.g., 7 days)"
          value={formData.travel_time}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Total Visitors */}
        <input
          type="number"
          name="totalVisitorsPerYear"
          placeholder="Total Visitors per Year"
          value={formData.totalVisitorsPerYear}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition"
        >
          Add Tourist Spot
        </button>
      </form>
    </div>
  );
};

export default AddTouristSpot;
