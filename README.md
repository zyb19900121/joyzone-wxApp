# 项目介绍
本项目是与egg.js项目配套的前端微信小程序项目。

## 记录加总结一下（2018.08.25）
近三周的时间已将整体架构、部分接口、UI等工作完成了初步的实现，因项目中对数据的要求较大，所以本人接下来的开发重心将会放到后端管理系统和后台服务中上去，
加上最近工作较忙，能自由支配的时间太少（懒也是个因素。。。），导致进度有点慢，不过本人一定会坚持把这三个项目进行下去的。

## 阶段性界面截图

<img width="300" height="auto" src="http://static.joyzone.xyz/image/app_01.jpg" />

<img width="300" height="auto" src="http://static.joyzone.xyz/image/app_02.jpg" />

<img width="300" height="auto" src="http://static.joyzone.xyz/image/app_03.jpg" />

<img width="300" height="auto" src="http://static.joyzone.xyz/image/app_04.jpg" />

<img width="300" height="auto" src="http://static.joyzone.xyz/image/app_05.jpg" />


更新（2018-09-14）：

	1.游戏列表添加上拉刷新下来加载的功能
	2.修改底部菜单

更新（2018-09-16）：

	1.实现游戏列表的筛选与搜索功能  
	2.优化底部导航栏
	3.优化游戏详情页面

更新（2018-09-17）：

	1.初步完成游戏详情页面中简介标签的实现，其中的数据待进一步完善
	2.优化游戏列表的下拉样式

更新（2018-09-25）：

	1.优化游戏列表（上拉加载、游戏封面样式）
	2.优化游戏详情中的数据

更新（2018-10-06）：

	1.实现游戏资讯页面中的轮播功能（暂时用的静态数据，稍后在后台系统中实现维护）。
	2.优化评论列表

更新（2018-10-08）：

	1.继续实现游戏资讯页面（50%）。

更新（2018-10-09）：

	1.游戏资讯页面中banner改完后台维护的动态数据。

更新（2018-10-11）：

	1.利用wxParse来解析资讯的富文本内容
  
更新（2018-10-12）：

	1.完善游戏资讯阅读量的实现。
	this.setData({
		[`newsList[${index}].views_count`]: count
	})

更新（2018-10-15）：

	1.完善scroll-view的下拉刷新上拉加载功能。
  2.完善资讯的阅读量功能。
  
更新（2018-10-17）：

	1.添加用于游戏详情页面中的资讯组件。
  2.添加iview样式库
  
更新（2018-10-21）：

	1.实现即将发售页面（80%）。

更新（2018-10-22）：

	1.优化游戏列表页面（上拉加载的样式）

  
