import axios from 'axios';
import React, { useState } from 'react'
import { Popup } from "react-map-gl";


const NewPlace = ({ currentUser, newPlace, setNewPlace, pins, setPins }) => {

    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPin = {
            username: currentUser,
            title,
            desc,
            rating,
            lat: newPlace.lat,
            long: newPlace.long
        }
        try {
            const res = await axios.post("/pins", newPin);
            setPins([...pins, res.data]);
            setNewPlace(null);
        }
        catch (err) {
        }
    }

    return (
        <Popup longitude={newPlace.long} latitude={newPlace.lat}
            anchor="left"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
        >
            <div>
                <form onSubmit={handleSubmit}>
                    <label className="form-label">Title</label>
                    <input required placeholder="Enter a title" onChange={(e) => setTitle(e.target.value)} />
                    <label className="form-label">Review</label>
                    <textarea required placeholder="Add Review about this place" onChange={(e) => setDesc(e.target.value)} />
                    <label className="form-label">Rating</label>
                    <select onChange={(e) => setRating(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button type="submit" className="submitButton">Add Pin</button>
                </form>
            </div>
        </Popup>
    )
}

export default NewPlace