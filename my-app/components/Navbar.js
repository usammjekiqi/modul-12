import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ background: "#333", color: "#fff", padding: "10px" }}>
      <h2>My App</h2>
      <Link to="/" style={{ color: "white", marginRight: 10 }}>Home</Link>
      <Link to="/about" style={{ color: "white" }}>About</Link>
    </div>
  );
}

export default Navbar;