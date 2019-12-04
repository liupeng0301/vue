import Vue from 'vue'
import Router from 'vue-router'
import shopItemDetail from './xiangqing/shopItemDetail'
import orderConfirm from './xiangqing/orderConfirm.vue'
import orderDetail from './xiangqing/orderDetail.vue'
import aboutUs from './assets/aboutus/aboutUs.vue'
import classDetail from './xiangqing/classDetail.vue'
import ceshi from './xiangqing/ceshi.vue'
import commodity from './xiangqing/commodity.vue'
import classList from './xiangqing/classList.vue'
import commodityList from './xiangqing/commodityList.vue'
import proTeam from './myKindergarden/proTeam.vue'
import sendMailbox from './myKindergarden/sendMailbox.vue'
import protocol from './assets/aboutus/protocol.vue'
import advisory from './xiangqing/advisory.vue'
import kinderWelfare from './myKindergarden/kinderWelfare.vue'
import originalityDetail from "./xiangqing/originalityDetail.vue"
import Book_details from "./xiangqing/Book_details.vue"
import Book_detailsTwo from "./xiangqing/Book_detailsTwo.vue"
import BookList from "./xiangqing/BookList.vue"
import help from './myKindergarden/help'
import helpDet from './myKindergarden/helpDet'
import maintainDetail from './xiangqing/maintainDetail.vue'
import activity from './xiangqing/activity.vue'
import activityQRcode from './xiangqing/activityQRcode.vue'
import teamDesc from './xiangqing/teamDesc.vue'
import vr from './xiangqing/vr.vue'
import noData from './xiangqing/noData.vue'
import National from './xiangqing/National.vue'
import Picturebook from './xiangqing/Picturebook.vue'
import templateOne from './xiangqing/templateOne.vue'
import templateTwo from './xiangqing/templateTwo.vue'
import templateThree from './xiangqing/templateThree.vue'
import templateFour from './xiangqing/templateFour.vue'

import device from "./myKindergarden/device.vue";

Vue.use(Router);

export default new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes: [
		//园采买商品详情
		{
			path: '/shopItemDetail/:id/:userid',
			name: 'shopItemDetail',
			component: shopItemDetail
		},
		//团队介绍
		{
			path: '/teamDesc/:id',
			name: 'teamDesc',
			component: teamDesc
		},
		//环境创设详情
		{
			path: '/originalityDetail/:id/:userid',
			name: 'originalityDetail',
			component: originalityDetail
		},
		//订单详情
		{
			path: '/orderDetail/:orderId/:userId',
			name: 'orderDetail',
			component: orderDetail
		},
		//课程订单确认
		{
			path: '/orderConfirm/:orderId/:userId',
			name: 'orderConfirm',
			component: orderConfirm
		},
		//咨询详情
		{
			path: '/advisory/:artId/:userid',
			name: 'advisory',
			component: advisory
		},
		//服务协议
		{
			path: '/protocol',
			name: 'protocol',
			component: protocol
		},
		//关于我们(样式未调整)
		{
			path: '/aboutUs',
			name: 'aboutus',
			component: aboutUs
		},
		//课程详情
		{
			// path: '/classDetail/:id/:userid',
			path: '/classDetail/:id/:userid',
			name: 'classDetail',
			component: classDetail
		},
		//课程详情  点击选择后跳转的  课程列表
		{
			path: '/classList/:userid/:courseType',
			name: 'classList',
			component: classList
		},
		//新增商品详情
		//先 goodsId 然后 userid
		{
			// path: '/commodity/:userid/:goodsId',
			path: '/commodity/:goodsId/:userid',
			name: 'commodity',
			component: commodity
		},
		//新增商品详情 点击选择商品详情 列表
		{
			path: '/commodityList/:userid/:goodsId',
			name: 'commodityList',
			component: commodityList
		},
		//移除页面
		{
			path: '/proTeam',
			name: 'proTeam',
			component: proTeam
		},
		//园福利
		{
			path: '/kinderWelfare/:userId',
			name: 'kinderWelfare',
			component: kinderWelfare
		},
		//帮助中心
		{
			path: '/help',
			name: 'help',
			component: help
		},
		//提出建议
		{
			path: '/device',
			name: 'device',
			component: device
		},
		//帮助详细目录
		{
			path: '/helpDet/:type',
			name: 'helpDet',
			component: helpDet
		},
		//订单详情
		{
			path: '/maintainDetail/:orderId/:userId',
			name: 'maintainDetail',
			component: maintainDetail
		},
		//发送邮件
		{
			path: '/sendMailbox/:id/:userId',
			name: 'sendMailbox',
			component: sendMailbox
		},
		//国庆
		{
			path: '/National/:id/:userId',
			name: 'National',
			component: National
		},
		//爱-绘本
		{
			path: '/Picturebook/:userId',
			name: 'Picturebook',
			component: Picturebook
		},
		//vr 演示的
		{
			path: '/vr',
			name: 'vr',
			component: vr
		},
		//书单详情
		{
			path: '/Book_details/:rbId/:userId',
			name: 'Book_details',
			component: Book_details
		},
		//书单详情 副本 待删除
		{
			path: '/Book_detailsTwo/:rbId/:userId',
			name: 'Book_detailsTwo',
			component: Book_detailsTwo
		},
		//书单下单
		{
			path: '/BookList/:rbId/:userId',
			name: 'BookList',
			component: BookList
		},
		//H5模板1
		{
			path: '/templateOne/:modelId/:userId',
			name: 'templateOne',
			component: templateOne
		},
		//H5模板2
		{
			path: '/templateTwo/:modelId/:userId',
			name: 'templateTwo',
			component: templateTwo
		},
		//H5模板3
		{
			path: '/templateThree/:modelId/:userId',
			name: 'templateThree',
			component: templateThree
		},
		//H5模板4 和模板3一样
		{
			path: '/templateFour/:modelId/:userId',
			name: 'templateFour',
			component: templateFour
		},
		//新增活动
		{
			path: '/activity/:userId/:id',
			name: 'activity',
			component: activity
		},
		//新增活动 二维码下载待删除
		{
			path: '/activityQRcode/:userId/:id',
			name: 'activityQRcode',
			component: activityQRcode
		},
		//测试的
		{
			path: '/ceshi',
			name: 'ceshi',
			component: ceshi
		},
		//404页面
		{
			path: '*',
			name: 'noData',
			component: noData
		},
		//客服待添加
	]
})
