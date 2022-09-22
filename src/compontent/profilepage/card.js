import React, { useContext } from "react";

import { PatchContext } from "../../App";

import { CurrentContext } from "../../top-compontent";

const Card = ({ data, setJump }) => {
  const {
    title,
    img,
    describe,
    suggestprice,
    price,
    confirm,
    userEmail,
    quantity,
    userId,
  } = data;
  const patchhataState = useContext(PatchContext);
  const setPatchData = patchhataState[1];
  const patchData = patchhataState[0];
  const currentUserset = useContext(CurrentContext);
  const currentUser = currentUserset[0];
  const { ID } = currentUser ?? "";

  const handelClicktoPatch = () => {
    setJump(3);
    if (patchData) {
      setPatchData(data);
    }
  };

  return (
    <div className="card  m-2" style={{ width: "16rem" }}>
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
        {userId && (
          <div>
            <p className="card-text fs-5">{describe}</p>
            <p className="card-text fs-4 suggestprice">
              建議售價${suggestprice}
            </p>
          </div>
        )}
        <p className="card-text fs-4">賣場特價${price}</p>
        {userEmail && (
          <div>
            <p className="card-text fs-4">客戶名稱:{userEmail}</p>
            <p className="card-text fs-4">選購數量:{quantity}</p>
          </div>
        )}

        {/* 售完處理購物車 */}
        {/* {confirm ? (
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
          </svg> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default Card;
