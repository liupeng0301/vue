<template>
	<div class="darkContainer">
		<!-- 下载提示 -->
		<div class="mask" v-show="showDown">
			<div class="return-pk4">
				<p class="titt">
					如果您尚未安装"幼趣"App，请点击下载
				</p>
				<div class="down">
					<p class="shure" @click="shure">取消</p>
					<p class="no-shure">下载</p>
				</div>
			</div>
		</div>
		<!-- 浏览器打开提示 -->
		<div class="down0" v-show="openDown" @click="openbrower">
			<img src="../assets/icons/openBrower.png" alt="">
		</div>
		<second-Header msgHeader="商品详情" :showIcon="true"></second-Header>
		<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc" :index="index"></big-img>

		<section class="images">
			<!-- <p class="tit2">图文详情</p> -->
			<div class="detail-discribe">
				<img v-for="(i,index) in resultObject" :key="index" :src="i" alt="" @click="clickDet(index,resultObject)">
			</div>
		</section>
		<footer v-if="isWeixin" @click="wxShow">
			<button>
				<img src="../assets/icons/service.png" alt="" class="detailFootIcon">
				<p>客服</p>
			</button>
			<button>选择单品</button>
		</footer>
		<footer v-else-if="isBrower" @click="openAPP">
			<button>
				<img src="../assets/icons/service.png" alt="" class="detailFootIcon">
				<p>客服</p>
			</button>
			<button>选择单品</button>
		</footer>
		<footer v-else>
			<button @click="service">
				<img src="../assets/icons/service.png" alt="" class="detailFootIcon">
				<p>客服</p>
			</button>
			<button @click="choice()">选择单品</button>
		</footer>
		<!-- 	<footer>
			<button @click="service">
				<img src="../assets/icons/service.png" alt="" class="detailFootIcon">
				<p>客服</p>
			</button>
			<button @click="choice()">选择商品</button>
		</footer> -->

	</div>
