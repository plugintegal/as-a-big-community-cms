import React from "react";

import TitlePage from "../Parts/TitlePage";
import FormEdit from './ChildUser/FormEdit';

const EditUserComponent = () => {

  return (
    <>
      <TitlePage title="User Page" description="User Edit Page" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
            <FormEdit/>
        </div>
      </div>
    </>
  );
};

export default EditUserComponent;
