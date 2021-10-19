import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "./icons/logo.png";
import register from "./icons/register.svg";
import { css } from 'glamor';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Registered Successfully", {
          position: toast.POSITION.TOP_CENTER,
          // className: 'toast-container',
          progressClassName: css({
            background: '#6c63ff',
          }),
        });
        // toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
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
                <Link to="/login" class="nav-link text-dark font" ><h4 style={{ color: '#000000' }}>Sign in</h4></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section>
        <div className="container py-2">
          <div className="d-sm-flex justify-content-center">
            <div className="pr-5">
              <img style={{
                width: '450px',
                height: '400px'
              }} className="img-fluid" src={register} alt="image" />

            </div>

            <div style={{
              background: '#F0EFFF'
            }}>
              <h1 className="mt-5 text-center">Register</h1>
              <form onSubmit={onSubmitForm}
                className="m-5">
                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={e => onChange(e)}
                  className="form-control my-3"
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={e => onChange(e)}
                  className="form-control my-3"
                />
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Name"
                  onChange={e => onChange(e)}
                  className="form-control my-3"
                />
                <button style={{
                  background: '#6C63FF'
                }} className="btn btn-block rounded-pill text-light">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}
        className="m-5">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button style={{
          background: '#6C63FF'
        }} className="btn btn-block rounded-pill text-light">Submit</button>
      </form> */}
    </Fragment>
  );
};

export default Register