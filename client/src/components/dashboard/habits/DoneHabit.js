import React, { Fragment, useState, useRef } from "react";
import './fonts/fonts.css'
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBullseye} from "@fortawesome/free-solid-svg-icons"


const DoneHabit = ({ habit, setHabitsChange }) => {
    let yesRef = useRef();

    const [habit_id, setHabit_id] = useState(habit.habit_id);

    // Function to increase a streak
    const increaseStreak = async (id, habit_streak) => {
        try {

            yesRef.current.setAttribute("disabled", "disabled");

            if ((habit_streak + 1) === habit.habit_duration) {
                alert("Congratulation now you can claim your reward of: " + habit.habit_reward);
                return;
            }
            else if (habit.habit_streak !== habit.habit_duration) {
                habit_streak += 1;
            }
            else {
                alert("Congratulation now you can claim your reward of: " + habit.habit_reward);
                return;
            }

            const streak = habit_streak;
            const body = { streak };
            console.log(body);

            const myHeaders = new Headers();

            myHeaders.append("Content-type", "application/json");
            myHeaders.append("token", localStorage.token);

            const res = await fetch(`http://localhost:5000/dashboard/habits/increaseStreak/${id}`, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(body)
            });
            // console.log(res);
            // window.location = "/";
            setHabitsChange(true);
        } catch (err) {
            console.errror(err.message)
        }
    }

    // Function to decrease a streak
    const decreaseStreak = async (id, habit_streak) => {
        try {
            if (habit_streak !== 0)
                habit_streak -= 1;
            else {
                alert("you at least have to complete one day")
                return;
            }

            const streak = habit_streak;
            const body = { streak };

            const myHeaders = new Headers();

            myHeaders.append("Content-type", "application/json");
            myHeaders.append("token", localStorage.token);

            const res = await fetch(`http://localhost:5000/dashboard/habits/decreaseStreak/${id}`, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(body)
            });
            console.log(res);
            // window.location = "/";
            setHabitsChange(true);
        } catch (err) {
            console.errror(err.message)
        }
    }


    return (
        <Fragment>
            <button
                type="button"
                className="btn text-light mr-3 ml-3 mt-2"
                data-toggle="modal"
                data-target={`#id${habit.habit_id}`}
                style={{
                    background: '#6C63FF'
                }}
            >
                Done?
            </button>

            <div className="modal" id={`id${habit_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div >
                                <span className="my-auto h4">
                                    <FontAwesomeIcon className="" style={{
                                        color: '#6c63ff'
                                    }} icon={faBullseye} />
                                </span>

                                <span className="ml-2 h4" >
                                    Have you completed this habit today?
                                </span>
                            </div>
                        </div>

                        <div className="modal-body">
                            <form className="d-flex">
                                <div >
                                    <Button type="button"
                                        className="btn btn-success custom-btn mr-1"
                                        data-dismiss="modal"
                                        ref={yesRef}
                                        onClick={() => { increaseStreak(habit.habit_id, habit.habit_streak) }}>
                                        Yes
                                    </Button>
                                </div>
                                <div>
                                    <button type="button"
                                        data-dismiss="modal"
                                        className="btn custom-btn ms-1"
                                        onClick={() => { decreaseStreak(habit.habit_id, habit.habit_streak) }}>
                                        No
                                    </button>
                                </div>

                            </form>
                        </div>


                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn text-light mr-3 ml-3 mt-2"
                                data-toggle="modal"
                                data-target={`#id${habit.habit_id}`}
                                style={{
                                    background: '#6C63FF'
                                }}
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            </div >
        </Fragment >
    )
}

export default DoneHabit;