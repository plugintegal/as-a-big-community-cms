import React from "react";
import { BiTachometer, BiGroup, BiBookOpen, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarComponent = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);

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
                  className="py-3 px-7 text-gray-400 text-lg font-regular font-poppins flex items-center gap-4"
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
                    className="py-3 px-7 text-gray-400 text-lg font-regular font-poppins flex items-center gap-4"
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
                  className="py-3 px-7 text-gray-400 text-lg font-regular font-poppins flex items-center gap-4"
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
              {currentUser !== null && currentUser.roles === "Admin" && (
                <li className="block">
                  <Link
                    to="/user"
                    className="py-3 px-7 text-gray-400 text-lg font-regular font-poppins flex items-center gap-4"
                  >
                    <div className="">
                      <span>
                        <BiUser style={{ fontSize: 24 }} />
                      </span>
                    </div>
                    <span
                      style={{ display: props.toggle === false ? "" : "none" }}
                      className="inline-block relative"
                    >
                      User
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarComponent;
