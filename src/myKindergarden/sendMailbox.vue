<template>
	<div class="sendMaib">
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
		<!-- <second-Header msgHeader="发送邮箱" :showIcon="false"></second-Header> -->
		<nav>
			<img src="../assets/img/logo.png" alt="">
			<p class="name">幼趣魔方APP</p>
			<p class="fasong">发送邮件</p>
			<input type="text" placeholder="请输入发送邮箱" class="mailbox" v-model="account"><br />
			<button @click="send" :disabled="fasongDisabled">{{sendName}}</button>
		</nav>
	</div>
</template>

<script>
	import SecondHeader from '../components/secondHeader';
	import axios from "axios";
	import qs from 'qs';
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				fasongDisabled:false,//按钮是否禁用
				openDown: false, //浏览器打开提示
				showDown: false, //下载提示
				account: "", //输入的内容
				sendName:"发送"
			}
		},
		components: {
			SecondHeader
		},
		mounted(){
			const inputItems = document.querySelectorAll("input");
			inputItems.forEach(function(ele){
			  ele.addEventListener("blur",function(){
			    window.scrollTo(0,0)
			  })
			})
		},
		methods: {
			openbrower() {
				this.openDown = false;
			},
			shure() {
				this.showDown = false;
			},
			send() {
		
				let postData = this.$qs.stringify({
					// artId: artId
					newsId: this.$route.params.id,
					account: this.account
				});
				var regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
				if(!this.account){
					Toast({
					  message: "请输入邮箱地址",
					  position: 'bottom',
					  duration: 1500
					});
					return;
				}else if(!(regemail.test(this.account))){
					Toast({
					  message: "请输入正确邮箱地址",
					  position: 'bottom',
					  duration: 1500
					});
						return;
				}
				
				this.fasongDisabled = true;
				this.sendName = "发送中";
				
				this.$axios({
						method: 'post',
						url: this.$url + 'data/json/sendMail',
						data: postData,
						async: true
					})
					.then(response => {
						console.log(response);
						if (response.data.code === 10000) {
							this.fasongDisabled = false;
							this.sendName = "发送"; 
							Toast({
							  message: `发送成功`,
							  position: 'bottom',
							  duration: 1500
							});
							this.$router.go(-1);
						} else {
							Toast({
							  message: `${response.data.message}`,
							  position: 'bottom',
							  duration: 1500
							});
						}
					});
			}
		}
	}
</script>

<style lang="scss" scoped>
	button[disabled]{
	    border: 1px solid #DDD;
	    color:#ACA899;
		opacity: 0.5;
	}
	.sendMaib {
		width: 100%;

		nav {
			margin-top: 100px;
			/*px*/
			text-align: center;

			img {
				width: 120px;
				/*px*/
				height: 120px;
				/*px*/
				border-radius: 50%;
				overflow: hidden;
			}

			.name {
				font-weight: bold;
				font-size: 32px;
				/*px*/
				margin-top: 20px;
				/*px*/
			}

			.fasong {
				font-size: 25px;
				/*px*/
				color: #C2C1C5;
			}

			.mailbox {
				margin-top: 120px;
				/*px*/
				font-size: 30px;
				/*px*/
				width: 70%;
				background: #FAFAFA;
				border: none;
				border-radius: 25px;
				/*px*/
				text-align: center;
				// height: 90px;
				// /*px*/
				// line-height: 90px;
				// /*px*/
				padding: 28px 0;
				/*px*/
			}

			button {
				font-size: 35px;
				/*px*/
				margin-top: 50px;
				/*px*/
				width: 70%;
				border: none;
				outline: 0;
				-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				background: #41A7FC;
				color: white;
				border-radius: 25px;
				/*px*/
				height: 90px;
				/*px*/
				line-height: 90px;
				/*px*/
			}


		}
	}
</style>
