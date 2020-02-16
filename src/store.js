import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

let cars = JSON.parse(localStorage.getItem("shopcars")) || [];

let store = new Vuex.Store({
  state: {  //this.$store.state.***
    cars  //购物车中商品的数据，里面是对象 {id:商品的id count:商品的数量 price:商品的单价 select:选中标记}
  },
  mutations: {//this.$store.commit('方法名','唯一的参数')
    addCar(state, car) {
      let flag = false
      state.cars.some(item => {
        if (item.id == car.id) {
          item.count += car.count;
          flag = true;
          return true;
        }
      });
      if (!flag) {
        state.cars.push(car);
      }

      localStorage.setItem("shopcars", JSON.stringify(state.cars));
    },
    updateCar(state, car) {
      state.cars.some(item => {
        if (item.id == car.id) {
          item.count = car.count;
          localStorage.setItem("shopcars", JSON.stringify(state.cars));
          return true;
        }
      })
    },
    removeCar(state, id) {
      state.cars.forEach((item, i) => {
        if (item.id == id) {
          state.cars.splice(i, 1);
          return true;
        }
      })

      localStorage.setItem("shopcars", JSON.stringify(state.cars));
    },
    updateCarStatus(state, car) {
      state.cars.some(item => {
        if (item.id == car.id) {
          item.select = car.select;
          localStorage.setItem("shopcars", JSON.stringify(state.cars));
          return true;
        }
      })
    }
  },
  getters: {  ////this.$store.getters.***  
    totalCount(state) {
      let count = 0;
      state.cars.forEach(item => {
        count += item.count;
      })

      return count;
    },
    totalCarObject(state) {
      var obj = {};
      state.cars.forEach(item => {
        obj[item.id] = item.count
      });
      return obj;
    },
    totalCarObjectSelect(state) {
      var obj = {};
      state.cars.forEach(item => {
        obj[item.id] = item.select
      });
      return obj;
    },
    selectCarCountAndAmount(state) {
      let obj = { count: 0, amount: 0 };
      state.cars.forEach(item => {
        if (item.select) {
          obj.count += item.count;
          obj.amount += item.price * item.count;
        }
      });
      return obj;
    }
  }
})

export default store