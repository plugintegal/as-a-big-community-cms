import React from "react";
import { withRouter } from "react-router-dom";
import FormInputEdit from "./ChildTheory/FormInputEdit";

const UpdateDataTheoryComponent = (props) => {
  const theoryId = props.location.query;
  return (
    <>
      <div className="bg-gray-300 pt-6 pb-16 px-5 w-full">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">
                PLUG-IN
              </div>
              <div className="text-sm">Edit Theory</div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
            <FormInputEdit theory_id={theoryId}/>
        </div>
      </div>
    </>
  );
};

export default withRouter(UpdateDataTheoryComponent);
