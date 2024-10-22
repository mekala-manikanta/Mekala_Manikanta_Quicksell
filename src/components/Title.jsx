import React from "react";
import "./styles/Title.css";
import plusIcon from "../icons/add.svg";
import ellipsisIcon from "../icons/dots.svg";

const priorityLabels = {
  0: "No-priority",
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
};

function Title({ title, grouping, count, available = true }) {
  const getStatusIcon = () => {
    try {
      // Handle special cases for status
      if (title === "In progress") {
        return require("../icons/progress.svg").default;
      } else if (title === "Backlog") {
        return require("../icons/Backlog.svg").default;
      } else if (title === "Todo") {
        return require("../icons/Todo.svg").default;
      } else if (title === "Done") {
        return require("../icons/Done.svg").default;
      } else if (title === "Cancelled") {
        return require("../icons/Cancelled.svg").default;
      }
      // Default case
      return require(`../icons/${title}.svg`).default;
    } catch (error) {
      console.error(`Error loading status icon for "${title}":`, error);
      return null;
    }
  };

  const getPriorityIcon = () => {
    try {
      // Determine which priority icon to display based on the title
      if (title.includes("Urgent")) {
        return require("../icons/Urgent.svg").default;
      } else if (title.includes("High")) {
        return require("../icons/High.svg").default;
      } else if (title.includes("Medium")) {
        return require("../icons/Medium.svg").default;
      } else if (title.includes("Low")) {
        return require("../icons/Low.svg").default;
      } else {
        return require("../icons/No-priority.svg").default; // Default case for no priority
      }
    } catch (error) {
      console.error(`Error loading priority icon for title "${title}":`, error);
      return null;
    }
  };

  const renderIcon = () => {
    if (grouping === "user") {
      return (
        <div className="card-user">
          <div className="card-user-icon">
            {title
              .split(" ")
              .map((n) => n[0].toUpperCase())
              .join("")}
          </div>
          <div className={available ? "active-user" : "inactive-user"}></div>
        </div>
      );
    } else if (grouping === "status") {
      const statusIcon = getStatusIcon();
      return statusIcon ? <img src={statusIcon} alt={title} /> : null;
    } else if (grouping === "priority") {
      const priorityIcon = getPriorityIcon();
      return priorityIcon ? (
        <img src={priorityIcon} alt={`Priority for ${title}`} />
      ) : null;
    }
    return null;
  };

  return (
    <div className="card-title">
      <div className="card-title-left">
        {renderIcon()}
        <span className="group-title">{title}</span>
        <span className="group-count">{count}</span>
      </div>
      {count > 0 && (
        <div className="card-title-right">
          <button className="card-title-right-btn">
            <img src={plusIcon} alt="Add" />
          </button>
          <button className="card-title-right-btn">
            <img src={ellipsisIcon} alt="More" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Title;
