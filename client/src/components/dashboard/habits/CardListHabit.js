import React, { Fragment, useState, useEffect } from "react";
import EditHabit from "./EditHabit";
import Card from "react-bootstrap/Card";
import DoneHabit from "./DoneHabit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire, faBullseye, faGift } from "@fortawesome/free-solid-svg-icons"
import "./fonts/fonts.css"
import "../../../assets/css/spinner.css"

const CardListHabit = ({ allHabits, setHabitsChange }) => {
    const [habits, setHabits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [habitLoading,setHabitLoading] = useState("")
    console.log("habitloading: ",habitLoading)

    useEffect(() => {
        setHabits(allHabits);
    }, [allHabits]);

    const CardListItem = props => {
        return (
            <Fragment>
                <Card className="d-inline-flex col-example shadow-lg p-4 rounded" style={{
                    width: '20rem',
                    margin: "20px",
                    background: '#ffffff'
                }} >

                    {
                       (  (`loading-${props.habit.habit_id}`==habitLoading)) ? (
                            <span
                                class="spinner-border spinner-border-sm mr-2 "
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <Card.Body class="cards">
                                <Card.Header style={{ background: '#ffffff' }} className="mb-3">
                                    <div>
                                        <span className="h4">
                                            <FontAwesomeIcon style={{
                                                color: '#6c63ff'
                                            }} icon={faBullseye} />
                                        </span>
                                        <span className="ml-2 h4" >
                                            {props.habit.habit_name}
                                        </span >
                                    </div>
                                </Card.Header>

                                <Card.Text className="mb-2 ml-3 mt-1">
                                    <div>
                                        <span className="my-auto h4">
                                            <FontAwesomeIcon style={{
                                                color: '#6c63ff'
                                            }} icon={faFire} />
                                        </span>

                                        <span className="ml-2 h4" >
                                            {props.habit.habit_streak}
                                        </span >
                                    </div>
                                </Card.Text>

                                <Card.Text className="mb-2 ml-3 mt-1">
                                    <div>
                                        <span className="my-auto h4">
                                            <FontAwesomeIcon className="" style={{
                                                color: '#6c63ff'
                                            }} icon={faGift} />
                                        </span>

                                        <span className="ml-2 h4" >
                                            {props.habit.habit_reward}
                                        </span >
                                    </div>
                                </Card.Text>

                                <DoneHabit 
                                habit={props.habit} 
                                setHabitsChange={setHabitsChange} 
                                setIsLoading={setIsLoading}
                                setHabitLoading={setHabitLoading}
                                />


                                <EditHabit
                                    habit={props.habit}
                                    setHabitsChange={setHabitsChange}
                                    setIsLoading={setIsLoading}
                                />



                            </Card.Body>
                        )
                    }

                </Card>
                


            </Fragment>
        );
    };
    return (
        <div className="container">
            <ul style={{ listStyleType: "none" }}>
                {habits.length !== 0 && habits[0].habit_id !== null &&
                    habits?.map(habit => {
                        return <CardListItem 
                        habit={habit} 
                        key={habit.habit_id} 
                        />;
                    })}
            </ul>
        </div>
    )
}

export default CardListHabit;