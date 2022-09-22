import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Getapi from "./apiaxios";
import { CurrentContext } from "../top-compontent";

const Login = () => {
  const [UserAddress, setUserAddress] = useState("");
  const [UserPassword, setUserPassword] = useState("");

  const currentUserset = useContext(CurrentContext);
  const setCurrentUser = currentUserset[1];

  const Navigate = useNavigate();
  const handelClickRegister = (e) => {
    e.preventDefault();
    // const newUser = {
    //   UserAddress: UserAddress,
    //   UserPassword: UserPassword,
    // };
    // console.log(newUser);
    Getapi.login(UserAddress, UserPassword)
      .then((res) => {
        const logToken = res.data;
        if (logToken && logToken.JwToken.length > 0) {
          localStorage.setItem("usertoken", JSON.stringify(logToken));
          toast.success("登入成功", { position: "top-right" });
          setCurrentUser(Getapi.getcurrent());
          Navigate("/profile/userprofile");
        }
      })
      .catch((e) => {
        toast.error(e.response.data.msg);
      });
  };

  return (
    <form className="login container shadow" onSubmit={handelClickRegister}>
      <div className="row g-3 align-items-center mt-1">
        <div className="col-auto">
          <label htmlFor="exampleInputEmail1" className="form-label">
            帳號:
          </label>
        </div>
        <div className="col-auto">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setUserAddress(e.target.value);
            }}
            placeholder="example@.ex.com"
            required
          />
        </div>

        <span id="emailHelp" className="form-text">
          我們永遠不會與其他人分享您的電子郵件。
        </span>
      </div>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="inputPassword6" className="col-form-label mt-3">
            密碼:
          </label>
        </div>
        <div className="col-auto">
          <input
            type="password"
            id="inputPassword6"
            className="form-control"
            aria-describedby="passwordHelpInline"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            placeholder="password"
            minLength={8}
            maxLength={20}
            required
          />
        </div>

        <span id="passwordHelpInline" className="form-text">
          請使用8個字元以上的英文字母、數字和符號。
        </span>
      </div>
      <button type="submit" className="btn btn-primary">
        登入
      </button>
    </form>
  );
};

export default Login;
