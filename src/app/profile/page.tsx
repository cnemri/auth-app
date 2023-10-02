"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [data, setData] = useState("Nothing");
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

  const getUserDetails = async () => {
    axios.get("/api/users/me").then((response) => {
      console.log(response.data);
      setData(response.data.data._id);
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center">Profile</h1>
        <hr className="border-t border-gray-300 my-4" />
        <p className="text-center hover:bg-gray-100 p-1 rounded">
          Profile page
        </p>
        <h2
          className={`text-center hover:bg-gray-100 p-1 rounded ${
            data === "Nothing" ? "text-red-500" : "text-green-500"
          }`}
        >
          {data === "Nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>Go to profile</Link>
          )}
        </h2>
        <hr className="border-t border-gray-300 my-4" />
        <div className="flex flex-row justify-between">
          <button
            onClick={logout}
            className="mx-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
          >
            Logout
          </button>
          <button
            onClick={getUserDetails}
            className="mx-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
          >
            User details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
