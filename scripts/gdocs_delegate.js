function drawVisualization() {

    var clubQuery = new google.visualization.Query(
        'https://docs.google.com/spreadsheet/ccc?key=0AijI975RhygNdFY3YzJFQUlQRmk4WG5zbmZvY0tBVGc#gid=0');
    var orgQuery = new google.visualization.Query(
        'https://docs.google.com/spreadsheet/ccc?key=0AijI975RhygNdExibzF6czVJclU1T2dGb0JKazJJb2c#gid=0');
    
    
    // Send the query with a callback function.
    clubQuery.send(handleClubResponse);
    orgQuery.send(handleOrgResponse);

    queryRemainingMoney();

}

function queryRemainingMoney() {

  var remainingQuery = new google.visualization.Query(
        'https://docs.google.com/spreadsheet/ccc?key=0AijI975RhygNdFpGTzVweTI4SHhPbEl1aHZsT0xGd3c#gid=2');

  remainingQuery.send(handleRemainingMoneyResponse);
}

function handleClubResponse(response) {
  drawChartData(response.getDataTable(), true);
}

function handleOrgResponse(response) {
  drawChartData(response.getDataTable(), false);

}

function handleRemainingMoneyResponse(response) {

	// Find the current month and make an offset because its not in my spreadsheet in order.
	var month = new Date().getMonth();

	if (month >= 8 && month<= 11) {
		month -= 6;
	} else {
		month +=6;
	}

	// Find the span where this goes
	var money_span = document.getElementById('money_remaining');

  // Traverse the data table returned from the google doc to the right cell and put it in the span.
	var money_remaining = response.getDataTable().D[4].c[month].f;

	if (money_remaining > 300) {
		money_span.style.color = 'green';
	} 
	else if (money_remaining > 150) {
		money_span.style.color = 'orange';
	}
	else  {
		money_span.style.color = 'red';
	}

	money_span.innerHTML = '$' + money_remaining + '.';

  // Find the span where month goes
  var month_span = document.getElementById('month_span');

  month_span.innerText = current_month;
}

function drawChartData(data, forClubs) {
	var visualization;
	var options;

	if (forClubs) {
  	visualization = new google.visualization.PieChart(document.getElementById('clubChart'));
  	options = {
          title: 'Club Spending',
          titleTextStyle: {color: 'green'},
          vAxis: {title: 'Club Name',  titleTextStyle: {color: 'red'}},
          hAxis: {title: 'Amount Spent', titleTextStyle: {color: 'blue'}},
          legend: 'bottom'
        };
	} else {
  	visualization = new google.visualization.BarChart(document.getElementById('orgChart'));
  	options = {
          title: 'Organizational Spending',
          titleTextStyle: {color: 'green'},
          vAxis: {title: 'Organization Name',  titleTextStyle: {color: 'red'}},
          hAxis: {title: 'Amount Spent', titleTextStyle: {color: 'blue'}},
          legend: 'none'
        };
	}

    visualization.draw(data, options);
}

var current_date = new Date();
var month=new Array();
month[0]="January";
month[1]="February";
month[2]="March";
month[3]="April";
month[4]="May";
month[5]="June";
month[6]="July";
month[7]="August";
month[8]="September";
month[9]="October";
month[10]="November";
month[11]="December";
var current_month = month[current_date.getMonth()];