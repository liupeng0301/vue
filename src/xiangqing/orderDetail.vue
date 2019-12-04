<template>
    <!--订单详情无按钮-->
    <div class="darkContainer">
        <SecondHeader msgHeader="订单详情"></SecondHeader>
        <section class="list">
            <p class="tit" v-if="item.ordersStatus=='1'"><i class="iconfont icon-time"></i>预订单</p>
            <p class="tit" v-if="item.ordersStatus=='2'"><i class="iconfont icon-time"></i>已确认</p>
            <p class="tit" v-if="item.ordersStatus=='3'"><i class="iconfont icon-time"></i>配送中</p>
            <p class="tit" v-if="item.ordersStatus=='4'"><i class="iconfont icon-time"></i>已完成</p>
            <p class="tit" v-if="item.ordersStatus=='5'"><i class="iconfont icon-time"></i>失效/删除</p>
        </section>
        <section class="info">
            <div class="order-info">
                <div class="tit">订单信息</div>
                <div class="order-desc">
                    <p>订单号：<span>{{item.orderNum}}</span></p>
                    <p>创建时间：<span>{{item.timeStr}}</span></p>
                    <p>备注信息：<span>{{item.desc}}</span></p>
                </div>
            </div>
        </section>
        <section class="info custom">
            <div class="order-info">
                <div class="tit">客户信息</div>
                <div class="order-desc">
                    <p>客户单位：<span>{{item.customerUnit}}</span></p>
                    <p>订单交易人：<span>{{item.customerName}}</span></p>
                    <p>联系电话：<span>{{item.customerPhone}}</span></p>
                    <!-- <p>服务内容：<span>{{item.content}}</span></p> -->
                    <p>装修地址：<span>{{item.receivingAddress}}</span></p>
                </div>
            </div>
        </section>
        <section class="info">
            <div class="order-info">
                <div class="tit">内容详情</div>
                <div class="order-desc">
                    <p>装修风格：<span>{{item.title}}</span></p>
                    <p>场地：<span>{{item.field}}</span></p>
                    <p>面积：<span>{{item.area}}</span></p>
                    <p>装修方式：<span>{{item.decWay}}</span></p>
                    <p>工期：<span>{{item.jobTime}}</span></p>
                </div>
            </div>
        </section>
        
    </div>
</template>

<script>
    import SecondHeader from '../components/secondHeader'
    export default {
        name: "orderDetail",
        data(){
            return{
                item:{},
                userId:"",
                ordersId: "",
            }
        },
        components:{
          SecondHeader
        },
        created(){
            this.userId = this.$route.params.userId;
            this.ordersId = this.$route.params.orderId;
            let postData = this.$qs.stringify({
                userId:this.userId,
                ordersId: this.ordersId
            });
            this.$axios({
                method: 'post',
                url:this.$url+'orders/json/getYfwOrdersDetail',
                data:postData
            })
                .then(data=>this.item=data.data.resultObject);
        },
        methods:{
            cancel(){

            },
            confirm(){

            }
        }
    }
</script>

<style scoped lang="scss">
    .confirm-btn{
        width: 80%;
        margin: 30px 10% 0;
        height:100px;/*px*/
        text-align: center;
        color: #ffffff;
        line-height: 100px;/*px*/
        border: none;
        background: -webkit-linear-gradient(#EB98FD, #AA57DC); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#EB98FD, #AA57DC); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#EB98FD, #AA57DC); /* Firefox 3.6 - 15 */
        background: linear-gradient(#EB98FD, #AA57DC); /* 标准的语法 */
        font-size: 34px;/*px*/
    }
    .custom{
        border-top: 2px solid #eeeeee;
        border-bottom: 2px solid #eeeeee;
    }
    .tit{
        font-size: 30px;/*px*/
        font-weight: bold;
        padding: 0 32px;/*px*/
        height: 60px;/*px*/
        line-height: 60px;/*px*/
        i{
            margin-right: 16px;/*px*/
            font-size: 36px;/*px*/
        }
    }
.list{
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
}
    .count-num{
        width: 100%;
        text-align: center;
        background-color: #fff;
        margin-top: 10px;
        padding: 8px 0;
        border-bottom: 1px solid #efefef;
        font-size: 18px;
    }
    .info{
        width: 100%;
        background-color: #fff;
        .tit{
            color: #333333;
            position: relative;
        }
        .tit::before{
            display: block;
            content: '';
            width: 2px;
            height: 16px;
            background: #B461FF;
            position: absolute;
            top: 7px;
            left: 20px;/*px*/
        }
        >div{
            padding: 10px 0;
            p{
                padding: 0 16px;
                font-size: 12px;
                line-height: 24px;
                color: #666666;
            }
        }
    }
    footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        button{
            width: 50%;
            border: 0;
            color: #fff;
            height:50px;
            font-size: 18px;
        }
        button:first-of-type{
            background-color: #999999;
        }
        button:last-of-type{
            background: -webkit-linear-gradient(#EB98FD, #AA57DC); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(#EB98FD, #AA57DC); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#EB98FD, #AA57DC); /* Firefox 3.6 - 15 */
            background: linear-gradient(#EB98FD, #AA57DC); /* 标准的语法 */
        }
    }
</style>