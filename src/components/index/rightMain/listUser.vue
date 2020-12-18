<template>
    <div style="width:98%;margin-left:1%;">
        <div class="rigthSearch">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div>
            <template>
                <el-table
                    :data="tableData"
                    barder
                    style="width: 100%">
                     <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="loginname"
                        label="用户名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="userType"
                        label="用户类型">
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>
<script>
export default{
	data() {
        return {
            tableData:[{
                name: '王小虎',
                loginname: '33333',
                usetType: '4'
            }, {
                name: '王大虎',
                loginname: '33333',
                usetType: '4'
            }, {
                name: '王二虎',
                loginname: '33333',
                usetType: '4'
            }, {
                name: '王小虎',
                loginname: '33333',
                usetType: '4'
            }],
            input3:""
        }
    },
    methods:{
       
    }
}
</script>
<style>
.rigthSearch{
    width:50%;
    padding:15px 0;
}
</style>