CanvasJS.addColorSet("blueOnly",
	[
		"#36a2eb"
	]);

CanvasJS.addColorSet("cashSummaryColorSet",
	[
		"#FFDBA4",
		"#90C8AC",
	]);

CanvasJS.addColorSet("cashSummaryBLColorSet",
	[
		"#FFDBA4",
		"#90C8AC",
		"#a4c7ff",
		"#ffa4a4"
	]);



function renderPieCashSummaryBR(elem, dataPoints, title = "") {
	var chart = new CanvasJS.Chart(elem, {
		backgroundColor: "transparent",
		animationEnabled: false,
		colorSet: "cashSummaryColorSet",
		data: [{
			type: "pie",
			startAngle: 320,
			yValueFormatString: "#,##0.00",
			/*indexLabel: "{name} {y}",*/
			dataPoints: dataPoints
		}]
	});
	chart.render();
}

function renderPieCashSummaryDCOH(elem, dataPoints, title = "") {
	var chart = new CanvasJS.Chart(elem, {
		backgroundColor: "transparent",
		animationEnabled: false,
		colorSet: "cashSummaryColorSet",
		data: [{
			type: "pie",
			startAngle: 340,
			yValueFormatString: "#,##0.00",
			/*indexLabel: "{name} {y}",*/
			dataPoints: dataPoints
		}]
	});
	chart.render();
}

function renderPieCashSummaryBL(elem, dataPoints, title = "") {
	var chart = new CanvasJS.Chart(elem, {
		backgroundColor: "transparent",
		animationEnabled: false,
		colorSet: "cashSummaryBLColorSet",
		data: [{
			type: "column",
			startAngle: 320,
			yValueFormatString: "#,##0.00",
			/*indexLabel: "{name} {y}",*/
			dataPoints: dataPoints
		}]
	});
	chart.render();
}