import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { getAllUser, getAllMember } from "../../Services/";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { FaCircleNotch } from "react-icons/fa";

import TitlePage from '../Parts/TitlePage';

const UserComponent = (props) => {
  const [users, setUsers] = useState([]);
  const [members, setMember] = useState([]);

  useEffect(() => {
    getAllUser()
      .then((data) => {
        setUsers(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllMember()
      .then((data) => {
        setMember(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "QRCODE",
      selector: "qrcode",
      sortable: true,
    },
    {
      name: "Squad ID",
      selector: "squad_id",
      sortable: true,
    },
    {
      name: "Roles",
      selector: "roles",
      sortable: true,
    },
  ];

  const columnMembers = [
    {
      name: "Member Code",
      selector: "member_code",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
  ];
  return (
    <>
      {users.length === 0 && members.length === 0 ? (
        <>
          <div className="w-10/12 h-full fixed bg-white text-center flex justify-center items-center flex-col">
            <span clasName="">
              <FaCircleNotch
                className="animate-spin -mt-16 text-5xl"
                style={{ color: "#27333a" }}
              />
            </span>
            Please Wait ...
          </div>
        </>
      ) : (
        <>
          <TitlePage title="User" description="User Page"/>
          <div className="-mt-10 px-5">
            <div className="border bg-white rounded-md p-5 w-full h-auto shadow-md">
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
            <div className="border bg-white rounded-md p-5 w-full h-auto mt-2 shadow-md">
              <DataTable
                title="Member Data"
                columns={columnMembers}
                data={members}
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
  );
};

export default UserComponent;
