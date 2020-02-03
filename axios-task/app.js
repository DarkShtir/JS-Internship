axios
	.get(
		'https://api.openweathermap.org/data/2.5/weather?q=Minsk&units=metric&APPID=3eccf5edf65b61a0d3a4e1be2516e2fc'
	)
	.then(function(response) {
		let tempInCelcium = response.data.main.temp;
		console.log(
			`Temp in Minsk in Celsiun ${tempInCelcium.toFixed(2)} degrees.`
		);
		let data = response.data;
		console.log(data);
	})
	.catch(function(error) {
		console.log(error);
	});
