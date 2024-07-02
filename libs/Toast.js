export default {
	ShowTostNone(message) {
		uni.showToast({
			icon: "none",
			title: message
		});
	},
	
	ShowModel(obj){
		uni.showModal(obj);
	},

	ShowTostNoneFun(message, fun) {
		uni.showToast({
			icon: "none",
			title: message,
			duration:1000,
			complete:function(){
				setTimeout(function(){fun()},1000);
			}
		});
	}
}
