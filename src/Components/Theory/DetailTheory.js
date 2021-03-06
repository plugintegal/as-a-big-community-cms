import React, { useState, useEffect } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import {
  getTheoryById,
  getTaskById,
  updateTheoryActive,
} from "../../Services/";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { BiEditAlt } from "react-icons/bi";
import swal from "sweetalert";
import TitlePage from "../Parts/TitlePage";

const DetailTheoryComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const theoryId = location.state.idTheory;

  const [theoryDetail, setTheoryDetail] = useState({});
  const [taskId, setTaskId] = useState("");
  const [contentTask, setContentTask] = useState("");
  const [task, setTask] = useState(null);
  console.log(JSON.stringify(task))
  const [resfreshKey, setRefreshKey] = useState(0);
  const messageTask = useState(localStorage.getItem("TASK_SUCCESS"));
  const messageGrade = useState(localStorage.getItem("GRADE_SUCCESS"));

  useEffect(() => {
    const handleSwal = () => {
      swal("Success!", "Create Task is Successful!", "success").then(() => {
        localStorage.removeItem("TASK_SUCCESS");
      });
    };
    if (messageTask[0] != null) {
      handleSwal();
    }
    // eslint-disable-next-line
  }, [messageTask[0] != null]);

  useEffect(() => {
    const handleSwal = () => {
      swal("Success!", "Input grade is Successful!", "success").then(() => {
        localStorage.removeItem("GRADE_SUCCESS");
      });
    };
    if (messageGrade[0] != null) {
      handleSwal();
    }
    // eslint-disable-next-line
  }, [messageGrade[0] != null]);

  const handleDetailSubmitTask = (e) => {
    // console.log("member_code", e);
    history.push({
      pathname: "/input-grade",
      state: {
        userId: e.target.id,
        theoryId,
        name: e.target.name,
      },
    });
  };

  const handleCreateTask = (e) => {
    history.push({
      pathname: "/task-create",
      state: {
        name: e.target.name,
        theoryId: e.target.id,
      },
    });
  };

  const handleModifyActiveTheory = (e) => {
    const activeTheoryData = {
      in_active: !theoryDetail.in_active,
    };

    updateTheoryActive(activeTheoryData, theoryId)
      .then((data) => {
        if (data.status === 200) {
          setRefreshKey((oldKey) => oldKey + 1);
        }
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  useEffect(() => {
    getTheoryById(theoryId)
      .then((data) => {
        console.log(data.data.data);
        setTheoryDetail(data.data.data);
        setTaskId(data.data.data.tasks.id);
        setContentTask(data.data.data.tasks.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [theoryId, resfreshKey]);

  useEffect(() => {
    if (taskId !== "") {
      getTaskById(taskId)
        .then((data) => {
          setTask(data.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [theoryDetail, taskId]);

  return (
    <>
      <TitlePage title="Theory" description="Detail Theory" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <div className="font-medium text-lg">
            Pertemuan Ke-{theoryDetail.gathering}
          </div>
          <div className="font-sm">{theoryDetail.description}</div>
          <div className="mt-2">
            <iframe
              title="content"
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${theoryDetail.content}`}
              width="100%"
              height="500px"
              frameBorder="0"
            ></iframe>
          </div>
          <div className="mt-2">
            {theoryDetail.in_active ? (
              <button
                onClick={handleModifyActiveTheory}
                className="bg-blue-500 rounded text-center text-white w-full py-3"
              >
                Un-active
              </button>
            ) : (
              <button
                onClick={handleModifyActiveTheory}
                className="bg-blue-500 rounded text-center text-white w-full py-3"
              >
                Active
              </button>
            )}
          </div>
        </div>

        <div>
          {theoryDetail.tasks ? (
            <div className="flex gap-2">
              <div className="border bg-white rounded-md p-5 h-auto mt-3 w-8/12">
                <MarkdownPreview source={contentTask} />
              </div>
              <div className="border bg-white rounded-md p-5 h-auto mt-3 w-4/12">
                <div className="text-lg font-bold">List</div>
                <div className="flex flex-col gap-2">
                  {task ? (
                    <>
                      {task.submit_tasks.length > 0
                        ? task.submit_tasks.map((submit_task) => {
                            return (
                              <div className="bg-gray-100 rounded shadow h-20 p-3">
                                <div className="flex justify-around items-center">
                                  <div>
                                    <div className="font-bold text-lg">
                                      {submit_task.users.name}
                                    </div>
                                    <div className="text-sm">
                                      <a
                                        href={submit_task.answer}
                                        rel="noreferrer"
                                        target="_blank"
                                        className="text-blue-700 hover:text-red-700"
                                      >
                                        {submit_task.answer}
                                      </a>
                                    </div>
                                  </div>
                                  <BiEditAlt
                                    className="text-2xl mt-2 hover:text-blue-500 cursor-pointer"
                                    id={submit_task.users.id}
                                    onClick={handleDetailSubmitTask}
                                    name={theoryDetail.gathering}
                                  />
                                </div>
                              </div>
                            );
                          })
                        : "Not available"}
                    </>
                  ) : (
                    <>Please Wait .. </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="border bg-white rounded-md p-5 w-full h-auto mt-3">
              <button
                id={theoryId}
                name={theoryDetail.gathering}
                onClick={handleCreateTask}
                className="bg-blue-500 rounded w-full text-center text-white text-medium font-bold py-3"
              >
                Create New Task
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(DetailTheoryComponent);