</template>
<script>
	import BigImg from '../components/BigImg'
	import {
		Toast
	} from 'mint-ui';
	import SecondHeader from '../components/secondHeader';
	import Swiper from "swiper";
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

	export default {
		name: "shopItemDetail",
		data() {
			return {
				itemID: "",
				resultObject: [],
				item: [],
				carousel: [],
				cimg: [],
				popupVisible: false,
				counter: 1,
				active: false,
				num: 1,
				sort: "",
				userId: "",
				id: "",
				courseType: "",
				showImg: false,
				imgSrc: '',
				index: "",
				showDown: false, //下载提示
				isWeixin: true, //微信环境判断
				openDown: false, //浏览器打开提示
				isBrower: false, //浏览器环境判断
			}
		},
		components: {
			// Carousel
			BigImg,
			SecondHeader
		},
		created() {
			var obj = {
				name: "小秘境",
				aghe: 18
			};
			console.log(obj);
			console.log(obj.name);
			delete obj.name
			console.log(obj);
			console.log(obj.name);


			this.id = this.$route.params.id;
			this.userId = this.$route.params.userid;


			//判断是否微信打开APP
			let ua = navigator.userAgent.toLowerCase();
			this.isWeixin = ua.indexOf('micromessenger') != -1;

			if (this.userId === 'type=true') {
				this.isBrower = true;
			}
			var browser = {
				versions: function() {
					var u = navigator.userAgent,
						app = navigator.appVersion;
					return { //移动终端浏览器版本信息 
						webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
					};
				}(),
				//language:(navigator.browserLanguage || navigator.language).toLowerCase()
			}
			if (browser == true) {
				this.isBrower = true;
			}
			console.log(this.$route.params);
			let goodsId = this.$qs.stringify({
				goodsId: this.$route.params.goodsId
			})
			this.$axios({
					method: 'post',
					url: this.$url + 'goods/json/getSpecialGoods',
					data: goodsId,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					async: true
				})
				.then(data => {
					console.log(data);
					if (data.data.code === 10000) {
						console.log(data.data.resultObject.showImg.split(","))
						this.resultObject = data.data.resultObject.showImg.split(",");
						this.itemID = data.data.resultObject.goodsId;
					} else {
						Toast({
							message: '未知异常',
							position: 'bottom',
							duration: 2000
						});
					}
					// this.resultObject
				});


		},
		watch: {
			// item: function() {
			// 	this.cimg = this.item.picUrlList;
			// 	this.courseType = this.item.courseType
			// }
		},
		filters: {
			myCurrency: function(myInput, arg1) {
				//根据业务需要，对传来的数据进行处理
				// 并返回处理后的结果
				var result = myInput + arg1;
				return result;
			}
		},
		mounted() {

		},
		methods: {
			clickDet(index, data) {
				this.showImg = true;
				// 获取当前图片地址
				this.imgSrc = data;
				this.index = index;
			},
			viewImg() {
				this.showImg = false;
			},
			service() {
				let imgurl = this.cimg[0];
				//name
				let name = this.item.name;
				//文字
				let Text = this.item.courseNum ? this.item.courseNum : 0;
				//id值
				let id = this.id;
				let userId = this.userId;
				let Urlid = "http://www.peihuayuren.com:8080/dist/index.html#/classDetail/" + id + "/userId";
				if (isAndroid) {
					androidApp.skipService(imgurl, name, Text, "  ", Urlid);
				}
				if (isiOS) {
					// window.webkit.messageHandlers.GoToAppKeFuPage.postMessage("");
					let obj = {
						imgurl: imgurl,
						name: name,
						Text: Text,
						percentage: "  ",
						Urlid: Urlid
					};
					let MYdata = JSON.stringify(obj);
					window.webkit.messageHandlers.GoToAppKeFuPage.postMessage(MYdata);
				}
			},

			/*
			    选择课程
			 */
			choice() {
				// this.$router.push(`/commodityList/${this.userId}/${this.$route.params.goodsId}?status=1`)
				this.$router.push(`/commodityList/${this.userId}/${this.itemID}?status=1`)
				//window.location = "http://www.peihuayuren.com:8080/dist/index.html#/classList/" + this.userId + "/" + this.item.id;
			},
			wxShow() {
				this.openDown = true;
			},
			shure() {
				this.showDown = false;
			},
			openAPP() {
				if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
					window.location = "YouQuApp://";
				} else if (navigator.userAgent.match(/android/i)) {
					window.location = "YouQuApp://"
				};

			},

			openbrower() {
				this.openDown = false;
			}
		}
	}
