describe('Dependancies', function(){
	it('should be loaded.', function() {
		expect(jQuery).toBeTruthy();
		expect($).toBeTruthy();
		expect(Handlebars).toBeTruthy();
		expect(staticObj).toBeTruthy();
	});
});

describe('Info', function(){
	var item;
	
	beforeEach(function() {
		item = new Info(objMock);
	});
	
	it('should copy properties', function(){
		expect(item.name).toEqual(objMock.name);
		expect(item.species).toEqual(objMock.species);
		expect(item.breed).toEqual(objMock.breed);
	});
	
	it('.display() should return a string', function(){
	expect(typeof item.display()).toEqual('string');
	});
});

describe('staticObj.sortit', function(){
	it('.sortit() should sort an array of strings', function(){
		var expectArray = [{fruit: 'apple'},{fruit: 'banana'}, {fruit: 'orange'}];
		staticObj.sortit('fruit', mockArrayForSortit)
		expect(mockArrayForSortit).toEqual(expectArray);
		
	});
});

describe('staticObj.addToCart', function(){
	it('.addToCart() should add items in a cartArray without dups', function(){
		var expectCartArray = [{pet:'monkey'}, {pet: 'dog'}];
		staticObj.addToCart(mockArrayForCart[2]);
		staticObj.addToCart(mockArrayForCart[2]);
		staticObj.addToCart(mockArrayForCart[0]);
		expect(staticObj.cart).toEqual(expectCartArray)
	});
});

var objMock = {
	 name : 'Foo Foo',
	 species : 'Cat',
	 breed : 'Himalayan',
};

var mockArrayForSortit = [
{fruit: 'banana'}, 
{fruit: 'orange'}, 
{fruit: 'apple'}
];

var mockArrayForCart = [
{pet: 'dog'},
{pet: 'cat'},
{pet: 'monkey'}
];

