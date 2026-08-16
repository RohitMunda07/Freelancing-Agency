import React, { useState } from "react";
import { LogIn, Loader2 } from "lucide-react";
import { loginUser } from "../../lib/api.js";
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button.jsx";
import { useAuth } from "../../context/authContex.jsx";


const inputClass =
  "font-body text-sm text-offwhite bg-surfaceAlt border border-borderLight rounded-lg px-3.5 py-2.5 outline-none focus:border-teal transition-colors w-full";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(null)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guards against a double-submit regardless of whether the button is
    // visually disabled — e.g. a fast double-click or pressing Enter twice.
    if (loading) return;

    if (!email.trim() || !password) {
      setError("Enter your email or phone, and your password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { user } = await loginUser({ email, password });
      console.log(user);
      login(user)
      navigate("/dashboard")

    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-surface border border-border rounded-2xl p-8">
        <div className="font-display font-bold text-lg text-offwhite mb-1">
          <span className="text-teal">{"<"}</span>Stackform<span className="text-teal">{"/>"}</span>
        </div>
        <div className="font-body text-[13px] text-muted mb-6">
          Client Portal — sign in to view your project
        </div>

        {/* onSubmit on the form (not onClick on the button) so pressing Enter
            in either field submits too, without needing to wire that up separately */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className={inputClass}
            placeholder="Email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            disabled={loading}
          />
          <input
            className={inputClass}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={loading}
          />

          {error && (
            <div className="font-body text-xs text-danger bg-danger/10 border border-danger/30 rounded-lg px-3 py-2.5">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 font-display font-bold text-sm px-5 py-2.5 rounded-full bg-teal text-ink border-2 border-ink shadow-retro transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-retro-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:pointer-events-none mt-1"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <LogIn size={16} />
              </>
            )}
          </Button>
        </form>

        <button
          onClick={() => navigate('/')}
          disabled={loading}
          type="button"
          className="text-muted font-body text-sm mt-5 disabled:opacity-50"
        >
          ← Back to site
        </button>
      </div>
    </div>
  );
}