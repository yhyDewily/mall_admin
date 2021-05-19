<template>

    <div>
        <div class="deal-detail">
            <div class="title">
                <div class="pie">
                    <div id="pie-male">
                        <div id="main1" style="float: left; width:100%;height: 300px; margin-top: 20px"></div>
                        <div id="main2" style="float: left; width:100%;height: 300px; margin-top: 20px"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/pie')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    export default {
        name: "DealDetail",
        data:()=>({
            maleSales:[],
            femaleSales:[],
            male: [

            ],
            female: [

            ],
            temp: {}
        }),
        mounted() {
            this.getMaleSales();
            this.getFemaleSales();
        },
        methods:{
            getMaleSales() {

                this.$axios.post("/manage/product/gender_sales.do", this.$qs.stringify({
                    userId: 1,
                    genderId: 100001
                })).then(res=>{
                    this.maleSales = JSON.parse(JSON.stringify(res.data.data))
                    let listLength = JSON.parse(JSON.stringify(res.data.data)).length
                    for(let i=0;i<listLength;i++) {
                        this.male.push(JSON.parse(JSON.stringify(res.data.data))[i]);
                    }
                    this.initMaleData()
                })
            },
            getFemaleSales() {
                this.$axios.post("/manage/product/gender_sales.do", this.$qs.stringify({
                    userId: 1,
                    genderId: 100002
                })).then(res=>{
                    this.femaleSales = JSON.parse(JSON.stringify(res.data.data))
                    let listLength = JSON.parse(JSON.stringify(res.data.data)).length
                    for(let i=0;i<listLength;i++) {
                        this.female.push(JSON.parse(JSON.stringify(res.data.data))[i]);
                    }
                    this.initFemaleData()
                })
            },
            initMaleData() {
                let myChart = echarts.init(document.getElementById('main1'));
                // 绘制图表
                let temp = JSON.parse(JSON.stringify(this.male))
                let dataNum = [];
                for(let i=0;i<8;i++) {
                    dataNum.push({value: temp[i].sold, name: temp[i].categoryName})
                }
                // console.log(this.maleSales)
                myChart.setOption({
                    title : {
                        text: '男性服装销量',//主标题
                        x:'center',//x轴方向对齐方式
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series : [
                        {
                            name: '服装销量',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:dataNum,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            initFemaleData() {
                let myChart = echarts.init(document.getElementById('main2'));
                // 绘制图表
                let temp = JSON.parse(JSON.stringify(this.female))
                let dataNum = [];
                for(let i=0;i<8;i++) {
                    dataNum.push({value: temp[i].sold, name: temp[i].categoryName})
                }
                console.log(dataNum)
                // console.log(this.maleSales)
                myChart.setOption({
                    title : {
                        text: '女性服装销量',//主标题
                        x:'center',//x轴方向对齐方式
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series : [
                        {
                            name: '服装销量',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:dataNum,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            }
        }
    }
</script>

<style scoped>

</style>
