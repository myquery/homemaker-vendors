import { useState } from "react";
import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useRegisterUserMutation } from "@/redux/apiSlice"; // Import API slice

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [registerUser, { isLoading, error }] = useRegisterUserMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await registerUser(formData).unwrap();
            console.log("User registered:", response);
            // Redirect or show success message
        } catch (err) {
            console.error("Registration error:", err);
        }
    };

    return (
        <ShowcaseSection title="Sign Up Form" className="!p-6.5">
            <form onSubmit={handleSubmit}>
                {/* Select Role Dropdown */}
                {typeof window !== "undefined" && (
                    <div className="mb-4.5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                            Select Role
                        </label>
                        <div className="relative">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                required
                            >
                                <option value="">Choose a role</option>
                                <option value="customer">Customer</option>
                                <option value="merchant">Merchant</option>
                                <option value="brands">Brands</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400">
                                ▼
                            </div>
                        </div>
                    </div>
                )}

                {/* Email Input */}
                <InputGroup
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    handleChange={handleChange}
                    placeholder="Enter email address"
                    className="mb-4.5"
                    required
                />

                {/* Phone Input */}
                <InputGroup
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    handleChange={handleChange}
                    placeholder="Enter Phone number"
                    className="mb-4.5"
                    required
                />

                {/* Password Input */}
                <InputGroup
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    handleChange={handleChange}
                    placeholder="Enter password"
                    className="mb-4.5"
                    required
                />

                {/* Confirm Password Input */}
                <InputGroup
                    label="Re-type Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    handleChange={handleChange}
                    placeholder="Re-type password"
                    className="mb-5.5"
                    required
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                </button>

                {/* Display Error */}
                {error && <p className="text-red-500 mt-2">{(error as any).data?.message || "Registration failed"}</p>}

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                    <p>
                        Already have an account?{" "}
                        <Link href="/auth/sign-in" className="text-primary">
                            Sign In
                        </Link>
                    </p>
                </div>
            </form>
        </ShowcaseSection>
    );
}
