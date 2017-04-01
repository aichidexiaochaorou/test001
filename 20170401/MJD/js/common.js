
// 移动端的点击事件会有300ms的延迟 优化
// 触发点击事件是
// 先触发了touch事件  如果是点击事件   没有touchmove事件
// 触屏开始 和 结束 的时间差 要小于 150ms
/*
* 参数说明
* obj：绑定点击事件的对象
* callback: 点击事件触发后 要执行的代码
* */

/* 全局污染 */
// 命名空间  避免全局污染
var itcast={
  tap:function(obj,callback){
    if(typeof obj=="object"){
      //定义变量记录数据
      var startTime=0;
      var isMove=false;
      //触屏开始
      obj.addEventListener('touchstart',function(){
        startTime=Date.now(); //时间戳
      });

      //触屏移动
      obj.addEventListener('touchmove',function(){
        isMove=true;
      });

      //触屏结束
      obj.addEventListener('touchend',function(e){
        //判断 没有移动过 时间小于150ms  为点击事件
        if(!isMove&&Date.now()-startTime<150){
          callback&&callback(e);
        }

        //数据重置
        isMove=false;
        startTime=0;
      });
  }
  }
};


