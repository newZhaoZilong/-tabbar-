# 小程序自定义tabbar的创建 #
小程序自定义tabbar是站长以前在公司写的控件，当时微信小程序还没有组件功能，所以用的是模板，说实话模板的封装性不好，html,css,js应该封装到一块的，但是模板实际就只是html的封装，css和js还要自己引入，导致整体性不好，微信小程序出了组件后，解决了这一问题，我就把之前使用的自定义tabbar模板改成了自定义组件，完全可以做到即插即用。
## 博客的写作风格 ##
我自己写博客的风格都会是这样，首先就是要讲清楚设计的实际目的，然后再讲实现操作，因为如果不知道学了之后能干什么的话，效果极差，知道为什么要学，才会有自己的问题和自己的看法，抱着解决问题的思想去学习，在学习的过程中弄清楚自己的疑惑或者证实了自己的观点是正确的或错误的，学习的效率才会高。
## 为什么要使用自定义tabbar ##


- 站长为什么会使用自定义tabbar的原因很简单，因为微信自己的tabbar满足不了公司的两个业务需求，


- 一个业务需求是要在tabbar的正中间添加一个图标，


- 另一个业务需求就是为租客和房东各自单独设置一个tabbar,也就是说一个小程序里有两个tabbar，每个tabbar的图标各不相同，因为租客和房东的业务逻辑是不同的，所以代码是要分开写的，如果共用一个tabbar那么势必会造成代码混乱不堪，


- 为什么不为租客和房东分别开发一个小程序的原因是因为公司是穷逼，

这两种需求即使现在用官方的tabbar也是臣妾做不到啊，所以就需要自己写个自定义tabbar，而且写自定义tabbar组件的好处是可以加入自己的样式，以适应产品经理的变态需求，但是自定义tabbar也有不好的地方，有些问题现在我也没有解决，

**写这篇博客的目的是创建一个自定义tabbar组件，在创建的过程中再重新熟悉一下小程序组件的制作和使用过程**。

## tabbar组件制作过程 ##

###创建项目目录

首先使用微信开发者工具创建一个小程序项目，创建一个components文件夹，里面创建一个tabbar组件，再创建一个images文件夹，里面存放需要的图片，页面的目录结构应该是这样的

