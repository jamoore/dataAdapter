
                        li.Add(b);
                    }
                }
            }
            catch (Exception ex)
            {
                 
                Logger.ErrorLog(HttpContext.Current.Server.MapPath("~/Logs/Log"), "Error getting [dataItem] list: " + ex.Message);
                
            }

            string sJSON = oSerializer.Serialize(li);
            context.Response.Write(sJSON);
        }
