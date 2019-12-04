<template>
	<div class="National">
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
		
		<second-Header :msgHeader="msgHeader" :showIcon="true"></second-Header>
		
		<header>
			<img src="../assets/img/national.png" alt="" style="padding-bottom:20px;">
			<div>
				<p class="top">
					<img src="../assets/icons/tuoyuan.png" alt="">
					<span>推荐导语</span>
				</p>
				<p class="bottom">在祖国妈妈七十岁生日来临之际，很多园所都在紧锣密鼓地开展与国庆相关的主题活动，让孩子感受为祖国庆生的喜悦与快乐。精彩的活动方案怎能少？小编这就奉上收藏已久的国庆活动秘籍！有木有很贴心呀～</p>
			</div>
		</header>
		
		<section>
			<ul>
				<li v-for="item in myData" @click="Tiaozhuan(item)">
					<div class="left_"><img :src="item.imgurl" alt=""></div>
					<div class="right_">
						<div class="right_home">
							<span>{{item.nameTop}}<br> {{item.nameBottom}}</span>
						</div>
					</div>
				</li>
			</ul>
		</section>

	</div>

</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	import SecondHeader from '../components/secondHeader';
	export default {
		data() {
			return {
				msgHeader:"庆国庆、幼儿园里这样过！",
				openDown: false, //浏览器打开提示
				showDown: false, //下载提示		
				myData: [{
						imgurl: "http://image.ybk008.com/11569318213677",
						nameTop: "国庆节手工合集：",
						nameBottom: "应景的国庆元素，动动手感受爱国意义",
						id: "69d1a2d41c4644a58f16daf6508206ee"
					},
					{
						imgurl: "http://image.ybk008.com/21569318229106",
						nameTop: "幼儿园国庆儿歌大揭秘：",
						nameBottom: "和孩子一起唱起爱国歌",
						id: "9b4ab85b2d1148dca346c6dc733880a6"
					},
					{
						imgurl: "http://image.ybk008.com/31569318243790",
						nameTop: "国庆节爱国教育好时机：",
						nameBottom: "你想要的班级环创这里都有！",
						id: "2120a79a913942d0baedaff257ade0e5"
					},
					{
						imgurl: "http://image.ybk008.com/41569318259554",
						nameTop: "国庆节活动只适合社会课？",
						nameBottom: "NO~拿起小旗一起来做操。",
						id: "ce7b93a0b2154ab38f573db6628fae78"
					},

					//----
					{
						imgurl: "http://image.ybk008.com/51569318274374",
						nameTop: "国庆节主题教案来一波，在课堂中增加爱国情怀：",
						nameBottom: "小班教案《升国旗》",
						id: "774303be02e04647baad0eea519797db"
					},
					{
						imgurl: "http://image.ybk008.com/61569318300190",
						nameTop: "国庆节主题教案来一波，在课堂中增加爱国情怀：",
						nameBottom: "中班教案《我爱国旗》",
						id: "4f8ce302f13340418438627152f223c3"
					},
					{
						imgurl: "http://image.ybk008.com/71569318322716",
						nameTop: "国庆节主题教案来一波，在课堂中增加爱国情怀：",
						nameBottom: "大班教案《美丽的祖国》",
						id: "c795176213ba47e6b03f3f6e626d7bf8"
					},
					{
						imgurl: "http://image.ybk008.com/81569318335587",
						nameTop: "节日环创：",
						nameBottom: "国庆节班级这样布置，过节气氛浓（小班篇）",
						id: "337e3a82424f49179536624f7ac94291"
					},
					{
						imgurl: "http://image.ybk008.com/91569318348378",
						nameTop: "节日环创：",
						nameBottom: "国庆节班级这样布置，过节气氛浓（中班篇）",
						id: "61e2433ea0c84af0a204b8f1e96692a8"
					},
					{
						imgurl: "http://image.ybk008.com/101569318360173",
						nameTop: "节日环创：",
						nameBottom: "国庆节班级这样布置，过节气氛浓（大班篇）",
						id: "7ceba7e4515b40c89cd49d3bfb5e97b1"
					},
					{
						imgurl: "http://image.ybk008.com/111569318371680",
						nameTop: "听说这样的体育游戏，和国庆阅兵更配呦：",
						nameBottom: "中班体育游戏教案《勇敢的小士兵》",
						id: "0841f862e8ea478bb9b0ef262668ef1a"
					},
					{
						imgurl: "http://image.ybk008.com/121569318385524",
						nameTop: "听说这样的体育游戏，和国庆阅兵更配呦：",
						nameBottom: "大班体育游戏教案《我是小小解放军》",
						id: "7a603a1092da414abdc0f3b72ab1d2dc"
					},
				]
			}
		},
		components: {
			SecondHeader,
		},
		methods: {
			shure() {
				this.showDown = false;
			},
			openbrower() {
				this.openDown = false;
			},
			Tiaozhuan(item) {
				if (this.$route.params.userId == "userId") {
					Toast({
						message: '请先登录app',
						position: 'bottom',
						duration: 1000
					});
				} else {
					this.$router.push(`/advisory/${item.id}/${this.$route.params.userId}?status=1&heads=true`)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@media only screen and (min-width: 600px) {
		.top{
			img{
				width:85px !important;/*px*/
			}
			span{
					font-size:38px !important;/*px*/
			}
		}
		.bottom{
			font-size:33px !important;/*px*/
			}
		section {
			ul {
				li {
					height: 400px !important;

					/*px*/
					.right_ {
						right: 104px !important;

						/*px*/
						.right_home {
							span{
								margin-left:120px !important;/*px*/
									font-size:35px !important;/*px*/
							}
						}
					}
				}
			}
		}
	}
	@media only screen and (min-width: 1000px) {
		
			.top{
				img{
					width:100px !important;/*px*/
				}
				span{
						font-size:50px !important;/*px*/
				}
			}
			.bottom{
				font-size:43px !important;/*px*/
				line-height: 59px !important;/*px*/
				}
			section {
				ul {
					li {
						margin:40px 0!important;/*px*/
						height: 500px !important;
		
						/*px*/
						.right_ {
							right: 104px !important;
		
							/*px*/
							.right_home {
								span{
									margin-left:150px !important;/*px*/
									font-size:45px !important;/*px*/
								}
							}
						}
					}
				}
			}
		
	}
	

	.National {
		width: 100%;
		height: 100%;

		header {
			background: #D24845;
			width: 100%;
			// padding-bottom: 40px;

			padding-bottom: 60px;
			/*px*/

			img {
				width: 100%;

			}

			div {
				width: 92%;
				border-radius: 9px;
				/*px*/
				margin: auto;
				background: #FFFFFF;
				padding-bottom: 40px;

				/*px*/
				.top {
					padding-top: 30px;
					/*px*/
					padding-bottom: 20px;
					/*px*/
					display: flex;
					align-items: center;

					img {
						width: 75px;
						/*px*/
					}

					span {
						font-size: 36px;
						/*px*/
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba(34, 34, 34, 1);
						margin-left: 20px;
						/*px*/
					}
				}

				.bottom {
					width: 90%;
					margin: auto;
					text-indent: 2em;
					text-align: justify;
					font-size: 28px;
					/*px*/
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					line-height: 42px;
					/*px*/
				}
			}
		}

		section {
			width: 100%;
			border-top-left-radius: 20px;
			/*px*/
			border-top-right-radius: 20px;
			/*px*/
			margin-top: -30px;
			/*px*/
			background: rgba(255, 255, 255, 1);

			ul {
				width: 90%;
				margin: auto;
				padding-top: 20px;
				/*px*/

				li {
					background: rgba(248,247,252, 1);
					border-radius: 15px;
					/*px*/
					overflow: hidden;
					margin: 20px 0;
					/*px*/
					height: 220px;
					/*px*/
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					// position: relative;

					.left_ {
						width: 40%;
						height: 100%;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.right_ {
						// position: absolute;
						right: 48px;
						/*px*/
						flex: 1;
						width: 60%;
						display: flex;
						flex-wrap: wrap;
						align-items: center;
						height: 100%;
						background: url(../assets/img/juxing.png) no-repeat;
						background-size: 100% 100%;
						position: relative;

						// position: absolute;
						.right_home {
							position: absolute;
							z-index: 100;
							height: 100%;
							display: flex;
							align-items: center;

							span {
								width: 90%;
								display: inline-block;
								font-size: 30px;
								/*px*/
								font-family: PingFang SC;
								font-weight: 500;
								color: rgba(34, 34, 34, 1);
								margin-left: 60px;
								/*px*/
							}
						}
					}
				}
			}
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
