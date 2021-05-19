<template>
    <div class="tips-for-id">
        <v-row>
            <v-col>
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                                color="primary"
                                dark
                                v-on="on"
                        >
                           查看品牌对应Id
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                                v-for="(item, index) in grandList"
                                :key="index"
                        >
                            <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
            <v-col>
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                                color="primary"
                                dark
                                v-on="on"
                        >
                            查看男装对应Id
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                                v-for="(item, index) in maleCategory"
                                :key="index"
                        >
                            <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
            <v-col>
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                                color="primary"
                                dark
                                v-on="on"
                        >
                            查看女装对应Id
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                                v-for="(item, index) in femaleCategory"
                                :key="index"
                        >
                            <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "GCTip",
        data() {
            return{
                grandList: [
                    "1--耐克(Nike)",
                    "2--阿迪达斯(Adidas)",
                    "5--优衣库(Uniqlo)",
                    "6--美特斯邦威(MetersBone)",
                    "7--萨拉(Zara)"
                ],
                maleCategory: [
                    "100003--男式西装",
                    "100005--男式T恤",
                    "100007--男式毛衣",
                    "100009--男式牛仔裤",
                    "100011--男式休闲裤",
                    "100013--男式外套",
                    "100015--男式运动裤",
                    "100017--男式羽绒服",
                ],
                femaleCategory: [
                    "100004--裙子",
                    "100006--女式T恤",
                    "100008--女式毛衣",
                    "100010--女式牛仔裤",
                    "100012--女式休闲裤",
                    "100014--女式外套",
                    "100016--女式运动裤",
                    "100018--女式羽绒服",
                ]
            }
        }
    }
</script>

<style scoped>
.tips-for-id {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}
</style>
