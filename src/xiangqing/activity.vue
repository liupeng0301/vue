<template>
	<div class="activity">
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
		<second-Header msgHeader="新学期过渡玩具精选" :showIcon="true"></second-Header>
		
		<header>
			<img src="../assets/img/activityHeader.png" alt="">
		</header>

		<div class="zhuti">
			<ul class="list">
				<li @click="tab(1)" :class="{'li_active':Tbale == 'tab-1'}">小班</li>
				<li @click="tab(2)" :class="{'li_active':Tbale == 'tab-2'}">中班</li>
				<li @click="tab(3)" :class="{'li_active':Tbale == 'tab-3'}">大班</li>
			</ul>

			<activityBottom :Tbale="Tbale"></activityBottom>
		</div>
	</div>
</template>

<script>
	import SecondHeader from '../components/secondHeader';
	import activityBottom from '../components/activityBottom';
	export default {
		data() {
			return {
				Tbale: sessionStorage.getItem("Tbale") || "tab-1",
				showDown: false, //下载提示		
				openDown: false, //浏览器打开提示
			}
		},
		components: {
			SecondHeader,
			activityBottom
		},
		created() {
			var test = {
				name: "123"
			};
			//true 自身属性
			console.log(test.hasOwnProperty('name'));

			//刚进入页面tab 切换存储第一个
			if (!sessionStorage.getItem("Tbale")) {
				sessionStorage.setItem('Tbale', 'tab-1'); // 存入一个值
			}

		},
		methods: {
			shure() {
				this.showDown = false;
			},
			openbrower() {
				this.openDown = false;
			},
			tab(num) {
				this.Tbale = `tab-${num}`;
				sessionStorage.setItem('Tbale', `tab-${num}`); // 存入一个值
			}
		},
	}
</script>

<style lang="scss" scoped>
	// ipad
	@media only screen and (min-width:768px) {
		.zhuti {
			margin-top: -480px !important;
			/*px*/
		}

		.list {
			position: relative;
			z-index: 999 !important;
			font-size: 40px !important;

			/*px*/
			.li_active {
				font-size: 45px !important;
				/*px*/
			}

			li {
				width: 200px !important;
				/*px*/
				height: 110px !important;
				/*px*/
				line-height: 110px !important;
				/*px*/
				border-radius: 10px 10px 9px 9px;
				/*px*/
			}

			li:nth-child(2),
			li:nth-child(3) {
				margin-left: 20px !important;
				/*px*/
			}
		}

		.main_body_center {
			.p_zhuti {
				font-size: 24px !important;
				/*px*/
				line-height: 21px !important;
				/*px*/
			}
		}

	}

	// ipad Pro
	@media only screen and (min-width:950px) {
		.zhuti {
			margin-top: -650px !important;
			/*px*/
		}

		.list {
			font-size: 50px !important;

			/*px*/
			.li_active {
				font-size: 60px !important;
				/*px*/
			}

			li {
				width: 250px !important;
				/*px*/
				height: 130px !important;
				/*px*/
				line-height: 130px !important;
				/*px*/
				border-radius: 15px 15px 14px 14px !important;
				/*px*/
			}

			li:nth-child(2),
			li:nth-child(3) {
				margin-left: 20px !important;
				/*px*/
			}
		}

		.main_body_center {
			.p_zhuti {
				font-size: 24px !important;
				/*px*/
				line-height: 21px !important;
				/*px*/
			}
		}


	}

	.activity {
		width: 100%;
		height: 100%;

		header {
			img {
				width: 100%;
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

		nav {
			width: 93%;
			margin: auto;
			line-height: 40px;
			/*px*/
			font-size: 32px;
			/*px*/
		}

		.zhuti {
			width: 100%;
			margin-top: -230px;

			/*px*/
			.list {
				outline: 0;
				-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				position: relative;
				z-index: 9999;
				width: 93%;
				margin: auto;
				display: flex;
				font-size: 32px;
				/*px*/
				justify-content: center;

				li {
					width: 171px;
					/*px*/
					height: 81px;
					/*px*/
					line-height: 81px;
					/*px*/
					color: white;
					text-align: center;
					border-radius: 10px 10px 9px 9px;
					/*px*/
					box-shadow: 0px 0px 45px 0px rgba(173, 185, 247, 0.38);
				}

				li:nth-child(2),
				li:nth-child(3) {
					margin-left: 12px;
					/*px*/
				}

				li:nth-child(1) {
					background: #c3e7b8;
				}

				li:nth-child(2) {
					background: #EFD1EB;
				}

				li:nth-child(3) {
					background: #BBD7FD;
				}

				// .xiao_li_active{
				// 	background: white !important;
				// 	color: #7E8AED !important;
				// }
				.li_active {
					background: white !important;
					color: #7E8AED !important;
					font-size: 35px;
					/*px*/
					font-weight: bold;
				}


			}

		}

	}
</style>
