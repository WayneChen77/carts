import React, { useState } from "react";
import Getapi from "./apiaxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [UserAddress, setUserAddress] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [current, setCurrent] = useState("normal");
  console.log(current);

  const Navigate = useNavigate();
  const handelClickRegister = (e) => {
    e.preventDefault();

    Getapi.register(UserAddress, UserPassword, nickName, current, 0)
      .then((res) => {
        toast.success("註冊完成.", {
          position: "top-right",
        });
        Navigate("/login");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.response.data.msg);
      });
  };

  return (
    <form className="register container shadow" onSubmit={handelClickRegister}>
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
            value={UserPassword}
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
          請使用8個字元以上的英文字母、數字和符號
        </span>
      </div>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="inputName" className="col-form-label mt-3">
            暱稱:
          </label>
        </div>
        <div className="col-auto">
          <input
            type="text"
            id="inputName"
            className="form-control"
            aria-describedby="passwordHelpInline"
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
            placeholder="Your Name"
            required
          />
        </div>
      </div>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="inputType" className="col-form-label mt-3">
            身份:
          </label>
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            value={current}
            onChange={(e) => {
              setCurrent(e.target.value);
            }}
            aria-label="Default select example"
          >
            <option value="normal">客戶</option>
            <option value="sells">廠商</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        註冊
      </button>
    </form>
  );
};

export default Register;
