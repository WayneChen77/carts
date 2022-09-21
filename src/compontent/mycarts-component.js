import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Getapi from "./apiaxios";
import Cartsitem from "./carts/cartsitem";

//購物車數量
const Mycarts = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    Getapi.getcarts()
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  //總金額
  const [totalcarprice, setTotalCarprice] = useState();
  const proptotalprice = () => {
    setTotalCarprice(
      data.reduce((acc, item) => (acc += item.quantity * Number(item.price)), 0)
    );
  };
  //結帳
  //這邊假資料刪除須 將資料放進陣列大改 或前端跑for抓取id再將id放進來
  const handelClickCheckout = async () => {
    const res = (await Getapi.getcarts()) || {};

    if (res.data.length === 0) {
      alert("您尚未選購商品");
      return;
    } else {
      const _res = res.data;
      const ga = _res.map((d) => d.id);
      for (let i = 0; i < res.data.length; i++) {
        Getapi.deleteallcarts(ga[i]);
      }
      alert("結帳完程即將返回首頁");
      Navigate("/");
    }
  };

  return (
    <div className="container mycarts">
      <table className="  caption-top table table-light table-striped table-hover">
        <caption>MyCarts</caption>

        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">品名</th>
            <th className="comtype" scope="col">
              數量
            </th>
            <th scope="col">金額</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
          {data.map((datas, index) => (
            <Cartsitem
              setData={setData}
              datas={datas}
              data={data}
              index={index}
              key={datas.id}
              proptotalprice={proptotalprice}
              setTotalCarprice={setTotalCarprice}
            />
          ))}

          <tr>
            <th scope="row" colSpan="1" className="comtype"></th>

            <td colSpan="1">總價</td>
            <td colSpan="1"></td>
            <td>
              {/* reduce 資料夾中 acc為預設=後面的0 item為data陣列裡的資料 他會將每個操作後相加回傳 */}
              ${totalcarprice}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row"></th>
            <td colSpan="1" className="comtype"></td>
            <td colSpan="1"></td>
            <td
              className="table-dark checkbutton"
              onClick={handelClickCheckout}
            >
              結帳
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Mycarts;
