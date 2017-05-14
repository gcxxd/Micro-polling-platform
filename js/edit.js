$(document).ready(function () {  
    require.config({
        paths:{
            'calendar':'calendar',
        },
        waitSeconds:0
    });
    require(['calendar'],
         function(calendar) {
        'use strict';
        //初始化页面
         var init=function(){
                var data=window.localStorage;
                var activeId=data.getItem("activeId");
                var result=data.getItem("paperIFO");
                var paperResult=JSON.parse(result);
                $(paperResult).each(function (index, element) { 
                      if(index==activeId){
                           $(".paper-title h4").html(element.title);
                           $(".paper-footer").val(element.deadline);
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
                                var questionList="<li>"+questionTitle+questionType+questionOption+"</li>";
                                $(".question-list").append(questionList); 
                                paperHeightIncrease();
                           });
                      }  
                });
                $(".question-list li").each(function (index, element) { 
                        var btn="<div class='btn-wrap'><button class='delete'>删除</button><button class='down'>下移</button><button class='up'>上移</button></div>";
                        $(element).append(btn);
                });
        }();
        //修改页面部分内容
        var revise=function(){
                $(".paper-title h4").bind("click", function (e) {
                        var text="<input type='text'>";
                        var originText=$(".paper-title h4").html();
                        $(".paper-title").html(text);
                        $(".paper-title input").val(originText);
                });
                $(".question-list h4").bind("click", function (e) {
                        var text="<input type='text'>";
                        var originText=$(event.target).html();
                        
                });
                $(".question-list p").bind("click", function (e) {
                        var text="<input type='text'>";
                        var originText=$(event.target).html();
                        
                });
        }();
        var addQuestion=function(){
                $(".add-question").bind("click", function (e) {
                    $(".question-type").css("display", "block");               
                });
            }();
        //增加问卷高度
        function paperHeightIncrease(){
            var height=$(".paper-edit").css("height");
            if($(".question-list").children().length<4)
            {
                    height=parseInt(height.substring(0,3))+180;         
            }
            else{
                    height=parseInt(height.substring(0,4))+180;
            }
            $(".paper-edit").css("height", height+"px");
                return 0;
        };
        //减少问卷高度
        function paperHeightDecrease(){
            var height=$(".paper-edit").css("height");
            if($(".question-list").children().length>=3)
            {
                    height=parseInt(height.substring(0,4))-180;       
            }
            else{
                    height=parseInt(height.substring(0,3))-180;
            }
            $(".paper-edit").css("height", height+"px");
        }
        /*选择问题类型并添加到问卷列表 */
        var chooseType=function(){
                $(".question-type").click(function (e) {
                        event.preventDefault();
                        event.stopPropagation();
                        paperHeightIncrease();
                        var content="";
                        switch(event.target.className){
                            case 'single':
                            content="<li><h4>"+"单选题"+"</h4><input type='text' placeholder='题目' class='q-title'><label>A.</label><input type='text' placeholder='选项名' class='o-name'><label>B.</label><input type='text' placeholder='选项名' class='o-name'><label>C.</label><input type='text' placeholder='选项名' class='o-name'><div class='btn-wrap'><button class='delete'>删除</button><button class='down'>下移</button><button class='up'>上移</button></div></li>";
                            break;
                            case 'multiply':
                            content="<li><h4>"+"多选题"+"</h4><input type='text' placeholder='题目' class='q-title'><label>A.</label><input type='text' placeholder='选项名' class='o-name'><label>B.</label><input type='text' placeholder='选项名' class='o-name'><label>C.</label><input type='text' placeholder='选项名' class='o-name'><div class='btn-wrap'><button class='delete'>删除</button><button class='down'>下移</button><button class='up'>上移</button></div></li>";
                            break;
                            case 'text':
                            content="<li><h4>"+"文本题"+"</h4><input type='text' placeholder='题目' class='q-title'><textarea rows='3' cols='80'></textarea><div class='btn-wrap'><button class='delete'>删除</button><button class='down'>下移</button><button class='up'>上移</button></div></li>";
                            break;
                            default:break;
                        }
                        $(".question-list").append(content);    
                        });
                }();
                //问卷问题的删除，复用，上移，下移
                var questionOperate=function(){
                    $(".question-list").bind("click", function (e) {
                        event.preventDefault();
                        $(".up").click(function (e) {
                            event.preventDefault();
                            event.stopPropagation();
                            var $node=$(event.target).parent().parent();
                            var nodeContent=$node.html();
                            var $prevnode=$node.prev();
                            $node.html($prevnode.html());
                            $prevnode.html(nodeContent);

                        });
                         $(".down").click(function (e) {
                            event.preventDefault();
                            event.stopPropagation();
                            var $node=$(event.target).parent().parent();
                            var nodeContent=$node.html();
                            var $prevnode=$node.next();
                            $node.html($prevnode.html());
                            $prevnode.html(nodeContent);
                        });
                         $(".delete").click(function (e) {
                             event.preventDefault();
                             event.stopPropagation();
                             var $son=$(event.target);
                             $son.parent().parent().remove();
                             paperHeightDecrease();
                        });
                    });
                }();
                //设置截止日期日历
                var calendarSet=function(){
                    $(".paper-footer input").bind("click", function (e) {
                        $(".calendar").css("display", "block");
                    });
                    $(".date-col p").bind("click", function (e) {
                        var text=$(".calendar input").val();
                        text+="/"+event.target.innerHTML;
                        $(".paper-footer input").val(text);
                        $(".calendar").css("display", "none");
                    });   
                }(window.calendar||{});
                //保存问卷
                var paperSave=function(){
                    var questions=[];
                    $(".question-list li").each( function (index, element) { 
                         var obj={},options=[],answers=[];
                             obj.questionTitle=$(element).children(".q-title").val();
                             obj.questionType=$(element).children(".q-title").attr("placeholder");
                             $(element).children(".o-name").each(function (ind, ele) { 
                                 var o=$(ele).val();
                                 options.push(o);
                             });
                             obj.questionOption=options;
                             questions.push(obj);
                    });
                    return questions;
                };
                $(".save").click(function (e) {
                    event.preventDefault();
                    event.stopPropagation();                    
                    var is=confirm("是否保存");
                    if(!is)
                        return false;
                    var data=window.localStorage;
                    var paper=data.getItem("paperIFO");
                    var newData={};
                    var paperJson;
                    //设置问卷信息
                    var getInfo=function(){
                        newData.title=$(".paper-title input").val();
                        newData.questionList=paperSave();
                        newData.deadline=$(".paper-footer input").val();
                        newData.state=1;       
                    };
                    if(paper==null){
                        var arr=[];
                        newData.index=1;
                        getInfo();
                        arr.push(newData);
                        paperJson=JSON.stringify(arr);
                    }
                    else{
                        var last=JSON.parse(paper);
                        newData.index=getIndex();
                        getInfo();
                        last.push(newData);
                        paperJson=JSON.stringify(last);
                    }
                    data.setItem('paperIFO',paperJson);
                    alert("保存成功");
                    var st=window.localStorage;
                    window.localStorage.activeIndex=getIndex()-1;
                    window.location.reload();
                });
                //发布问卷
                $(".publish").click(function (e) {
                    event.preventDefault();
                    event.stopPropagation();
                    var lg=window.localStorage;
                    var paper=lg.getItem("paperIFO");
                    var paperResult=JSON.parse(paper);
                    var isPublish=0;
                    $(paperResult).each(function (index, element) {
                        if(element.title==$(".paper-title h4").html())
                        {
                            element.state=3;
                            isPublish=1;
                            return;
                        } 
                    });
                    if(isPublish==1){
                        alert("发布成功");
                    }
                    else{
                        alert("请在保存后发布");
                    }
                    lg.setItem("paperIFO",JSON.stringify(paperResult));
                });
                var getIndex=function(){
                    var storage=window.localStorage;
                    var val=storage.getItem("paperIFO");
                    if(val==null||val=="")
                    {
                        return 1;
                    }
                    else{
                        var after=JSON.parse(val);
                        var max=after[after.length-1].index;
                        return max+1;
                    }
                };
        }()
    )
});