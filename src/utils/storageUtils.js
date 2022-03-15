/*
对local数据进行存储
*/
import store from 'store'
const USER_KEY = "user_key"
const storage={
    // 保存User
    saveUser(user) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    getUser() {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY)|| {}
    },
    removerUser() {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}
export default storage