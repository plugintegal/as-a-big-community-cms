import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BiMenu, BiChevronDown } from "react-icons/bi";
import {withRouter} from 'react-router-dom';
import { Link } from "react-router-dom";
import pluginLogo from "../../../../Assets/Images/logo-plugin.png";
import bigPluginLogo from "../../../../Assets/Images/logo-plugin-panjang.png";

import { signOut } from "../../../../Redux/actions/auth";

const HeaderComponent = (props) => {
  const dispatch = useDispatch();

  const [dropdown, setDropDown] = useState(false);

  const handleSignOut = () => {
    dispatch(signOut()).then((data) => {
      console.log("Berhasil Logout");
      props.history.push("/login");
      window.location.reload();
    });
  };
  return (
    <header className="fixed inset-x-0 top-0 bg-white w-full z-50 shadow">
      <div className="flex justify-between items-center">
        <div className="flex w-2/5 items-center">
          <div
            className={
              (props.toggle === false ? "w-60" : "w-20") +
              " text-center rounded-tr-xl top-0 h-16 flex items-center justify-center"
            }
            style={{ padding: "0 1.5rem" , background : '#27333a'}}
          >
            <Link to="" className="leading-10 self-center">
              <span>
                {props.toggle === false ? (
                  <img
                    src={bigPluginLogo}
                    style={{ width: "150px" }}
                    alt="long logo"
                  />
                ) : (
                  <img
                    src={pluginLogo}
                    style={{ width: "150px" }}
                    alt="short logo"
                  />
                )}
              </span>
            </Link>
          </div>
          <button
            onClick={() => props.toggleChange(!props.toggle)}
            className="inline-block px-3 shadow-none border-0 h-10 focus:outline-none"
          >
            <BiMenu
              className=""
              style={{ fontSize: 20, fontColor: "#e9e9e9" }}
            />
          </button>
        </div>
        <div className="flex">
          <div className="inline-block">
            <button
              id="options-menu"
              className="inline-flex mx-7 px-4 gap-5 items-center shadow-none border-0 h-10 self-center focus:outline-none "
              onClick={() => setDropDown(!dropdown)}
            >
              <img
                src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                className="w-8 rounded-full h-8"
                alt="user"
              />
              <span className="inline-block">Felix</span>
              <BiChevronDown />
            </button>
            <div
              className={
                (dropdown === false ? "hidden" : "") +
                " mx-7 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              }
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1" role="none">
                <button
                  onClick={handleSignOut}
                  type="button"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default withRouter(HeaderComponent);
