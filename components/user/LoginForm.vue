<template>
    <el-form
    :model="form"
    ref="form"
    :rules="rules"
    class="form">
        <el-form-item class='form-item'  prop="username">
            <el-input
            placeholder="用户名/手机"
            v-model="form.username"
           >
            </el-input>
        </el-form-item>
        <el-form-item class="from-item" prop="password">
            <el-input
            placeholder="密码"
            v-model="form.password"
            >
            </el-input>
        </el-form-item>
        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>
        <el-button
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>
</template>
<script>
export default {
    data(){
        return{
            // 表单数据
            form:{
                username:"13800138000",
                password:'123456'
            },
            // 表单规则
            rules:{
                username:[
                    {
                        required:true,
                        message:'用户名不能为空',
                        trigger:'blur'
                    }
                ],
                password:[
                    {
                        required:true,
                        message:'密码不能为空',
                        trigger:'blur'
                    }
                ]
            }
        }
    },

    methods:{
        handleLoginSubmit(){
            // console.log(this.form)
            this.$refs['form'].validate((valid)=>{
                // 判断valid值是否true true表示没有错误
                if(valid){
                    // this.$axios({
                    //     url:"/accounts/login",
                    //     method:'POST',
                    //     data:this.form
                    // }).then(res=>{
                    //     console.log(res.data)
                    // })
                    // 调用store存储的数据实现登陆
                    this.$store.dispatch('user/login',this.form).then(res=>{
                        // 成功提示
                        this.$message({
                            message:'登录成功,正在跳转',
                            type:'success'
                        })
                        // 路由跳转
                        setTimeout(()=>{
                            this.$router.replace('/')
                        },1000)
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
