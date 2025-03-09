"use client";

import { useState } from "react";
import Link from "next/link";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";
import { useLoginUserMutation } from "@/redux/apiSlice"; 

export default function Signin() {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [showOTP, setShowOTP] = useState(false);

  return (
    <>
      {!showOTP && <GoogleSigninButton text="Sign in" />}

     {!showOTP && <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Or sign in with email
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div> } 

      <div>
        <SigninWithPassword showOTP={showOTP} setShowOTP={setShowOTP} />
      </div>

      <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/auth/sign-up" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
