(function(){
	var createApp = function(tpl,data){
		return new Vue({
			template:tpl,
			data:data
		})
	}
	if(typeof module !== "undefined" && module.exports){
		module.exports = createApp
	}else{
		this.app = createApp()
	}
}).call(this)