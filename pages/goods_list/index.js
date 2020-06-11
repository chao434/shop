import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      },
    ],
    goodsList:[]
  },
  // 接口要的参数
  queryParams:{
    query:"",
    cid:"",
    pagenum:"1",
    pagesize:"10"
  },
  //总页数
  pagesTotal:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid=options.cid
    this.getGoodsList()
    wx.showLoading({
      title: "加载中"
    });
    setTimeout(function(){
      wx.hideLoading();
    },3000)
  },
  //获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.queryParams})
    const total = res.data.message.total
    const pagesTotal = Math.ceil(total/this.queryParams.pagesize)
    console.log(pagesTotal)
    this.setData({
      goodsList:res.data.message.goods
    })
    //关闭下拉刷新的函数
    wx.stopPullDownRefresh()
  },
  //标题点击事件
  handTabsItemTap (e) {
    //获取被点击的标题索引
    const {index} = e.detail
    //修改原数组
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    //赋值到data中
    this.setData({
      tabs
    })
  },
  //页面上划页面  滚动条触底
  onReachBottom(){
    //判断是否有下一页数据
    if(this.queryParams.pagenum>=this.pagesTotal){
      wx.showToast({
        title: '没有下一页数据了'
      });
    }else{
      this.queryParams.pagenum++;
      this.getGoodsList()
    }
  },
  //下拉刷新事件
  onPullDownRefresh() {
    //重置数组
    this.setData({
      goodsList:[]
    })
    //重置页码
    this.queryParams.pagenum = 1
    this.getGoodsList()
  }
})