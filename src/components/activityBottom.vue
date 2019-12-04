<template>
	<div class="main_body">
		<div v-show="Tbale == 'tab-1'">
			<div class="main_body_home">
				<div class="main_body_left">
					<div class="main_body_left_big"></div>
					<div class="main_body_left_small"></div>
				</div>
				<div class="main_body_center">
					<p class="p_zhuti">
						{{allMyData.name}}
					</p>
					<div class="main_body_center_bottom">
						<ul class="ul_one">
							<li v-for="item in allMyData.myData">
								<div>
									<img :src="item.imgsort" alt="">
									<img :src="item.imgurl" alt="">
								</div>
								<p class="main_body_name">{{item.name}}</p>
								<button @click="tiaozhuan(item)">立即购买</button>
							</li>
						</ul>
					</div>
					<p class="title">
						<img src="../assets/img/bianjiao.png" alt="">
						推荐商品
					</p>
				</div>

			</div>
			<footer>
				<ul>
					<li v-for="item in allMyData.footerData">
						<div class="footer_left">
							<img :src="item.img" alt="">
						</div>
						<div class="footer_right">
							<div class="footer_right_noborder">
								<p>{{item.name}}</p>
								<button @click="tiaozhuan(item)">立即购买</button>
							</div>
						</div>
					</li>
				</ul>
			</footer>
		</div>
		<div v-show="Tbale == 'tab-2'">
			<div class="main_body_home">
				<div class="main_body_left">
					<div class="main_body_left_big"></div>
					<div class="main_body_left_small"></div>
				</div>
				<div class="main_body_center">
					<p class="p_zhuti">
						{{Middle_shift.name}}
					</p>
					<div class="main_body_center_bottom">
						<ul class="ul_one">
							<li v-for="item in Middle_shift.myData">
								<div>
									<img :src="item.imgsort" alt="">
									<img :src="item.imgurl" alt="">
								</div>
								<p class="main_body_name">{{item.name}}</p>
								<button @click="tiaozhuan(item)">立即购买</button>
							</li>
						</ul>
					</div>
					<p class="title">
						<img src="../assets/img/bianjiao.png" alt="">
						推荐商品
					</p>
				</div>

			</div>
			<footer>
				<ul>
					<li v-for="item in Middle_shift.footerData">
						<div class="footer_left">
							<img :src="item.img" alt="">
						</div>
						<div class="footer_right">
							<div class="footer_right_noborder">
								<p>{{item.name}}</p>
								<button @click="tiaozhuan(item)">立即购买</button>
							</div>
						</div>
					</li>
				</ul>
			</footer>
		</div>
		<div v-show="Tbale == 'tab-3'">
			<div class="main_body_home">
				<div class="main_body_left">
					<div class="main_body_left_big"></div>
					<div class="main_body_left_small"></div>
				</div>
				<div class="main_body_center">
					<p class="p_zhuti">
						{{big_shift.name}}
					</p>
					<div class="main_body_center_bottom">
						<ul class="ul_one">
							<li v-for="item in big_shift.myData">
								<div>
									<img :src="item.imgsort" alt="">
									<img :src="item.imgurl" alt="">
								</div>
								<p class="main_body_name">{{item.name}}</p>
								<button @click="tiaozhuan(item)">立即购买</button>
							</li>
						</ul>
					</div>
					<p class="title">
						<img src="../assets/img/bianjiao.png" alt="">
						推荐商品
					</p>
				</div>

			</div>
			<footer>
				<ul>
					<li v-for="item in big_shift.footerData">
						<div class="footer_left">
							<img :src="item.img" alt="">
						</div>
						<div class="footer_right">
							<div class="footer_right_noborder">
								<p>{{item.name}}</p>
								<button @click="tiaozhuan(item)">立即购买</button>
							</div>
						</div>
					</li>
				</ul>
			</footer>
		</div>
	</div>
</template>

