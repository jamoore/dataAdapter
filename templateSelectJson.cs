
        public string Get[dataItem](ref DataTable dtReturn)
        {
            string returnMessage = "";
            SqlConnection thisConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["ola_ConnectionString"].ConnectionString);

            //Create Command object
            SqlCommand spCommand = thisConnection.CreateCommand();
            spCommand.CommandType = CommandType.StoredProcedure;

            try
            {
                // Open Connection
                thisConnection.Open();

                spCommand.CommandText = "Extranet_Select[dataItem]";

                SqlDataReader reader = spCommand.ExecuteReader();
                dtReturn.Load(reader);
            }

            catch (Exception ex)
            {
                returnMessage=ex.Message;
                Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"), "Error select [dataItem] files: " + ex.Message);
            }
            finally
            {
                thisConnection.Close();
            }
            return returnMessage;    
        }