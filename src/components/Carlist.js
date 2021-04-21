import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import { useTable } from "react-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCar from "./AddCar";

const Carlist = () => {
  const [data, setData] = useState([]);
  // componentDidMount(){
  //     fetch(SERVER_URL + '/api/cars')
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //         console.log(responseData);
  //         this.setState({
  //             cars : responseData._embedded.cars,
  //         });
  //     })
  //     .catch(err => console.log(err));
  // }

  useEffect(() => {
    fetchCars();
  }, []);

  // Delete car
  const onDelClick = (link) => {
    if (window.confirm("Are you sure to delete?")) {
      fetch(link, { method: "DELETE" })
        .then((res) => {
          toast.success("Car deleted", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          fetchCars();
        })
        .catch((err) => {
          toast.error("Error when deleting", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error(err);
        });
    }
  };

  // Add new car
  const addCar = (car) => {
    console.log(car);
    fetch(SERVER_URL + "/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => fetchCars())
      .catch((err) => console.error(err));
  };

  const fetchCars = () => {
    fetch(SERVER_URL + "/api/cars")
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setData(responseData._embedded.cars);
      })
      .catch((err) => console.log(err));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Brand",
        accessor: "brand", // accessor is the "key" in the data
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Price $",
        accessor: "price",
      },
      {
        id: "delbutton",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value }) => (
          <button
            onClick={() => {
              onDelClick(value);
            }}
          >
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <>
      <AddCar addCar={addCar} fetchCars={fetchCars} />
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default Carlist;
