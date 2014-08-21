console.log('loading app.js');

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
	
//HTML string template
var template = 
			'<div>Species: {{species}}</div>' +
			'<div>Breed: {{breed}}</div>' +
			'<div>Color: {{color}}</div>' +
			'<div>Call Name: {{call_name}}</div>' +
			'<div>Registered Name: {{registered_name}}</div>'+
			'<div>Gender: {{gender}}</div>' +
			'<div>Birthdate: {{birthdate}}</div>' +
			'<div>Pre Titles: {{pre_titles}}</div>' +
			'<div>Post Titles: {{post_titles}}</div>' +
			'</br>';


//prettyPrint function
function prettyPrint(jsonObj)
{//template.replace
	//for(key in jsonObj){
	//	console.log("Prop is : "+ key +" value is "+ jsonObj[key]);
	//}
	
	var html = template.replace('{{species}}', jsonObj.species).
    					replace('{{breed}}',jsonObj.breed).
    					replace('{{color}}', jsonObj.color).
    					replace('{{call_name}}', jsonObj.call_name).
    					replace('{{registered_name}}',jsonObj.registered_name).
    					replace('{{gender}}', jsonObj.gender).
    					replace('{{birthdate}}', jsonObj.birthdate).
    					replace('{{pre_titles}}', jsonObj.pre_titles).
    					replace('{{post_titles}}', jsonObj.post_titles);
     			$('#items').append(html);
}



//megaParse function
function megaParse(objStr) 
{
	var jsonObj = JSON.parse(objStr);
	if(jsonObj instanceof Array)
	{
		//console.log("I'm in the if.");
		$.each(jsonObj, function (key,value){
			prettyPrint(value)
		});
		
	}
	else
	{
		//console.log("I'm in the else.")
		prettyPrint(jsonObj);
	}

}


//call megaParse with JSON array string
var stringified = JSON.stringify(array);
megaParse(stringified);

/*
 * for (var i = 0; i < items.length; i++) 
		{
			var object = items[i];
			for (var property in object) 
			{
				console.log('item ' + i + ': ' + property + ' = ' + object[property])
				$('#dog_' + i).append( property + ' = ' + object[property] +'<br>');
			}
		}
 * 
 */







