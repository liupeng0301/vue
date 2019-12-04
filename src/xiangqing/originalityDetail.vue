<template>
	<div class="darkContainer">
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
		<second-Header msgHeader="创设详情" :showIcon="true" :dynamic="item.name"></second-Header>
		<!-- 放大图片 -->
		<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc" :index="index"></big-img>
		<!-- <mt-swipe :auto="4000" class="swipe">
			<mt-swipe-item v-for="(img,index) in item.creationImgUrl" :key="img" style="background-color: #fff">
				<div class="zoomImage2" :style="getImge(img)" @click="clickImg(index)"></div>
			</mt-swipe-item>
		</mt-swipe> -->
		<div class="swiper-container huadong">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-if="item.videoUrl">
					<div class="preview">
						<img :src="item.creationImgUrl[0]" alt="">
						<img src="../assets/img/vr.png" alt="" style="width: 70px;" @click="PlayVideo(item)">
					</div>
					<!-- <video v-show="shipingbofang" class="video" id="videoSource_two" controls webkit-playsinline="true" playsinline="true"
					 oncontextmenu="return false;" preload="auto">
						<source :src="item.videoUrl" type="video/mp4">
						</source>
					</video> -->
				</div>
				<div class="swiper-slide zoomImage2" 
				v-for="(img,index) in item.creationImgUrl" :key="img" 
				style="background-color: #fff" :style="getImge(img)"
				>
				 </div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
		<section class="item">
			<div class="head" @click="goTeam" style="display: none;">
				<img :src="item.creationTeamPortrait" alt="">
				<span>{{item.creationTeamName}}</span>
			</div>
			<div class="team">
				<dl class="teamDesc" style="display: none;">
					<dd>团队介绍</dd>
					<dt :style="this.showall==false?'-webkit-line-clamp: 2;line-clamp: 2;':''">{{item.teamDesc}}</dt>
				</dl>
				<div class="rt" :style="showall==false?'transform: rotate(-90deg)!important;':'transform: rotate(90deg)!important;'"
				 style="display: none;"><i class="iconfont icon-iconback" @click="showAll"></i></div>
				<div class="detail" style="margin-top: 8%;width:85%">
					<p>{{item.name}}</p>
					<div>
						<dl>
							<dd>城区</dd>
							<dt>{{item.city}}</dt>
						</dl>
						<dl>
							<dd>主题风格</dd>
							<dt>{{item.style}}</dt>
						</dl>
					</div>
					<div>

						<dl>
							<dd>面积</dd>
							<dt>{{item.area}}</dt>
						</dl>
						<dl>
							<dd>设计区域</dd>
							<dt>{{item.field}}</dt>
						</dl>
					</div>
				</div>
			</div>
		</section>
		<section class="images">
			<ul>
				<li v-if="item.designConcept">
					<p class="title">设计理念概述</p>
					<p class="design">{{item.designConcept}}</p>
				</li>
				<li v-if="item.originalAppearance">
					<p class="title">幼儿园原始样貌</p>
					<img :src="item.originalAppearance" alt="" @click="zhoubianImgBig(item.originalAppearance)">
				</li>
				<li v-if="item.designPic">
					<p class="title">平面设计图</p>
					<img :src="item.designPic" alt="" @click="zhoubianImgBig(item.designPic)">
				</li>
				<li v-if="item.picture">
					<p class="title">效果图展示</p>
					<div class="tdcont" v-html="item.picture"></div>
				</li>
				<li v-if="item.buildingImg">
					<p class="title">施工图展示</p>
					<img :src="item.buildingImg" alt="" @click="zhoubianImgBig(item.buildingImg)">
				</li>
				<li v-if="item.completedImgList.length">
					<p class="title">实景图展示</p>
					<!-- <img :src="item.completedImg" alt="" @click="zhoubianImgBig(item.completedImg)"> -->
					<img v-for="(i,key) in item.completedImgList" :src="i" alt="" style="margin: 10px 0;" @click="clickImg(key,item.completedImgList)"> 
				</li>
			</ul>
		</section>
		<footer v-if="isWeixin" @click="wxShow">
			<button>
				<img src="../assets/icons/collect.png" alt="" class="detailFootIcon">
				<p>收藏</p>
			</button>
			<button>
				<img src="../assets/icons/service.png" alt="" class="detailFootIcon">
				<p>咨询</p>
			</button>
		</footer>
		<footer v-else-if="isBrower" @click="openAPP">
			<button>
				<img src="../assets/icons/collect.png" alt="" class="detailFootIcon">
				<p>收藏</p>
			</button>
			<button>
				<img src="../assets/icons/service.png" alt="" class="detailFootIcon">
				<p>咨询</p>
			</button>
		</footer>
		<footer v-else>
			<button @click="favor" v-if="item.isCollected === '0'">
				<img src="../assets/icons/isCollect.png" alt="" class="detailFootIcon">
				<p>已收藏</p>
			</button>
			<button @click="favor" v-else>
				<img src="../assets/icons/collect.png" alt="" class="detailFootIcon">
				<p>收藏</p>
			</button>
			<button @click="service">
				<img src="../assets/icons/service.png" alt="" class="detailFootIcon">
				<p>咨询</p>
			</button>
		</footer>

	</div>
