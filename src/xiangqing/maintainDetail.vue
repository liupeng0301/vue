<template>
	<!--订单详情无按钮-->
	<div class="darkContainer">
		<SecondHeader msgHeader="订单详情"></SecondHeader>
		<section class="list">
			<!--    <p class="tit" v-if="item.ordersStatus=='1'"><i class="iconfont icon-time"></i>预订单</p>
            <p class="tit" v-if="item.ordersStatus=='2'"><i class="iconfont icon-time"></i>已确认</p>
            <p class="tit" v-if="item.ordersStatus=='3'"><i class="iconfont icon-time"></i>配送中</p>
            <p class="tit" v-if="item.ordersStatus=='4'"><i class="iconfont icon-time"></i>已完成</p>
            <p class="tit" v-if="item.ordersStatus=='5'"><i class="iconfont icon-time"></i>失效/删除</p> -->
			<p v-if="item.ordersStatus == 1" class="messageName">
				<img src="../assets/img/shijian.png" alt="">预订单
			</p>
			<p v-else-if="item.ordersStatus == 2" class="messageName">
				<img src="../assets/img/dingdan.png" alt="">已确认
			</p>
			<p v-else-if="item.ordersStatus == 3" class="messageName">
				<img src="../assets/img/jinxing.png" alt="">配送中
			</p>
			<p v-else-if="item.ordersStatus == 4" class="messageName">
				<img src="../assets/img/success.png" alt="">已完成
			</p>
			<p v-else-if="item.ordersStatus == 4" class="messageName">
				<img src="../assets/img/quxiao.png" alt="">失效
			</p>
		</section>
		<section class="info">
			<div class="order-info">
				<div class="tit">订单信息</div>
				<div class="order-desc">
					<p>订单号：<span>{{item.orderNum}}</span></p>
					<p>创建时间：<span>{{item.timeStr}}</span></p>
				</div>
			</div>
		</section>
		<section class="info custom">
			<div class="order-info">
				<div class="tit">客户信息</div>
				<div class="order-desc">
					<p>客户单位：<span>{{item.customerUnit}}</span></p>
					<p>订单交易人：<span>{{item.customerName}}</span></p>
					<p>联系电话：<span>{{item.customerPhone}}</span></p>
					<p>地址：<span>{{item.receivingAddress}}</span></p>
				</div>
			</div>
		</section>
		<section class="info">
			<div class="order-info">
				<div class="tit">内容详情</div>
				<div class="order-desc" v-if="this.item.ordersType==='wxdy'">
					<p>维修内容：<span>{{item.title}}</span></p>
					<p>问题描述：<span>{{item.desc}}</span></p>
				</div>
				<div class="order-desc" v-else>
					<p>购买详情：<span>{{item.desc}}</span></p>
				</div>
			</div>
		</section>
		<a href="javascript:void(0);" v-if="Android" @click="tellPhone">
			<img src="../assets/img/kefu.png" alt="" class="kefu_Class">
		</a>
		<a href="tel:15201356961" v-if="iOS" @click="tellPhone">
			<img src="../assets/img/kefu.png" alt="" class="kefu_Class">
		</a>
	</div>
</template>

<script>
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	import SecondHeader from '../components/secondHeader'
	export default {
		name: "maintainDetail",
		data() {
			return {
				Android: isAndroid,
				iOS: isiOS,
				item: {},
				userId: "",
				ordersId: "",
			}
		},
		components: {
			SecondHeader
		},
		created() {
			this.userId = this.$route.params.userId;
			this.ordersId = this.$route.params.orderId;
			let postData = this.$qs.stringify({
				userId: this.userId,
				ordersId: this.ordersId
			});
			this.$axios({
					method: 'post',
					url: this.$url + 'orders/json/getYfwOrdersDetail',
					data: postData
				})
				.then(data => this.item = data.data.resultObject);
		},
		methods: {
			tellPhone() {
				if (isAndroid) {
					androidApp.callPhone("15201356961");
				}
			},
			cancel() {

			},
			confirm() {

			}
		}
	}
</script>

<style scoped lang="scss">
	.kefu_Class {
		width: 250px;
		/*px*/
		position: fixed;
		right: 0;
		bottom: 100px;
		/*px*/
	}

	.messageName {
		color: #333333;
		font-size: 30px;
		/*px*/
		margin-left: 34px;
		/*px*/
		margin-top: 31px;
		/*px*/
		margin-bottom: 27px;

		/*px*/
		img {
			width: 37px;
			/*px*/
			height: 37px;
			/*px*/
			vertical-align: middle;
			margin-right: 13px;
			/*px*/
		}
	}

	.confirm-btn {
		width: 80%;
		margin: 30px 10% 0px;
		height: 100px;
		/*px*/
		text-align: center;
		color: #ffffff;
		line-height: 100px;
		/*px*/
		border: none;
		background: -webkit-linear-gradient(#EB98FD, #AA57DC);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(#EB98FD, #AA57DC);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(#EB98FD, #AA57DC);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(#EB98FD, #AA57DC);
		/* 标准的语法 */
		font-size: 34px;
		/*px*/
	}

	.custom {
		border-top: 2px solid #eeeeee;
		border-bottom: 2px solid #eeeeee;
	}

	.tit {
		font-size: 30px;
		/*px*/
		font-weight: bold;
		padding: 0 32px;
		/*px*/
		height: 60px;
		/*px*/
		line-height: 60px;

		/*px*/
		i {
			margin-right: 16px;
			/*px*/
			font-size: 36px;
			/*px*/
		}
	}

	.list {
		background-color: #fff;
		border-bottom: 1px solid #eeeeee;
	}

	.count-num {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin-top: 10px;
		padding: 8px 0;
		border-bottom: 1px solid #efefef;
		font-size: 18px;
	}

	.info {
		width: 100%;
		background-color: #fff;

		.tit {
			color: #333333;
			position: relative;
		}

		.tit::before {
			display: block;
			content: '';
			width: 2px;
			height: 16px;
			background: #B461FF;
			position: absolute;
			top: 7px;
			left: 20px;
			/*px*/
		}

		>div {
			padding: 10px 0;

			p {
				padding: 0 16px;
				font-size: 12px;
				line-height: 24px;
				color: #666666;
			}
		}
	}

	footer {
		width: 100%;
		position: fixed;
		bottom: 0;

		button {
			width: 50%;
			border: 0;
			color: #fff;
			height: 50px;
			font-size: 18px;
		}

		button:first-of-type {
			background-color: #999999;
		}

		button:last-of-type {
			background: -webkit-linear-gradient(#EB98FD, #AA57DC);
			/* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(#EB98FD, #AA57DC);
			/* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(#EB98FD, #AA57DC);
			/* Firefox 3.6 - 15 */
			background: linear-gradient(#EB98FD, #AA57DC);
			/* 标准的语法 */
		}
	}
</style>
