


// pages/cart/index.js
import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/syncWX.js"
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
    this.setData({address})
    this.setCart(cart)
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
    //获取被修改对象(索引)
    let index = cart.findIndex(v=>v.goods_id===goods_id)
    // 被修改状态取反
    cart[index].checked=!cart[index].checked
    //购物车数据计算
    this.setCart(cart)
  },
  //设置购物车状态的同时,重新计算全选总价总数的值
  
  setCart(cart){
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
    wx.setStorageSync("cart",cart)
  },
  // 全选框点击事件
  handleChangAllCheck(){
    //获取data中的数据
    let{cart,allchecked} = this.data
    // 取反
    allchecked =!allchecked
    cart.forEach(it=>it.checked=allchecked)
    this.setCart(cart)
  },
  //商品数量的加减操作
  async handleChangeNumber(e){
    const {operation,id} = e.currentTarget.dataset
    //获取购物车数组
    let {cart} = this.data
    // 获取被修改对象(索引)
    let index = cart.findIndex(v=>v.goods_id===id)
    // 是否要执行删除的操作
    if(cart[index].number===1&&operation===-1){
      console.log("/////////////////////")
      const res = await showModal({content:"你是否要删除"})
      console.log("/+++++++++++++++++/")
      if (res.confirm) {
        console.log("/////////////////////")
        cart.splice(index,1)
        this.setCart(cart)
      }
    } else {
      // 购物车数量的加减 
      cart[index].number+=operation;
      // 放回data中放回缓存中
      this.setCart(cart)
    }
  },
  //结算
  async handlePayEnd(){
    //判断是否有收货地址
    const {address,totalNum} = this.data
    if (!address){
      await showToast({title:"请您先添加收货地址"})
      return
    }
    if(totalNum===0){
      await showToast({title:"您还未选购商品"})
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})