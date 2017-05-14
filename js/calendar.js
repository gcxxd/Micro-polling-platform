$(document).ready(function () {
    var view=function(){
        /*月份天数*/
   var monthName=["Jan","Feb","Mar","Airp","May","Jue","Jul","Aug","Sem","Oct","Nov","Dec"];
   var month=[31,28,31,30,31,30,31,31,30,31,30,31];
    var week=[1,2,3,4,5,6,7];
    /*初始化日历组件*/
    var initial=function(){
        var year=document.getElementsByTagName("select")[1];
        for(var i=2026,str="";i>=1996;i--){
            if(i==2017)
            {
                str+="<option selected=selected>"+i+"</option>"
            }
            else
               str+="<option>"+i+"</option>";
        }
        year.innerHTML=str;
    }
    /*初始化日期*/
    var initialDate=function(){
        $(".date-col:eq(0) p").eq(6).html("1");
        var count=2;
        for(var i=1;i<6;i++)
        {
            var $date=$(".date-col").eq(i);
            for(var j=0;j<7&&count<=31;j++)
            {
                $date.children("").eq(j).html(count++);
            }
        }
        $("[value='Airp']").attr("selected", "selected");
        inputText();
        
    }
    /*月份向后切换*/
    var yearForward=function(){
        event.preventDefault();
        //获取年份
    	var y=$(".year select").children("[selected='selected']").html();
        //获取月份
        var m=$(".month select").children("[selected='selected']").html();
        //获取年份索引
        var yearIndex=2026-parseInt(y);
        //获取当前月份天数
        var monthDays;
        //月份计数器
        var monthcount;
        if(parseInt(y)%400==0||(parseInt(y)%4==0&&parseInt(y)%100!==0))
        {
        	for(var i=0;i<12;i++)
            {
                if(m==monthName[i])
                {
                    if(i==1)
                    {
                        monthDays=29;
                        monthcount=i;
                        break;
                    }
                    else
                    {
                          monthDays=month[i];
                          monthcount=i;
                          break;
                    }
                }
            }
        }
        else
        {
        	for(var i=0;i<12;i++)
            {
                if(m==monthName[i])
                {
                    monthDays=month[i];
                    monthcount=i;
                    break;
                }                
            }
        	
        }
        monthcount++;
        //获取月份取余7的余数
        var forward=monthDays%7;
        var $weekcount=$(".date-col:eq(0) p");
        var weekcount;
        //取得当前月份首日为星期几
        for(var i=0;i<7;i++)
        {
            if($weekcount.eq(i).html()=="1")
            {
                weekcount=i;
                break;
            }
        }
        for(;forward>0;forward--)
        {
            if(weekcount==6){
                weekcount=0;
            }
            else{
                weekcount++;
            }
        }
        //获得切换后月份首日为星期几
        var firstDay=week[weekcount];
           //重置
        for(var i=0;i<7;i++)
        {
            $weekcount.eq(i).html("");
        }
        for(var i=0;i<6;i++)
        {
             var $reset=$(".date-col").eq(i);
             for(var j=0;j<7;j++)
             {
                 $reset.children("").eq(j).html("");
             }
        }
        //设置切换后月份的日历
        var count=1;
        for(var i=0;i<6;i++)
        {
            var $date=$(".date-col").eq(i);
            if(i==0)
            {
                for(var j=firstDay-1;j<7;j++)
                {
                    $date.children("").eq(j).html(count++);
                }
            }
            else
            {
                for(var j=0;j<7&&count<=month[monthcount];j++)
                {
                    $date.children("").eq(j).html(count++);
                }
            }
        }
        //改变顶部月份显示
        if(monthcount<=11)
        {
            $(".month select").children("[selected='selected']").removeAttr("selected");
            $(".month select option").eq(monthcount).attr("selected","selected");
        }
        else{
            monthcount=0;
             $(".month select").children("[selected='selected']").removeAttr("selected");
             $(".month select option").eq(monthcount).attr("selected","selected");
             $(".year select").children("[selected='selected']").removeAttr("selected");
             $(".year select option").eq(--yearIndex).attr("selected","selected");
        }
        inputText();
    }
    /*月份向前切换*/
    var yearBack=function(){
        event.preventDefault();
        //获取年份
    	var y=$(".year select").children("[selected='selected']").html();
        //获取月份
        var m=$(".month select").children("[selected='selected']").html();
        //获取当前月份天数
        //获取月份索引
        var yearIndex=2026-parseInt(y);
        var monthDays;
        //月份计数器
        var monthcount;
        if(parseInt(y)%400==0||(parseInt(y)%4==0&&parseInt(y)%100!==0))
        {
        	for(var i=0;i<12;i++)
            {
                if(m==monthName[i])
                {
                    if(i==2)
                    {
                        monthDays=29;
                        monthcount=i;
                        break;
                    }
                    else
                    {
                        if(i==0)
                        {
                          monthDays=month[11];
                        }
                        else{
                            monthDays=month[i-1]
                        }
                          monthcount=i;
                          break;
                    }
                }
            }
        }
        else
        {
        	for(var i=0;i<12;i++)
            {
                if(m==monthName[i])
                {
                    if(i==0)
                    {
                        monthDays=month[11]
                    }
                    else
                        monthDays=month[i-1];
                    monthcount=i;
                    break;
                }                
            }
        	
        }
        monthcount--;
        //月份天数取余7
        var back=monthDays%7;
        var $weekcount=$(".date-col:eq(0) p");
        var weekcount;
        //取得当前月份首日为星期几
        for(var i=0;i<7;i++)
        {
            if($weekcount.eq(i).html()=="1")
            {
                weekcount=i;
                break;
            }
        }
        for(;back>0;back--)
        {
            if(weekcount==0){
                weekcount=6;
            }
            else{
                weekcount--;
            }
        }
        //获得切换后月份首日为星期几
        var firstDay=week[weekcount];
           //重置
        for(var i=0;i<7;i++)
        {
            $weekcount.eq(i).html("");
        }
        for(var i=0;i<6;i++)
        {
             var $reset=$(".date-col").eq(i);
             for(var j=0;j<7;j++)
             {
                 $reset.children("").eq(j).html("");
             }
        }
         var count=1;
        for(var i=0;i<6;i++)
        {
            var $date=$(".date-col").eq(i);
            if(i==0)
            {
                for(var j=firstDay-1;j<7;j++)
                {
                    $date.children("").eq(j).html(count++);
                }
            }
            else
            {
                for(var j=0;j<7&&count<=month[monthcount];j++)
                {
                    $date.children("").eq(j).html(count++);
                }
            }
        }
        //改变顶部月份显示
        if(monthcount>=0)
        {
            $(".month select").children("[selected='selected']").removeAttr("selected");
            $(".month select option").eq(monthcount).attr("selected","selected");
        }
        else{
            monthcount=11;
            $(".month select").children("[selected='selected']").removeAttr("selected");
            $(".month select option").eq(monthcount).attr("selected","selected");
             $(".year select").children("[selected='selected']").removeAttr("selected");
             $(".year select option").eq(++yearIndex).attr("selected","selected");
        }
        inputText();
    }
    /*月份选择改变*/
    var monthChange=function()
    {   
              event.preventDefault();
              var monthcount;
              var indexCount=function(m)
              {
                  for(var i=0;i<12;i++)
                 {
                     if(m==monthName[i])
                     {
                            m=i;
                            monthcount=i;
                            break;
                     }
                 }
                 return m;
              }
            var originmonth=$(".month select").children("[selected=selected]").html();
            $(".month select").children("[selected=selected]").removeAttr("selected");
            var originIndex;
            originIndex=indexCount(originmonth);
            var presentmonth=$(".month select option:selected").attr("selected","selected").html();
            var presentIndex;
            presentIndex=indexCount(presentmonth);
            var daysCount=0;
            if(presentIndex>originIndex)
            {
                for(;originIndex<presentIndex;originIndex++)
                {
                    daysCount+=month[originIndex];
                }
            }
            else{
                for(;presentIndex<originIndex;presentIndex++)
                {
                    daysCount+=month[presentIndex];
                }
            }
            var gap=daysCount%7;
            var $weekcount=$(".date-col:eq(0) p");
        var weekcount;
        //取得当前月份首日为星期几
        for(var i=0;i<7;i++)
        {
            if($weekcount.eq(i).html()=="1")
            {
                weekcount=i;
                break;
            }
        }
        for(;gap>0;gap--)
        {
            if(weekcount==6){
                weekcount=0;
            }
            else{
                weekcount++;
            }
        }
        //获得切换后月份首日为星期几
        var firstDay=week[weekcount];
           //重置
        for(var i=0;i<7;i++)
        {
            $weekcount.eq(i).html("");
        }
        for(var i=0;i<6;i++)
        {
             var $reset=$(".date-col").eq(i);
             for(var j=0;j<7;j++)
             {
                 $reset.children("").eq(j).html("");
             }
        }
        //设置切换后月份的日历
        var count=1;
        for(var i=0;i<6;i++)
        {
            var $date=$(".date-col").eq(i);
            if(i==0)
            {
                for(var j=firstDay-1;j<7;j++)
                {
                    $date.children("").eq(j).html(count++);
                }
            }
            else
            {
                for(var j=0;j<7&&count<=month[monthcount];j++)
                {
                    $date.children("").eq(j).html(count++);
                }
            }
        }
        inputText();
                  
    }
    /*年份选择改变*/
    var yearChange=function(){
        var originYear=parseInt($(".year select").children("[selected='selected']").html());
        $(".year select").children("[selected='selected']").removeAttr("selected");
        $(".year select option:selected").attr("selected", "selected");
        var presentYear=parseInt( $(".year select").children("[selected='selected']").html());
        var daysCount=0;
        if(originYear<presentYear)
        {   
            for(;originYear<presentYear;originYear++)
            {
                if(originYear%400==0||(originYear%4==0&&originYear%100!=0))
                {
                    daysCount+=366;
                }
                else{
                    daysCount+=365;
                }
            }
             var forward=daysCount%7;
        var $weekcount=$(".date-col:eq(0) p");
        var weekcount;
        //取得当前月份首日为星期几
        for(var i=0;i<7;i++)
        {
            if($weekcount.eq(i).html()=="1")
            {
                weekcount=i;
                break;
            }
        }
        for(;forward>0;forward--)
        {
            if(weekcount==6){
                weekcount=0;
            }
            else{
                weekcount++;
            }
        }
        //获得切换后月份首日为星期几
        var firstDay=week[weekcount];
           //重置
        for(var i=0;i<7;i++)
        {
            $weekcount.eq(i).html("");
        }
        for(var i=0;i<6;i++)
        {
             var $reset=$(".date-col").eq(i);
             for(var j=0;j<7;j++)
             {
                 $reset.children("").eq(j).html("");
             }
        }
        //设置切换后月份的日历
        var count=1;
        for(var i=0;i<6;i++)
        {
            var $date=$(".date-col").eq(i);
            if(i==0)
            {
                for(var j=firstDay-1;j<7;j++)
                {
                    $date.children("").eq(j).html(count++);
                }
            }
            else
            {
                for(var j=0;j<7&&count<=31;j++)
                {
                    $date.children("").eq(j).html(count++);
                }
            }
        }
        }
        else{
            for(;presentYear<originYear;presentYear++)
            {
                 if(presentYear%400==0||(presentYear%4==0&&presentYear%100!=0))
                {
                    daysCount+=366;
                }
                else{
                    daysCount+=365;
                }
            }
            //月份天数取余7
        var back=daysCount%7;
        var $weekcount=$(".date-col:eq(0) p");
        var weekcount;
        //取得当前月份首日为星期几
        for(var i=0;i<7;i++)
        {
            if($weekcount.eq(i).html()=="1")
            {
                weekcount=i;
                break;
            }
        }
        for(;back>0;back--)
        {
            if(weekcount==0){
                weekcount=6;
            }
            else{
                weekcount--;
            }
        }
        //获得切换后月份首日为星期几
        var firstDay=week[weekcount];
           //重置
        for(var i=0;i<7;i++)
        {
            $weekcount.eq(i).html("");
        }
        for(var i=0;i<6;i++)
        {
             var $reset=$(".date-col").eq(i);
             for(var j=0;j<7;j++)
             {
                 $reset.children("").eq(j).html("");
             }
        }
         var count=1;
        for(var i=0;i<6;i++)
        {
            var $date=$(".date-col").eq(i);
            if(i==0)
            {
                for(var j=firstDay-1;j<7;j++)
                {
                    $date.children("").eq(j).html(count++);
                }
            }
            else
            {
                for(var j=0;j<7&&count<=31;j++)
                {
                    $date.children("").eq(j).html(count++);
                }
            }
        }
        }
        inputText();
    }
    /* 鼠标点击日期显示*/
    var datePoint=function()
    {
        $(".date-col").children("[value='true']").removeAttr("value");
        var target=event.target;
        var $target=$(target);
        $target.attr("value","true");
    }
    /*日期框显示*/
    var inputText=function(){
        var text=$(".year select option:selected").html();
        var index=$(".month select").children("[selected='selected']").html();
        for(var i=0;i<12;i++)
        {
            if($(".month select option").eq(i).html()==index)
            {
                text+="/"+(++i);
                break;
            }
        }      
        $(".calendar form input").val(text);
    };
    /*返回日期到编辑页面*/
    var dateReturn=function(text){
        $(".date-col p").bind("click", function () {
            var day=$(".date-col").children("[value='true']").html();
            text+='/'+day;
        });
    }; 
    initial();
    initialDate();
    $(".date-col").bind("click", datePoint);
    $(".year select").bind("change",yearChange);
    $(".month select").bind("change", monthChange);
    $(".year-back").bind("click", yearBack);
    $(".year-front").bind("click", yearForward);
    return {
        view:view
    }
    }();
});
