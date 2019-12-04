<template>
	<div class="Book_details">
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
		<second-Header :msgHeader="resultObject.cname" :showIcon="false"></second-Header>
		<div style="overflow: scroll;" :style="{ height: (wrapperHeight+40) + 'px' }">
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottomDropText="松手更新" bottomLoadingText="加载中..." bottomPullText="上拉加载">
		<div id="content" :style="{'-webkit-overflow-scrolling': scrollMode}">
       <!-- <ul>
         <li v-for="(item,index) in listdata" >{{item.name}}</li>
         <li v-for="(item,index) in downdata" >{{item.name}}</li>
       </ul> -->
				<div class="TitleHeader">
					<img src="../assets/icons/Book_details_one.png" alt="">
					<span>推荐导语</span>
					<p>{{resultObject.cdesc}}</p>
				</div>
				<ul class="zhuti"  ref="wrapper">
					<li class="list" v-for="(item,index) in dataList" :key="index">
						<span class="num">{{index+1}}</span>
						<dl>
							<dd>
								<img :src="item.showImg" alt="">
							</dd>
							<dt v-if="item.cname">{{item.cname}}</dt>
						</dl>
						<p class="tallyBox" v-if="item.firstTag && item.ctype">
							<span class="tally" v-if="item.firstTag">{{item.firstTag}}</span>
							<span class="tally grade" v-if="item.ctype">{{item.ctype}}</span>
						</p>
						<p class="author" v-if="item.author">{{item.author}}</p>
						<p class="publishing" v-if="item.pubAddress">{{item.pubAddress}}</p>
					</li>
					<div style="clear:both"></div>
					<!-- 上拉加载更多的提示文字 -->
					<!-- <div class="loging_gengd">上拉加载更多</div> -->
				</ul>
				<div v-if="weishuju" class="weikong">没有更多数据了...</div>
				 <!-- <solt name="bottom"> -->
					<div class="loging_gengd" slot="bottom"  v-if="!weishuju">
						<!-- <img src="../assets/img/loding.gif" alt=""> -->上拉加载更多
					</div>
					
				<!-- </solt> -->
		</div>
			</mt-loadmore>
		</div>

		 <footer v-if="isWeixin" @click="wxShow">
			<button>
				<img src="../assets/icons/service.png" alt="" class="detailFootIcon">
				<p>客服</p>
			</button>
			<button>加入购物车</button>
		</footer> 
		<footer v-else>
			<button @click="service">
				<img src="../assets/icons/service.png" alt="" class="detailFootIcon">
				<p>客服</p>
			</button>
			<button @click="choice()">立即购买</button>
		</footer>
	</div>
</template>

<script>
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	import SecondHeader from '../components/secondHeader';
	import Scroll from './scroll';
	import {
		Loadmore
	} from 'mint-ui';
	import axios from "axios";
	import qs from 'qs';
	export default {
		data() {
			return {
				wrapperHeight: 0,
				isWeixin: true, //微信环境判断
				isBrower: false, //浏览器环境判断
				dataList: [], //加载的更多数据
				cous: 0, //开始的页码
				resultObject: [], //数据源
				showDown: false, //下载提示
				openDown: false, //浏览器打开提示
				allLoaded: false,
				scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
				bookList: [], //书单列表
				weishuju: false, //沒有数据显示的文字
			}
		},
		components: {
			SecondHeader,
			'v-scroll': Scroll
		},
		created() {
			this.getList();
			//判断是否微信打开APP
			let ua = navigator.userAgent.toLowerCase();
			this.isWeixin = ua.indexOf('micromessenger') != -1;
		},
		mounted(){
			  this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
		},
		methods: {
			loadBottom() {
				this.$refs.loadmore.onBottomLoaded();
				this.getList();
			},
			shure() {
				this.showDown = false;
			},
			openbrower() {
				this.openDown = false;
			},
			getList() {
				this.cous++;
				let Mydata = {
					userId: this.$route.params.userId, // 当前用户id 
					rbId: this.$route.params.rbId, // 
					pageIndex: this.cous, //页数
					pageSize: 9 //每页几条
				};
				axios.post(this.$url+'goods/json/getRecommendBookList', qs.stringify(Mydata)).then((
					response) => {
					//success
					console.log(response);
					if (response.data.code === 10000) {
						if (response.data.resultObject.dataList.length < 9) {
							this.allLoaded = true;
							console.log("没有更多数据了");

							this.weishuju = true;
						}
						this.$nextTick(function() {
							this.scrollMode = "touch";
						});
						this.resultObject = response.data.resultObject;
						this.dataList = this.dataList.concat(response.data.resultObject.dataList);
					}
				}, (error) => {
					console.log(error)
				});
			},
			wxShow() {
				this.openDown = true;
			},
			service() {
				if (isAndroid) {
					androidApp.skipService("", "", "", "", "");
				}
				if (isiOS) {
					let obj = {
						imgurl: "",
						name: "",
						Text: "",
						percentage: "",
						Urlid: ""
					};
					let MYdata = JSON.stringify(obj);
					window.webkit.messageHandlers.GoToAppKeFuPage.postMessage(MYdata);
				}
			},
			/*
			    立即购买
			 */
			choice() {
				this.$router.push(`/bookList/${this.$route.params.rbId}/${this.$route.params.userId}?status=1`)
			},
			/*
				客服
			*/
		}
	}
</script>

<style scoped>
	html,body,#container{
		min-height: 100%;
		background-color: #F1F1F1;
	}
</style>

