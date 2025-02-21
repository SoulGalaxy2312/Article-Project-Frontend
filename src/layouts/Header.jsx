const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand fw-bold text-dark" href="#" style={{ fontFamily: "Arial, sans-serif", fontSize: "24px" }}>
          TechNews
        </a>
        
        {/* Search Bar */}
        <form className="d-flex mx-auto" role="search" style={{ width: "50%" }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        
        {/* Login Button */}
        <button className="btn btn-primary">Log In</button>
      </div>
    </nav>
  );
};

export default Header;
