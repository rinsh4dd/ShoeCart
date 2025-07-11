import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { FaUser, FaEnvelope, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://shoecart-4ug1.onrender.com/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load users. Please try again.");
        toast.error("Unable to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) return <ErrorFallbackUsers message={error} />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Toaster />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">User Management</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <FaUser className="inline mr-2" />Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <FaEnvelope className="inline mr-2" />Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <FaUserShield className="inline mr-2" />Role
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-sm">No users available.</div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
