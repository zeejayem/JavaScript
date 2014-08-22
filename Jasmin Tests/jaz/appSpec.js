describe('Dependencies', function() {
	it('should be loaded', function() {
		expect(jQuery).toBeTruthy();
		expect($).toBeTruthy();
		expect(Handlebars).toBeTruthy();
		expect(staticObj).toBeTruthy();
	});
});

describe('Item constructor', function() {
	var item;

	beforeEach(function() {
		item = new Info(objMock);
	});

	it('should copy properties', function() {
		expect(item.name).toEqual(objMock.name);
		expect(item.type).toEqual(objMock.type);
		expect(item.internetHandle).toEqual(objMock.internetHandle);
	});

	it('.display() should return a string', function() {
		expect(typeof item.display()).toEqual('string');	
	});
});

describe('staticObj', function() {
	beforeEach(function() {
		$('body').append('<div id="outlet"></div>');
		//clear out data
		staticObj.data = [];
	});
	it('.sortit() should sort an array of strings', function() {
		var expectedArray = [{color:'blue'},{color:'purple'},{color:'red'}];
		staticObj.sortit('color', arrMock);
		expect(arrMock).toEqual(expectedArray);
	});	

	it('.insert() should insert items into the DOM', function() {
		//create a new Item object
		var itemObj = new Info(objMock);
		//test that outlet is empty
		expect($('#outlet').children().length).toEqual(0);
		//call insert with our new Item and outlet
		staticObj.insert(itemObj, $('#outlet'));
		//test that the outlet has one child
		expect($('#outlet').children().length).toEqual(1);
	});

	it('staticObj.parseGoogleData() should convert google data and append to staticObj', function() {
		//set parseGoogleData to data		
		staticObj.data = staticObj.parseGoogleData(googleDataMock);
		//test there are 3 items in data
		expect(staticObj.data.length).toEqual(3)
		//test that the first item is an instanceof Item
		expect(staticObj.data[0] instanceof Info).toBe(true);
		//test that the first item's name property is 'Foo Foo'
		expect(staticObj.data[0].name).toEqual('Foo Foo')
		//test that the first item's type property is 'Bunny'
		expect(staticObj.data[0].type).toEqual('Bunny')
	});

	it('.display() should append to the DOM', function() {
		//set parseGoogleData to data
		staticObj.data = staticObj.parseGoogleData(googleDataMock);
		//test that outlet is empty
		expect($('#outlet').children().length).toEqual(0);
		//call display
		staticObj.display();
		//test that outlet has 3 children
		expect($('#outlet').children().length).toEqual(3);
	});

	it('.displayCart() should append cart items to DOM', function() {
		//unimplemented
		//expect(false).toBe(true);
		//set parseGoogleData to data
		staticObj.data = staticObj.parseGoogleData(googleDataMock);
		//test that outlet is empty
		expect($('#outlet').children().length).toEqual(0);
		//set cart to ['2']
		staticObj.cart = ['2'];
		//call displayCart
		staticObj.displayCart();
		//test that outlet has one child
		expect($('#outlet').children().length).toEqual(1);
		//test that the name property equals 'Teddy' (may need to use .trim())
		expect(staticObj.data[1].name).toEqual('Teddy');
	});

	it('.addToCart() should add an item to the cart', function() {
		//unimplemented
		//expect(false).toBe(true);
		//set cart to empty array
		staticObj.cart = [];
		//use addToCart method with '2'
		staticObj.addToCart(2);
		//test that cart length equals 1
		expect(staticObj.cart.length).toEqual(1);
		//test that cart's first item equals '2'
		expect(staticObj.cart[0]).toEqual(2);
	});
	afterEach(function() {
		$('#outlet').remove();
	});
});

describe('DOM controls', function() {
	it('clicking Everything should call .display()', function() {
		//setup your DOM
		var displayLink = '<a href="#" onclick="staticObj.display()" id="all">All</a>';
		$('body').append(displayLink);
		//spy on the display function
		spyOn(staticObj, 'display');
		$('#all').trigger('click');
		expect(staticObj.display).toHaveBeenCalled();
	});

	it('clicking Cart should call .displayCart()', function() {
		//unimplemented
		//expect(false).toBe(true);
		$('body').append('<a href="#" onclick="staticObj.displayCart()" id="cart">Cart</a>');
		//spy on the displayCart function
		spyOn(staticObj, 'displayCart');
		//trigger click on cart
		$('#cart').trigger('click');
		//test if displayCart was called
		expect(staticObj.displayCart).toHaveBeenCalled();
	});

	it('clicking add button should add item to cart', function() {
		//unimplemented
		//expect(false).toBe(true);
		//append '<div id="outlet"></div>' to body
		$('body').append('<div id="outlet"></div>');
		//set parseGoogleData to data
		staticObj.data = staticObj.parseGoogleData(googleDataMock);
		//call display()
		staticObj.display();
		//set cart to empty array
		staticObj.cart = [];
		//trigger click on 3 item's button
		$('div:contains("grrrrrr")').next().trigger('click');
		//test if cart length is 1
		expect(staticObj.cart.length).toEqual(1);
		//test if first item in cart is '3'
		expect(staticObj.cart[0]).toEqual('3');
	});
});


var objMock = {
	name: 'Foo Foo',
	type: 'Bunny',
	internetHandle: 'uberRabbit'
};

var arrMock = [
	{color:'red'},
	{color:'blue'},
	{color:'purple'}
];

var objArrayMock = [
	{
		id: '1',
		name: 'Foo Foo',
		type: 'Bunny',
		handle: 'uberRabbit'
	},
	{
		id: '2',
		name: 'Teddy',
		type: 'Bear',
		handle: 'iLuvBears'
	},
	{
		id: '3',
		name: 'Spike',
		type: 'Dog',
		handle: 'grrrrrr'
	}
];

var googleDataMock = {
	feed: {
		entry: [
			{
				'gsx$id': {'$t': '1'},
				'gsx$name': {'$t': 'Foo Foo'},
				'gsx$type': {'$t': 'Bunny'},
				'gsx$handle': {'$t': 'uberRabbit'}
			},
			{
				'gsx$id': {'$t': '2'},
				'gsx$name': {'$t': 'Teddy'},
				'gsx$type': {'$t': 'Bear'},
				'gsx$handle': {'$t': 'iLuvBears'}
			},
			{
				'gsx$id': {'$t': '3'},
				'gsx$name': {'$t': 'Spike'},
				'gsx$type': {'$t': 'Dog'},
				'gsx$handle': {'$t': 'grrrrrr'}
			}
		]
	}
};