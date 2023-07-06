"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    userName: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/user/signup", user);
      console.log("sign up success", res.data);

      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
      console.log("sign up failed ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.userName.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div
      className="flex flex-col items-center 
    justify-center min-h-screen py-2 "
    >
      <h1> {loading ? "processing" : "SignUp"}</h1>

      <label htmlFor="userName">userName</label>
      <input
        className="py-2 px-4 rounded border-2 border-gray-300"
        id="userName"
        type="text"
        value={user.userName}
        onChange={(e) => setUser({ ...user, userName: e.target.value })}
        placeholder="Enter your userName"
      />

      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="py-2 px-4 
      
        rounded border-2 border-gray-300"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />

      <label htmlFor="password">password</label>
      <input
        className="py-2 px-4 
        rounded border-2 border-gray-300"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
      />
      <button
        className="py-2 px-4
        rounded border-2 border-gray-300"
        onClick={onSignup}
      >
        {buttonDisabled ? "not Sign up" : "Sign up"}
      </button>
      <Link
        href="/login"
        className=" py-2 px-9
         my-2
        rounded border-2 border-gray-300"
      >
        Login
      </Link>
    </div>
  );
}
