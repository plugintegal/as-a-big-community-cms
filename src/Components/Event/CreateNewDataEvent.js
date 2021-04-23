import React from "react";

import TitlePage from "../Parts/TitlePage";
import FormInputEvent from "./ChildEvent/FormInputEvent";

const CreateNewDataEventComponent = () => {
  return (
    <>
      <TitlePage title="event" description="Create new event" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <FormInputEvent />
        </div>
      </div>
    </>
  );
};

export default CreateNewDataEventComponent;
