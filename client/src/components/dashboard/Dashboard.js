import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "./icons/logo.png";
import "./fonts/fonts.css"
import dashboard from "./icons/dashboard.svg";
import "./fonts/fonts.css"
import config from "../../config"


// Components
import InputHabit from "./habits/InputHabit"
import CardListHabit from "./habits/CardListHabit";

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");
    const [allHabits, setAllHabits] = useState([]);
    const [habitsChange, setHabitsChange] = useState(false);

    async function getName() {
        try {
            const response = await fetch(`${config.BASE_BACKEND_URL}/dashboard/`, {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();
            setAllHabits(parseRes);
            setName(parseRes[0].user_name);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getName();
        setHabitsChange(false);
    }, [habitsChange]);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully!", {
            position: toast.POSITION.TOP_CENTER
          });
    }
    return (
        <>
            <div style={{
                background: '#F9F9FF'
            }}>
                {/* Navigation bar */}
                <nav className="navbar navbar-expand-sm navbar-light py-3">
                    <div className="container " >
                        <Link to="/" className="navbar-brand text-dark">
                            <img width="100px" src={logo} alt="logo" />
                        </Link>

                        <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navmenu">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navmenu">
                            <ul className="navbar-nav ms-auto">
                                <li className='nav-item'>
                                    <button class="font" className="btn text-light btn-lg text-sm-start rounded-pill" style={{
                                        background: '#6C63FF'
                                    }} onClick={e => logout(e)}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <section className="text-dark p-5 p-lg-0 ">
                    <div className="container">
                        <div className="d-sm-flex justify-content-center flex-row">
                            <img style={{
                                width: '450px',
                                height: '400px'
                            }} className="img-fluid" src={dashboard} alt="image" />

                            <div className="d-flex justify-content-center flex-column">
                                <h1 class="font" >Welcome, {name}</h1>

                                <div className="mt-5">

                                    <h2 className="mb-4">Get started by adding a habit</h2>
                                    <InputHabit setHabitsChange={setHabitsChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <CardListHabit allHabits={allHabits} setHabitsChange={setHabitsChange} />
            </div>
        </>
    )
}

export default Dashboard;