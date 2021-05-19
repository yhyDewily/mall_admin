<template>
    <div>
        <g-c-tip></g-c-tip>
        <div class="title">
            <h2>新增商品</h2>
        </div>
        <div class="new-product">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                        v-model="product_name"
                        label="商品名称"
                        required
                ></v-text-field>
                <v-select
                        :items="grand"
                        label="商品品牌"
                        v-model="product_grandId"
                        required
                >
                </v-select>
                <v-select
                        :items="categoryList"
                        label="商品种类"
                        v-model="product_categoryId"
                        required
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
                        no-resize
                        style="margin-top: 10px"
                ></v-textarea>
                <v-row>
                    <v-col>
                        <v-text-field
                                v-model="product_price"
                                label="商品价格"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                                v-model="product_stock"
                                label="商品库存"
                                required
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
            <v-btn color="success" @click="submitProduct">提交</v-btn>
        </div>
    </div>
</template>

<script>
    import GCTip from "../components/GCTip";

    // var formData = new FormData()
    export default {
        name: "ProductEdit",
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
                    100010, 100011, 100012, 100013, 100014, 100015, 100016,
                    100017, 100018
                ]
            }
        },
        methods: {
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
                this.new_params = ""
                this.dialog = false;
            },
            saveParams(){
                let i = this.edit_params_index
                this.product_params[i] = this.single_params
                this.isEditParams = false
            },
            submitProduct() {
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
                // formData.append('file', document.querySelector('input[type=file]').files[0])
                this.$axios.post("/manage/product/save.do", this.$qs.stringify({
                    userId: 1,
                    categoryId: this.product_categoryId,
                    detail: this.product_detail,
                    grandId: this.product_grandId,
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
                    if(res.data.status === 0) {
                        window.alert("新增产品成功")
                        this.$router.push("/product_list")
                    } else{
                        window.alert("新增产品失败，请稍后重试")
                    }

                })
            }
        }
    }
</script>

<style scoped>
    .title {
        text-align: center;
        margin-bottom: 15px;
        margin-top: 15px;
    }
    .new-product {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 30px;
    }
</style>
