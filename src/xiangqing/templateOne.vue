<template>
	<div class="temlapteHome">
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

		<second-Header :msgHeader="resultObject.cname" :showIcon="true"></second-Header>
		<header>
			<img :src="resultObject.showImg" alt="">
		</header>
		<main>
			<div v-for="(item,index) in resultObject.agList" :key="index" class="main_body">
				<div class="main_left"><img :src="item.showImg" alt=""></div>
				<div class="main_right">
					<div class="main_right_home">
						<p class="title">{{item.cname}}</p>
						<p class="content">{{item.cdesc}}</p>
						<button class="buyBtn" @click="goBuy(item)">立即购买</button>
					</div>
				</div>
			</div>
		</main>
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
				resultObject: [],
				MyuserId: '', //用户ID
			}
		},
		created() {
			this.Just_entered();
			this.MyuserId = this.$route.params.userId;
		},
		components: {
			SecondHeader
		},
		methods: {
			openbrower() {
				this.openDown = false;
			},
			shure() {
				this.showDown = false;
			},
			Just_entered() {
				let modelId = {
					modelId: this.$route.params.modelId
				};
				axios.post(`${this.$url}goods/json/getActivityGoods`, qs.stringify(modelId)).then((response) => {
					//success
					console.log(response);
					if (response.data.code === 10000) {
						this.resultObject = response.data.resultObject;
					}
				}, (error) => {
					console.log(error)
				});
			},
			//立即购买
			goBuy(item) {
				if (this.$route.params.userId == "type=true") {
					this.$router.push(`/shopItemDetail/${item.oid}/type=true?status=1&goodsType=${item.goodsType}`);
				} else {
					this.$router.push(`/shopItemDetail/${item.oid}/${this.MyuserId}?status=1&goodsType=${item.goodsType}`);
				}

			}

		}
	}
</script>

<style lang="scss" scoped>
	@media only screen and (min-width:768px) {
		.main_body {
			height: auto !important;

			.main_left {
				width: 330px !important;
				/*px*/
				height: 360px !important;
				/*px*/
				margin-top: 40px !important;

				/*px*/
				img {
					width: 330px !important;
					/*px*/
					height: 330px !important;
					/*px*/
				}

			}

			.main_right {
				.title {
					margin-top: 20px !important;
				}

				.content {
					margin-top: 10px !important;
					margin-bottom: 30px !important;
				}

			}
		}
	}

	@media only screen and (min-width:950px) {
			.main_body {
				height: auto !important;
		
				.main_left {
					width: 450px !important;
					/*px*/
					height: 460px !important;
					/*px*/
					margin-top: 40px !important;
		
					/*px*/
					img {
						width: 450px !important;
						/*px*/
						height: 420px !important;
						/*px*/
					}
		
				}
		
				.main_right {
					.title {
						margin-top: 30px !important;
						font-size: 45px !important;/*px*/
					}
		
					.content {
						font-size: 40px !important;/*px*/
						margin-top: 10px !important;
						margin-bottom: 30px !important;
					}
		
				}
			}
	}




	.temlapteHome {
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

		header {
			width: 100%;

			img {
				width: 100%;
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
