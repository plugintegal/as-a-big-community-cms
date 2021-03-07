import React, { Component } from "react";
import HeaderComponent from "./Partials/Header/";
import SidebarComponent from "./Partials/Sidebar/";

const LayoutAdminComponent = ({children}) => {
  return (
    <>
        <div class="flex flex-wrap bg-gray-100 w-full h-screen">
          <SidebarComponent />
          <div className="w-4/5">
            <HeaderComponent />
            <div className="p-6">
              { children }
            </div>
          </div>
        </div>
      </>
  )
}

export default LayoutAdminComponent;
