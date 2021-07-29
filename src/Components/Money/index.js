import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { withRouter, useHistory } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import swal from "sweetalert";
import { getMoneyService, deleteMoneyService } from "../../Services/";

import TitlePage from "../Parts/TitlePage";

const MoneyComponent = () => {
  const history = useHistory();
  const [money, setMoney] = useState([]);
  const messageMoney = useState(localStorage.getItem("MONEY_SUCCESS"))  

  useEffect(() => {
    const handleSwal = () => {
      swal("Success!", "Create New Data is Successful!", "success")
      .then(() => {
        localStorage.removeItem("EVENT_SUCCESS");
      });
    }
    if(messageMoney[0] != null){
      handleSwal()
    }
    // eslint-disable-next-line
  }, [messageMoney[0] != null])

  useEffect(() => {
    getMoneyService()
      .then((data) => {
        setMoney(data.data.data);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  });

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Amount",
      selector: "amount",
      sortable: true,
      cell: (state) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(state.amount),
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      cell: (state) => (
        <>
          {state.status ? (
            <span className="text-green-800 bg-green-200 font-semibold px-2 rounded-full">
              Masuk
            </span>
          ) : (
            <span className="text-red-800 bg-red-200 font-semibold px-2 rounded-full">
              Keluar
            </span>
          )}
        </>
      ),
    },
    {
      name: "Action",
      selector: "id",
      cell: (state) => (
        <>
          <button
            onClick={handleDetail}
            id={state.id}
            name={state.gathering}
            className="font-medium bg-blue-400 px-3 py-2 rounded-lg mx-2"
          >
            Detail
          </button>

          <button
            onClick={handleEdit}
            id={state.id}
            name={state.gathering}
            className="font-medium bg-yellow-400 px-3 py-2 rounded-lg mx-2"
          >
            Edit
          </button>
          <button
            id={state.id}
            onClick={handleDelete}
            className="font-medium text-white bg-red-400 px-3 py-2 rounded-lg mx-2"
          >
            Hapus
          </button>
        </>
      ),
    },
  ];

  const handleCreateNewMoney = () => {
    history.push("/money-create");
  };

  const handleEdit = (e) => {
    history.push({
      pathname: "/money-edit/" + e.target.name,
      state: {
        name: e.target.name,
        idMoney: e.target.id,
      },
    });
  };

  const handleDetail = (e) => {
    alert("UNDER DEVELOPMENT");
  };

  const handleDelete = (e) => {
    deleteMoneyService(e.target.id)
      .then((data) => {
        if (data.status === 200) {
          history.push("/money");
        }
        console.log("Berhasil ", data);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  return (
    <>
      <TitlePage title="Money" description="Money Page" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <button
            onClick={handleCreateNewMoney}
            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
          >
            Create New Money
          </button>
          <DataTable
            title="Money Data"
            striped={true}
            noDataComponent="No available Data"
            columns={columns}
            data={money}
            sortIcon={<BiChevronDown />}
            className="border-2 rounded shadow"
            pagination
            customStyles={customStyles}
          />
        </div>
      </div>
    </>
  );
};

const customStyles = {
  headCells: {
    style: {
      fontWeigth: "bold",
      fontSize: "16px",
      textAlign: "center",
      textTransform: "uppercase",
      background: "#F9FAFB",
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

export default withRouter(MoneyComponent);
