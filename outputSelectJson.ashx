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

	int projectID=extranetData.getInt(context.Request["projectID"]); 
	int itemType=extranetData.getInt(context.Request["itemType"]); 
	string title=extranetData.getStringFromObject(context.Request["title"]); 
	string description=extranetData.getStringFromObject(context.Request["description"]); 
	string html=extranetData.getStringFromObject(context.Request["html"]); 



	Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"),+",projectID: "+projectID+",itemType: "+itemType+",title: "+title+",description: "+description+",html: "+html);




	returnMessage= extranetData.InsertProjectItem( ref returnID , projectID, itemType, title, description, html);

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
public string InsertProjectItem( ref string returnID , int projectID, int itemType, string title, string description, string html)

{string returnMessage = "";

SqlConnection thisConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
SqlCommand queryCommand = thisConnection.CreateCommand();
queryCommand.CommandType = CommandType.StoredProcedure;

try
{
	thisConnection.Open();
	queryCommand.CommandText = "Extranet_InsertProjectItem";
	queryCommand.Parameters.Add("@projectID", SqlDbType.Int );
	queryCommand.Parameters.Add("@itemType", SqlDbType.Int );
	queryCommand.Parameters.Add("@title", SqlDbType.Text, 500);
	queryCommand.Parameters.Add("@description", SqlDbType.Text);
	queryCommand.Parameters.Add("@html", SqlDbType.Text);


	queryCommand.Parameters["@projectID"].Value = projectID;
	queryCommand.Parameters["@itemType"].Value = itemType;
	queryCommand.Parameters["@title"].Value = title;
	queryCommand.Parameters["@description"].Value = description;
	queryCommand.Parameters["@html"].Value = html;
	
using (SqlDataReader reader = queryCommand.ExecuteReader())
	{
		if (reader.Read())
		{
			returnID = reader["ProjectItemID"].ToString();
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
