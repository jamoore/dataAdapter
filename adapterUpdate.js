//set database table:
var dataItem="Project";

var request = require("request")
var clean = require("./clean")
var M = require('mstring')
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
var outputSQL="outputSQL.sql";

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

	//START GET REQUEST
var getRequest = M(function(){
/***
public class Result
{
    public string error { get; set; }
    public bool success { get; set; }
}
***/});

writeSelectJson(getRequest);

getRequest = M(function(){
  /***
List<Result> li = new List<Result>();
context.Response.ContentType = "application/json";
JavaScriptSerializer oSerializer = new JavaScriptSerializer();

ExtranetDataAccess extranetData = new ExtranetDataAccess();

Result result = new Result();

try
{
    string returnID="";
    string returnMessage = "";

  ***/});
	 
	writeSelectJson(getRequest);

	_.map(jsonData, function(value, key) {
  		_.map(value , function(value, key) {
  			if(value.type=="int")
			{
				writeSelectJson("\tint " +value.name + "=extranetData.getInt(context.Request[\""+value.name+"\"]); " );
			}
			else
			{
				writeSelectJson("\tstring " +value.name + "=extranetData.getStringFromObject(context.Request[\""+value.name+"\"]); " );
			}
  			 
		});//end _.map(value , function(value, key) {
	});//_.map(data, function(value, key) {	

		writeInline("\n\n\n");

	writeInline("\tLogger.ErrorLog(HttpContext.Current.Server.MapPath(\"~/Logs/Log\"),");

	_.map(jsonData, function(value, key) {
  		_.map(value , function(value, key) {
  			 
			 

			writeInline("+\","+value.name +": \"+"+value.name);
			 
  			 
		});//end _.map(value , function(value, key) {
	});//_.map(data, function(value, key) {	

	writeInline(");");

	writeInline("\n\n\n");
 
	//END GET REQUEST
	//START DATA ACCESS

	writeInline("\n\n" );
	writeInline("\treturnMessage= extranetData.Update"+dataItem+"( " );

	_.map(jsonData, function(value, key) {
	  		_.map(value , function(value, key) {
	  			writeInline(", " +value.name);
			});//end _.map(value , function(value, key) {
		});//_.map(data, function(value, key) {	

	writeInline(");");

	writeInline("\n\n" );
 
  	writeLine("\tif(returnMessage!=\"\")");
  	writeLine("\t{");
	writeLine("\t\tLogger.ErrorLog(HttpContext.Current.Server.MapPath(\"~/Logs/Log\"), \"Database Error: \" + returnMessage);");
	writeLine("\t\tresult.success=false;");
	writeLine("\t\tresult.error=returnMessage;");
  	writeLine("\t}");
	writeLine("\telse");
	writeLine("\t{");
	writeLine("\t\tresult.success=true;");
	writeLine("\t}");
		 
getRequest = M(function(){
/***
}
catch (Exception ex)
{
    result.success=false;
    result.error=ex.Message;
	Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"), "Error getting sent request: " + ex.Message);
}	 

li.Add(result);
string sJSON = oSerializer.Serialize(li);
context.Response.Write(sJSON);  


***/});


writeInline("\n\n\n");

	writeSelectJson(getRequest);

	writeInline("public string Update"+dataItem+"(  " );

	
	_.map(jsonData, function(value, key) {
	  		_.map(value , function(value, key) {
	  			if(value.type=="int")
  				{
  					writeInline(", int " +value.name);
  				}
  				else
  				{
  					writeInline(", string " +value.name);
  				}
	  			 
			});//end _.map(value , function(value, key) {
		});//_.map(data, function(value, key) {	

	writeInline(")\n\n");
	writeInline("{" );

	writeSelectJson("string returnMessage = \"\";\n");
 
    writeSelectJson("SqlConnection thisConnection = new SqlConnection(ConfigurationManager.ConnectionStrings[\"ConnectionString\"].ConnectionString);");

    writeSelectJson("SqlCommand spCommand = thisConnection.CreateCommand();");
    writeSelectJson("spCommand.CommandType = CommandType.StoredProcedure;\n");

    writeSelectJson("try");
    writeSelectJson("{");
    writeSelectJson("\tthisConnection.Open();");

    writeSelectJson("\spCommand.CommandText = \"Extranet_Update"+dataItem+"\";");


	_.map(jsonData, function(value, key) {
  		_.map(value , function(value, key) {
  			 

  			if(value.type=="int")
  			{
  				writeSelectJson("\spCommand.Parameters.Add(\"@" +value.name+"\", SqlDbType.Int );");
  			}
  			else if(value.type.indexOf("varchar")>=0)
  			{
  				writeSelectJson("\spCommand.Parameters.Add(\"@" +value.name+"\", SqlDbType.Text, "+value.length+");");	
  			}
  			else if(value.type=="text")
  			{
  				writeSelectJson("\spCommand.Parameters.Add(\"@" +value.name+"\", SqlDbType.Text);");	
  			}
		});//end _.map(value , function(value, key) {
	});//_.map(data, function(value, key) {	

	writeInline("\n\n");

	_.map(jsonData, function(value, key) {
  		_.map(value , function(value, key) {

  			writeSelectJson("\tspCommand.Parameters[\"@" +value.name+"\"].Value = " +value.name+";");
		});//end _.map(value , function(value, key) {
	});//_.map(data, function(value, key) {

	writeSelectJson("\tspCommand.ExecuteReader();");
    writeSelectJson("}//END TRY");


var catchString = M(function(){
  /***
catch (Exception ex) 
{ 
    returnMessage = ex.Message;
  
    Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"), "Error inserting: " + ex.Message); 
}
finally 
{ 
    thisConnection.Close(); 
} 
return returnMessage;    
***/});

    writeSelectJson(catchString);

    writeSelectJson("}");

 

    _.map(jsonData, function(value, key) {
	  		_.map(value , function(value, key) {
	  			
  					writeLineSQL("@"+ value.name +" AS " + value.type);
  				
			});//end _.map(value , function(value, key) {
		});//_.map(data, function(value, key) {	

	writeLineSQL("\n\n\n");


	writeLineSQL("UPDATE "+dataItem+" SET ");	

	_.map(jsonData, function(value, key) {
  		_.map(value , function(value, key) {
  			
			writeLineSQL( value.name +"=@" + value.name);
				
		});//end _.map(value , function(value, key) {
	});//_.map(data, function(value, key) {

		writeLineSQL("WHERE "+jsonData.adapter[0].name+" = @"+jsonData.adapter[0].name);	

});//end request




 





















//  functions

function writeSelectJson(data)
{
	fsList.appendFile(outputSelectJson,data+"\n" , function (err) {
			  		if (err) throw err;
		});	
}

function writeInline(data)
{
	fsList.appendFile(outputSelectJson,data , function (err) {
			  		if (err) throw err;
			  		 
		});	
}

function writeLine(data)
{
	fsList.appendFile(outputSelectJson,data+"\n" , function (err) {
			  		if (err) throw err;
			  		 
		});	
}


function writeInlineSQL(data)
{
	fsList.appendFile(outputSQL,data , function (err) {
			  		if (err) throw err;
			  		 
		});	
}

function writeLineSQL(data)
{
	fsList.appendFile(outputSQL,data+"\n" , function (err) {
			  		if (err) throw err;
			  		 
		});	
}