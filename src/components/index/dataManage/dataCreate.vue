<template>
    <div style="width:98%;margin-left:1%;">
        <div class="rigthSearch">
            
        </div>
        <div>
            <el-upload
                class="upload-demo"
                ref="upload"
                action="#"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-change="handleChange"
                multiple
                :file-list="fileList"
                :auto-upload="false"
                :limit="5">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadHttpRequest">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
    </div>
</template>
<script>
export default{
	data() {
        return {
           fileList: [] 
        }
    },
    methods:{
        submitUpload() {
            uploadHttpRequest();
        },
        handleRemove(file, fileList) {
            this.fileList = fileList;
        },
        handlePreview(file) {
            console.log(file);
        },
        beforeRemove(file, fileList) {  //点击已选择的文件后X时触发
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleChange($file,$fileList){
            this.fileList = $fileList;
        },
        uploadHttpRequest(){
            var formData = new FormData();
            var fileObj;
            var  _this = this;
            if(_this.fileList.length > 0){
                for(var i in _this.fileList){
                    formData.append('files',_this.fileList[i].raw);
                }
            }else{
               //fileList 为空处理实现
            }
            var url = 'dataCollect/uploadFile'
            this.$http.post(url,formData)
                .then(res =>{
                    console.log(res)
                })
        }
    }
}
</script>
<style>

</style>