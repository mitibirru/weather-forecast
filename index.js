const http = require("http");
const fs = require("fs");
const requests = require("requests");

const htmlHomeFile = fs.readFileSync("home.html", "utf-8");

const roundoff = (val) => {
	return Math.round((val - 273 + Number.EPSILON) * 100) / 100;
};

const replaceVal = (tempVal, orgVal) => {
	let temperature = tempVal.replace(
		"{% tempVal %}",
		roundoff(orgVal.main.temp)
	);
	temperature = temperature.replace(
		"{% tempMinVal %}",
		roundoff(orgVal.main.temp_min)
	);
	temperature = temperature.replace(
		"{% tempMaxVal %}",
		roundoff(orgVal.main.temp_max)
	);
	temperature = temperature.replace("{%location%}", orgVal.name);
	temperature = temperature.replace("{%country%}", orgVal.sys.country);
	temperature = temperature.replace(
		"{% tempStatus %}",
		orgVal.weather[0].main
	);
	return temperature;
};

const server = http.createServer((req, res) => {
	if (req.url == "/") {
		requests(
			"https://api.openweathermap.org/data/2.5/weather?q=pune&appid=080556d160762d55601a3de6b76f4478"
		)
			.on("data", (chunkData) => {
				const arrData = [JSON.parse(chunkData)];
				console.log(arrData);
				const realTimeData = arrData
					.map((val) => replaceVal(htmlHomeFile, val))
					.join("");
				res.write(realTimeData);
			})
			.on("end", (err) => {
				if (err)
					return console.log("Connection closes due to error", err);
				res.end();
			});
	}
});

server.listen(8000, "127.0.0.1");

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
