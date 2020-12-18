import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData 在 mixin 创建.
    // 如果你需要替换 options , 请创建本地的 options 对象
    // 我测试 this.chartData 为null
    //console.log(JSON.stringify(this.chartData))
    //console.log(this.options)
    this.renderChart(this.chartData, this.options)
  },
  methods:{
    test(){
      //console.log("test")
      //console.log(this.options)
    }
  }
}