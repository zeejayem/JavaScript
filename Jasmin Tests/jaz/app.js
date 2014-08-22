console.log('loading app.js');

//custom object
//function Item(obj) {
function Info(objInfo){
//copy obj props to this
	var stuff = this;
	if(objInfo){
		$.each(objInfo, function(key, val){
			stuff[key] = val;
		});
	}
//this.display = function()
	this.display = function(){
	    var source = $('#itemTemplate').html();
	    var template = Handlebars.compile(source);
	    var html = template(this);
	    return html;
	 };
}//end of custom object



//static object start
var staticObj = {

	//insert: function(item, tag)
	insert : function(item,tag){
		tag.append(item.display());
	},
	
		parseGoogleData: function(data) {
			var tempArr = [];
	        $.each(data.feed.entry, function(ix, val) {
	          var obj = {};
	          for(var key in val) {
	          	var matched = key.match(/gsx\$/);
	          	if(matched) {
	          		obj[key.slice(4)] = val[key].$t;
	          	}
	          }
	          //var itemObj = new Info(tempObj);//my constructr
	          //staticObj.data.push(itemObj);//to my static object
	          tempArr.push(new Info(obj));
	        });
	        return tempArr;
	      },	
	
	
	
	
	//load: function(callback)
	load: function(callback){
/*		var apiKey = '1M6zt4-laa8NExWfYVf4HkHGeQzxjSitucEyIsrBpNEQ';
		var googleUrl = 'https://spreadsheets.google.com/feeds/list/@apiKey/od6/public/values?alt=json-in-script';
		function parseGoogleData(data) {
	        $.each(data.feed.entry, function(ix, val) {
	          var tempObj = {};
	          for(var key in val) {
	          	var matched = key.match(/gsx\$/);
	          	if(matched) {
	          		tempObj[key.slice(4)] = val[key].$t;
	          	}
	          }
	          var itemObj = new Info(tempObj);//my constructr
	          staticObj.data.push(itemObj);//to my static object
	        });
	      }	
*/	      
	$.ajax({
		url : googleUrl.replace('@apiKey', apiKey),
	    dataType : 'jsonp',
	    success : function(data) {
	    	parseGoogleData(data)
	    	if(callback)callback(data);
	    }
	   });
	  },

	//sort: function(prop, arr)
	sortit: function(propToSortBy, arrayToSort){
		arrayToSort.sort(function(a, b){
			return a[propToSortBy].toLowerCase() > b[propToSortBy].toLowerCase(); 
		});		
	},

	//data: []
	data: [],

	//cart: []
	cart: [],

	//display: function()
    display: function(){
		$('#outlet').empty();
        $.each(staticObj.data, function(){
            staticObj.insert(this, $('#outlet'));
        });
    },
	
	//displayCart: function()
	displayCart: function(){
		$('#outlet').empty();
		$.each(staticObj.data, function(){
			if($.inArray(this.id, staticObj.cart) >= 0){
				staticObj.insert(this,$('#outlet'));
			}
		});	
		$('button').remove();
	},


	//addToCart: function(itemId)
	addToCart : function(itemId){
		if($.inArray(itemId, staticObj.cart) < 0) 
    	staticObj.cart.push(itemId);
    	console.log(itemId);
    	console.log(staticObj.cart);
    	//console.log(staticObj.data);
    }

}//end of static object

//call load with callback
staticObj.load(staticObj.display);


