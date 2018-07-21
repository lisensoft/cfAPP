import { localStorageTool } from '@/utils'
import { carList } from '@/api/user'
const getCurrentC = function() {
  const { currentCity } = localStorageTool.getLocalStorage('currentCity') // 获取LocalStorage值
  if (currentCity) { // 地区有数据 赋值
    return JSON.parse(currentCity)
  } else { // 没有地区 赋值上海地区
    return { city: '上海', id: '11' }
  }
}
const cheFuData = {
  state: {
    currentCity: getCurrentC(), // 当前城市
    myDefaultCar: {} // 用户默认车辆
  },
  mutations: {
    SET_CURRENTCITY: (state, currentCity) => {
      state.currentCity = currentCity
    },
    SET_myDefaultCar: (state, car) => {
      state.myDefaultCar = car
    }
  },

  actions: {
    // 滚动到界面之前距离
    scrollTo: ({ commit }, route) => {
      if (route.meta.scrollTop) {
        document.getElementsByClassName('view-router')[0].scrollTop = route.meta.scrollTop
      }
    },
    getDefaultCar: ({ commit }) => {
      const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值用户信息
      if (userInfo) { // 获取用户信息、
        const user = JSON.parse(userInfo)
        carList({ pageNo: 1, pageSize: 9999, ownerId: user.id, defaultCar: 1 }).then((data) => {
          if (data.page.records.length > 0) {
            commit('SET_myDefaultCar', data.page.records[0])
          }
        })
      } else {
        commit('SET_myDefaultCar', {})
      }
    }
  }
}

export default cheFuData
