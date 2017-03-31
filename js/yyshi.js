$(function(){
	
	// 设置背景图
	$('.section').css({'background':'url(img/bg.jpg) center 0 no-repeat','background-size':'cover'});
	
	// 导航条鼠标移上背景色变化
	function nav(){
		$('#menu li').mouseover(function(){
			$(this).children('span').css({'transform':'scale(200,1)','opacity':1})
		}).mouseout(function(){
			$(this).children('span').css({'transform':'scale(1,1)','opacity':0});
		})
	}
	nav();
	
	// 第五屏鼠标移上
	function section5(){
		$('.section5 li').on('mouseover',function(){
			$(this).children('.bg').stop().fadeTo(500,.6);
			$(this).children('.txt').stop().animate({'top':10,'opacity':1},400);
		});
		
		$('.section5 li').on('mouseout',function(){
			$(this).children('.bg').stop().fadeTo(500,0);
			$(this).children('.txt').stop().animate({'top':-50,'opacity':0},400);
		});
	}
	
	section5();
	
	// 滚屏代码
	$('#fullpage').fullpage({
		navigation:true,
		navigationTooltips:['首页','关于我','专业技能','我的经历','我的作品','经历'],
		anchors:['page1','page2','page3','page4','page5','page6'],
		verticalCentered:false,
		paddingTop:200,
		afterLoad:function(link,index){
			if( index == 1 ){
				$('.section1 p').eq(0).fadeIn(500,function(){
					$('.section1 p').eq(1).fadeIn(500,function(){
						$('.section1 p').eq(2).fadeIn(500,function(){
							$('.section1 p').eq(3).fadeIn(500,function(){
								$('.section1 p').eq(4).fadeIn(500);
							});
						})
					})
				});
			}
		},
		onLeave:function(index,nextIndex,direction){
			if( index == 1 ){
				$('.section1 p').fadeOut(500);
			}
		}
	});
	
});
