import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { getAllUser, getAllMember } from "../../Services/";
import { BiChevronDown } from "react-icons/bi";
import { withRouter, useHistory } from "react-router-dom";

import TitlePage from "../Parts/TitlePage";
import LoadingPage from '../Parts/LoadingPage';

const UserComponent = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUser()
      .then((data) => {
        setUsers(data.data.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDetailUser = (e) => {
    history.push({
      pathname : '/user-detail',
      state : {
        userId: e.target.id
      }
    })
  }

  const handleEditUser = (e) => {
    history.push({
      pathname : '/user-edit',
      state : {
        userId : e.target.id
      }
    })
  }


  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Username",
      selector: "username",
      sortable: true,
    },
    {
      name: "Opsi",
      selector: 'id',
      cell : (state) => (
        <div>
          <button onClick={handleDetailUser} className="bg-gray-300 font-bold py-2 px-4 rounded" id={state.id}>Detail</button>
          <button onClick={handleEditUser} className="bg-yellow-300 font-bold py-2 px-4 rounded" id={state.id}>Edit</button>
        </div>
      )
    }
  ];

  const handleCreateNewUser = () => {
    history.push("/user-create");
  };

  return (
    <>
    {loading === false ? (
      <LoadingPage />
    ) : (
      <>
        <TitlePage title="User" description="User Page" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto shadow-md">
          <button
            onClick={handleCreateNewUser}
            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
          >
            Create New User
          </button>
          <DataTable
            title="User Data"
            columns={columns}
            data={users}
            noDataComponent="No Available Data"
            defaultSortField="squads_name"
            sortIcon={<BiChevronDown />}
            pagination
          />
        </div>
      </div>
      </>
    )}
    </>
    //   )}
    // </>
  );
};

export default withRouter(UserComponent);
