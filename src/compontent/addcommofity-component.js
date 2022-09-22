import React, { useState, useContext } from "react";
import Getapi from "./apiaxios";

//導入彈出效果
import { toast } from "react-toastify";
import { CommodityContext } from "../App";
import { CurrentContext } from "../top-compontent";

const Addcommofity = ({ setJump }) => {
  //引入總資料檔案 對比
  const useComfuncSet = useContext(CommodityContext);
  const commodityItem = useComfuncSet.commodityItem;
  const { setCommodityItem } = useComfuncSet;
  const { setSearchCommodity } = useComfuncSet;
  const { searchCommodity } = useComfuncSet;
  const { setMyproductData } = useComfuncSet;
  const { myproductData } = useComfuncSet;

  const CurrentUserset = useContext(CurrentContext);
  const currentUser = CurrentUserset[0];
  const [title, setTitle] = useState("");
  const [suggestprice, setSuggestprice] = useState(0);
  const [price, setPrice] = useState(0);
  const [describe, setDescribe] = useState("商品概述");
  const [number, setNumber] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [img, setImg] = useState(null);

  const handelClickShelf = () => {
    setConfirm(true);
    //這邊回首頁不會更新要設定useffect
  };
  const handelSubmitShelf = (e) => {
    e.preventDefault();
    // let commod = {
    //   id: 1,
    //   title: title,
    //   img: img,
    //   alt: "Card image cap",
    //   describe: describe,
    //   suggestprice: suggestprice,
    //   price: price,
    //   confirm: confirm,
    //   sellerId: 1,
    //   number: number,
    // };
    //這邊userId用來區分產品提供者 賣方
    const userId = currentUser.ID;
    Getapi.postcommoditydata(
      title,
      img,
      describe,
      suggestprice,
      price,
      confirm,
      userId,
      number
    );
    //導入資料 新增資料刷新
    const newdata = {
      title: title,
      img: img,
      describe: describe,
      suggestprice: suggestprice,
      price: price,
      confirm: confirm,
      userId: userId,
      number: number,
    };
    const _commodityItem = [...commodityItem];
    const _searchCommodity = [...searchCommodity];
    const _myproductData = [...myproductData];
    _myproductData.push(newdata);
    _commodityItem.push(newdata);
    _searchCommodity.push(newdata);
    setCommodityItem(_commodityItem);
    setSearchCommodity(_searchCommodity);
    setMyproductData(_myproductData);

    setJump(0);
    toast.info("上架完成", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="p-2">
      <form className="row g-3" onSubmit={handelSubmitShelf}>
        <div className="col-6 ">
          <label htmlFor="inputTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTitle"
            placeholder="商品名稱"
            required
            minLength={1}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputState" className="form-label">
            商品數量:
          </label>
          <input
            id="inputState"
            className="form-control"
            type="number"
            required
            min={1}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="col-6">
          <label htmlFor="inputSuggestprice" className="form-label">
            Suggestprice:
          </label>
          <input
            type="number"
            className="form-control"
            id="inputSuggestprice"
            placeholder="市售價格"
            onChange={(e) => setSuggestprice(e.target.value)}
            min={0}
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputPrice" className="form-label">
            Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="inputPrice"
            placeholder="賣場特價"
            onChange={(e) => setPrice(e.target.value)}
            required
            min={0}
          />
        </div>
        <div className="col-lg-12 col-6">
          <label htmlFor="inputDescribe" className="form-label">
            Describe:
          </label>
          <textarea
            type="text"
            className="form-control"
            id="inputDescribe"
            placeholder="商品簡略介紹"
            onChange={(e) => setDescribe(e.target.value)}
          />
        </div>
        <div className="col-12 col-sm-6">
          <label htmlFor="inputImg" className="form-label">
            Img
          </label>
          <input
            type="url"
            className="form-control"
            id="inputImg"
            onChange={(e) => setImg(e.target.value)}
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary "
            onClick={handelClickShelf}
          >
            上架
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addcommofity;
