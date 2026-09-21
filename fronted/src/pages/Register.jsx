import AuthLayout from "../components/auth/AuthLayout";

function Register() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#171717]">Create a Account</h1>
        <p className="mt-2 text-gray-500">
          Start managing subscriptions with OneSub
        </p>
        <form className= "mt-8  space-y-5">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#171717]">Full Name </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 outline-none focus:border-[#6246E5]"
            />
          </div>
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#171717]">Email address</label>
            <input type="text" 
            placeholder="Enter your email" 
            className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 outline-none focus:border-[#6246E5]" />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#171717]">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 outline-none focus:border-[#6246E5]"
            />
          </div>
          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#171717]">
              Confirm password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 outline-none focus:border-[#6246E5]"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 h-4 w-4 accent-[#6246E5]"
            />

            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          {/* Create Account */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#6246E5] py-3 font-semibold text-white transition hover:bg-[#5138c9]"
          >
            Create Account
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-[#6246E5]"></a>
        </p>
      </div>
    </AuthLayout>
  );
}
export default Register;