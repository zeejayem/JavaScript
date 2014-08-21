console.log('loading app.js');

//static object starts here
var staticObj = {
	//pretty print function: function(obj, jsonObjToInsertInto)	
	prettyPrint : function(jsonObj, jsonObjToInsertInto)
	{
		var html = $('#template').html();
		
		var updatedHTML = html.
					replace('{{species}}', jsonObj.species).
				    replace('{{breed}}',jsonObj.breed).
					replace('{{color}}', jsonObj.color).
					replace('{{call_name}}', jsonObj.call_name).
					replace('{{registered_name}}',jsonObj.registered_name).
					replace('{{gender}}', jsonObj.gender).
					replace('{{birthdate}}', jsonObj.birthdate).
					replace('{{pre_titles}}', jsonObj.pre_titles).
					replace('{{post_titles}}', jsonObj.post_titles);
					
		items = $('#items');
		items.append(updatedHTML);
	},
	//megaparse : function(jsonString, jsonObjToInsertInto)
	megaParse : function(objStr, jsonObjToInsertInto) 
	{
		var jsonObj = JSON.parse(objStr);
		
		if(jsonObj instanceof Array)
		{
			staticObj.sortit('call_name', jsonObj)
			$.each(jsonObj, function (key, value){
				staticObj.prettyPrint(value)
			});
		}
		else
		{
			staticObj.prettyPrint(jsonObj, jsonObjToInsertInto)
		}
	
	},
	//sort function: function(propertyToSortyBy, arrayToSort)
	sortit: function(propToSortBy, arrayToSort)
	{
		 arrayToSort.sort(function(a,b)
		 {
			return a[propToSortBy] > b[propToSortBy];
		 
		 });		
	}
};
//static object ends


//JSON array of objects
var array = 
   [ 
       {
          "species" : "Canine",
          "breed"  : "German Shorthaired Pointer",
          "color" : "Liver, patched, roan",
          "call_name" : "Khan",
          "registered_name" : "Weststar's Hurrikan Krieg Auf Vogeln",
          "gender"  : "Male",
          "birthdate"   : "20091117",
          "pre_titles" : "Multi BISS, CH",
          "post_titles" : "JH"
       },
       {
          "species" : "Canine",
          "breed"  : "German Shorthaired Pointer",
          "color" : "Liver, patched, roan",
          "call_name" : "Stormy",
          "registered_name" : "West Star's Perfect Storm",
          "gender" : "Female", 
          "birthdate"   : "20091117",
          "pre_titles" : "BISS, CH",
          "post_titles" : "JH"
       },
       {
          "species" : "Canine",
          "breed"  : "Labrador",
          "color" : "Yellow",
          "call_name" : "Hank",
          "registered_name" : "Olympic's Hank Handsome",
          "gender"  : "Male", 
          "birthdate"   : "20020502",
          "pre_titles" : "",
          "post_titles" : ""
       }
   ];
   
//JSON single object (used for testing)
var object = {
          "species" : "Canine",
          "breed"  : "German Shorthaired Pointer",
          "color" : "Liver, patched, roan",
          "call_name" : "Khan",
          "registered_name" : "Weststar's Hurrikan Krieg Auf Vogeln",
          "gender"  : "Male",
          "birthdate"   : "20091117",
          "pre_titles" : "Multi BISS, CH",
          "post_titles" : "JH"
      };
	

//call megaParse here with json string and $('#items')
var stringified = JSON.stringify(array);
staticObj.megaParse(stringified, $('#items'));


















