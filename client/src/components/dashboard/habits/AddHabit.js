import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire, faGift } from "@fortawesome/free-solid-svg-icons"
import config from "../../../config"




const AddHabit = ({ habit_name, setHabitsChange }) => {

    const [habit_duration, setDuration] = useState(0);
    const [habit_reward, setReward] = useState("");

    const add = async () => {

        try {

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const name = habit_name;
            const duration = habit_duration;
            const reward = habit_reward;

            if (reward.length === 0) {
                alert("Don't hold your self back! Add some reward for yourself.");
                return;
            }

            const body = { name, reward, duration };
            console.log(body);
            const response = await fetch(`${config.BASE_BACKEND_URL}/dashboard/habits/`,
                {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(body)
                });

            const parseRes = await response.json();
            console.log(parseRes);
            // console.log(response);
            // window.location = "/";
            setHabitsChange(true);
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <Fragment>
            <button type="button" style={{
                background: '#6C63FF'
            }} className="btn text-light" data-toggle="modal" data-target="#myModal">
                Add
            </button>

            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">{habit_name}</h3>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="Duration">
                                        <span className="my-auto h4">
                                            <FontAwesomeIcon className="" style={{
                                                color: '#6c63ff'
                                            }} icon={faFire} />
                                        </span>

                                        <span className="ml-2 h4" >
                                            Duration(In days)
                                        </span>
                                    </label>
                                    <input type="number"
                                        id="Duration"
                                        placeholder="0"
                                        className="form-control"
                                        min="0"
                                        onChange={
                                            e => {
                                                // https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
                                                if (!e.target.validity.badInput) {
                                                    setDuration(e.target.value)
                                                }
                                            }
                                        }
                                        value={habit_duration && Math.max(0, habit_duration)}
                                    />
                                </div>


                                <div>
                                    <label htmlFor="Reward">
                                        <span className="my-auto h4">
                                            <FontAwesomeIcon className="" style={{
                                                color: '#6c63ff'
                                            }} icon={faGift} />
                                        </span>

                                        <span className="ml-2 h4" >
                                            Reward
                                        </span>
                                    </label>
                                    <input type="text"
                                        id="Reward"
                                        size="25"
                                        className="form-control"
                                        placeholder="Enter any reward for yourself"
                                        onChange={element => 
                                        setReward(element.target.value)} />
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" data-dismiss="modal" style={{
                                background: '#6C63FF'
                            }} onClick={() => add(habit_name)} className="btn text-light">
                                Add
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AddHabit;