// 程序的入口
window.onload = function(){

	// 获取ul对象
	var ulDom = document.querySelector('.container_banner ul:nth-child(1)');
	// 1.网页滑动，header部分背景颜色发生变化
	headerScroll();

	// 2.第一个main_content中的倒计时功能
	timeCount();

	// 3.banner轮播图
	imgSlide();

}




// header颜色发生变化
function headerScroll(){

	/*
		实现思路：
		根据网页滑动的距离和nav部分到顶部的高度比较，来改变header的背景色。
	*/ 
	
	// nav部分距离顶部的高度
	var navDom = document.querySelector('.container_nav');
	// 总高度等于自身高度+距离顶部的高度
	var totalDistance = navDom.offsetHeight + navDom.offsetTop;
	
	// 获取header元素
	var headerDom = document.querySelector('.container_header');


	// 注册屏幕滚动事件,当屏幕滚动时触发
	window.onscroll = function(){

		// 网页下滑的距离
		var scrollDistance = document.documentElement.scrollTop;
		console.log(scrollDistance);
		// 定义百分比为两者之间的相除的值，后面将值赋值给透明度
		var percent = scrollDistance/totalDistance;
		// 判断percent的值，如果超过1就没有意义
		if(percent > 1){
			percent = 1;
		}
		// 将percent的值赋值给header元素，为了不影响里面的子元素的透明度，这里使用rgba，而不是用opacity
		headerDom.style.backgroundColor = 'rgba(201, 21, 35,'+percent+')';
	}
	

}

// 倒计时
function timeCount(){

	// 定义倒计时的总时间
	var totalTime = 3;
	var totalSecond = 3*60*60;
	var timer = null;

	// 设置定时器,每隔一秒中执行一次
	timer = setInterval(function(){
		// 总秒数减一
		totalSecond--;

		// 将秒数转换成对应的时、分、秒
		var h = parseInt(totalSecond/3600);
		var m = parseInt(totalSecond%3600/60);
		var s = parseInt(totalSecond%60);

		//将时间赋值给对应的li标签
		var liArr = document.querySelectorAll('.container_main .main_content:nth-child(1) li');

		liArr[0].innerHTML = parseInt(h/10);
		liArr[1].innerHTML = parseInt(h%10);
		liArr[3].innerHTML = parseInt(m/10);
		liArr[4].innerHTML = parseInt(m%10);
		liArr[6].innerHTML = parseInt(s/10);
		liArr[7].innerHTML = parseInt(s%10);

	},1000);

}

// 轮播图
function imgSlide(){

	// 设置自动轮播图片
	// 获取ul对象
	var ulDom = document.querySelector('.container_banner ul:nth-child(1)');
	var dotArr = document.querySelectorAll('.container_banner ul:nth-child(2) li');
	var moveWidth = document.body.offsetWidth;
	// 第一张图片是最后一张图片用来做无缝滚动的，所以index从1开始
	var index = 1;
	var timer = null;

	// console.log(moveWidth);

	// 设置定时器
	timer = setInterval(function(){
		// 索引自增
		index++;

		// console.log(index);
		// 修改ulDom的位置
		// ulDom.style.left = -index*moveWidth + 'px';
		setTransform(-index*moveWidth);
		// ulDom添加css3属性，过渡属性，为了保证过渡效果一直存在，在定时器中添加
		setTransition();
		

	},2000);

	// 过渡结束事件，用来修正index的值，并用来修改索引,监听ulDom元素，每次过渡完成后调用
	ulDom.addEventListener('webkitTransitionEnd',function(){
		console.log("过渡结束");

		// 判断index是否越界
		if(index>8){
			index = 1;
			// 关闭过渡
			ulDom.style.transition = '';
			// 从最后一个直接变换到第一张
			
			setTransform(-index*moveWidth);
		}

		if(index<1){
			index = 8
			// 关闭过渡
			ulDom.style.transition = '';
			// 从最后一个直接变换到第一张
			
			setTransform(-index*moveWidth);
		}



		// 修改下面小圆点的class
		// 排他思想
		for(var i=0;i<dotArr.length;i++){
			dotArr[i].className = "";
		}

		dotArr[index-1].className = "current";
	});

	// 手机触摸滑动时变化
	// 记录开始的x值
	var startX;
	// 记录移动的x的值
	var moveX;
	
	var distanceX; 


	// 注册3个touch事件
	//触摸开始事件
	ulDom.addEventListener('touchstart',function(event){

		// 清除定时器
		clearInterval(timer);
		// 关闭过渡效果
		ulDom.style.transition = '';
		// 记录开始的值
		startX = event.touches[0].clientX;

	});
	// 触摸移动事件
	ulDom.addEventListener('touchmove',function(event){
		// 记录滑动的距离
		moveX = event.touches[0].clientX - startX;
		// 给ulDom移动相应的位置

		setTransform(-index*moveWidth+moveX);
	});
	// 触摸结束事件
	ulDom.addEventListener('touchend',function(event){

		// 判断滑动的距离来实现吸附的效果,这里不需要判断movex的正负值，用绝对值来和屏幕宽度的一半来进行比较
		if(Math.abs(moveX) > moveWidth/2){
			// 这里判断moveX的正负，来决定是向左还是向右移动
			if(moveX>0){
				index--;
			}else{
				index++;
			}
			// 为了有动画效果，开启过渡
			setTransition();
			// 吸附过去
			setTransform(-index*moveWidth);
		}else{
			// 没有超过时就吸附回去
			// 开启过渡动画
			setTransition();
			// 吸附回去
			setTransform(-index*moveWidth);
		}

		// 吸附完成后重新开启定时器
		timer = setInterval(function(){
		// 索引自增
		index++;

		// console.log(index);
		// 修改ulDom的位置
		// ulDom.style.left = -index*moveWidth + 'px';
		setTransform(-index*moveWidth);
		// ulDom添加css3属性，过渡属性，为了保证过渡效果一直存在，在定时器中添加
		
		setTransition();

	},2000);

	});


}




// 抽离重复的代码封装成函数
function setTransition(){
	// 获取ul对象
	var ulDom = document.querySelector('.container_banner ul:nth-child(1)');
	ulDom.style.transition = 'all .5s';
}

function setTransform(distance){
	// 获取ul对象
	var ulDom = document.querySelector('.container_banner ul:nth-child(1)');
	ulDom.style.transform = 'translateX('+(distance)+'px)';
}
