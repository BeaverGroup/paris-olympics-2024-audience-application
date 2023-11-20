import "./sport_box.css"
import addIcon from "../../icons/add.svg"
import checked from "../../icons/check.svg"
import React, { useState, useContext, useEffect } from "react";
import { UserStateContext } from "../../App";
// import AddSubscribe from "../add_subscribe/AddSubscribe";
import axios from "axios";

function SportBox(props) {
    const { sport } = props;
    const { userState, setUserState } = useContext(UserStateContext);
    const [ userSubscribe, setSubscribe ] = useState([]);

    console.log(props.subscribed);
    const addSub = async () => {
        const port = import.meta.env.VITE_API_PORT;
        const host_ip = import.meta.env.VITE_API_HOST_IP;
        const sportName = sport.name
        const data_format = JSON.stringify({
          Sport: sportName
        })
        try {
          const response = await axios.post(`http://${host_ip}:${port}/user/subscribe/${userState._id}`, data_format, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          console.log(response);
        } catch (e) {
          console.log(e.response.data.error);
        }
      }
      
    return(
        <div className="sport-card" onClick={addSub}>
            <div className="img-box">
                <img src={sport.image_url} alt="" />
            </div>
            <div className="sport-name">{sport.name}</div>
            <div className="sport-detail">{sport.name} <div className="description"> {sport.description} </div></div>
            <div className="add-icon">
              {props.subscribed.includes(sport.name) ? <img src={checked} alt="" /> : <img src={addIcon} alt="" />}
            </div>
        </div>
    );
}

export default SportBox;