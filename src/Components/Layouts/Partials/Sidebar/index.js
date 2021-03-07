import React, { Component } from "react";
import logoPlugin from '../../../../Assets/Images/logo-plugin.png'
import {BiTachometer} from 'react-icons/bi';

class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <div className="w-1/5 bg-gradient-to-b from-bg-sidebar-1 to-bg-sidebar-2 rounded-r-xl p-3 shadow-lg">
          <div className="flex items-center ml-5 space-x-2 p-2 mb-5">
            <img
              className="h-12"
              src={logoPlugin}
              alt="Logo PLUGIN"
            />
            <div>
              <h4 className="font-bold text-xl text-white capitalize font-poppins tracking-wide">
                PLUG - IN
              </h4>
            </div>
          </div>
          <ul className="container space-y-2 text-xl mt-20 ml-5" style={{fontSize: 24}}>
            <li className="">
              <a
                href="#"
                className="flex items-center space-x-3 text-white p-2 rounded-md font-small font-poppins"
              >
                <span>
                  <BiTachometer style={{ fontSize : 30}}/>
                </span>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="">
              <a
                href="#"
                className="flex items-center space-x-3 text-white p-2 rounded-md font-small font-poppins"
              >
                <span>
                  <BiTachometer style={{ fontSize : 30}}/>
                </span>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="">
              <a
                href="#"
                className="flex items-center space-x-3 text-white p-2 rounded-md font-small font-poppins"
              >
                <span>
                  <BiTachometer style={{ fontSize : 30}}/>
                </span>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="">
              <a
                href="#"
                className="flex items-center space-x-3 text-white p-2 rounded-md font-small font-poppins"
              >
                <span>
                  <BiTachometer style={{ fontSize : 30}}/>
                </span>
                <span>Dashboard</span>
              </a>
            </li>
            
          </ul>
        </div>
      
    );
  }
}

export default SidebarComponent;
