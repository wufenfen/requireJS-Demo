// 利用闭包创建局部作用域
(function(){
	// record all the loaded modules
	var moduleMap = {};

	function define(id, deps, factory){
		var modName = document.currentScript;
		var params = [];
		if(typeof id == "object" ){
			factory = deps;
			deps = id;
		}
		else{
			modName = id;
		}

		var depCount = deps && deps.length;
		// no dependencies, exercute the factory immediately
		if( !depCount ||  depCount == 0){
			return saveModule(modName, null ,factory)
		}
		else{
			deps.forEach(function(dep, i){
				(function(i){
					loadScript(dep, function(param){
						depCount--;
						params[i] = param;
						if(depCount==0){
							return saveModule(modName, params, factory);
						}
					})
				}(i))
			})
		}
	}

	function getURL(name){
		if( name.indexOf('.js') < 0){
			return name + '.js';
		}

		return name;
	}

	function loadScript(name, callback){
		var mod = moduleMap[name];

		if( mod ){
			if( mod.status == 'loaded' ){
				callback & callback(mod.export);
			}
			else{ // loading
				mod.onload.push(callback);
			}
		}
		else{

			moduleMap[name] = {
				status: 'loading',
				export: null,
				onload: [callback]
			}

			var url = getURL(name);

			var el = document.createElement('script');
			el.src = url;
			el.id = name;
			document.body.appendChild(el);
		}

	}

	function saveModule(name, params, callback){
		var mod = moduleMap[name];
		if( mod ){
			mod.status = 'loaded';  
			if( mod.export ){
				return mod.export;
			}
			mod.export = callback && callback.apply(this, params); 

			while( fn = mod.onload.pop() ){
				fn && fn(mod.export);
			}
		}
		else{
			callback.apply(this, params)
		}
	}

	window.define = define;
	window.require = define;

})()