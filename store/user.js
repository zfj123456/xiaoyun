export const state = () => { 
    return {
        userInfo: {
            token: "",
            user: {}
        }
    }
}
// 同步管理数据ss
export const mutations = {
    // 保存用户信息
    setUserInfo(state, data) {
        state.userInfo = data
    },
    // 清除用户信息
    cleanUserInfo(state, info) { 
        if (process.browser) { 
            // 将本地存储的store数据删除
            localStorage.removeItem('userInfo')
        }
        // 重置store中某个方法的数据
        state.userInfo = {};
    }
};
// 异步管理数据
export const actions ={
    login({ commit }, data){ 
        return this.$axios({
            url: "/accounts/login",
            method: 'POST',
            data:data
        }).then(res => { 
            const data = res.data;
            // 保存到state
            commit('setUserInfo', data);
            return data
        })
    }
 }