</template>
<script>
	import SecondHeader from '../components/secondHeader'
	import Swiper from 'swiper';
	var u = navigator.userAgent;
	let mobile = !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/);
	var isAndroid = u.indexOf('Android') > -1;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	import BigImg from '../components/BigImg'

	export default {
		name: "originalityDetail",
		data() {
			return {
				item: [],
				cimg: [],
				active: false,
				userId: "",
				id: "",
				picture: [], //效果图展示
				showImg: false,
				imgSrc: [],
				index: "",
				showall: false,
				showDown: false, //下载提示
				isWeixin: true, //微信环境判断
				openDown: false, //浏览器打开提示
				isBrower: false, //浏览器环境判断
			}
		},
		components: {
			BigImg,
			SecondHeader
		},
		created() {
			this.id = this.$route.params.id;
			this.userId = this.$route.params.userid;
			let postData = this.$qs.stringify({
				id: this.id,
				userId: this.userId
				// id: "4028808367a1f28f01699f0692f11734",
				// userId: "40288135684b8cb301684b9651470004"
			});
				// url: this.$url+'goods/json/getJdalCreationDetail',
				// url: 'http://192.168.1.182:8090/YQApp/yqws/goods/json/getJdalCreationDetail',
			this.$axios({
					method: 'post',
					url: this.$url+'goods/json/getJdalCreationDetail',
					data: postData,
					async: true
				})
				.then(data => {
					this.item = data.data.resultObject;
					// if(data.data.resultObject.){
					// 	
					// }
				});
			//判断是否微信打开APP
			let ua = navigator.userAgent.toLowerCase();
			this.isWeixin = ua.indexOf('micromessenger') != -1;

			if (this.userId === 'type=true') {
				this.isBrower = true;
			}
			var browser = {
				versions: function() {
					var u = navigator.userAgent,
						app = navigator.appVersion;
					return { //移动终端浏览器版本信息 
						webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
					};
				}(),
				//language:(navigator.browserLanguage || navigator.language).toLowerCase()
			}
			if (browser == true) {
				this.isBrower = true;
			}
		},
		watch: {
			item: function() {
				this.cimg = this.item.picUrlList
			}
		},
		filters: {
			myCurrency: function(myInput, arg1) {
				//根据业务需要，对传来的数据进行处理
				// 并返回处理后的结果
				var result = myInput + arg1;
				return result;
			}
		},

		methods: {
			PlayVideo(item) {
				console.log(item);
				// window.location = item.videoUrl;
				this.$router.push({
					path:"/vr",
					query:{"vrurl":item.videoUrl,status:"1"}
					
				})
			},
			swi() {
				const _this = this;
				// var myswiper=new Swiper('.swiper-container',{})
				var mySwiper = new Swiper('.huadong', {
					// loop : true,
					 observer:true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents:true,//修改swiper的父元素时，自动初始化swiper
					autoplayDisableOnInteraction:true, //用户滑动后是否自动播放
					// autoplay:true,//等同于以下设置
					pagination: {
						el: '.swiper-pagination',
					  },
					on:{
						click: function(){
						  // _this.clickImg(this.realIndex,_this.item.creationImgUrl);
						  if (_this.item.videoUrl) { //如果有视屏
						  	if (this.realIndex != 0) {
						  		_this.clickImg(this.realIndex - 1,_this.item.creationImgUrl);
						  	}
						  } else { //如果没有视屏
						  	_this.clickImg(this.realIndex,_this.item.creationImgUrl);
						  }
						},
				  }
				})
			},
			getImge(data){
				return `background-image:url(${data})`;
			},
			//图片
			clickImg(index,imgarr) {
				this.showImg = true;
				// 获取当前图片地址
				// this.imgSrc = this.item.creationImgUrl;
				this.imgSrc = imgarr;
				this.index = index;
			},
			zhoubianImgBig(img){
				this.showImg = true;
				this.imgSrc = [img];
				this.index = 0;
			},
			clickDet(index) {
				this.showImg = true;
				// 获取当前图片地址
				this.imgSrc = this.picture;
				this.index = index;
			},
			viewImg() {
				this.showImg = false;
			},
			service() {
				let imgurl = this.item.creationImgUrl[0];
				//name
				let name = this.item.name;
				//文字
				let Text = this.item.style;
				//id值
				let id = this.id;
				let Urlid = "http://www.peihuayuren.com:8080/dist/index.html#/originalityDetail/" + id + "/userId";
				if (isAndroid) {
					androidApp.skipService(imgurl, name, Text, "  ", Urlid);
				}
				if (isiOS) {
					let obj = {
						imgurl: imgurl,
						name: name,
						Text: Text,
						percentage: "  ",
						Urlid: Urlid
					};
					let MYdata = JSON.stringify(obj);
					window.webkit.messageHandlers.GoToAppKeFuPage.postMessage(MYdata);
				}
			},
			showAll() {
				if (this.showall == true) {
					this.showall = false
				} else {
					this.showall = true;
				}
			},
			/*
			收藏功能
			*/
			favor() {
				if (this.item.isCollected === '0') {
					this.userId = this.$route.params.userid;
					let postData = this.$qs.stringify({
						ids: this.id,
						userId: this.userId,
						// ids: "4028808367a1f28f01699f0692f11734",
						// userId: "40288135684b8cb301684b9651470004",
						flag: false,
						type: "hjcs"
					});
					this.$axios({
							method: 'post',
							url: this.$url+'orders/json/deleteMyCollection',
							data: postData,
							async: true
						})
						.then(data => this.item.isCollected = '1');
				} else {
					let postData = this.$qs.stringify({
						goodsId: this.id,
						userId: this.userId,
						// goodsId: "4028808367a1f28f01699f0692f11734",
						// userId: "40288135684b8cb301684b9651470004",
						goodsType: "hjcs",
						isCollected: "Y"
					});
					this.$axios({
							method: 'post',
							url: this.$url+'orders/json/saveMyCollection',
							data: postData,
							async: true
						})
						.then(data => this.item.isCollected = '0');
				}
			},

			handleBack() {
				history.go(-1);
			},
			goTeam() {
				window.location = "http://www.peihuayuren.com:8080/dist/index.html#/teamDesc/" + this.item.creationTeamId;
			},
			wxShow() {
				this.openDown = true;
			},
			shure() {
				this.showDown = false;
			},
			openAPP() {
				if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
					window.location = "YouQuApp://";
				} else if (navigator.userAgent.match(/android/i)) {
					window.location.href = "YouQuApp://h5";
				}

			},

			openbrower() {
				this.openDown = false;
			}

		},
		mounted() {
			setTimeout(()=>{
				this.swi();
			},600)
		},
	}
