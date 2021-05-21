let currDate = document.querySelector("#date");
let weathercon = document.querySelector("#weathercon");
let tempStatus = "{% tempStatus %}";
if (tempStatus == "Sunny") {
	weathercon.innerHTML = '<i class="fas fa-sun" style="color: #eccc68"></i>';
} else if (tempStatus == "Clouds") {
	weathercon.innerHTML =
		'<i class="fas fa-cloud" style="color: #f1f2f6"></i>';
} else if (tempStatus == "Rainy") {
	weathercon.innerHTML =
		'<i class="fas fa-cloud-rain" style="color: #a4b0be"></i>';
} else {
	weathercon.innerHTML =
		'<i class="fas fa-cloud" style="color: #44c3de"></i>';
}

let currentTime = new Date();

const getCurrentDay = () => {
	var weekDay = new Array(7);
	weekDay[0] = "Sun";
	weekDay[1] = "Mon";
	weekDay[2] = "Tues";
	weekDay[3] = "Wed";
	weekDay[4] = "Thurs";
	weekDay[5] = "Fri";
	weekDay[6] = "Sat";
	let day = weekDay[currentTime.getDay()];
	return day;
};
const getCurrentTime = () => {
	var months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	var month = months[currentTime.getMonth() + 0];
	var date = currentTime.getDate();
	let hours = currentTime.getHours();
	let mins = currentTime.getMinutes();
	let periods = "AM";
	if (hours > 11) {
		periods = "PM";
		if (hours > 12) hours -= 12;
	}
	if (mins < 10) mins = "0" + mins;
	return `${month} ${date} | ${hours}:${mins}${periods}`;
};

currDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();
