<template>
	<!-- 过渡动画 -->
	<transition name="fade">
		<div class="img-view" style="display: flex;align-items: center">
			<!-- 遮罩层 -->
			<!-- <mt-swipe :auto="0" :defaultIndex="index" style="width: 100%;text-align: center;height: 100%;">
                <mt-swipe-item v-for="(img,index) in imgSrc" :key="index" >
                    <div style="display: flex;align-items: center;height: 100vh;z-index: 9999;position:relative;background-color: rgba(0,0,0,1)" @click="bigImg">
                        <img class="clickAbleImg" :src="img" alt="" style="width: 100%;position: relative;z-index: 9999;">
                    </div>
                </mt-swipe-item>
            </mt-swipe> -->

			<div class="swiper-container datu">
				<div class="swiper-wrapper"  @click="bigImg">
					<div class="swiper-slide" style="display: flex;align-items: center;height: 100vh;z-index: 9999;position:relative;background-color: rgba(0,0,0,1)"
					 v-for="(img,index) in imgSrc">
						<div class="swiper-zoom-container">
							<img :src="img" alt="" class="clickAbleImg" style="width: 100%;position: relative;z-index: 9999;">
						</div>
					</div>
					<!-- 		<div class="swiper-slide" @click.native="handleClickSlide(2)">Slide 2</div>
					<div class="swiper-slide"><img src="../assets/Picturebook_top.png" alt=""></div>
					<div class="swiper-slide">Slide 3</div> -->
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
	</transition>

</template>
<script>
	import Swiper from 'swiper';
	export default {
		props: ['imgSrc', 'index'],
		mounted() {
			// setTimeout(() => {
				this.swi();
			// }, 500)
		},
		methods: {
			bigImg() {
				console.log("我发送时间");
				// 发送事件
				this.$emit('clickit')
			},
			scale() {
				this.target.width = 150
			},
			swi() {
				const _this = this;
				// var myswiper=new Swiper('.swiper-container',{})
				var mySwiper = new Swiper('.datu', {
					loop: true,
					zoom: true,
					initialSlide:_this.index,
					// observer: true, //修改swiper自己或子元素时，自动初始化swiper
					// observeParents: true, //修改swiper的父元素时，自动初始化swiper
					autoplayDisableOnInteraction: true, //用户滑动后是否自动播放
					pagination: {
						el: '.swiper-pagination',
					},
					// on:{
					// 	click: function(){
					// 	  _this.clickImg(this.realIndex);
					// 	},
					//  }
				})

			}
		},
	}
</script>
<style scoped>
	/*动画*/
	.fade-enter-active,
	.fade-leave-active {
		transition: all .2s linear;
		transform: translate3D(0, 0, 0);
	}

	.fade-enter,
	.fade-leave-active {
		transform: translate3D(100%, 0, 0);
	}

	.clickAbleImg {
		cursor: pointer;
	}

	/* bigimg */

	.img-view {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* z-index: 5000; */
		z-index: 999999999991 !important;
	}

	/*遮罩层样式*/
	.img-view .img-layer {
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.7);
		 z-index: 99999999999 !important;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.img {
		position: relative;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/*不限制图片大小，实现居中*/
	.img-view .img img {
		max-width: 100%;
		min-width: 100%;
		display: block;
		position: relative;
		/*position: absolute;*/
		/*left: 0;*/
		/*right: 0;*/
		margin: auto auto;
		z-index: 10000;
	}
</style>
