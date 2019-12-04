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

		<second-Header msgHeader="秋天这么美，不去自然探索怎么行？" :showIcon="true"></second-Header>

		<header>
			<img src="http://image.ybk008.com/a2d6ce0d5d3b3742c218d8f709560821571204781409" alt="" ref="HeaderRef">
		</header>
		<div class="TitleHeader">
			<img src="../assets/icons/Book_details_one.png" alt="">
			<span>推荐导语</span>
			<p>深秋，是孩子们接触大自然最好的时节。让幼儿的活动更加自然化、生态化，是我们在秋天开展活动中最关注的目标。好的游戏，能够不断地激发孩子们的好奇心，能够让孩子们自愿的参与到探究活动中来。今天，我们跟大家推荐一些关于秋季好玩的专题游戏，帮助大家进行秋季主题素材的开展，老师们一起来关注吧！</p>
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
						name: "多层拼图—胡萝卜",
						imgurl: "http://image.peihuayuren.com/wjj20191016-1.jpeg",
						id: "cdeafa52c4b2400b8157417a055a07d1",
						leftName: ["小班", "中班"]
					},
					{
						name: "多层拼图—苹果",
						imgurl: "http://image.peihuayuren.com/wjj20191016-2.jpeg",
						id: "fae09c96b8a4421194a4d90342bd454f",
						leftName: ["小班", "中班"]
					},
					{
						name: "多层拼图—土豆",
						imgurl: "http://image.peihuayuren.com/wjj20191016-3.jpeg",
						id: "300bdad5b0bb41b8806a7eeacea99e04",
						leftName: ["小班", "中班"]
					},
					{
						name: "豌豆是怎么长大的",
						imgurl: "http://image.peihuayuren.com/wjj20191016-4.jpeg",
						id: "39f46ae5072f4aa0ab6f0fdc49dbbdd7",
						leftName: ["中班", "大班"]
					},
					{
						name: "会飞的花朵蝴蝶标本",
						imgurl: "http://image.peihuayuren.com/wjj20191016-5.jpeg",
						id: "b082d1b5e3884a4ea72e7c737e607a2d",
						leftName: ["中班", "大班"]
					},
					{
						name: "大豆是怎么发芽的",
						imgurl: "http://image.peihuayuren.com/wjj20191016-6.jpeg",
						id: "9142c0e9a4d542f4b2782fe1c2f2840f",
						leftName: ["中班", "大班"]
					},
					{
						name: "千奇百怪的叶子",
						imgurl: "http://image.peihuayuren.com/wjj20191016-7.jpeg",
						id: "f93e8b2881cf4325b4932f68c80dc50e",
						leftName: ["中班", "大班"]
					},
					{
						name: "粮食家族",
						imgurl: "http://image.peihuayuren.com/wjj20191016-8.jpeg",
						id: "66c40518c9e84b7fbf51b3a37aafd832",
						leftName: ["中班", "大班"]
					},
					{
						name: "面食的来源",
						imgurl: "http://image.peihuayuren.com/wjj20191016-9.jpeg",
						id: "001f4c1d669c431998fb68e41233fc91",
						leftName: ["中班", "大班"]
					},
					{
						name: "大型放大镜",
						imgurl: "http://image.peihuayuren.com/wjj20191016-10.jpeg",
						id: "4f3e92bd1d4744b4be372e431ee5cf16",
						leftName: ["中班", "大班"]
					},
					{
						name: "双向昆虫观察器",
						imgurl: "http://image.peihuayuren.com/wjj20191016-11.jpeg",
						id: "4bffdca545ed4c7ba96dc61ef18c1486",
						leftName: ["大班"]
					},
					{
						name: "超大放大镜",
						imgurl: "http://image.peihuayuren.com/wjj20191016-12.jpeg",
						id: "3f4c9ccf62da4c069b4f48a0c7bfab5e",
						leftName: ["全龄段"]
					},
					{
						name: "六合一探究工具",
						imgurl: "http://image.peihuayuren.com/wjj20191016-13.jpeg",
						id: "b5c6c7ad2e43400192ac9429442201d0",
						leftName: ["全龄段"]
					},
					{
						name: "双孔显微镜",
						imgurl: "http://image.peihuayuren.com/wjj20191016-14.jpeg",
						id: "01e5c7472790400fbabec823e7e3807d",
						leftName: ["中班", "大班"]
					},
					{
						name: "无土植物生长瓶",
						imgurl: "http://image.peihuayuren.com/wjj20191016-15.jpeg",
						id: "3282b7fb52e841dbbb466629a211c1ce",
						leftName: ["全龄段"]
					}
				],
				booksArr: [ //图书推荐
					{
						name: "14只老鼠的秋天进行曲",
						imgurl: "http://image.peihuayuren.com/ts20191016-1.jpeg",
						classification: "情感认知",
						id: "0568680d823b40d583fed680a03fe1b0",
						Author: "[日] 岩村和朗",
						leftName: ["小班", "中班"]
					},
					{
						name: "小种子",
						imgurl: "http://image.peihuayuren.com/ts20191016-2.jpeg",
						classification: "生命教育",
						id: "ec603454be9e4a96b162fc7867937e1c",
						Author: "[美]艾瑞·卡尔",
						leftName: ["小班", "中班"]
					},
					{
						name: "叶子先生",
						imgurl: "http://image.peihuayuren.com/ts20191016-3.jpeg",
						classification: "审美认知",
						id: "6ababc7516cd42519042d7e423134824",
						Author: "[美]洛伊丝·艾勒特",
						leftName: ["小班", "中班"]
					},
					{
						name: "秋天的书",
						imgurl: "http://image.peihuayuren.com/ts20191016-4.jpeg",
						classification: "事物认知",
						id: "0fa4b4278f474aadb6647606863843ae",
						Author: "黄河弼",
						leftName: ["小班", "中班"]
					},
					{
						name: "风中的树叶",
						imgurl: "http://image.peihuayuren.com/ts20191016-5.jpeg",
						classification: "生命教育",
						id: "75d921eb23cb47dfa70f77f793028638",
						Author: "[德]安娜·莫勒",
						leftName: ["小班", "中班"]
					},
					{
						name: "想看海的乌龟",
						imgurl: "http://image.peihuayuren.com/ts20191016-6.jpeg",
						classification: "励志勇敢",
						id: "038e4dfd4ea04f09aeb0b50610a9991a",
						Author: "宋庆龄幼儿园2012草莓五班",
						leftName: ["中班"]
					},
					{
						name: "陌生人",
						imgurl: "http://image.peihuayuren.com/ts20191016-7.jpeg",
						classification: "民间故事",
						id: "bac058f8f54a4c6db6f0779ee9e10cdd",
						Author: "[美]克里斯·范奥尔伯格",
						leftName: ["中班", "大班"]
					},
					{
						name: "秋风没有来",
						imgurl: "http://image.peihuayuren.com/ts20191016-8.jpeg",
						classification: "生命教育",
						id: "b91a518e881a495b9bcab959373fc2e9",
						Author: "[意大利]碧娜·艾瑞斯",
						leftName: ["中班", "大班"]
					},
					{
						name: "落叶跳舞",
						imgurl: "http://image.peihuayuren.com/ts20191016-9.jpeg",
						classification: "艺术引导",
						id: "e40c12cff87b4da5a0c6314bf5cd8afe",
						Author: "伊东宽",
						leftName: ["中班", "大班"]
					},
					{
						name: "秋天,苹果熟了",
						imgurl: "http://image.peihuayuren.com/ts20191016-10.jpeg",
						classification: "科普认知",
						id: "672ce758ea3248ff97a4d96fde9eb8ce",
						Author: "童心",
						leftName: ["大班"]
					},
					{
						name: "一片叶子落下来",
						imgurl: "http://image.peihuayuren.com/ts20191016-11.jpeg",
						classification: "生命教育",
						id: "b9d593cadc0344d08ba3faa311f5410f",
						Author: "利奥·巴斯卡利亚",
						leftName: ["大班"]
					},
					{
						name: "这就是二十四节气",
						imgurl: "http://image.peihuayuren.com/ts20191016-12.jpeg",
						classification: "科普百科",
						id: "170d67bd5437471598c208ed68bf0dc6",
						Author: "高春香，邵敏",
						leftName: ["大班"]
					}
				],
				activityArr: [{
						top_name: "超美树叶拼贴画",
						bottom_name: "留住金色秋天",
						imgurl: "http://image.peihuayuren.com/zxl20191016-1.jpg",
						id: "a3ed4af5943e4da9a43bf2083cba60ca",
					},
					{
						top_name: "幼儿园小班教案",
						bottom_name: "秋天多喝水",
						imgurl: "http://image.peihuayuren.com/zxl20191016-2.jpg",
						id: "d89ab94b905b42e8bb0f1279b9547875",
					},
					{
						top_name: "幼儿园中班教案",
						bottom_name: "秋天果子多",
						imgurl: "http://image.peihuayuren.com/zxl20191016-3.jpg",
						id: "7882fb62aeef45f48c8a3b590ccbe6cf",
					},
					{
						top_name: "幼儿园大班教案",
						bottom_name: "秋天的树",
						imgurl: "http://image.peihuayuren.com/zxl20191016-4.jpg",
						id: "b619e228f9dd44f6ae23714eb3aa3b61",
					},
					{
						top_name: "秋天主题教案大放送",
						bottom_name: "拿走不谢～",
						imgurl: "http://image.peihuayuren.com/zxl20191016-5.jpg",
						id: "51ba1e8a8a254584894fc56c8111403b",
					},
					{
						top_name: "水果主题教室",
						bottom_name: "帮你秋季环创出主意",
						imgurl: "http://image.peihuayuren.com/zxl20191016-6.jpg",
						id: "cc6314d6b135439e85d7c3aba661e409",
					},
					{
						top_name: "秋天主题！",
						bottom_name: "幼儿园门窗环创大全",
						imgurl: "http://image.peihuayuren.com/zxl20191016-7.jpg",
						id: "17659dec96284607aa477e434145ca24",
					},
					{
						top_name: "N款幼儿园秋季主题环创",
						bottom_name: "总有一款适合你！",
						imgurl: "http://image.peihuayuren.com/zxl20191016-8.jpg",
						id: "422b52cf1bda46e886a3696a42045f88",
					},
					{
						top_name: "幼儿园秋季亲子运动会活动教案",
						bottom_name: "",
						imgurl: "http://image.peihuayuren.com/zxl20191016-9.jpg",
						id: "64be61765bcb43b8ae7b3bc92682f8e2",
					},
					{
						top_name: "秋季",
						bottom_name: "五种传染病预防起来！",
						imgurl: "http://image.peihuayuren.com/zxl20191016-10.jpg",
						id: "e2177c766a9146b5a53791dce5aa8068",
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
			this.isIpad();
		},
		components: {
			SecondHeader
		},
		methods: {
			isIpad() {
				var ua = navigator.userAgent.toLowerCase();
				if (/ipad/i.test(ua)) {
					this.$nextTick(() => {
						// console.log(this.$refs.HeaderRef);
						this.$refs.HeaderRef.src = "http://image.ybk008.com/167982cbe2391c3a2bc002028c426711571211346984";
					})
					return true;
				} else {
					return false;
				}
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
					margin-top:9px !important;
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
								display: flex;
								align-items: center;

								span {
									line-height: 50px;/*px*/
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
