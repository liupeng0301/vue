<template>
	<div class="advis">
		<!-- <div class="advis" :class="{'advis_weixin':blackShow}"> -->
		<div v-if="heads">
			<second-Header msgHeader="资讯详情" :showIcon="true"></second-Header>
		</div>
		<div v-else>
			<div :class="{'zhanweide_':blackShow}" :id="weixinID()"></div>
			<activityHeader v-if="blackShow"></activityHeader>
		</div>
		<div class="advis_home" :class="{'heades_':heads}">
			<p class="title">{{myObj.title}}</p>
			<ul class="ul_tit_timea">
				<li>{{myObj.createTime}}</li>
				<li><img src="../assets/img/yanjing.png" alt="">{{myObj.viewCnt}}</li>
			</ul>

			<nav v-if="myObj.downloadUrl">
				<button @click="sendMailbox">
					<img src="../assets/img/youxiang.png" alt="" />
					发送邮箱</button>
			</nav>

			<div class="div_zhongjuanbuwei" v-html="myObj.content" @click.stop="wenben($event)">
				{{myObj.content}}
			</div>

			<div class="weibude_advios"><img src="../assets/img/footerdibu.png" alt=""></div>
		</div>
	</div>
</template>

<script>
	import activityHeader from "../components/activityHeader";
	import wxapi from "../components/wxapi.js";
	import SecondHeader from '../components/secondHeader';
	import {
		Toast
	} from 'mint-ui';
	export default {
		name: "advisory",
		data() {
			return {
				userId: "",
				ordersId: "",
				myObj: {},
				blackShow: false,
				heads:this.$route.query.heads
			}
		},
		components: {
			activityHeader,
			SecondHeader
		},
		beforeCreate() {
			if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {
				console.log("安卓");
				// document.body.style.fontSize = 100 * (document.body.clientWidth /1200) + "px";
				console.log(document.body);
			} else if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				console.log("ios")
			}
		},
		created() {
			console.log(this.$route.params.artId);
			let artId = this.$route.params.artId;
			// 61620a8dc0b64e7b9280e6bc910e597b
			let postData = this.$qs.stringify({
				artId: artId
			});
			this.$axios({
					method: 'post',
					url: this.$url + 'data/json/getArticleDetail',
					data: postData,
					async: true
				})
				.then(data => {
					if (data.data.code == "10000") {
						let myData = data.data.resultList[0];
						console.log(myData);
						this.myObj = myData;
						// this.setA(this.myObj);
						// this.item=data.data.resultObject;
					}
				});
		},
		watch: {
			myObj: {
				handler(newName, oldName) {
					this.getTitle(newName.title);
				},
				immediate: true,
				deep: true
			}
		},
		mounted() {
			this.setblack();
		},
		methods: {
			weixinID() {
				//判断是否微信打开APP
				var ua = navigator.userAgent.toLowerCase();
				var isWeixin = ua.indexOf('micromessenger') != -1;
				if (isWeixin) { //微信打开去处顶部白色边
					return "weixin_id"
				}
			},
			setblack() {
				// showIcon
				const _this = this;
				for (var key in this.$route.params) {
					if (this.$route.params[key] == "type=true") {
						_this.blackShow = true;
					} else {
						_this.blackShow = false;
					}
				}
			},
			// setA(getName) {
			// 	this.$nextTick(() => {
			// 		console.log(document.getElementsByTagName("a"));
			// 		console.log(document.getElementsByTagName("a").length);
			// 		let A_ = document.getElementsByTagName("a");
			// 		let url = A_[0].getAttribute("href");
			// 		for (var i = 0; i < A_.length; i++) {
			// 			// console.log(A_[i]);
			// 			
			// 			A_[i].setAttribute("href","javascript:;");
			// 			A_[i].setAttribute("target","");
			// 		}
			// 		console.log(url);
			// 	})
			// },
			getTitle(title) {
				const log = console.log;
				if (title == undefined || title == null) {
					wxapi.getshare(this.$url, "");
				} else {
					wxapi.getshare(this.$url, title);
				}
			},
			wenben(ev) {
				console.log(ev);
				console.log(ev.target.innerHTML);
			},
			sendMailbox() {
				if (this.$route.params.userid == "type=true") {
					Toast({
						message: '请在App内部发送邮件',
						position: 'bottom',
						duration: 1500
					});
				} else {
					this.$router.push(`/sendMailbox/${this.$route.params.artId}/${this.$route.params.userid}?status=1`)
				}
			}
		}
	}
