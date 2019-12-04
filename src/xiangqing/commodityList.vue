<template>
	<!--确认订单  单按钮-->
	<div>
		<SecondHeader msgHeader="选择商品"></SecondHeader>
		<section class="list">
			<ul>
				<li v-for="(it,index) in item" :key="it.id" @click="check(index,it.id,item)">

					<span class="checkbox" v-show="it.isDelete=='0'"> </span>
					<img src="../assets/icons/checked.png" alt="" v-show="it.isDelete=='1'" class="icon">
					<div class="div_img">
						<img :src="it.showImg" alt="图标">
					</div>
					<div class="div_home">
						<div class="jjName_home">
							<p class="jjName">{{it.cname}}</p>
						</div>
						<!-- <p><i class="iconfont icon-bofang"></i>共{{it.courseNum}}小时</p> -->
						<div class="div_footer">
							<span class="user_">{{it.cdesc}}</span>
							<div class="all_btn">
								<button class="bun_" :class="{'min_':it.Quantity == '1'}" @click.stop="subtract(it)">-</button>
								<span class="spa_">{{it.Quantity}}</span>
								<button class="bun_" @click.stop="add(it)">+</button>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</section>
		<div class="zhanwei"></div>
		<footer>
			<div class="footer_">
				<div @click="all_chec(item)">
					<span class="allcheckbox" v-if="select_all"></span>
					<img src="../assets/icons/checked.png" alt="" v-else class="allicon">
					全选
				</div>
				<button @click="confirm">结算(<span>{{total}}</span>)</button>
			</div>
		</footer>
		<NoData msgHeader="课程列表暂无数据，去看看其他课程吧" v-if="this.item.length < 1"></NoData>
		<tankuangtwo message="是否确认订单?" :ids="ids" :userId="userId" :courseId="courseType" :xianshi="xianshi" messageFooter="确认" isshow="2" :jsonStr="jsonStr"></tankuangtwo>
	</div>
</template>

