import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider"; // assuming you are using context for user auth
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyList = () => {
    const { user } = useContext(AuthContext); // get current logged in user
    const [mySpots, setMySpots] = useState([]);
    const navigate = useNavigate();

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    // Fetch user's added tourist spots
    useEffect(() => {
        if (user?.email) {
            fetch(`${API_BASE}/myspots/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setMySpots(data);
                    console.log(data)
                })
                .catch((err) => console.error("Error fetching my spots:", err));
        }
    }, [user]);

    // Delete handler
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`${API_BASE}/delete_data/${id}`, {
                    method: "DELETE",
                });
                const data = await res.json();
                if (data.deletedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Tourist spot has been deleted.',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    setMySpots(mySpots.filter((spot) => spot._id !== id));
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops!',
                        text: 'Spot could not be deleted.',
                    });
                }
            } catch (err) {
                console.error("Error deleting spot:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Something went wrong while deleting.',
                });
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Tourist Spots</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3">Spot Name</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Average Cost</th>
                            <th className="p-3">Seasonality</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mySpots.map((spot) => (
                            <tr key={spot._id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{spot.tourists_spot_name}</td>
                                <td className="p-3">{spot.location}</td>
                                <td className="p-3">${spot.average_cost}</td>
                                <td className="p-3">{spot.seasonality}</td>
                                <td className="p-3 space-x-2">
                                    <button
                                        onClick={() => navigate(`/update/${spot._id}`, { state: { spot } })}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(spot._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {mySpots.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center p-5 text-gray-500">
                                    No tourist spots added yet!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyList;
