<template>
	<div class="container">
		<ThirdHeader msg-header="关于我们"></ThirdHeader>
		<!--<ThirdHeader msgHeader="关于我们"></ThirdHeader>-->
		<figure>
			<img src="../img/logo.png" alt="Logo">
			<figcaption>幼趣魔方 V{{APPVerison}}</figcaption>
		</figure>
		<p>幼趣魔方app创立于2019年，是北京培华育仁教育科技发展有限公司旗下产品，专注于提供专业幼儿园采买与服务的一站式聚合平台。</p>
		<main>
			<a href="javascript:void(0);"><span>Email</span><span>yqkf@youqukids.com<span></span></span></a>
			<a href="javascript:void(0);" @click="tellPhone" v-if="Android"><span>客服电话</span><span>15201356961<span><i class="iconfont icon-jiantouyou"></i></span></span></a>
			<a href="tel:15201356961" @click="tellPhone" v-if="iOS"><span>客服电话</span><span>15201356961<span><i class="iconfont icon-jiantouyou"></i></span></span></a>
			<!--  <a href="http://www.peihuayuren.com:8080/dist/yqxy.html"><span>服务协议</span><div><i class="iconfont icon-jiantouyou"></i></div></a> -->
			<router-link to="/protocol"><span>服务协议</span>
				<div><i class="iconfont icon-jiantouyou"></i></div>
			</router-link>
			<div>北京市培华育仁科技发展有限公司&nbsp;&nbsp;版权所有</div>
		</main>
	</div>
</template>

<script>
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

	import ThirdHeader from "../../components/thirdHeader";
	export default {
		name: "aboutus",
		data() {
			return {
				Android: isAndroid,
				iOS: isiOS,
				APPVerison:this.$route.query.APPVerison || " -"
			}
		},
		mounted(){
			
		},
		components: {
			ThirdHeader
		},
		methods: {
			tellPhone() {
				if (isAndroid) {
					androidApp.callPhone("15201356961");
				}

			}
		},
	}
</script>

<style scoped lang="scss">
	figure {
		padding-top: 25%;
		text-align: center;
		background-color: #fff;
	}

	img {
		width: 136px;
		/*px*/
		height: 136px;
		/*px*/
	}

	figcaption {
		font-size: 36px;
		/*px*/
	}

	p {
		width: 85%;
		line-height: 44px;
		/*px*/
		margin: 0 auto;
		font-size: 28px;
		/*px*/
		color: #a1a1a1;
		text-indent: 2em;
		margin-top: 10%;
	}

	main {
		border-top: 8px solid #F0F0F0;
		/*px*/
		width: 100%;
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: column;

		a {
			width: calc(100% - 64px);
			/*px*/
			padding: 0 32px;
			/*px*/
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 30px;
			/*px*/
			line-height: 100px;
			/*px*/
			color: #333;
		}

		a:active {
			color: #333;
		}

		a:visited {
			color: #333;
		}

		>div {
			background-color: #F5F5F5;
			color: #A0A0A0;
			font-size: 24px;
			/*px*/
			text-align: center;
			line-height: 72px;
			/*px*/
		}

	}
</style>
