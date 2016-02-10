if(!window.Promise) {
	
	window.Promise = function(fn){
		
		var promise = this;
		
		this.RESOLVED = false;
		this.THEN_BUFFER = [];
		
		this.then = function(fn){
			
			this.THEN_BUFFER.push(fn);
			this.RESOLVED && this.flush();
			return this;
			
		}
		
		this.flush = function(){
			
			while(this.THEN_BUFFER.length)
					this.THEN_BUFFER.shift().apply(this, this.data);
			
		}
		
		fn(function(){
			
			promise.RESOLVED = true;
			promise.data = arguments;
			promise.flush();
			
		});
		
	}

	window.Promise.all = function(){
		
		var promises = 
			arguments[0] instanceof Array ?
			arguments[0] :
			arguments;
				
		return new Promise(function(resolve){
			
			for(var i in promises)
				resolveSelf(promises[i]);
			
			function resolveSelf(promise){
				
				promise.then(function(){
					
					promise.done = true;
					
					for(var i in promises)
						if(!promises[i].done) return;
						
					resolve();
					
				});
				
			}
				
		});
		
	};
	
}