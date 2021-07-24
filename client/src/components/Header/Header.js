import React from "react";
import { FaGithub } from "react-icons/fa";

function Header() {
  return (
    <div className="mb-4">
      <div className="heading">Average Subject Grades Unimelb </div>
      <div className="github">
        <a
          href="https://github.com/zinader/WamBooster-WinterHack"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
}

export default Header;
