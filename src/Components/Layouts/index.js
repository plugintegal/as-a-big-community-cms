import React, { useState } from "react";
import HeaderComponent from "./Partials/Header/";
import SidebarComponent from "./Partials/Sidebar/";

const LayoutAdminComponent = ({ children }) => {
  const [toggleState, setToggleState] = useState(false);

  return (
    <>
      <div className="bg-gray-200">
        <HeaderComponent
          toggle={toggleState}
          toggleChange={(value) => setToggleState(value)}
        />
        <SidebarComponent toggle={toggleState} />
        <div className={ (toggleState === false ? 'ml-80' : 'ml-20') + " overflow-hidden pt-20 px-3 pb-14 h-screen"}>
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutAdminComponent;
