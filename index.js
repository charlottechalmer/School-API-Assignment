/* jshint esversion:6 */

var http = require("http");
var fs = require("fs");

var classes = ["Fat Studies", "Psychology of Sexuality", "Reproductive Justice", "American Popular Music", "Jews and Fashion", "Consumer Culture"];
//these are real classes offered at my college- many of which I took!
var student = [
{
	name: "Fat Studies", 
	grade: "B",
	homework: false
},
{
	name: "Psychology of Sexuality", 
	grade: "B-",
	homework: true
},
{
	name: "Reproductive Justice",
	grade: "A+",
	homework: false,
}
];

var server = http.createServer((req, res) => { //creates the server
	if (req.url === "/index.html" || req.url === "/") {
		fs.readFile("index.html", (err, data) => {
			res.write(data);
			res.end();
		});
	} else if (req.url === '/index.css') { 
		fs.readFile('index.css', function (err, page) { 
			res.writeHead(200, {'Content-Type': 'text/css'}); 
			res.write(page); 
			res.end(); 
		}); 

	} else if (req.url === "/grades") { //if the URL is grades...
		if (req.method === "GET") { //...get the grades per student
			var grades = JSON.stringify(student);
			res.write(grades);
			res.end();
		} else if (req.method === "POST") {
			var queryData = "";
			
			req.on('data', function(data) {
				queryData += data;
				if(queryData.length > 1e6) {
					queryData = "";
					res.writeHead(413, {'Content-Type': 'text/plain'}).end();
					req.connection.destroy();
				}
			});
			req.on('end', function() {
				for (var classes in student) { //creates new object in student array
					if(classes !== queryData) {
						student[queryData] =  student.push({name: newClass, grade: "", homework: false});
					}
				}
			});
		}
	} else if (req.url === "/schedule") {
		if (req.method === "GET") { //gets schedule for student
			var schedule = JSON.stringify(student);
			res.write(schedule);
			res.end();
		} else if (req.method === "POST") {
			var queryData = "";
			
			req.on('data', function(data) {
				queryData += data;
				if(queryData.length > 1e6) {
					queryData = "";
					res.writeHead(413, {'Content-Type': 'text/plain'}).end();
					req.connection.destroy();
				}
			});
			req.on('end', function() {
				var newClass = {
					name: queryData, 
					grade: "",
					homework: false
				};
				student.push(newClass);
			});

		}
	} else if (req.url === "/homework") {
		if (req.method === "GET") { //gets homework for student
			var homework = JSON.stringify(student);
			res.write(homework);
			res.end();
		} else if (req.method === "POST") {
			var queryData = "";
			
			req.on('data', function(data) {
				queryData += data;
				if(queryData.length > 1e6) {
					queryData = "";
					res.writeHead(413, {'Content-Type': 'text/plain'}).end();
					req.connection.destroy();
				}
			});
			req.on('end', function() {
				for(var i = 0; i < student.length; i++) {
					if (student[i].name === queryData) {
						student[i].homework = true;
					}
				}
			});

		}
	} else {
		res.write("You've entered a space where nothing exists!");
		res.end();
	}
});
server.listen(8000, () => {
	console.log("Server started on port 8000");
});

console.log(student);












