import React,{Fragment,useState} from "react";
import AddHabit from "./AddHabit";

const InputHabit = ({setHabitsChange})=>{

    const [habit,setHabit] = useState("Sample habit");

    return(
        <Fragment>
            <h1 className="text-center my-5">Habitizer</h1>
            <form className="d-flex">
                <input
                type="text"
                className="form-control"
                placeholder="Add a habit"
                onChange = {element=>setHabit(element.target.value)}
                />
                <AddHabit habit_name={habit} setHabitsChange={setHabitsChange}/>
            </form>
            
        </Fragment>
    )
}

export default InputHabit;