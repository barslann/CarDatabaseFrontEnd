import React, { useEffect, useState } from 'react';
import {SERVER_URL} from '../constants.js';
import { useTable } from 'react-table'


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
        fetch(SERVER_URL + '/api/cars')
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            setData(responseData._embedded.cars);
        })
        .catch(err => console.log(err));
      });


      const columns = React.useMemo(
        () => [
          {
            Header: 'Brand',
            accessor: 'brand', // accessor is the "key" in the data
          },
          {
            Header: 'Model',
        accessor: 'model',
          },
          {
            Header: 'Year',
        accessor: 'year',
          },
          {
            Header: 'Price $',
        accessor: 'price',
          },
        ],
        []
      )

      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })



        return (
            <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: 'solid 3px red',
                        background: 'aliceblue',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: '10px',
                            border: 'solid 1px gray',
                            background: 'papayawhip',
                          }}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        );
    
}

export default Carlist;
