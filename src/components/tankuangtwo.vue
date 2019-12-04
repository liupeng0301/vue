<template>
	<div class="tankuang" v-if="xianshi">
		<div class="tanFater">
			<p class="tishide">提示</p>
			<p class="title titleto">{{message}}</p>
			<footer>
				<button @click="quxiao">取消</button>
				<button @click="qding" v-if="isshow == 1">{{messageFooter}}</button>
				<button @click="all_qding" v-else-if="isshow == 2">{{messageFooter}}</button>
			</footer>
			
		</div>
	</div>
</template>

<script>
	import {
		Toast,
		MessageBox
	} from 'mint-ui';
	export default {
		props: {
			message: {
				type: String
			},
			xiawen: {
				type: Boolean,
				default: true
			},
			xianshi: {
				type: Boolean
			},
			messageFooter: {
				type: String,
				default: "确定"
			},
			userId: {
				type: String,
			},
			ids: {
				type: String,
			},
			courseId: {
				type: String,
			},
			isshow: {
				default: 1
			},
			jsonStr:{},
			goodsId:{},
		},
		data() {
			return {

			}
		},
		watch: {
			userId(newval) {
				console.log(newval);
			},
			courseId(newval) {
				console.log(newval);
			},
			ids(newval) {
				console.log(newval);
			},
			jsonStr(newval){
				console.log(newval);
			}
		},
		mounted() {
		},
		methods: {
			quxiao() {
				Toast({
					message: '已取消',
					position: 'middle',
					duration: 1000
				});

				this.$parent.guanbi();
			},
			qding() {
				this.$parent.guanbi();
				let postData = this.$qs.stringify({
					userId: this.userId,
					ids: this.ids,
					courseId: this.courseId
				});

				this.$axios({
						method: "post",
						url: this.$url + "orders/json/submitCourse",
						data: postData,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						async: true
					})
					.then(data => {
						let that = this;
						if (data.data.code === 10000) {
							Toast("订单已成功提交");
							setTimeout(function() {
								that.$router.push(`/orderConfirm/${data.data.resultObject.ordersId}/${that.userId}?status=1`)
								//window.location = "http://www.peihuayuren.com:8080/dist/index.html#/orderConfirm/"+data.data.resultObject.ordersId+"/"+that.userId
							}, 2000)
						} else {
							Toast(data.data.message);
						}
					})
			},
			all_qding() {
				this.$parent.guanbi();
				let postData = this.$qs.stringify({
					userId: this.userId,
					ids: this.ids,
					jsonStr: JSON.stringify(this.jsonStr),
					goodsId:this.$route.params.goodsId
				});
				this.$axios({
						method: "post",
						url: this.$url + "orders/json/submitSpecialGoods",
						data: postData,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						async: true
					})
					.then(data => {
						console.log(data);
						let that = this;
						if (data.data.code === 10000) {
							Toast("订单已成功提交");
							setTimeout(function() {
								that.$router.push(`/orderConfirm/${data.data.resultObject.ordersId}/${data.data.resultObject.userId}?status=1`)
							}, 2000)
						} else {
							Toast(data.data.message);
						}
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tankuang {
		width: 100%;
		height: 100%;
		background: rgba(15, 16, 17, 0.5);
		position: fixed;
		z-index: 999999999999999 !important;
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
				height: 90px;

				/*px*/
				button {
					width: 50%;
					line-height: 90px;
					/*px*/
					font-size: 37px;
					/*px*/
					border: none;
					background: none;
					color: #68C9F8;
				}

				button:nth-child(1) {
					border-right: 1px solid #ECECEC;
				}
			}
		}
	}
</style>
