<template>
	<div class="tankuang" v-if="xianshi" @click="Fater">
		<div class="tanFater">
			<p class="tishide">提示</p>
			<p class="title" style="margin-bottom:10px;">{{message}}</p>
			<p class="title titleto" v-show="naixin">请耐心等待客服与您联系</p>
			<footer>
				<button>取消</button>
				<button @click.stop="qding">{{messageFooter}}</button>
			</footer>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	export default {
		props: {
			message: {
				type: String
			},
			xianshi: {
				type: Boolean
			},
			messageFooter: {
				type: String,
			},
			ID: {
				type: String,
			},
			userId: {
				type: String,
			},
			naixin:{
				default:true
			}
		},
		data() {
			return {

			}
		},
		watch: {
			userId(newval) {
				console.log(newval);
			},
			ID(newval) {
				console.log(newval);
			}
		},
		mounted() {},
		methods: {
			Fater(){
				if(this.xianshi == true){
					this.$parent.guanbi();
				}
			},
			qding() {
				let postData = this.$qs.stringify({
					userId: this.userId,
					id: this.ID
				});
				this.$axios({
					method: "post",
					url: this.$url + "orders/json/updateKindergartenCoupon",
					data: postData,
					async: true
				}).then(res => {
					console.log(res);
					if (res.data.code == "10000") {
						this.$parent.getList();
						this.$parent.guanbi();
						// _this.getList();
						Toast({
							message: "请耐心等待客服与您联系",
							position: 'bottom',
							duration: 1500
						});
					} else {
						this.$parent.getList();
						this.$parent.guanbi();
						Toast({
							message: `${res.data.message}`,
							position: 'bottom',
							duration: 1500
						});
					}
				});
				// this.$emit("MessSon", true);
				// if (this.applyStatus == 1 || this.applyStatus == 7) {
				// 	this.$router.push("/zhongjiang");
				// }else if(this.applyStatus == 2 || this.applyStatus == 3 || this.applyStatus == 4 || this.applyStatus == 5){
				// 	// this.$router.push("/success");
				// 	this.$router.push({
				// 		path:"/success",
				// 		query:{"status":this.applyStatus}
				// 	});
				// }


			}
		}
	}
</script>

<style lang="scss" scoped>
	.tankuang {
		width: 100%;
		height: 100%;
		background: rgba(15, 16, 17, 0.5);
		position: fixed;
		z-index: 987654115621549;
		top: 0;

		.tishide {
			font-size: 40px;
			/*px*/
			padding: 30px 0;
			/*px*/
			text-align: center;
		}

		.tanFater {
			width: 70%;
			margin: auto;
			background: white;
			border: 1px solid #ECECEC;
			border-radius: 7px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -70%);

			.title {
				font-size: 33px;
				/*px*/
				color: #AFAFAF;
				font-size: .18rem;
				width: 95%;
				margin: auto;
				text-align: center;
			}

			.titleto {
				margin-bottom: 40px;
				/*px*/
			}

			.yanse {
				color: #ECECEC;
				margin-top: .1rem;
				text-align: center;
				font-size: .15rem;
				margin-bottom: .2rem;
			}

			footer {
				text-align: center;
				border-top: 1px solid #ECECEC;
				display: flex;
				height: 80px;

				/*px*/
				button {
					flex:1;
					text-align: center;
					line-height: 80px;
					/*px*/
					font-size: 37px;
					/*px*/
					border: none;
					background: none;
					color: #68C9F8;
				}
				button:nth-child(1){
					border-right: 1px solid #ECECEC;;
				}
			}
		}
	}
</style>
