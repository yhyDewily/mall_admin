<template>
    <div>
        <div class="order-detail" style="width: 80%;
        margin-left: auto; margin-right: auto; margin-top: 20px">
            <v-card outlined>
                <v-card-title class="subheading font-weight-bold">订单详情</v-card-title>

                <v-divider></v-divider>

                <v-list dense>
                    <v-list-item>
                        <v-list-item-content>订单号:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ orderNo }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>创建时间:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ createTime }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>收件人:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ recipient }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>手机号:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ mobile }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>订单状态:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ statusDesc }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>支付方式:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ paymentType }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>订单金额:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ payment }}</v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </div>
        <div class="orderItem-list-table">
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">商品图片</th>
                        <th class="text-left">商品名称</th>
                        <th class="text-left">商品副标题</th>
                        <th class="text-left">单价</th>
                        <th class="text-left">数量</th>
                        <th class="text-left">合计</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in orderItemList" :key="index" >
                        <td>
                            <v-img :src="item.productImage" height="50px" width="50px"
                                   lazy-src="/imgs/loading-svg/loading-bars.svg"></v-img>
                        </td>
                        <td>{{ item.productName }}</td>
                        <td>{{ item.productSubtitle }}</td>
                        <td>
                            {{ item.currentUnitPrice }}
                        </td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.totalPrice }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderDetail",
        data: ()=>({
            orderNo: 0,
            payment: 0,
            paymentType: "",
            statusDesc: "",
            createTime: "",
            recipient: "",
            address: "",
            mobile: "",
            orderItemList: []
        }),
        mounted() {
            this.setOrderNo();
            this.getOrderDetail();
        },
        methods:{
            setOrderNo() {
                this.orderNo = this.$route.params.orderNo
            },
            getOrderDetail() {
              this.$axios.post("/manage/order/detail.do",this.$qs.stringify({
                  userId: 1,
                  orderNo: this.orderNo
              })).then(res=>{
                  this.payment = res.data.data.payment;
                  this.paymentType = res.data.data.paymentTypeDesc;
                  this.statusDesc = res.data.data.statusDesc;
                  this.createTime = res.data.data.createTime;
                  this.recipient = res.data.data.recipient;
                  this.address = res.data.data.addressVo.address;
                  this.mobile = res.data.data.addressVo.mobile;
                  this.orderItemList = res.data.data.orderItemVoList
              })
          }
        }
    }
</script>

<style scoped>
    .orderItem-list-table {
        width: 80%;
        margin-right: auto;
        margin-left: auto;
    }
</style>
