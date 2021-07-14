import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ItemArray from "../components/ItemArray";

const axios = require("axios");

const Home = () => {
  const [items, setItems] = useState([]);

  const history = useHistory();
  const getToken = window.localStorage.getItem("Token");

  useEffect(() => {
    const fetchDataItems = async () => {
      const { data } = await axios.get("http://localhost:5000/item/list");
      setItems(data);
    };
    fetchDataItems();
  }, [getToken]);

  const handleLogout = () => {
    window.localStorage.removeItem("Token");
    window.localStorage.removeItem("userInfoWithCoupons");
    history.push("/");
  };

  return (
    <>
      <div>스토리시티 과제</div>
      {getToken ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <>
          <Link to="/login">
            <button>로그인</button>
          </Link>
          <Link to="/register">
            <button>회원가입</button>
          </Link>
        </>
      )}

      <div>
        {items.map((item) => (
          <ItemArray key={item.id} item={item} />
        ))}
      </div>
      {getToken ? (
        <Link to="/cart">
          <div>장바구니</div>
        </Link>
      ) : (
        <Link to="/login">
          <div>장바구니</div>
        </Link>
      )}
    </>
  );
};

export default Home;
