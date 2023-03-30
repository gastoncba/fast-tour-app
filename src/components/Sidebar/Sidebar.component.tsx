// import React, { useState } from "react";
// import "./Sidebar.css";

// interface SidebarProps {
//   children: React.ReactNode;
// }

// export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleMouseEnter = () => {
//     setIsExpanded(true);
//   };

//   const handleMouseLeave = () => {
//     setIsExpanded(false);
//   };

//   return (
//     <div
//       className={`sidebar ${isExpanded ? "expanded" : ""}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div className="sidebar-content">{children}</div>
//     </div>
//   );
// };
import React, { useState, useRef } from 'react';
import './Sidebar.css'

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  return (
    <div
      className={`sidebar ${isMouseOver ? 'open' : 'closed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={sidebarRef}
    >
      {children}
    </div>
  );
};