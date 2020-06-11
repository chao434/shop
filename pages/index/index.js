//Page Object
//引入用来发送请求的方法
import { request } from "../../request/index.js"
Page({
  data: {
    //轮播图图片数组
    swiperList:[],
    //导航数组
    cateList:[],
    //楼层数据
    floorList:[]
  },
  //options(Object)
  onLoad: function(options){
    //用promise来解决回调问题
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  getSwiperList(){
    request({
      url:"/home/swiperdata"
    }).then(res=>{
      this.setData({
        swiperList:res.data.message
      })
    })
  },
  getCateList(){
    request({
      url:"/home/catitems"
    }).then(res=>{
      this.setData({
        cateList:res.data.message
      })
    })
  },
  getFloorList(){
    request({
      url:"/home/floordata"
    }).then(res=>{
      this.setData({
        floorList:res.data.message
      })
    })
  }
});