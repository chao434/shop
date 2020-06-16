// pages/cart/index.js
import {getSetting,chooseAddress,openSetting} from "../../utils/syncWX.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async handleChoseAddress() {
    // 获取权限的状态
    // wx.getSetting({
    //   success:(result)=>{
    //     const scopeAddress = result.authSetting["scope.address"];
    //     if (scopeAddress==true||scopeAddress==undefined){
    //       wx.chooseAddress({
    //         success:(result1)=>{
    //           console.log(result1)
    //         }
    //       })
    //     }else{
    //       //加入有过拒绝过授予权限的操作,让用户打开授权页面
    //       wx.openSetting({
    //         success: (result)=>{
    //           wx.chooseAddress({
    //             success:(result1)=>{
    //               console.log(result1)
    //             }
    //           })
    //         }
    //       });
    //     }
    //   }
    // })  
    //获取权限状态
  }
})