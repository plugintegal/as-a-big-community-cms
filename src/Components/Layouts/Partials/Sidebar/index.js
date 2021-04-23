import React from "react";
import {
  BiTachometer,
  BiGroup,
  BiBookOpen,
  BiUser,
  BiClipboard,
  BiGitBranch,
  BiOutline,
  BiCalendarEvent
} from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarComponent = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <>
      <div
        className={
          (props.toggle === false ? "w-60" : "w-20") +
          " z-50 top-16 bottom-0 mt-0 fixed shadow "
        }
      >
        <div className="h-full rounded-br-xl" style={{ background: "#27333a" }}>
          <div className="pt-2.5 pb-7">
            <ul>
              <li className="py-3 px-5 text-gray-400 block">Menu</li>
              <li className="block">
                <Link
                  to="/"
                  className={
                    (location.pathname === "/"
                      ? "text-white"
                      : "text-gray-400") +
                    " py-3 px-7 text-lg font-regular font-poppins flex items-center gap-4"
                  }
                >
                  <div className="">
                    <span>
                      <BiTachometer style={{ fontSize: 24 }} />
                    </span>
                  </div>
                  <span
                    style={{ display: props.toggle === false ? "" : "none" }}
                    className="inline-block relative"
                  >
                    Dashboard
                  </span>
                </Link>
              </li>
              {currentUser !== null && currentUser.roles === "Admin" && (
                <li className="block">
                  <Link
                    to="/squad"
                    className={
                      (location.pathname === "/squad"
                        ? "text-white"
                        : "text-gray-400") +
                      " py-3 px-7 text-lg font-regular font-poppins flex items-center gap-4"
                    }
                  >
                    <div className="">
                      <span>
                        <BiGroup style={{ fontSize: 24 }} />
                      </span>
                    </div>
                    <span
                      style={{ display: props.toggle === false ? "" : "none" }}
                      className="inline-block relative"
                    >
                      Squad
                    </span>
                  </Link>
                </li>
              )}
              <li className="block">
                <Link
                  to="/theory"
                  className={
                    (location.pathname === "/theory"
                      ? "text-white"
                      : "text-gray-400") +
                    " py-3 px-7 text-lg font-regular font-poppins flex items-center gap-4"
                  }
                >
                  <div className="">
                    <span>
                      <BiBookOpen style={{ fontSize: 24 }} />
                    </span>
                  </div>
                  <span
                    style={{ display: props.toggle === false ? "" : "none" }}
                    className="inline-block relative"
                  >
                    Theory
                  </span>
                </Link>
              </li>
              <li className="block">
                <Link
                  to="/task"
                  className={
                    (location.pathname === "/task"
                      ? "text-white"
                      : "text-gray-400") +
                    " py-3 px-7 text-lg font-regular font-poppins flex items-center gap-4"
                  }
                >
                  <div className="">
                    <span>
                      <BiClipboard style={{ fontSize: 24 }} />
                    </span>
                  </div>
                  <span
                    style={{ display: props.toggle === false ? "" : "none" }}
                    className="inline-block relative"
                  >
                    Task
                  </span>
                </Link>
              </li>
              <li className="block">
                <Link
                  to="/category-event"
                  className={
                    (location.pathname === "/category-event"
                      ? "text-white"
                      : "text-gray-400") +
                    " py-3 px-7 text-lg font-regular font-poppins flex items-center gap-4"
                  }
                >
                  <div className="">
                    <span>
                      <BiOutline style={{ fontSize: 24 }} />
                    </span>
                  </div>
                  <span
                    style={{
                      display: props.toggle === false ? "" : "none",
                    }}
                    className="inline-block relative"
                  >
                    Category Event
                  </span>
                </Link>
              </li>
              <li className="block">
                <Link
                  to="/event"
                  className={
                    (location.pathname === "/event"
                      ? "text-white"
                      : "text-gray-400") +
                    " py-3 px-7 text-lg font-regular font-poppins flex items-center gap-4"
                  }
                >
                  <div className="">
                    <span>
                      <BiCalendarEvent style={{ fontSize: 24 }} />
                    </span>
                  </div>
                  <span
                    style={{
                      display: props.toggle === false ? "" : "none",
                    }}
                    className="inline-block relative"
                  >
                    Event
                  </span>
                </Link>
              </li>
              {currentUser !== null && currentUser.roles === "Admin" && (
                <>
                  <li className="block">
                    <Link
                      to="/batch"
                      className={
                        (location.pathname === "/batch"
                          ? "text-white"
                          : "text-gray-400") +
                        " py-3 px-7 text-lg font-regular font-poppins flex items-center gap-4"
                      }
                    >
                      <div className="">
                        <span>
                          <BiGitBranch style={{ fontSize: 24 }} />
                        </span>
                      </div>
                      <span
                        style={{
                          display: props.toggle === false ? "" : "none",
                        }}
                        className="inline-block relative"
                      >
                        Batch
                      </span>
                    </Link>
                  </li>
                  <li className="block">
                    <Link
                      to="/user"
                      className={
                        (location.pathname === "/user"
                          ? "text-white"
                          : "text-gray-400") +
                        " py-3 px-7 text-lg font-regular font-poppins flex items-center gap-4"
                      }
                    >
                      <div className="">
                        <span>
                          <BiUser style={{ fontSize: 24 }} />
                        </span>
                      </div>
                      <span
                        style={{
                          display: props.toggle === false ? "" : "none",
                        }}
                        className="inline-block relative"
                      >
                        User
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarComponent;
