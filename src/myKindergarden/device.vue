<template>
	<div class="device" ref="device">
		<div class="top">
			<!-- <ThirdHeader msg-header="提出建议"></ThirdHeader> -->
			  <thirdHeader msgHeader="提出建议" :H5brek="true"></thirdHeader>
			  <!-- <div class="woTu"> -->
				<img src="../assets/img/yjfk2.png" alt="">
			  <!-- </div> -->
		</div>
		<div class="zhanwei"></div>
		<div class="text-wrap">
			<textarea name="" id="" placeholder="请详细描述您的问题，我们将及时跟进解决" v-model="textStr"></textarea>
			<!--  <div class="img-wrap">
                <p v-show="flagTxt" style="color: red;">请输入您的问题</p>
                <p v-show="successTxt" style="color:#C05EFF;">我们将及时跟进解决</p>
                <div class="ups">
                </div>
            </div> -->
		</div>
		<div class="txt">
			<p>
				感谢您对幼趣魔方的支持，我们每一点的进步离不开您的建议与反馈。如若您在使用幼趣魔方app的过程中，觉得哪里不好，或者觉得哪些地方需要优化，欢迎联系我们，并给出您的反馈。
			</p>
			<p class="mt">
				联系电话：15201356961
			</p>
			<p>
				联系邮箱：yqkf@youqukids.com
			</p>
		</div>
		<div class="dibuzhanwei"></div>
		<div class="btn" @click="submitBtn">
			<!-- <p>提交</p> -->
			提交
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import qs from "qs";
	    import thirdHeader from '../components/thirdHeader'
	import { Toast } from 'mint-ui';
	export default {
		name: "device",
		data() {
			return {
				imgUrls: [],
				img: "",
				textStr: "",
				flagTxt: false,
				successTxt: false
			}
		},
		components: {
			thirdHeader
		},
		mounted(){
			// device
			this.$refs.device.style.height = `${window.innerHeight-20}px`;
		},
		methods: {
			fileChange(e) {
				const file = this.$refs.file.files[0];
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					const _base64 = reader.result;
					this.img = _base64;
				}
			},
			// 提交
			submitBtn() {
				// this.$url+'data/json/addSuggestion'
				// http://192.168.1.181:8090/YQApp/yqws/data/json/addSuggestion
				if (this.textStr == "") {
					this.flagTxt = true;
					this.successTxt = false;
				} else {
					this.flagTxt = false;
					this.successTxt = true;
					let postData = qs.stringify({
						remark: this.textStr
					});
					this.$axios({
						method: 'post',
						url: this.$url+'data/json/addSuggestion',
						data: postData,
						async: true
					}).then(data => {
						console.log(data);
						if(data.data.code == "10000"){
							Toast({
								  message: '谢谢您的反馈，我们已经收到您宝贵的意见',
								  position: 'bottom',
								  duration: 1000
								});
						}
						this.successTxt = true;
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.device {
		width: 100%;
		background: #F0F0F0;

		// margin-top: -60px;
		.top {
			width: 100%;
			img {
				width: 100%;
				height: 100%;
			}
		}

		.zhanwei {
			width: 100%;
			height: 43px; /*px*/
			background: white;
		}

		.text-wrap {
			width: 100%;
			height: 370px;/*px*/
			background: white;

			textarea {
				width: 90%;
				margin: 0 5%;
				// padding: 0 5%;
				height: 50%;
				outline: none;
				border: none;
				font-size: 26px;/*px*/
			}

			.img-wrap {
				width: 100%;
				height: 30%;
				display: flex;

				.ups {
					.up-file {
						border: none;
					}

					img {
						width: 1.3rem;
						height: 1.3rem;
					}
				}

				.close-img {
					width: .4rem;
					height: .4rem;
				}
			}
		}

		.txt {
			width: 90%;
			padding: 0 5%;
			margin-top: 20px;/*px*/
			color: #ADADAD;
			font-size: 24px;/*px*/

			.mt {
				margin-top: .3rem;
				color: #ADADAD;
			}
		}
		.dibuzhanwei{
			width: 100%;
			height: 90px;/*px*/
		}
		.btn {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 81px;/*px*/
			font-size: .45rem;
			color: #ffffff;
			background: -webkit-linear-gradient(#EF9DFD, #C05EFF);
			/* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(#EF9DFD, #C05EFF);
			/* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(#EF9DFD, #C05EFF);
			/* Firefox 3.6 - 15 */
			background: linear-gradient(#EF9DFD, #C05EFF);
			/* 标准的语法 */
			text-align: center;
			line-height: 81px;/*px*/
		}
	}
</style>
