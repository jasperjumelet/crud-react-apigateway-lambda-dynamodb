import React, { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItemService from "../services/ItemService";

const Item = () => {
    const initialItemState = {
        id: "0",
        volume: 0,
        consumable: "water",
    };
    
    const {id} = useParams();
    const navigate = useNavigate();
    const [currentItem, setCurrentItem] = useState(initialItemState);
    const [message, setMessage] = useState("");

    const getItem = id => {
        ItemService.get(id)
            .then(response => {
                setCurrentItem(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getItem(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentItem({ ...currentItem, [name]: value });
    };

    const updatePublished = status => {
        var data = {
            id: currentItem.id,
            volume: currentItem.volume,
            consumable: currentItem.consumable
        };

        ItemService.update(currentItem.id, data)
            .then(response => {
                setCurrentItem({ ...currentItem, published: status });
                console.log(response.data);
                setMessage("Item updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };
    const updateItem = () => {
        ItemService.update(currentItem.id, currentItem)
            .then(response => {
                console.log(response.data);
                setMessage("Item updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };
    
    const deleteItem = () => {
        ItemService.remove(currentItem.id)
            .then(response => {
                console.log(response.data);
                navigate("/items");
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div>
            {currentItem ? (
                <div className="edit-form">
                    <h4>Item</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="id">id</label>
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                name="id"
                                value={currentItem.id}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="volume">Volume</label>
                            <input
                                type="number"
                                className="form-control"
                                id="volume"
                                name="volume"
                                value={currentItem.volume}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="consumable">consumable</label>
                            <input
                                type="text"
                                className="form-control"
                                id="consumable"
                                name="consumable"
                                value={currentItem.consumable}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentItem.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentItem.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={deleteItem}>
                        Delete
                    </button>

                    <button type="submit" className="badge badge-success" onClick={updateItem}>
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Item...</p>
                </div>
            )}
        </div>
    );                  
};

export default Item;