<template>
    <!--确认订单  单按钮-->
    <div >
        <SecondHeader msgHeader="选择书单"></SecondHeader>
        <section class="bookList" v-if="this.bookList.length > 0">
            <ul>
                <li v-for="(item,index) in bookList" :key="index" @click="check(index,item)">
                    <img src="../assets/icons/checked.png" v-if="item.isDelete == '0'" alt="" class="icon">
                    <span class="checkbox" v-else> </span>
                    <p class="bookName">{{item.cname}}</p>
                </li>
                <!-- <li >
                    <span class="checkbox"> </span>
                    <img src="../assets/icons/checked.png" alt="" class="icon">
                    <p class="bookName">《快跑！宅急便》兼具人文情怀与科学精神的经典人文情怀与科学精神的经典</p>
                </li> -->
               
            </ul>
        </section>
		<div class="numBox" v-if="this.bookList.length > 0">
            <div class="all" @click="choseAll">
                <img src="../assets/icons/checked.png" v-show="isAll" alt="" class="icon">
                <span class="checkbox" v-show="!isAll"> </span>
            </div>
			<span class="quanxuan_name" @click="choseAll">全选</span>
            <div class="goodNum">
                <span class="btn" @click="reduce">-</span>
                <span class="num">{{goodNum}}</span>
                <span class="btn" @click="add">+</span>
            </div>
            <span class="title">购买套数</span>
        </div>
        <footer>
            <button @click="submit">提交</button>
        </footer>
        <NoData msgHeader="课程列表暂无数据，去看看其他课程吧" v-if="this.bookList.length < 1"></NoData>
		<!-- <tankuangtwo message="是否确认订单?" 
		:ids="ids"
		:userId="userId" 
		:courseId="courseType"
		:xianshi="xianshi" 
		messageFooter="确认"></tankuangtwo> -->
    </div>
</template>

<script>
    import { Toast,MessageBox  } from 'mint-ui';
    import SecondHeader from '../components/secondHeader'
    import NoData from '../components/noData'
    import axios from 'axios'
    import qs from 'qs'
    import tankuangtwo from '../components/tankuangtwo'
    export default {
        name: "BookList",
        data(){
            return{
                goodNum: 1,         //书单数量
                bookList:[{name:1,isDelete:"0"},{name:1,isDelete:"0"}],        //书单列表
                checkedNames:[],    //选中商品列表
                isAll: true,        //全选的判断
            }
        },
        components:{
           SecondHeader,
            NoData,
        },
        created(){
            this.Just_entered();
        },
        methods:{
			Just_entered(){
				let Mydata = {
					userId: this.$route.params.userId, // 当前用户id 
					rbId: this.$route.params.rbId, // 
					pageIndex: 1, //页数
					pageSize: 500 //每页几条
				};
					axios.post(this.$url+'goods/json/getRecommendBookList', qs.stringify(Mydata)).then((
						response) => {
						//success
						if (response.data.code === 10000) {
							for(var i=0;i<response.data.resultObject.dataList.length;i++){
								response.data.resultObject.dataList[i].isDelete = "0"
							}
							this.bookList = response.data.resultObject.dataList;
						}
					}, (error) => {
						console.log(error)
					});
				
			},
			submit(){
					let ids;
				let bookList = this.bookList;
				let IDS = this.bookList.filter((item)=>{
					if(item.isDelete == "0"){
						return item.id;
					}
				});
				if(IDS.length === this.bookList.length){ //说明全选了
					ids = null;
				}else{
					let arr = [];
					for(var i=0;i<IDS.length;i++){
						arr.push(IDS[i].id);
					}
					// ids = JSON.stringify(arr);
					ids = arr.join(",");
                };
                
					let Mydata = {
						userId: this.$route.params.userId, // 当前用户id 
						rbId: this.$route.params.rbId, // 
						goodsCount:this.goodNum,//购买套数
						ids:ids
					};
				axios.post(this.$url+'orders/json/submitRecommendBook ', qs.stringify(Mydata)).then((
						response) => {
						//success
						console.log(response);
						if (response.data.code === 10000) {
							this.$router.push(`/orderConfirm/${response.data.resultObject.ordersId}/${response.data.resultObject.userId}`)
						}
					}, (error) => {
						console.log(error)
					});
			},
            //书单数量减少
           reduce(){
               if (this.goodNum == 1) {
                    Toast('数量不能少于 1');
                    return false;
               }
               this.goodNum -= 1;
           },
           //书单数量增加
           add(){
               this.goodNum += 1;
           },
           //选择书单
           check(index,id){
                if (this.bookList[index].isDelete == "0") {
                    this.$set(this.bookList[index],'isDelete','1')
                }else{
                    this.$set(this.bookList[index],'isDelete','0')
                }
                if(this.checkedNames.indexOf(id) < 0){
                    this.checkedNames.push(id);
                    console.log(this.checkedNames.length,this.bookList.length,'添加')
                    if (this.checkedNames.length ==0) {
                        this.isAll = true;
                    }else{
                        this.isAll = false;
                    }
                }else{
                    this.checkedNames.splice(this.checkedNames.indexOf(id),1);
                    if (this.checkedNames.length ==0) {
                        this.isAll = true;
                    }else{
                        this.isAll = false;
                    }
                }
                
            },
            //全选
            choseAll(){
                let type = 0;
                if (this.isAll == true) {
                    type = 1;
                    this.isAll = false;
                }else{
                    this.isAll = true;
                }
                for (let i = 0; i < this.bookList.length; i++) {
                    this.bookList[i].isDelete = type;
                }
            },
           
        },
		mounted(){
			
		}
    }
