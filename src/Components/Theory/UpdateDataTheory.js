import React from "react";
import { withRouter } from "react-router-dom";
import FormInputEdit from "./ChildTheory/FormInputEdit";
import TitlePage from '../Parts/TitlePage';

const UpdateDataTheoryComponent = (props) => {
  const theoryId = props.location.query;
  return (
    <>
     <TitlePage title="Theory" description="Edit Theory"/>
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
            <FormInputEdit theory_id={theoryId}/>
        </div>
      </div>
    </>
  );
};

export default withRouter(UpdateDataTheoryComponent);
