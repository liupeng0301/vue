<template>
	<div id="container" :class="{iosBar : isIos}">
		<router-view class="AllApp" :id="getweixin()" :class="{'blackShow':blackShow}"></router-view>
	</div>
</template>

<script>
	var u = navigator.userAgent;
	// var isAndroid = u.indexOf('Android') > -1;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	import axios from "axios";
	import qs from "qs";
	export default {
		data() {
			return {
				isIos: false,
				blackShow: false,
			}
		},
		created() {

			//判断是否微信打开APP
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
			if (isiOS) {
				this.isIos = true
			}
		},
		mounted() {
			// if (this.$route.params.userid == "type=true" || this.$route.params.id == "type=true" || this.$route.params.userId ==
			// 	"type=true" || this.$route.params.courseType == "type=true" || this.$route.params.goodsId == "type=true") {
			// 	this.blackShow = true;
			// } else {
			// 	this.blackShow = false;
			// }

			for (var key in this.$route.params) {
				if (this.$route.params[key] == "type=true") {
					this.blackShow = true;
				} else {
					this.blackShow = false;
				}
			}



		},
		methods: {
			getweixin() {
				//判断是否微信打开APP
				var ua = navigator.userAgent.toLowerCase();
				var isWeixin = ua.indexOf('micromessenger') != -1;
				if (isWeixin) {
					// if (this.$route.params.userid == "type=true" || this.$route.params.id == "type=true" || this.$route.params.userId ==
					// 	"type=true" || this.$route.params.courseType == "type=true" || this.$route.params.goodsId == "type=true") {
					// 	return "weixinHead";
					// }

					for (var key in this.$route.params) {
						if (this.$route.params[key] == "type=true") {
							return "weixinHead";
						}
					}
				}

			}
		},

	}
</script>

<style lang="scss">
	#weixinHead {
		padding-top: 108px !important;
		/*px*/
		// height: 108px;
	}

	// .weixin{
	// 	padding-top: 0 !important;
	// }


	.iosBar {
		// padding-top: 44px;
		padding-top: 0;

		/*px*/
		@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
			padding-top: 0 !important;
		}

		@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
			padding-top: 0 !important;
		}

		@media screen and (min-device-width: 768px) {
			padding-top: 0 !important;
			/*px*/
		}
	}

	.swipe {
		width: 100%;
		height: 480px;
		/*px*/
		text-align: center;

		@media screen and (min-device-width: 768px) {
			height: 1000px;
			/*px*/
		}

		@media screen and (min-device-width: 1024px) {
			height: 1400px;
			/*px*/
		}
	}

	.mint-swipe-indicator {
		background-color: #CDCDCD !important;
		opacity: 1 !important;
	}

	.mint-swipe-indicator.is-active {
		background-color: #D080FD !important;
		opacity: 1 !important;
	}

	* {
		margin: 0;
		padding: 0;
		-webkit-overflow-scrolling: touch;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}


	.blackShow {
		padding-top: 241px !important;

		/*px*/
		@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
			padding-top: 283px !important;
			/*px*/
		}

		@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
			padding-top: 283px !important;
			/*px*/
		}

		@media screen and (min-device-width: 768px) {
			padding-top: 236px !important;
			/*px*/
		}
	}



	.AllApp {
		background-color: #fff !important;
		font-size: 22px;
		/*px*/
		-webkit-overflow-scrolling: touch;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		// padding-top: 88px;
		padding-top: 90px;

		/*px*/
		@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
			padding-top: 176px;
			/*px*/
		}

		@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
			padding-top: 176px;
			/*px*/
		}

		@media only screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) {
			padding-top: 133px;
			/*px*/
		}

		@media only screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) {
			padding-top: 133px;
			/*px*/
		}


		@media screen and (min-device-width: 768px) {
			padding-top: 132px;
			/*px*/
		}
	}

	.darkContainer {
		background-color: #EFEFEF;
	}

	#app {
		text-align: center;
		color: #2c3e50;
	}

	p,
	span,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	figcaption,
	li,
	label,
	section,
	main,
	button {
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	ul li {
		list-style: none;
	}

	button,
	input {
		outline: 0;
		font-weight: 400;
	}

	a {
		text-decoration: none;
	}

	a,
	button,
	input,
	optgroup,
	select,
	textarea {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
</style>
