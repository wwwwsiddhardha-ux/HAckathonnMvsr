import React, { useState, useEffect } from "react";
import AuthPage       from "./pages/AuthPage";
import Home           from "./pages/Home";
import Results        from "./pages/Results";
import MarketDashboard from "./pages/MarketDashboard";

export default function App() {
  const [auth,   setAuth]   = useState(null);   // { token, role, name } | null = demo
  const [authed, setAuthed] = useState(false);  // has auth step been completed
  const [result, setResult] = useState(null);
  const [query,  setQuery]  = useState(null);

  // restore session on reload
  useEffect(() => {
    const token = localStorage.getItem("fc_token");
    const role  = localStorage.getItem("fc_role");
    const name  = localStorage.getItem("fc_name");
    if (token) { setAuth({ token, role, name }); setAuthed(true); }
  }, []);

  const handleAuth = (data) => {
    setAuth(data);   // null = demo mode
    setAuthed(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("fc_token");
    localStorage.removeItem("fc_role");
    localStorage.removeItem("fc_name");
    setAuth(null);
    setAuthed(false);
    setResult(null);
  };

  // Step 1 — Auth gate
  if (!authed) return <AuthPage onAuth={handleAuth} />;

  // Step 2 — Market role → upload dashboard
  if (auth?.role === "market") {
    return <MarketDashboard user={auth} onLogout={handleLogout} />;
  }

  // Step 3 — Results page
  if (result) {
    return (
      <Results
        result={result}
        query={query}
        onBack={() => setResult(null)}
      />
    );
  }

  // Step 4 — Home (farmer / demo)
  return (
    <Home
      user={auth}
      onLogout={handleLogout}
      onResult={(data, q) => { setResult(data); setQuery(q); }}
    />
  );
}