<script>
	import {
		Toast,
		MessageBox
	} from 'mint-ui';
	import SecondHeader from '../components/secondHeader'
	import NoData from '../components/noData'
	import tankuangtwo from '../components/tankuangtwo'
	import {
		setTimeout
	} from 'timers';
	export default {
		name: "orderDetail",
		data() {
			return {
				jsonStr:[],
				select_all: false, //默认是否全部选中
				item: [],
				userId: "",
				xianshi: false,
				courseType: "",
				selection: false,
				ids: "",
				checkedNames: [], // 课程选中ID
			}
		},
		watch: {
			item: {
				handler: function(val, oldVal) {
					/* 
					按钮都被选中时候 全选被选中 
					 */
					let arr = [];
					val.map(item => {
						if (item.isDelete == "1") {
							arr.push(item);
						}
					});
					if (arr.length == val.length) {
						this.select_all = false;
					}
				},
				deep: true
			}

		},
		components: {
			SecondHeader,
			NoData,
			tankuangtwo
		},
		created() {
			this.userId = this.$route.params.userid;
			this.courseType = this.$route.params.courseType;
			let postData = this.$qs.stringify({
				courseId: this.courseType,
				// pageSize: 100,
				pageSize: 500,
				pageIndex: 1,
			});
			// 			this.$axios({
			// 					method: 'post',
			// 					url: this.$url + 'course/json/getCourseRealiaList',
			// 					data: postData,
			// 					headers: {
			// 						'Content-Type': 'application/x-www-form-urlencoded'
			// 					},
			// 					async: true
			// 				})
			// 				.then(data => {
			// 					data.data.resultObject.map(item => {
			// 						item.Quantity = 1;
			// 					})
			// 					this.item = data.data.resultObject;
			// 
			// 				});
			let goodsId = this.$qs.stringify({
				goodsId: this.$route.params.goodsId,
				pageIndex: 1,
				pageSize: 100000
			})
			this.$axios({
					method: 'post',
					url: this.$url + 'goods/json/getSpecialGoodsList',
					data: goodsId,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					async: true
				})
				.then(data => {
					// console.log(data);
					if (data.data.code === 10000) {
						data.data.resultList.map(item => {
							item.Quantity = 1;
							item.isDelete = "1";
						})
						this.item = data.data.resultList;
						console.log(this.item);
					};
					
				});
		},
		mounted(){
			// alert(`宽度 = ${screen.width}\n 高度 = ${screen.height}`);
			// document.getElementById("button").onclick = function() {
			// alert(window.devicePixelRatio);	
			// };
			// this.item.map(item => {
			// 	item.isDelete = "1";
			// })
			// console.log(this.item);
			// setTimeout(()=>{
			// 	console.log(this.item);
			// },1000)
		},
		methods: {
			all_chec(data) {
				/* 
				全部选中 
				 */
				this.select_all = !this.select_all;
				console.log(data);
				let num = "0";
				if (this.select_all == true) {
					num = "0";
				} else {
					num = "1";
				}
				data.map(item => {
					item.isDelete = num;
				})
			},
			subtract(item) {
				if (item.Quantity == 1) {
					Toast({
						message: '不能再减少了',
						position: 'bottom',
						duration: 2000
					});
					return;
				}
				item.Quantity--;
			},
			add(item) {
				item.Quantity++;
			},
			cancel() {

			},
			select() {

			},
			guanbi() {
				this.xianshi = false;
			},
			check(index, id, data) {
				if (this.item[index].isDelete == "0") {
					this.$set(this.item[index], 'isDelete', '1')
				} else {
					this.$set(this.item[index], 'isDelete', '0');
					this.select_all = true;
				};

				if (this.checkedNames.indexOf(id) < 0) {
					this.checkedNames.push(id);
				} else {
					this.checkedNames.splice(this.checkedNames.indexOf(id), 1);
				}

			},
			confirm() {
				this.ids = this.checkedNames.join(",");
				var itemdata = this.item.filter(item=>{
					return item.isDelete == "1"
				});			
				console.log(itemdata);
				let _this = this;
				itemdata.map(item=>{
					_this.jsonStr.push({
						id:item.id,
						number:item.Quantity
					});
				})
				
				// if (this.ids == '') {
				// 	Toast('请选择课程');
				// 	return false;
				// }
				this.xianshi = true;
			}
		},
		computed: {
			total() {
				/* 
					0 未选中
					1 选中
				 */
				let io = 0;
				this.item.map(item => {
					if (item.isDelete == "1") {
						io++;
					};
				})
				return io;
			},
			// select_all() {
			// 	let itemdata = this.item;
			// 	itemdata.filter(item=>{
			// 		return item.isDelete == "0"
			// 	});
			// 	console.log(itemdata)
			// 	if(itemdata.length == 0){
			// 		return false;
			// 	}else{
			// 		return true;
			// 	}
			// 	
			// }
		}
	}
</script>

