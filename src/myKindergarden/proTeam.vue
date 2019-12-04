<template>
    <div class="container">
        <ThirdHeader></ThirdHeader>
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
</style>
<style>
</style>