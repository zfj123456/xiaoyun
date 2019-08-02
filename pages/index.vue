<template>
  <div class="contaniner">
    <!-- 轮播图 -->
    <!-- element-ui 走马灯组件 (可切换箭头)-->
    <el-carousel :interval="5000" arrow="always">
      <!--更改el-carousel-item 标签的v-for 循环遍历动态数据-->
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
      background:url(${$axios.defaults.baseURL+item.url})center center no-repeat;
      background-size:contain contain;
      `"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!--搜索框整体  -->
    <div class="banner-content">
      <div class="search-bar">
         <!-- tab栏 -->
         <el-row
         type="flex"
         class="search-tab">
          <!-- 在span标签动态生成数据 -->
           <!-- tab栏哪一个i标签被选中,就将currentOption的值赋值给哪一个 -->
           <span v-for="(item,index) in options"
           :key="index"
           :class="{active:index===currentOption}"
           @click="handeOption(index)">
           <!-- 将动态生成的数据item.name的值用插值表达式生成在i标签中  i标签未初始化-->
             <i>
               {{item.name}}
             </i>
           </span>
         </el-row>
         <!-- 搜索框 -->
          <el-row
          type="flex"
          align="middle"
          class="search-input">
          <!--tab栏的currentOption值为0时,将palceholder进行修改 -->
          <!-- 绑定placeholder数据.更改搜索框的默认渲染.同时依靠currentOption的值渲染与tab栏相对应的数据 -->
          <!-- 双向绑定数据.获取用户输入数据用于后期业务逻辑判断 -->
          <!-- 绑定回车按键.增加用户体验. -->
            <input
            :placeholder="options[currentOption].placeholder"
            v-model="searchValue"
            @keyup.enter="handleSearch"/>
            <i class="el-icon-search" @click="handleSearch"></i>
          </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: [],
      // tab栏数据
      options:[
        // name:为tab栏i标签内容 | placeholder为对应搜索框内容 | pageUrl用户在指定的搜索框输入内容,路由跳转
        {
          name:"攻略",
          placeholder:"请输入想要去的城市",
          pageUrl:"/post?city="
        },
        {
          name:"酒店",
          placeholder:"请输入城市搜索酒店",
          pageUrl:"/hotel?city="
        },
        {
          name:"机票",
          placeholder:"请输入想要去的城市",
          pageUrl:"/air"
        }
      ],
      //tab栏被选中的选项赋值为0,,tab栏和搜索框的变化依靠这个数据
      currentOption:0,
      // 搜索框的值
      searchValue:""
    };
  },
  // 生命周期hook函数
  mounted() {
    // 通过axios获取轮播图数据
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      const { data } = res.data;
      this.banners = data;
    });
  },
  methods: {
    //tab栏绑定的事件处理函数,将index传入事件处理函数中,点击一个选项对应的搜索框随着变换
    handeOption(index){
      // 设置当前的tab
      this.currentOption=index;
      // 点击tab栏机票选项跳转至机票页面
      const item =this.options[index];
      if(item.name==="机票"){
        console.log(item)
        return this.$router.push(item.pageUrl)
      }
    },
    //搜索框事件处理函数 
    handleSearch(){
      console.log(this.$store.state.user)
      const item =this.options[this.currentOption]
      this.$router.push(item.pageUrl+this.searchValue);
    },
  }
};
</script>
<style lang="less" scoped>
.contaniner {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }
  .banner-image {
    width: 100%;
    height: 100%;
  }
  .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;

        .search-bar{
            width:552px;
            margin:0 auto;
        }

        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{background: #eee;
                }
            }

            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }

        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;

            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }

            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
  }
}
</style>