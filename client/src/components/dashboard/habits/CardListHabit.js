import React, { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { CardContent, CardMedia, Typography, CardActionArea, ButtonBase } from "@material-ui/core"
import EditHabit from "./EditHabit";
import { Modal } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
// import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import DoneHabit from "./DoneHabit";

const CardListHabit = ({allHabits,setHabitsChange}) => {
    // console.log(allHabits);

    const [habits, setHabits] = useState([]);
    
    useEffect(() => {
        setHabits(allHabits);
    }, [allHabits]);

    const CardListItem = props => {
        return (
            <Fragment>
                <Card style={{
                    width: '18rem',
                    margin: "20px"
                }} className="d-inline-flex p-2 col-example">
                    <Card.Body>
                        <Card.Title>{"🎯" + props.habit.habit_name}</Card.Title>
                        <Card.Text>
                            {"🔥" + props.habit.habit_streak}
                            {"🎁" + props.habit.habit_reward}
                        </Card.Text>
                        <EditHabit habit={props.habit} setHabitsChange={setHabitsChange} />

                        <DoneHabit  habit={props.habit} setHabitsChange={setHabitsChange} />


                    </Card.Body>
                </Card>
            </Fragment>
        );
    };
    return (
        <ul style={{ listStyleType: "none" }}>
            {habits.length !== 0 && habits[0].habit_id !== null &&
            habits.map(habit => {
                return <CardListItem habit={habit} key={habit.habit_id} />;
            })}
        </ul>
    )
}

export default CardListHabit;