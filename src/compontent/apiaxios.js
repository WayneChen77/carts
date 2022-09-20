import axios from "axios";

const api_url = "http://localhost:8000/api/";

// axios 配置
// axios.defaults.baseURL = "/";

// http request 攔截器
// const instance = axios.create({
//   baseURL: api_url + "carts",
// });
// const uu = "http://localhost:8000/carts";
axios.interceptors.request.use(
  (config) => {
    let tokens = JSON.parse(localStorage.getItem("usertoken"));
    if (tokens) {
      //       // 判斷是否存在token，如果存在的話，則每個http header都加上token
      const tokensa = tokens.JwToken;
      const token = JSON.stringify(tokensa);
      config.headers.authorization = `bearer ${token}`; // 根據實際情況自行修改
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

class Getapi {
  //個人使用者區塊
  //sells'上架商品這邊抓不到 因為user是另外設定的 json很尷尬
  // getmyproduct(id) {
  //   return axios.get(api_url + `users${id}/?_embed=commodities`);
  // }
  //這邊用另外方法取得商品資料後 載用商品取得買家資料
  getmyclient(id) {
    return axios.get(api_url + `commodities/${id}/?_embed=carts`);
  }

  //商品區塊
  getcommoditydata() {
    return axios.get(api_url + "commodities");
  }
  // _embed取得下方關聯資料 _expand取得上級資料
  gettest() {
    return axios.get(api_url + "sellers?_embed=commodities");
  }
  postcommoditydata(
    title,
    img,
    describe,
    suggestprice,
    price,
    confirm,
    userId,
    number
  ) {
    return axios.post(api_url + "commodities", {
      title,
      img,
      describe,
      suggestprice,
      price,
      confirm,
      userId,
      number,
    });
  }
  patchcommoditydata(
    id,
    title,
    img,
    describe,
    suggestprice,
    price,
    confirm,
    userId,
    number
  ) {
    return axios.patch(api_url + "commodities/" + id, {
      title,
      img,
      describe,
      suggestprice,
      price,
      confirm,
      userId,
      number,
    });
  }

  deletecomditydata(id) {
    return axios.delete(api_url + "commodities/" + id);
  }

  deletecarts(dataId) {
    return axios.delete(api_url + "carts/" + dataId);
  }
  //結帳清空購購物車
  //這邊假資料刪除須 將資料放進陣列大改 或前端跑for抓取id再將id放進來
  deleteallcarts(deleid) {
    return axios.delete(api_url + "carts/" + deleid);
  }

  addcart(cart) {
    return axios
      .post(api_url + "carts", cart)
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  }
  // comments?author.name=typicode
  //這一行式要對比新增時有沒有重複的資料
  getcart(id, useremail) {
    return axios.get(
      api_url + `carts/?commodityId=${id}&userEmail=${useremail}`
    );
    // `/carts?productId=${id}&userId=${user.email}`
  } //確定有重複後 更改購物車產品數量
  putcart(id, cart) {
    return axios.put(api_url + "carts/" + id, cart);
  }
  //mycarts 購物車內容
  getcarts() {
    const user = JSON.parse(localStorage.getItem("usertoken")) || {};

    return axios.get(api_url + `carts?userEmail=${user.email}`);
  }
  patchcar(id, quantity) {
    return axios.patch(api_url + "carts/" + id, quantity);
  }
  //
  //
  //以下為使用者登入區塊
  register(email, password, nickName, current, type) {
    return axios.post(api_url + "auther/register", {
      email,
      password,
      nickName,
      current,
      type,
    });
  }
  login(email, password) {
    return axios.post(api_url + "auther/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("usertoken");
  }
  getcurrent() {
    return JSON.parse(localStorage.getItem("usertoken"));
  }
  //修改使用者資料
  //先跳過前端套完後 之後在改後端?
  patchCurrentUser(id, email, nickName, password) {
    return axios.patch(api_url + "/auther/Users/" + id, {
      id,
      email,
      nickName,
      password,
    });
  }
}

export default new Getapi();
