import React from "react";
import Tag from "./Tag";
import "./styles/Card.css";

// Define a mapping for status icons
const statusIcons = {
  Todo: require("../icons/Todo.svg").default,
  "In progress": require("../icons/progress.svg").default,
  Done: require("../icons/Done.svg").default,
  Backlog: require("../icons/Backlog.svg").default,
  Cancelled: require("../icons/Cancelled.svg").default,
};

// Define a mapping for priority icons
const priorityLabels = {
  0: "No-priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

const priorityIcons = {
  "No-priority": require("../icons/No-priority.svg").default,
  Urgent: require("../icons/Urgent.svg").default,
  High: require("../icons/High.svg").default,
  Medium: require("../icons/Medium.svg").default,
  Low: require("../icons/Low.svg").default,
};

const Card = ({ ticket, grouping, user }) => {
  // Get the corresponding priority label based on ticket.priority
  const priorityLabel = priorityLabels[ticket.priority] || "No-priority";

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-id">{ticket.id}</div>
        {grouping === "user" ? null : (
          <div className="card-user">
            <div className="card-user-icon">
              {user.name
                .split(" ")
                .map((n) => n[0].toUpperCase())
                .join("")}
            </div>
            <div
              className={user.available ? "active-user" : "inactive-user"}
            ></div>
          </div>
        )}
      </div>
      <div className="card-body">
        {grouping === "status" ? null : (
          // Use the mapping to get the correct status icon
          <img src={statusIcons[ticket.status]} alt={ticket.status} />
        )}
        <span>{ticket.title}</span>
      </div>
      <div className="card-footer">
        {grouping === "priority" ? null : (
          <div className="card-footer-priority">
            {/* Use the priority label to get the correct icon */}
            <img
              src={priorityIcons[priorityLabel]}
              alt={`Priority ${priorityLabel}`}
            />
          </div>
        )}
        <div className="card-footer-tags">
          {ticket.tag.map((tag, index) => {
            return <Tag key={index} tag={tag} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
