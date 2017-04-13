var loadScript = function(path, callback){

	if( path.indexOf('.js') < 0){
		path += '.js';
	}
	var script = document.createElement("script");
	script.src = path;
	(document.getElementsByTagName('head')[0] || document.body).appendChild(script);

	script.onload = callback.call(null, script); 
}

var modules = {};

// 定义: 简单假设三个参数都存在
function define(id, deps, factory){
	var arg = []; 
	if( modules[id] ){
		return modules[id];
	}
	else {
		Array.isArray(deps)? '':deps = [deps];
		var depsCount = deps.length;
		var loadedCount = 0;

		deps && deps.forEach(function(dep, index){
			if( modules[dep] ){
				arg[index] = modules[dep];
				loadedCount ++; 
				if(loadedCount == depsCount){ 
					modules[id] = factory && factory.apply(null, arg);
					return modules[id];
			 	}
			}
			else {
				 loadScript(dep, function(content){
				 	loadedCount ++; 
				 	if(loadedCount == depsCount){ 
						modules[id] = factory && factory.apply(null, arg);
						return modules[id];
				 	}
				 })
			} 
		})

	}
}

// 引入
function require(deps, factory){
	if( arguments.length == 1){
		define('', deps);
	}
	else{ 
		define('', deps, factory);
	}
}