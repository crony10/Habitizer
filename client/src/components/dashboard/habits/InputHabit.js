import React,{Fragment,useState} from "react";
import AddHabit from "./AddHabit";

const InputHabit = ({setHabitsChange})=>{

    const [habit,setHabit] = useState("Sample habit");

    return(
        <Fragment>
            <form className="d-flex mb-5">
                <input 
                type="text"
                className="form-control mr-2"
                placeholder="Add a habit"
                onChange = {element=>setHabit(element.target.value)}
                />
                <AddHabit habit_name={habit} setHabitsChange={setHabitsChange}/>
            </form>
            
        </Fragment>
    )
}

export default InputHabit;