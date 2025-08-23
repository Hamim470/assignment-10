import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const Update = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    // Pre-fill form with existing spot data
    const [formData, setFormData] = useState({
        tourists_spot_name: state?.spot?.tourists_spot_name || "",
        country_Name: state?.spot?.country_Name || "",
        location: state?.spot?.location || "",
        short_description: state?.spot?.short_description || "",
        average_cost: state?.spot?.average_cost || "",
        seasonality: state?.spot?.seasonality || "",
        travel_time: state?.spot?.travel_time || "",
        totalVisitorsPerYear: state?.spot?.totalVisitorsPerYear || "",
        image: state?.spot?.image || "",
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_BASE}/update_spot/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data)

            if (data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Tourist Spot Updated",
                    text: `${formData.tourists_spot_name} has been updated successfully!`,
                }); navigate("/my-list"); // redirect back to My List
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to Update",
                    text: "No changes detected!",
                });
            }
        } catch (err) {
            console.error("Error updating spot:", err);
            Swal.fire({
                icon: "error",
                title: "Failed to update",
                text: err.message || "Failed to update",
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Tourist Spot</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    name="tourists_spot_name"
                    value={formData.tourists_spot_name}
                    onChange={handleChange}
                    placeholder="Tourist Spot Name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                />
                <input
                    type="text"
                    name="country_Name"
                    value={formData.country_Name}
                    onChange={handleChange}
                    placeholder="Country Name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                />
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                />
                <textarea
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleChange}
                    placeholder="Short Description"
                    className="textarea textarea-bordered w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows="3"
                    required
                ></textarea>
                <input
                    type="number"
                    name="average_cost"
                    value={formData.average_cost}
                    onChange={handleChange}
                    placeholder="Average Cost"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                />
                <input
                    type="text"
                    name="seasonality"
                    value={formData.seasonality}
                    onChange={handleChange}
                    placeholder="Seasonality (e.g., Summer, Winter)"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                />
                <input
                    type="text"
                    name="travel_time"
                    value={formData.travel_time}
                    onChange={handleChange}
                    placeholder="Travel Time (e.g., 7 days)"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                />
                <input
                    type="number"
                    name="totalVisitorsPerYear"
                    value={formData.totalVisitorsPerYear}
                    onChange={handleChange}
                    placeholder="Total Visitors Per Year"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                />
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition"
                >
                    Update Spot
                </button>
            </form>
        </div>
    );
};

export default Update;
