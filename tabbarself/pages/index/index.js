//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabbar: {
      "selectedColor": "#ffff00",
      "list": [{
          "text": "首页",
          "iconPath": "/images/home_2.png",
          "selectedIconPath": "/images/home_1.png",     
        },
        {
          "text": "我的",
          "iconPath": "/images/mine_2.png",
          "selectedIconPath": "/images/mine_1.png",
        }
      ]
    },
    tabId:0
  },
  change:function(e){
    console.log(e)
    var current_tabId = e.detail.current;
    this.setData({
      tabId: current_tabId
    })
  }
})