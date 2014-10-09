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
	int projectItemID=extranetData.getInt(context.Request["projectItemID"]); 
	string name=extranetData.getStringFromObject(context.Request["name"]); 
	string title=extranetData.getStringFromObject(context.Request["title"]); 
	string description=extranetData.getStringFromObject(context.Request["description"]); 
	string directory=extranetData.getStringFromObject(context.Request["directory"]); 
	string isAchived=extranetData.getStringFromObject(context.Request["isAchived"]); 



	Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"),+",id: "+id+",projectItemID: "+projectItemID+",name: "+name+",title: "+title+",description: "+description+",directory: "+directory+",isAchived: "+isAchived);




	returnMessage= extranetData.InsertSlideshow( ref returnID , id, projectItemID, name, title, description, directory, isAchived);

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
	Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"), "Error getting sent request: " + ex.Message);
}	 

li.Add(result);
string sJSON = oSerializer.Serialize(li);
context.Response.Write(sJSON);  


public string InsertSlideshow( ref string returnID , int id, int projectItemID, string name, string title, string description, string directory, string isAchived)

{string returnMessage = "";

SqlConnection thisConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
SqlCommand queryCommand = thisConnection.CreateCommand();
queryCommand.CommandType = CommandType.StoredProcedure;

try
{
	thisConnection.Open();
	queryCommand.CommandText = "Extranet_InsertSlideshow";
	queryCommand.Parameters.Add("@id", SqlDbType.Int );
	queryCommand.Parameters.Add("@projectItemID", SqlDbType.Int );
	queryCommand.Parameters.Add("@name", SqlDbType.Text, 500);
	queryCommand.Parameters.Add("@title", SqlDbType.Text, 250);
	queryCommand.Parameters.Add("@description", SqlDbType.Text);
	queryCommand.Parameters.Add("@directory", SqlDbType.Text, 250);


	queryCommand.Parameters["@id"].Value = id;
	queryCommand.Parameters["@projectItemID"].Value = projectItemID;
	queryCommand.Parameters["@name"].Value = name;
	queryCommand.Parameters["@title"].Value = title;
	queryCommand.Parameters["@description"].Value = description;
	queryCommand.Parameters["@directory"].Value = directory;
	queryCommand.Parameters["@isAchived"].Value = isAchived;
	
using (SqlDataReader reader = queryCommand.ExecuteReader())
	{
		if (reader.Read())
		{
			returnID = reader["SlideshowID"].ToString();
		}
	}
}//END TRY
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
