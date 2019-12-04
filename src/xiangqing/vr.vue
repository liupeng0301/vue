<template>
	<div>
		<!-- <second-Header msgHeader="VR演示" showIcon=false></second-Header> -->
		 <SecondHeader msgHeader="VR演示"></SecondHeader>
		<iframe :src="url" class="ifm" scrolling="yes" ref="nana"/>
	</div>
</template>

<script>
	import SecondHeader from '../components/secondHeader'
	export default{
		data(){
			return {
				url:this.$route.query.vrurl,
			}
		},
		mounted(){
				let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			// this.$refs.nana.style.height = h + 'px';
			this.$refs.nana.style.height = `${h-60}px`;
		},
		components: {
			SecondHeader
		},
	}
</script>

<style lang="scss" scoped>
	.ifm{
		width: 100%;
		height: 100%;
		border: none;
		
	}
</style>
