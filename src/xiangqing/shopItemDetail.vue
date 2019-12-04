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
		<second-Header msgHeader="商品详情" :showIcon="true" :dynamic="item.name"></second-Header>
		<!-- 放大图片 -->
		<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc" :index="index"></big-img>
		<!-- 图片轮播 -->
		<!-- 	<mt-swipe :auto="3000" class="swipe">
			<mt-swipe-item v-for="(img,index) in cimg" :key="img" style="background-color: #fff">
				<div class="zoomImage2" :style="getImge(img)" @click="clickImg(index)"></div>
			
			</mt-swipe-item>
		</mt-swipe> -->
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-if="item.videoUrl">
					<div class="preview" v-show="playshow">
						<img :src="yulantu" alt="">
						<img src="../assets/img/bofang.png" alt="" @click="PlayVideo">
					</div>
					<video v-show="shipingbofang" class="video" id="videoSource_two" controls webkit-playsinline="true" playsinline="true"
					 oncontextmenu="return false;" preload="auto">
						<source :src="item.videoUrl" type="video/mp4">
						<!-- <source src="../assets/video/video1.mp4" type="video/mp4"> -->
						</source>
					</video>
				</div>
				<div ref="textre" class="swiper-slide zoomImage2" v-for="(img,index) in cimg" :key="img" style="background-color: #fff"
				 :style="getImge(img)">
				</div>

			</div>
			<div class="swiper-pagination"></div>
		</div>

		<section class="item-name">
			<p class="tit">{{item.name}}</p>

			<!-- 玩教具 -->
			<div v-if="item.goodsType == 'wjj'" class="div_top_header">
				<p class="Mamequyu">
					<span v-show="item.tabTagName">活动区域：</span>
					<span>{{item.tabTagName}}</span>
				</p>
				<p class="Mamequyu">
					<span v-show="item.brandName">品牌：</span>
					<span>{{item.brandName}}</span>
				</p>
			</div>

			<!-- 幼儿家具 -->
			<div v-else-if="item.goodsType == 'jj'" class="div_top_header">
				<p class="Mamequyu">
					<span v-show="item.actFieldDetail">区域：</span>
					<span>{{item.actFieldDetail}}</span>
				</p>
				<p class="Mamequyu">
					<span v-show="item.series">品类：</span>
					<span>{{item.series}}</span>
				</p>
			</div>

			<!-- 图书绘本 -->
			<div v-else-if="item.goodsType == 'ts'" class="div_top_header">
				<p class="Mamequyu">
					<span v-show="item.author">作者：</span>
					<span>{{item.author}}</span>
				</p>
				<p class="Mamequyu">
					<span v-show="item.press">出版社：</span>
					<span>{{item.press}}</span>
				</p>
			</div>

			<!-- 耗材 -->
			<div v-else-if="item.goodsType == 'hc'" class="div_top_header">
				<p class="Mamequyu">
					<span v-show="item.tabTagName">单品耗材/耗材包：</span>
					<span>{{item.tabTagName}}</span>
				</p>
				<p class="Mamequyu">
					<span v-show="item.series">品类：</span>
					<span>{{item.series}}</span>
				</p>
			</div>
			<!-- 大型户外玩具 -->
			<div v-else-if="item.goodsType == 'dxhwwj'" class="div_top_header">
				<p class="Mamequyu">
					<span v-show="item.series">功能：</span>
					<span>{{item.series}}</span>
				</p>
				<p class="Mamequyu">
					<span v-show="item.manNum">容纳人数：</span>
					<span>{{item.manNum}}</span>
				</p>
			</div>


			<p class="desc" style="display: none;">园所使用率：<span class="notice-text">{{item.useRate | myCurrency('%')}}</span></p>
		</section>
		<section class="item-detail">
			<p class="tit2">规格参数</p>
			<ul class="item-detail-list">
				<li v-if="item.goodsCode">
					<div>商品编号</div>
					<div>{{item.goodsCode}}</div>
				</li>
				<li v-if="item.packageUnit">
					<div>包装单位</div>
					<div>{{item.packageUnit}}</div>
				</li>
				<li v-if="item.material">
					<div>材质</div>
					<div>{{item.material}}</div>
				</li>
				<li v-if="item.ageDroupDetail">
					<div>适用年龄</div>
					<div>{{item.ageDroupDetail}}</div>
				</li>
				<li v-if="item.goodsType == 'dxhwwj' && item.brandName">
					<div v-show="item.brandName">品牌</div>
					<div v-show="item.brandName">{{item.brandName}}</div>
				</li>
				<li v-if="item.actFieldDetail">
					<div>场地</div>
					<div>{{item.actFieldDetail}}</div>
				</li>
				<li v-if="item.specifications">
					<div>规格</div>
					<div>{{item.specifications}}</div>
				</li>
				<li v-if="item.area">
					<div>适用面积</div>
					<div>{{item.area}}</div>
				</li>
			</ul>
		</section>
		<section class="images">
			<p class="tit2">图文详情</p>
			<div class="detail-discribe">
				<img v-for="(i,index) in item.picTextDetailUrlList" :key="i.index" :src="i" alt="" @click="clickDet(index)">
			</div>
		</section>

		<footer v-if="isWeixin" @click="wxShow">
			<button>
				<img src="../assets/icons/collect.png" alt="" class="detailFootIcon">
				<p>收藏</p>
			</button>
			<button @click="shopping">
				<img src="../assets/icons/gouwuche.png" alt="" class="detailFootIcon">
				<p>购物车</p>
			</button>
			<button @click="service">
				<img src="../assets/icons/service.png" alt="" class="detailFootIcon">
				<p>客服</p>
			</button>
			<button>加入购物车</button>
		</footer>
		<footer v-else-if="isBrower" @click="openAPP">
			<button>
				<img src="../assets/icons/collect.png" alt="" class="detailFootIcon">
				<p>收藏</p>
			</button>
			<button @click="shopping">
				<img src="../assets/icons/gouwuche.png" alt="" class="detailFootIcon">
				<p>购物车</p>
			</button>
			<button @click="service">
				<img src="../assets/icons/service.png" alt="" class="detailFootIcon">
				<p>客服</p>
			</button>

			<button>加入购物车</button>
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
			<button @click="shopping">
				<img src="../assets/icons/gouwuche.png" alt="" class="detailFootIcon">
				<p>购物车</p>
			</button>
			<button @click="service">
				<img src="../assets/icons/service.png" alt="" class="detailFootIcon">
				<p>客服</p>
			</button>
			<button @click="boardOpen()">加入购物车</button>
		</footer>


		<mt-popup class="board" position="bottom" v-model="popupVisible">
			<ul style="z-index: 990;">
				<li><i class="close iconfont icon-guanbi" @click="hideBottom"></i></li>
				<li class="descBox">
					<div class="goodIcon"><img :src="cimg[0]" alt="" style="width: 150px;min-height: 50px;height:auto;"></div>
					<div>
						<p>选择购买数量</p>
						<p class="sanhang">{{item.goodsDesc}}</p>
					</div>
				</li>
				<li class="btnGroup" v-for="(i,indexs) in footerBoard" :key="indexs">
					<p>{{i.typeName}}</p>
					<div class="guige_all">
						<button :class="{isActive:index === active}" v-for="(j,index) in i.listGoodsDictionary" :key="index" @click="btnChange(indexs,index,j.price,j.name)">
							{{j.name}}
						</button>
					</div>
				</li>
				<li class="numBox">
					<span>购买数量</span>
					<button v-on:click="subtract()">-</button>
					<!-- 				<input type="number" value="0" @input="handel($event)" size="1" v-model.number="num">	 -->
					<input type="number" value="0" @input="handel($event)" size="1" v-model.number="num" pattern="d*" v-number>
					<button v-on:click="add()">+</button>
				</li>
				<li>
					<button @click="confirm()" class="confirm-btn">确定</button>
				</li>
			</ul>
		</mt-popup>
		<div class="tankuang" v-if="xianshi" @click="xianshi = ! xianshi">
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
	import {
		Toast
	} from 'mint-ui';
	import BigImg from '../components/BigImg'
	// import Carousel from '../../components/carousel'
	import SecondHeader from '../components/secondHeader'
	import Swiper from 'swiper';
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

	export default {
		name: "shopItemDetail",
		data() {
			return {
				xianshi: false, //默认是否显示下载弹框
				yulantu: "", //视屏预览图片
				playshow: true, //默认显示播放图片
				shipingbofang: false, //视屏播放
				video: {
					duration: "" //视屏时长
				},
				item: [],
				carousel: [],
				cimg: [],
				popupVisible: false,
				counter: 1,
				active: 0, //默认第一个
				num: 1,
				sort: "",
				userId: "",
				id: "",
				itemNum: "",
				footerBoard: [],
				firstTag: "", //第一个属性标签（非必传） 
				imgHeight: "",
				showImg: false,
				imgSrc: [],
				index: "",
				showDown: false, //下载提示
				isWeixin: true, //微信环境判断
				tagName: '',
				openDown: false, //浏览器打开提示
				isBrower: false, //浏览器环境判断
			}
		},
		components: {
			// Carousel
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
			this.$axios({
					method: 'post',
					url: this.$url + 'goods/json/getGoodsDetail', //线上测试的
					// url: 'http://192.168.1.188:8090/YQApp/yqws/goods/json/getGoodsDetail',
					data: postData,
					async: true
				})
				.then(data => {
					this.item = data.data.resultObject;
					if (this.item.videoCover) {
						this.yulantu = this.item.videoCover;
					} else {
						this.yulantu = this.item.picUrlList[0];
					}
				});
			//点击bottom
			let postData2 = this.$qs.stringify({
				id: this.id,
				//id: "4028808367a1f28f01694ce3a2ef103a",
			});
			this.$axios({
					method: 'post',
					url: this.$url + 'goods/json/getGoodsDictionaryList',
					data: postData2,
					async: true
				})
				.then(data => this.footerBoard = data.data.resultObject);

			//判断是否微信打开APP
			let ua = navigator.userAgent.toLowerCase();
			this.isWeixin = ua.indexOf('micromessenger') != -1;

			if (this.userId === 'type=true') {
				this.isBrower = true;
			}
		},
		watch: {
			item: function() {
				this.cimg = this.item.picUrlList;
				this.$nextTick(() => {
					if (this.item.videoUrl) { //如果有视屏
						var height = this.$refs.textre[0].offsetHeight; //100
						document.getElementById("videoSource_two").style.height = `${height}px`;
					}

				});
			},
			num(newval) {
				console.log(newval);
			},
		},
		filters: {
			myCurrency: function(myInput, arg1) {
				//根据业务需要，对传来的数据进行处理
				// 并返回处理后的结果
				var result = myInput + arg1;
				return result;
			}
		},
		beforeUpdate() {
			// this.swi();
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
					window.location = "youquapp://h5";
				}
			},
			PlayVideo() {
				this.playshow = false;
				// this.mySwiper = new Swiper('.swiper-container', {
				// 	// loop: true,
				// 	observer: true, //修改swiper自己或子元素时，自动初始化swiper
				// 	observeParents: true, //修改swiper的父元素时，自动初始化swiper
				// 	autoplayDisableOnInteraction: true, //用户滑动后是否自动播放
				// 	autoplay: true, //等同于以下设置
				let videoArr = document.querySelectorAll(".video");
				this.shipingbofang = true;
				console.log(document.getElementById('videoSource_two').paused); //判断当前视屏是否播
				if (document.getElementById('videoSource_two').paused) {
					document.getElementById("videoSource_two").play();
				}
				// for (let i = 0; i < videoArr.length; i++) {
				// 	let video = videoArr[i];
				// 	video.addEventListener('loadeddata', function() {				
				// 		document.getElementById("videoSource_two").play();
				// 	}, false)
				// }
			},
			shopping() {
				//加入购物车
				if (isAndroid) {
					androidApp.skipShopCart();
				}
				if (isiOS) {
					// window.webkit.messageHandlers.GoToAppGouWuChePage("");
					window.webkit.messageHandlers.GoToAppGouWuChePage.postMessage("");
				}
			},
			captureVideoImage() {
				let videoArr = document.querySelectorAll(".video");
				for (let i = 0; i < videoArr.length; i++) {
					//loadeddata当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时，会发生 loadeddata 事件。
					//浏览器支持:所有主流浏览器都支持 loadeddata 事件。注释：Internet Explorer 8 或更早的浏览器不支持该事件。
					let video = videoArr[i]
					video.addEventListener('loadeddata', function() {
						let canvas = document.createElement('canvas');
						canvas.width = video.videoWidth;
						canvas.height = video.videoHeight;
						video.setAttribute('crossorigin', 'anonymous') //跨域设置，后端也需要设置CORS为*
						canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
						let dataUrl = canvas.toDataURL('image/png');
						let pareantNode = video.parentNode;
						let imgNode = document.createElement('img');
						imgNode.src = dataUrl;
						if (video.videoWidth > video.videoHeight) {
							imgNode.style.height = '100%'
						} else {
							imgNode.style.width = '100%'
						}
						pareantNode.appendChild(imgNode)
						video.pause()
					}, false)
				}
			},
			zhoubianImgBig(img) {
				this.showImg = true;
				this.imgSrc = [img];
				this.index = 0;
			},
			getImge(data) {
				console.log(data);
				return `background-image:url(${data})`;
			},
			handel(e) {
				console.log(e.target.value);
				let reg = replace(/[^\d]/g, '');
				if (reg.test(e.target.value)) {
					// alert("请输入正确邮箱地址")
				}
				// this.num = e.target.value.replace(/[^\d]/g,"");
				// newValue.replace(/[^\d]/g,'')
				// if(typeof(e.target.value) != "number"){
				// 	this.num = e.target.value.replace(/[^\d]/g, '');
				// }
				// console.log(e.target.value);
			},
			//图片
			clickImg(index) {
				console.log(index);
				this.showImg = true;
				// 获取当前图片地址
				this.imgSrc = this.cimg;
				this.index = index;
			},
			clickDet(index) {
				this.showImg = true;
				// 获取当前图片地址
				this.imgSrc = this.item.picTextDetailUrlList;
				this.index = index;
			},
			viewImg() {
				this.showImg = false;
			},
			service() {
				let imgurl = this.cimg[0];
				//name
				let name = this.item.name;
				//文字
				let Text = "园所使用率：";
				//百分比
				let percentage = this.item.useRate + "%";
				//id值
				let id = this.id;
				let Urlid = "http://www.peihuayuren.com:8080/dist/index.html#/shopItemDetail/" + id + "/userId";
				if (isAndroid) {
					androidApp.skipService(imgurl, name, Text, percentage, Urlid);
				}
				if (isiOS) {
					// window.webkit.messageHandlers.GoToAppKeFuPage.postMessage("");
					let obj = {
						imgurl: imgurl,
						name: name,
						Text: Text,
						percentage: percentage,
						Urlid: Urlid
					};
					let MYdata = JSON.stringify(obj);
					window.webkit.messageHandlers.GoToAppKeFuPage.postMessage(MYdata);
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
						type: "ycm"
					});
					this.$axios({
							method: 'post',
							url: this.$url + 'orders/json/deleteMyCollection',
							data: postData,
							async: true
						})
						.then(data => this.item.isCollected = '1', Toast("取消收藏"));
				} else {
					let postData = this.$qs.stringify({
						goodsId: this.id,
						userId: this.userId,
						// goodsId: "4028808367a1f28f01699f0692f11734",
						// userId: "40288135684b8cb301684b9651470004",
						goodsType: "ycm",
						isCollected: "Y"
					});
					this.$axios({
							method: 'post',
							url: this.$url + 'orders/json/saveMyCollection',
							data: postData,
							async: true
						})
						.then(data => this.item.isCollected = '0', Toast("收藏成功"));
				}
			},
			// 判断是否为整数
			isInteger(obj) {
				return typeof obj === 'number' && obj % 1 === 0
			},
			/* 
			    添加购物车
			 */
			confirm() {

				if (typeof(this.num) != "number") { //为数值
					if (this.isInteger(this.num) == false) { //防止出现  1..1
						Toast("请输入正确的数量");
						return false;
					}
				}
				let len = this.footerBoard;
				if (len.length > 0) {
					if (this.firstTag == "") {
						//如果为单价为空变为默认的第一个
						this.firstTag = len[0].listGoodsDictionary[0].price;
					}
					if (this.tagName == "") {
						//如果名称为空默认第一个
						this.tagName = len[0].listGoodsDictionary[0].name;
					} else if (len.length >= 2 && this.secondTag == "") {
						Toast("请选择商品" + len[1].typeName);
						return false;
					} else if (len.length > 2 && this.thirdTag == "") {
						Toast("请选择商品" + len[2].typeName);
						return false;
					}

				}

				this.popupVisible = false;
				let postData = this.$qs.stringify({
					goodsId: this.id,
					userId: this.userId,
					price: this.firstTag ? this.firstTag : this.item.price,
					number: this.num,
					ctype: 'ycm',
					firstTag: this.tagName ? this.tagName : ''
				});

				this.$axios({
						method: 'post',
						url: this.$url + 'orders/json/addShopCar',
						data: postData,
						async: true
					})
					.then(data => {
						if (data.data.code == "10000") {
							Toast({
								message: '加入购物车成功',
								iconClass: 'iconfont icon-biaodankongjiandanxuan'
							})
						} else {
							Toast(data.data.message)
						}
					});
			},
			add: function() {
				this.num++;
			},
			subtract: function() {
				if (this.num <= 1) {
					Toast({
						message: '不能再减少了',
						position: 'bottom',
						duration: 2000
					});
					this.num = 1;
				} else {
					this.num -= 1;
				}
			},
			hideBottom() {
				this.popupVisible = false;
			},
			boardOpen() {
				console.log(this.footerBoard);
				this.popupVisible = true;
			},
			btnChange(tag, index, id, name) {
				this.active = index; //下标拿到选择的第几个
				this.firstTag = id; //商品单价
				this.tagName = name; //商品名称
			},
			wxShow() {
				this.openDown = true;
			},
			shure() {
				this.showDown = false;
			},
			openAPP() {
				this.xianshi = true;
				console.log(this.xianshi);
				// if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
				// 	window.location = "YouQuApp://";
				// } else if (navigator.userAgent.match(/android/i)) {
				// 	window.location = "YouQuApp://"
				// }

			},

			openbrower() {
				this.openDown = false;
			},
			swi() {
				const _this = this;
				// var myswiper=new Swiper('.swiper-container',{})
				var mySwiper = new Swiper('.swiper-container', {
					// loop: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true, //修改swiper的父元素时，自动初始化swiper
					autoplayDisableOnInteraction: true, //用户滑动后是否自动播放
					autoplay: false, //等同于以下设置
					pagination: {
						el: '.swiper-pagination',
					},

					on: {
						click: function() {
							console.log(this.realIndex);
							if (_this.item.videoUrl) { //如果有视屏
								if (this.realIndex != 0) {
									_this.clickImg(this.realIndex - 1);
								}
							} else { //如果没有视屏
								_this.clickImg(this.realIndex);
							}

						},
						slideChangeTransitionStart: function() {
							console.log(this.realIndex);
							if (_this.item.videoUrl) { //如果没有视屏
								if (this.realIndex != 0) {
									_this.$nextTick(() => {
										document.addEventListener("WeixinJSBridgeReady", function() {
											document.getElementById('videoSource_two').pause();
										}, false);
										document.getElementById('videoSource_two').pause();
									})

								}
							}


						},
					}
				})
			},
			timeFormat(time) {
				let newTime, hour, minite, seconds;
				if (time >= 3600) {
					hour = parseInt(time / 3600) < 10 ? '0' + parseInt(time / 3600) : parseInt(time / 3600);
					minite = parseInt(time % 60 / 60) < 10 ? '0' + parseInt(time % 60 / 60) : parseInt(time % 60 / 60);
					seconds = time % 3600 < 10 ? '0' + time % 3600 : time % 3600;
					newTime = hour + ':' + minite + ':' + seconds;
				} else if (time >= 60 && time < 3600) {
					minite = parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60);
					seconds = time % 60 < 10 ? '0' + time % 60 : time % 60;
					newTime = minite + ':' + seconds;
				} else if (time < 60) {
					seconds = time < 10 ? '0' + time : time;
					newTime = '00:' + seconds;
				}
				return newTime;
			}
		},
		mounted() {
			setTimeout(() => {
				this.swi(); //------------------------------------------
				// this.video.duration = document.getElementById("videoSource_two").duration;
				// console.log(this.timeFormat(this.video.duration));

				if (this.item.videoUrl) { //如果没有视屏
					this.video.duration = document.getElementById("videoSource_two").duration;
				}




			}, 600)
			// alert(window.innerHeight);
			// this.captureVideoImage();
		},
		beforeDestroy() {
			this.$nextTick(() => {

				if (!document.getElementById('videoSource_two').paused) {
					document.getElementById("videoSource_two").pause();
				} else {
					document.getElementById("videoSource_two").pause();
				}
			})
		},
		deactivated() {
			this.$nextTick(() => {
				if (!document.getElementById('videoSource_two').paused) {
					document.getElementById("videoSource_two").pause();
				} else {
					document.getElementById("videoSource_two").pause();
				}
			})
		}
	}
