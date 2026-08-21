import { login, signup } from "./actions";

export default function LoginPage() {
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

        <form>
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
              formAction={login}
              style={{
                flex: 1,
                padding: "14px",
                background: "#111827",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Login
            </button>

            <button
              formAction={signup}
              style={{
                flex: 1,
                padding: "14px",
                background: "#e5e7eb",
                color: "#1f2937",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
