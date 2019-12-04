<template>
	<div class="temlapteThreeHome">
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

		<second-Header msgHeader="消防日来临，送你一份幼儿园的安全教育宝典秘籍～" :showIcon="true"></second-Header>

		<header>
			<img src="http://image.peihuayuren.com/sjb201910241805.jpg" alt="">
		</header>
		<div class="TitleHeader">
			<img src="../assets/icons/Book_details_one.png" alt="">
			<span>推荐导语</span>
			<p>保证孩子们的安全，是所有活动的基础和前提。本期推送包含了安全隐患、习惯养成、灾难逃生以及早期性教育的渗入，让孩子们在益智游戏、角色扮演中增强安全意识，最接地气的安全教育玩具和游戏都在这里。</p>
		</div>

		<div class="home">
			<nav style="width:260px;">
				<img src="../assets/img/Recommended.png" alt="">
			</nav>
			<ul class="Play_ul">
				<li v-for="item in PlayArr">
					<img :src="item.imgurl" alt="">
					<div class="books_li_bottom">
						<p class="Play_ul_top">{{item.name}}</p>
						<div class="Play_ul_bottom">
							<p class="Play_ul_bottom_left">
								<span v-for="i in item.leftName">{{i}}</span>
							</p>
							<button @click="goBuy(item,1)">立即购买</button>
						</div>
					</div>
				</li>
			</ul>
			<nav>
				<img src="../assets/img/books.png" alt="">
			</nav>

			<ul class="books">
				<li v-for="item in booksArr">
					<div class="books_li_top">
						<img :src="item.imgurl" alt="">
						<span>{{item.classification}}</span>
					</div>
					<div class="books_li_bottom">
						<p class="Play_ul_top">《<span> {{item.name}}</span>》</p>
						<p class="Play_ul_center">{{item.Author}}</p>
						<div class="Play_ul_bottom">
							<p class="Play_ul_bottom_left">
								<span v-for="i in item.leftName">{{i}}</span>
							</p>
							<button @click="goBuy(item,1)">立即购买</button>
						</div>
					</div>
				</li>
			</ul>

			<nav>
				<img src="../assets/img/Program.png" alt="">
			</nav>

			<section>
				<ul>
					<li v-for="item in activityArr" @click="goBuy(item,2)">
						<div class="left_">
							<img :src="item.imgurl" alt="">
						</div>
						<div class="right_">
							<div class="right_home">
								<span>
									{{item.top_name}}
									<br> {{item.bottom_name}}</span>
							</div>
						</div>
					</li>
				</ul>
			</section>
		</div>

	</div>
</template>

