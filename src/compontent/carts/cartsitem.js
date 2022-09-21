import React, { useState, useEffect } from "react";
import Getapi from "../apiaxios";
import { toast } from "react-toastify";

const Cartsitem = ({
  datas,
  index,
  setData,
  data,
  proptotalprice,
  setTotalCarprice,
}) => {
  //購物車數量根價格隨時更正
  const [quantity, setQuantity] = useState(datas.quantity);
  const [carprice, setCarprice] = useState(
    datas.quantity * Number(datas.price)
  );
  //修改數量
  const handelChangeQuantit = (e) => {
    setQuantity(Number(e.target.value));
  };
  const handelClickAdd = () => {
    const a = quantity + 1;
    setQuantity(a);
  };
  const handelClickSup = () => {
    const b = quantity - 1;
    setQuantity(b);
  };
  useEffect(() => {
    Getapi.patchcar(datas.id, { quantity: quantity })
      .then()
      .catch((e) => {
        console.log(e);
      });
    datas.quantity = quantity;
    const _data = [...data];
    const _index = _data.findIndex((p) => p.id === datas.id);
    _data.splice(_index, 1, datas);
    setData(data);

    setCarprice(datas.quantity * Number(datas.price));
    proptotalprice();
  }, [quantity, data, datas, proptotalprice, setData]);

  //刪除
  const handelClickDelete = () => {
    Getapi.deletecarts(datas.id);
    const _data = [...data];
    const a = _data.filter((p) => {
      return p.id !== datas.id;
    });
    setData(a);

    if (a.length === 0) {
      setTotalCarprice(0);
    }
    toast.error("移除購物車");
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>
        {datas.title}
        <div className="phonetype">
          <span className="number">数量</span>
          <span>
            <input
              type="number"
              className="input-num"
              id="input-num"
              onChange={handelChangeQuantit}
              value={quantity}
            />
          </span>
        </div>
      </td>
      <td className="comtype">
        {/* 這邊用寫出一個加減按鈕放入目前商品數量中 */}
        <ul className="btn-numbox">
          {/* <li>
            <span className="number">数量</span>
          </li> */}
          <li>
            <ul className="count">
              <li>
                <span
                  id="num-jian"
                  className="num-jian"
                  onClick={handelClickSup}
                >
                  -
                </span>
              </li>
              <li>
                <input
                  type="number"
                  className="input-num"
                  id="input-num"
                  onChange={handelChangeQuantit}
                  value={quantity}
                />
              </li>
              <li>
                <span id="num-jia" className="num-jia" onClick={handelClickAdd}>
                  +
                </span>
              </li>
            </ul>
          </li>
          {/* <li>
            <span className="kucun">（库存:54）</span>
          </li> */}
        </ul>
      </td>

      <td>
        {carprice}
        <button className="btn delebtn" onClick={handelClickDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Cartsitem;
