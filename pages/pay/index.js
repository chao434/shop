// pages/cart/index.js
import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/syncWX.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onLoad: function () {
  },
  //页面显示的事购物车商品checked为true的商品
  onShow(){
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart")||[]
    //过滤后的购物车(checked为true)
    cart = cart.filter(v=>v.checked)
    this.setData({address})
    console.log(cart,"----------------------------")
    let totalPrice = 0;
    let totalNum  = 0;
    // 遍历计算总价和数量
    cart.forEach(v => {
        totalPrice += v.number*v.goods_price;
        totalNum += v.number;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  //设置购物车状态的同时,重新计算全选总价总数的值
})