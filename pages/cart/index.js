// pages/cart/index.js
import {getSetting,chooseAddress,openSetting} from "../../utils/syncWX.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data:{
    address:{},
    cart:[],
    allchecked:false,
    totalPrice:0,
    totalNum:0
  },
  onLoad: function () {
  },
  onShow(){
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart")||[]
    // 计算全选 every 会遍历会接受一个回调函数,只有所有回调值都为true,every的返回值才会是true
    // const allchecked = cart.length? cart.every(item=>item.checked):false;
    let allchecked = true
    let totalPrice = 0;
    let totalNum  = 0;
    // 遍历计算总价和数量
    cart.forEach(v => {
      if (v.checked){
        totalPrice += v.number*v.goods_price;
        totalNum += v.number;
      }else{
        allchecked = false
      }
    });
    //判断数租是否为空
    allchecked=cart.length!=0?allchecked:false
    this.setData({
      address,
      cart,
      allchecked,
      totalPrice,
      totalNum
    })
  },
  async handleChoseAddress() {
  try {
      //获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 判断权限状态
      if (scopeAddress === false){
        await openSetting()
      }
      let address = await chooseAddress()
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo
      // 存到缓存中
      wx.setStorageSync("address",address);
        
    } catch (error) {
      console.log(error);
    }
  },
  // 商品选中
  handleChangechk(e) {
    //获取被修改的额商品id
    const goods_id = e.currentTarget.dataset.id
    const {cart} = this.data
    console.log(cart)
    let index = cart.findIndex(v=>v.goods_id===goods_id)
    cart[index].checked=!cart[index].checked
    this.setData({
      cart
    })
    wx.setStorageSync("cart",cart)
    let allchecked = true
    let totalPrice = 0;
    let totalNum  = 0;
    // 遍历计算总价和数量
    cart.forEach(v => {
      if (v.checked){
        totalPrice += v.number*v.goods_price;
        totalNum += v.number;
      }else{
        allchecked = false
      }
    });
    //判断数租是否为空
    allchecked=cart.length!=0?allchecked:false
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allchecked
    })
  },
  //设置购物车状态的同时,重新计算全选总价总数的值
})