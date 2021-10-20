import React, { useState } from "react";
import { Link } from "react-router-dom";
import r1 from "./icons/r1.svg";
import create_habit from "./icons/create_habit.svg";
import track_habit from "./icons/track_habit.svg";
import reward from "./icons/reward.svg";
import time from "./icons/time.svg";
import bg1 from "./icons/bg1.png";
import "./fonts/fonts.css"
import logo from "./icons/logo.png";


const Landing = () => {
    return (
        <>
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
                                <a class="font" href="#features" className="nav-link text-dark"><h4>Features</h4></a>
                            </li>
                            <li className='nav-item'>
                                <Link  to="/login" class="font" className="nav-link text-dark" ><h4 style={{ color: '#6C63FF' }}>Sign in</h4></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero section */}
            <section className=" text-light p-5 p-lg-0 text-center text-sm-start">
                <div className="container">
                    <div className="d-sm-flex align-items-center justify-content-between">
                        <div>
                            <h1 class="font" style={{ color: '#000000' }} >Welcome to <span style={{ color: '#6C63FF' }}>Habitizer</span> </h1>
                            <p class="font" className="lead text-dark">
                                Sign in and start building your dream habits
                            </p>
                            <Link to="/register" className="btn text-light btn-lg text-sm-start rounded-pill" style={{
                                background: '#6C63FF'
                            }}>Register</Link>
                        </div>
                        <img className="img-fluid w-50 d-none animated d-sm-block" src={r1} alt="image" />
                    </div>
                </div>

            </section>

            {/* Features Section */}
            <div class="wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#A9A5FF" fillOpacity="1" d="M0,64L26.7,74.7C53.3,85,107,107,160,128C213.3,149,267,171,320,176C373.3,181,427,171,480,144C533.3,117,587,75,640,80C693.3,85,747,139,800,149.3C853.3,160,907,128,960,101.3C1013.3,75,1067,53,1120,74.7C1173.3,96,1227,160,1280,181.3C1333.3,203,1387,181,1413,170.7L1440,160L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
                <section className="text-light" style={{
                    background: '#A9A5FF'
                }} id="features">

                    <div className="container column d-flex justify-content-center">
                        <div className="row text-center">
                            <div className="col-sm">
                                <h1 class="font">Features</h1>
                            </div>
                        </div>
                    </div>



                    <div className="container  column d-flex justify-content-center">
                        <div className="row text-center mt-5 ">
                            <div className="col-sm p-5">
                                <img className="img-fluid w-70" src={create_habit} alt="some image" />
                                <h1>Create a Habit</h1>
                                <p>Make a habit that you want to conquer</p>
                            </div>

                            <div className="col-sm p-5">
                                <img className="img-fluid w-70" src={time} alt="some image" />
                                <h1>Set time period</h1>
                                <p>Set how many days you want the habit to be tracked</p>
                            </div>
                        </div>
                    </div>


                    <div className="container column d-flex justify-content-center">
                        <div className="row text-center mb-3">

                            <div className="col-sm p-5">
                                <img className="img-fluid w-70 pt-5" src={track_habit} alt="some image" />
                                <h1 className="pt-2">Track your habit</h1>
                                <p>Follow the habit and keep that streak counter increasing daily</p>
                            </div>

                            <div className="col-sm p-5">
                                <img className="img-fluid w-70" src={reward} alt="some image" />
                                <h1>Get Rewards</h1>
                                <p>Grab the personlised reward for the completion of every habit</p>
                            </div>


                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Landing;