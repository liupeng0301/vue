<template>
	<div class="container">
		<ThirdHeader msg-header="园福利"></ThirdHeader>
		<div class="banner">
			<img src="../assets/img/fuliBanner.png" alt :class="{iosBar : isIos}">
			<div class="user-icon">
				<img v-if="item.portrait" :src="item.portrait" alt style="display:block;width:100%;height:100%;">
				<img v-else src="../assets/icons/useHead.png" alt style="display:block;width:100%;height:100%;">
			</div>
			<div class="user-info">
				<p>{{item.kindergartenName}}</p>
			</div>
		</div>
		<nav>
			<ul>
				<li :class="{'active':tab == 'tab-1'}" @click="shiyong(1)">可使用</li>
				<li :class="{'active':tab == 'tab-2'}" @click="shiyong(2)">已使用</li>
			</ul>
		</nav>
		<main>
			<ul v-if="zanwu">
				<li class="nowelf">
					<img src="../assets/icons/nodata.png" alt>
					<p>您当前暂无兑换券</p>
				</li>
			</ul>
			<ul v-else>
				<!-- Y已使用 -->
				<!--  <li v-for="(i,index) in item.dataList" :key="index" :class="i.isUse === 'Y'?'nodata':''">      -->
				<!-- <li v-for="(i,index) in arrDistList" :key="index" :class="i.count == 2?'nodata':''"> -->
				<li v-for="(i,index) in arrDistList" :key="index" :class="setClass(i)">
					<div>
						<div class="fuli-icon">
							<img :src="i.picUrl" alt>
						</div>
						<div class="fuli-txt">
							<p>{{i.typeName}}</p>
							<p class="text-weak">{{i.name}}</p>
							<!--<p>限制{{i.endTime.time | formatDate}}日前使用</p>-->
							<!-- <p v-if="i.status">起止时间:&nbsp;2019-07-06&nbsp;至&nbsp;2020-07-14</p> -->
							<p v-if="i.status">起止时间:&nbsp;{{i.startTime.slice(0,10)}}&nbsp;至&nbsp;{{i.timeStr}}</p>
							<p v-else>限制{{i.timeStr}}日前使用</p>
						</div>
					</div>
					<!-- Y-可以使用 -->

					<button v-if="i.concat == '3'">使用中</button>
					<button v-else-if="i.concat == '2'">已使用</button>
					<button v-else-if="i.concat == '1'">申请中</button>
					<button @click="used(index,i)" v-else-if="i.concat == '4'">立即使用</button>
				</li>
			</ul>

		</main>
		<tankuang :xianshi="xianshi" @MessSon="MessSon" :userId="userId" :ID='ID' message="是否确定使用该优惠劵" messageFooter="确定" :naixin="false">
		</tankuang>
	</div>
</template>

