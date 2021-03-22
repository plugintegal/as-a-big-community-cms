import React from "react";
import { withRouter } from "react-router-dom";

const SquadComponent = (props) => {
  return (
    <>
      <div className="bg-transparent pt-6 pb-16 px-3">
        <div className="container mx-auto">
          <div className="flex flex-col">
            <div className="text-2xl font-medium font-poppins mb-1">
              Ini Squad
            </div>
            <div>Ini Squad</div>
          </div>
        </div>
      </div>
      <div className="-mt-3">
        <div className="border">asdasd</div>
      </div>
    </>
  );
};

export default withRouter(SquadComponent);
