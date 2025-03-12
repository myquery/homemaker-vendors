"use client";
import { useVerifyOTPMutation, useLoginUserMutation } from "@/redux/apiSlice"; 
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import OTPVerification from "./OTPVerification";

interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}
interface SigninWithPasswordProps {
  showOTP: boolean;
  setShowOTP: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SigninWithPassword({showOTP, setShowOTP}: SigninWithPasswordProps) {
  const [data, setData] = useState<LoginData>({ email: "", password: "", remember: false });

  const [otp, setOtp] = useState("");/*  */
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [verifyOTP] = useVerifyOTPMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId); // ✅ Get userId from Redux

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email: data.email, password: data.password }).unwrap();
      
      if (response?.data.userId) {
        dispatch(setUserId({ userId: response?.data.userId, token: response?.data.token }));
        localStorage.setItem("authToken", response?.data.token);

      }

      setShowOTP(true);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      const response = await verifyOTP({ otp, userId }).unwrap(); // ✅ Fetch userId from Redux

      if ( response?.data.token) {
        localStorage.setItem("authToken", response?.data.token);
        window.dispatchEvent(new Event("storage"));
        router.push("/dashboard"); 
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
    }
  };

  return (
    <div>
      {!showOTP ? (
        <form onSubmit={handleSubmit}>
          <InputGroup
            type="email"
            label="Email"
            className="mb-4 [&_input]:py-[15px]"
            placeholder="Enter your email"
            name="email"
            handleChange={handleChange}
            value={data.email}
            icon={<EmailIcon />}
          />

          <InputGroup
            type="password"
            label="Password"
            className="mb-5 [&_input]:py-[15px]"
            placeholder="Enter your password"
            name="password"
            handleChange={handleChange}
            value={data.password}
            icon={<PasswordIcon />}
          />

          <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
            <Checkbox
              label="Remember me"
              name="remember"
              withIcon="check"
              minimal
              radius="md"
              onChange={handleChange}
              checked={data.remember}
            />

            <Link
              href="/auth/forgot-password"
              className="hover:text-primary dark:text-white dark:hover:text-primary"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <p className="text-red-500">
              {"data" in error ? (error.data as { message?: string })?.message || "Login failed" : "An error occurred"}
            </p>
          )}

          <div className="mb-4.5">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
              disabled={isLoading}
            >
              Sign In
              {isLoading && (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
              )}
            </button>
          </div>
        </form>
      ) : (
        <OTPVerification onVerify={handleVerifyOTP} userId={userId}/> // ✅ Pass function instead of manually handling userId
      )}
    </div>
  );
}
