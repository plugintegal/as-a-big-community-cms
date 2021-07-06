import React, { useState, useEffect } from "react";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { getCashDataByTheoryService, storeCash } from "../../Services/";

import DataTable from "react-data-table-component";
import { BiChevronDown } from "react-icons/bi";
import NumberFormat from "react-number-format";
import { useFormik } from "formik";

import TitlePage from "../Parts/TitlePage";

const ShowMemberCashComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const theoryId = location.state.theoryId;
  const batchId = location.state.batchId;
  const squadId = location.state.squadId;

  const [userData, setUserData] = useState([]);
  const [userSubmit, setUserSubmit] = useState([]);
  
  const initialValues = {
      amount : '',
      date : ''
  }

  const onSubmit = (values) => {
    const newSubmit =  [];

    userSubmit.forEach((user) => {
      newSubmit.push({
        user_id : user.id,
        status: user.status
      })
    });

    const dataSubmit = {
        ...values,
        amount : values.amount.split(".").join(""),
        squad_id : squadId,
        theory_id : theoryId,
        cash : newSubmit
    }

    storeCash(dataSubmit)
    .then((data) => {
      history.push("cash2");
      console.log("Berhasil ", data);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const formik = useFormik({
      initialValues,
      onSubmit
  })

  const handleCheckboxCash = (userId) => {
    let newData = [...userSubmit];
    userData.forEach((user) => {
      if (user.id === userId) {
        user.status = !user.status;
        newData.concat(user);
      }
    });
    console.log(newData);

    setUserSubmit(newData);
  };
  

  const columns = [
    {
      name: "#",
      selector: "id",
      width: "50px",
      center: true,
      cell: (state) => (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            onChange={() => handleCheckboxCash(state.id)}
            defaultChecked={state.status}
          />
        </div>
      ),
    },
    {
      name: "User Code",
      selector: "user_code",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Status",
      selector: "user_code",
      cell: (state) => <>{state.status ? <>Bayar</> : <>Tidak</>}</>,
    },
  ];

  useEffect(() => {
    getCashDataByTheoryService(theoryId, batchId, squadId)
      .then((data) => {
        setUserData(data.data.data);
        setUserSubmit(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [theoryId, batchId, squadId]);

  return (
    <>
      <TitlePage title="Money" description="List Member" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
            <form className="flex gap-2" onSubmit={formik.handleSubmit}>
                <div className="relative w-48">
                    <label htmlFor="amount">Amount</label>
                    <NumberFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      className="w-full py-0.5 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Enter amount"
                      name="amount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.amount}
                    />
                </div>

                <div className="relative w-48">
                    <label htmlFor="amount">Date</label>
                    <input type="date" name="date" className="w-full border rounded px-2 py-1.5" onChange={formik.handleChange}/>
                </div>

                <div className="relative w-48">
                    <label htmlFor="submit">&nbsp;</label>
                    <button type="submit" className="bg-blue-400 rounded text-white w-full px-2 py-2">Submit</button>
                </div>
            </form>
          <DataTable
            columns={columns}
            data={userData}
            title={`List Member`}
            defaultSortField="name"
            sortIcon={<BiChevronDown />}
            pagination
            customStyles={customStyles}
            className="border-2 rounded shadow"
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

export default withRouter(ShowMemberCashComponent);