<script>
	import SecondHeader from '../components/secondHeader';
	import axios from "axios";
	import qs from 'qs';

	export default {
		data() {
			return {
				openDown: false, //浏览器打开提示
				showDown: false, //下载提示
				PlayArr: [ //玩教具
					{
						name: "扮演屋消防/警察局…",
						imgurl: "http://image.peihuayuren.com/wjj20191024-1.jpg",
						id: "00e166391e144d3385e7e3867f25c2e2",
						leftName: ["小班", "中班"]
					},
					{
						name: "喷水消防车",
						imgurl: "http://image.peihuayuren.com/wjj20191024-2.jpg",
						id: "ca2baa9c4639477db17848ea5c3bd20d",
						leftName: ["小班"]
					},
					{
						name: "角色扮演医师护士服",
						imgurl: "http://image.peihuayuren.com/wjj20191024-3.jpg",
						id: "4bdb9ca78acd4fb380557bbba1e54c6c",
						leftName: ["小班", "中班"]
					},
					{
						name: "救援背包套装",
						imgurl: "http://image.peihuayuren.com/wjj20191024-4.jpg",
						id: "02d18c97124e482fa2e59b256f3be13c",
						leftName: ["小班", "中班"]
					},
					{
						name: "消防背包套装",
						imgurl: "http://image.peihuayuren.com/wjj20191024-5.jpg",
						id: "64e18202f2664df09c0c05735889f940",
						leftName: ["小班", "中班"]
					},
					{
						name: "医生手提箱 ",
						imgurl: "http://image.peihuayuren.com/wjj20191024-6.jpg",
						id: "907425df274f40cb982fbc412932e709",
						leftName: ["小班", "中班"]
					},
					{
						name: "警察背包套装",
						imgurl: "http://image.peihuayuren.com/wjj20191024-7.jpg",
						id: "c0ca76d0eb1449b19928b734a287bc92",
						leftName: ["小班", "中班"]
					},
					{
						name: "消防工具套装",
						imgurl: "http://image.peihuayuren.com/wjj20191024-8.jpg",
						id: "e23e26c361534e41ab3a5c7ef6a03cb1",
						leftName: ["小班", "中班"]
					},
					{
						name: "安全常识教育认知板",
						imgurl: "http://image.peihuayuren.com/wjj20191024-9.jpg",
						id: "8a8fe4296fc54cc6aa3cb510ee9aba69",
						leftName: ["中班"]
					},
					{
						name: "安全达人",
						imgurl: "http://image.peihuayuren.com/wjj20191024-10.jpg",
						id: "0510577ce7744f0a97898bc9e4fa11ac",
						leftName: ["大班"]
					},
					{
						name: "交通安全认知桌游",
						imgurl: "http://image.peihuayuren.com/wjj20191024-11.jpg",
						id: "273d6b58291147aa974b8e8757dc335b",
						leftName: ["大班"]
					},
					{
						name: "舞台背景板",
						imgurl: "http://image.peihuayuren.com/wjj20191024-12.jpg",
						id: "765558184860471c96867552aeb1bddd",
						leftName: ["全龄段"]
					}
				],
				booksArr: [ //图书推荐
					{
						name: "比奇兔安全绘本",
						imgurl: "http://image.peihuayuren.com/hb20191024-1.jpg",
						classification: "安全常识",
						id: "aff517d2a7bc46178fcfcd6c653f9c08",
						Author: "陈彦",
						leftName: ["小班"]
					},
					{
						name: "你千万别上当啊",
						imgurl: "http://image.peihuayuren.com/hb20191024-2.jpg",
						classification: "安全认知",
						id: "0f152e4011b8442fb6dc0f2da62b91d7",
						Author: "莫·威廉斯",
						leftName: ["小班", "中班"]
					},
					{
						name: "汤姆走丢了",
						imgurl: "http://image.peihuayuren.com/hb20191024-3.jpg",
						classification: "安全常识",
						id: "a589db359b5147209407a5b3ed1bbc38",
						Author: "玛莉·阿丽娜·巴文",
						leftName: ["小班", "中班"]
					},
					{
						name: "我的安全养成书",
						imgurl: "http://image.peihuayuren.com/hb20191024-4.jpg",
						classification: "安全常识",
						id: "bbc61799a4494cea9bfc25b1b5265a63",
						Author: "马力/王怡/邱影",
						leftName: ["中班", "大班"]
					},
					{
						name: "自我保护意识培养",
						imgurl: "http://image.peihuayuren.com/hb20191024-5.jpg",
						classification: "自我保护",
						id: "1147e17dae13414181218b39bc7bb7c3",
						Author: "达柯玛尔·盖斯勒 ",
						leftName: ["中班", "大班"]
					},
					{
						name: "学会爱自己（安全意识篇）",
						imgurl: "http://image.peihuayuren.com/hb20191024-6.jpg",
						classification: "自我保护",
						id: "ff655d3f45d74f88a2f6de1411980f10",
						Author: "[美]珊蒂 克雷文 等",
						leftName: ["中班", "大班"]
					},
					{
						name: "蜘蛛和苍蝇",
						imgurl: "http://image.peihuayuren.com/hb20191024-7.jpg",
						classification: "安全保护",
						id: "8f6e44b4c0b74745b59138124d34938d",
						Author: "[英]玛丽·豪威特",
						leftName: ["中班", "大班"]
					},
					{
						name: "儿童安全365",
						imgurl: "http://image.peihuayuren.com/hb20191024-8.jpg",
						classification: "安全保护",
						id: "792221bf86fc4113b53a040121d13834",
						Author: "[韩]朴恩景",
						leftName: ["大班"]
					},
					{
						name: "我的第一套交通安全故事",
						imgurl: "http://image.peihuayuren.com/hb20191024-9.jpg",
						classification: "交通安全",
						id: "da2bb07495284822a233ee13b5a4f88b",
						Author: "ROI VISUAL CO",
						leftName: ["全龄段"]
					}
				],
				activityArr: [{
						top_name: "幼儿园室内安全教育",
						bottom_name: "教案合集",
						imgurl: "http://image.peihuayuren.com/hdfa20191024-1.jpg",
						id: "4eeb856ef74f4243ad8f48b0f3891799",
					},
					{
						top_name: "幼儿园室外安全",
						bottom_name: "教育合集",
						imgurl: "http://image.peihuayuren.com/hdfa20191024-2.jpg",
						id: "fa4cb7890d104dc4b360624c1434ef90",
					},
					{
						top_name: "自救教案",
						bottom_name: "让灾害发生时不在害怕",
						imgurl: "http://image.peihuayuren.com/hdfa20191024-3.jpg",
						id: "54750ecda25c4c59b1e6cb80c46cf827",
					},
					{
						top_name: "全套安全教育儿歌?",
						bottom_name: "安全教育就是这么简单",
						imgurl: "http://image.peihuayuren.com/hdfa20191024-4.jpg",
						id: "3241e7c9d8a94b3f89ff6beabb049f26",
					},
					{
						top_name: "最扎实的整套消防",
						bottom_name: "安全教育",
						imgurl: "http://image.peihuayuren.com/hdfa20191024-5.jpg",
						id: "747bfd02f502456caa2239abda843329",
					},
					{
						top_name: "安全教育主题墙",
						bottom_name: "有这一面就够了",
						imgurl: "http://image.peihuayuren.com/hdfa20191024-6.jpg",
						id: "b5f2838e242343f594ce536fea331cae",
					},
					{
						top_name: "性教育不好说出口?",
						bottom_name: "让绘本来帮忙",
						imgurl: "http://image.peihuayuren.com/hdfa20191024-7.jpg",
						id: "2d625054def445f9bd36c5e95330b119",
					}
				],
				MyuserId: '', //用户ID
			}
		},
		created() {
			this.MyuserId = this.$route.params.userId;
			// console.log(this.isIpad());

		},
		mounted() {
			// this.isIpad();
			if (this.$route.params.userId == "type=true") {
				this.Just_entered();
			}
		},
		components: {
			SecondHeader
		},
		methods: {
			Just_entered() {
				let postData = this.$qs.stringify({
					advtName: "消防日来临，送你一份幼儿园的安全教育宝典秘籍～"
				});
				this.$axios({
						method: 'post',
						url: this.$url + 'data/json/updateOutClick', //线上测试的
						data: postData,
						async: true
					})
					.then(data => {
						console.log(data);
					});
			},
			openbrower() {
				this.openDown = false;
			},
			shure() {
				this.showDown = false;
			},
			//立即购买
			goBuy(item, num) {
				let url;
				if (num == "1") {
					url = "shopItemDetail";
				} else if (num == "2") {
					url = "advisory";
				};
				if (this.$route.params.userId == "type=true") {
					this.$router.push(`/${url}/${item.id}/type=true?status=1&heads=true`);
				} else {
					this.$router.push(`/${url}/${item.id}/${this.MyuserId}?status=1&heads=true`);
				}

			}

		}
	}
