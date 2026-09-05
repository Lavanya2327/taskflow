"use client";

import { useState } from "react";
import { supabaseBrowser } from "../lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = "/";
    }
  };

  const handleSignup = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabaseBrowser.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setMessage("Check your email to confirm your account");
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "8px",
          }}
        >
          TaskFlow
        </h1>

        <p
          style={{
            color: "#4b5563",
            marginBottom: "30px",
          }}
        >
          Login or create your account
        </p>

        {error && (
          <div
            style={{
              padding: "12px 16px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "10px",
              color: "#dc2626",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {message && (
          <div
            style={{
              padding: "12px 16px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "10px",
              color: "#16a34a",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontWeight: "600",
            }}
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "16px",
              color: "#1f2937",
              boxSizing: "border-box",
            }}
          />

          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontWeight: "600",
            }}
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "25px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "16px",
              color: "#1f2937",
              boxSizing: "border-box",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                flex: 1,
                padding: "14px",
                background: loading ? "#6b7280" : "#111827",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "600",
              }}
            >
              {loading ? "Please wait..." : "Login"}
            </button>

            <button
              onClick={handleSignup}
              disabled={loading}
              style={{
                flex: 1,
                padding: "14px",
                background: loading ? "#d1d5db" : "#e5e7eb",
                color: "#1f2937",
                border: "none",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "600",
              }}
            >
              {loading ? "Please wait..." : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