<script>
	var u = navigator.userAgent;
	// var isAndroid = u.indexOf('Android') > -1;
	import axios from "axios";
	import tankuang from "../components/tankuang";
	import qs from "qs";
	import {
		MessageBox,
		Toast
	} from 'mint-ui';
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

	import ThirdHeader from "../components/thirdHeader";
	export default {
		name: "kinderWelfare",
		data() {
			return {
				tab: 'tab-1',
				item: [],
				zanwu: false, //有没有优惠劵
				list: [],
				isIos: false,
				userId: "",
				xianshi: false,
				ID: '',
				arrDistList: []
			};
		},
		components: {
			ThirdHeader,
			tankuang
		},
		mounted() {
			document.ondragstart = document.onselectstart = function() {
				return false;
			};
			this.getList();
		},
		methods: {
			shiyong(num) {
				this.tab = `tab-${num}`;
				let ctype = null;
				if (num == 1) {
					ctype = "valid";
				} else {
					ctype = "unValid";
				}
				this.GetMyDada(ctype);
			},
			setClass(item) {
				if (item.typeName == "库房") {
					if (item.isUse == "W" || item.isUse == "N") {
						return "nodata";
					} else if (item.isUse == "S" || item.isUse == "Y") {
						// return "";
						return "projection";
					}
				} else {
					//其他的
					if (item.isUse == "Y") {
						// return "";
						return "projection";
					} else if (item.isUse == "N") {
						return "nodata";
					}
				}
			},
			MessSon(data) { //点击了确定

			},
			GetMyDada(data) {
				this.arrDistList = [];
				this.userId = this.$route.params.userId;
				let postData = qs.stringify({
					userId: this.userId,
					ctype: data
				});
				this.$axios({
					method: "post",
					url: this.$url + "orders/json/getCouponListByType",
					// url: 'http://192.168.1.186:8090/YQApp/yqws/orders/json/getCouponListByType',
					data: postData,
					async: true
				}).then(data => {
					console.log(data.data.resultObject);
					if (Array.isArray(data.data.resultObject) && data.data.resultObject.length) {
						this.zanwu = false;
						// this.item = data.data.resultObject;
						let arrDist = data.data.resultObject;
						arrDist.map((item, key) => {
							if (item.typeName == "库房") {
								if (item.isUse == "W") {
									item.concat = 1; // 申请中
									item.sort = 2; // 灰
								} else if (item.isUse == "N") {
									item.concat = 2; // 已使用
									item.sort = 2; // 灰
								} else if (item.isUse == "S") {
									item.concat = 3; // 使用中
									item.sort = 1; // 亮
								} else if (item.isUse == "Y") {
									item.concat = 4; // 立即使用
									item.sort = 1; // 亮
								}
								item.status = true;
							} else {
								//其他的
								if (item.isUse == "Y") {
									item.concat = 4; // 立即使用
									item.sort = 1; // 亮
								} else if (item.isUse == "N") {
									item.concat = 2; // 已使用
									item.sort = 2; // 灰
								}
								item.status = false;
							}
						});
						this.arrDistList = arrDist.sort(this.setSort("sort"));
						console.log(this.arrDistList);
					} else {
						this.zanwu = true;
					}
				});

			},
			getList() {
				this.userId = this.$route.params.userId;
				if (isiOS) {
					this.isIos = true;
				}
				let postData = qs.stringify({
					userId: this.userId,
					ctype: "valid"
				});


				this.$axios({
					method: "post",
					url: this.$url + "orders/json/getKindergartenCouponList",
					// url: 'http://192.168.1.186:8090/YQApp/yqws/orders/json/getKindergartenCouponList',
					data: postData,
					async: true
				}).then(data => {
					this.item = data.data.resultObject;
					if (data.data.code == 10000) {
						if (Array.isArray(data.data.resultObject.dataList) && data.data.resultObject.dataList.length) {

							console.log("123");

							this.zanwu = false;

							let arrDist = this.item.dataList;
							arrDist.map((item, key) => {
								if (item.typeName == "库房") {
									if (item.isUse == "W") {
										item.concat = 1; // 申请中
										item.sort = 2; // 灰
									} else if (item.isUse == "N") {
										item.concat = 2; // 已使用
										item.sort = 2; // 灰
									} else if (item.isUse == "S") {
										item.concat = 3; // 使用中
										item.sort = 1; // 亮
									} else if (item.isUse == "Y") {
										item.concat = 4; // 立即使用
										item.sort = 1; // 亮
									}
									item.status = true;
								} else {
									//其他的
									if (item.isUse == "Y") {
										item.concat = 4; // 立即使用
										item.sort = 1; // 亮
									} else if (item.isUse == "N") {
										item.concat = 2; // 已使用
										item.sort = 2; // 灰
									}
									item.status = false;
								}
							});
							this.arrDistList = arrDist.sort(this.setSort("sort"));
							console.log(this.arrDistList);
						} else {
							this.zanwu = true;
						}
					} else {
						this.message = `${data.data.message}`;
						// Toast({
						//   message: `${data.data.message}`,
						//   position: 'bottom',
						//   duration: 1500
						// });
					}


				});
			},
			// 按照状态排序
			setSort(arr) {
				return function(a, b) {
					var value1 = a[arr];
					var value2 = b[arr];
					if (value1 < value2) {
						return -1;
					} else if (value1 > value2) {
						return 1;
					} else {
						return 0;
					}
				};
			},
			used(index, item) {
				this.ID = item.id;
				this.xianshi = true;
				console.log(this.userId);
				console.log(item.id);
				
			},
			guanbi() {
				this.xianshi = false;
			}
		}
	};
