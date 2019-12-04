<template>
	<div class="ceshi">
		<secondHeader msgHeader="测试插槽"></secondHeader>
		<daishan :daishan="xianshi"></daishan>
		<button @click="xians"></button>
		<div class="sdasd">
			大的吧阿萨德
		</div>
	</div>
</template>

<script>
	import secondHeader from "../components/secondHeader.vue";
	import daishan from "../components/daishan.vue";
	export default{
		data(){
			return{
				xianshi:false
			}
		},
		components:{
			secondHeader,
			daishan
		},
		methods:{
			xians(){
				this.xianshi = true;
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ceshi{
		.sdasd{
			width: 300px;/*px*/
			height: 200px;/*px*/
			background: greenyellow;
			font-size: 32px;/*px*/
		}
	}
</style>
