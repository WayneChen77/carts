import { useState } from "react";
//這邊是另設置一個model 導入app進行context資料使用
//為 use開頭 後面要接大寫 ex useHa 不能用useha

const useComfunc = () => {
  const [commodityItem, setCommodityItem] = useState([]);
  const [searchCommodity, setSearchCommodity] = useState([]);
  const [cartnumdata, setCartumData] = useState("");
  const [myproductData, setMyproductData] = useState([]);
  return {
    commodityItem,
    setCommodityItem,
    searchCommodity,
    setSearchCommodity,
    cartnumdata,
    setCartumData,
    myproductData,
    setMyproductData,
  };
};
export { useComfunc };
