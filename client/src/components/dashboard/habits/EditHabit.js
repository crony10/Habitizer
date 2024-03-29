import React, { Fragment, useState, useRef } from "react";
import './fonts/fonts.css'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire, faBullseye, faGift } from "@fortawesome/free-solid-svg-icons"
import config from "../../../config"


const EditHabit = ({ habit, setHabitsChange, setIsLoading }) => {
    const [habit_id, setHabit_id] = useState(habit.habit_id);
    const [habit_name, setHabit_name] = useState(habit.habit_name);
    const [habit_duration, setHabit_duration] = useState(habit.habit_duration);
    const [habit_reward, setHabit_reward] = useState(habit.habit_reward);
    

    const editText = async (id) => {

        try {
            setIsLoading(true)
            const name = habit_name;
            const duration = habit_duration;
            const reward = habit_reward;
            const body = { name, duration, reward };

            const myHeaders = new Headers();

            myHeaders.append("Content-type", "application/json");
            myHeaders.append("token", localStorage.token);

            const res = await fetch(`${config.BASE_BACKEND_URL}/dashboard/habits/${id}`, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(body)
            });
            // console.log(res); 
            // window.location = "/";
            setHabitsChange(true);
            setIsLoading(false)

        } catch (err) {
            setIsLoading(false)
            console.errror(err.message)
        }
    }

    async function deleteHabit(id) {
        try {
            const response = await fetch(`${config.BASE_BACKEND_URL}/dashboard/habits/${id}`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            });
            // console.log(response);
            // window.location = "/";
            setHabitsChange(true);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Fragment>
            <Button
                // It's a react bootstrap button 
                // the most helpfull article for this: https://www.pluralsight.com/guides/override-react-bootstrap-with-custom-css-file
                type="button"
                className="custom-btn text-dark mt-2"
                variant="primary"
                data-toggle="modal"
                data-target={`#idd${habit.habit_id}`}
            >
                Edit
            </Button>

            <div className="modal" id={`idd${habit_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <div >
                                <h4 className="m-5 modal-title">{habit_name}</h4>
                            </div>

                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>
                                        <span className="my-auto h4">
                                            <FontAwesomeIcon className="" style={{
                                                color: '#6c63ff'
                                            }} icon={faBullseye} />
                                        </span>

                                        <span className="ml-2 h4" >
                                            Name
                                        </span>
                                    </label>
                                    <input type="text" className="form-control" value={habit_name} onChange={e => setHabit_name(e.target.value)} />
                                </div>
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
                                        className="form-control"
                                        min={habit.habit_streak}
                                        id="Duration"
                                        onChange={
                                            e => {
                                                // https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
                                                if (!e.target.validity.badInput && e.target.value >= habit.habit_streak) {
                                                    setHabit_duration(e.target.value)
                                                }
                                            }
                                        }
                                        value={habit_duration && Math.max(0, habit_duration)}
                                    />
                                </div>
                                <div >
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
                                    <input type="text" className="form-control"
                                        id="Reward"
                                        size="25"
                                        onChange={e => setHabit_reward(e.target.value)}
                                        value={habit_reward} />
                                </div>
                            </form>

                            <div>
                                <label htmlFor="Reward">

                                    <span className="mt-5 mr-3 h4" >
                                        Delete the habit?
                                    </span>
                                </label>
                                <button
                                    data-dismiss="modal"
                                    onClick={() => deleteHabit(habit_id)}
                                    className="btn btn-danger m-2">
                                    Delete
                                </button>


                            </div>
                        </div>

                        <div className="modal-footer">
                            <Button type="button"
                                className="custom-btn text-dark mt-2"
                                variant="primary"
                                data-dismiss="modal"
                                onClick={() => editText(habit_id)}>Edit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditHabit;