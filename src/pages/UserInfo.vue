<template>
    <div><v-container fluid>
        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <v-card>
                <v-card-title class="headline">是否确认设为管理员?</v-card-title>

                <v-card-text>
                    设为管理员后不可撤销操作，是否要继续？
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="success"
                            text
                            @click="setAdmin"
                    >
                        确认
                    </v-btn>

                    <v-btn
                            color="error"
                            text
                            @click="changeDialog"
                    >
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-data-iterator
                :items="items"
                :items-per-page.sync="itemsPerPage"
                :page="page"
                hide-default-footer
        >
            <template v-slot:default="props">
                <v-row>
                    <v-col
                            v-for="item in props.items"
                            :key="item.name"
                            cols="12"
                            sm="6"
                            md="4"
                            lg="3"
                    >
                        <v-card>
                            <v-card-title class="subheading font-weight-bold">{{ item.name }}
                                <v-spacer></v-spacer>
                                <v-btn  color="success" v-show="item.role==='普通用户'" @click.stop="setAnotherUser(item.id)">设为管理员</v-btn>
                            </v-card-title>
                            <v-divider></v-divider>

                            <v-list dense>
                                <v-list-item
                                        v-for="(key, index) in filteredKeys"
                                        :key="index"
                                >
                                    <v-list-item-content :class="{ 'blue--text': sortBy === key.value }">{{ key.text }}:</v-list-item-content>
                                    <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === key.value }">{{ item[key.value] }}</v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </template>

            <template v-slot:footer>
                <v-row class="mt-2" align="center" justify="center">
                    <v-spacer></v-spacer>

                    <span
                            class="mr-4
            grey--text"
                    >
            Page {{ page }} of {{ numberOfPages }}
          </span>
                    <v-btn
                            fab
                            dark
                            color="blue darken-3"
                            class="mr-1"
                            @click="formerPage"
                    >
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn
                            fab
                            dark
                            color="blue darken-3"
                            class="ml-1"
                            @click="nextPage"
                    >
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-row>
            </template>
        </v-data-iterator>
    </v-container></div>
</template>

<script>
    export default {
        name: "User_Info",
        data () {
            return {
                itemsPerPageArray: [4, 8, 12],
                dialog: false,
                another_user: 0,
                search: '',
                filter: {},
                sortDesc: false,
                page: 1,
                itemsPerPage: 4,
                sortBy: 'name',
                numberOfPages: 0,
                keys: [
                    { text: '用户昵称', value: 'Name'},
                    { text: 'id', value: 'id'},
                    { text: '邮箱', value: 'email'},
                    { text: '密保问题', value: 'question'},
                    { text: '密保答案', value: 'answer'},
                    { text: '手机', value: 'phone'},
                    { text: '性别', value: 'sex'},
                    { text: '身份', value: 'role'},
                ],
                items: [

                ],
            }
        },
        computed: {
            filteredKeys () {
                return this.keys.filter(key => key.value !== `Name`)
            },
        },
        mounted() {
            this.getUserList()
        },
        methods: {
            nextPage () {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },
            formerPage () {
                if (this.page - 1 >= 1) this.page -= 1
            },
            getUserList() {
                this.$axios.post("/manager/user/list.do", this.$qs.stringify({
                    userId:1
                })).then(res=>{
                    console.log(res)
                    let userList = res.data.data.content;
                    this.numberOfPages = res.data.data.totalPages;
                    for (let i =0;i<userList.length;i++) {
                        let sex = ""
                        let role = ""
                        if(userList[i].sex === 1) sex = "男";
                        else sex = "女"
                        if(userList[i].role === 1) role = "管理员";
                        else role = "普通用户"
                        this.items.push({
                            name:userList[i].username,
                            id : userList[i].id,
                            email :userList[i].email,
                            question: userList[i].question,
                            answer: userList[i].answer,
                            phone: userList[i].phone,
                            sex: sex,
                            role: role
                        })
                    }
                })
            },
            setAnotherUser(val) {
                this.dialog = true
                this.another_user = val
            },
            setAdmin() {
                this.$axios.post("/manager/user/add_admin.do", this.$qs.stringify({
                    userId: 1,
                    another_user: this.another_user
                })).then(res=>{
                    console.log(res)
                })
                this.dialog = false
            },
            changeDialog(){
                this.dialog = false
            }
        },
    }
</script>

<style scoped>

</style>
