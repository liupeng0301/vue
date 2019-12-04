<template>
	<div class="activityHeader" @click="xianshi = ! xianshi">
		<img src="../assets/img/logo.png" alt="">
		<p class="name">为了更好的幼教</p>
		<button class="btn">立即下载</button>
		<div class="tankuang" v-if="xianshi">
			<div class="tanFater">
				<p class="tishide">温馨提示</p>
				<div class="tanFaterFooter">
					<button @click.stop="xiazai">下载幼趣魔方</button>
					<button @click.stop="dakai">打开幼趣魔方</button>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				xianshi: false
			}
		},
		watch:{
			xianshi(newval){
				console.log(newval);
			}
		},
		methods: {
			xiazai() {
				this.xianshi = false;
				window.location = "http://www.peihuayuren.com/mp/yqshare/index.html";
			},
			dakai() {
				this.xianshi = false;
				if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
					window.location = "YouQuApp://";
				} else if (navigator.userAgent.match(/android/i)) {
					// window.location = "YouQuApp://"
					window.location = "youquapp://h5";
				}
			},
			oppa() {
				this.xianshi = true;
			}

		}
	}
</script>

<style scoped lang="scss">
	.tankuang {
		width: 100%;
		height: 100%;
		background: rgba(15, 16, 17, 0.5);
		position: fixed;
		top: 0;
		z-index: 99999999999999 !important;

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

			.tanFaterFooter {
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

		}
	}


	.activityHeader {
		width: 100% !important;
		height: 108px;
		/*px*/
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 99999999999999999999 !important;
		top:0;
		background: rgba(0, 0, 0, 0.4);

		img {
			width: 93px;
			/*px*/
			height: 93px;
			/*px*/
			margin-left: 25px;
			/*px*/
		}

		.name {
			font-size: 30px;
			/*px*/
			font-weight: 400;
			margin-left: 22px;
			/*px*/
			line-height: 45px;
			color: rgba(255, 255, 255, 1);
		}

		.btn {
			width: 158px;
			/*px*/
			height: 55px;
			/*px*/
			background: rgba(212, 129, 254, 1);
			border-radius: 28px;
			/*px*/
			font-size: 24px;
			/*px*/
			font-weight: bold;
			color: rgba(242, 242, 242, 1);
			line-height: 55px;
			/*px*/
			border: none;
			position: absolute;
			right: 29px;
			/*px*/
			top:28.5px;/*px*/
		}
	}
</style>
