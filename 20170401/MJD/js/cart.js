window.onload=function(){
  //点击 删除盒子

  //桶盖打开，模态框弹出
  var dels=document.querySelectorAll('.del');

  var win=document.querySelector('.modal-win');
  //删除的盒子
  var delBox=document.querySelector('.modal-del');

  //取消按钮
  var cancelBtn=document.querySelector('.btn-cancel');

  for(var i=0;i<dels.length;i++){
    dels[i].onclick=function(){
      this.classList.add('open');
      win.style.display='block';
      delBox.classList.add('animated');
      delBox.classList.add('bounceInDown');
    }
  }

  //点击取消 隐藏 模态框 关闭 桶
  cancelBtn.onclick=function(){
    win.style.display='none';
    //找到当前被打开的那个桶 ，删除open类名
    document.querySelector('.open').classList.remove('open');
  }
}