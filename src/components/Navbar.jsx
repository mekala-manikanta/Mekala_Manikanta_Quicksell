import React, { useState, useEffect, useRef } from "react";
import "./styles/Navbar.css";
import settingsIcon from "../icons/down.svg";
import chevronIcon from "../icons/Display.svg";

function Navbar({ grouping, ordering, setGrouping, setOrdering }) {
  const [isOpen, setIsOpen] = useState(false);
  const button = useRef(null);
  const drop = useRef(null);
  useEffect(() =>
    window.addEventListener("click", (ev) => {
      if (drop.current && drop.current.contains(ev.target)) {
        setIsOpen(true);
      } else if (button.current && button.current.contains(ev.target)) {
        setIsOpen(!isOpen);
      } else {
        setIsOpen(false);
      }
    })
  );

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

  return (
    <div className="navbar">
      <div className="display-container" ref={button}>
        <div className="display">
          <img src={chevronIcon} />
          <span>Display</span>
          <img src={settingsIcon} />
        </div>
        {isOpen ? (
          <div className="display-settings" ref={drop}>
            <div className="display-setting">
              <div>Grouping</div>
              <select
                value={capitalize(grouping)}
                onChange={(e) => {
                  setGrouping(
                    e.target.children[e.target.selectedIndex].getAttribute(
                      "data-id"
                    )
                  );
                }}
              >
                <option key="status" data-id="status">
                  By Status
                </option>
                <option key="user" data-id="user">
                  By User
                </option>
                <option key="priority" data-id="priority">
                  By Priority
                </option>
              </select>
            </div>
            <div className="display-setting">
              <div>Sorting</div>
              <select
                value={capitalize(ordering)}
                onChange={(e) => {
                  console.log(e);
                  setOrdering(
                    e.target.children[e.target.selectedIndex].getAttribute(
                      "data-id"
                    )
                  );
                }}
              >
                <option key="title" data-id="title">
                  Title
                </option>
                {grouping !== "priority" ? (
                  <option key="priority" data-id="priority">
                    Priority
                  </option>
                ) : null}
              </select>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Navbar;
