<template>
    <el-container class="mainBody">
        <el-aside width="200px">
            <el-select v-model="currentChart" placeholder="请选择" @change="getChart">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-row>
            <el-upload
                class="upload-demo"
                ref="upload"
                action="http:localhost:8004/dataCollect/uploadFile"
                name="files"
                :auto-upload="false"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :http-request="uploadHttpRequest"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
            </el-row>
            <el-row>
                
            </el-row>
            <div>
                <span class="demonstration">有默认值</span>
                <el-color-picker v-model="rightBgColor" show-alpha></el-color-picker>
            </div>
        </el-aside>
        <el-main>
            <router-view name="chartArea"/>
        </el-main>
    </el-container>
</template>
<script>
import XLSX from 'xlsx'
export default{
	data() {
      return {
        rightBgColor:"#1D84EE",
        options: [{
          value: 'lineChart',
          label: '折线图'
        }, {
          value: 'barChart',
          label: '柱状图'
        }, {
          value: 'pieChart',
          label: '饼图'
        }, {
          value: 'scatterPlotChart',
          label: '散点图'
        }, {
          value: 'radarChart',
          label: '雷达图'
        }],
        currentChart: '',
        fileList:[]
      }
    },
    methods:{
        getChart:function(){
            //console.log(this.currentChart)
            this.$router.push({name:this.currentChart,query:{alert:"11"}})
        },
        importExcel(file){
            var types = file.name.split('.')[1];
            var fileType = ['xlsx','xlc','xlm','xls','xlt','xlw','csv'].some(function(type){return type === types});
            if(!fileType){
                this.$message("格式错误！请重新选择")
                return
            }
           var fileReader = new FileReader();
           fileReader.onload =function(e){
               try{
                   var data = e.target.result;
                   var workbook = XLSX.read(data,{type:'binary'});
                   var wsnanme = workbook.SheetNames[0];
                   var dataJson = XLSX.utils.sheet_to_json(workbook.Sheets[wsnanme]); //生成json表格内容
                  
               }catch(e){
                  return
               }
           }
           fileReader.readAsBinaryString(file.raw) //执行此函数 才会执行onload
        },
        handleRemove(file, fileList) { //点击已选择的文件后X时 的弹出框确定时触发
            console.log(file, fileList);
        },
        handlePreview(file) {   //点击已经选择文件 预览时触发
            console.log(file)
            this.importExcel(file)
        },
        handleExceed(files, fileList) {  //超过limit时触发 this.$message.warnint 弹出框
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {  //点击已选择的文件后X时触发
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        submitUpload(){
            //console.log(vm.$el.fileList)
            this.$refs.upload.submit();
        },
       uploadHttpRequest(param){
            var formData = new FormData();
            console.log(param.file)
         formData.append('files',param.file);
            var url = 'http://localhost:8004/dataCollect/uploadFile'
            this.$http.post(url,formData)
                .then(res =>{
                    console.log(res)
                })
        }
    }
}
</script>