import React, { useContext } from "react";
import { toast } from "react-toastify";
import Getapi from "./apiaxios";
import { PatchContext } from "../App";
import { CommodityContext } from "../App";
import { CurrentContext } from "../top-compontent";
import { useNavigate } from "react-router-dom";

//抓取id去patch

const Commodityfield = ({ data, setJump, commodityItem }) => {
  const { id, title, img, describe, suggestprice, price, confirm } = data;

  const Navigate = useNavigate();
  // const [patchdata, setPatchData] = useContext(PatchContext);
  //避免系統宣告資料宣告未使用 另外將函式資料抓出使用如下
  // const [patchdata, setPatchData] = useContext(PatchContext);
  const patchhataState = useContext(PatchContext);
  const setPatchData = patchhataState[1];
  const patchData = patchhataState[0];
  const currentUserset = useContext(CurrentContext);
  const currentUser = currentUserset[0];

  const handelClicktoPatch = () => {
    setJump(3);
    if (patchData) {
      setPatchData(data);
    }
  };

  const handelClickAddCart = async () => {
    if (!currentUser) {
      return Navigate("/login");
    }
    const user = JSON.parse(localStorage.getItem("usertoken")) || {};
    const res = await Getapi.getcart(id, user.email);
    const carts = res.data;
    if (carts && carts.length > 0) {
      const cart = carts[0];
      cart.quantity = cart.quantity + 1;
      //cart.id =品項ID id=commodityId
      //這邊更新設置直接抓取cart.id 不要用?commodity="ID"抓賄抓不到
      await Getapi.putcart(cart.id, cart)
        .then((res) => {})
        .catch((e) => {
          console.log(e);
        });
    } else {
      const user = JSON.parse(localStorage.getItem("usertoken"));
      const newcart = {
        commodityId: id,
        title,
        img,
        describe,
        price,
        quantity: 1,
        userEmail: user.email,
        confirm,
      };
      Getapi.addcart(newcart);
    }
    toast.info("已加入購物車");
    //修改顯示數字
    const _cartnumdata = cartnumdata + 1;
    setCartumData(_cartnumdata);
  };
  const useComfuncset = useContext(CommodityContext);
  const { setCartumData } = useComfuncset;
  const { cartnumdata } = useComfuncset;

  //抓取資料是否顯示修改區塊

  const { ID } = currentUser ?? "";

  return (
    <div className="card  m-2">
      <img
        className="card-img-top"
        src={img}
        alt={title}
        style={{ height: "10rem" }}
      />
      {/* 無照片處理 */}
      <div className={img ? "none" : "confirmnone"}>
        <p>NA</p>
      </div>
      {/* 此div為售完處理 */}
      <div className={confirm ? "none" : "confirmnone"}>
        <p>已售完</p>
      </div>
      {/* 以上div為售完處理 */}
      <div className="card-body">
        <h5 className="card-title fs-3">{title}</h5>
        {/* 調整刪除按鈕 */}
        {ID === data.userId && (
          <button
            onClick={handelClicktoPatch}
            className="btn btn-outline-dark patchBtn me-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        )}

        <p className="card-text fs-5">{describe}</p>
        <p className="card-text fs-4 suggestprice">建議售價${suggestprice}</p>
        <p className="card-text fs-4">賣場特價${price}</p>

        {/* 售完處理購物車 */}
        {confirm ? (
          <button href="#" className="btn" onClick={handelClickAddCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-cart-check shopitem"
              viewBox="0 0 16 16"
            >
              <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </button>
        ) : (
          <svg
            onClick={() => toast.warning("商品補貨中")}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-cart-x-fill shopitemnone"
            viewBox="0 0 16 16"
          >
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Commodityfield;
