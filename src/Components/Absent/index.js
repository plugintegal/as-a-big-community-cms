import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import TitlePage from "../Parts/TitlePage";
import {
  getSquad,
  getAllBatch,
  getUserBySquadId,
  getTheories,
  storeCash
} from "../../Services";
import NumberFormat from "react-number-format";
import { useFormik } from "formik";
import * as Yup from "yup";

const AbsentComponent = () => {
  const [squad, setSquad] = useState([]);
  const [batches, setBatches] = useState([]);

  const [selectedSquad, setSelectedSquad] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  const [users, setUsers] = useState([]);
  const [theoryBySquad, setTheoryBySquad] = useState([]);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const initialValues = {
    date : '',
    theory_id: '',
    amount : ''
  };

  const onSubmit = (values) =>{
    setLoadingSubmit(true)
    const cash = [];

    users.forEach((user) => {
      const newUser = {
        user_id : user.id,
        status : user.status
      }

      cash.push(newUser);
    });

    const newData = {
      squad_id : selectedSquad,
      theory_id: values.theory_id,
      date: values.date,
      amount: values.amount.split(".").join(""),
      cash : [...cash]
    }

    storeCash(newData)
    .then((data) => {
      console.log("Berhasil ", data)
      setLoadingSubmit(false)
    })
    .catch((error) => {
      
      console.log("Error ", error)
      setLoadingSubmit(false)
    })
  }

  const validationSchema = Yup.object({
    date : Yup.string().required('Requred!'),
    theory_id : Yup.string().required('Requred!'),
    amount : Yup.string().required('Requred!'),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  const getAllSquad = () => {
    getSquad()
      .then((data) => {
        setSquad(data.data.data);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  const getBatch = () => {
    getAllBatch()
      .then((data) => {
        setBatches(data.data.data);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  const showUser = () => {
    getUserBySquadId(selectedSquad, selectedBatch)
      .then((data) => {
        const newData = [];
        data.data.data.forEach((user) => {
          const newObject = {
            id: user.id,
            name: user.name,
            email: user.email,
            photo: user.photo,
            user_code: user.user_code,
            status: false,
          };

          newData.push(newObject);
        });
        setUsers(newData);
      })
      .catch((error) => console.log(error));
    getTheories(selectedSquad)
      .then((data) => {
        setTheoryBySquad(data.data.data);
      })
      .catch((error) => console.log("Error ", error));
  };

  const handleChecked = (id) => {
    const newUser = [...users];
    users.forEach((user) => {
      if (user.id === id) {
        user.status = !user.status;
        newUser.concat(user);
      }
    });

    setUsers(newUser);
  };

  useEffect(() => {
    getAllSquad();
    getBatch();
  }, []);
  return (
    <>
      <TitlePage title="Money" description="Cash Page" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <div className="w-8/12 h-auto flex justify-between items-center gap-2">
            <div className="flex-1 w-full h-auto">
              <div className="relative mb-2">
                <select
                  className="w-full py-2 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  name="squad_id"
                  onChange={(e) => setSelectedSquad(e.target.value)}
                >
                  <option>Choose Squad</option>
                  {squad.map((squad, index) => {
                    return (
                      <option value={squad.id} key={index}>
                        {squad.squads_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex-1 w-full h-auto">
              <div className="relative mb-2">
                <select
                  className="w-full py-2 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  name="squad_id"
                  onChange={(e) => setSelectedBatch(e.target.value)}
                >
                  <option>Choose Batch</option>
                  {batches.map((batch, index) => {
                    return (
                      <option value={batch.id} key={index}>
                        {batch.batch_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex-1 w-full h-auto">
              <button
                className="bg-blue-500 w-full py-2 rounded text-white -mt-2"
                onClick={() => showUser()}
              >
                Find
              </button>
            </div>
          </div>
        </div>
        <div className="border bg-white rounded-md p-5 w-full h-auto mt-2">
          {users.length > 0 ? (
            <>
              <div>
                <form onSubmit={formik.handleSubmit} className="w-8/12 flex gap-2">
                  <div className="relative mb-2 flex-1">
                    <label htmlFor="date">Date</label>
                    <input
                      className="w-full py-0.5 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name="date"
                      type="date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="relative mb-2 flex-1">
                    <label htmlFor="theory_id">Gathering Theory</label>
                    <select
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name="theory_id"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option>Choose Gathering Theory</option>
                      {theoryBySquad.map((theory, index) => {
                        return (
                          <option value={theory.id} key={index}>
                            Pertemuan Ke-{theory.gathering}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="relative mb-2 flex-1">
                    <label htmlFor="theory_id">Amount</label>
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
                  <div className="relative mb-2 flex-1">
                    <label>&nbsp;</label>
                    <button type="submit" className="bg-blue-500 text-white rounded w-full h-auto py-1.5">
                      {loadingSubmit ? 'Loading...' : 'Save'}
                    </button>
                  </div>
                </form>
              </div>
              <table className="mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
                <thead className="bg-gray-50">
                  <tr className="text-gray-600 text-left">
                    <th className="font-semibold text-sm uppercase px-6 py-4">
                      #
                    </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4">
                      Name
                    </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                      status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => {
                    return (
                      <tr>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              onChange={() => handleChecked(user.id)}
                              defaultChecked={user.status}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="inline-flex w-10 h-10">
                              <img
                                className="w-10 h-10 object-cover rounded-full"
                                alt="User avatar"
                                src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                              />
                            </div>
                            <div>
                              <p className="">{user.name}</p>
                              <p className="text-gray-500 text-sm font-semibold tracking-wide">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-center">
                          {user.status ? (
                            <span className="text-green-800 bg-green-200 font-semibold px-2 rounded-full">
                              Bayar
                            </span>
                          ) : (
                            <span className="text-red-800 bg-red-200 font-semibold px-2 rounded-full">
                              Tidak Bayar
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default withRouter(AbsentComponent);
