import React, { useContext } from "react";
import Searchwcart from "./searchwcart-compontent";
import Commodityfield from "./commodityfield-compontent";
import { useEffect } from "react";
//api集結處
import Getapi from "./apiaxios";
//套用載入動畫
import { CSSTransition, TransitionGroup } from "react-transition-group";
//套用開啟彈出欄 這邊利用context由app抓取狀態
import { JumpContext } from "../App";
import { CommodityContext } from "../App";
import { CurrentContext } from "../top-compontent";

const Homepage = () => {
  //宣告使用context
  const jumpState = useContext(JumpContext);
  const setJump = jumpState[1];
  const CurrentUserset = useContext(CurrentContext);
  const currentUser = CurrentUserset[0];

  //嘗試利用contex model將下方com searcom做成集合抓取使用
  const useComfuncset = useContext(CommodityContext);
  const commodityItem = useComfuncset.commodityItem;
  const setCommodityItem = useComfuncset.setCommodityItem;
  const searchCommodity = useComfuncset.searchCommodity;
  const setSearchCommodity = useComfuncset.setSearchCommodity;
  // const { setSearchCommodity } = useComfuncset; 上面也能改這樣寫

  const aqv = searchCommodity.length;
  useEffect(() => {
    async function getcommodity() {
      try {
        const response = await Getapi.getcommoditydata();
        //這邊一個部分給搜尋使用 保持原始檔案正確
        setCommodityItem(response.data);
        setSearchCommodity(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getcommodity();
  }, [setCommodityItem, setSearchCommodity, aqv]);

  //連結至jump啟動彈出開關
  const tooadd = () => {
    setJump(1);
  };

  const { current } = currentUser ?? "";

  return (
    <div className="container ">
      <Searchwcart
        commodityItem={commodityItem}
        searchCommodity={searchCommodity}
        setCommodityItem={setCommodityItem}
        setSearchCommodity={setSearchCommodity}
      />
      {/* 這邊要載入jump中的彈跳開關 open所以設定jump連節函數*/}
      {current === "sells" && (
        <button className="btn " onClick={tooadd}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-bag-plus-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"
            />
          </svg>
        </button>
      )}

      <div className="row homeitem">
        <TransitionGroup component={null}>
          {/* 讓此div顯示null 不影響其他CSS */}
          {/* 這邊載入動畫 */}
          {commodityItem.map((data) => (
            <CSSTransition
              timeout={300}
              classNames="example"
              key={data.title + data.price}
            >
              <Commodityfield
                data={data}
                key={data.title + data.price}
                setJump={setJump}
                commodityItem={commodityItem}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Homepage;
