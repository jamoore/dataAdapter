public class ProjectType
{
	public string title { get; set; }
}

        public void ProcessRequest(HttpContext context)
        {
            List<ProjectType> li = new List<ProjectType>();
            context.Response.ContentType = "application/json";
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            
            ExtranetDataAccess extranetData = new ExtranetDataAccess();
           
            try
            {
                DataTable dtReturn = new DataTable();

                String returnMessage = "";
                
                returnMessage = extranetData.GetProjectType( ref dtReturn);

                if (returnMessage != "")
                {
                    Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"), "Error getting  ProjectType list: " + returnMessage.Replace("\n", ""));
                }
                else
                {

                    foreach (DataRow dr in dtReturn.Rows)
                    {
                         
                        ProjectType b = new ProjectType();
	b.title = dr["title"].ToString();

                        li.Add(b);
                    }
                }
            }
            catch (Exception ex)
            {
                 
                Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"), "Error getting ProjectType list: " + ex.Message);
                
            }

            string sJSON = oSerializer.Serialize(li);
            context.Response.Write(sJSON);
        }

