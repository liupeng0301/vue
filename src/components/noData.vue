<template>
    <div class="nodata">
        <img src="../assets/icons/nodata.png" alt="">
        <p>{{msgHeader}}</p>
    </div>
</template>

<script>
    export default {
        name: "noData",
        data(){
            return{
               
            }
        },
        props:['msgHeader'],
        created(){
            
        },
        methods:{
            
        },
    }
</script>

<style scoped lang="scss">
    .nodata{
        img{
            width: 180px;
            height: 130px;
            margin: 150px auto 50px;
            display: block;
        }
        p{
            text-align: center;
            color: #cccccc;
            font-size: 14px;

        }
    }
</style>
