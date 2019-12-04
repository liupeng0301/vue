<template>
    <div class="helpContainer">
        <thirdHeader msgHeader="帮助中心"></thirdHeader>
        <div class="help-header">
            <i class="iconfont icon-back"></i>
        </div>
        <div class="banner">
            <img src="../assets/img/helpBanner1.png" alt="">
        </div>
        <ul class="list">
            <li @click="acc">账号问题<div><i class="iconfont icon-jiantouyou"></i></div></li>
            <li @click="buy">购买问题<div><i class="iconfont icon-jiantouyou"></i></div></li>
            <li @click="page">页面问题<div><i class="iconfont icon-jiantouyou"></i></div></li>
            <li @click="firm">发票问题<div><i class="iconfont icon-jiantouyou"></i></div></li>
            <li @click="other">其他问题<div><i class="iconfont icon-jiantouyou"></i></div></li>
            <li @click="device">提出建议<div><i class="iconfont icon-jiantouyou"></i></div></li>
        </ul>
    </div>
</template>

<script>
    import thirdHeader from '../components/thirdHeader'
    export default {
        name: "help",
        data(){
            return{

            }
        },
        components:{
            thirdHeader
        },
        methods:{
            acc(){
                this.$router.push("helpDet/acc")
            },
            buy(){
                this.$router.push("helpDet/buy")
            },
            page(){
                this.$router.push("helpDet/page")
            },
            other(){
                this.$router.push("helpDet/other")
            },
            firm(){
                this.$router.push("helpDet/firm")
            },
            device(){
                this.$router.push("device")
            }
        }
    }
</script>

<style scoped lang="scss">
    .helpContainer{
        width: 100%;
        .help-header{
            width: 100%;
            height: 88px;/*px*/
            line-height: 88px;/*px*/
            position: fixed;
            top: 0;
            left: 0;
            padding: 0 32px;/*px*/
            i{
                color: #fff;
                font-size: 44px;/*px*/
                font-weight: bold;
            }
        }
        .banner{
            width: 100%;
            img{
                width: 100%;
            }
        }
        ul{
            width: 100%;
            li{
                width: calc(100% - 64px);/*px*/
                padding: 40px 32px;/*px*/
                color: #333;
                font-size: 30px;/*px*/
                display: flex;
                justify-content: space-between;
                align-items: center;
                div{
                    width: 44px;/*px*/
                    height: 44px;/*px*/
                    i{
                        font-size: 44px;/*px*/
                        color: #999;
                    }
                }
            }
        }
    }
</style>