</script>

<style lang="scss" scoped>
	@media only screen and (min-width:768px) {
		.TitleHeader {
			img {
				width: 30px !important;
				height: 20px !important;
			}

			span {
				height: 20px !important;
				line-height: 20px !important;
			}

			p {
				font-size: 11px !important;
			}
		}

		.Play_ul {
			li {
				img {
					height: 95px !important;
				}

				.Play_ul_top {
					font-size: 11px !important;
				}

				.Play_ul_bottom {
					button {
						height: 18px !important;
						padding: 0px 8px !important;
					}
				}

				.Play_ul_bottom_left {
					span {
						font-size: 8px !important;
					}
				}

			}
		}

		.books {
			.books_li_top {
				img {
					height: 110px !important;
				}

				span {
					width: 50px !important;
					padding: 2px 8px !important;
					font-size: 10px !important;
				}

			}

			.Play_ul_top {
				font-size: 10px !important;
			}

			.Play_ul_center {
				font-size: 8px !important;
			}

			.Play_ul_bottom {
				button {
					height: 18px !important;
					padding: 0px 8px !important;
				}
			}

			.Play_ul_bottom_left {
				span {
					font-size: 8px !important;
				}
			}
		}

		section {
			ul {
				li {
					height: 110px !important;

					.right_ {
						right: 30px !important;

						.right_home {
							span {
								line-height: 30px !important;
								font-size: 12px !important;
								margin-left: 40px !important;
							}
						}
					}
				}
			}
		}

	}

	@media only screen and (min-width:950px) {

		.TitleHeader {
			img {
				width: 35px !important;
				height: 25px !important;
			}

			span {
				font-size: 20px !important;
				height: 25px !important;
				line-height: 25px !important;
			}

			p {
				font-size: 17px !important;
				line-height: 23px !important;
			}
		}

		nav:nth-child(1) {
			width: 370px !important;
		}

		nav {
			width: 300px !important;
			margin-top: 23px !important;
			margin-bottom: 12px !important;
		}

		.Play_ul {
			li {
				img {
					height: 125px !important;
				}

				.Play_ul_top {
					font-size: 16px !important;
				}

				.Play_ul_bottom {
					button {
						font-size: 13px !important;
						height: 25px !important;
						line-height: 25px !important;
						padding: 0px 12px !important;
					}
				}

				.Play_ul_bottom_left {
					span {
						font-size: 13px !important;
					}

					span:nth-child(2) {
						margin-left: 10px !important;
					}
				}

			}
		}

		.books {
			.books_li_top {
				img {
					height: 140px !important;
				}

				span {
					width: 65px !important;
					padding: 2px 8px !important;
					font-size: 15px !important;
				}

			}

			.Play_ul_top {
				font-size: 15px !important;
			}

			.Play_ul_center {
				font-size: 14px !important;
			}

			.Play_ul_bottom {
				button {
					font-size: 13px !important;
					height: 25px !important;
					line-height: 25px !important;
					padding: 0px 12px !important;
				}
			}

			.Play_ul_bottom_left {
				span {
					font-size: 15px !important;
				}

				span:nth-child(2) {
					margin-left: 10px !important;
				}
			}
		}

		section {
			ul {
				li {
					height: 140px !important;
					margin-top: 9px !important;

					.right_ {
						right: 30px !important;

						.right_home {
							span {
								font-size: 18px !important;
								margin-left: 45px !important;
							}
						}
					}
				}
			}
		}


	}


	.temlapteThreeHome {
		width: 100%;

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
				margin-right: 10px;
				/*px*/
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

		nav {
			// width: 70%;
			width: 425px;
			/*px*/
			margin: auto;
			margin-top: 46px;
			/*px*/
			margin-bottom: 24px;

			/*px*/
			img {
				width: 100%;
			}
		}

		.home {
			padding-top: 10px;
			/*px*/
			background: #FFF9EE;

			.Play_ul {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				li {
					width: 31.5%;
					margin-top: 16px;
					/*px*/
					margin-left: 9px;
					/*px*/
					border-radius: 15px;
					/*px*/
					overflow: hidden;
					background: white;

					img {
						width: 100%;
						height: 165px;
						/*px*/
					}

					.books_li_bottom {
						width: 90%;
						margin: auto;

						.Play_ul_top {
							margin-top: 24px;
							/*px*/
							font-size: 26px;
							/*px*/
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(34, 34, 34, 1);
							// text-overflow: -o-ellipsis-lastline;
							// overflow: hidden;
							// text-overflow: ellipsis;
							// display: -webkit-box;
							// -webkit-line-clamp: 2;
							// line-clamp: 2;
							// -webkit-box-orient: vertical;
							overflow: hidden;
							text-overflow: ellipsis;
							-o-text-overflow: ellipsis;
							-webkit-text-overflow: ellipsis;
							-moz-text-overflow: ellipsis;
							white-space: nowrap;
						}

						.Play_ul_bottom {
							margin-top: 18px;
							/*px*/
							padding-bottom: 22px;
							/*px*/
							display: flex;
							justify-content: space-between;

							.Play_ul_bottom_left {
								flex: 1;

								span {
									font-size: 22px;
									/*px*/
									font-family: PingFang SC;
									font-weight: 400;
									color: rgba(102, 102, 102, 1);
								}

								span:nth-child(2) {
									margin-left: 5px;
									/*px*/
								}
							}


							// span:nth-child(1) {
							// 	font-size: 20px;
							// 	/*px*/
							// 	font-family: PingFang SC;
							// 	font-weight: 400;
							// 	color: rgba(235, 76, 76, 1);
							// }

							button {
								height: 40px;
								/*px*/
								line-height: 40px;
								/*px*/
								background: linear-gradient(-41deg, rgba(255, 77, 10, 1) 0%, rgba(255, 117, 19, 1) 100%);
								border-radius: 9px;
								/*px*/
								font-size: 20px;
								/*px*/
								font-family: PingFang SC;
								border: none;
								padding: 0px 10px;
								/*px*/
								font-weight: 400;
								color: rgba(255, 255, 255, 1);
							}
						}
					}
				}
			}

			.books {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				li {
					width: 31.5%;
					margin-top: 16px;
					/*px*/
					margin-left: 9px;
					/*px*/
					border-radius: 15px;
					/*px*/
					overflow: hidden;
					background: white;

					.books_li_top {
						position: relative;

						img {
							width: 100%;
							height: 170px;
							/*px*/
						}

						span {
							display: inline-block;
							text-align: center;
							width: 100px;
							/*px*/
							position: absolute;
							background: url(../assets/img/mabn.png) no-repeat;
							background-size: 100%;
							top: 0;
							left: 0;
							padding: 5px 10px;
							/*px*/
							font-size: 20px;
							/*px*/
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(255, 255, 255, 1);
						}
					}

					.books_li_bottom {
						width: 90%;
						margin: auto;

						.Play_ul_top {
							margin-top: 24px;
							/*px*/
							font-size: 26px;
							/*px*/
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(34, 34, 34, 1);
							display: flex;

							span {
								display: inline-block;
								overflow: hidden;
								text-overflow: ellipsis;
								-o-text-overflow: ellipsis;
								-webkit-text-overflow: ellipsis;
								-moz-text-overflow: ellipsis;
								white-space: nowrap;
							}
						}

						.Play_ul_center {
							margin-top: 10px;
							/*px*/
							margin-bottom: 20px;
							/*px*/
							font-size: 20px;
							/*px*/
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(153, 153, 153, 1);
							overflow: hidden;
							text-overflow: ellipsis;
							-o-text-overflow: ellipsis;
							-webkit-text-overflow: ellipsis;
							-moz-text-overflow: ellipsis;
							white-space: nowrap;
						}

						.Play_ul_bottom {
							margin-top: 18px;
							/*px*/
							padding-bottom: 22px;
							/*px*/
							display: flex;
							justify-content: space-between;

							.Play_ul_bottom_left {
								flex: 1;

								span {
									font-size: 22px;
									/*px*/
									font-family: PingFang SC;
									font-weight: 400;
									color: rgba(102, 102, 102, 1);
								}

								span:nth-child(2) {
									margin-left: 5px;
									/*px*/
								}
							}

							button {
								height: 40px;
								/*px*/
								line-height: 40px;
								/*px*/
								background: linear-gradient(-41deg, rgba(255, 77, 10, 1) 0%, rgba(255, 117, 19, 1) 100%);
								border-radius: 9px;
								/*px*/
								font-size: 20px;
								/*px*/
								font-family: PingFang SC;
								border: none;
								padding: 0px 10px;
								/*px*/
								font-weight: 400;
								color: rgba(255, 255, 255, 1);
							}

						}
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

				ul {
					width: 90%;
					margin: auto;
					padding-top: 20px;
					/*px*/

					li {
						background: #F8F7FC;
						// background: #F8F7FC;
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
							right: 60px;
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
								margin-left: 30px;
								/*px*/
								display: flex;
								align-items: center;

								span {
									line-height: 50px;
									/*px*/
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

		header {
			width: 100%;

			img {
				width: 100%;
				// height: 300px;
				/*px*/
			}
		}

		main {
			width: 100%;

			.main_body {
				width: 95%;
				margin-left: 5%;
				display: flex;
				height: 260px;

				/*px*/
				.main_left {
					width: 220px;
					/*px*/
					height: 220px;
					/*px*/
					margin-top: 20px;

					/*px*/
					img {
						width: 220px;
						/*px*/
						height: 220px;
						/*px*/
						display: block;
					}
				}

				.main_right {
					flex: 1;
					border-bottom: 1px solid #F0F0F0;
					/*px*/
					padding-left: 36px;
					/*px*/

					.main_right_home {

						p {
							width: calc(100% - 20px);
							/*px*/
						}

						.title {
							height: 72px;
							/*px*/
							font-size: 28px;
							/*px*/
							font-family: PingFangSC-Semibold;
							font-weight: 600;
							color: rgba(51, 51, 51, 1);
							line-height: 72px;
							/*px*/
							margin-top: 20px;
							/*px*/
							word-break: break-all;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}

						.content {
							height: 62px;
							/*px*/
							font-size: 26px;
							/*px*/
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(102, 102, 102, 1);
							line-height: 30px;
							/*px*/
							word-break: break-all;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							margin-bottom: 22px;
							/*px*/
						}

						.buyBtn {
							width: 206px;
							/*px*/
							height: 62px;
							/*px*/
							background: rgba(255, 85, 85, 1);
							border-radius: 10px;
							/*px*/
							text-align: center;
							line-height: 62px;
							/*px*/
							color: #ffffff;
							border: 0px solid #ffffff;
						}

					}
				}
			}
		}
	}
</style>
