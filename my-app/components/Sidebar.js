import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{ width: "200px", background: "#eee", height: "100vh" }}>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/users">Users</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;