</script>

<style lang="scss">
	
	.heades_{
		padding-top:130px;/*px*/
		@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
			padding-top: 196px !important;
			/*px*/
		}
			
		@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
			padding-top: 196px !important;/*px*/
		}
			
		@media screen and (min-device-width: 768px) {
			padding-top: 70px !important;/*px*/
		}
		@media only screen and (min-width: 600px) {
				padding-top:230px !important;/*px*/
		}
		@media only screen and (min-width: 600px) {
				padding-top:210px !important;/*px*/
		}
	}
	#weixin_id {
		// margin-top: 80px;/*px*/
		height: 80px;
	
		/*px*/
		@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
			// margin-top: -96px !important;
			/*px*/
			// margin-top: 120px !important;/*px*/
			height: 100px !important;
			/*px*/
		}
	
		@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
			// margin-top: -96px !important;
			/*px*/
			// margin-top: 120px !important;/*px*/	
			height: 100px !important;
		}
	
		@media screen and (min-device-width: 768px) {
			// margin-top: 48px !important;
			/*px*/
			height: 50px !important;
		}
	}
	.zhanweide_ {
		// margin-top: 80px;/*px*/
		height: 20px;

		/*px*/
		@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
			// margin-top: -96px !important;
			/*px*/
			// margin-top: 120px !important;/*px*/
			height: 20px !important;
			/*px*/
		}

		@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
			// margin-top: -96px !important;
			/*px*/
			// margin-top: 120px !important;/*px*/	
			height: 20px !important;
		}

		@media screen and (min-device-width: 768px) {
			// margin-top: 48px !important;
			/*px*/
			height: 20px !important;
		}
	}

	// .advis_weixin{
	// 	margin-top: 80px;/*px*/
	// 		@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
	// 			// margin-top: -96px !important;
	// 			/*px*/
	// 			margin-top: 120px !important;/*px*/
	// 		}

	// 		@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
	// 			// margin-top: -96px !important;
	// 			/*px*/
	// 			margin-top: 120px !important;/*px*/
	// 		}

	// 		@media screen and (min-device-width: 768px) {
	// 			margin-top: 48px !important;
	// 			/*px*/
	// 		}

	// }



	.advis {
		@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
			// margin-top: -96px !important;
			/*px*/
			margin-top: -80px !important;
			/*px*/
		}

		@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
			// margin-top: -96px !important;
			/*px*/
			margin-top: -80px !important;
			/*px*/
		}

		@media screen and (min-device-width: 768px) {
			margin-top: -40px !important;
			/*px*/
		}
	}

	.advis {
		width: 100%;
		// margin: 0 5%;

		// margin-top: -2px;
		overflow: hidden;

		.advis_home {
			width: 90%;
			margin: auto;

			img {
				width: 100%;
				height: auto;
			}

			.title {
				margin-top: -0.9rem;
				// font-size: .45rem;
				font-size: 46px;
				/*px*/
				text-align: center;
				font-weight: bold;
			}

			nav {
				text-align: left;
				margin-top: 20px;
				/*px*/
				clear: both;

				button {
					font-size: 26px;
					/*px*/
					padding: 10px 20px;
					/*px*/
					color: white;
					border: none;
					border-radius: 28px;
					outline: 0;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
					background: rgba(212, 129, 254, 1);

					img {
						width: 25px;
						/*px*/
						height: 25px;
						/*px*/
						// margin: 0 10px;/*px*/
						margin-right: 10px;
						/*px*/
					}
				}
			}

			.ul_tit_timea {
				margin-top: 27px;
				/*px*/
				font-size: 26px;
				/*px*/
				clear: both;
				height: .2rem;
				color: #999999;
				width: 100%;
				// display: flex;
				// justify-content: space-between;

				li {
					img {
						width: .4rem;
						margin-right: .12rem;
					}
				}

				li:nth-child(1) {
					float: left;
				}

				li:nth-child(2) {
					float: right;
					margin-left: 10%;
				}

			}

			.div_zhongjuanbuwei {
				margin-top: .4rem;
				text-align: justify;

				.img-container {
					width: 100%;
					height: 100%;

					img {
						width: 100%;
						height: 100%;
					}
				}
			}


			.weibude_advios {
				width: 100%;
				margin-top: .2rem;

				img {
					width: 100%;
				}
			}
		}
	}
</style>
