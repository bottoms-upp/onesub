import AuthLayout from "../components/auth/AuthLayout";

function Login() {
    return(
        <AuthLayout>
            <div className="w-full max-w-md">
                {/* Heading */}
                <h1 className="text-3xl font-bold text-[#171717]">Welcome Back</h1>

                <p className="mt-2 ">Login to your OneSub account</p>
                <form className="mt-8 space-y-5">
                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-medium- text-[#171717]">
                            Email address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 outline-none focus:border-[#6246E5]"
                        />
                    </div>
                    {/* password */}
                    <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-[#171717]">
                            Password
                        </label>
                        <a href="#" className="text-sm font-medium text-[#6246E5]">Forget Password?</a>
                    </div>
                      {/* Remember me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 accent-[#6246E5]"
            />

            <label
              htmlFor="remember"
              className="text-sm text-gray-600"
            >
              Remember me
            </label>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#6246E5] py-3 font-semibold text-white transition hover:bg-[#5138c9]"
          >
            Login
          </button>
                </form>
                  {/* Register link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-[#6246E5]"
          >
            Sign up
          </a>
        </p>

      </div>
    </AuthLayout>
  );
}

export default Login;
                
          