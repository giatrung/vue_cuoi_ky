<template>
  <div>
     <table class="table table-bordered text-center">
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã đơn hàng</th>
                <th>Tình trạng</th>
                <th>Thời gian</th>
                <th>#</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in orders" :key="index" >
                <td>{{index + 1}}</td>
                <td>{{item.orderId}}</td>
                <td>
                    <button class="btn btn-primary" v-if="item.data.status ==0">Đang chờ xử lý..</button>
                    <button class="btn btn-warning" v-if="item.data.status ==1">Đang giao hàng..</button>
                    <button class="btn btn-success" v-if="item.data.status ==2">Hoàn thành</button>
                    <button class="btn btn-danger" v-if="item.data.status ==3">Đã hủy..</button>
                </td>
                <td>
                    {{new Date(item.data.createdAt).getDate()+"-"+ new Date(item.data.createdAt).getMonth()+"-"+ new Date(item.data.createdAt).getFullYear()}}
                </td>
                <td>
                    <button class="btn btn-danger" :disabled = "item.data.status !=0" @click="removeOrder(item.orderId)">Hủy</button>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
    props:['orders'],
    mounted(){
    },
    methods:{
        removeOrder(orderId){
            let data= {
                orderId,
                status: 4
            }
            console.log(data)
            this.$store.dispatch('updateOrders',data)
        }
    }
}
</script>

<style>

</style>