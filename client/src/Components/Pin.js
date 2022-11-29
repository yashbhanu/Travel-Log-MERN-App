import React, { useState } from 'react';
import { Marker, Popup } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import Star from "@material-ui/icons/Star";
import { format } from "timeago.js"

const Pin = ({ p, viewport, setViewport, currentUser }) => {

    const [currentPlaceId, setCurrentPlaceId] = useState(null);

    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id);
        setViewport({ ...viewport, latitude: lat, longitude: long })
    }

    return (
        <div>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom" offsetLeft={-viewport.zoom * 3.5} offsetTop={-viewport.zoom * 7}>
                <RoomIcon style={{ fontSize: viewport.zoom * 7, color: p.username === currentUser ? "orangered" : "blueviolet", cursor: "pointer" }}
                    onClick={() => handleMarkerClick(p._id, p.lat, p.long)} />
            </Marker>
            {p._id === currentPlaceId && (
                <Popup longitude={p.long} latitude={p.lat}
                    key={p._id}
                    anchor="left"
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setCurrentPlaceId(null)}
                >
                    <div className="card">
                        <label className="card-label">Place</label>
                        <h4 className="place">{p.title}</h4>
                        <label className="card-label">Review</label>
                        <p className="desc">{p.desc}</p>
                        <label className="card-label">Rating</label>
                        <div className="stars">
                            {Array(p.rating).fill().map((_, i) => <Star key={i} className="star" />)}
                        </div>
                        <label className="card-label">Information</label>
                        <span className="username">Created by <b>{p.username} </b></span>
                        <span className="date">{format(p.createdAt)}</span>
                    </div>
                </Popup>
            )}
        </div>
    )
}

export default Pin