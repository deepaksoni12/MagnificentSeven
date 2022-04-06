document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze() {
	language();
	sentiment();
}

function language() {
	var reqBody = {
		documents: [{
			language: "en",
			id: 1,
			text: document.getElementById("input").value
		}]
	};

	var myHeader = new Headers({
		"Content-Type": "application/json",
		"Ocp-Apim-Subscription-Key": "f7073fdbda244c0aa4e1504f3d8b2111"
	});

	var initObject = {
		method: "POST",
		body: JSON.stringify(reqBody),
		headers: myHeader
	};

	var request = new Request("https://deepaklanguage.cognitiveservices.azure.com/text/analytics/v3.1/languages?",
		initObject
	);

	fetch(request)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(new Error(response.statusText));
			}
		})
		.then(function (response) {
			document.getElementById("language").innerHTML =
				"<h5>" + response.documents[0].detectedLanguage.name + "</h5>";
		})
		.catch(function (err) {
			alert(err);
			document.getElementById("output").innerHTML = "";
		});
}

function sentiment() {
	var reqBody = {
		documents: [{
			language: "en",
			id: 1,
			text: document.getElementById("input").value
		}]
	};

	var myHeader = new Headers({
		"Content-Type": "application/json",
		"Ocp-Apim-Subscription-Key": "f7073fdbda244c0aa4e1504f3d8b2111"
	});

	var initObject = {
		method: "POST",
		body: JSON.stringify(reqBody),
		headers: myHeader
	};

	var request = new Request("https://deepaklanguage.cognitiveservices.azure.com/text/analytics/v3.1/sentiment?",
		initObject
	);

	fetch(request)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(new Error(response.statusText));
			}
		})
		.then(function (response) {
			var sentiment = response.documents[0].sentiment;
			document.getElementById("sentiment").innerHTML =
				"<h5>" +
				sentiment +
				"</h5>"
		})
		.catch(function (err) {
			alert(err);
			document.getElementById("sentiment").innerHTML = "Error";
		});
}
var output = document.getElementById("input");


input.addEventListener("change", function () {
	if (this.files && this.files[0]) {
		var reader = new FileReader();

		reader.addEventListener('load', function (e) {
			output.textContent = e.target.result;
		});

	}
});