"use client";

import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const handleResetPassword = async (e: any) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      await axios.post("/api/users/resetpwd", { email });
      setSuccess(true);
      setError(false);
    } catch (error: any) {
      console.log(error);
      //   toast.error(error.message, {
      //     position: "top-center",
      //   });
      setError(true);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>
        <form onSubmit={handleResetPassword}>
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="jdoe@example.com"
            required
          />
          <button
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mt-4`}
          >
            Reset Password
          </button>
          {success && (
            <p className="text-green-500 mt-4 bg-green-50 rounded-lg text-center">
              If an account with that email exists, we sent you an email with
              instructions on how to reset your password.
            </p>
          )}
          {error && (
            <p className="text-red-500 mt-4 bg-red-50 rounded-lg text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
        <button
          onClick={handleBack}
          className="text-blue-500 hover:underline mt-4 block text-center"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}
