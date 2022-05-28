var gamename=[];
var gameId= [];
var Year= [];
var Price$=[];
var rating = ["ratings"];
var id=[];
let user;
let ty='';
let state=true;
let tableBody = '';

function getbook(){
	Papa.parse("../data/Game_list.csv", {
		download: true,
		complete: function(results) {
			get(results.data);
		}
	});
}

function parseData(createGraph) {
	Papa.parse("../data/rating.csv", {
		download: true,
		complete: function(results) {
			createGraph(results.data);
		}
	});
}

function createGraph(data) {
	console.log(data);
	for (var i = 1; i < data.length; i++) {
		if(data[i][0]==user){
			id.push(data[i][0]);
			gameId.push(data[i][1]);
			rating.push(data[i][2]);
		}
		else{
			continue;
		}
	}
	getbook();
	console.log(id,gameId,rating,gamename);
	var chart = c3.generate({
		bindto: '#chart',
	    data: {
	        columns: [
	        	rating
	        ],
			type: ty
	    },
	    axis: {
	        x: {
	            type: 'category',
	            categories: gameId,
	            tick: {
	            	multiline: false,
                	culling: {
                    	max: 12
                	}
            	}
	        }
	    },
		bar:{
			width:{
				ratio:0.5
			}
		},
	    legend: {
	        position: 'bottom'
	    }
	});
}
function get(info){
	for (var k=0; k<gameId.length;k++){
		for (var j = 1; j< info.length; j++){
			if (info[j][0]==gameId[k]){
				gamename[k]=new Array(5);
				gamename[k][0]=info[j][0];
				gamename[k][1]=info[j][1];
				gamename[k][2]=info[j][2];
				gamename[k][3]=info[j][3];
				gamename[k][4]=info[j][4];
			}
		}
	}
	console.log(gamename);
	table();
}

function gradeTable ( gamename ) {

	const tableHead = `
		<table >
			<thead>
				<tr class='highlight-row'>
					<th>Game Name</th>
					<th>Game Released</th>
					<th>Game Genres</th>
				</tr>
			</thead>
			<tbody>
	`;

	const tableFoot = `
			</tbody>
		</table>
	`;

	for ( let i = 0; i < gamename.length; i += 1 ) {

		let gametitle = gamename[i][1];
		let gamereleased = gamename[i][2];
		let gamegenres = gamename[i][3];
		tableBody += `
			<tr>
				<td>${gametitle}</td>
				<td>${gamereleased}</td>
				<td>${gamegenres}</td>
			</tr>
		`
	}
	return tableHead + tableBody + tableFoot;
}
function table(){
document.querySelector('.tab')
	.insertAdjacentHTML(
		'afterbegin',
		gradeTable( gamename)
	)}

	function processForm()
	{
	  var val = location.search.substring(1).split("&");
	  var temp = val[0].split("=");
	  user = unescape(temp[1]);
	  if (user>0 && user<6){
		parseData(createGraph);
	  }else{
		alert("Enter number between 1-5");
		 window.location.href="index.html";
	  }
	}
	if (state){
		processForm();
	}

function graphdisplay(){
	
		ty='';
		document.getElementById("grp").value="Bar Chart";
	
	state=false;
	gamename=[];
	gameId= [];
	rating = ["ratings"];
	id=[];
	tableBody='';
	document.querySelector('.tab').innerHTML="";
	parseData(createGraph);

}
