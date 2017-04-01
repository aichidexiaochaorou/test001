window.onload=function(){
  //左侧滑动
  swipeLeft();
  //右侧滑动
  swipeRight();
}


//左侧滑动
/*
* 1、点击 li移动到顶部  变色tr
*
*
* 2、触屏滑动
*    touchstar ： 记录数据
*    touchmove ： ul 跟随
*    touchend  : 判断  如果ul 越界 需要复位
* */
function swipeLeft() {
  var leftBox = document.querySelector('.con-left');
  var ul = leftBox.querySelector('ul');
  var lis = ul.querySelectorAll('li');
  var currentY = 0; //ul当前的位置


  //-------------临界值-------------
  //  定位临界值
  var maxTop = 0;
  var minTop = leftBox.offsetHeight - ul.offsetHeight;

  //滑动临界值
  var swipeMax=maxTop+150;
  var swipeMin=minTop-150;
  //-----------------------封装复用代码-----------------------
  //添加过渡
  var addTransition = function () {
    ul.style.transition = "all 0.3s";
    ul.style.webkitTransition = "all 0.3s";
  }

  //删除过渡
  var removeTransition = function () {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }

  //设置ul位移
  var setTranslateY = function (y) {
    ul.style.transform = 'translateY(' + y + 'px)';
    ul.style.webkitTransform = 'translateY(' + y + 'px)';
  }

  //------------------点击 li移动到顶部  变色------------------------
  //1.给leftBox绑定点击事件
  itcast.tap(leftBox, function (e) {
    console.log(e.target.parentNode);//e.target  可以获取触发事件最小元素
    var target = e.target.parentNode; //被点击的li标签
    //排他
    for (var i = 0; i < lis.length; i++) {
      lis[i].classList.remove('active');
      lis[i].index = i;
    }
    target.classList.add('active'); //显示自己

    //ul过渡
    addTransition();
    //点击让ul滚动  滚动的高度=li索引值*-50
    var y = -target.index * 50;
    //验证数据
    if (y > maxTop) {
      y = maxTop;
    }
    if (y < minTop) {
      y = minTop;
    }
    setTranslateY(y);
    currentY = y;
  })


  //------------------------触屏滑动---------------------------
  //记录滑动数据
  var startY = 0;
  var moveY = 0;
  var distanceY = 0;

  leftBox.addEventListener('touchstart', function (e) {
    //记录起始坐标值
    startY = e.targetTouches[0].clientY;
  })

  leftBox.addEventListener('touchmove', function (e) {

    moveY = e.targetTouches[0].clientY; //记录 移动的坐标值

    distanceY = moveY - startY;  //算距离差

    removeTransition();//删除过渡

    //然ul位移  距离=currentY+distanceY;
    var y = currentY + distanceY;

    //滑动数据检测
    if(y>swipeMax){
      y=swipeMax;
    }
    if(y<swipeMin){
      y=swipeMin;
    }

    setTranslateY(y);//ul位移
  })


  leftBox.addEventListener('touchend',function(e){
    currentY=currentY+distanceY; //重新保存ul当前移动的位置

    //判断 如果ul的位移
    //越界 大于最大定位临界值 小于 最小的定位临界值  吸附回去
    if(currentY>maxTop){
      currentY=maxTop;
    }
    if(currentY<minTop){
      currentY=minTop;
    }

    addTransition();//添加过渡
    setTranslateY(currentY); //让ul位移

    //数据重置
    startY=0;
    moveY=0;
    distanceY=0;


  });


}


function swipeRight() {
  var leftBox = document.querySelector('.con-right');
  var ul = leftBox.querySelector('.right-in');
  var currentY = 0; //ul当前的位置

  //-------------临界值-------------
  //  定位临界值
  var maxTop = 0;
  var minTop = leftBox.offsetHeight - ul.offsetHeight;

  //滑动临界值
  var swipeMax=maxTop+150;
  var swipeMin=minTop-150;
  //-----------------------封装复用代码-----------------------
  //添加过渡
  var addTransition = function () {
    ul.style.transition = "all 0.3s";
    ul.style.webkitTransition = "all 0.3s";
  }

  //删除过渡
  var removeTransition = function () {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }

  //设置ul位移
  var setTranslateY = function (y) {
    ul.style.transform = 'translateY(' + y + 'px)';
    ul.style.webkitTransform = 'translateY(' + y + 'px)';
  }


  //------------------------触屏滑动---------------------------
  //记录滑动数据
  var startY = 0;
  var moveY = 0;
  var distanceY = 0;

  leftBox.addEventListener('touchstart', function (e) {
    //记录起始坐标值
    startY = e.targetTouches[0].clientY;
  })

  leftBox.addEventListener('touchmove', function (e) {

    moveY = e.targetTouches[0].clientY; //记录 移动的坐标值

    distanceY = moveY - startY;  //算距离差

    removeTransition();//删除过渡

    //然ul位移  距离=currentY+distanceY;
    var y = currentY + distanceY;

    //滑动数据检测
    if(y>swipeMax){
      y=swipeMax;
    }
    if(y<swipeMin){
      y=swipeMin;
    }

    setTranslateY(y);//ul位移
  })


  leftBox.addEventListener('touchend',function(e){
    currentY=currentY+distanceY; //重新保存ul当前移动的位置

    //判断 如果ul的位移
    //越界 大于最大定位临界值 小于 最小的定位临界值  吸附回去
    if(currentY>maxTop){
      currentY=maxTop;
    }
    if(currentY<minTop){
      currentY=minTop;
    }

    addTransition();//添加过渡
    setTranslateY(currentY); //让ul位移

    //数据重置
    startY=0;
    moveY=0;
    distanceY=0;


  });


}