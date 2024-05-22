import React, { useState, useEffect, useMemo, useRef } from "react";
import ItemService from "../services/ItemService";
import { useNavigate } from "react-router-dom";
import { useTable } from 'react-table';

const ItemList = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState([]);
    const [searchId, setSearchId] = useState("");
    const itemsRef = useRef();

    itemsRef.current = items;

    useEffect(() => {
        retrieveItems();
    }, []);

    const onChangeSearchId = e => {
        const searchId = e.target.value;
        setSearchId(searchId);
    };

    const retrieveItems = () => {
        ItemService.getAll()
            .then(response => {
                setItems(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveItems();
        setSearchId("");
    };

    const removeAllItems = () => {
        ItemService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findById = () => {
        ItemService.get(searchId)
            .then(response => {
                setItems([response.data]);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const openItem = (rowIndex) => {
        const id = itemsRef.current[rowIndex].id;

        navigate(`/items/${id}`);
    };

    const deleteItem = (rowIndex) => {
        const id = itemsRef.current[rowIndex].id;

        ItemService.remove(id)
            .then(response => {
                console.log(response.data);
                navigate("/items");
                let newItems = [...itemsRef.current];
                newItems.splice(rowIndex, 1);

                setItems(newItems)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const columns = useMemo(() => [
        {
            Header: "Id",
            accessor: "id"
        },
        {
            Header: "Volume",
            accessor: "volume"
        },
        {
            Header: "consumable",
            accessor: "consumable"
        },
        {
            Header: "Status",
            accessor: "published",
            Cell: ({ row }) => (
                <div>
                    <button onClick={() => openItem(row.index)}>Open</button>
                    <button onClick={() => deleteItem(row.index)}>Delete</button>
                </div>
            )
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: items });
    
    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by id"
                        value={searchId}
                        onChange={onChangeSearchId}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findById}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 list">
                <table className="table" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr key={row.id} {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td key={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="col-md-8">
                <button className="btn btn-danger" onClick={removeAllItems}>Remove All Items</button>
            </div>
        </div>
    );
};

export default ItemList;