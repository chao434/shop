//Page Object
import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data: {
    //左侧主菜单
    leftMainList:[],
    //右侧内容菜单
    rightContentList:[],
    //被点击的左侧菜单
    currentIndex:0,
    //接口数据
    categoryList:[],
    //右侧内容距离顶部距离
    scrollTop:0
  },
  //options(Object)
  onLoad: function(options){
    //判断是否有旧数据,没有就直接发送请求,
    const catesData = wx.getStorageSync("cates")
    if (!catesData) {
      //如果不存在,就发送请求
      this.getCategoryList()
      console.log("这里发送了请求")
    } else{
      if (Date.now() - catesData.time >1000*10) {
        this.getCategoryList()
      } else {
        this.categoryList = catesData.data
        console.log("那么就有可用的旧数据")
        //构造左侧主菜单数据
      let leftMainList = this.categoryList.map(m => m.cat_name)
      //构造右侧的内容数据
      let rightContentList = this.categoryList[0].children
      this.setData({
        leftMainList,
        rightContentList
      })
      }
    }
  },
  //获取分类数据
  async getCategoryList () {
    // request ({
    //   url:"/categories"
    // }).then(res => {
    //   this.categoryList = res.data.message;
    //   //把接口的数据直接存储到本地存储中
    //   wx.setStorageSync("cates",{time:Date.now(),data:this.categoryList})
    //   //构造左侧主菜单数据
    //   let leftMainList = this.categoryList.map(m => m.cat_name)
    //   //构造右侧的内容数据
    //   let rightContentList = this.categoryList[0].children
    //   this.setData({
    //     leftMainList,
    //     rightContentList
    //   })
    // })
    const  res = await request({url:"/categories"})
    this.categoryList = res.data.message;
    //把接口的数据直接存储到本地存储中
    wx.setStorageSync("cates",{time:Date.now(),data:this.categoryList})
    //构造左侧主菜单数据
    let leftMainList = this.categoryList.map(m => m.cat_name)
    //构造右侧的内容数据
    let rightContentList = this.categoryList[0].children
    this.setData({
      leftMainList,
      rightContentList
    })
  },
  //左侧菜单的点击事件
  handleclick (e) {
    console.log(e)
    //给currentIndex赋值
    const {index} = e.currentTarget.dataset
    let rightContentList = this.categoryList[index].children
      this.setData({
        currentIndex:index,
        rightContentList,
        //重新设置view标签的顶部距离
        scrollTop:0
      })
  }
});