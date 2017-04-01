window.onload=function(){
  //页面滚动js-header变色
  setHeader();
  //倒计时
  downTime();
  //轮播图
  banner();
}
  //绑定页面的滚动事件
window.onscroll=function(){
  setHeader();
}

function setHeader(){
  //获取页面滚出浏览器顶部高度
  var sTop=document.body.scrollTop;
  //获取banner的高度
  var banner=document.querySelector('.jd-banner');
  var bannerHeight=banner.offsetHeight;
  //存储透明度的变量
  var opacity=0;
  //alert(sTop);
  if(sTop<=bannerHeight){
    //动态计算透明度
    opacity=sTop/bannerHeight;
    if(opacity>0.8){
      opacity=0.8;
    }
  }else{
    opacity=0.8;
  }

  //给头部设置背景
  document.querySelector('.header-in').style.backgroundColor='rgba(201,21,35,'+opacity+')';
}

//倒计时
function downTime(){
  var time=60*60*5;
  //定时器
  var timer=setInterval(function(){
    time--;
    if(time<0){ //如果为负 清除定时器
      clearInterval(timer);
    }
    //把秒数 转成时分秒
    var h=Math.floor(time/3600);
    var m=Math.floor(time%3600/60);
    var s=Math.floor(time%60);
    //获取所有span
    var spans=document.querySelectorAll('.sk-time span');

    //小时
    spans[0].innerHTML=Math.floor(h/10);
    spans[1].innerHTML=Math.floor(h%10);

    //分钟
    spans[3].innerHTML=Math.floor(m/10);
    spans[4].innerHTML=Math.floor(m%10);

    //秒
    spans[6].innerHTML=Math.floor(s/10);
    spans[7].innerHTML=Math.floor(s%10);

  },1000);
}

//轮播图
/*
* 需求：
* 1-定时器切换轮播图
* 2-边界检测 实现无缝滚动
* 3-角标 切换
* 4-触屏轮播图
*
* */

function banner(){
  var banner=document.querySelector('.jd-banner');
  var ul=banner.querySelector('ul');
  var W=banner.offsetWidth; //获取一屏的宽度
  //记录切换的索引值
  var index=1;

  //---------------------封装复用代码---------------------

  //给ul添加过度的方法
  var addTransition=function(){
    ul.style.transition="all 0.4s";
    ul.style.webkitTransition="all 0.4s";
  }

  //给ul删除过度的方法
  var removeTransition=function(){
    ul.style.transition="none";
    ul.style.webkitTransition="none";
  }

  //设置ul的位移
  var setTranslateX=function(x){
    ul.style.transform='translateX('+x+'px)';
    ul.style.webkitTransform='translateX('+x+'px)';
  }


  // -----------------1-定时器切换轮播图--------------------
  var timer=setInterval(function(){
    index++;
    addTransition(); //添加过渡效果
    setTranslateX(-W*index); //设置ul的位移
  },2000);

  //-----------------2-边界检测 实现无缝滚动-----------------
  // 在每一屏切换完成后在判断index是否越界

  //ul.addEventListener('transitionend',function(){
  //  if(index>=9){
  //    index=1;
  //    //删除过渡
  //    removeTransition();
  //    //让ul快速跳转回来进行重合
  //    setTranslateX(-W*index);
  //  }
  //  if(index<=0){
  //    index=8;
  //    //删除过渡
  //    removeTransition();
  //    //让ul快速跳转回来进行重合
  //    setTranslateX(-W*index);
  //  }
  //})
  //
  ////兼容webkit内核的事件
  //ul.addEventListener('webkitTransitionEnd',function(){
  //  if(index>=9){
  //    index=1;
  //    //删除过渡
  //    removeTransition();
  //    //让ul快速跳转回来进行重合
  //    setTranslateX(-W*index);
  //  }
  //  if(index<=0){
  //    index=8;
  //    //删除过渡
  //    removeTransition();
  //    //让ul快速跳转回来进行重合
  //    setTranslateX(-W*index);
  //  }
  //})
  //

  bindTransitionEnd(ul,function(){
    if(index>=9){
      index=1;
      //删除过渡
      removeTransition();
      //让ul快速跳转回来进行重合
      setTranslateX(-W*index);
    }
    if(index<=0){
      index=8;
      //删除过渡
      removeTransition();
      //让ul快速跳转回来进行重合
      setTranslateX(-W*index);
    }

    // 设置角标
    setPoint(index);

  });

  //封装一个方法 解决 两次绑定过渡事件 代码冗余的问题
  // obj 要绑定过渡结束事件的对象
  // callback 过渡事件触发后的回调函数
  function bindTransitionEnd(obj,callback){
     if(typeof obj=='object'){ //如果传递的参数是对象则绑定事件
       obj.addEventListener('transitionend',function(){
          //if(callback){
          //  callback();
          //}
          callback&&callback();
       });

       obj.addEventListener('webkitTransitionEnd',function(){
         callback&&callback();
       });
     }
  }

//-------------------3-角标 切换------------------------
  //index 表示当前播放图的索引值
  function setPoint(index){
    var lis=banner.querySelectorAll('ol li');
    //排他
    //先排排除所有的
    for(var i=0;i<lis.length;i++){
      lis[i].classList.remove('active');
    }
    //显示自己
    lis[index-1].classList.add('active');
  }

//*--------------- 4-触屏轮播图--------------------
  /*  模块化 逻辑分离
  * 1-触屏开始 -记录起始数据
  * 2-触屏移动 - 记录 移动的数据   ul跟随手指移动
  * 3-触屏结束 - 进行判断
  *   如果滑动距离
  *    3.1 大于临界值 切换图片
  *         distanceX>0  上一张
       *    distanceX<0   下一张
  *    3.2小于临界值 返回去  *
  * */

  //定义变量记录数据
  var startX=0;
  var moveX=0;
  var distanceX=0;

  banner.addEventListener('touchstart',function(e){
    console.log('start');
    //记录起始数据
    startX= e.targetTouches[0].clientX;
    //清除定时
    clearInterval(timer);
  })


  banner.addEventListener('touchmove',function(e){
    console.log('move');
    //记录移动数据
    moveX= e.targetTouches[0].clientX;
    //距离差值
    distanceX=moveX-startX;
    //清除ul的过渡效果
    removeTransition();
    //让ul位移  -W*index+distanceX
    var x=-W*index+distanceX;
    setTranslateX(x);
  })


  banner.addEventListener('touchend',function(e){
    console.log('end');
    /*-触屏结束 - 进行判断
    *   如果滑动距离
    *    3.1 大于临界值 切换图片
    *         distanceX>0  上一张
    *    distanceX<0   下一张
    *    3.2小于临界值 返回去  */

    if(Math.abs(distanceX)>W/3){
      //切换图片
      if(distanceX>0){
        index--;//上一张
      }
      if(distanceX<0){
        //下一张
        index++;
      }

    }

    addTransition(); //添加过渡
    setTranslateX(-W*index); //ul位移

    //数据重置
    startX=0;
    moveX=0;
    distanceX=0;


    timer=setInterval(function(){
      index++;
      addTransition(); //添加过渡效果
      setTranslateX(-W*index); //设置ul的位移
    },2000);

  })


}