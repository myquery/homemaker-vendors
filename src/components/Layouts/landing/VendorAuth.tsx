"use client";

import { usePathname } from "next/navigation";
import Signin from "@/components/Auth/Signin";
import Signup from "@/components/Auth/Signup"; // Import Signup component
import Image from "next/image";
import Link from "next/link";

export default function VendorAuth() {
  const pathname = usePathname();

  const isSignUpPage = pathname === "/auth/sign-up"; // Check current route

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              {isSignUpPage ? <Signup /> : <Signin />} {/* Toggle based on path */}
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <Link className="mb-10 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/homemaker_logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/homemaker_logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>

              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                {isSignUpPage ? "Create your account" : "Sign in to your account"}
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                {isSignUpPage ? "Join Us Today!" : "Welcome Back!"}
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                {isSignUpPage
                  ? "Sign up to access all features."
                  : "Please sign in to your account by completing the necessary fields below"}
              </p>

              <div className="mt-31">
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt="Illustration"
                  width={405}
                  height={325}
                  className="mx-auto dark:opacity-30"
                />
              </div>

              {/* Toggle between Signin and Signup links */}
              <div className="mt-4 text-center">
                {isSignUpPage ? (
                  <Link href="/auth/signin" className="text-primary">
                    Already have an account? Sign In
                  </Link>
                ) : (
                  <Link href="/auth/sign-up" className="text-primary">
                    Don't have an account? Sign Up
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
