
export default {
  name: 'lineEhart',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    console.log("leneEchatr");
    this.drawLine();
  },
  methods: {
    drawLine(){
        console.log("drawLine");
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('lineEchart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  }
}