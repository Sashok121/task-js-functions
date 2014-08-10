var jsonText2 = {
	"images":[
		{
			"name":"cat",
			"path":"images/cat.png",
			"description":"The best cat ever",
			"date":"2014-07-21T09:05:34.540Z"
		}, 
		{
			"name":"dog",
			"path":"images/dog.png",
			"description":"The best dof ever",
			"date":"2014-07-21T09:06:05.544Z"
		},
		{
			"name":"giraffe",
			"path":"images/giraffe.png",
			
			"date":"2014-07-21T09:07:24.187Z"
		},
		{
			"name":"dinosaur",
			"path":"images/dinosaur.png",
			"description":"The best dinosaur ever",
			"date":"2014-07-21T09:07:47.683Z"
		}
	]
},
jsonText1 = {
	"images":[
		{
			"name":"giraffe",
			"path":"images/giraffe.png",
			"description":"",
			"date":"2014-07-21T09:07:24.187Z"
		},
			
		{
			"name":"dinosaur",
			"path":"images/dinosaur.png",
			"description":"The best dinosaur ever",
			"date":"2014-07-21T09:07:47.683Z"
		}
	]

};

function Galery(jsonText) {	
	this.jsonText = jsonText;
	function parseFun(someText){
		return JSON.parse(someText, function (key, value){
			if(key === "date")
				return new Date(value);
			else 
				return value;
		});
	}

	function stringifyFun(galeryArray){
		return  JSON.stringify(galeryArray);		
	}
	
	this.addPic = function(obj){
		var galeryArray = parseFun(this.jsonText);
		var obj = obj || {};
		obj.name = obj.name  || "";
		obj.path = obj.path || "";
		obj.description = obj.description|| "";
		obj.date = obj.date ? (new Date(obj.date)) : "";
		var index = galeryArray.images.push(obj) - 1;

		this.jsonText = stringifyFun(galeryArray);

		this.informPic({'funName' : "Добавляеем ",'index' : index});	

	}
	this.removePicture = function(obj){
		var obj = obj || {};
		obj.index = obj.index || "";
		obj.key = obj.key || "";
		obj.value = obj.value || "";
		var galeryArray = parseFun(this.jsonText);
		this.informPic({'funName' : "Изменяем ",'index' : index});
		galeryArray.images[obj.index][obj.key] = obj.value
		this.jsonText = stringifyFun(galeryArray);
		this.informPic({'funName' : "Изменяем на ",'index' : index});
	}
	this.deletePicture = function(index){
		var galeryArray = parseFun(this.jsonText);
		this.informPic({'funName' : "Удаляем ",'index' : index});
		galeryArray.images.splice(index,1); 
		this.jsonText = stringifyFun(galeryArray);
	}
	this.informPic = function(obj){
		var obj = obj || {};
		obj.funName = obj.funName || "";
		obj.index = obj.index || "";
		var galeryArray = parseFun(this.jsonText);
		console.log(obj.funName+" -----------------------------------------");
		for (key in galeryArray.images[obj.index]) {			
			if(galeryArray.images[obj.index][key]){
				console.log(key,galeryArray.images[obj.index][key]);
			}				
		}
	}
	this.funToEnterJSON = function(){
		var galeryArray = parseFun(this.jsonText);
		funToEnter(galeryArray);
	}
	function funToEnter(galeryArray,str){
		str = str || "";
		if(typeof(galeryArray) == 'object'){
			str+="    ";
			for(key in galeryArray){
				if(typeof(galeryArray[key]) == 'object' && key != 'date')
					console.log(str,key);
				else
					console.log(str,key," ",galeryArray[key]);
				funToEnter(galeryArray[key],str);
			}	
		}		
	}
	this.funSort = function(name) {
		var galeryArray = parseFun(this.jsonText);		
		galeryArray.images.sort(function(val1, val2){
			if (val1[name] > val2[name]) 
				return 1;
			else 
				return -1;
		});		
		this.jsonText = stringifyFun(galeryArray);
	}
	this.filterFun = function(name,value) {
		var galeryArray = parseFun(this.jsonText);
		for(key in galeryArray.images) {
			if( galeryArray.images[key][name] == value)
				this.informPic({"funName" : "Фильтрация ","index" : key});
		}
		
	}
	this.filterJsonBy = function(obj){
		var obj = obj || {};
		obj.colls = obj.colls || ["name", "path", "description", "date" ];
		obj.filterColl = obj.filterColl || 'name';
		var galeryArray = parseFun(this.jsonText);
		
		galeryArray.images.forEach(function(key, value){
			if(key[obj.filterColl]){
				var newArray ={};				
				for (key1 in key) {					
					for (var i = 0; i < obj.colls.length; i++) {
						if(key1 == obj.colls[i]){							
							newArray[key1] = key[key1];
							continue;
						}
						continue;											
					};					
				}
				galeryArray.images[value] = newArray;				
			}
		
		});	
		this.jsonText = stringifyFun(galeryArray);
	}	

	this.checkByDescription = function() {
		var galeryArray = parseFun(this.jsonText);
		return galeryArray.images.every(function(key, value){
			return key.description ? true : false;
		});
	}	
}
//--------------------------------------
jsonText1 = JSON.stringify(jsonText1);
jsonText2 = JSON.stringify(jsonText2);
//--------------------------------------
var galery1 = new Galery(jsonText1);
var galery2 = new Galery(jsonText2);

galery1.addPic({
			"name":"giraffe",
			"path":"images/giraffe.png",
			"description":"",
			"date":"2014-07-21T09:07:24.187Z"
		});

//galery1.addPic.call(galery2);

//jsonText2 = galery2.jsonText;
galery2.filterJsonBy({"filterColl": "description"});
console.log(galery2.jsonText);
//console.log(galery1.checkByDescription());