</script>
<style scoped lang="scss">
	// 1366
	@media (min-height: 1365px) {
		.preview {
			img:nth-child(2) {
				width: 90px!important;
				position: absolute;
				top: 50%;
				left: 50%;
				-webkit-transform: translate(-50%, 250%) !important;
				transform: translate(-50%, 250%) !important;
			}
		}
	}
	
	@media only screen and (min-height: 928px) and (max-height: 1365px) {
	
		// @media (min-height: 928px){
		.preview {
			img:nth-child(2) {
				width: 90px!important;
				position: absolute;
				top: 50%;
				left: 50%;
				-webkit-transform: translate(-50%, 160%) !important;
				transform: translate(-50%, 160%) !important;
			}
		}
	}
	.swipe{
		height: 600px;/*px*/
		// height: 600px;/*px*/
		// display: flex;
	}
	// 	.swiper-container {
	// 	width: 100%;
	// 	height: 0;
	// 	padding-bottom: 70%;
	// 	overflow: hidden;
	// 	position: relative;
	// 
	// 	.swiper-wrapper {
	// 		width: 100%;
	// 		height: 0;
	// 		padding-bottom: 100%;
	// 		
	// 	}
	// 	.zoomImage2 {
	// 		width: 100%;
	// 		height: 0;
	// 		overflow: hidden;
	// 		padding-top: 70%;
	// 		background-position: center center;
	// 		background-repeat: no-repeat;
	// 		background-size: cover;
	// 		-webkit-background-size: cover;
	// 		-moz-background-size: cover;
	// 	}
	// }
	.swiper-container {
		width: 100%;
		height: 0;
		padding-bottom: 70%;
		overflow: hidden;
		position: relative;
	
		.swiper-wrapper {
			width: 100%;
			height: 0;
			padding-bottom: 100%;
				.swiper-slide {
			
				.preview {
					position: relative;
			
					img:nth-child(1) {
						width: 100%;
						float: right;
					}
			
					img:nth-child(2) {
						position: absolute;
						top: 50%;
						left: 50%;
						-webkit-transform: translate(-50%, 190%);
						transform: translate(-50%, 190%);
					}
				}
			
			}
			
		}
		.zoomImage2 {
			width: 100%;
			height: 0;
			overflow: hidden;
			padding-top: 70%;
			background-position: center center;
			background-size: 100% 100%;
			// background-repeat: no-repeat;
			// background-size: cover;
			// -webkit-background-size: cover;
			// -moz-background-size: cover;
		}
	}
	.zoomImage2 {
		width: 100%;
		height: 0;
		padding-top: 100%;
		overflow: hidden;
		padding-top: 72%;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		// background-size: cover;
		// -webkit-background-size: cover;
		// -moz-background-size: cover;
		
	}
	.mint-swipe-item{
		width: 100%;
	}
	.down0 {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10000;

		img {
			display: block;
			height: 100%;
			width: 100%;
		}
	}

	.darkContainer {
		background: #ffffff;
	}

	.icon-sortlight:before,
	.icon-share-alt:before,
	.icon-iconback:before {
		font-size: 44px;
		/*px*/
		font-weight: bold;
	}

	.tit {
		line-height: 60px;
		/*px*/
		padding-left: 32px;
		/*px*/
		font-size: 30px;
		/*px*/
	}

	.tit2 {
		background-color: #fff;
		line-height: 45px;
		padding-left: 16px;
		font-size: 18px;
	}

	.item {
		.head {
			height: 160px;
			/*px*/
			padding: 0 32px;

			/*px*/
			img {
				display: inline-block;
				height: 80px;
				/*px*/
				width: 80px;
				/*px*/
				border-radius: 40px;
				float: left;
				margin-right: 25px;
				/*px*/
				margin-top: 40px;
				/*px*/
			}

			span {
				display: inline-block;
				padding: 68px 0;
				/*px*/
				font-size: 28px;
				/*px*/
				color: #666;
			}
		}

		.team {
			.rt>.icon-iconback::before {
				color: #cccccc;
			}

			.teamDesc {
				position: relative;
				padding: 0 80px;

				/*px*/
				dd {
					font-size: 30px;
					/*px*/
				}

				dt {
					color: #999999;
					font-size: 28px;
					/*px*/
					width: 100%;
					line-height: 40px;
					/*px*/
					padding-top: 23px;
					/*px*/
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}
			}

			.teamDesc::before {
				display: block;
				height: 180px;
				/*px*/
				width: 8px;
				/*px*/
				background: #ffda46;
				content: '';
				position: absolute;
				left: 20px;
				border-radius: 50px;
			}

			.detail {
				// width: 676px;
				width: 626px;
				/*px*/
				padding: 30px 32px;
				/*px*/
				border: 1px solid #e3e3e3;
				border-radius: 5px;
				margin: 0 auto;
				padding-bottom: 50px;

				/*px*/
				p {
					font-size: 29px;/*px*/
					text-align: center;
					display: block;
					width: 90%;
					margin: auto;
					background: #ffffff;
					position: relative;
					top: -50px;
					/*px*/
				}

				p:first-of-type {
					font-weight: bold;
				}

				div {
					display: inline;
					max-width: 50%;
				}

				dl {
					width: 50%;
					display: inline-block;
					font-size: 28px;/*px*/
					
					margin-top: 24px;

					/*px*/
					dd {
						color: #999999;
						display: inline-block;
						text-align: right;
						margin-right: 24px;
						/*px*/
					}

					dt {
						display: inline-block;
					}
				}
			}
		}
	}

	.images {
		margin-top: 10px;
		padding-bottom: 100px;

		/*px*/
		.title {
			height: 120px;
			/*px*/
			line-height: 120px;
			/*px*/
			padding: 0 64px;
			/*px*/
			position: relative;
			font-size: 30px;
			/*px*/
		}

		.design {
			// font-size: 28px;
			font-size: 28px;/*px*/
			
			line-height: 56px;
			/*px*/
			text-align: justify;
			margin-top: -15px;/*px*/
			padding: 8px 50px;
			/*px*/
		}

		p:first-of-type::before {
			display: block;
			height: 50px;
			/*px*/
			width: 6px;
			/*px*/
			background: #ffda46;
			content: '';
			position: absolute;
			left: 40px;
			/*px*/
			top: 34px;
			/*px*/
		}

		img {
			width: 100%;
			display: block;
		}
	}

	.weak {
		color: #A1A1A1;
	}

	.detail-discribe {
		background-color: #fff;
		padding: 0 32px;
		/*px*/
		padding-bottom: 100px;
		/*px*/
	}

	footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100px;
		/*px*/
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		display: flex;

		button {
			flex: 1;
			height: 100%;
			line-height: 100px;
			/*px*/
			border: 0;
			color: #585858;
			background-color: #fff;
			border-top: 1px solid #f0f0f0;
			display: -webkit-box;
			display: -moz-box;
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flexbox;
			display: flex;

			p {
				display: inline-block;
				font-size: 28px;
				/*px*/
			}

			img {
				margin-left: calc(50% - 80px);
				/*px*/
			}
		}

		button:first-of-type {
			border-right: 1px solid #F0F0F0;
		}

		.detailFootIcon {
			display: inline-block;
			height: 42px;
			/*px*/
			width: 42px;
			/*px*/
			margin-right: 8px;
			margin-top: 12px;
		}
	}

	.rt {
		height: 25px;
		width: 100%;
		text-align: center;
		padding: 10px 0;

	}

	.icon-iconback:before {
		font-weight: bold;
		font-size: 30px;
		color: #999999;
	}

	.darkContainer {
		position: relative;
	}

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
</style>
<style lang="scss">
	.mint-toast {
		z-index: 2500 !important;
	}

	.detail-discribe {
		p {
			margin-top: 10px;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.icon-biaodankongjiandanxuan {
		font-size: 50px !important;
	}

	.tdcont {
		word-wrap: break-word;
		// padding: 0 23px;
		width: 90%;
		margin: auto;

		.MsoNormal {
			// padding: 0px 26px 0px 40px;

			/*px*/
			span {
				// font-size: 28px !important;
				/*px*/
				// font-family: PingFangSC-Light !important;
				// font-weight: 300 !important;
				// color: rgba(34, 34, 34, 1) !important;
				// line-height: 52px !important;
				/*px*/
			}
		}

		img {
			display: block;
			width: 100%;
			height: auto;
			margin-top: 31px;
			/*px*/
		}
	}
</style>
