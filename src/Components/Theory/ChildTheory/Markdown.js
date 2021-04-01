import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";

const MarkDown = () => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log(content);
  };

  return (
    <>
      <MDEditor
        height={500}
        value={content}
        name="content"
        onChange={setContent}
        //   previewOptions={{ renderers: renderers }}
      />
      <button
        onClick={handleSubmit}
        className="py-1 px-2 bg-blue-500 text-white"
      >
        Simpan
      </button>
    </>
  );
};

export default MarkDown;
