"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-semibold mb-6">
        {verified ? "Email verified" : "Verifying email"}
      </h1>
      <h2 className="text-center hover:bg-gray-100 p-1 rounded">
        {token ? token : "No token"}
      </h2>
      {verified && (
        <Link href="/login" className="text-blue-500 hover:underline">
          Go to login
        </Link>
      )}
      {error && (
        <div>
          <h2 className="bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
