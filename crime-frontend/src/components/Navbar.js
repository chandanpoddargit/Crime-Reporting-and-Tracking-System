import { Link } from "react-router-dom";

const Navbar = () => {
  const isAuth = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="container">
        <h1>Crime Tracker</h1>
        <div className="links">
          <Link to="/">Home</Link>
          {isAuth ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/report">Report Crime</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
