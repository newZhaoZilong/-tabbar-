// pages/components/tabBar/tabBar.js
Component({
  properties: {
    // 这里定义了属性名,属性类型,默认值
    current: {
      type: Number,
      value: 0
    },
    tabbar: {
      type: Object
    }
  },

  methods: {
    // 这里是一个自定义方法
    clickTap: function (e) {
      //当前点击的tabBar的id  
      var current = e.currentTarget.dataset.id;
      console.log('current', current);
      if (current != this.data.current) {
        var myEventDetail = {//detail对象,提供给事件监听函数
          current: current
        }
        this.setData({
          current: current
        })
        console.log('myEventDetail', myEventDetail);
        //触发
        this.triggerEvent("tabchange", myEventDetail);
      }
    }
  }
})