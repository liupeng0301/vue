<template>
    <div class="container">
        <ThirdHeader></ThirdHeader>
        <img src="../assets/icons/headspare.png" alt="" class="tit-img">
        <!--<img src="" alt="" class="scroll-img">-->
        <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
            <!--<el-tab-pane label="园采买" name="first">-->
                <!--<Card-->
                <!--v-for="(i,index) of item"-->
                <!--:key="index"-->
                <!--:content="i"></Card>-->
                <!--<firstCard></firstCard>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="环境创设" name="second">-->
                <!--<secondCard></secondCard>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="园服务" name="third">-->
                <!--<thirdCard></thirdCard>-->
            <!--</el-tab-pane>-->
        <!--</el-tabs>-->
        <div style="padding-top: 120px">{{item}}</div>
    </div>
</template>

<script>
    import ThirdHeader from '../components/thirdHeader'
    export default {
        name: "kinderOrder",
        data(){
            return{
                activeName: 'first',
                item:[],
            }
        },
        components:{
            ThirdHeader
        },
        created(){
            let postData = this.$qs.stringify({
                // id:"bbdad741-409e-11e9-9b22-00163e08bb54",
                // userId:"40288135684b8cb301684b9651470004"
            });
            // axios.post('YQApp/yqws/goods/json/getGoodsDetail', {
            //     data:postData
            // })
            this.$axios({
                method: 'post',
                url:this.$url+'orders/json/getOrdersList',
                data:postData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(data=>this.item=data.data.resultObject)
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped lang="scss">
    .tit-img{
        position: fixed;
        top: 0;
        width: 100%;
    }
    .scroll-img{
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 998;
    }
</style>
<style>
    .el-tabs__item{
        color: #EFD6FF!important;
    }
    .el-tabs__item:hover{
        color: #fff!important;
    }
    .el-tabs__item.is-active{
        color: #fff!important;
    }
    .el-tabs__active-bar{
        background-color: #fff!important;
    }
    .el-tabs__nav-wrap::after{
        background-color: rgba(0,0,0,0)!important;
    }
    .el-tabs__header{
        position: fixed!important;
        top: 0;
        z-index: 999;
        width: 100%;
        display: flex;
        justify-content: center;
        background: url('../assets/icons/scrollspare.png') no-repeat;
        background-size: 100%;
        padding-top: 10px!important;
    }
    .el-tab-pane{
        padding-top: 40px;
    }
</style>