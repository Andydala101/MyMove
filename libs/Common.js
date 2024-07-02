export default {
	join(str, key) {
		str = str.toString()
		var reg = new RegExp((`(${key})`), "gm");
		var replace = '<span style="color:#FD463E;font-weight:bold;">$1</span>';
		return str.replace(reg, replace);
	},
	setTabar(){ // 重置底部导航
		uni.setTabBarItem({
		  index: 0,
		  visible: true
		})
		uni.setTabBarItem({
		  index: 1,
		  visible: true
		})
		uni.setTabBarItem({
		  index: 2,
		  visible: true
		})
		uni.setTabBarItem({
		  index: 3,
		  visible: true
		})
		uni.setTabBarItem({
		  index: 4,
		  visible: true
		})
		uni.setTabBarItem({
		  index: 5,
		  visible: true
		})
		// 隐藏底部tab处理，判断运行还是建设
		let user = uni.getStorageSync('user')
		if(user.Type==0 || !user.Type){// 建设时
			uni.setTabBarItem({
			  index: 1,
			  visible: false
			})
			uni.setTabBarItem({
			  index: 3,
			  visible: false
			})
			uni.setTabBarItem({
			  index: 4,
			  visible: false
			})
			uni.setTabBarItem({
			  index: 5,
			  visible: false
			})
		}
		if(user.Type==1){ // 运行时
			uni.setTabBarItem({
			  index: 0,
			  visible: false
			})
			uni.setTabBarItem({
			  index: 2,
			  visible: false
			})
			uni.setTabBarItem({
			  index: 4,
			  visible: false
			})
			uni.setTabBarItem({
			  index: 5,
			  visible: false
			})
		}
		if(user.Type==2){ // 监督时
			uni.setTabBarItem({
			  index: 0,
			  visible: false
			})
			uni.setTabBarItem({
			  index: 1,
			  visible: false
			})
			uni.setTabBarItem({
			  index: 2,
			  visible: false
			})
			uni.setTabBarItem({
			  index: 3,
			  visible: false
			})
		}
	},
	// 关键字高亮
	joinBg(str, key) {
		var reg = new RegExp((`(${key})`), "gm");
		var replace = '<span style="background:#EB2424;color:#FFFFFF;">$1</span>';
		return str.replace(reg, replace);
	},
	//语音识别输入
	startRecognize() {	
		var options = {
			engine: 'baidu'
		};
		let _this = this
		let Recognize = '测试的'
		plus.speech.startRecognize(options, function(s){
			Recognize += s
		}, function(e){
			uni.showToast({
				title: '语音识别失败',icon:'none' 
			})  
		});
		return Recognize
	},
	//验证手机号
	checkModbile(mobile) {
		var re = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
		var result = re.test(mobile); 
		if(!result) {
			return false;//若手机号码格式不正确则返回false
		}
		return true;
	},
	//对比多，同，缺
	CompareFunction(HostArry,AssistList,Type = 'Array'){ 
		//对比基准 , 对比项 , 对比类型: 数组、字符串、时间
		//对比数组（Array）：根据数组对象中的Title字段进行对比
		//对比字符串（Str）：直接传字符串对比
		//对比时间（Date）： 先对比Type字段类型是否相同，然后对比时长TimeInt
		//对比数量（Number）： 对比Number字段
		//对比金额（Money）：先对比Type字段是否相同，然后对比数量Num
		let Code = {
			txt: '',
			color: ''
		}
		if(Type == 'Money'){
			if(HostArry.Type == AssistList.Type){
				if(HostArry.Num > AssistList.Num){
					Code.txt = '少'+(HostArry.Num - AssistList.Num)+'元'
					Code.color = '#FF941F'
				}else if(HostArry.Num < AssistList.Num){
					Code.txt = '多'+(AssistList.Num - HostArry.Num)+'元'
					Code.color = '#4E86F3'
				}else{
					Code.txt = '同'
					Code.color = '#2CAC58'
				}
			}else{
				Code.txt = '异'
				Code.color = '#FF941F'
			}
			return Code
		}
		if(Type == 'Number'){
			if(HostArry.Number > 0 && AssistList.Number == 0){
				Code.txt = '缺'
				Code.color = '#FE5133'
			}else{
				if(HostArry.Number > AssistList.Number){
					Code.txt = '少'+(HostArry.Number - AssistList.Number) + '分'
					Code.color = '#FF941F'
				}else if(HostArry.Number < AssistList.Number){
					Code.txt = '多'+(AssistList.Number - HostArry.Number) + '分'
					Code.color = '#4E86F3'
				}else{
					Code.txt = '同'
					Code.color = '#2CAC58'
				}
			}
			return Code
		}
		if(Type == 'Date'){
			if(HostArry.IsData==true && AssistList.IsData == false){
				Code.txt = '缺'
				Code.color = '#FE5133'
			}else{
				if(HostArry.Type == AssistList.Type){
					if(HostArry.TimeInt > AssistList.TimeInt){
						Code.txt = '少'+(HostArry.TimeInt - AssistList.TimeInt)+(AssistList.Type == 0 ? '小时':'天')
						Code.color = '#FF941F'
					}else if(HostArry.TimeInt < AssistList.TimeInt){
						Code.txt = '多'+(AssistList.TimeInt - HostArry.TimeInt)+(AssistList.Type == 0 ? '小时':'天')
						Code.color = '#4E86F3'
					}else{
						Code.txt = '同'
						Code.color = '#2CAC58'
					}
				}else{
					Code.txt = '异'
					Code.color = '#FF941F'
				}
			}
			return Code
		}
		if(Type == 'Str'){
			if((HostArry == '' || HostArry == null)&&(AssistList != '' || AssistList != null)){
				Code.txt = '多'
				Code.color = '#FF941F'
			}else if((HostArry != '' || HostArry != null)&&(AssistList == '' || AssistList == null)){
				Code.txt = '缺'
				Code.color = '#FE5133'
			}else{
				Code.txt = HostArry != AssistList ? '异':'同'
				Code.color = HostArry != AssistList ? '#FF941F':'#2CAC58'
			}
			return Code
		}
		if(AssistList.length > 0){
			//console.log(HostArry,AssistList);
			if(HostArry.length > AssistList.length){
				Code.txt = '少'+(HostArry.length - AssistList.length)+'项'
				Code.color = '#FF941F'
			}else if(HostArry.length < AssistList.length){
				Code.txt = '多'+(AssistList.length - HostArry.length)+'项'
				Code.color = '#4E86F3'
			}else {
				HostArry.forEach(item=>{
					item.isNull = true
					AssistList.forEach(row=>{
						if(item.Title == row.Title){
							item.isNull = false
						}
					})
				})
				
				let isNull = false
				HostArry.forEach(item=>{
					if(item.isNull){
						isNull = true
					}
				})
				Code.txt = isNull ? '异':'同'
				Code.color = isNull ? '#FF941F':'#2CAC58'
			}
		}else{
			Code.txt = '缺'
			Code.color = '#FE5133'
		}
		return Code
	},
	// 分钟数转为天时分格式
	FormatMinutes(minutes) {
	  var day = parseInt(Math.floor(minutes / 1440));
	  var hour = day > 0 ? Math.floor((minutes - day * 1440) / 60) : Math.floor(minutes / 60);
	  var minute = hour > 0 ? Math.floor(minutes - day * 1440 - hour * 60) : minutes;
	  
	  var time = "";	
	  if (day > 0) time += day + "天";	
	  if (hour > 0) time += hour + "时";
	  if (minute > 0) time += minute + "分";
	  
	  return time?time:'0分';
	},
	// 天转为天时
	FormatHouers(Houers) {
		var day = 0,hour = 0
		if(Houers<=24) {
			hour = Houers
		}else {
			day = parseInt(Math.floor(Houers / 24));
			hour = Math.floor(Houers - (day * 24))
		}
	  var time = "";	
	  if (day > 0) time += day + "天";	
	  if (hour > 0) time += hour + "小时";
	  return time?time:'0小时';
	},
	// 天转为天时 如果小时有小数，把小数转为小时
	FormatDayHouers(days) {
		var day = 0,hour = 0
		if(days%1 == 0) {
			day = days
		}else {
			day = parseInt(days)
			let h = days % 1 // 取小数 days.toString().split('.')
			hour = parseInt(h * 24)
		}
	  var time = "";	
	  if (day > 0) time += day + "天";	
	  if (hour > 0) time += hour + "小时";
	  return time?time:'0小时';
	},
	LoadPage(url = "", type = "navigateTo", animate = "none") {
		switch (type) {
			case "navigateTo":
				uni.navigateTo({
					url: url,
					animationType: animate
				})
				break;
			case "redirectTo":
				uni.redirectTo({
					url: url,
					animationType: animate
				})
				break;
			case "switchTab":
				uni.switchTab({
					url: url,
					animationType: animate
				})
				break;
		}
	},
	getTime(time = null) {
		var date = time != null ? time:new Date()
		let year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
			minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
			second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		month >= 1 && month <= 9 ? (month = "0" + month) : "";
		day >= 0 && day <= 9 ? (day = "0" + day) : "";
		var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		return timer;
	},
	// 什么时候的时间 转化 昨天 前天 几个小时前
	getDateDiff(dateTimeStamp){
	    var result = ''
	    var date = (new Date())
	    var theDate= new Date(dateTimeStamp.replace(/-/g, '/')).getTime()
	    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() //今天凌晨
	    var yestday = new Date(today - 24*3600*1000).getTime()
	    var minute = 1000 * 60
	    var hour = minute * 60
	    var day = hour * 24
	    var halfamonth = day * 15
	    var month = day * 30
	    var now = new Date().getTime()
	    var diffValue = now -theDate
	    if(diffValue < 0){return;}
	    var monthC =diffValue/month
	    var weekC =diffValue/(7*day)
	    var dayC =diffValue/day
	    var hourC =diffValue/hour
	    var minC =diffValue/minute
	    if(monthC>=1){
	        result="" + parseInt(monthC) + "个月前"
	    }
	    else if(weekC>=1){
	        result="" + parseInt(weekC) + "周前"
	    }
	    else if(dayC>=1){
	        result=""+ parseInt(dayC) +"天前"
	    }
	    else if(hourC>=1){
	        if(theDate< today && yestday <= theDate){
	            result="昨天"
	        }else{
	            result=""+ parseInt(hourC) +"小时前"
	        }
	    }
	    else if(minC>=1){
	        result=""+ parseInt(minC) +"分钟前"
	    }else{
	        result="刚刚"
	    }
	    return result
	},
	// 计算两个时间差 dateBegin 开始时间 status 默认都显示 1只显示天
	timeFn(dateBegin, dateEnd,status) {
		if (!dateBegin) {
			dateBegin = new Date();
		}
		if (!dateEnd) {
			dateEnd = new Date();
		}
		var dateDiff = new Date(dateEnd.toString().replace(/-/g, '/')).getTime() - new Date(dateBegin.toString()
			.replace(/-/g, '/')).getTime(); //时间差的毫秒数
		var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
		
		var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
		var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
		//计算相差分钟数
		var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
		var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
		//计算相差秒数
		var leave3=leave2%(60*1000)   //计算分钟数后剩余的毫秒数
		var seconds=Math.round(leave3/1000)
		// var leave4=leave3%(60*1000)   //计算分钟数后剩余的毫秒数
		// var minseconds=Math.round(leave4/1000)
		var str = '';
		if (dayDiff) {
			str += Math.abs(dayDiff) + "天";
		}
		if (hours) {
			str += Math.abs(hours) + "时";
		}
		if (minutes) {
			str += Math.abs(minutes) + "分"
		}
		// 精确到秒
		if(seconds&&status==4){
			str += Math.abs(seconds) + "秒"
		}
		if (str == '') {
			str += Math.abs(dayDiff);
		}
		
		//var timeFn = + + ; //+seconds+" 秒"+minseconds+"毫秒";
		if(status==1){
			str = Math.abs(dayDiff) + "天"
		}
		if(status==2){ // 返回相差时
			str = Math.abs(hours) 
		}
		if(status==3){ // 返回天 不带文字
			str = Math.abs(dayDiff)
		}
		// status==5 不足1分返回秒 不足1小时返回分 不足24小时返回小时 大于24小时返回天
		if(status==5) {
			str = {
				num: 0,
				unit: ''
			}
			if (dayDiff) {
				str.num = dayDiff
				str.unit = '天'
			}else if (hours && dayDiff==0) {
				str.num = hours
				str.unit = '小时'
			}else if (minutes && dayDiff==0 && hours==0) {
				str.num = minutes
				str.unit = '分钟'
			}else if (seconds && minutes==0 && dayDiff==0 && hours==0) {
				str.num = seconds
				str.unit = '秒'
			}else if(!seconds && minutes==0 && dayDiff==0 && hours==0) {
				str.num = 0
				str.unit = '秒'
			}
		}
		// status==6 不足1分返回秒 不足1小时返回分 不足24小时返回小时 大于24小时返回天
		if(status==6) {
			str = ''
			if (dayDiff>0) {
				str+= dayDiff+'天'
			}else if (hours!=0 && dayDiff==0) {
				str+= hours+'小时'
			}else if (minutes!=0 && dayDiff==0 && hours==0) {
				str+= minutes+'分钟'
			}else if (seconds!=0 && minutes==0 && dayDiff==0 && hours==0) {
				str+= seconds+'秒'
			}
		}
		return str;
	},
	// 去除HTML
	removeHTMLTag(str) {
		str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
		str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
		//str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
		str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
		str=str.replace(/&lt;/ig,'');
		str=str.replace(/&gt;/ig,'');
		str=str.replace(/[div|\/div]/g,'');
		str=str.replace(/&lt;[ -~]*&gt;/ig,'');//去掉替换后的<>标签
		return str;
	},
	addDate(date, days) {
		if (days == undefined || days == '') {
			days = 1;
		}
		var date = new Date(date);
		date.setDate(date.getDate() + days);
		var month = date.getMonth() + 1;
		if (month < 10) {
			month = "0" + month;
		}
		var day = date.getDate();
		if (day < 10) {
			day = "0" + day;
		}
		return date.getFullYear() + '-' + month + '-' + day;
	},
	deepCopy(p, c) {
		var c = c || {};
		for (var i in p) {
			if (typeof p[i] === 'object') {
				c[i] = (p[i].constructor === Array) ? [] : {};
				deepCopy(p[i], c[i]);
			} else {
				c[i] = p[i];
			}
		}
		return c;
	},
	//获取图片的Blob值
	getImageBlob(url, cb) {
		var xhr = new XMLHttpRequest();
		xhr.open("get", url, true);
		xhr.responseType = "blob";
		xhr.onload = function() {
			if (this.status == 200) {
				console.log();
				if (cb) cb(this.response);
			}
		};
		xhr.send();
	}, 
	// 下载
	downloadFile(fileUrl, fileName = '合规文件.doc', CId) { // fileUrl 地址 fileName文件名 CId合规id
		uni.showLoading({
			title: '加载中',
			mask: true
		})
		let ComplianceId = CId?CId:'00000000-0000-0000-0000-000000000000'
		this.DownloadWaterMarkFile(fileUrl,fileName,ComplianceId)
	},
	DownloadWaterMarkFile(Path,fileName,ComplianceId) {
		uni.request({
			method: 'GET',
			url: 'http://cjhadmin.xszhg.cn/api/common/File/DownloadWaterMarkFile',
			data: {
				ComplianceId: ComplianceId,
				Url: Path
			},
			responseType: 'jsonp',
			success: (res) => {
				if(res.data.Success) {
					var that = this;
					var fileUrl = 'http://cjhadmin.xszhg.cn/'+res.data.Result.RetPath
					// #ifdef H5
					that.getImageBlob(fileUrl, function(blob) {
						uni.hideLoading();
						that.hrefClick(blob, fileName);
					});
					// #endif
					// #ifdef APP-PLUS
					if (uni.getSystemInfoSync().platform == "ios") {
						this.downloadFileIos(fileUrl)
					}else {
						uni.hideLoading()
						var dtask = plus.downloader.createDownload(fileUrl, {
							method: "GET",
							timeout: 10,
							retry: 0,
							retryInterval: 10,
							filename: '_downloads/' + fileName //file://storage/emulated/0/zhg/
						}, function(d, status) {
							if (status == 200) {
								var fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
								plus.runtime.openFile(fileSaveUrl, {}, function(e) {
									console.log('读取文件', e);
								});
							} else {
								plus.downloader.clear();
							}
						})
						try {
							dtask.start(); // 开启下载的任务
							var prg = 0;
							var showLoading = plus.nativeUI.showWaiting("正在下载"); //创建一个showWaiting对象 
							dtask.addEventListener('statechanged', function(
								task,
								status
							) {
								// 给下载任务设置一个监听 并根据状态  做操作
								switch (task.state) {
									case 1:
										showLoading.setTitle("正在下载");
										break;
									case 2:
										showLoading.setTitle("已连接到服务器");
										break;
									case 3:
										prg = parseInt(
											(parseFloat(task.downloadedSize) /
												parseFloat(task.totalSize)) *
											100
										);
										showLoading.setTitle("  正在下载" + prg + "%  ");
										break;
									case 4:
										plus.nativeUI.closeWaiting();
										//下载完成
										break;
								}
							});
						} catch (err) {
							plus.nativeUI.closeWaiting();
							uni.showToast({
								title: '下载失败',
								mask: false,
								duration: 1500
							});
						}
					}
					// #endif
				}
			},
			fail: (err) => {
				
			}
		})
	},
	hrefClick(res, Name, ComplianceId, Path) {
		const content = res
		const blob = new Blob([content])
		const fileName = Name
		if ('download' in document.createElement('a')) { // 非IE下载
			const elink = document.createElement('a')
			elink.download = fileName
			elink.style.display = 'none'
			elink.href = URL.createObjectURL(blob)
			document.body.appendChild(elink)
			elink.click()
			URL.revokeObjectURL(elink.href) // 释放URL 对象
			document.body.removeChild(elink)
		} else { // IE10+下载
			navigator.msSaveBlob(blob, Name)
		}
		uni.hideLoading()
	},
	// ios 下载文件
	downloadFileIos(fileUrl) {
		uni.hideLoading()
		var showLoading = plus.nativeUI.showWaiting("正在预览"); //创建一个showWaiting对象 
		const downloadTask = uni.downloadFile({
			url: fileUrl,
			success: (res) => {
				if (res.statusCode === 200) {
					uni.saveFile({
						tempFilePath: this.fileNameEscape(res.tempFilePath),
						success: function(red) {
							uni.openDocument({
								filePath: red.savedFilePath,
								showMenu: true,
								success: function(res) {
									plus.nativeUI.closeWaiting();
								}
							});
						}
					});
				}
			}
		});
		downloadTask.onProgressUpdate((res) => {
			showLoading.setTitle("正在下载" + res.progress + "%  ");
		});
	},
	
	fileNameEscape(filename) {
		console.log('filename', filename)
		if (uni.getSystemInfoSync().platform == "ios") {
			filename = escape(filename);
		}
		return filename;
	},
	debounce(func, wait = 500, immediate = false) {
		// 清除定时器
		if (timeout !== null) clearTimeout(timeout);
		// 立即执行，此类情况一般用不到
		if (immediate) {
			var callNow = !timeout;
			timeout = setTimeout(function() {
				timeout = null;
			}, wait);
			if (callNow) typeof func === 'function' && func();
		} else {
			// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
			timeout = setTimeout(function() {
				typeof func === 'function' && func();
			}, wait);
		}
	},
	previewdownloadFile(url,name){
		console.log('url',url)
		// #ifdef H5
		uni.showToast({
			title: '请在手机上预览',
			icon: 'none'
		})
		// #endif
		// #ifdef APP-PLUS
		// console.log('---',url,name)
		uni.showLoading({
			title: '加载中',
			mask: true
		})
		uni.downloadFile({
		  url: url,
		  success: (res) => {
			  // console.log('文档路径',res);
		    var filePath = res.tempFilePath;
		    uni.openDocument({
		      filePath: filePath,
		      showMenu: true,
		      success: (res) => {
						uni.hideLoading()
		        // console.log('打开文档成功',res);
		      },
					fail: (res) => {
						uni.hideLoading()
					  // console.log('打开文档失败',res);
					}
		    });
		  }
		});
		// #endif
	},
	// 预览
	previewFile(fileUrl, fileName = '合规文件.doc') {
		let docArr = 'docx、docm、dotm、dotx、doc、xlsx、xlsb、xls、xlsm、pptx、ppsx、ppt、pps、pptm、potm、ppam、potx、ppsm';
		let pdfArr = 'pdf';
		let imgArr = 'png、jpg、svg、jpeg';
		let index = fileUrl.lastIndexOf('.') + 1;
		let suffix = fileUrl.substring(index).toLowerCase();
		if (docArr.indexOf(suffix) >= 0) {
			this.LoadPage('/pages/common/preView/preView?url=' + escape('https://view.xdocin.com/xdoc?_xdoc=' +
				fileUrl));
		} else if (pdfArr.indexOf(suffix) >= 0) {
			console.log('fileUrl',fileUrl)
			if (uni.getSystemInfoSync().platform == "ios") {
				this.LoadPage('/pages/common/preView/preView?url=' + escape('http://api.xszhg.cn/pdf/web/viewer.html?file=' +
					escape(fileUrl)));
			}else {
				this.LoadPage('/pages/common/preView/preView?url=' + escape('/hybrid/html/pdf/web/viewer.html?file=' +
					escape(fileUrl)));
			}
		} else if (imgArr.indexOf(suffix) >= 0) {
			this.LoadPage('/pages/common/preView/preView?url=' + escape(fileUrl));
		} else {
			uni.showToast({
				icon: false,
				title: '该文件不支持预览，请先进行下载！',
				mask: false,
				duration: 1500
			});
		}
	},
	GetVideoImage(videoUrl) {
		return new Promise((reslove, reject) => {
			// 在缓存中创建video标签
			var video = document.createElement("VIDEO");
			// 通过setAttribute给video dom元素添加自动播放的属性，因为视频播放才能获取封面图
			video.setAttribute('autoplay', 'autoplay');
			video.setAttribute('crossOrigin', 'anonymous');
			// 再添加一个静音的属性，否则自动播放会有声音
			video.setAttribute('muted', 'muted');
			// 上面我们只是创建了video标签，视频播放需要内部的source的标签，scr为播放源
			video.innerHTML = '<source src=' + videoUrl + ' type="audio/mp4">'
			// 再创建canvas画布标签
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			// video注册canplay自动播放事件
			video.addEventListener('canplay', function() {
				// 创建画布的宽高属性节点，就是图片的大小，单位PX
				var anw = document.createAttribute("width");
				anw.nodeValue = 500;
				var anh = document.createAttribute("height");
				anh.nodeValue = 300;
				canvas.setAttributeNode(anw);
				canvas.setAttributeNode(anh);
				// 画布渲染
				ctx.drawImage(video, 0, 0, 500, 300);
				// 生成图片
				var base64 = canvas.toDataURL('image/png'); // 这就是封面图片的base64编码
				// 视频结束播放的事件
				video.pause();
				console.log(base64); // 可打印看是不是base64编码图片
				reslove(base64);
			}, false);
		});
	},
	// 查看位置信息
	openLocation(address) {
		uni.showLoading({
			title: '加载中',
			mask: true
		})
		let key = '13c8076e19edcfe14dd6139a3fbd044c' //高德地图 web服务key
		uni.request({
			method: 'GET',
			url: 'https://restapi.amap.com/v3/geocode/geo?key=' + key + '&address=' + address,
			data: {},
			responseType: 'jsonp',
			success: (res) => {
				uni.hideLoading()
				if(res.data.status=='1') {
					let location = res.data.geocodes[0].location.split(',')
					let latitude = location[1]
					let longitude = location[0]
					uni.openLocation({
						latitude: Number(latitude),
						longitude: Number(longitude),
						address: address,
						success: () => {},
						fail: () => {
							uni.showToast({
								title: '打开地图失败',
								icon: 'none'
							})
						}
					})
				}
			},
			fail: (err) => {
				uni.hideLoading()
				uni.showToast({
					title: '地址解析失败',
					icon: 'none'
				})
			}
		})
	},
	// 合规尽调-录入数据 校验
	VerificationData(data,type) {
		if(type=='0') { //识别 内容数据录入校验
			let isVerifica = false
			data.forEach(el=>{
				el.List.forEach((item,index)=>{
					// 文本
					if(item.EssentialVal.Code=='Text') {
						if(item.EssentialVal.Data=='' && !isVerifica){
							isVerifica = item
							return
						}
					}
					// 数量|金额
					if(item.EssentialVal.Code=='Number' || item.EssentialVal.Code=='Money') {
						if((item.EssentialVal.Data=='' || item.EssentialVal.Data<=0) && !isVerifica){
							isVerifica = item
							return
						}
					}
				})
			})
			if(isVerifica) {
			  let title = isVerifica.EssentialVal.Name
				let tip = (isVerifica.EssentialVal.Code=='Number'|| isVerifica.EssentialVal.Code=='Money')?'不能为空或者不能小于等于0':'不能为空'
				uni.showToast({
					title: title+tip,
					icon: 'none'
				})
				return false
			}else{
				return true
			}
		}
		if(type=='1') { //预警|处置|激励 配置数据|内容数据录入校验
			let isVerifica = false
			data.forEach((item,index)=>{
				// 文本
				if(item.EssentialVal.Code=='Text') {
					if(item.EssentialVal.Data=='' && !isVerifica){
						isVerifica = item
						return
					}
				}
				// 数量|金额
				if(item.EssentialVal.Code=='Number' || item.EssentialVal.Code=='Money') {
					if((item.EssentialVal.Data=='' || item.EssentialVal.Data<=0) && !isVerifica){
						isVerifica = item
						return
					}
				}
			})
			if(isVerifica) {
			  let title = isVerifica.EssentialVal.Name
				let tip = (isVerifica.EssentialVal.Code=='Number'|| isVerifica.EssentialVal.Code=='Money')?'不能为空或者不能小于等于0':'不能为空'
				uni.showToast({
					title: title+tip,
					icon: 'none'
				})
				return false
			}else{
				return true
			}
		}
	},
	// 检查当前身份在合规里的权限
	checkAuth(code) {
		// console.log('code',code)
		let ByAuthList = uni.getStorageSync('ByAuthList');
		// console.log('ByAuthList',ByAuthList)
		let curAuth = 0  //0无权限 1查看权限 2管理权限
		if(ByAuthList.length>0) {
			ByAuthList.forEach(el=>{
				let filter = el.Data.filter(m=>m.Code_Nvarchar==code)
				// console.log('filter',filter)
				if(filter.length>0) {
					filter.every(item=>{
						curAuth = (item.AuthCode.indexOf(2)!=-1)?2:0
						if(curAuth==0){
							curAuth = (item.AuthCode.indexOf(1)!=-1)?1:0
						}else {
							return false
						}
					})
				}
			})
		}
		return curAuth
	},
	// 平台权限
	platformAuth(code) {
		// console.log('code',code)
		let ByAuthList = uni.getStorageSync('platformAuth');
		// console.log('ByAuthList=========',ByAuthList)
		let curAuth = 0  //0无权限 1查看权限 2管理权限
		if(ByAuthList.length>0) {
			ByAuthList.forEach(el=>{
				let filter = el.Data.filter(m=>m.Code_Nvarchar==code)
				// console.log('filter',filter)
				if(filter.length>0) {
					filter.every(item=>{
						curAuth = (item.AuthCode.indexOf(2)!=-1)?2:0
						if(curAuth==0){
							curAuth = (item.AuthCode.indexOf(1)!=-1)?1:0
						}else {
							return false
						}
					})
				}
			})
		}
		return curAuth
	},
	// 判断权限
	jurisdiction(code){
		if(!code){
			return 0
		}
		// 返回过来的 0查看 1管理  2任务推送
		// 先判断是否包含1 然后判断是否包含0 否值为0 查看权限    我们最终返回是0无权限 1查看权限 2管理权限
		let curAuth = (code.indexOf(1)!=-1)?2:0
		if(curAuth==0){
			curAuth = (code.indexOf(0)!=-1)?1:0
		}
		return curAuth
	},
	// 用中文获取判断里面的多个结构中是否其中一个有权限
	checkAuthTextArry(code) {
		// console.log('code',code)
		let ByAuthList = uni.getStorageSync('ByAuthList');
		// console.log('ByAuthList',ByAuthList)
		let curAuth = 0  //0无权限 1查看权限 2管理权限
		let all= 0
		if(ByAuthList.length>0) {
			ByAuthList.forEach(el=>{
				let filter = el.Data.filter(m=>
				  m.Name_Nvarchar.indexOf(code) != -1
				)
				if(filter.length>0) {
					filter.forEach(item=>{
						curAuth = (item.AuthCode.indexOf(2)!=-1)?2:0
						if(curAuth==0){
							curAuth = (item.AuthCode.indexOf(1)!=-1)?1:0
						}
						all+=curAuth
					})
				}
			})
		}
		return all
	},
	// 中文
	checkAuthtext(code) {
		// console.log('code',code)
		let ByAuthList = uni.getStorageSync('ByAuthList');
		// console.log('ByAuthList',ByAuthList)
		let curAuth = 0  //0无权限 1查看权限 2管理权限
		if(ByAuthList.length>0) {
			ByAuthList.forEach(el=>{
				let filter = el.Data.filter(m=>
				  m.Name_Nvarchar.indexOf(code) != -1
				)
				if(filter.length>0) {
					filter.every(item=>{
						curAuth = (item.AuthCode.indexOf(2)!=-1)?2:0
						if(curAuth==0){
							curAuth = (item.AuthCode.indexOf(1)!=-1)?1:0
						}else {
							return false
						}
					})
				}
			})
		}
		return curAuth
	},
	// 将数字转为汉字
	changeNumToHan(num) {
	  var arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
	  var arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']
	  if (!num || isNaN(num)) return '零'
	  var english = num.toString().split('')
	  var result = ''
	  for (var i = 0; i < english.length; i++) {
	    var des_i = english.length - 1 - i// 倒序排列设值
	    result = arr2[i] + result
	    var arr1_index = english[des_i]
	    result = arr1[arr1_index] + result
	  }
	  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十') // 将【零千、零百】换成【零】 【十零】换成【十】
	  result = result.replace(/零+/g, '零') // 合并中间多个零为一个零
	  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万') // 将【零亿】换成【亿】【零万】换成【万】
	  result = result.replace(/亿万/g, '亿') // 将【亿万】换成【亿】
	  result = result.replace(/零+$/, '') // 移除末尾的零
	  // 将【一十】换成【十】
	  result = result.replace(/^一十/g, '十')
	  return result
	},
	// 拨打电话
	MakePhoneCall(phone) {
		uni.makePhoneCall({
			phoneNumber: phone
		})
	},
	// 判断是否支持指纹认证
	checkIsSupportSoterAuth() {
		let show = false
		uni.checkIsSupportSoterAuthentication({
			success: (res) => {
				if(res.supportMode && res.supportMode.includes('fingerPrint')) {
					show = true
				}
			},
		})
		return show
	},
	// 复制文本
	copyText(val){
		let result
		// #ifndef H5
		uni.setClipboardData({
			data: val,
			success() {
				result = true
				uni.showToast({
					title: '复制成功',
					icon: 'none'
				})
			},
			fail() {
				result = false
			}
		});
		// #endif
		// #ifdef H5
			let textarea = document.createElement("textarea")
			textarea.value = val
			textarea.readOnly = "readOnly"
			document.body.appendChild(textarea)
			textarea.select() // 选中文本内容
			textarea.setSelectionRange(0, val.length)
			result = document.execCommand("copy")
			textarea.remove()
			// this.$toast.ShowTostNone("复制成功")
			uni.showToast({
				title: '复制成功',
				icon: 'none'
			})
		// #endif
		return result
	},
}