![小程序目录结构](http://www.shangeblog.com/static/submit/tabbarself1.png)

###思考tabbar所需的数据模型

数据模型就是tabbar控件所需要数据的数据结构，既然自定义tabbar也是tabbar，其数据结构应该和微信tabbar是相同的，所以自定义tabbar的数据结构应该是这样

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
tabbar组件接受一个tabbar对象，selectedColor是选中时文字的颜色，

list数组里存放的是选项卡对象，即list数组里有几个对象，tabbar就有几个选项卡，

每个选项卡对象有一个text属性指定标题，一个iconPath指定未选中时展示的图标，一个selectedIconPath指定选中时展示的图标

tabbar组件还要接受一个数据类型为Number的current字段，用于指定tabbar当前应该点亮的选项卡角标，这个current属性可以写在tabbar对象里面，也可以分开写，我是分开写的，知道了数据结构大概是什么样，就可以编写tabbar组件的wxml了，

###编写tabbar组件wxml页面

wxml页面是tabbar组件的骨架

现在假设外界传入一个上文的tabbar对象和一个current数字，首先思考tabbar的页面布局结构，一个tabbar里有多个选项卡，说明选项卡的数量是不确定，像是一个列表渲染，而这个列表渲染的子组件应该有一个父组件，用于设置相同的字体大小，控制tabbar的宽度和高度，那tabbar的wxml结构就是一个父组件，下面通过列表渲染产生的子组件，每个子组件就是一个选项卡，里面又有图标和标题，父组件应该是一个view标签，下面通过tabbar.list列表渲染出几个view标签，每个标签里又有一个image标签和text标签，然后根据current判断是否是点击状态,image和text根据是否是点击状态改变class的值，代码如下

	<view class="tab">
	  <block wx:for="{{tabbar.list}}" wx:key="text">
	    <view class="item_tab" data-id="{{index}}" bindtap="clickTap">
	      <image class="img_tab" src="{{current==index?item.selectedIconPath:item.iconPath}}"></image>
	      <text class="text_tab" style="color:{{current==index?tabbar.selectedColor:tabbar.color}};">{{item.text}}</text>
	    </view>
	  </block>
	</view>

###编写tabbar组件的wxss页面

wxss页面是tabbar组件的布局，

首先设置tabbar的宽高，写在.tab样式里，其次对于每个选项卡的宽度是相同的，考虑采用水平方向flex布局，每个子控件的flex-grow: 1;就是等分剩余空间，效果就是有两个选项卡，每个选项卡的宽度是1/2，有三个就是1/3，wxss样式如下

	.tab {
	  position: fixed;
	  bottom: 0rpx;
	  z-index: 999;
	  width: 100%;
	  height: 111rpx;
	  background-color: #fcfcfc;
	  box-shadow: 0rpx 0rpx 40rpx #e3e3e3;
	  display: flex;
	}
	
	/*tab条目*/
	
	.item_tab {
	  flex-grow: 1;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	}
	
	/*tab图片*/
	
	.img_tab {
	  width: 59.2rpx;
	  height: 59.2rpx;
	}
	
	/*tab文字*/
	
	.text_tab {
	  font-size: 24rpx;
	}
这里边添加了box-shadow: 0rpx 0rpx 40rpx #e3e3e3;使得tabbar具有了简单的辉光效果，所谓辉光效果就是阴影的一种扩散方式，这里阴影的水平垂直位置都为0，所以是看不到阴影的集中效果，但是模糊距离为40rpx，会有一种淡淡的颜色为#e3e3e3蒙层，使得tabbar具有微弱的立体感，增添了一些神秘气息

### tabbar的js页面

首先tabbar对象和current数字是需要外界传进来的，而且点击非点击状态的tabbar时，current的值时需要切换，而且要通知外界current改变了，所以还要通过triggerEvent触发一个冒泡事件，js页面的代码如下

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
	      //当前点击的tabbar的id  
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

###tabbar组件的使用

写好代码后就可以再页面中使用了，如果要再index页面中使用的话首先再index.json中设置

	{
	  "usingComponents": {
	    "tabbar": "/components/tabbar/tabbar"
	  }
	}

其次再index.wxml中添加

	<block wx:if="{{tabId === 0}}">
	<div>这是首页</div>
	</block>
	<block wx:else>
	<div>这是第二页</div>
	</block>
	<tabbar tabbar="{{tabbar}}" bindtabchange="change" current="{{tabId}}"></tabbar>

然后在index.js中根据tabbar触发的tabchange事件传递的current参数更改当前页面的tabId属性,从而针对不同的选项卡作不同的渲染

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

###tabbar组件实现效果

![](http://www.shangeblog.com/static/submit/tabbarself23.png)

##添加个性化样式

如果想在自定义tababr中间插入一张图片的话，只需要加入个image标签，由于image标签要相对tababr组件居中，而且在其他选项卡上方显示，那么应该采用postion:absolute;使元素脱离文档流显示在上方，因为要相对tabbar组件居中，那么tabbar最外层元素应该也是非static定位的，因为postion:absolute;是生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。所以要在最外层的tabbar view中添加positon:relative;的样式使得image标签能够相对于它进行定位。

修改后的tabbar组件 wxml如下：

	<view class="tab">
	  <block wx:for="{{tabbar.list}}" wx:key="text">
	    <view class="item_tab" data-id="{{index}}" bindtap="clickTap">
	      <image class="img_tab" src="{{current==index?item.selectedIconPath:item.iconPath}}"></image>
	      <text class="text_tab" style="color:{{current==index?tabbar.selectedColor:tabbar.color}};">{{item.text}}</text>
	      <image class="tab-center" src="/images/lun.png"></image>
	    </view>
	  </block>
	</view>

修改后的tabbar组件 wcss样式如下：

	.tab {
	  position: fixed;
	  bottom: 0rpx;
	  z-index: 999;
	  width: 100%;
	  height: 111rpx;
	  background-color: #fcfcfc;
	  box-shadow: 0rpx 0rpx 40rpx #e3e3e3;
	  display: flex;
	}
	
	/*tab条目*/
	
	.item_tab {
	  flex-grow: 1;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	}
	
	/*tab图片*/
	
	.img_tab {
	  width: 59.2rpx;
	  height: 59.2rpx;
	}
	
	/*tab文字*/
	
	.text_tab {
	  font-size: 24rpx;
	}
	
	/* tab中心 */
	.tab-center{
	  position:absolute;
	  top:0rpx;
	  left:50%;
	  transform:translateX(-50%) translateY(-50%);
	  border-radius: 50%;
	  width: 100rpx;
	  height:100rpx;
	}

添加image标签后的页面效果：

![](http://www.shangeblog.com/static/submit/tabbarself4.png)

##自定义tabbar的问题

自定义tabbar的最大问题是如果点击不同的选项卡跳转不同的页面的话，会出现一个翻页的动态效果，而且好像还取消不了，但是按理说是不应该有这种多余的效果的，如果点击不同的选项卡根据current进行条件渲染，其效果就和官方tabbar一样了，而且还可以自定义tabbar样式，但是这样做有一个问题是，原本几个页面的代码都写在了这一个页面里，势必会造成当前页面的代码量过大，所以在什么时候使用tabbar就要考虑，选项卡数量了，

**如果选项卡数量太多，比如有5个的话，而且每一页的代码都很多，这个时候最好考虑使用官方tabbar，**

否则的话自定义tabbar也是可以解决需求的。

tabbar源码：[git@github.com:newZhaoZilong/-tabbar-.git](git@github.com:newZhaoZilong/-tabbar-.git)

相关文档：[官方自定义组件链接](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)