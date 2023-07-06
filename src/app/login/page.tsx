"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [butttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else setButtonDisabled(true);
  }, [user]);

  const onLogin = async () => {
    var res;
    try {
      setLoading(true);

      res = await axios.post("/api/user/login", user);
      console.log("loginsuccess", res.data);

      router.push("/profile");
    } catch (err: any) {
      toast.error(err.message);
      console.log("sign up failed ", res);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="flex flex-col items-center 
    justify-center min-h-screen py-2 "
    >
      <div className="m-5">
        <h1> {loading ? "processing" : "Login"}</h1>
      </div>

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
        onClick={onLogin}
      >
        {butttonDisabled ? "notLogin" : "Login here"}
      </button>
      <Link
        className=" py-2 px-3
         my-2
        rounded border-2 border-gray-300
        "
        href="/signup"
      >
        singup page
      </Link>
    </div>
  );
}
