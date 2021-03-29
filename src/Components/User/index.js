import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import userServices from "../../Services/user.service";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiChevronDown } from "react-icons/bi";

const UserComponent = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userServices
      .getAllUser(currentUser.token)
      .then((data) => {
        setUsers(data.data.data);
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
  return (
    <>
      <div className="bg-gray-300 pt-6 pb-16 px-5 w-full">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">
                PLUG-IN
              </div>
              <div className="text-sm">User Page</div>
            </div>
            <div className="float right">
              <Link to="/user-create">
                <button className="">Create New Data</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <DataTable
            columns={columns}
            data={users}
            defaultSortField="squads_name"
            sortIcon={<BiChevronDown />}
            pagination
          />
        </div>
      </div>
    </>
  );
};

export default UserComponent;
