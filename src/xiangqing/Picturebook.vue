<template>
	<div class="Picture">
		<second-Header msgHeader="爱·绘本" :showIcon="false"></second-Header>
		<header>
			<img src="http://image.ybk008.com/Picturebook_top1557751082552" alt="">
		</header>
		<nav>
			<div class="zhanwei" v-for="(item,key) in myData">
				<p class="p_title">
					<i>Top {{item.id}}</i>
					<span>《{{item.bookName}}》</span>
				</p>
				<p class="p_img">
					<img src="../assets/img/Picture_title.png" alt="">
				</p>
				<div class="div_tu_wen">
					<!-- <img src="../assets/img/logo.png" alt="" v-if="key%2 != 1"> -->
						<img :src="item.imgUlr" alt="" v-if="key%2 != 1">
					<!-- <ul :class="{'ul_left':!key%2}"> -->
					<ul class="ul_left" v-if="key%2 != 1">
						<li>适用年龄:&nbsp;&nbsp;&nbsp;{{item.ageStart}}-{{item.ageEnd}}岁</li>
						<li>作者:&nbsp;{{item.Author}}&nbsp;&nbsp;著</li>
						<li>出版社:&nbsp;{{item.publishing}}</li>
						<li>
							<button @click="goumai(item)">立即购买</button>
						</li>
					</ul>
					<ul class="ul_right" v-if="key%2 == 1">
						<li>适用年龄:&nbsp;&nbsp;&nbsp;{{item.ageStart}}-{{item.ageEnd}}岁</li>
						<li>作者:&nbsp;{{item.Author}}&nbsp;&nbsp;著</li>
						<li>出版社:&nbsp;{{item.publishing}}</li>
						<li>
							<button @click="goumai(item)">立即购买</button>
						</li>
					</ul>
						<img :src="item.imgUlr" alt="" v-if="key%2 == 1">

				</div>
				<div class="content">
					<p class="p_content_name">图书简介</p>
					<p class="p_zhuti">{{item.Introduction}}</p>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
	import SecondHeader from '../components/secondHeader';
	import {
		Toast
	} from 'mint-ui';
	export default {
		name: "Picturebook",
		data() {
			return {
				MyuserId: this.$route.params.userId,
				myData: [{
						id: 1,
						bookName: "我绝对绝对不吃番茄",
						ageStart: 3,
						ageEnd: 6,
						Author: "[英] 罗伦·乔尔 德",
						publishing: "接力出版社",
						Introduction: "每个小孩子都有自己最不爱吃的东西，挑食不好好吃饭可能会让孩子发育不好哦。讨厌吃番茄的妹妹听了哥哥怎样的话，把番茄吃掉了呢？",
						imgUlr: "http://image.ybk008.com/fanq1557738335025",
						JumpID: "a5af609335404253b998285c0902be2b"
					},
					{
						id: 2,
						bookName: "公主怎么挖鼻屎",
						ageStart: 2,
						ageEnd: 4,
						Author: "李卓颖",
						publishing: "明天出版社",
						Introduction: "有些孩子不知不觉中养成一些坏习惯，比如乱挖鼻孔。而这本书能够告诉孩子这是个既不卫生，又不雅的行为。",
						imgUlr: "http://image.ybk008.com/gongzhu1557738566426",
						JumpID: "783060b3a3dd4b9ba1ed51b185104820"
					},
					{
						id: 3,
						bookName: "根本就不脏嘛",
						ageStart: 3,
						ageEnd: 6,
						Author: "李卓颖",
						publishing: "长江少儿儿童出版社",
						Introduction: "有在故事中的小女孩看来，时刻洗手是件很无聊的事。书中分享了小女孩心理活动的全过程，成功避开了说教，让孩子养成勤洗手的好习惯。",
						imgUlr: "http://image.ybk008.com/zang1557738511236",
						JumpID: "a9f6cc2cedf04495b3fae2746cc776db"
					},
					{
						id: 4,
						bookName: "鳄鱼怕怕牙医怕怕",
						ageStart: 3,
						ageEnd: 6,
						Author: "李卓颖",
						publishing: "明天出版社",
						Introduction: "这是一场鳄鱼和牙医之间的心理较量。作者用简单，反复的语句刻画了鳄鱼和牙医每时每刻戏剧性的心理变化。",
						imgUlr: "http://image.ybk008.com/eyu1557738619076",
						JumpID: "2b3b303bcb6a467fb13ba726a6fcdc79"
					},
					{
						id: 5,
						bookName: "肚子里有个火车站",
						ageStart: 3,
						ageEnd: 6,
						Author: "李卓颖",
						publishing: "北京科学技术出版社",
						Introduction: "孩子从来都不会好好吃饭，总是吃的又快又急，跟孩子说了很多次吃饭要细嚼慢咽，也总是听不进去，该怎么办呢？",
						imgUlr: "http://image.ybk008.com/houzhe1557738663010",
						JumpID: "1636dc128443424d81e663b8c845996b"
					},
					{
						id: 6,
						bookName: "再见，电视机",
						ageStart: 3,
						ageEnd: 6,
						Author: "李卓颖",
						publishing: "北京科学技术出版社",
						Introduction: "故事内容以一种诙谐幽默的方式，让孩子们明白长时间看电视，电视也会崩溃，比起千篇一律的说教，这个故事可以达到更好的效果哦。",
						imgUlr: "http://image.ybk008.com/dainshi1557738722266",
						JumpID: "72b6154948554f22b7193d4c0595bf15"
					},
					{
						id: 7,
						bookName: "憋不住，憋不住，快要憋不住了",
						ageStart: 3,
						ageEnd: 6,
						Author: "李卓颖",
						publishing: "贵州人民出版社",
						Introduction: "讲述一个小孩在梦中寻找厕所的故事，当他好不容易终于找到一个厕所，尿尿后，大大松了口气，结果又是什么呢？",
						imgUlr: "http://image.ybk008.com/bie1557738781726",
						JumpID: "0a939ec11e024c43b9d4738bae11fe21"
					},
					{
						id: 8,
						bookName: "牙齿大街的新鲜事",
						ageStart: 3,
						ageEnd: 6,
						Author: "李卓颖",
						publishing: "长江少儿儿童出版社",
						Introduction: "这本书用哈克和迪克两个古灵精怪的小家伙的故事，向孩子展示了牙齿被破坏是多么可怕的事情。读完故事后，孩子自然的拿起牙刷刷牙，从此爱上刷牙。",
						imgUlr: "http://image.ybk008.com/ya1557738831116",
						JumpID: "b70c771ccc9a42528047766f604cb233"
					},
					{
						id: 9,
						bookName: "小熊宝宝绘本",
						ageStart: 0,
						ageEnd: 3,
						Author: "李卓颖",
						publishing: "北京科学技术出版社",
						Introduction: "幼儿每一时期遇到的问题都能从书中找到解决办法。从吃饭、睡觉、洗澡、上厕所、刷牙、穿衣、问好等技能和认知功能完美融为一体。",
						imgUlr: "http://image.ybk008.com/nihao1557739551548",
						JumpID: "5eaff3ea81d248028fd69c075554362c"
					},
					{
						id: 10,
						bookName: "我可不怕打针",
						ageStart: 2,
						ageEnd: 6,
						Author: "李卓颖",
						publishing: "河北教育出版社",
						Introduction: "大多数孩子都害怕打针，不妨用奇妙的想象帮助孩子们一步步超越恐惧，给孩子一个温暖安心的答案：其实，打针只是一点点儿疼哦！",
						imgUlr: "http://image.ybk008.com/dazhen1557739597980",
						JumpID: "be1518456dfe439eb1079e02f5b130ee"
					}
				]
			}
		},
		components: {
			SecondHeader
		},
		mounted() {
			console.log(this.MyuserId);
		},
		methods: {
			goumai(item) {
				console.log(item);
				console.log(item.JumpID);
				console.log(this.MyuserId);
				if (this.MyuserId == "userId") {
					Toast({
						message: '请先登录app',
						position: 'bottom',
						duration: 1000
					});
				} else {
					this.$router.push(`/shopItemDetail/${item.JumpID}/${this.MyuserId}?status=1`);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@media only screen and (min-width:450px) {
		.div_tu_wen {
			// height: 330px !important;
			/*px*/
		}

		.ul_left {
			font-size: 30px !important;
			/*px*/
		}

	}

	@media only screen and (min-width:768px) {
		.div_tu_wen {

			// height: 550px !important;
			/*px*/
		}
		.p_title{
			i{
				font-size: 55px !important;/*px*/
			}
			span{
				font-size: 50px !important;/*px*/
			}
		}
		.ul_left,
		.ul_right {
			font-size: 50px !important;

			/*px*/
			button {
				width: 300px !important;
				/*px*/
				height: 100px !important;
				/*px*/
				font-size: 40px !important;
				/*px*/
			}
		}

		.content {
			font-size: 50px !important;

			/*px*/
			.p_content_name {
				font-size: 55px !important;
				/*px*/
			}

			.p_zhuti {
				line-height: 75px !important;
				/*px*/
			}
		}

	}

	@media only screen and (min-width:950px) {
		.div_tu_wen {
			
			// height: 700px !important;
			/*px*/
		}

		.ul_left,
		.ul_right {
			font-size: 65px !important;

			/*px*/
			button {
				width: 350px !important;
				/*px*/
				height: 120px !important;
				/*px*/
				font-size: 42px !important;
				/*px*/
			}
		}

	}

	.Picture {
		width: 100%;
		background: white;
		header {
			width: 100%;

			img {
				width: 100%;
			}
		}

		.zhanwei {
			margin-top: 60px;
			/*px*/
		}

		nav {
			width: 100%;
			margin-bottom: 70px;

			/*px*/
			div {
				.p_title {
					text-align: center;

					i {
						font-size: 48px;
						/*px*/
						color: #107C72;
					}

					span {
						font-size: 30px;
						/*px*/
					}
				}

				.p_img {
					text-align: center;
					margin: .4rem 0;

					img {
						width: 30%;
					}
				}

				.div_tu_wen {
					width: 88%;
					margin: auto;
					display: flex;
					// height: 280px;/*px*/
					
					img {
						width: 40%;
						height: 50%;
					}

					ul {
						align-self: center;
						width: 50%;
						font-size: 26px;

						/*px*/
						li {
							margin: .35rem 0;

							button {
								width: 206px;
								/*px*/
								height: 62px;
								/*px*/
								border: none;
								background: #FF5555;
								color: white;
								border-radius: 10px;
								/*px*/
							}
						}
					}

					.ul_left {
						margin-left: 10%;

					}

					.ul_right {
						margin-right: 2%;
					}
				}

				.content {
					width: 90%;
					margin: auto;
					border: 1px solid #7DB8CB;
					/*px*/
					font-size: 26px;
					/*px*/
					border-radius: 4px;
					/*px*/
					margin-top: 20px;

					.p_content_name {
						margin: .2rem;
						font-weight: bold;
						font-size: 28px;
						/*px*/
					}

					.p_zhuti {
						margin: .2rem;
						text-align: justify;
						line-height: 39px;
						/*px*/
					}
				}
			}
		}
	}
</style>
