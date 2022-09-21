import React from "react";
import { useContext } from "react";
//套用開啟彈出欄 這邊利用context由app抓取狀態
import { JumpContext } from "../App";
//輸入彈窗內容
import Addcommofity from "./addcommofity-component";
import Patchcommofity from "./patchcommofity-component";
const Jump = () => {
  // app處抓取UserContext資料處理jump
  const [jump, setJump] = useContext(JumpContext);

  //我是css樣式
  const contJump = {
    0: " wrapper",
    1: "wrapper wrapperactive",
    3: "wrapper wrapperactive",
  };

  const close = () => {
    setJump(0);
  };

  return (
    <div className={contJump[jump]}>
      <div className="over-layer" onClick={close}></div>
      <div className="panel">
        <div className="head">
          <span className="close" onClick={close}>
            X
          </span>
          <p className="has-text-contered">後台管理系統</p>
        </div>

        {jump === 1 && <Addcommofity setJump={setJump} />}
        {jump === 3 && <Patchcommofity setJump={setJump} />}
      </div>
    </div>
  );
};

export default Jump;
