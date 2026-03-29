import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo3.png";
import { LogIn } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with real auth call
    if (email && password) {
      // pretend login success
      navigate("/admin", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E5E7EB] to-[#99A1AF]">
      <div className="w-full max-w-lg py-24 px-8">
        <div className="bg-[#201f1f] border border-[#333] rounded-md p-8 shadow-sm">
          <div className="flex-col justify-center gap-3 mb-9">
            <img src={logo} alt="logo" className="w-48 h-24 mx-auto" />
            <h1 className="text-white font-medium text-4xl tracking-widest text-center">
              Welcome Back
            </h1>
            <p className="text-white text-lg font-normal text-center">
              Sign in to your admin account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-1">
            <div>
              <label className="text-xs text-white">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-2 w-full bg-transparent border border-[#3a3a3a] rounded-xl px-3 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="text-xs text-white">Password</label>
              <div className="relative mt-2">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="●●●●●●"
                  className="w-full bg-transparent border border-[#3a3a3a] rounded-xl px-3 py-2 text-white placeholder-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 "
                  aria-label="Toggle password visibility"
                >
                  <span className="text-white">
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2 cursor-pointer select-none" onClick={() => setRememberMe(!rememberMe)}>
              <div className={`w-5 h-5 flex items-center justify-center rounded-[4px] border transition-all duration-200 ${rememberMe ? 'bg-white border-white' : 'border-gray-500'}`}>
                {rememberMe && (
                  <svg className="w-3.5 h-3.5 text-[#201f1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-white text-base font-normal leading-6">
                Remember me
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-b from-gray-200 to-gray-400 text-black rounded-xl py-3 font-semibold text-lg hover:from-white hover:to-gray-300 transition-all duration-200"
              >
                <LogIn size={22} /> Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