<script>
	import {
		Toast,
	} from 'mint-ui';
	export default {
		props: {
			Tbale: {
				type: String,
			},
			QRcode: {
				default: "1"
			}
		},
		watch: {
			Tbale(newval) {
				// if (newval == "tab-1") {
				// 	this.allMyData = this.small;
				// } else if (newval == "tab-2") {
				// 	this.allMyData = this.Middle_shift;
				// } else if (newval == "tab-3") {
				// 	this.allMyData = this.big_shift;
				// }
				// this.infoTab(newval);
			},
			QRcode(newval) {
				console.log(newval);
			}
		},
		mounted() {
			console.log(this.$route);
			this.infoTab(this.Tbale);
		},
		data() {
			return {
				allMyData: {
					name: "可多提供柔软质感的玩具以及角色区玩具帮助孩子们更快的适应和接受新环境。",
					myData: [{
							imgsort: "http://image.ybk008.com/erdeng1566898041565",
							imgurl: "http://image.peihuayuren.com/small1.jpg",
							id: "832caf94c4d347edabda6e869de1825a",
							name: "斯尔福巨型六号"
						},
						{
							imgsort: "http://image.ybk008.com/yideng1566898313494",
							imgurl: "http://image.peihuayuren.com/small2.jpg",
							id: "783aa02d224941e4b37ef10fca4ae81b",
							name: "公主化妆箱"
						},
						{
							imgsort: "http://image.ybk008.com/sandeng1566898333342",
							imgurl: "http://image.peihuayuren.com/small3.jpg",
							id: "7de42ec3f1f948ee841a83b0a38a179e",
							name: "宝德龙厨房用具套装"
						}
					],
					footerData: [{
							img: "http://image.peihuayuren.com/small4.jpg",
							id: "c4d9935150cd44e8b18c74ba166f497f",
							name: "华森葳爱心豪华育婴室"
						},
						{
							img: "http://image.peihuayuren.com/small5.jpg",
							id: "681a36eb9d6747a7ae0ef773a187dcaf",
							name: "华森葳扮演衣"
						}, {
							img: "http://image.peihuayuren.com/small6.png",
							id: "6062cfe03fd94489ad4581c44945962f",
							name: "双面豪华厨房"
						}, {
							img: "http://image.peihuayuren.com/small7.jpg",
							id: "5b2b9d499a6c4c4db83b048372781105",
							name: "华森葳海儿美发师"
						}, {
							img: "http://image.peihuayuren.com/small8.jpg",
							id: "56976c2c24a14d81aef34af587fdd38d",
							name: "华森葳杰许厨师"
						}, {
							img: "http://image.peihuayuren.com/small9.jpg",
							id: "5077b7bf9c784e4d9606887d01c5b03d",
							name: "华森葳美发屋扮演套装"
						}, {
							img: "http://image.peihuayuren.com/small10.jpg",
							id: "360a58ec17494834939ed8a3157f4d14",
							name: "华森葳美食家"
						},
						{
							img: "http://image.peihuayuren.com/small11.jpg",
							id: "00e166391e144d3385e7e3867f25c2e2",
							name: "华森葳明星扮演小屋"
						},
						{
							img: "http://image.peihuayuren.com/small12.jpg",
							id: "20481a71d4bc4ca8bd5e266739098a23",
							name: "华森葳蔬菜农场"
						}, {
							img: "http://image.peihuayuren.com//upload/20190902/1025332896d5f1.jpg",
							id: "41dade65924a43abb20c61a7372953f9",
							name: "华森葳微笑动物手偶"
						}, {
							img: "http://image.peihuayuren.com/small14.jpg",
							id: "6db80da1220e4ab2a4c487ad51df3516",
							name: "华森葳勇敢伙伴手偶组"
						}, {
							img: "http://image.peihuayuren.com/small15.jpg",
							id: "e2a8eed72ffd460d9ae66e3439e02263",
							name: "斯尔福磁力积木"
						}, {
							img: "http://image.peihuayuren.com/small16.png",
							id: "907425df274f40cb982fbc412932e709",
							name: "医生手提箱"
						}, {
							img: "http://image.peihuayuren.com//upload/20190830/2043347030c976.jpg",
							id: "0c9950c126c34844840f0ed12110aae7",
							name: "HABAcosplay套装"
						}, {
							img: "http://image.peihuayuren.com/small18.jpg",
							id: "71af6b81e82242bd90c2cb28044512ad",
							name: "VIGA售货机"
						}, {
							img: "http://image.peihuayuren.com/small19.jpg",
							id: "a8552007d3e543f3b4b3ca3388726a33",
							name: "VIGA购物车"
						}, {
							img: "http://image.peihuayuren.com/small20.jpg",
							id: "d2f8495832f54b4eb9282b87e1aade7f",
							name: "VIGA玩偶床"
						}
					]

				},
				Middle_shift: {
					name: "应提供更多的拼插、建构类玩具，让孩子在玩中有更多的计划，探索和尝试，学习技能的同时培养良好的学习品质。",
					myData: [{
							imgsort: "http://image.ybk008.com/erdeng1566898041565",
							imgurl: "http://image.peihuayuren.com/zhong1.jpg",
							id: "0ec78861d9ff40668afabb3fc75750f5",
							name: "滚珠轨道积木套"
						},
						{
							imgsort: "http://image.ybk008.com/yideng1566898313494",
							imgurl: "http://image.peihuayuren.com/zhong2.jpg",
							id: "986db1d04a4f4bb580957c26488948e5",
							name: "VIGA织布机"
						},
						{
							imgsort: "http://image.ybk008.com/sandeng1566898333342",
							imgurl: "http://image.peihuayuren.com/zhong3.jpg",
							id: "75c317f4f8cb4f6f9527b7b7a17e82c0",
							name: "中号自主游戏套装"
						}
					],
					footerData: [{
							img: "http://image.peihuayuren.com/zhong4.png",
							id: "2f5869bc6b7d4ca4946e5aaa31e68530",
							name: "齿轮游戏-猴子乐园"
						},
						{
							img: "http://image.peihuayuren.com/zhong5.jpg",
							id: "a811e775c4c744c48e8f2244e59ee29c",
							name: "齿轮组-机械工程"
						},
						{
							img: "http://image.peihuayuren.com/zhong6.jpg",
							id: "04b3a2a8a938498693ed60a5ad17da52",
							name: "磁力魔法棒"
						}, {
							img: "http://image.peihuayuren.com/zhong7.jpg",
							id: "87a8e286411e4fb4abff4eb4df1659ff",
							name: "科博彩色轨道"
						}, {
							img: "http://image.peihuayuren.com/zhong8.png",
							id: "5466029d71084cdd8da35b7ceeb597e6",
							name: "亮亮积木套装"
						}, {
							img: "http://image.peihuayuren.com/zhong9.jpg",
							id: "06f2898be9a64aee9a9d61768b21a3e6",
							name: "魔力球"
						}, {
							img: "http://image.peihuayuren.com/zhong10.jpg",
							id: "6e95a0cd071c4b7c93dafefa018f49c0",
							name: "万能拨扣"
						}, {
							img: "http://image.peihuayuren.com/zhong11.jpg",
							id: "eeb5fc05a2854f17b0aa4c04ff9052b1",
							name: "向天歌48片空心碳化积木"
						},
						{
							img: "http://image.peihuayuren.com/zhong12.jpg",
							id: "f341667834174d7fae7ff51bd2cf08bb",
							name: "向天歌巨型色彩透视清水积木"
						},
						{
							img: "http://image.peihuayuren.com/zhong13.jpg",
							id: "524c1b4a7c19417f83b05f82fdabc576",
							name: "小小建筑师"
						}, {
							img: "http://image.peihuayuren.com/zhong14.jpg",
							id: "bb766bf45e334e44835ef17b15d6472b",
							name: "雪花片"
						}, {
							img: "http://image.peihuayuren.com/zhong15.jpg",
							id: "006bf056dc1b48df9087f89b91ed6712",
							name: "智高齿轮转转机器人"
						}, {
							img: "http://image.peihuayuren.com/zhong16.jpg",
							id: "8ddcba7573c84770b35995ed0d4c7299",
							name: "向天歌锁扣积木"
						}, {
							img: "http://image.peihuayuren.com/zhong18.jpg",
							id: "8c29d9c99ef7433892ef1b62af2b4a42",
							name: "HABA多彩积木块"
						}, {
							img: "http://image.peihuayuren.com/zhong19.jpg",
							id: "fe574b4251ac44739bac6ded98b52a83",
							name: "MORPHUN黄色狮子积木"
						}, {
							img: "http://image.peihuayuren.com/zhong20.jpg",
							id: "673d2745effc46bab7acb6c48bc52eb6",
							name: "沃克STEAM工程积木"
						}
					]

				},
				big_shift: {
					name: "应提供对抗类玩具、棋类玩具和桌游类玩具，来满足孩子们喜欢挑战，以及喜欢同伴游戏的年龄特点。",
					myData: [{
							imgsort: "http://image.ybk008.com/erdeng1566898041565",
							imgurl: "http://image.peihuayuren.com/201908281332-1.jpg",
							id: "fb7a3f7965f746fbb2ce9e2eb6dcef07",
							name: "俄罗斯拼块游戏"
						},
						{
							imgsort: "http://image.ybk008.com/yideng1566898313494",
							imgurl: "http://image.peihuayuren.com/201908281332-2.jpg",
							id: "3ee6bee9fe3f47198607c3903819229e",
							name: "矩阵逻辑卡片"
						},
						{
							imgsort: "http://image.ybk008.com/sandeng1566898333342",
							imgurl: "http://image.peihuayuren.com/201908281332-3.jpg",
							id: "1e355057db6349fdb506f775b240a51d",
							name: "HABA威莉的数字塔"
						}
					],
					footerData: [{
							img: "http://image.peihuayuren.com/201908281332-4.jpg",
							id: "616a29071db446f8b36c21944cadde87",
							name: "晨幼数数和倍数认知板"
						},
						{
							img: "http://image.peihuayuren.com/201908281332-5.jpg",
							id: "deb29a6cfdfb443c99ae0bdc5ffe6f3f",
							name: "华森葳平衡摇摆游戏"
						},
						{
							img: "http://image.peihuayuren.com/201908281332-6.jpg",
							id: "de0cd4682c0b4f669577d818911f11bb",
							name: "机器人小侦探"
						}, {
							img: "http://image.peihuayuren.com/201908281332-7.jpg",
							id: "bfdb55ade9ed441bbf129c51da034104",
							name: "HABA夹夹乐"
						}, {
							img: "http://image.peihuayuren.com/201908281332-8.jpg",
							id: "8dfc4d518bff4e7da7f3c4719b531325",
							name: "警察抓小偷"
						}, {
							img: "http://image.peihuayuren.com/201908281332-9.jpg",
							id: "57f2f241587e4465a88ad8ae1a997c3e",
							name: "孔塞拼块游戏"
						}, {
							img: "http://image.peihuayuren.com/201908281332-10.jpg",
							id: "ccd4d606044446a39409a5eebd71a291",
							name: "棋子叠叠高"
						}, {
							img: "http://image.peihuayuren.com/201908281332-11.jpg",
							id: "002fc8f3aaf149f4b7696e5e9efc1cdd",
							name: "HABA数字花朵"
						},
						{
							img: "http://image.peihuayuren.com/201908281332-12.jpg",
							id: "c9d6616d93904acd953c899c2b6c9548",
							name: "手指赛车游戏"
						},
						{
							img: "http://image.peihuayuren.com/201908281332-13.jpg",
							id: "675ab221dfb94d538da0756d894c699b",
							name: "掀盖记忆游戏"
						}, {
							img: "http://image.peihuayuren.com/201908281332-14.jpg",
							id: "7095ff197d17477b8326d971e0c5c303",
							name: "智能桩板组+工作卡"
						}, {
							img: "http://image.peihuayuren.com/201908281332-15.jpg",
							id: "5058c341f06341e294ac3464203c66b1",
							name: "智高EVA立体板"
						}, {
							img: "http://image.peihuayuren.com/201908281332-16.jpg",
							id: "02b3f4cdc7d648c395027ae75eccddc7",
							name: "足球游戏"
						}, {
							img: "http://image.peihuayuren.com/201908281332-17.jpg",
							id: "197b24fdcac044ab9a9c7d319c8f60ad",
							name: "EDU磁力组合实验包"
						}, {
							img: "http://image.peihuayuren.com/201908281332-18.jpg",
							id: "ee0d20daf81748a9837ceb5185a2ee3b",
							name: "HABA分类游戏"
						}, {
							img: "http://image.peihuayuren.com/201908281332-19.jpg",
							id: "9088b883b0b24412b45bf1ef7666c00f",
							name: "HABA高尔夫球毯"
						}, {
							img: "http://image.peihuayuren.com/201908281332-20.jpg",
							id: "4c963ddbdc2d4b94b05a0ab2cbebedcb",
							name: "VIGA动物套圈"
						}
					]

				}
			}
		},
		methods: {
			infoTab(newval) {
				if (newval == "tab-1") {
					// this.allMyData = this.small;
				} else if (newval == "tab-2") {
					// this.allMyData = this.Middle_shift;
				} else if (newval == "tab-3") {
					// this.allMyData = this.big_shift;
				}
			},
			tiaozhuan(item) {
				console.log(this.$route.params.userId);
				// this.$router.push(`/orderConfirm/${data.data.resultObject.ordersId}/${that.userId}?status=1`)
				// path: '/shopItemDetail/:id/:userid',
				if (this.$route.params.userId == "userId") {
					Toast({
						message: '请先登录app',
						position: 'bottom',
						duration: 1000
					});
					return;
				}
				console.log(this.QRcode);

				if (this.QRcode == "1") {
					if (this.$route.params.id == "type=true") {
						//浏览器中打开的 （微信或者 浏览器
						this.$router.push(`/shopItemDetail/${item.id}/type=true?status=1`);
					} else {
						//内部打开的
						this.$router.push(`/shopItemDetail/${item.id}/${this.$route.params.userId}?status=1`);
					}
				} else {
					this.$router.push(`/shopItemDetail/${item.id}/type=true?status=1`)
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	@media only screen and (min-width:768px) {
		.main_body_left {
			.main_body_left_big {
				width: 50px !important;
				/*px*/
				height: 50px !important;
				/*px*/
				margin-left: 40px !important;
				/*px*/
			}

			.main_body_left_small {
				width: 40px !important;
				/*px*/
				height: 40px !important;
				/*px*/
			}
		}

		.main_body_center {
			.p_zhuti {
				font-size: 35px !important;
				/*px*/
				line-height: 50px !important;
				/*px*/
			}
		}

		.main_body_center_bottom {
			.ul_one {
				margin-top: 60px !important;

				/*px*/
				li {
					div {
						height: 370px !important;

						/*px*/
						img:nth-child(1) {
							width: 62px !important;
							/*px*/
							height: 68px !important;
							/*px*/
							left: 20px !important;
							/*px*/
						}
					}

					.main_body_name {
						font-size: 35px !important;
						/*px*/
					}

					button {
						width: 140px !important;
						/*px*/
						height: 60px !important;
						/*px*/
						line-height: 60px !important;
						/*px*/
						font-size: 27px !important;
						/*px*/
					}
				}
			}
		}

		.title {
			font-size: 37px !important;

			/*px*/
			img {
				width: 36px !important;
				/*px*/
				height: 40px !important;
				/*px*/
			}
		}

		footer {
			ul {
				li {
					.footer_left {
						width: 383.5px !important;
						/*px*/
						height: 310px !important;
						/*px*/
					}

					.footer_right {
						height: 350px !important;
						/*px*/
						margin-left: 50px !important;

						/*px*/
						.footer_right_noborder {}

						p {
							margin-bottom: 40px !important;
							/*px*/
							-webkit-line-clamp: 3 !important;
							line-clamp: 3 !important;
							width: 900px !important;
							/*px*/
							font-size: 40px !important;
							/*px*/
							height: 156px !important;
							/*px*/

						}

						button {
							font-size: 32px !important;
							/*px*/
							width: 158px !important;
							/*px*/
							height: 67px !important;
							/*px*/
							line-height: 67px !important;
							/*px*/
						}

					}
				}
			}
		}


	}

	@media only screen and (min-width:950px) {
		.main_body_left {
			.main_body_left_big {
				width: 70px !important;
				/*px*/
				height: 70px !important;
				/*px*/
				margin-left: 50px !important;
				/*px*/
			}

			.main_body_left_small {
				width: 50px !important;
				/*px*/
				height: 50px !important;
				/*px*/
			}
		}

		.main_body_center {
			.p_zhuti {
				font-size: 50px !important;
				/*px*/
				line-height: 70px !important;
				/*px*/
			}
		}

		.main_body_center_bottom {
			.ul_one {
				margin-top: 60px !important;

				/*px*/
				li {
					div {
						height: 370px !important;

						/*px*/
						img:nth-child(1) {
							width: 82px !important;
							/*px*/
							height: 88px !important;
							/*px*/
							left: 30px !important;
							/*px*/
						}
					}

					.main_body_name {
						font-size: 50px !important;
						/*px*/
					}

					button {
						width: 200px !important;
						/*px*/
						height: 90px !important;
						/*px*/
						line-height: 90px !important;
						/*px*/
						font-size: 35px !important;
						/*px*/
						border-radius: 20px !important;
						/*px*/
					}
				}
			}
		}

		.title {
			margin-top: 100px !important;
			/*px*/
			margin-bottom: 40px !important;
			/*px*/
			font-size: 60px !important;

			/*px*/
			img {
				width: 56px !important;
				/*px*/
				height: 60px !important;
				/*px*/
			}
		}

		footer {
			ul {
				li {
					.footer_left {
						width: 423.5px !important;
						/*px*/
						height: 350px !important;
						/*px*/
					}

					.footer_right {
						height: 400px !important;
						/*px*/
						margin-left: 50px !important;

						/*px*/
						.footer_right_noborder {}

						p {
							margin-bottom: 40px !important;
							/*px*/
							-webkit-line-clamp: 3 !important;
							line-clamp: 3 !important;
							width: 1320px !important;
							/*px*/
							font-size: 55px !important;
							/*px*/
							height: 156px !important;
							/*px*/

						}

						button {
							font-size: 42px !important;
							/*px*/
							width: 218px !important;
							/*px*/
							height: 97px !important;
							/*px*/
							line-height: 97px !important;
							/*px*/
						}

					}
				}
			}
		}
	}


	.main_body {
		width: 100%;
		position: relative;
		top: -4px;
		/*px*/
		z-index: 99999;
		padding-bottom: 40px;
		/*px*/
		background: white !important;

		.main_body_home {
			width: 100%;
			display: flex;
			padding-top: 26px;

			/*px*/
			.main_body_left {
				position: absolute;
				left: 0;

				.main_body_left_small {
					background: #EEF0FD;
					width: 20px;
					/*px*/
					height: 35px;
					/*px*/
				}

				.main_body_left_big {
					background: #CFD3FF;
					width: 35px;
					/*px*/
					height: 35px;
					/*px*/
					margin-left: 20px;
					/*px*/
					// margin-top: 30px;/*px*/
				}

			}

			.main_body_center {
				padding-top: 16px;
				/*px*/
				width: 90%;
				margin: auto;

				.p_zhuti {
					text-indent: 2em;
					color: rgba(102, 102, 102, 1);
					line-height: 42px;
					/*px*/
					font-weight: 400;
					font-size: 28px;
					/*px*/

				}

				.main_body_center_bottom {
					.ul_one {
						display: flex;
						margin-top: 50px;
						/*px*/
						justify-content: center;
						position: relative;

						li {
							width: 28%;
							height: fit-content;
							margin: 0 1.5%;
							//		 c	 x    y   模糊程度
							box-shadow: #F6B37F 5px 5px 1px -2px; //边框阴影
							position: relative;
							border-radius: 10px;
							/*px*/
							overflow: hidden;
							text-align: center;

							div {
								width: 100%;
								height: 151px;
								/*px*/
								display: flex;

								img:nth-child(1) {
									position: absolute;
									width: 42px;
									/*px*/
									height: 48px;
									/*px*/
									left: 15px;
									/*px*/
								}

								img:nth-child(2) {
									width: 100%;
								}
							}

							.main_body_name {
								text-align: center;
								color: rgba(51, 51, 51, 1);
								font-size: 24px;
								/*px*/
								font-weight: 400;
								padding-top: 10px;
								/*px*/
							}

							button {
								// border: none;
								color: white;
								background: rgba(255, 85, 85, 1);
								border: 0px solid rgba(0, 0, 0, 1);
								border-radius: 5px;
								/*px*/
								width: 124px;
								/*px*/
								height: 37px;
								/*px*/
								line-height: 37px;
								/*px*/
								font-size: 20px;
								/*px*/
								margin: 15px 0;
								/*px*/
							}
						}

						li:nth-child(2) {
							width: 34%;
							top: -35px;

							/*px*/
							div {
								width: 100%;
								// width: 219px;
								/*px*/
								height: 165px;

								/*px*/
								img {}
							}

						}

						li:nth-child(1),
						li:nth-child(3) {
							div {
								width: 100%;
								// width: 200px;
								/*px*/
								// height: 151px !important;
								/*px*/
							}
						}
					}
				}

				.title {
					margin-top: 78px;
					/*px*/
					font-size: 34px;
					/*px*/
					font-weight: bold;
					color: rgba(51, 51, 51, 1);

					img {
						width: 24px;
						/*px*/
						height: 28px;
						/*px*/
						margin-right: 10px;
						/*px*/
					}

				}
			}
		}

		footer {
			width: 100%;

			margin-top: 50px;

			/*px*/
			ul {
				width: 100%;

				li {
					display: flex;
					// margin:5px 0;/*px*/
					margin-top: 22px;

					/*px*/
					.footer_left {
						border: 1px solid #F8F8F8;
						border-radius: 10px;
						/*px*/
						width: 247px;
						/*px*/
						height: 184px;
						/*px*/
						overflow: hidden;
						margin-left: 5%;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.footer_right {
						flex: 1;
						height: 206px;
						/*px*/
						border-bottom: 1px solid rgba(238, 238, 238, 1);

						.footer_right_noborder {
							// height: 170px;/*px*/
							padding-top: 10px;
							/*px*/
							margin-bottom: 22px;
							/*px*/
							margin-left: 30px;

							/*px*/
							p {
								font-size: 32px;
								/*px*/
								font-weight: 400;
								color: rgba(51, 51, 51, 1);
								// height: auto;
								width: 400px;
								/*px*/
								height: 90px;
								/*px*/
								text-overflow: -o-ellipsis-lastline;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								line-clamp: 2;
								-webkit-box-orient: vertical;
							}

							button {
								margin-top: 25px;
								/*px*/
								font-size: 26px;
								/*px*/
								background: rgba(255, 85, 85, 1);
								border-radius: 10px;
								/*px*/
								color: white;
								border-radius: 20px 20px 18px 18px;
								/*px*/
								border: none;
								width: 156px;
								/*px*/
								height: 54px;
								/*px*/
								line-height: 54px;
								/*px*/
							}
						}
					}
				}
			}
		}
	}
</style>
