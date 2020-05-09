<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-list dense>
                <v-list-item link to="/">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>首页</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/product_list">
                    <v-list-item-action>
                        <v-icon>mdi-cart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>商品管理</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/user_info">
                    <v-list-item-action>
                        <v-icon>mdi-account-box-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>用户管理</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/category_list">
                    <v-list-item-action>
                        <v-icon>mdi-layers-triple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>品类管理</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/order_list">
                    <v-list-item-action>
                        <v-icon>mdi-folder-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>订单管理</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="indigo"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>品牌服饰空中商城管理平台</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer
                color="indigo"
                app
        >
            <span class="white--text">&copy; 2020</span>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        name: "Home",
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
        }),
    }
</script>

<style scoped>

</style>
