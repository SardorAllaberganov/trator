<template>
    <div>
        <div class="wrapper">
            <div id="sidebar">
                <div>
                    <img src="../assets/images/logo.svg" alt="">
                </div>
                <ul class="dashboard-links">
                    <li>
                        <router-link :to="{ path: '/dashboard-supplier/products'}"> <span>Products</span> </router-link>
                    </li>
                    <li>
                        <router-link to="/dashboard-supplier/orders"> <span>Orders</span> </router-link>
                    </li>
                    <!-- <li>
                        <router-link to="/products"> <span>products</span> </router-link>
                    </li>
                    <li>
                        <router-link to="/products"> <span>products</span> </router-link>
                    </li>
                    <li>
                        <router-link to="/products"> <span>products</span> </router-link>
                    </li> -->
                </ul>
            </div>
            <div class="main">
                <nav class="navbar">
                    <ul>
                        <li @click="sidebarToggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </li>
                        <li id="dropdownToggle" @click="dropdownToggle">
                            {{ userData.first_name + ' ' + userData.last_name }}
                        </li>
                    </ul>
                    <div id="dropdown">
                        <button @click="logout">Logout</button>
                    </div>
                </nav>
                <template>
                    <router-view></router-view>
                </template>
                <!-- <router-view></router-view> -->
            </div>
        </div>
        <!--<h1>{{ userData.id }}</h1>
        <h1>{{ userData.first_name }}</h1>
        <h1>{{ userData.last_name }}</h1> -->
    </div>
</template>

<style lang="scss" scoped>
    
</style>

<script>
import { mapState } from 'vuex'
import dropdownToggle from '../assets/js/custom.js'
import sidebarToggle from '../assets/js/custom.js'



export default {
    extends: dropdownToggle,sidebarToggle,
    methods:{
        logout: function () {
            this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/')
            })
        }
    },
    
    beforeCreate(){
        this.$store.dispatch("getUserDetail")
        .then(()=>{
        });
    },
    computed: mapState(['userData'])
}
</script>
