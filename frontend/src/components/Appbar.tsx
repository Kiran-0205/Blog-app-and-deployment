import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const AppBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleSignOut() {
    localStorage.removeItem("token");
    window.location.href = "/signin"; // redirect after logout
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}

          <Link to="/blogs" className="text-2xl font-bold text-gray-900">
            Scribble
          {/* cribble */}
        </Link>

        

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-6 text-gray-600 text-sm font-medium">
          <Link to="/blogs" className="hover:text-gray-900">
            Home
          </Link>
          <Link to="/publish" className="hover:text-gray-900">
            Write
          </Link>
        </div>

        {/* Profile Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white font-semibold cursor-pointer"
          >
            K
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
