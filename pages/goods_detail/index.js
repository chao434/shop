import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{}
  },
  goodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options
    this.getGoodsDetail(goods_id)
  },
  //获取商品详情数据
  async getGoodsDetail (goods_id) {
    const res = await request({url:"/goods/detail",data:{goods_id}})
    this.goodsInfo = res.data.message
    console.log(res)
    this.setData({
      goodsDetail:{
        goods_name: res.data.message.goods_name,
        goods_price: res.data.message.goods_price,
        //部分iphone不识别webp格式图片，做一个临时修改
        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics: res.data.message.pics
      }
    })
  },
  handelPrevwImg(e){
    //构造预览图片数组
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid)
    console.log(urls)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls// 需要预览的图片http链接列表
    })
  },
  handleAddCart() {
    console.log("购物车")
    //获取缓存中的数组
    let cart = wx.getStorageSync("cart")||[]
    let index = cart.findIndex(item=>item.goods_id===this.goodsInfo.goods_id)
    if(index==-1){
      //第一次添加
      this.goodsInfo.number=1
      cart.push(this.goodsInfo)
    }else{
      cart[index].number++
    }
    wx.setStorageSync("cart",cart)
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask:true
    })
  }
})