<template>
    <div class="container">
        <h4 class="top"><img src="" alt="已确认图标">已确认</h4>
        <div class="orderInfo">
            <h4>订单详情</h4>
            <p>订单号：123456789</p>
            <p>创建时间：2019-01-08  22:45:16</p>
        </div>
        <div class="orderPeople">
            <h4>客户信息</h4>
            <p>客户单位：北京市第一幼儿园</p>
            <p>订单交易人：赵铁柱</p>
            <p>联系电话：13021971276</p>
            <p>服务项目：维修</p>
            <p>维修地址：北京市东城区北京市第一幼儿园</p>
        </div>
        <div class="detail">
            <h4>内容详情</h4>
            <p>维修内容：修补</p>
            <p>问题描述：房屋漏水</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orderDetail",
        data(){
            return{
                item:[],
            }
        },
        created(){
            let postData = this.$qs.stringify({
                id:"bbdad741-409e-11e9-9b22-00163e08bb54",
                userId:"40288135684b8cb301684b9651470004"
            });
            // axios.post('YQApp/yqws/goods/json/getGoodsDetail', {
            //     data:postData
            // })
            this.$axios({
                method: 'post',
                url:this.$url+'orders/json/confirmOrder',
                data:postData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(data=>this.item=data.data.resultObject)
                .catch(function (error) {
                    console.log(error);
                });
        },
    }
</script>

<style scoped lang="scss">
    .container{
        background-color: #fff;
        min-height: calc(100vh - 2.2rem);

    }
    .top,.orderInfo,.orderPeople,.detail{
        width: calc(100% - 32px);
        padding: 0 16px;
        border-bottom: 3px solid #eee;
    }
    .detail{
        border-bottom: 0;
    }
.top{
    border-bottom: 1px solid #EEEEEE;
    line-height: 50px;
}
    h4{
        font-size: 18px;
        font-weight: 600;
        margin-top: 12px;
    }
    p{
        font-size: 14px;
        font-weight: 300;
        color: #666;
        line-height: 40px;
    }
</style>