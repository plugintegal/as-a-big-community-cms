import React from "react";

import FormInputMoney from "./ChildMoney/FormInputMoney";
import TitlePage from "../Parts/TitlePage";

const CreateNewDataMoneyComponent = () => {
  return (
    <>
      <TitlePage title="Money" description="Create New Data Page" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <FormInputMoney />
        </div>
      </div>
    </>
  );
};

export default CreateNewDataMoneyComponent;
