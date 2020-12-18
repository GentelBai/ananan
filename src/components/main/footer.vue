<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-submenu :index="'/login'">
            <template>
                <i class="el-icon-location"></i>
                <span>用户管理</span>
            </template>
            <el-menu-item :index="'/index'">
                <template>
                    <i class="el-icon-tools"></i>
                    <span>用户列表</span>
                </template>
            </el-menu-item>
        </el-submenu>
    </el-menu>
    

    
</template>