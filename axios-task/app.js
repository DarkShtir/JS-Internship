axios
	.get(
		'https://api.openweathermap.org/data/2.5/weather?q=Minsk&APPID=3eccf5edf65b61a0d3a4e1be2516e2fc'
	)
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.log(error);
	});
