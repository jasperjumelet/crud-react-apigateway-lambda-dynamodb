import React, {useState} from "react";
import ItemService from "../services/ItemService";

const AddItem = () => {
    const initialItemState = {
        id: "0",
        volume: 0,
        consumable: "water",
    };
    const [item, setItem] = useState(initialItemState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    };

    const saveItem = () => {
        var data = {
            id: item.id,
            volume: item.volume,
            consumable: item.consumable
        };

        ItemService.create(data)
            .then(response => {
                setItem({
                    id: response.data.id,
                    volume: response.data.volume,
                    consumable: response.data.consumable
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newItem = () => {
        setItem(initialItemState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newItem}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="id">id</label>
                        <input
                            type="text"
                            className="form-control"
                            id="id"
                            required
                            value={item.id}
                            onChange={handleInputChange}
                            name="id"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="volume">Volume</label>
                        <input
                            type="number"
                            className="form-control"
                            id="volume"
                            required
                            value={item.volume}
                            onChange={handleInputChange}
                            name="volume"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="consumable">consumable</label>
                        <input
                            type="text"
                            className="form-control"
                            id="consumable"
                            required
                            value={item.consumable}
                            onChange={handleInputChange}
                            name="consumable"
                        />
                    </div>

                    <button onClick={saveItem} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
    
}

export default AddItem;