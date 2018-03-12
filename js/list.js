// 入口
window.onload = function(){

	// 左边上下滑动
	left_slide();
}

// 实现上下滑动
function left_slide(){

	// 在移动端不建议使用click，click在移动端有延时
	// 获取ulDom元素
	var ulDom = document.querySelector('.main_left ul');
	var ulHeight = ulDom.offsetHeight;
	// 获取header部分的高度
	var headerHeight = document.querySelector('.container_header').offsetHeight;
	// 获取ulDom父元素的高度
	var mainHeight = ulDom.parentNode.offsetHeight;
	// 定义可以显示空白部分的高度
	var delayDistance = 100;
	// 定义ulDom移动的最大和最小距离
	var maxDistance = 0;
	var minDistance = mainHeight - ulHeight - headerHeight;

	var startY = 0;
	var moveY = 0;
	var distanceY = 0;
	// 注册touch的3个事件
	// 触摸开始
	ulDom.addEventListener('touchstart',function(e){
		// 获取开始的坐标值
		startY = e.touches[0].clientY;
	});
	// 触摸移动
	ulDom.addEventListener('touchmove',function(e){
		// 计算移动的距离
		moveY = e.touches[0].clientY - startY;

		// 判断是否满足移动条件
		if((moveY+distanceY)>(maxDistance+delayDistance)){
			// 修正moveY
			moveY = 0;
			distanceY = maxDistance+delayDistance;
		}else if((moveY+distanceY)<(minDistance-delayDistance)){
			moveY = 0;
			distanceY = minDistance-delayDistance;
		}

		//给ulDom添加过渡属性
		
		setTransition();
		// 移动ulDom元素
		
		setTransform(moveY+distanceY);
	});
	// 触摸结束
	ulDom.addEventListener('touchend',function(e){
		// 修改移动总距离
		distanceY += moveY;

		// 触摸完成后判断移动的距离是否超过最大和最小值
		if(distanceY > maxDistance){
			distanceY = maxDistance;
		}else if(distanceY < minDistance){
			distanceY = minDistance;
		}

		//给ulDom添加过渡属性
		setTransition();
		// 移动ulDom元素
		
		setTransform(distanceY);

	});

	// 点击li标签，该li标签添加current类，同时向上移动到顶部

	// 获取ul对象
	// var ulDom = document.querySelector('.main_left ul');
	var liArr = ulDom.querySelectorAll('li');

	// 给li添加data-index属性来确定是哪个li便签被点击
	for(var i=0;i<liArr.length;i++){
		liArr[i].dataset['index'] = i;
	}

	// 获取li的高度
	var liHeight = liArr[0].offsetHeight;

	// 设置li的索引
	var index;
	// 通过事件代理，监听ul上的点击事件，通过event.target可以获取具体点击的对象
	fox_tap(ulDom,function(e){
		// console.log(e);
		index = e.target.dataset.index;
		// console.log(e.target.dataset.index);

		// 获取li对象，排他思想
		for(var i=0;i<liArr.length;i++){
			liArr[i].className = '';

		}
		liArr[index].className = 'current';

		// 设置ul的过渡属性
		
		setTransition();

		//设置移动的距离
		var moveDistance = -index*liHeight
		//设置ul移动相应的位置
		
		setTransform(moveDistance);

		// 修正移动的距离
		if(moveDistance > maxDistance){
			moveDistance = maxDistance;
		}else if(moveDistance < minDistance){
			moveDistance = minDistance;
		}

		//给ulDom添加过渡属性
		setTransition();
		// 移动ulDom元素
		
		setTransform(moveDistance);


	});



}




// 抽取重复代码，进行封装
function setTransition(){

	var ulDom = document.querySelector('.main_left ul');
	ulDom.style.transition = 'all .5s'; 
}

function endTransition(){
	ulDom.style.transition = '';
}

function setTransform(distance){
	var ulDom = document.querySelector('.main_left ul');
	ulDom.style.transform = 'translateY('+(distance)+'px)';
}