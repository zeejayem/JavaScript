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

	//data: []
	data: [],

	//cart: []
	cart: [],
	
	getCart : function() {
	var tempArr = JSON.parse(window.localStorage.cart);
		$.each(tempArr, function(ix, id){
			staticObj.addToCart(id);
		});	
		return tempArr;
	},
	
	saveCart : function() {
		window.localStorage.cart = JSON.stringify(staticObj.cart);	
	},

	//insert: function(item, tag)
	insert : function(item,tag){
		tag.append(item.display());
	},
	
	//load: function(callback)
	load: function(callback){
		//register handlebars partials
		Handlebars.registerPartial('addButton', $('#addButtonTemplate').html());
		Handlebars.registerPartial('removeButton', $('#removeButtonTemplate').html());
		
		//apiKey
		var apiKey = '1M6zt4-laa8NExWfYVf4HkHGeQzxjSitucEyIsrBpNEQ';
		var googleUrl = 'https://spreadsheets.google.com/feeds/list/@apiKey/od6/public/values?alt=json-in-script';
		function parseGoogleData(data) {
			var tempArr = [];
	        $.each(data.feed.entry, function(ix, val) {
	          var tempObj = {};
	          for(var key in val) {
	          	var matched = key.match(/gsx\$/);
	          	if(matched) {
	          		tempObj[key.slice(4)] = val[key].$t;
	          	}
	          }
	          tempObj.inCart = isInCart(tempObj.id);
	          tempArr.push(new Info(tempObj));
	        });
	        return tempArr;
	      }
	      function isInCart(id){
	      	return $.inArray(id, staticObj.cart) >= 0;
	      }	
	      
		$.ajax({
			url : googleUrl.replace('@apiKey', apiKey),
		    dataType : 'jsonp',
		    success : function(data) {
		    	staticObj.data = parseGoogleData(data)
		    	//set getCart to ToolBelt.cart
		    	staticObj.cart = staticObj.getCart();
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


	//display: function()
    display: function(){
		$('#outlet').empty();
        $.each(staticObj.data, function(){
            staticObj.insert(this, $('#outlet'));
        });
        //attach button clicks
        staticObj.attachButtonClick($('button'));
    },
    
	//displayCart: function()
	displayCart: function(){
		$('#outlet').empty();
		$.each(staticObj.data, function(){
			if($.inArray(this.id, staticObj.cart) >= 0){
				staticObj.insert(this,$('#outlet'));
			}
		});	
		//$('button').remove();
		//attach button clicks
		staticObj.attachButtonClick($('button'));
	},
    
	attachButtonClick: function(element) {
		function makeButton(templateId) {
			var source = $(templateId).html();
			var compiled = Handlebars.compile(source);
			return compiled();
		}
	
		function switchButton(element, templ) {
			element.find('button').remove();
			var buttonHtml = makeButton(templ);
			element.append(buttonHtml);
			staticObj.attachButtonClick(element.find('button'));
		}
	
		element.click(function(ev) { 
			var el = $(ev.currentTarget).parent();
			var id = el.attr('data-item-id');
			var isInCart = el.find('button').hasClass('inCart');
			if(isInCart) {
				staticObj.removeFromCart(id);
				switchButton(el, '#addButtonTemplate');
			} else {
				staticObj.addToCart(id);
				switchButton(el, '#removeButtonTemplate');
			}
			staticObj.saveCart();
		});
	},
	
	//addToCart: function(itemId)
	addToCart : function(itemId){
		if($.inArray(itemId, staticObj.cart) < 0){
			staticObj.cart.push(itemId);
	    	//find item and set inCart property to true
	    	$.each(staticObj.data, function(){
	    		if(this.id === itemId)
	    			this.inCart = true;
	    	});
		}
   },
   
   
   removeFromCart : function(itemId) {
		var ix = $.inArray(itemId, staticObj.cart);
		if(ix >= 0) {
			staticObj.cart.splice(ix, 1);
			//find item and set inCart property to false
			$.each(staticObj.data, function() {
				if(this.id === itemId)
					this.inCart = false;
			});
		}	
	},
   

};//end of static object

//call load with callback
staticObj.load(staticObj.display);


