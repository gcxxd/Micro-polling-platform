$(document).ready(function () {
    require.config({
        paths:{
            'echarts':'echarts'
        },
        waitSeconds:0
    });
    require([echarts],
        function(ec){
            var init=function(){
                var data=window.localStorage;
                var activeId=data.getItem("activeId");
                var result=data.getItem("paperIFO");
                var paperResult=JSON.parse(result);
                $(paperResult).each(function(index,element){
                    if(index==activeId){
                        $(".paper-title h3").html(element.title);
                        $(".deadline p").html(element.deadline);
                        $(element.questionList).each(function (ind, ele) { 
                             var questionTitle="<h4>"+(ind+1)+"."+ele.questionTitle+"</h4>";
                             var type="";
                             switch(ele.questionType){
                                 case 1:type="单选题";
                                 break;
                                 case 2:type="多选题";
                                 break;
                                 case 3:type="文本题";
                                 break;
                                 default:break;
                             }
                             var questionType="<h5>"+type+"</h5>";
                             var questionOption="";
                             $(ele.questionOption).each(function (indexInArray, valueOfElement) { 
                                  questionOption+="<p>"+(indexInArray+1)+"."+valueOfElement+"</p>";
                            });
                            var questionList="<li>"+questionTitle+questionType+questionOption+"<div class='spread'></div></li>";
                            
                            $(".question-list ul").append(questionList);
                        });    
                    }
                })
            }();
            var spreadInit=function(ec)
            {
                var spreadList=document.getElementsByClassName("spread");
                var length=$(".question-list ul").children().length;
                var option=new Array(length);
                $(option).each(function (index, element) {
                    var t=100; 
                    var r1=parseInt(100*Math.random());
                    var r2=t-r1-10;
                    t=t-r1-r2;
                    var r3=t;
                    option[index]={
                        title : {
                        text: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    toolbox: {
                        show : true,
                    },
                    calculable : true,
                    series : [
                        {
                            name:'',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:r1,name:'答案三'},
                                {value:r2,name:'答案二'},
                                {value:r3,name:'答案一'}
                            ]
                        }
                    ]
                    }
                });
                $(".question-list ul li").each(function (index, element) {
                     if($(element).children("h5").html()=="文本题")
                     {
                         option[index]={
                                title : {
                                text: '',
                                x:'center'
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            toolbox: {
                                show : true,
                            },
                            calculable : true,
                            series : [
                                {
                                    name:'',
                                    type:'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:30,name:'未填写人数'},
                                        {value:70,name:'有效回答人数'}
                                    ]
                                }
                            ]
                        };
                     }
                });
                for(var i=0;i<length;i++)
                {
                    var myChart=ec.init(spreadList[i]);
                    myChart.setOption(option[i]);
                }
            }(window.echarts||{});
    })
});