"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      const res = await axios.get("/api/user/logout");
      console.log("logout", res.data);
      router.push("/login");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };
  const getUserDetails = async () => {
    const res = await axios.get("/api/user/me");
    console.log("user details", res.data);
    setData(res.data.data._id);
  };
  return (
    <div
      className="flex flex-co items-center justify-center
    min-h-screen py-2
    bg-gray-50
    text-gray-80
        "
    >
      <hr />

      <h1>Profile Page </h1>
      <h2>
        {data === "nothing" ? (
          "Nothing "
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700
    text-white    font-bold    py-2 px-4 rounded      
      "
        onClick={logout}
      >
        LogOut
      </button>
      <button
        className="bg-green-500 hover:bg-blue-700
    text-white    font-bold    py-2 px-4 rounded      
      "
        onClick={getUserDetails}
      >
        getUserDetails
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700
    text-white    font-bold    py-2 px-4 rounded      
      "
        onClick={logout}
      >
        LogOut
      </button>
    </div>
  );
}
