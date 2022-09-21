import React, { useState, useContext } from "react";
import Getapi from "./apiaxios";
import { PatchContext } from "../App";
import { CommodityContext } from "../App";

//導入彈出效果
import { toast } from "react-toastify";

const Patchcommofity = ({ setJump }) => {
  //引入總資料檔案 對比
  const useComfuncSet = useContext(CommodityContext);
  const commodityItem = useComfuncSet.commodityItem;
  const { setCommodityItem } = useComfuncSet;
  const { setSearchCommodity } = useComfuncSet;
  const { searchCommodity } = useComfuncSet;
  const { setMyproductData } = useComfuncSet;
  const { myproductData } = useComfuncSet;

  //避免系統宣告資料宣告未使用 另外將函式資料抓出使用如下
  const patchhataState = useContext(PatchContext);
  const patchdata = patchhataState[0];
  const setPatchData = patchhataState[1];
  const [title, setTitle] = useState(patchdata.title);
  const [suggestprice, setSuggestprice] = useState(patchdata.suggestprice);
  const [price, setPrice] = useState(patchdata.price);
  const [describe, setDescribe] = useState(patchdata.describe);
  const [number, setNumber] = useState(patchdata.number);
  const [confirm, setConfirm] = useState(patchdata.confirm);
  const [img, setImg] = useState(patchdata.img ?? "");
  const { userId } = patchdata;
  const { id } = patchdata;

  const handelClickShelf = (e) => {
    e.preventDefault();
    Getapi.patchcommoditydata(
      id,
      title,
      img,
      describe,
      suggestprice,
      price,
      confirm,
      userId,
      number
    )
      .then((res) => {
        const newdata = {
          id,
          title,
          img,
          describe,
          suggestprice,
          price,
          confirm,
          userId,
          number,
        };
        const _commodityItem = [...commodityItem];
        const _index = _commodityItem.findIndex((p) => p.id === id);
        _commodityItem.splice(_index, 1, newdata);
        const _searchCommodity = [...searchCommodity];
        _searchCommodity.splice(_index, 1, newdata);

        const _myproductData = [...myproductData];
        const _index1 = _myproductData.findIndex((p) => p.id === id);

        _myproductData.splice(_index1, 1, newdata);
        setCommodityItem(_commodityItem);
        setSearchCommodity(_searchCommodity);
        setMyproductData(_myproductData);

        setPatchData({});
        setJump(0);
        toast.info("修改成功", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    // const commodityItem = useComfuncSet.commodityItem;
    // const { setCommodityItem } = useComfuncSet;
    // const { setSearchCommodity } = useComfuncSet;
    //導入完整資料對比 如不同刷新
    //這邊設定渲染新資料 可能被更改的此單一資料 dataId = patchdata.id;
  };
  const handelcheck = () => {
    const Confirm = !confirm;
    setConfirm(Confirm);

    if (Confirm) {
      toast.info("物品上架", {});
    } else {
      toast.info("物品下架");
    }
  };
  //刪除
  const handelClickDelete = () => {
    Getapi.deletecomditydata(id);

    const _commodityItem = [...commodityItem];
    const _searchCommodity = [...searchCommodity];
    const a = _commodityItem.filter((p) => {
      return p.id !== patchdata.id;
    });
    const b = _searchCommodity.filter((p) => p.id !== id);
    //兩個寫法對比
    const _myproductData = [...myproductData];
    const c = _myproductData.filter((p) => p.id !== id);
    setSearchCommodity(b);
    setCommodityItem(a);
    setMyproductData(c);
    toast.error("物品刪除");
    setJump(0);
  };

  return (
    <div className="p-2">
      <form className="row g-3">
        <div className="col-6 ">
          <label htmlFor="inputTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTitle"
            placeholder={title}
            required
            minLength={1}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputImg" className="form-label">
            Img
          </label>
          <input
            type="url"
            className="form-control"
            id="inputImg"
            onChange={(e) => setImg(e.target.value)}
            value={img}
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
            value={suggestprice}
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
            value={price}
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
            value={describe}
          />
        </div>

        <div className="col-md-4 col-6">
          <label htmlFor="inputState" className="form-label">
            商品數量:
          </label>
          <input
            id="inputState"
            className="form-select"
            type="number"
            required
            min={1}
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handelClickShelf}
          >
            修改
          </button>
          {/* cssin_jump.scss */}
          <button
            type="button"
            className="btn btn-primary delebutton"
            onClick={handelClickDelete}
          >
            刪除
          </button>
          {/* 以下為上架開關 */}
          <div className="form-check form-switch">
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckChecked"
            >
              上架
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
              onClick={handelcheck}
              defaultChecked={confirm}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Patchcommofity;
