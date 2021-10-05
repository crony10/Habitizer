import React, { Fragment, useState } from "react";


const AddHabit = ({ habit_name,setHabitsChange }) => {
    // console.log("aave che?");

    const [habit_duration, setDuration] = useState(0);
    const [habit_reward, setReward] = useState("");

    const add = async() => {
        // console.log({habit_name},{habit_duration},{reward});

        try {

            const myHeaders = new Headers();

            myHeaders.append("Content-Type","application/json");
            myHeaders.append("token",localStorage.token);

            const name = habit_name;
            const duration  = habit_duration;
            const reward = habit_reward;

            if(reward.length===0){
                alert("Don't hold your self back!Add some reward for yourself.")
            }

            const body = { name, reward, duration };
            console.log(body);
            const response = await fetch("http://localhost:5000/dashboard/habits/", 
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
            // setHabit("");
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <Fragment>
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal">
                Add
            </button>

            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">{habit_name}</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            <form className="d-flex">
                                <div>
                                    <label htmlFor="Duration">🔥Duration(In days)</label>
                                    <input type="number"
                                        id="Duration"
                                        placeholder="0"
                                        onChange={element => setDuration(element.target.value)}
                                    />
                                </div>


                                <div>
                                    <label htmlFor="Reward">🎁Reward</label>
                                    <input type="text"
                                        id="Reward"
                                        size="25"
                                        placeholder="Enter any reward for yourself"
                                        onChange={element => setReward(element.target.value)} />
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button data-dismiss="modal"
                                type="button"
                                class="btn btn-success"
                                onClick={() => add(habit_name)}>Add</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AddHabit;