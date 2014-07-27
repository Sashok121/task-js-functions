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
},
jsonText1= {
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

gallery = function(jsonText){
	return {
		parseFun : function (){
			return JSON.parse(jsonText, function (key, value){
				if (key === "date") {
					if (!value) { 
						var year = new Date();				
						return new Date(year.getFullYear()+"-"+(year.getMonth()+1)+"-"+year.getDate());
					};
					return new Date(value);
				} else {
					return value;
				}
			});
		},

		stringifyFun : function (galeryArray){
			return  jsonText = JSON.stringify(galeryArray);
		},
		
		addPicture : function(name, path, description, date){
			var galeryArray = this.parseFun(this.jsonText);				
			var addMassive = {
				name : name,
				path : path,
				description : description,
				date : new Date(date)
			};
			var index = galeryArray.images.push(addMassive) - 1;				
			
			this.stringifyFun(galeryArray);	
					
			this.informPic("Добавляеем ", index);			
		},
		
		removePicture : function(index, key, value){
			var galeryArray = this.parseFun(jsonText);
			this.informPic("Изменяем ", index);			
			galeryArray.images[index][key] = value;				
			jsonText = this.stringifyFun(galeryArray);
			this.informPic("Изменяем на ", index);
		},

		deletePicture : function(index){
			var galeryArray = this.parseFun(jsonText);
			this.informPic("Удаляем ", index);
			galeryArray.images.splice(index,1);		 
			this.stringifyFun(galeryArray);
		},

		informPic : function(funName,index ){
			var galeryArray = this.parseFun(jsonText);
			console.log(funName+" -----------------------------------------");
			for (key in galeryArray.images[index]) {
					if(galeryArray.images[index][key]){
						console.log(key,galeryArray.images[index][key]);
					}				
				}		
		},
		funToEnterJson : function(){
			var galeryArray = this.parseFun(jsonText);
			for (key in galeryArray.images){
				this.informPic("", key);
				
			}
		},
		funSort : function(name){
			var galeryArray = this.parseFun(jsonText);
			galeryArray.images.sort(function(value1, value2){
				if(value1[name] > value2[name]){
					return 1;
				} else if(value1[name] > value2[name]){
					return -1;
					}
				
				return 0;
			});
			this.jsonText = this.stringifyFun(galeryArray);
		},
		filterFun : function(name, value){
			var galeryArray = this.parseFun(jsonText);
			for( key in galeryArray.images){
				if(galeryArray.images[key][name] == value){
					 this.informPic("Фильтрация ", key);
				}				
			}
		},
		filterJsonByName : function(){
			var galeryArray = this.parseFun(jsonText);			
			var galeryNewArray=[];

			galeryArray.images.forEach(function(key,index,galeryArray){
				galeryNewArray.push({"name": key['name']});
			});
			galeryArray.images = galeryNewArray;			
			jsonText = this.stringifyFun(galeryArray);
		},
		filterJsonBy : function(name){
			var galeryArray = this.parseFun(jsonText);					
			galeryArray.images.forEach(function(key, index){
				if(!key[name]){
					galeryArray.images.splice(index,1)
				}
						
			});
			jsonText = this.stringifyFun(galeryArray);
		},
		checkAll : function(){
			var galeryArray = this.parseFun(jsonText);
			return galeryArray.images.every(function(key){
				return key.description ? true : false;
			});
		}
	};
};

jsonText2 = JSON.stringify(jsonText2);
jsonText1 = JSON.stringify(jsonText1);

gallery1 = gallery(jsonText2);
gallery2 = gallery(jsonText1);

//gallery1.addPicture('eawedfe','images/giraffe.png');
//gallery1.removePicture(2,'name','giraffes');
//gallery1.deletePicture(4);
//gallery1.addPicture('ffbf',"","images/dog.png" );

//gallery1.funSort('name');
//
//gallery1.filterFun('path',"images/giraffe.png");
//gallery1.filterJsonBy("path");
//gallery1.filterJsonByName();
//console.log(gallery1.checkAll());
//gallery1.funToEnterJson();


//
gallery1.addPicture('eawedfe',"images/giraffe.png");
gallery1.addPicture.call(gallery2,'eawedfe',"images/giraffe.png");
gallery1.funSort.call(gallery2,'name');
gallery1.deletePicture.call(gallery2, 1);
gallery1.funToEnterJson.call(gallery2);
console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
gallery1.funToEnterJson();