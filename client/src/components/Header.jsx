import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-700 py-4">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold tracking-wide"
        >
          EventPlatform
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-lg font-semibold">

          <Link to="/" className="hover:text-slate-300">
            Home
          </Link>

          <Link to="/events" className="hover:text-slate-300">
            Events
          </Link>

          <Link to="/register" className="hover:text-slate-300">
                Register
              </Link>

          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-slate-300">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-slate-300">
                Login
              </Link>
              
            </>
          )}
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className="w-5 h-0.5 bg-white"></span>
          <span className="w-5 h-0.5 bg-white"></span>
          <span className="w-5 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700">
          <nav className="flex flex-col px-4 py-3 space-y-3 text-sm">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-slate-300"
            >
              Home
            </Link>
            <Link
              to="/events"
              onClick={() => setMenuOpen(false)}
              className="hover:text-slate-300"
            >
              Events
            </Link>

            {token ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-slate-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-slate-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-slate-300"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

