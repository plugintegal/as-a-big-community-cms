import React from "react";

import TitlePage from "../Parts/TitlePage";
import FormInputEditMoney from './ChildMoney/FormInputEditMoney';

const EditDataMoneyComponent = () => {
  return (
    <>
      <TitlePage title="Money" description="Edit Money Page" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
            <FormInputEditMoney />
        </div>
      </div>
    </>
  );
};

export default EditDataMoneyComponent;