</script>

<style scoped lang="scss">
	body {
		-moz-user-select: none;
		/*火狐*/
		-webkit-user-select: none;
		/*webkit浏览器*/
		-ms-user-select: none;
		/*IE10*/
		-khtml-user-select: none;
		/*早期浏览器*/
		user-select: none;
	}

	@media only screen and (min-width: 600px) {
		.banner {
			height: 490px !important;
			/*px*/
		}

		.user-icon {
			width: 170px !important;
			/*px*/
			height: 170px !important;
			/*px*/
			margin-left: 150px !important;
			/*px*/
		}

		.user-info {
			p {
				font-size: 80px !important;
				/*px*/
			}
		}

		.nodata {
			button {
				width: 250px !important;
				/*px*/
				height: 90px !important;
				/*px*/
				font-size: 40px !important;
				/*px*/
			}
		}

		.projection {
			button {
				width: 250px !important;
				/*px*/
				height: 90px !important;
				/*px*/
				font-size: 40px !important;
				/*px*/
			}
		}

		.fuli-txt {

			//文字大小
			p:nth-child(1) {
				font-size: 46px !important;
				/*px*/
			}

			p {
				font-size: 37px !important;
				/*px*/
			}
		}

		.fuli-icon {

			//图片大小
			img {
				width: 150px !important;
				/*px*/
				height: 150px !important;
				/*px*/
				margin-right: 50px;
				/*px*/
			}
		}
		nav{
			margin-top: -1.5rem !important;
		}
	}

	@media only screen and (min-width: 1000px) {
		.banner {
			height: 680px !important;
			/*px*/
		}

		.user-icon {
			width: 190px !important;
			/*px*/
			height: 190px !important;
			/*px*/
			margin-left: 180px !important;
			/*px*/
		}

		.user-info {
			p {
				font-size: 100px !important;
				/*px*/
			}
		}
		nav{
			margin-top: -1.5rem !important;
		}

		// main {
		// 	margin-top: 540px; /*px*/
		// }
	}

	.iosBar {
		padding-top: 44px;

		/*px*/
		@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
			padding-top: 88px !important;
			/*px*/
		}

		@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
			padding-top: 88px !important;
			/*px*/
		}
	}
	// nav{
	// 	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
	// 		margin-top: -130px !important;/*px*/
	// 	}
		
	// 	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
	// 			margin-top: -130px !important;/*px*/
	// 	}
	// }

	.active {
		color: #ED9BFD;
		border-bottom: 3px solid #ED9BFD;
	}

	header {
		background-color: #313131;
		color: #fff;
	}

	.banner {
		z-index: 0;
		width: 100%;
		height: 270px;
		/*px*/
		// background-color: #313131;
		background-size: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 50px;

		>img {
			width: 100%;
			position: absolute;
			top: 84px;

			/*px*/
			/*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
			/*top: 196px;!*px*!*/
			/*}*/
			@media screen and (min-device-width: 768px) {
				top: 130px;
				/*px*/
			}
		}

		.user-icon {
			width: 111px;
			/*px*/
			height: 111px;
			/*px*/
			border-radius: 111px;
			/*px*/
			background-color: #fff;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 2;
			border: 1px solid #fff;
			margin-left: 95px;
			/*px*/
		}

		.user-info {
			margin-left: 26px;
			position: relative;
			z-index: 2;

			p {
				color: #b4781b;
				font-size: 34px;
				/*px*/
				font-weight: bold;
			}

			button {
				background-color: #b4781b;
				color: #e9cdb4;
				width: 179px;
				/*px*/
				height: 50px;
				/*px*/
				border-radius: 500px;
				border: 0;
				font-size: 26px;
				/*px*/
				margin-top: 28px;
				/*px*/
			}
		}
	}

	nav {
		width: 100%;
		position: relative;
		z-index: 999 !important;
		// margin-top: -1.5rem;
		margin-top: -95px;/*px*/

		ul {
			width: 80%;
			display: flex;
			// justify-content: space-evenly;
			justify-content: space-around;
			margin: auto;

			li {
				outline: 0;
				-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				padding: 0.5rem 0.2rem 0rem;
				margin: 0rem 0 0.1rem 0rem;
				// padding-bottom: .2rem;
				height: 60px;
				/*px*/
				line-height: 60px;
				/*px*/
				padding-bottom: .3rem;
				text-align: center;
				font-size: 30px;
				/*px*/
			}

			li::active {
				background: red;
			}

		}
	}

	main ul li {
		// width: calc(100% - 108px);
		// /*px*/
		// width: -moz-calc(100% - 108px);
		// /*px*/
		// width: -webkit-calc(100% - 108px);
		// /*px*/
		margin: 0px 20px 20px;
		/*px*/
		padding: 0px;
		// border-radius: 10px;
		// border: 2px dashed #dadada;
		padding: 32px;
		/*px*/
		display: flex;
		justify-content: space-between;
		// border-radius: 5px;
		overflow: hidden;
		align-items: center;

		img {
			width: 94px;
			/*px*/
			height: 94px;
			/*px*/
			margin-right: 26px;
			/*px*/
		}

		>div {
			display: flex;
			align-items: center;
			position: relative;
			width: 100%;

			>div {
				>p {
					margin-top: 8px;
					/*px*/
				}

				>p:first-of-type {
					font-size: 32px;
					/*px*/
					font-weight: bold;
				}

				.text-weak {
					color: #999;
					font-size: 26px;
					/*px*/
				}

				>p:last-of-type {
					font-size: 26px;
					/*px*/
					color: #666;
				}
			}
		}

		button {
			position: absolute;
			right: 50px;
			/*px*/
			width: 172px;
			/*px*/
			height: 64px;
			/*px*/
			// line-height: 64px;/*px*/
			background-color: #ffe7af;
			color: #875200;
			font-size: 26px;
			/*px*/
			border-radius: 500px;
			border: 0;
		}
	}

	main .nono {
		width: calc(100% - 108px);
		/*px*/
		width: -moz-calc(100% - 108px);
		/*px*/
		width: -webkit-calc(100% - 108px);
		/*px*/
		//  border: 2px dashed #dadada;
		margin: 0px 20px 20px;
		/*px*/
		padding: 0px;
		//  border-radius: 10px;
	}

	main .nodata {
		// width: calc(100% - 108px);
		// /*px*/
		// width: -moz-calc(100% - 108px);
		// /*px*/
		// width: -webkit-calc(100% - 108px);
		// /*px*/
		// height: 190px; /*px*/
		background: #f9f9f9;
		border: 2px dashed #dadada;
		margin: 0px 20px 20px;
		/*px*/
		padding: 0px;
		border-radius: 10px;

		button {
			background: rgba(237, 237, 237, 1);
			border-radius: 32px;
			color: #999999;
		}

		.fuli-txt {
			p {
				color: #999999;
			}
		}

		img {
			-webkit-filter: grayscale(100%);
			-moz-filter: grayscale(100%);
			-ms-filter: grayscale(100%);
			-o-filter: grayscale(100%);
			filter: grayscale(100%);
			filter: gray;
		}
	}

	main .projection {
		box-shadow: 1px 1px 7px rgba(100, 98, 98, 0.3);
		border-radius: 5px;
		border: 2px dashed white;
	}

	.nowelf {
		display: block;

		img {
			display: block;
			height: 300px;
			/*px*/
			width: 300px;
			/*px*/
			margin: 80px auto 30px;
			/*px*/
		}

		p {
			text-align: center;
			color: #999999;
		}
	}
</style>
