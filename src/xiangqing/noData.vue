<template>
    <div>
        <second-Header msgHeader="页面错误"></second-Header>
        <NoData msgHeader="系统错误，找不到路了"></NoData>
    </div>
</template>
<script>
import SecondHeader from '../components/secondHeader'
import NoData from '../components/noData'
export default {
    name: 'noData',
    components: {
        SecondHeader,
        NoData
    },
    data(){
        return {

        }
    },
    created() {
        
    },
    methods: {
        
    },
}
</script>
<style lang="less" scoped>

</style>


