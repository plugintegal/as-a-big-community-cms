import React from "react";
import TitlePage from "../Parts/TitlePage";
import FormInputEdit from './ChildEvent/FormInputEditEvent';
import { withRouter } from 'react-router-dom';

const EditEventComponent = () => {
  return (
    <>
      <TitlePage title="Event" description="Event Edit Page" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
            <FormInputEdit />
        </div>
      </div>
    </>
  );
};

export default withRouter(EditEventComponent);
