<template>
    <div>
        <g-c-tip></g-c-tip>
        <v-radio-group v-model="search_action" row style="width: 60%; margin-left: auto; margin-right: auto">
            <v-radio label="商品名查询" value="1"></v-radio>
            <v-radio label="商品Id查询" value="2"></v-radio>
            <v-radio label="商品种类Id查询" value="3"></v-radio>
            <v-radio label="商品品牌Id查询" value="4"></v-radio>
        </v-radio-group>
        <v-text-field
                v-model="keyword"
                append-outer-icon="mdi-magnify"
                style="width: 60%; margin-right: auto; margin-left: auto"
                @click:append-outer="searchProduct"
        ></v-text-field>
        <div class="product-list-table">
           <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Id</th>
                            <th class="text-left">名称</th>
                            <th class="text-left">副标题</th>
                            <th class="text-left">品牌Id</th>
                            <th class="text-left">种类Id</th>
                            <th class="text-left">价格</th>
                            <th class="text-left">已售</th>
                            <th class="text-left">库存</th>
                            <th class="text-left">上下架</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in productList" :key="index" >
                            <td @click="goToDetail(item.id)">{{ item.id }}</td>
                            <td @click="goToDetail(item.id)">{{ item.name }}</td>
                            <td @click="goToDetail(item.id)">{{ item.subtitle }}</td>
                            <td @click="goToDetail(item.id)">{{ item.grandId }}</td>
                            <td @click="goToDetail(item.id)">{{ item.categoryId }}</td>
                            <td @click="goToDetail(item.id)">{{ item.price }}</td>
                            <td @click="goToDetail(item.id)">{{ item.sold }}</td>
                            <td @click="goToDetail(item.id)">{{ item.stock }}</td>
                            <td>
                                <v-btn x-small color="success"  :disabled="item.status === 1" @click="onSale(item.id, 1, index)">上架</v-btn>
                                <v-btn x-small color="error" :disabled="item.status === 0" @click="offSale(item.id, 0, index)">下架</v-btn>
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
    import GCTip from "../components/GCTip";
    export default {
        name: "Product",
        components: {GCTip},
        data() {
            return{
                keyword: '',
                initial: true,
                search_action: 0,
                row: null,
                dense:false,
                page: 1,
                productList: [],
                totalElements: 0,
                totalNums: 0,
                pagination: {
                    page: 1,
                    itemsPerPage: 15,
                    pageStart: 1,
                    pageStop: 5,
                    pageCount: 5,
                    itemsLength: 0,
                },
            }
        },
        mounted() {
            this.getProductList()
        },
        methods: {
            getProductList(){
                this.$axios.post("/manage/product/list.do", this.$qs.stringify({
                    userId: 1
                })).then(res=>{
                    console.log(res);
                    this.productList = res.data.data.content;
                    this.pagination.itemsLength = res.data.data.totalPages;
                })
            },
            loadData(val){
                if(this.search_action === "1" && this.keyword !== ""){
                    this.$axios.post("/manage/product/search.do",this.$qs.stringify({
                        userId : 1,
                        productName: this.keyword,
                        pageNum: val,
                        pageSize: 10
                    })).then(res=>{
                        this.productList = res.data.data.content;
                        this.pagination.itemsLength = Math.floor(res.data.data.totalElements/10);
                    })
                } else if(this.search_action === "2" && this.keyword !== "") {
                    this.$axios.post("/manage/product/id_search.do",this.$qs.stringify({
                        userId: 1,
                        productId: this.keyword,
                        pageNum: val
                    })).then(res=>{
                        console.log(res)
                        if(res.data.status === 1) window.alert(res.data.msg)
                        else{
                            this.productList = []
                            this.productList.push(res.data.data)
                        }
                    })
                } else if(this.search_action === "3" && this.keyword !== "") {
                    this.$axios.post("/manage/product/category_search.do", this.$qs.stringify({
                        userId:1,
                        categoryId: this.keyword,
                        pageNum: val
                    })).then(res=>{
                        this.productList = res.data.data.content;
                        this.pagination.itemsLength = Math.floor(res.data.data.totalElements/10);
                    })
                } else if(this.search_action === "4" && this.keyword !== "") {
                    this.$axios.post("/manage/product/grand_search.do",this.$qs.stringify({
                        userId:1,
                        grandId: this.keyword,
                        pageNum: val
                    })).then(res=>{
                        this.productList = res.data.data.content;
                        this.pagination.itemsLength = Math.floor(res.data.data.totalElements/10);
                    })
                } else {
                    this.$axios.post("/manage/product/list.do", this.$qs.stringify({
                        userId: 1,
                        pageNum: val
                    })).then(res=>{
                        console.log(res);
                        this.productList = res.data.data.content;
                    })
                }
            },
            goToDetail(val){
                this.$router.push("/product_detail/" + val)
            },
            onSale(val, index) {
                this.$axios.post("/manage/product/set_sale_status.do", this.$qs.stringify({
                    userId: 1,
                    productId: val,
                    status: 1
                })).then(res=>{
                    console.log(res);
                    console.log(this.productList[index])
                    if(res.data.status === 0) this.productList[index].status = !this.productList[index]
                    history.go(0)
                })
            },
            offSale(val, index) {
                this.$axios.post("/manage/product/set_sale_status.do", this.$qs.stringify({
                    userId: 1,
                    productId: val,
                    status: 0
                })).then(res=>{
                    console.log(res);
                    console.log(this.productList[index])
                    if(res.data.status === 0) this.productList[index].status = !this.productList[index]
                    history.go(0)
                })
            },
            changeStatus(val, status, index) {
                this.$axios.post("/manage/product/set_sale_status.do", this.$qs.stringify({
                    userId: 1,
                    productId: val,
                    status: status
                })).then(res=>{
                    console.log(res);
                    console.log(this.productList[index])
                    if(res.data.status === 0) this.productList[index].status = !this.productList[index]
                })
            },
            searchProduct() {
               if(this.keyword === ""){
                   return;
               }
               if(this.search_action === 0) {
                   window.alert("请选择搜索方式")
                   return;
               }
               //1.商品名查询 2.商品Id查询 3.商品种类Id查询 4.商品品牌Id查询 5.商品上下架查询查询
               if(this.search_action === "1") {
                   this.$axios.post("/manage/product/search.do",this.$qs.stringify({
                       userId : 1,
                       productName: this.keyword,
                       pageSize: 10
                   })).then(res=>{
                       this.productList = res.data.data.content;
                       this.pagination.itemsLength = Math.floor(res.data.data.totalElements/10);
                   })
               } else if(this.search_action === "2") {
                   if(isNaN(this.keyword)) {
                       window.alert("请输入数字")
                       return;
                   }
                    this.$axios.post("/manage/product/id_search.do",this.$qs.stringify({
                        userId: 1,
                        productId: this.keyword
                    })).then(res=>{
                        console.log(res)
                        if(res.data.status === 1) window.alert(res.data.msg)
                        else{
                            this.productList = []
                            this.productList.push(res.data.data)
                        }
                    })
               } else if(this.search_action === "3") {
                   if(isNaN(this.keyword)){
                       window.alert("请输入数字")
                       return;
                   }
                   this.$axios.post("/manage/product/category_search.do", this.$qs.stringify({
                       userId:1,
                       categoryId: this.keyword
                   })).then(res=>{
                       this.productList = res.data.data.content;
                       this.pagination.itemsLength = Math.floor(res.data.data.totalElements/10);
                   })
               } else if(this.search_action === "4") {
                   if(isNaN(this.keyword)){
                       window.alert("请输入数字")
                       return;
                   }
                   this.$axios.post("/manage/product/grand_search.do",this.$qs.stringify({
                       userId:1,
                       grandId: this.keyword
                   })).then(res=>{
                       console.log(res)
                       this.productList = res.data.data.content;
                       this.pagination.itemsLength = Math.floor(res.data.data.totalElements/10);
                   })
               }
            }
        },

    }
</script>

<style scoped>
    .v-datatable__actions__select .v-select {
        margin:13px 0 !important;
    }
   .v-datatable__actions__range-controls button {
       display: none !important;
   }
</style>
