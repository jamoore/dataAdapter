
        public string GetProjectItem(ref DataTable dtReturn)
        {
            string returnMessage = "";
            SqlConnection thisConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);

            //Create Command object
            SqlCommand spCommand = thisConnection.CreateCommand();
            spCommand.CommandType = CommandType.StoredProcedure;

            try
            {
                // Open Connection
                thisConnection.Open();

                spCommand.CommandText = "Extranet_SelectProjectItem";

                SqlDataReader reader = spCommand.ExecuteReader();
                dtReturn.Load(reader);
            }

            catch (Exception ex)
            {
                Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"), "Error select ProjectItem files: " + ex.Message);
            }
            finally
            {
                thisConnection.Close();
            }
            return returnMessage;    
        }