<template>
    <mt-header v-bind:title="msgHeader"  :fixed="true" :class="{iosHeader : isIos}">
    <!-- <mt-header v-bind:title="msgHeader"  :fixed="true" class="iosHeader"> -->
        <mt-button class="iconfont icon-iconback" slot="left" @click="handleBack"></mt-button>
    </mt-header>
</template>

<script>
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    export default {
        name: "thirdHeader",
        data(){
            return{
                isIos:false
            }
        },
        // props:['msgHeader',"H5brek"],
		props:{
			msgHeader:{
				type:String
			},
			H5brek:{
				type:Boolean,
				default:false
			}
		},
        created(){
            if(isiOS){
                this.isIos = true
            }
        },
        methods:{
            handleBack(){
				if(this.H5brek == true){//H5的返回
					this.$router.go(-1);
				}else{//交互的返回
					 if(isAndroid) {
					    androidApp.backUpper()
					}
					if(isiOS){
					    window.webkit.messageHandlers.ReturnBackAPP.postMessage("");
					}
				}
               
            },
        }
    }
</script>

<style scoped lang="scss">
	// 	 @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio:2) { //ipone xr
	//    .list{
	//  	  background: red !important;
	//  	  }
	// }
    .iosHeader{
        padding-top: 44px;/*px*/
        height: 132px;/*px*/
        @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
            padding-top: 88px!important;/*px*/
            height: 176px;/*px*/
        }
		
		    // padding-top: 88px!important;/*px*/
		    // height: 176px;/*px*/
        @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
            padding-top: 88px!important;/*px*/
            height: 176px;/*px*/
        }
    }

    header{
        width: 100%;
        height: 88px;/*px*/
        line-height: 88px;/*px*/
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        color: #333;
        font-size: 36px;/*px*/
        background-color: #fff;
        box-shadow: 0 2px 3px rgba(33,33,33,0.1);
        z-index: 999!important;
    }
i{
    color: #333;
    font-size: 44px;/*px*/
    position: absolute;
    left: 32px;/*px*/
    font-weight: bold;
}
    @media screen and (min-device-width: 768px){
        header{
            padding-top: 40px;/*px*/
            height: 128px;/*px*/
        }
    }
</style>