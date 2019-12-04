<template>
    <div class="darkContainer">
        <second-Header msgHeader="团队介绍"></second-Header>
        <div class="tdcont" v-html="item.content">
        </div>
    </div>
</template>
<script>
import SecondHeader from '../components/secondHeader'
export default {
    name: 'teamDesc',
    components: {
        SecondHeader
    },
    data(){
        return {
            id:'',
            item: {}
        }
    },
    created() {
        this.id = this.$route.params.id;
        let postData = this.$qs.stringify({
            artId: this.id
        })
        this.$axios({
            method: 'Post',
            url: this.$url+'data/json/getArticleDetail',
            data: postData,
            asyn: true
        })
        .then(data=>this.item=data.data.resultList[0])
    },
    methods: {
        
    },
}
</script>
<style lang="scss">
.tdcont{
		.team{
		background:#ffffff;
		}
		.team .top{
		width: 100%;
		display: block;
		}
		.team p{
		font-size:28px;/*px*/
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(102,102,102,1);
		padding: 0px 20px;/*px*/
		}
		.team li{
		list-style: none;
		margin-bottom: 80px;/*px*/
		}
		.team li img{
		display: inline-block;
		width: 320px;/*px*/
		height: 390px;/*px*/
		}
		.team li div{
		display: inline-block;
    		width: calc(100% - 390px);/*px*/
    		width:-moz-calc(100% - 390px); /*px*/
    		width:-webkit-calc(100% - 390px); /*px*/
		padding: 0px 30px;/*px*/
		}
		.team li div span{
		display: block;
		width: 100%;
		font-size:24px;/*px*/
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(246,178,53,1);
		margin-bottom: 20px;/*px*/
		}
		.team li div h4{
		font-size:24px;/*px*/
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(68,68,68,1);
		line-height:36px;/*px*/
		margin-bottom: 30px;/*px*/
		}
		.team li div p{
		font-size: 24px;/*px*/
		padding: 0!important;
		line-height: 36px;/*px*/
		}
		.team .right{
    		float: right;
		}
		.team .right span,.right h4{
		text-align: right;
		}
}
</style>


