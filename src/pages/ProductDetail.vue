<template>
    <div>
        <g-c-tip></g-c-tip>
        <div class="title">
            <h2>商品详情</h2>
        </div>
        <div class="product-detail">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                        v-model="product_id"
                        label="商品Id"
                        :disabled="true"
                ></v-text-field>
                <v-text-field
                        v-model="product_name"
                        label="商品名称"
                        required
                        :disabled="isEdit"
                ></v-text-field>
                <v-select
                    :items="grand"
                    label="商品品牌"
                    v-model="product_grandId"
                    required
                    :disabled="isEdit"
                >
                </v-select>
                <v-select
                        :items="categoryList"
                        label="商品种类"
                        v-model="product_categoryId"
                        required
                        :disabled="isEdit"
                >
                </v-select>
                <v-simple-table dense
                style="margin-bottom: 20px">
                    <thead>
                        <tr>
                            <th class="text-left" style="color: rgba(158,158,158,0.99)">商品参数</th>
                            <th class="text-left" style="color: rgba(158,158,158,0.99)">编辑
                                <v-dialog
                                        v-model="dialog"
                                        width="500"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-icon
                                                small
                                                v-on="on"
                                        >
                                            mdi-plus-circle-outline
                                        </v-icon>
                                    </template>

                                    <v-card>
                                        <v-card-title
                                                class="headline grey lighten-2"
                                                primary-title
                                        >
                                            添加商品参数
                                        </v-card-title>
                                        <v-text-field
                                        v-model="new_params"
                                        style="width: 80%; margin-right: auto; margin-left: auto"></v-text-field>
                                        <v-divider></v-divider>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                    color="primary"
                                                    text
                                                    @click="addParams"
                                            >
                                                确认
                                            </v-btn>
                                            <v-btn
                                            color="error"
                                            text
                                            @click="dialog = false">
                                                取消
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in product_params" :key="index">
                            <td style="color: rgba(158,158,158,0.99)">{{ item }}</td>
                            <td>
                                <v-icon
                                        small
                                        class="mr-2"
                                        @click="editParams(index)"
                                >
                                    mdi-pencil
                                </v-icon>
                                <v-icon
                                        small
                                        @click="deleteParams(index)"
                                >
                                    mdi-delete
                                </v-icon>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
                <v-card
                        outlined
                        v-show="isEditParams"
                >
                    <v-text-field
                                  label="编辑参数"
                                  v-model="single_params"
                                  style="width: 90%; margin-left: auto; margin-right: auto;margin-top: 9px"
                    ></v-text-field>
                    <v-btn
                            color="primary"
                            text
                            @click="saveParams"
                    >确定</v-btn>
                    <v-btn
                            color="error"
                            text
                            @click="isEditParams = false"
                    >取消</v-btn>
                </v-card>
                <v-textarea
                        outlined
                        v-model="product_detail"
                        name="input-7-4"
                        label="商品描述"
                        :disabled="isEdit"
                        no-resize
                        style="margin-top: 10px"
                ></v-textarea>
                <v-row>
                    <v-col>
                        <v-text-field
                                v-model="product_price"
                                label="商品价格"
                                required
                                :disabled="isEdit"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                                v-model="product_stock"
                                label="商品库存"
                                required
                                :disabled="isEdit"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
            <v-btn
                class="mr4"
                @click="changeEdit"
                :disabled="!isEdit"
                color="primary"
                style="margin-right: 5px; margin-bottom: 10px">修改信息</v-btn>
            <v-btn
                    color="success"
                    class="mr4"
                    @click="submitChange"
                    v-show="!isEdit"
                    style="margin-bottom: 10px">确认</v-btn>
            <v-btn
                    color="error"
                    class="mr4"
                    @click="changeEdit"
                    v-show="!isEdit"
                    style="margin-bottom: 10px">取消</v-btn>
            <v-divider></v-divider>
            <div class="product-image-title">
                <p>商品主图片</p>
            </div>
            <v-img :src="product_mainImage"
                   height="300px"
                   width="300px"
            lazy-src="/imgs/loading-svg/loading-bars.svg">
            </v-img>
            <v-divider style="margin-bottom: 10px; margin-top: 10px"></v-divider>
            <div class="product-image-title">
                <p>商品副图片</p>
            </div>
            <div class="product-subImage" v-for="(item,index) in product_subImages" :key="index">
                <v-img :src="item" height="300px" width="300px"
                       lazy-src="/imgs/loading-svg/loading-bars.svg"></v-img>
            </div>


        </div>
    </div>
