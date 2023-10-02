import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center">Profile</h1>
        <hr className="border-t border-gray-300 my-4" />
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl mb-2">Profile page</p>
          <span className="p-1 rounded bg-blue-400 text-blue-50 text-center w-4/5">
            {params.id}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
