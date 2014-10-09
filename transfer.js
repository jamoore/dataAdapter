var Dropbox = require("dropbox");
var fs = require('fs');

var outputDetailFile="output.html";
var outputListFile="outputList.html";
var outputMenuFile="outputMenu.html";


 //https://dl.dropboxusercontent.com/spa/mpkzifzeghff5co/nodesyncapp/public/index.html

//client.authDriver(new Dropbox.AuthDriver.NodeServer(8191));

var client = new Dropbox.Client({
    key: "9eoj05496ydu8xm",
    secret: "nxy5vsy58n1i0j0"
});

client.authDriver(new Dropbox.AuthDriver.NodeServer(8191));


client.authenticate(function(error, client) {
  if (error) {
   console.log('Error: ' + error);
		    	return;
  }
 
//copy detail
async_uploadFile(outputDetailFile,function(error, data){

	async_uploadFile(outputListFile,function(error, data){
		async_uploadFile(outputMenuFile,function(error, data){});
	});
	// async_uploadFile(function(outputListFile){
	// 	async_uploadFile(function(outputMenuFile){});
	// });
});

 

}
);

var async_uploadFile= function(fileName,callback)
{
	fs.readFile(fileName, 'utf8', 
		function (err, data) {

			if (err) {
		    	console.log('Error: ' + err);
		    	return;
		  	}

		  	console.log("File read: " + fileName);

			client.writeFile(fileName, data, 
				function(error, stat) {
				  if (error) {
				    console.log(error);  // Something went wrong.
				    return;
				  }
				  console.log("File uploaded: "+fileName)
				  callback(null,fileName);
				}
			);
		}
	);
}
 
  
