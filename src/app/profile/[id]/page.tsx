"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const UserProfile = ({ params }: any) => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center">Profile</h1>
        <hr className="border-t border-gray-300 my-4" />
        <div className="flex flex-col justify-center items-center mb-4">
          <p className="text-xl mb-2">Profile page</p>
          <span className="p-1 rounded-full bg-blue-400 text-blue-50 text-center w-4/5">
            {params.id}
          </span>
        </div>
        <button
          onClick={logout}
          className="mx-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
