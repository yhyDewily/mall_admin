<template>
    <div>
        <v-radio-group v-model="search_action" row style="width: 60%; margin-left: auto; margin-right: auto">
            <v-radio label="订单号查询" value="1"></v-radio>
        </v-radio-group>
        <v-text-field
                v-model="keyword"
                append-outer-icon="mdi-magnify"
                style="width: 60%; margin-right: auto; margin-left: auto"
                @click:append-outer="searchOrder"
        ></v-text-field>
        <v-btn v-show="search" style="float: right; margin-right: 20px" color="error" @click="resetList">重置</v-btn>
        <div class="order-list-table">
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">订单号</th>
                        <th class="text-left">收件人</th>
                        <th class="text-left">总金额</th>
                        <th class="text-left">订单状况</th>
                        <th class="text-left">生成时间</th>
                        <th class="text-left">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in orderList" :key="index" >
                        <td>{{ item.orderNo }}</td>
                        <td>{{ item.recipient }}</td>
                        <td>{{ item.payment }}</td>
                        <td>
                            {{ item.status_desc }} <v-btn v-show="item.status === 20" text color="success" style="margin-bottom: 5px" @click="send(item.orderNo)">发货</v-btn>
                        </td>
                        <td>{{ item.createTime }}</td>
<!--                        <td>-->
<!--                            <v-btn x-small color="success"  :disabled="item.status === 1" @click="onSale(item.id, 1, index)">上架</v-btn>-->
<!--                            <v-btn x-small color="error" :disabled="item.status === 0" @click="offSale(item.id, 0, index)">下架</v-btn>-->
<!--                        </td>-->
                        <td style="color: rgba(19,139,158,0.99); cursor: pointer" @click="goToOrderDetail(item.orderNo)">
                            查看
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-pagination v-model="page" :length="pagination.itemsLength"
                          total-visible="7" :value="page" @next="loadData(page)"
                          @previous="loadData(page)"
                          @input="loadData(page)"
            ></v-pagination>
    </div>
    </div>
</template>

<script>
    export default {
        name: "Order",
        data: () => ({
            search: false,
            search_action: 0,
            keyword: '',
            page: 1,
            orderList: [],
            totalElements: 0,
            totalNums: 0,
            pagination: {
                page: 1,
                itemsPerPage: 10,
                pageStart: 1,
                pageStop: 5,
                pageCount: 5,
                itemsLength: 0,
            },
        }),
        mounted() {
            this.getOrderList();
        },
        methods:{
          getOrderList(){
              this.$axios.post("/manage/order/list.do", this.$qs.stringify({
                  userId: 1
              })).then(res=>{
                  console.log(res)
                  this.orderList = res.data.data.content
                  this.totalNums = res.data.data.totalPages
                  this.pagination.itemsLength = res.data.data.totalPages;
              })
          },
            loadData(val){
              if(this.search_action === 0) {
                  this.$axios.post("/manage/order/list.do", this.$qs.stringify({
                      userId: 1,
                      pageNum: val
                  })).then(res=>{
                      console.log(res)
                      this.orderList = res.data.data.content
                  })
              } else {
                  this.$axios.post("/manage/order/orderNo_search.do",this.$qs.stringify({
                      userId: 1,
                      keyword: this.keyword,
                      pageNum: val
                  })).then(res=>{
                      this.orderList = res.data.data.content;
                      this.totalNums = res.data.data.totalPages
                      this.pagination.itemsLength = res.data.data.totalPages;
                  })
              }

            },
            goToOrderDetail(val){
                this.$router.push("/order_detail/" + val)
            },
            searchOrder(){
                if(this.keyword === ""){
                    return;
                }
                if(this.search_action === 0) {
                    window.alert("请选择搜索方式")
                    return;
                }
                if(this.search_action === "1") {
                    this.$axios.post("/manage/order/orderNo_search.do",this.$qs.stringify({
                        userId: 1,
                        keyword: this.keyword
                    })).then(res=>{
                        console.log(res)
                        this.search = true
                        this.orderList = res.data.data.content;
                        this.totalNums = res.data.data.totalPages
                        this.pagination.itemsLength = res.data.data.totalPages;
                    })
                }
            },
            send(val) {
              this.$axios.post("/manage/order/send_product.do", this.$qs.stringify({
                  userId: this.$cookie.get("userId"),
                  orderNo: val
              })).then(res=>{
                  if(res.data.status === 0) {
                      window.alert("成功发货")
                      this.orderList = [];
                      this.getOrderList();
                      this.page = 1
                  }
                  else window.alert("发货失败")
              })
            },
            resetList() {
              this.search =false
                this.search_action = 0;
                this.orderList = [];
                this.getOrderList();
            }
        }
    }
</script>

<style scoped>

</style>
