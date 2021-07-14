import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const axios = require("axios");

const Login = () => {
  const [details, setDetails] = useState({ name: "", password: "" });
  const history = useHistory();

  const saveToken = async () => {
    const body = { ...details };
    const { data } = await await axios.post(
      "http://localhost:5000/user/login",
      body
    );

    if (data) {
      window.localStorage.setItem("Token", data.token);
      history.push("/");
    }
  };

  return (
    <>
      <input
        placeholder="이름"
        name="name"
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
      ></input>
      <input
        placeholder="비밀번호"
        name="password"
        onChange={(e) => setDetails({ ...details, password: e.target.value })}
      ></input>
      <button onClick={saveToken}>완료</button>
    </>
  );
};

export default Login;
