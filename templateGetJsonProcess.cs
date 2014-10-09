
        public void ProcessRequest(HttpContext context)
        {
            List<[dataItem]> li = new List<[dataItem]>();
            context.Response.ContentType = "application/json";
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            
            ExtranetDataAccess extranetData = new ExtranetDataAccess();
           
            try
            {
                DataTable dtReturn = new DataTable();

                String returnMessage = "";
                
                returnMessage = extranetData.Get[dataItem]( ref dtReturn);

                if (returnMessage != "")
                {
                    Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"), "Error getting  [dataItem] list: " + returnMessage.Replace("\n", ""));
                }
                else
                {

                    foreach (DataRow dr in dtReturn.Rows)
                    {
                         
                        [dataItem] b = new [dataItem]();