</script>
<style scoped lang="scss">
	// 1366
	@media (min-height: 1365px) {
		.preview {
			img:nth-child(2) {
				position: absolute;
				top: 50%;
				left: 50%;
				-webkit-transform: translate(-50%, 460%) !important;
				transform: translate(-50%, 460%) !important;
			}
		}
	}

	@media only screen and (min-height: 928px) and (max-height: 1365px) {

		// @media (min-height: 928px){
		.preview {
			img:nth-child(2) {
				position: absolute;
				top: 50%;
				left: 50%;
				-webkit-transform: translate(-50%, 360%) !important;
				transform: translate(-50%, 360%) !important;
			}
		}
	}

	.div_top_header {
		width: 90%;
		padding-left: 32px;
		/*px*/
		display: flex;
		justify-content: space-between;
	}





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






	.Mamequyu {
		// width: 82%;
		// margin: auto;
		// text-align: right;
		padding: 10px 0;

		span {
			font-size: 30px;
			/*px*/
		}

		span:nth-child(1) {
			color: #999999;
		}

		span:nth-child(2) {
			color: #E18AFE;
		}
	}

	.swiper-container {
		width: 100%;
		height: 0;
		padding-bottom: 70%;

		.swiper-wrapper {
			width: 100%;
			height: 0;
			padding-bottom: 100%;
		}

		.swiper-slide {

			.preview {
				position: relative;

				img:nth-child(1) {
					width: 100%;
					float: right;
				}

				img:nth-child(2) {
					// position: absolute;
					// float: right;
					// top: 50%;
					// transform: translateY(-50%);
					// width: 20%;
					// top:50%;       
					//    left:50%;        
					//    margin-left:-10%;  
					position: absolute;
					top: 50%;
					left: 50%;
					-webkit-transform: translate(-50%, 160%);
					transform: translate(-50%, 160%);
				}
			}

			#videoSource_two {
				width: 100%;
				object-fit: fill;
				// width: 100%;
				// height: 0;
				// padding-bottom: 70%;

				source {
					// width: 100%;
				}
			}
		}

		.zoomImage2 {
			width: 100%;
			height: 0;
			overflow: hidden;
			padding-top: 70%;
			background-position: center center;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			// background-size: cover;
			// -webkit-background-size: cover;
			// -moz-background-size: cover;
		}
	}

	.swipe {
		height: 600px;
		/*px*/
		// height: 600px;/*px*/
		// display: flex;
	}

	.mint-swipe-item {
		width: 100%;
	}

	.sanhang {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	// 	.zoomImage{
	//     width:100%;
	//     height:0;
	//     padding-bottom: 100%;
	//     overflow:hidden;
	//     background-position: center center;
	//     background-repeat: no-repeat;
	//     -webkit-background-size:cover;
	//     -moz-background-size:cover;
	//     background-size:cover;
	// }
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

	.btnGroup {
		.guige_all {
			width: 100%;
			display: flex;
			flex-wrap: wrap;

			// justify-content: space-between;
			button {
				// width: 30%;
				// width: 225px;
				/*px*/
				display: inline-block;
				padding: 12px;
				/*px*/
				text-align: center;
				border: none;
				background: #f5f5f5;
				border-radius: 8px;
				/*px*/
				// margin-right: 40px;
				// /*px*/
				margin: 1.5%;
				/*px*/
				font-size: 24px;
				/*px*/
				overflow: hidden;
				text-overflow: ellipsis;
				-o-text-overflow: ellipsis;
				-webkit-text-overflow: ellipsis;
				-moz-text-overflow: ellipsis;
				white-space: nowrap;
			}

			.isActive {
				background-color: rgb(246, 227, 255);
				border: 1px solid rgb(214, 124, 254);
				color: rgb(214, 124, 254);
			}
		}


		p {
			display: block;
			font-size: 30px;
			/*px*/
			color: #222222;
			margin-top: 20px;
			margin-bottom: 8px;
		}


	}

	.icon-sortlight:before,
	.icon-share-alt:before,
	.icon-iconback:before {
		font-size: 20px;
		font-weight: bold;
	}

	.item-name,
	.item-detail,
	.tit2 {
		background-color: #fff;
	}

	.tit {
		padding-top: 12px;
		padding-bottom: 10px;
		padding-left: 32px;
		/*px*/
		font-size: 36px;
		/*px*/
	}

	.tit2 {
		background-color: #fff;
		line-height: 120px;
		/*px*/
		padding-left: 32px;
		/*px*/
		font-size: 30px;
		/*px*/
	}

	.item-name {
		.desc {
			font-size: 24px;
			/*px*/
			color: #A1A1A1;
			padding-top: 10px;
			padding-left: 32px;
			/*px*/
			padding-bottom: 30px;
			/*px*/
		}

		.notice-text {
			color: #D081FD;
		}
	}

	.item-detail {
		margin-top: 10px;

		/*px*/
		ul li {
			list-style: none;
			font-size: 28px;
			/*px*/
			width: calc(100% - 64px);
			/*px*/
			padding: 16px 32px;
			/*px*/
			display: flex;

			>div {
				width: 180px;
				/*px*/
			}

			div:last-of-type {
				width: calc(100% - 100px);
				width: -moz-calc(100% - 100px);
				width: -webkit-calc(100% - 100px);
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.images {
		margin-top: 10px;
		/*px*/
		padding-bottom: 100px;
		/*px*/
	}

	.weak {
		color: #A1A1A1;
	}

	.detail-discribe {
		background-color: #fff;

		img {
			width: 100%;
			display: block;
		}
	}

	.mint-popup {
		border-top-left-radius: 30px;
		/*px*/
		border-top-right-radius: 30px;
		/*px*/
	}

	.board>ul {
		width: 100vw;
		background-color: #fff;
		padding-top: 40px;
		/*px*/
		border-top-left-radius: 30px;
		/*px*/
		border-top-right-radius: 30px;

		/*px*/
		li {
			width: calc(100% - 32px);
			padding: 5px 16px;
			position: relative;
			display: flex;
		}

		li:last-of-type {
			padding: 0;
			width: 100%;
		}

		.descBox {
			.goodIcon {
				display: flex;
				align-items: center;
				height: 220px;
				/*px*/
				width: 220px;

				/*px*/
				img {
					display: block;
					min-width: 100%;
					min-height: 100%;

				}
			}

			div:last-of-type {
				padding-right: 32px;
				/*px*/
				position: absolute;
				width: 50%;
				right: 0;
				top: 20%;
				bottom: 5px;

				/*px*/
				img {
					width: 220px;
					/*px*/
				}
			}

			p:first-of-type {
				font-size: 28px;
				/*px*/
				color: #222222;
				margin-bottom: 25px;
				/*px*/
				font-weight: 700;
			}

			p:last-of-type {
				width: 370px;
				/*px*/
				font-size: 24px;
				/*px*/
			}
		}

		.numBox {
			height: 54px;
			/*px*/
			padding: 34px 32px;
			/*px*/
			line-height: 54px;
			/*px*/
			border-top: 1px solid #efefef;

			span {
				margin-right: 4.5rem;
				font-size: 28px;
				/*px*/
			}

			button,
			input {
				display: inline-block;
				height: 50px;
				/*px*/
				width: 60px;
				/*px*/
				text-align: center;
				background: #f5f5f5;
				font-size: 30px;
				/*px*/
				border: none;
			}

			input {
				margin: 0 2px;
				/*px*/
			}
		}

		.btnGroup {
			margin-bottom: 34px;
			/*px*/
			display: block;
		}

		.close {
			display: block;
			padding-top: 5px;
			text-align: center;
			position: absolute;
			top: -30px;
			/*px*/
			right: 32px;
			/*px*/
			font-size: 44px;
			/*px*/
		}

		.confirm-btn {
			width: 100%;
			height: 100px;
			/*px*/
			text-align: center;
			color: #ffffff;
			line-height: 100px;
			/*px*/
			border: none;
			background: -webkit-linear-gradient(#EB98FD, #AA57DC);
			/* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(#EB98FD, #AA57DC);
			/* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(#EB98FD, #AA57DC);
			/* Firefox 3.6 - 15 */
			background: linear-gradient(#EB98FD, #AA57DC);
			/* 标准的语法 */
			font-size: 34px;
			/*px*/
		}
	}

	footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100px;

		/*px*/
		button {
			width: 15%;
			height: 100%;
			border: 0;
			color: #585858;
			background-color: #fff;
			border-top: 1px solid #f0f0f0;
			/*px*/
		}

		button:first-of-type {
			// border-right: 1px solid #F0F0F0;
			/*px*/
		}

		button:nth-child(2) {
			// border-right: 1px solid #F0F0F0;
			/*px*/
		}

		button:last-of-type {
			font-size: 32px;
			/*px*/
			// width: 60%;
			width: 55%;
			background: -webkit-linear-gradient(#EB98FD, #AA57DC);
			/* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(#EB98FD, #AA57DC);
			/* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(#EB98FD, #AA57DC);
			/* Firefox 3.6 - 15 */
			background: linear-gradient(#EB98FD, #AA57DC);
			/* 标准的语法 */
			color: #fff;
			float: right;
		}

		.detailFootIcon {
			display: block;
			height: 32px;
			/*px*/
			width: 32px;
			/*px*/
			margin: 0 auto 5px;
			/*px*/
		}

		p {
			font-size: 22px;
			/*px*/
		}
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
</style>