</template>

<script>
    import GCTip from "../components/GCTip";
    export default {
        name: "ProductDetail",
        components: {GCTip},
        data () {
            return {
                dialog: false,
                isEdit: true,
                isEditParams: false,
                single_params: '',
                edit_params_index: 0,
                valid: true,
                new_params: '',
                edit_params: '',
                product_categoryId: '',
                product_detail: '',
                product_grandId: 0,
                product_id: 0,
                product_mainImage: '',
                product_name: '',
                product_price: 0,
                product_params: [],
                product_subtitle: '',
                product_status: 0,
                product_stock:0,
                product_subImages: [],
                grand: [
                    1,2,5,6,7
                ],
                categoryList: [
                    100003, 100004, 100005, 100006, 100007, 100008, 100009,
                    100010, 100011, 100012, 100015, 100016, 100017, 100018
                ]
            }
        },
        mounted() {
            this.getProduct()
        },
        methods: {
            setProductDetail(val) {
                this.product_categoryId = val.categoryId;
                this.product_detail = val.detail;
                this.product_grandId = val.grandId;
                this.product_id = val.id;
                this.product_mainImage = val.mainImage;
                this.product_name = val.name;
                this.product_price = val.price;
                this.product_params = val.params;
                this.product_subtitle = val.subtitle;
                this.product_status = val.status;
                this.product_stock = val.stock;
                this.product_subImages = val.subImages;
            },
            getProduct() {
                this.$axios.post("/manage/product/detail.do", this.$qs.stringify({
                    userId: 1,
                    productId: this.$route.params.id
                })).then(res=>{
                    console.log(res)
                    this.setProductDetail(res.data.data)
                })
            },
            changeEdit() {
                this.isEdit = !this.isEdit
            },
            editParams(val) {
                this.edit_params_index = val;
                this.single_params = this.product_params[val];
                this.isEditParams = true;
            },
            deleteParams(val) {
                if(val>-1) {
                    this.product_params.splice(val, 1);
                }
            },
            addParams() {
                this.product_params.push(this.new_params);
                this.dialog = false;
            },
            saveParams(){
                let i = this.edit_params_index
                this.product_params[i] = this.single_params
                this.isEditParams = false
            },
            submitChange(){
                if(this.product_name === "") {
                    window.alert("请输入商品名")
                    return;
                }
                if(this.product_grandId === 0 ) {
                    window.alert("请选择品牌")
                    return;
                }
                if(this.product_categoryId === 0 ) {
                    window.alert("请选择种类")
                    return;
                }
                if(this.product_price === 0) {
                    window.alert("请输入商品价格")
                    return;
                }
                this.$axios.post("/manage/product/save.do", this.$qs.stringify({
                    userId: 1,
                    categoryId: this.product_categoryId,
                    detail: this.product_detail,
                    grandId: this.product_grandId,
                    id : this.product_id,
                    mainImage : this.product_mainImage,
                    name : this.product_name,
                    price : this.product_price,
                    params : this.product_params,
                    subtitle: this.product_subtitle,
                    status : this.product_status,
                    stock :this.product_stock,
                    subImages:this.product_subImages,
                })).then(res=>{
                    console.log(res)
                    this.isEdit = false;
                    history.go(0);
                })
            }
        }
    }
</script>

<style scoped>
.product-detail {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
}
    .title {
        text-align: center;
        margin-bottom: 15px;
        margin-top: 15px;
    }
    .product-image-title {
        margin-top: 13px;
     }
    .product-subImage {
        margin-right: 12px;
        display: inline-block;
        flex-direction: column;
    }
</style>