</script>
<style scoped lang="scss">
	.down0 {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10000;

		img {
			display: block;
			height: 100%;
			width: 100%;
		}
	}

	.icon-sortlight:before,
	.icon-share-alt:before,
	.icon-back:before {
		font-size: 44px;
		/*px*/
		font-weight: bold;
	}

	.item-name,
	.item-detail,
	.tit2 {
		background-color: #fff;
	}

	.tit {
		padding-top: 27px;
		/*px*/
		line-height: 72px;
		/*px*/
		padding-left: 32px;
		/*px*/
		font-size: 36px;
		/*px*/
	}

	.tit2 {
		background-color: #fff;
		line-height: 72px;
		/*px*/
		padding-left: 32px;
		/*px*/
		font-size: 36px;
		/*px*/
	}

	.item-name {
		.desc {
			font-size: 26px;
			/*px*/
			color: #A1A1A1;
			padding: 0 32px;
			/*px*/
			padding-bottom: 55px;
			/*px*/
			display: flex;
			justify-content: space-between;
		}

		span:first-of-type,
		span:last-of-type {
			color: #333;
		}

		.notice-text {
			color: #D081FD;
		}
	}

	.item-detail {
		margin-top: 10px;

		ul li {
			list-style: none;
			font-size: 14px;
			width: calc(100% - 32px);
			padding: 8px 16px;
			display: flex;

			>div {
				width: 30%;
			}
		}
	}

	.images {
		margin-top: 10px;
		/*px*/
	}

	.weak {
		color: #A1A1A1;
	}

	.detail-discribe {
		background-color: #fff;

		img {
			width: 100%;
		}
	}

	.detail-discribe:last-of-type {
		padding-bottom: 100px;
		/*px*/
	}

	.board>ul {
		width: 100vw;
		background-color: #fff;
		padding: 20px 0 0;

		li {
			width: calc(100% - 32px);
			padding: 5px 16px;
			position: relative;
			display: flex;
		}

		li:last-of-type {
			padding: 0px;
			width: 100%;
		}

		.descBox {
			div:last-of-type {
				padding-right: 16px;
				position: absolute;
				width: 50%;
				right: 0;
				bottom: 5px;
			}

			p:first-of-type {
				font-size: 18px;
				color: #222222;
				margin-bottom: 6px;
			}

			p:last-of-type {
				font-size: 14px;
			}
		}

		li.numBox {
			height: 50px;
			line-height: 50px;
			border-top: 1px solid #efefef;

			span {
				margin-right: 30%;
				font-size: 18px;
			}

			button,
			input {
				display: inline-block;
				height: 30px;
				width: 40px;
				text-align: center;
				background: #f5f5f5;
				font-size: 14px;
				border: none;
				margin-top: 10px;
			}

			input {
				margin: 10px 2px 0;
			}
		}

		li.btnGroup {
			display: block;
		}

		.close {
			position: absolute;
			top: 0;
			right: 16px;
		}

		button.confirm-btn {
			width: 100%;
			height: 50px;
			text-align: center;
			color: #ffffff;
			line-height: 50px;
			border: none;
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

	footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100px;

		/*px*/
		button {
			width: 40%;
			height: 100%;
			border: 0;
			color: #585858;
			background-color: #fff;
			border-top: 1px solid #f0f0f0;
			/*px*/
		}

		button:first-of-type {
			border-right: 1px solid #F0F0F0;
			/*px*/
		}

		button:last-of-type {
			font-size: 32px;
			/*px*/
			width: 60%;
			background: -webkit-linear-gradient(#EB98FD, #AA57DC);
			/* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(#EB98FD, #AA57DC);
			/* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(#EB98FD, #AA57DC);
			/* Firefox 3.6 - 15 */
			background: linear-gradient(#EB98FD, #AA57DC);
			/* 标准的语法 */
			color: #fff;
			float: right;
		}

		.detailFootIcon {
			display: block;
			height: 32px;
			/*px*/
			width: 32px;
			/*px*/
			margin: 0 auto 5px;
			/*px*/
		}

		p {
			font-size: 22px;
			/*px*/
		}
	}

	.mask {
		position: fixed;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		background: rgba(33, 33, 33, 0.6);
		z-index: 990;

		.return-pk4 {
			position: absolute;
			z-index: 999;
			background: #ffffff;
			width: 295px;
			left: 50%;
			margin-left: -148px;
			top: 40%;
			border-radius: 10px;

			.titt {
				text-align: center;
				padding-left: 5px;
				padding-right: 5px;
				font-size: 17px;
				max-width: 295px;
				line-height: 35px;
				padding: 1.7em 20px;
			}

			.down {
				float: left;
				width: 100%;

				.shure {
					width: 50%;
					float: left;
					font-size: 17px;
					border-top: 1px solid #D5D5D6;
					box-sizing: border-box;
					line-height: 40px;
					text-align: center;
					padding: 0;
					color: #222222;
					border-right: 1px solid #D5D5D6;
				}

				.no-shure {
					width: 50%;
					float: left;
					font-size: 17px;
					border-top: 1px solid #D5D5D6;
					box-sizing: border-box;
					line-height: 40px;
					text-align: center;
					padding: 0;
					color: #222222;
				}
			}
		}
	}
</style>
<style lang="scss">
	.mint-toast {
		z-index: 2500 !important;
	}

	.detail-discribe {
		background-color: #fff;
		padding: 0;

		img {
			width: 100%;
			display: block;
		}
	}

	.icon-biaodankongjiandanxuan {
		font-size: 50px !important;
	}
</style>
