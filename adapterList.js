//set database table:
var dataItem="ProjectType";

var request = require("request")
var clean = require("./clean")
//library
var _ = require('underscore');
var S = require('string');
var fsDetail = require('fs');
var fsDetailNoImage = require('fs');
var fsList = require('fs');
var fsMenu = require('fs');

clean.clean();

//files
var jsonData;

var templateGetData="templateGetData.cs";
var outputAdapter="outputAdapter.cs";
var outputSelectJson="outputSelectJson.ashx";


var url = "https://script.google.com/macros/s/AKfycbzM_a6r68CIfpX4bOh3UiYXoTYXrf8xQ448Mg1shrR67GibDGE/exec?spreadsheet=1PcZjEkJA5KoKpllsvm9oBFy6NakyQI7tWyg2gjUvczs&sheet=adapter"


request({
    url: url
   
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        jsonData = JSON.parse(body);
    }
    else
    {
    	console.log('Error getting data: ' + error);
	    return;
    }

    //create adapter code
    fsList.readFile(templateGetData, 'utf8', function (err, data) {

		if (err) {
	    	console.log('templateListFile Error: ' + err);
	    	return;
	  	}

		templateDetail=S(data).replaceAll("[dataItem]",dataItem).s; 
		  
		fsList.appendFile(outputAdapter,templateDetail , function (err) {
			  		if (err) throw err;
			  		else
			  			console.log("Create adapter code");
		});	  		
	});//fsList.readFile(events, 'utf8', function (err, data) {

	//create select json
	writeSelectJson("public class " + dataItem);
	writeSelectJson("{" );
	_.map(jsonData, function(value, key) {
	  		_.map(value , function(value, key) {
				 
	  			writeSelectJson("\tpublic string " +value.name + " { get; set; }" );
			});//end _.map(value , function(value, key) {
		});//_.map(data, function(value, key) {
	writeSelectJson("}" );

	//get process top
	var contents = fsList.readFileSync('templateGetJsonProcess.cs').toString();
	contents=S(contents).replaceAll("[dataItem]",dataItem).s; 
	writeSelectJson(contents);

	_.map(jsonData, function(value, key) {
	  		_.map(value , function(value, key) {
	  			writeSelectJson("\tb." +value.name + " = dr[\""+value.name+"\"].ToString();" );
			});//end _.map(value , function(value, key) {
	});//_.map(data, function(value, key) {

	//get process bottom
	var contents = fsList.readFileSync('templateGetJsonProcessBottom.cs').toString();
	contents=S(contents).replaceAll("[dataItem]",dataItem).s; 
	writeSelectJson(contents);

//console.log(contents);


/*
fsList.readFile(templateListFile, 'utf8', function (err, data) {

		if (err) {
	    	console.log('templateListFile Error: ' + err);
	    	return;
	  	}

		templateDetail=data;
		  
	  	var tempList="";

	  	_.map(jsonData, function(value, key) {
	  		_.map(value , function(value, key) {
				tempList=S(templateDetail).replaceAll("[month]",value.month)
				.replaceAll("[city]",value.city)
				.replaceAll("[citylink]",value.citylink)
				.replaceAll("[state]",value.state)
				.replaceAll("[eventtitle]",value.eventtitle)
				.replaceAll("[eventtype]",value.eventtype)
				.replaceAll("[speaker]",value.speaker)
				.replaceAll("[image]",value.image) 
				.replaceAll("[description]",value.description)
				.replaceAll("[link]",value.urlLink) 
				.replaceAll("[date]",value.date).s; 
				fsList.appendFile(outputListFile, tempList, function (err) {
			  		if (err) throw err;
				});
			});//end _.map(value , function(value, key) {
		});//_.map(data, function(value, key) {
			
	});//fsList.readFile(events, 'utf8', function (err, data) {

*/
/*
    fsDetailNoImage.readFile(templateDetailFileNoImage, 'utf8', function (err, data) {

 
		if (err) {
	    	console.log('Error templateDetailNoImage: ' + err);
	    	return;
	  	}

		templateDetailNoImage=data;

		fsDetail.readFile(templateDetailFile, 'utf8', function (err, data) {

			if (err) {
		    	console.log('Error: ' + err);
		    	return;
		  	}

			templateDetail=data;
 
			_.map(jsonData , function(value, key) { 
			_.map(value , function(value, key) { 

			if(value.image=="")
			{
			temp=S(templateDetailNoImage).replaceAll("[month]",value.month)
				.replaceAll("[city]",value.city)
				.replaceAll("[citylink]",value.citylink)
				.replaceAll("[state]",value.state)
				.replaceAll("[eventtitle]",value.eventtitle)
				.replaceAll("[eventtype]",value.eventtype)
				.replaceAll("[header]",value.header)
				.replaceAll("[speaker]",value.speaker)
				.replaceAll("[image]",value.image) 
				.replaceAll("[description]",value.description)
				.replaceAll("[link]",value.urlLink) 
				.replaceAll("[nexttitle]",value.nexttitle) 
				.replaceAll("[nextmonth]",value.nextmonth) 
				.replaceAll("[nextcitylink]",value.nextcitylink) 
				.replaceAll("[date]",value.date).s; 
 
			}
			else
			{
 
				temp=S(templateDetail).replaceAll("[month]",value.month)
				.replaceAll("[city]",value.city)
				.replaceAll("[citylink]",value.citylink)
				.replaceAll("[state]",value.state)
				.replaceAll("[eventtitle]",value.eventtitle)
				.replaceAll("[eventtype]",value.eventtype)
				.replaceAll("[header]",value.header)
				.replaceAll("[speaker]",value.speaker)
				.replaceAll("[image]",value.image) 
				.replaceAll("[description]",value.description)
				.replaceAll("[link]",value.urlLink) 
				.replaceAll("[nexttitle]",value.nexttitle) 
				.replaceAll("[nextmonth]",value.nextmonth) 
				.replaceAll("[nextcitylink]",value.nextcitylink) 
				.replaceAll("[date]",value.date).s; 
			}

			fsDetail.appendFile(outputFile, temp, function (err) {
			  if (err) throw err;
			 // console.log('Append Details: '+value.title);
			});
	 		});//end value
		});


		});
	});//end fsDetailNoImage
	*/

});//end request

function writeSelectJson(data)
{

	fsList.appendFile(outputSelectJson,data+"\n" , function (err) {
			  		if (err) throw err;
			  		 
		});	

}