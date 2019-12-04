<template>
    <!--确认订单  单按钮-->
    <div>
        <SecondHeader msgHeader="订单详情"></SecondHeader>
		<p v-if="item.ordersStatus == 1" class="messageName">
			<img src="../assets/img/shijian.png" alt="">预订单
		</p>
		<p v-else-if="item.ordersStatus == 2" class="messageName">
			<img src="../assets/img/dingdan.png" alt="">已确认
		</p>
		<p v-else-if="item.ordersStatus == 3" class="messageName">
			<img src="../assets/img/jinxing.png" alt="">配送中
		</p>
		<p v-else-if="item.ordersStatus == 4" class="messageName">
			<img src="../assets/img/success.png" alt="">已完成
		</p>
		<p v-else-if="item.ordersStatus == 4" class="messageName">
			<img src="../assets/img/quxiao.png" alt="">失效
		</p>
        <section class="list">
            <ul v-for="(i,index) in item.dataList" :key="index">
                <li><div><img :src="i.courseShowImg" alt="图标"><span v-if="item.ordersType==='kcpx'">{{i.tag}}h</span></div><p>{{i.name}}</p><div><span class="iconfont icon-guanbi">{{i.number}}</span></div></li>
            </ul>
        </section>
        <div class="count-num"><span v-if="item.ordersType==='kcpx'">共{{item.goodsCount}}节课程</span><span v-else>共{{item.goodsCount}}件商品</span></div>
        <section class="info">
            <div class="order-info">
                <div class="tit">订单信息</div>
                <div class="order-desc">
                    <p>订单号：<span>{{item.orderNum}}</span></p>
                    <p>创建时间：<span>{{item.timeStr}}</span><!-- &nbsp;&nbsp;<span>22:45:16</span> --></p>
                    <p>备注信息：<span>{{item.cdesc?item.cdesc:'无'}}</span></p>
                </div>
            </div>
        </section>
        <footer>
            <button @click="confirm" v-show="peisong">确认提交</button>
        </footer>
		<!-- <a href="tel:15201356961">
			<img src="../assets/img/kefu.png" alt="" class="kefu_Class">
		</a> -->
		<a href="javascript:void(0);" v-if="Android" @click="tellPhone">
			<img src="../assets/img/kefu.png" alt="" class="kefu_Class">
		</a>
		<a href="tel:15201356961" v-if="iOS" @click="tellPhone">
			<img src="../assets/img/kefu.png" alt="" class="kefu_Class">
		</a>
		
    </div>
</template>

<script>
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    import SecondHeader from '../components/secondHeader';
    import { Toast } from 'mint-ui';
    export default {
        name: "orderDetail",
        data(){
            return{
				Android: isAndroid,
				iOS: isiOS,
                userid:'',
                orderid:'',
                item:[],
                peisong:false,
            }
        },
        components:{
            SecondHeader
        },
        created(){
            this.userid = this.$route.params.userId;
            this.orderid = this.$route.params.orderId;
            let postData = this.$qs.stringify({
                userId: this.userid,
                ordersId: this.orderid
            });
            this.$axios({
                method:'post',
                url: this.$url+"orders/json/getOrdersDetail",
                data:postData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                async: true
            })
            .then(data=>this.item=data.data.resultObject);
            if(this.item.orderStatus === "3"){
                this.peisong = true;
            }
        },
        methods:{
			tellPhone() {
				if (isAndroid) {
					androidApp.callPhone("15201356961");
				}
			},
			iphone(){
				
			},
            cancel(){

            },
            confirm(){
                let postData = this.$qs.stringify({
                    userId: this.userid, 
                    ordersId: this.orderid, 
                    buttonType: 'confirm'
                });
                this.$axios({
                    url: this.$url+"orders/json/confirmOrder",
                    method:'post',
                    data:postData,
                    async: true
                })
                .then(data=>{
                    // console.log(data)
                    if (data.data.code === 10000) {
                        Toast('提交成功')
                    } else {
                        Toast(data.data.message)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
	.kefu_Class{
		width: 250px;/*px*/
		position: fixed;
		right: 0;
		bottom: 100px;/*px*/
	}
	.messageName{
		color: #333333;
		font-size: 30px;/*px*/
		margin-left: 34px;/*px*/
		margin-top: 31px;/*px*/
		// margin-bottom: 27px;/*px*/
		img{
			width: 37px;/*px*/
			height: 37px;/*px*/
			vertical-align: middle;
			margin-right: 13px;/*px*/
		}
	}
    .tit{
        font-size: 18px;
        font-weight: bold;
        padding: 8px 16px;
        i{
            margin-right: 8px;
            font-size: 20px;
        }
    }
    .info .tit{
        padding-left: 0;
    }
    .list{
        background-color: #fff;
        ul{
            li{
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 88px;
                width: calc(100% - 32px);
                padding: 0 16px;
                border-bottom: 1px solid #f0f0f0;
                div:first-of-type{
                    height: 108px;/*px*/
                    width: 108px;/*px*/
                    position: relative;
                    span{
                        position: absolute;
                        bottom: 0px;
                        left: 0px;
                        width: 100%;
                        background:rgba(238,238,238,1);
                        text-align: center;
                        color: #888888;
                        font-size: 14px;
                    }
                    img{
                        border-radius: 5px;
                        height: 108px;/*px*/
                        width: 108px;/*px*/
                        display: block;
                    }
                }
                div:last-of-type{
                    height: 44px;
                    width: 44px;
                    line-height: 44px;
                    text-align: center;
                    color: #666;
                    font-size: 19px;
                    span{
                        font-size: 19px;
                    }
                }
                p{
                    overflow:hidden;
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                    padding: 0 10px;
                    line-height: 26px;
                    letter-spacing: 1px;
                    font-size: 16px;
                    font-weight: 400;
                }
            }
        }
    }
    .order-info{
        p{
            padding: 4px;
            font-size: 14px;
        }
    }
    .transport-desc{
        display: flex;
        li{
            padding: 4px 0;
            height: 20px;
            line-height: 20px;
            
            input{
                display: block;
                width: 249px;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
            }
        }
    }
    .count-num{
        width: 100%;
        text-align: center;
        background-color: #fff;
        margin-top: 12px;
        padding: 8px 0;
        font-size: 16px;
    }
    .info{
        width: calc(100% - 32px);
        padding: 0 16px;
        background-color: #fff;
        padding-bottom: 50px;
        >div{
            padding: 18px 0;
        }
    }
    footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        button{
            width: 100%;
            border: 0;
            color: #fff;
            height:50px;
            font-size: 18px;
            background: -webkit-linear-gradient(#EB98FD, #AA57DC); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(#EB98FD, #AA57DC); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#EB98FD, #AA57DC); /* Firefox 3.6 - 15 */
            background: linear-gradient(#EB98FD, #AA57DC); /* 标准的语法 */
        }
    }
    .icon-guanbi:before{
        font-size: 22px;/*px*/
    }
</style>