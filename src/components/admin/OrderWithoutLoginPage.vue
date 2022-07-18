<template>
  <div>
    <h1 class="text-center">Đơn hàng không phải thành viên</h1>
    <table class="table table-bordered tableOrders">
      <thead class="headTableOrders">
        <tr>
          <th>STT</th>
          <th>Mã đơn hàng</th>
          <th>Tổng tiền</th>
          <th>Tình trạng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in orders" :key="index" >
            <td>{{ index + 1 }}</td>
            <td @click="showInfo(index)">{{ item.id }}
              <table class="table tableShowOrderDetail" v-if="indexToShow == index">
                <thead>
                  <tr>
                    <th>Tên KH</th>
                    <th>SDT</th>
                    <th>Địa chỉ</th>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowspan="20">{{item.data.name}}</td>
                    <td rowspan="20">{{item.data.phone}}</td>
                    <td rowspan="20">{{item.data.address}}</td>
                  </tr>
                  <tr v-for="(sp, index) in item.data.cart" :key="index">
                     <td style="width:10%">
                      {{sp.name}}
                    </td>
                    <td>${{Number(sp.price).toLocaleString()}}</td>
                  </tr>
                </tbody>
              </table>

            </td>
            <td>
              ${{Number(item.data.total).toLocaleString()}}
            </td>
            <td style="width: 30%">
              <select
                style="width: 60%; margin: auto"
                class="form-control"
                name=""
                id=""
                v-model="item.data.status"
                @change="changeStatus(item.id, item.data.status)"
              >
                <option :value="0">Đang chờ xử lý</option>
                <option :value="1">Đang giao hàng</option>
                <option :value="2">Hoàn tất</option>
                <option :value="3">Đã hủy</option>
              </select>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props:['orders','users'],
  data(){
    return {
      indexToShow: -1,
      userInfoToShow: null,
    }
  },
  mounted(){
    console.log(this.orders)
  },
  methods:{
    showInfo(index){
      console.log('hello');
      if(this.indexToShow == index){
        this.indexToShow = -1
      }
      else{
        this.indexToShow=index;
      }
    },
    changeStatus(orderId, status){
      //type = 0: Orders without Login
      //type = 1: Orders with member
      let data = {
        orderId,
        status,
        type: 0
      }
      this.$emit('updateStatusOrders',data)
    }
  }
}
</script>

<style>
.tableShowOrderDetail thead tr th{
  width: 7%;
}
</style>