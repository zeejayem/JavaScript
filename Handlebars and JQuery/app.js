console.log('loading app.js');

//custom object
//function Item(obj) {
	//copy obj props to this
function Info(objInfo)
{
	this.species = objInfo.species;
    this.breed = objInfo.breed;
	this.color = objInfo.color;
	this.call_name = objInfo.call_name;
	this.registered_name = objInfo.registered_name;
	this.gender = objInfo.gender;
	this.birthdate = objInfo.birthdate;
	this.pre_titles = objInfo.pre_titles;
	this.post_titles = objInfo.post_titles;
	
	this.display = function(){
	    var template = $("#itemTemplate").html();
	    var renderd = Handlebars.compile(template);
	    var result = renderd(this);
	    return result;     
  	}
}
//end of custom object

//static object start
var staticObj = 
{
	//insert: function(item, tag)
	insert : function(obj, objToInsertInto){
		var html = obj.display()
		objToInsertInto.append(html);
	},

	//megaParse: function(obj, tag)
	megaParse : function(array, objToInsertInto) {
		if(array instanceof Array)
		{
			staticObj.sortit('call_name', array)
			$.each(array, function (key, value){
				var newInfo = new Info(this);
				staticObj.insert(newInfo, objToInsertInto)
			});
		}
		else
		{
			staticObj.insert(array, objToInsertInto)
		}
	},
		
	//sort: function(prop, arr)
	sortit: function(propToSortBy, arrayToSort){
		arrayToSort.sort(function(a,b){
			return a[propToSortBy] > b[propToSortBy]; 
		});		
	}
}
//end of static object


//javascript array of objects
var array = 
	[{
		species : "Canine",
	    breed  : "German Shorthaired Pointer",
	    color : "Liver, patched, roan",
	    call_name : "Khan",
	    registered_name : "Weststar's Hurrikan Krieg Auf Vogeln",
	    gender  : "Male",
	    birthdate   : "20091117",
	    pre_titles : "Multi BISS, CH",
	    post_titles : "JH"
      },
      {
        species : "Canine",
        breed  : "German Shorthaired Pointer",
        color : "Liver, patched, roan",
        call_name : "Stormy",
        registered_name : "West Star's Perfect Storm",
        gender : "Female",
        birthdate   : "20091117",
        pre_titles : "BISS, CH",
        post_titles : "JH"
      },
      {
        species : "Canine",
        breed  : "Labrador",
        color : "Yellow",
        call_name : "Hank",
        registered_name : "Olympic's Hank Handsome",
        gender  : "Male",
        birthdate   : "20020502",
        pre_titles : "",
        post_titles : ""
      }];




//call megaParse
staticObj.megaParse(array, $('#items'));

//put any jQuery animations here



jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

$("#center").center();

$( ".hide" ).click(function() {
  $( ".panel-body" ).slideToggle( "slow", function() {
    // Animation complete.
  });
});





