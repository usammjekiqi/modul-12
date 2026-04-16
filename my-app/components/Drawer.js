import { useState } from "react";

function Drawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>☰</button>
      {open && (
        <div style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "200px",
          height: "100%",
          background: "#444",
          color: "white"
        }}>
          <p onClick={() => setOpen(false)}>Close</p>
          <p>Menu Item</p>
        </div>
      )}
    </>
  );
}

export default Drawer;