<style scoped lang="scss">
	.bun_ {
		display: inline-block;
		height: 43px;
		/*px*/
		width: 50px;
		/*px*/
		text-align: center;
		background: white;
		color: #333333;
		font-size: 37px;
		/*px*/
		border: none;
	}
	.min_{
		color: rgba(238,238,238,1);
	}

	.spa_ {
		margin: 0 2px;
		/*px*/
		display: inline-block;
		text-align: center;
		width: 76px;
		/*px*/
		font-size: 32px;
		/*px*/
		height: 43px;
		/*px*/
		line-height: 43px;
		/*px*/
		background: rgba(245, 245, 245, 1);

	}

	.tit {
		font-size: 18px;
		font-weight: bold;
		padding: 8px 16px;

		i {
			margin-right: 8px;
			font-size: 20px;
		}
	}

	.zhanwei {
		width: 100%;
		height: 180px;
		/*px*/
	}

	.list {
		background-color: #fff;

		ul {
			li {
				font-size: 16px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 88px;
				// width: calc(100% - 32px);
				width: calc(100% - 20px);
				padding-left: 31px;/*px*/
				margin: 30px 0;
				/*px*/
				.checkbox {
					display: inline-block;
					height: 18px;
					width: 18px;
					margin-right: 29px;/*px*/
					background-color: #fff;
					border: 1px solid #999;
					border-radius: 10px;
				}

				.icon {
					display: inline-block;
					height: 20px;
					width: 20px;
					// height: 18px;
					// width: 18px;
					margin-right: 29px;/*px*/
					outline: 0;
					border-radius: 10px;
				}

				.div_img {
					height: 171px;
					/*px*/
					width: 171px;
					/*px*/
					border-radius: 5px;
					overflow: hidden;

					img {
						// width: 44px;
						// height: 44px;
						width: 100%;
						height: 100%;
					}
				}

				.div_home {
					flex: 1;
					border-bottom: 1px solid rgba(240, 240, 240, 1);
					padding: 26px 0;

					/*px*/
					// width:51%;
					.jjName_home {
						height: 100px;

						/*px*/
						.jjName {
							width: 90%;
							height: auto;
							/*px*/
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
							padding: 0 10px;
							font-size: 28px;
							/*px*/
							font-weight: 400;
							line-height: 39px;
							/*px*/
						}
					}

					.div_footer {
						width: 90%;
						margin: auto;
						display: flex;
						align-items: center;
						justify-content: space-between;
					}

					.user_ {
						color: rgba(153, 153, 153, 1);
						line-height: 39px;
						/*px*/
						font-size: 24px;
						/*px*/
						width: 212px;
						/*px*/
						  overflow: hidden;
						  text-overflow: ellipsis;
						    white-space: nowrap;
						.all_btn {}
					}

					// p:last-of-type{
					//     color: #C5C5C5;
					//     font-size: 12px;
					// }
				}
			}
		}
	}

	footer {
		width: 100%;
		position: fixed;

		border-top: 1px solid #f0f0f0;
		/*px*/
		height: 170px;
		/*px*/
		bottom: 0px;
		/*px*/
		// bottom: 0px;/*px*/
		background: white;
		z-index: 100;

		.footer_ {
			// height: 170px;/*px*/
			display: flex;
			align-items: center;
			justify-content: space-between;

			div {
				display: flex;
				align-items: center;
				font-size: 24px;
				/*px*/
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				line-height: 25px;

				/*px*/
				.allcheckbox {
					display: inline-block;
					height: 18px;
					width: 18px;
					margin-right: 10px;
					background-color: #fff;
					border: 1px solid #999;
					border-radius: 10px;
					margin-left: 20px;
					/*px*/
					margin-right: 10px;
					/*px*/
				}

				.allicon {
					display: inline-block;
					height: 20px;
					width: 20px;
					// height: 18px;
					// width: 18px;
					margin-right: 10px;
					/*px*/
					outline: 0;
					border-radius: 10px;
					margin-left: 20px;
					/*px*/
				}
			}

			button {
				// width: 100%;
				width: 288px;
				/*px*/
				border: none;
				color: #fff;
				height: 100px;
				/*px*/
				font-size: 32px;
				/*px*/
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				line-height: 25px;
				/*px*/
				background: -webkit-linear-gradient(136deg,rgba(239,157,253,1),rgba(192,94,255,1));
				/* Safari 5.1 - 6.0 */
				background: -o-linear-gradient(136deg,rgba(239,157,253,1),rgba(192,94,255,1));
				/* Opera 11.1 - 12.0 */
				background: -moz-linear-gradient(136deg,rgba(239,157,253,1),rgba(192,94,255,1));
				/* Firefox 3.6 - 15 */
				background: linear-gradient(136deg,rgba(239,157,253,1),rgba(192,94,255,1));
				/* 标准的语法 */
			}
		}
	}

	.icon-guanbi:before {
		font-size: 8px;
		margin-right: 4px;
	}

	.icon-bofang:before {
		font-size: 10px;
		margin-right: 4px;
		color: #C5C5C5;
		font-weight: bold;
	}
</style>
