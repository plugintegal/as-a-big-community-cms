import React, { useState } from "react";
import HeaderComponent from "./Partials/Header/";
import SidebarComponent from "./Partials/Sidebar/";
// import {withRouter} from 'react-router-dom';

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
        <div className={ (toggleState === false ? 'ml-60' : 'ml-20') + " overflow-hidden pt-16 pb-14 h-auto"}>
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutAdminComponent;
