import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const axios = require("axios");

const Register = () => {
  const [details, setDetails] = useState({
    name: "",
    password: "",
    phone: "",
    address: "",
  });
  const history = useHistory();
  const saveToken = async () => {
    const body = { ...details };
    const { data } = await axios.post(
      "http://localhost:5000/user/signup",
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
      <input
        placeholder="전화번호"
        name="phone"
        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
      ></input>
      <input
        placeholder="주소"
        name="address"
        onChange={(e) => setDetails({ ...details, address: e.target.value })}
      ></input>
      <button onClick={saveToken}>가입하기</button>
    </>
  );
};

export default Register;
