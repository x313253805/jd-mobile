// 自己封装实现移动端上面的点击事件

function fox_tap(object,callback){

	
	// 设置开关,判断对象是否移动
	var isMove = false;
	// 设置touch 3s以下,且没有移动时为点击行为
	var touchTime = 3000;
	// 设置开始和结束点击的时间
	var startTime = 0;
	var endTime = 0;
	// 注册touch的3个事件
	// touch开始事件
	object.addEventListener('touchstart',function(e){
		// 获取当前时刻的时间
		startTime = Date.now();
		// console.log('touchstart');
		// console.log(startTime);
		// 修正isMove
		isMove = false;
	});
	// touch移动事件
	object.addEventListener('touchmove',function(e){
		//如果触发了移动事件
		isMove = true;
	});
	// touch结束事件
	object.addEventListener('touchend',function(e){
		
		// 先判断是否触发了移动事件
		if(isMove){
			return false;
		}

		// 判断touch时间是否小于等于规定时间
		endTime = Date.now();
		var lastTime = endTime - startTime;
		if(lastTime<=touchTime){
			// 判断为点击，执行回调函数
			callback(e);
		}

		// console.log('touchend');
		// console.log(endTime);
	});
}