<template>
    <!--确认订单  单按钮-->
    <div>
        <SecondHeader msgHeader="选择课程"></SecondHeader>
        <section class="list">
            <ul>
                <li v-for="(it,index) in item" :key="it.id" @click="check(index,it.id)">
                    <span class="checkbox" v-show="it.isDelete=='0'"> </span>
                    <img src="../assets/icons/checked.png" alt="" v-show="it.isDelete=='1'" class="icon">
                    <div>
                        <img :src="it.thumbnailImg" alt="图标">
                    </div>
                    <div>
                        <p>{{it.jjName}}</p>
                        <p><i class="iconfont icon-bofang"></i>共{{it.courseNum}}小时</p>
                    </div>
                    <!-- <div><i class="iconfont icon-guanbi"></i>{{i.price}}</div> -->
                </li>
            </ul>
        </section>
		<div style="width: 100%;height:55px;"></div>
        <footer>
            <button @click="confirm">确认</button>
        </footer>
        <NoData msgHeader="课程列表暂无数据，去看看其他课程吧" v-if="this.item.length < 1"></NoData>
		<tankuangtwo message="是否确认订单?" 
		:ids="ids"
		:userId="userId" 
		:courseId="courseType"
		:xianshi="xianshi" 
		messageFooter="确认"></tankuangtwo>
    </div>
</template>

<script>
    import { Toast,MessageBox  } from 'mint-ui';
    import SecondHeader from '../components/secondHeader'
    import NoData from '../components/noData'
    import tankuangtwo from '../components/tankuangtwo'
    import { setTimeout } from 'timers';
    export default {
        name: "orderDetail",
        data(){
            return{
                item:[],
                userId:"",
				xianshi:false,
                courseType:"",
                selection:false,
                ids:"",
                checkedNames: [],  // 课程选中ID
            }
        },
        components:{
            SecondHeader,
            NoData,
			tankuangtwo
        },
        created(){
             this.userId = this.$route.params.userid;
            this.courseType = this.$route.params.courseType;
            let postData = this.$qs.stringify({
                courseId:this.courseType,
                pageSize:100,
                pageIndex:1,
            });
            this.$axios({
                method: 'post',
                url:this.$url+'course/json/getCourseRealiaList ',
                data:postData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                async: true
            })
                .then(data=>this.item=data.data.resultObject);
        },
        methods:{
            cancel(){

            },
            select(){
                
            },
			guanbi(){
				this.xianshi = false;
			},
            check(index,id){
                if (this.item[index].isDelete == "0") {
                    this.$set(this.item[index],'isDelete','1')
                }else{
                    this.$set(this.item[index],'isDelete','0')
                }
                if(this.checkedNames.indexOf(id) < 0){
                    this.checkedNames.push(id);
                }else{
                    this.checkedNames.splice(this.checkedNames.indexOf(id),1);
                }
                
            },
            confirm(){
                this.ids = this.checkedNames.join(",");
                if (this.ids == '') {
                    Toast('请选择课程');
                    return false;
                }
				this.xianshi = true;
                // let postData = this.$qs.stringify({
                //     userId: this.userId,
                //     ids: this.ids,
                //     courseId: this.courseType
                // });
                // 
                // this.$axios({
                //     method: "post",
                //     url: this.$url+"orders/json/submitCourse",
                //     data:postData,
                //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                //     async: true
                // })
                // .then(data=>{
                //     let that = this;
                //     if (data.data.code === 10000) {
                //         Toast("添加成功")
                //         setTimeout(function(){
                //             that.$router.push(`/orderConfirm/${data.data.resultObject.ordersId}/${that.userId}?status=1`)
                //             //window.location = "http://www.peihuayuren.com:8080/dist/index.html#/orderConfirm/"+data.data.resultObject.ordersId+"/"+that.userId
                //         },2000)
                //     }else{
                //         Toast(data.data.message);
                //     }
                // })
            }
        },
		mounted(){
			// alert(`宽度 = ${screen.width}\n 高度 = ${screen.height}`);
			// document.getElementById("button").onclick = function() {
    // alert(window.devicePixelRatio);	
// };
		}
    }
</script>

<style scoped lang="scss">
    .tit{
        font-size: 18px;
        font-weight: bold;
        padding: 8px 16px;
        i{
            margin-right: 8px;
            font-size: 20px;
        }
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
                padding-left:10px;
                .checkbox{
                    display: inline-block;
                    height: 18px;
                    width: 18px;
                    margin-right: 10px;
                    background-color: #fff;
                    border: 1px solid #999;
                    border-radius: 10px;
                }
                .icon{
                    display: inline-block;
                    height: 20px;
                    width: 20px;
                    margin-right: 10px;
                    outline: 0;
                    border-radius: 10px;
                }
                
                div:first-of-type{
                    height: 44px;
                    width: 44px;
                    img{
                        border-radius: 5px;
                        width: 44px;
                        height: 44px;
                    }
                }
                div:nth-of-type(2){
                   flex: 1;
                    p{
                        width: 100%;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        display:-webkit-box;
                        -webkit-box-orient:vertical;
                        -webkit-line-clamp:1;
                        padding: 0 10px;
                        line-height: 26px;
                        letter-spacing: 1px;
                        font-size: 16px;
                        font-weight: 400;
                    }
                    p:last-of-type{
                        color: #C5C5C5;
                        font-size: 12px;
                    }
                }
            }
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
            height:55px;
            font-size: 20px;
            background: -webkit-linear-gradient(#EB98FD, #AA57DC); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(#EB98FD, #AA57DC); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#EB98FD, #AA57DC); /* Firefox 3.6 - 15 */
            background: linear-gradient(#EB98FD, #AA57DC); /* 标准的语法 */
        }
    }
    .icon-guanbi:before{
        font-size: 8px;
        margin-right: 4px;
    }
    .icon-bofang:before{
        font-size: 10px;
        margin-right: 4px;
        color: #C5C5C5;
        font-weight: bold;
    }
</style>