<template>
	<!-- <div v-if="!isWeixin"> -->
	<div>
		<activityHeader v-if="blackShow"></activityHeader>
		<div v-if="!isWeixin">
			<mt-header v-bind:title="msgHeader" :fixed="true" :class="{iosHeader : isIos,'minHead':blackShow}" id="minHead">
				<mt-button class="iconfont icon-iconback" slot="left" @click="handleBack"></mt-button>
				<mt-button class="iconfont icon-share_fill" slot="right" style="margin-right: 22.5px" @click="share" v-show="showIcon"></mt-button>
				<mt-button class="iconfont icon-sortlight" slot="right" color="#333" @click="slideDownMenuToggle" v-show="showIcon"
				 v-if="fenxiang"></mt-button>
			</mt-header>
			<div class="menuHover" @click="dropShow = false" :class="{fadeIn : dropShow}"></div>
			<div class="tangle" :id="get_sanjiao()" :class="{fadeIn : dropShow,'isAndroid':AndroidApp}"></div>
			<ul class="slideDownMenu" :id="getlist()" :class="{fadeIn : dropShow,'isAndroid_bottom':AndroidApp}">
				<li @click="jumpIndex"><img src="../assets/icons/slideDown1.png" alt="">首页</li>
				<li @click="jumpMsg"><img src="../assets/icons/slideDown2.png" alt="">消息</li>
				<li @click="gouwuche"><img src="../assets/icons/gouwuche.png" alt="">购物车</li>
				<li @click="jumpSearch"><img src="../assets/icons/slideDown3.png" alt="">搜索</li>
				<li @click="jumpCollect"><img src="../assets/icons/slideDown4.png" alt="">我的收藏</li>
				<li @click="jumpBrowse"><img src="../assets/icons/slideDown5.png" alt="">我的浏览</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import wxapi from "./wxapi.js";
	import activityHeader from "./activityHeader";
	// import { setTimeout } from 'timers';
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端


	export default {
		name: "secondHeader",
		data() {
			return {
				aaa: true,
				blackShow: false,
				dropShow: false,
				id: "",
				isIos: false,
				userId: '',
				isWeixin: false,
				AndroidApp: false, //安卓
				liulanqi: false, //浏览器端
			}
		},
		props: {
			msgHeader: {
				type: String,
			},
			showIcon: {
				type: Boolean
			},
			fenxiang: {
				type: Boolean,
				default: true
			},
			dynamic: { //如果是 商品详情的 那下面的名字
				type: String,
			}
		},
		components: {
			activityHeader
		},
		created() {
			if (this.$route.query.status) { //H5的返回
				console.log("我是H5的返回呢");
			} else {
				console.log("我是原生的返回呢");
			}
			this.id = this.$route.params.id;
			this.userId = this.$route.params.userid;

			//判断是否微信打开APP
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
			this.isWeixin = isWeixin;
			if (isWeixin) { //微信打开去处顶部白色边
				let bold = document.getElementsByTagName("body");
				bold[0].style.paddingTop = '0px';
				// this.isIos = false;
			}

			if (isiOS) {
				this.isIos = true;
			}
			if (isAndroid) {
				this.AndroidApp = true;
			}


		},
		mounted() {
			this.getTitle(this.msgHeader);
			this.setblack();
		},
		watch: {
			dynamic(newval) {
				if (this.msgHeader == "商品详情" || this.msgHeader == "创设详情") {
					this.getTitle(newval);
				}
			},
			msgHeader(newval){
				console.log(newval);
				this.getTitle(newval);
			}
		},
		methods: {
			get_sanjiao() {
				var ua = navigator.userAgent.toLowerCase();
				var isWeixin = ua.indexOf('micromessenger') != -1;
				if (!isWeixin) {
					for (var key in this.$route.params) {
						console.log(this.$route.params[key]);
						if (this.$route.params[key] == "type=true") {
							return "iosOrweixin_sanjiao";
						}
					}
				}
			},
			getlist() {
				var ua = navigator.userAgent.toLowerCase();
				var isWeixin = ua.indexOf('micromessenger') != -1;
				if (!isWeixin) {
					for (var key in this.$route.params) {
						console.log(this.$route.params[key]);
						if (this.$route.params[key] == "type=true") {
							return "iosOrweixin_list";
						}
					}
				}
			},
			setblack() {
				// showIcon
				const _this = this;
				if (this.showIcon == true) {
					for (var key in this.$route.params) {
						if (this.$route.params[key] == "type=true") {
							_this.blackShow = true;
						} else {
							_this.blackShow = false;
						}
					}
				}
			},
			getTitle(title) {
				const log = console.log;
				console.log(title)
				wxapi.getshare(this.$url, title);
				
				// if (title == undefined || title == null) {
				// 	wxapi.getshare(this.$url, this.msgHeader);
				// 	console.log(this.msgHeader);
				// } else {
				// 	wxapi.getshare(this.$url, title);
				// }
			},
			gouwuche() {
				this.dropShow = false;
				//加入购物车
				if (isAndroid) {
					androidApp.skipShopCart();
				}
				if (isiOS) {
					// window.webkit.messageHandlers.GoToAppGouWuChePage("");
					window.webkit.messageHandlers.GoToAppGouWuChePage.postMessage("");
				}
			},
			handleBack() {
				console.log(this.$route.query.status, 'sssssssss')
				if (this.$route.query.status) { //H5的返回

					this.$router.go(-this.$route.query.status);
				} else {
					if (isAndroid) {
						androidApp.backUpper()
					}
					if (isiOS) {
						window.webkit.messageHandlers.ReturnBackAPP.postMessage("");
					}
				}

			},
			//分享
			share() {
				let sss = window.location.hash;
				let arr = sss.split("/");
				arr[3] = 'type=true';
				let url = arr.join("/");
				console.log("http://www.peihuayuren.com:8080/dist/index.html" + url)
				if (isAndroid) {
					androidApp.share("http://www.peihuayuren.com:8080/dist/index.html" + url);
				}
				if (isiOS) {
					window.webkit.messageHandlers.GoToAppShare.postMessage("http://www.peihuayuren.com:8080/dist/index.html" + url);
				}
			},
			slideDownMenuToggle() {
				this.dropShow = !this.dropShow
			},
			jumpIndex() {
				this.dropShow = false;
				if (isAndroid) {
					androidApp.skipHome()
				}
				if (isiOS) {
					window.webkit.messageHandlers.GoToAppHomePage.postMessage("");
				}
			},
			jumpMsg() {
				this.dropShow = false;
				if (isAndroid) {
					androidApp.skipMessage()
				}
				if (isiOS) {
					window.webkit.messageHandlers.GoToAppMessagePage.postMessage("");
				}
			},
			jumpSearch() {
				this.dropShow = false;
				if (isAndroid) {
					androidApp.skipSearch()
				}
				if (isiOS) {
					window.webkit.messageHandlers.GoToAppSearchPage.postMessage("");
				}
			},
			jumpCollect() {
				this.dropShow = false;
				if (isAndroid) {
					androidApp.skipCollection()
				}
				if (isiOS) {
					window.webkit.messageHandlers.GoToAppCollectionPage.postMessage("");
				}
			},
			jumpBrowse() {
				this.dropShow = false;
				if (isAndroid) {
					androidApp.skipBrowse()
				}
				if (isiOS) {
					window.webkit.messageHandlers.GoToAppBrowsePage.postMessage("");
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	#iosOrweixin_list {
		top: 148px !important;
	}

	#iosOrweixin_sanjiao {
		top: 140px !important;
	}

	.iosHeader {
		padding-top: 44px;
		/*px*/
		height: 132px;
		/*px*/
		z-index: 100;

		@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
			padding-top: 88px;
			/*px*/
			height: 176px;
			/*px*/
		}

		@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
			padding-top: 88px !important;
			/*px*/
			height: 176px;
			/*px*/
		}
	}

	.minHead {
		top: 108px;
		/*px*/
	}

	header {
		width: 100%;
		background-color: #fff;
		color: #333;
		box-shadow: 0 2px 2px rgba(33, 33, 33, 0.1);
		/*px*/
		z-index: 999999 !important;
		height: 88px;
		/*px*/
		font-size: 36px;
		/*px*/


	}

	.icon-iconback:before {
		font-size: 40px;
		/*px*/
		font-weight: 700;
	}

	.fadeIn {
		opacity: 1 !important;
		z-index: 999 !important;
	}

	.icon-sortlight:before,
	.icon-share_fill:before {
		font-size: 40px;
		/*px*/
	}

	.icon-sortlight:before {
		font-weight: bold;
		padding: 0 10px;
		/*px*/
	}

	.menuHover {
		transition: 0.3s;
		opacity: 0;
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0);
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.slideDownMenu {
		transition: 0.3s;
		opacity: 0;
		position: fixed;
		top: 157px;
		/*px*/
		right: 21px;
		/*px*/
		z-index: -1;
		background-color: rgba(255, 255, 255, 0.98);
		padding: 0 42px;
		/*px*/
		border-radius: 15px;
		/*px*/
		box-shadow: 0px 0px 10px rgba(33, 33, 33, 0.2);

		@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
			top: 200px !important;
			/*px*/
		}

		@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
			top: 200px !important;
			/*px*/
		}

		li {
			display: flex;
			align-items: center;
			padding: 20px 0;
			/*px*/
			border-bottom: 1px solid #efefef;
			/*px*/
			font-size: 30px;

			/*px*/
			img {
				width: 30px;
				/*px*/
				height: 30px;
				/*px*/
				margin-right: 40px;
				/*px*/
			}
		}

		li:last-of-type {
			border-bottom: 0;
		}
	}

	.isAndroid {
		top: 102px !important;
		/*px*/
	}

	.isAndroid_bottom {
		top: 115px !important;
		/*px*/
	}

	.tangle {
		z-index: 1000 !important;
		transition: 0.3s;
		opacity: 0;
		position: fixed;
		top: 145px;
		/*px*/
		right: 24px;
		width: 18px;
		height: 18px;
		background-color: #fff;
		transform: rotate(45deg);

		// box-shadow: -1px -1px 3px #f00,-1px -1px 3px #f00,-1px 3px #fff,-1px 3px #fff;
		@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
			top: 180px !important;
			/*px*/
		}

		@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
			top: 180px !important;
			/*px*/
		}
	}

	@media screen and (min-device-width: 768px) {
		header {
			padding-top: 44px;
			/*px*/
			height: 128px;
			/*px*/
		}
	}
</style>
<style lang="scss">
	.mint-header-title {
		font-size: 20px;
	}
</style>
