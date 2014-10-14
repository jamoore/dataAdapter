public class Result
{
    public string error { get; set; }
    public bool success { get; set; }
}
List<Result> li = new List<Result>();
context.Response.ContentType = "application/json";
JavaScriptSerializer oSerializer = new JavaScriptSerializer();

ExtranetDataAccess extranetData = new ExtranetDataAccess();

Result result = new Result();

try
{
  string returnID="";
  string returnMessage = "";

	int id=extranetData.getInt(context.Request["id"]); 
	int clientID=extranetData.getInt(context.Request["clientID"]); 
	int typeID=extranetData.getInt(context.Request["typeID"]); 
	string title=extranetData.getStringFromObject(context.Request["title"]); 
	string description=extranetData.getStringFromObject(context.Request["description"]); 



	Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"),+",id: "+id+",clientID: "+clientID+",typeID: "+typeID+",title: "+title+",description: "+description);




	returnMessage= extranetData.UpdateProject( , id, clientID, typeID, title, description);

	if(returnMessage!="")
	{
		Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"), "Database Error: " + returnMessage);
		result.success=false;
		result.error=returnMessage;
	}
	else
	{
		result.success=true;
	}



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


public string UpdateProject(  , int id, int clientID, int typeID, string title, string description)

{string returnMessage = "";

SqlConnection thisConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
SqlCommand spCommand = thisConnection.CreateCommand();
spCommand.CommandType = CommandType.StoredProcedure;

try
{
	thisConnection.Open();
spCommand.CommandText = "Extranet_UpdateProject";
spCommand.Parameters.Add("@id", SqlDbType.Int );
spCommand.Parameters.Add("@clientID", SqlDbType.Int );
spCommand.Parameters.Add("@typeID", SqlDbType.Int );
spCommand.Parameters.Add("@title", SqlDbType.Text, 250);
spCommand.Parameters.Add("@description", SqlDbType.Text);


	spCommand.Parameters["@id"].Value = id;
	spCommand.Parameters["@clientID"].Value = clientID;
	spCommand.Parameters["@title"].Value = title;
	spCommand.Parameters["@typeID"].Value = typeID;
	spCommand.ExecuteReader();
}//END TRY
	spCommand.Parameters["@description"].Value = description;
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
}