<style lang="scss" scoped>
	
	.zhuti{
		padding-top: 40px;/*px*/
		border-top: 12px solid #f1f1f1;/*px*/
		background-color: #F1F1F1;
		// padding-bottom: 60px;
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

	.Book_details {
		width: 100%;

		.TitleHeader {
			width: 100%;
			//height: 220px;
			/*px*/
			padding-top: 35px;
			/*px*/
			background: rgba(255, 255, 255, 1);

			img {
				height: 40px;
				/*px*/
				width: 60px;
				/*px*/
				float: left;
				margin-right: 10px;/*px*/
			}

			span {
				height: 40px;
				/*px*/
				font-size: 36px;
				/*px*/
				font-family: PingFangSC-Regular;
				font-weight: bold;
				color: rgba(34, 34, 34, 1);
				line-height: 40px;
				/*px*/
			}

			p {
				padding: 35px 20px 37px;
				/*px*/
				font-size: 28px;
				/*px*/
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 42px;
				/*px*/
				text-indent: 2em;
			}
		}

		#content {
			margin-top: 10px;
			/*px*/
			overflow: scroll;

			/*px*/
			li:nth-child(3n+1) {
				margin-left: calc(3% - 4px);
				@media only screen and (min-height: 928px) and (max-height: 1370px) {
					margin-left: calc(5% - 10px);
				}
			}

			li:nth-child(3n+2) {
				margin: 0 2%;
			}

			li:nth-child(3n) {
				margin-right: calc(3% - 5px);
				@media only screen and (min-height: 928px) and (max-height: 1370px) {
					margin-right: calc(5% - 10px);
				}
			}

			.list {
				width: 28%;
				float: left;
				margin-bottom: 10px;
				position: relative;
				background-color: #ffffff;
				border-radius: 15px;/*px*/
				padding: 10px 0px 10px 10px;
				.num {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 51px;
					/*px*/
					height: 35px;
					/*px*/
					background: rgba(0, 0, 0, 1);
					opacity: 0.2;
					border-radius: 15px 0px 15px 0px;
					/*px*/
					line-height: 35px;
					/*px*/
					font-size: 24px;
					/*px*/
					color: #ffffff;
					text-align: center;
				}

				dl {
					dd {
						img {
							display: block;
							height: 150px;
							/*px*/
							width: auto;
							/*px*/
							margin: 0 auto 24px;
							/*px*/
						}
						@media only screen and (min-height: 928px) and (max-height: 1370px) {
							img {
								height: 250px;
								/*px*/
								width: auto;
								/*px*/
							}
						}
					}

					dt {
						height: 70px;
						/*px*/
						font-size: 24px;
						/*px*/
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(34, 34, 34, 1);
						line-height: 34px;
						/*px*/
						width: 100%;
						word-break: break-all;
						display: -webkit-box;
						/**对象作为伸缩盒子模型展示**/
						-webkit-box-orient: vertical;
						/**设置或检索伸缩盒子对象的子元素的排列方式**/
						-webkit-line-clamp: 2;
						/**显示的行数**/
						overflow: hidden;
						/**隐藏超出的内容**/

					}
					@media only screen and (min-height: 928px) and (max-height: 1370px) {
						dt {
							font-size: 32px;/*px*/
						}
					}
				}

				.tallyBox {
					margin-top: 10px;
					/*px*/
					height: 40px;
					
					/*px*/
					.tally {
						font-size: 20px;/*px*/
						display: inline-block;
						overflow: hidden;
						text-align: center;
						width: 120px;
						/*px*/
						height: 30px;
						/*px*/
						line-height: 32px;
						/*px*/
						background: rgba(255, 255, 255, 1);
						border: 1px solid rgba(213, 122, 254, 1);
						border-radius: 4px;
						/*px*/
						//margin-right: 6px;
						/*px*/
						color: rgba(194, 60, 255, 1);

						white-space: nowrap;
						/*设置内容不换行*/
						text-overflow: ellipsis;
						/*设置文字超出文本框的内容显示成...*/
						overflow: hidden;
					}

					.grade {
						font-size: 17px;/*px*/
						width: 73px;
						/*px*/
						height: 30px;
						/*px*/
						background: rgba(214, 136, 253, 1);
						border: 1px solid rgba(213, 122, 254, 1);
						border-radius: 4px;
						/*px*/
						color: rgba(255, 255, 255, 1);
						margin-right: 0px;
						
					}
					@media (max-height: 928px) {
						.grade {
							float: right;
						}
					}
					@media only screen and (min-height: 928px) and (max-height: 1370px) {
						.grade {
							margin-left: 8px;/*px*/
						}
					}
				}

				.author {
					height: 62px;
					/*px*/
					font-size: 20px;
					/*px*/
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					// line-height: 25px;
					/*px*/
					margin: 16px 0px;
					/*px*/
			display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
overflow: hidden;
				}

				.publishing {
					height: 22px;
					/*px*/
					font-size: 22px;
					/*px*/
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #555555;
					line-height: 22px;/*px*/
					width: 90%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					/*px*/
					@media only screen and (min-height: 928px) and (max-height: 1370px) {
						font-size: 26px;/*px*/
						line-height: 26px;/*px*/
						height: 28px;/*px*/
					}
				}
			}
			.loging_gengd{
				// padding: 5px 0;/*px*/
				padding-top: 30px;/*px*/
				padding-bottom: 30px;/*px*/
				text-align: center;
				img{
					width: 50px;/*px*/
					vertical-align: middle;
				}
			}
			.weikong {
				text-align: center;
				padding: 20px 0;/*px*/
				color: rgba(102, 102, 102, 1);
			}
		}

		footer {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100px;

			/*px*/
			button {
				width: 30%;
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
				width: 70%;
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

	}
</style>
