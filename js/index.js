$(document).ready(function () {
    //初始化页面
    var init=function(){
        var data=window.localStorage;
        var result=data.getItem("paperIFO");
        //提取数据渲染表格
        var tableRendar=function(result){
             $(".create").css("display", "none");
            $(".operate").css("display", "block");
            var paperResult=JSON.parse(result);
            $(paperResult).each(function (index, element) {
                var title="<td>"+element.title+"</td>";
                var deadline="<td>"+element.deadline+"</td>";
                var state;
                switch(element.state){
                    case 1:state="未发布";
                    break;
                    case 2:state="发布中";
                    break;
                    case 3:state="已发布";
                    break;
                    default:break;
                };
                state="<td>"+state+"</td>"
                var deal="<td><a class='edit' href='edit.html'>编辑</a><a class='delete'>删除</a><a href='view.html' class='view'>查看</a></td>";
                var input="<td><input type='checkbox'></td>";
                var tr="<tr>"+input+title+deadline+state+deal+"</tr>";
                $(".operate tbody").append(tr);
            });
        };
        if(result==null){
            //无问卷时初始模拟数据
               var paperIFO=[
                {
                    index:1,
                    title:"阿森纳球迷调查表",
                    state:2,//1未发布，2发布中，3已发布
                    deadline:'17/4/1',
                    questionList:[
                        {
                            questionType:1,
                            questionTitle:'阿森纳历史上你最喜欢的球星',
                            questionOption:[
                                '亨利',
                                '博格坎普',
                                '厄齐尔',
                                '桑切斯'
                            ],
                        },
                        {
                            questionType:2,
                            questionTitle:'以下四人的出走方式你最反感',
                            questionOption:[
                                '宋公明',
                                '范雄心',
                                '纳私利',
                                '法忠义'
                            ],
                        },
                        {
                            questionType:3,
                            questionTitle:'17赛季踢成这B样，我们的问题到底出在哪'
                        }
                    ]
                },
                {
                    index:1,
                    title:"关于摇滚乐的调查表",
                    state:3,
                    deadline:'17/4/2',
                    questionList:[
                        {
                            questionType:1,
                            questionTitle:'你最喜欢的摇滚乐队',
                            questionOption:[
                                'Oasis',
                                'Sex Pistol',
                                'The Who',
                                'R.E.M'
                            ],
                        },
                        {
                            questionType:2,
                            questionTitle:'你热衷于哪些摇滚风格',
                            questionOption:[
                                'Britpop',
                                'PUNK',
                                'Bruce',
                                'Grunge'
                            ],
                        }
                    ]
                }
                ];
            data.setItem("paperIFO",JSON.stringify(paperIFO));
            var result=data.getItem("paperIFO");
            tableRendar(result);
        }
        else if(result=="[]"){
            createShow();
        }
        else{
            tableRendar(result);
        }
    }();
    var createShow=function(){
        if($(".operate tbody").html()=="")
        {
            $(".operate").css("display","none");
            $(".create").css("display","block");
        }
    }
    //查看问卷
    $(".view").bind("click", function (e) {
        var $p=$(event.target).parent();
        var $g=$p.parent();
        var activeId=$g.index();
        var data=window.localStorage;
        data.setItem("activeId",activeId);
    });
    //编辑问卷
    $(".edit").bind("click", function (e) {
        var $p=$(event.target).parent();
        var $g=$p.parent();
        var activeId=$g.index();
        var data=window.localStorage;
        data.setItem("activeId",activeId);
    });
    //删除问卷
    $(".delete").bind("click", function (e) {
        var is=confirm("是否删除");
        if(!is)
            return false;
        var $p=$(event.target).parent();
        var $g=$p.parent();
        var activeId=$g.index();
        var delData=window.localStorage;
        var delResult=delData.getItem("paperIFO");
        var delPaper=JSON.parse(delResult);
        $(delPaper).each(function (index, element) { 
            if(index===activeId)
            {
                var delContent=[];
                delContent=delPaper;
                delContent.splice(index,1);
                delData.setItem ("paperIFO",JSON.stringify(delContent));
            }
        });
        $g.remove();
        if(delData.getItem("paperIFO")=="[]")
        {
            createShow();
        }
    });
    //勾选问卷
    $("tbody input").bind("click", function (e) {
        $e=$(event.target)
        if($e.attr("checked")!="checked"){
            $e.attr("checked","checked");
        }
        else{
            $e.removeAttr("checked");
        }
    });
    //全选所有问卷
    $(".selectAll").bind("click", function (e) {
        if($(".selectAll").attr("checked")!="checked"){
            $(".selectAll").attr("checked", "checked"); 
            $("tbody input").attr("checked", "checked");
        }
        else{
            $(".selectAll").removeAttr("checked");
            $("tbody input").removeAttr("checked");
        }
    });
    //删除所有问卷
    $(".del-all").bind("click", function (e) {
        var is=confirm("是否全部删除");
        if(!is)
            return false;
        $("tbody tr").each(function (index, element) {
            if($(element).children().eq(0).children("input").attr("checked")=="checked"){
                var delData=window.localStorage;
                var delResult=delData.getItem("paperIFO");
                var delPaper=JSON.parse(delResult);
                $(delPaper).each(function (i, ele) { 
                        var delContent=[];
                        delContent=delPaper;
                        delContent.splice(index,1);
                        delData.setItem ("paperIFO",JSON.stringify(delContent));
                });
                $(element).remove();
            }
        })
        createShow();
    });
});