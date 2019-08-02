<template>
  <div>
    <!-- 头部组件 -->
    <Header/>
    <!-- 内容占位组件:组件占位符相当于router-view  -->
    <nuxt />
    <Footer/>
  </div>
</template>
<script>
// 导入头部组件
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
export default {
  // 注册组件
  components:{
    Header,
    Footer
  }
}
</script>

<style>
*{
  margin:0;
  padding:0
}
ul,ol,li{
  list-style:none;
}
a{
  color:inherit;
  text-decoration:none;
}
</style>
