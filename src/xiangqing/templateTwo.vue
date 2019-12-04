<template>
	<div class="Picture">
		<second-Header :msgHeader="resultObject.cname" :showIcon="true"></second-Header>
		<header>
			<img :src="resultObject.showImg" alt="">
		</header>
		<nav>
			<div class="zhanwei" v-for="(item,key) in resultObject.agList">
				<p class="p_title">
					<i>Top {{key+1}}</i>
					<span>《{{item.cname}}》</span>
				</p>
				<p class="p_img">
					<img src="../assets/img/Picture_title.png" alt="">
				</p>
				<div class="div_tu_wen">
						<img :src="item.showImg" alt="" v-if="key%2 != 1">
					<ul class="ul_left" v-if="key%2 != 1">
						<!-- <li>{{item.shiyong}}:&nbsp;&nbsp;&nbsp;{{item.ageStart}}-{{item.ageEnd}}岁</li> -->
						<li>{{item.firstTag}}</li>
						<li>{{item.secondTag}}</li>
						<li>{{item.thirdTag}}</li>
						<li>
							<button @click="goumai(item)">立即购买</button>
						</li>
					</ul>
					<ul class="ul_right" v-if="key%2 == 1">
						<!-- <li>{{item.shiyong}}:&nbsp;&nbsp;&nbsp;{{item.ageStart}}-{{item.ageEnd}}岁</li> -->
						<li>{{item.firstTag}}</li>
						<li>{{item.secondTag}}</li>
						<li>
							<button @click="goumai(item)">立即购买</button>
						</li>
					</ul>
						<img :src="item.showImg" alt="" v-if="key%2 == 1">
			
				</div>
				<div class="content">
					<p class="p_content_name">商品简介</p>
					<p class="p_zhuti">{{item.cdesc}}</p>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
	import axios  from "axios";
	import qs  from "qs";
	import SecondHeader from '../components/secondHeader';
	import {
		Toast
	} from 'mint-ui';
	export default {
		name: "Picturebook",
		data() {
			return {
				MyuserId: this.$route.params.userId,
				resultObject:[]//数据
			}
		},
		components: {
			SecondHeader
		},
		created(){
			console.log(this.$route.params.userId);
			console.log(this.$route.params.userId);
			this.Just_entered();
		},
		mounted() {
			console.log(this.MyuserId);
		},
		methods: {
			Just_entered() {
				let modelId = {
					modelId:this.$route.params.modelId
				};
				// http://47.105.67.124:7080/YQApp/yqws/
				// http://47.105.67.124:7080/YQApp/yqws/goods/json/getActivityGoods
				// http://192.168.1.182:8090/YQApp/yqws/goods/json/getActivityGoods
				// axios.post(`http://192.168.1.188:8090/YQApp/yqws/goods/json/getActivityGoods`, qs.stringify(modelId)).then((response) => {
				axios.post(`${this.$url}goods/json/getActivityGoods`, qs.stringify(modelId)).then((response) => {
					//success
					console.log(response);
					if(response.data.code === 10000){
						this.resultObject = response.data.resultObject;
					}
				}, (error) => {
					console.log(error)
				});
			},
			goumai(item) {
				// this.$router.push(`/shopItemDetail/${item.oid}/${this.MyuserId}?status=1`);
				
				if(this.$route.params.userId == "type=true"){
					this.$router.push(`/shopItemDetail/${item.oid}/type=true?status=1`);
				}else{
					this.$router.push(`/shopItemDetail/${item.oid}/${this.MyuserId}?status=1`);
				}
				
				
				
				
				
				
				// if (this.MyuserId == "userId") {
				// 	Toast({
				// 		message: '请先登录app',
				// 		position: 'bottom',
				// 		duration: 1000
				// 	});
				// } else {
				// 	this.$router.push(`/shopItemDetail/${item.JumpID}/${this.MyuserId}?status=1`);
				// }
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
						// width: 40%;
						// height: 50%;
						width: 110px;
						height: 110px;
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