</script>

<style scoped lang="scss">
	.quanxuan_name{
		display: inline-block;
		 height:110px;/*px*/
		font-size:28px;/*px*/
		line-height: 110px;/*px*/
	}
    .bookList{
        padding: 0px 26px 0px 30px;/*px*/
        margin-bottom: 240px;/*px*/
        background: #ffffff;
        li{
            height: 100px;/*px*/
            line-height: 100px;/*px*/
            .checkbox{
                width:30px;/*px*/
                height:30px;/*px*/
                border:3px solid rgba(199,199,199,1);/*px*/
                border-radius:50%;
                float: left;
                margin-top: 32px;/*px*/
                margin-right: 34px;/*px*/
            }
            .icon{
                width:36px;/*px*/
                height:36px;/*px*/
                border-radius:50%;
                float: left;
                margin-top: 32px;/*px*/
                margin-right: 34px;/*px*/
            }
            .bookName{
                font-size:28px;/*px*/
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(34,34,34,1);
                line-height:100px;/*px*/
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                border-bottom: 1px solid #F1F1F1;
            }
        }
    }
    .numBox{
        width: 100%;
        height: 110px;/*px*/
        float: right;
        padding-right: 26px;/*px*/
        background: #ffffff;
        position: fixed;
        bottom: 110px;/*px*/
        border-top: 2px solid #F1F1F1;
        .title{
            display: inline-block;
            width:110px;
            height:110px;/*px*/
            font-size:28px;/*px*/
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(34,34,34,1);
            line-height:110px;/*px*/
            float: right;
        }
        .goodNum{
            float: right;
            margin-top: 25px;/*px*/
            span{
                display: inline-block;
                width:76px;/*px*/
                height:50px;/*px*/
                background:rgba(245,245,245,1);
                line-height: 50px;/*px*/
                text-align: center;
                float: left;
            }
            .btn{
                background: transparent;
                width: 20px;
                font-size: 20px;
            }
        }
        .all{
            margin-left: 15px;
            .checkbox{
                width:30px;/*px*/
                height:30px;/*px*/
                border:3px solid rgba(199,199,199,1);/*px*/
                border-radius:50%;
                float: left;
                margin-top: 32px;/*px*/
                margin-right: 34px;/*px*/
            }
            .icon{
                width:36px;/*px*/
                height:36px;/*px*/
                border-radius:50%;
                float: left;
                margin-top: 32px;/*px*/
                margin-right: 34px;/*px*/
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
            height:110px;/*px*/
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