"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputGroup from "../FormElements/InputGroup";

interface OTPProps {
  onVerify: (otp: string) => Promise<void>;
}

export default function OTPVerification({ onVerify }: OTPProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onVerify(otp); // ✅ Just call the function, no need pass userId
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-center text-lg font-medium mb-4">Enter OTP</h2>

      <form onSubmit={handleSubmit}>
        <InputGroup
          type="text"
          label="OTP"
          className="mb-5 [&_input]:py-[15px]"
          placeholder="Enter OTP"
          name="otp"
          handleChange={(e) => setOtp(e.target.value)}
          value={otp}
        />

        <button
          type="submit"
          className={`mt-4 w-full rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {error && <p className="mt-2 text-center text-sm text-red-500">{error}</p>}
      </form>
    </div>
  );
}
