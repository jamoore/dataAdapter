var fs = require('fs');

 

module.exports = {
  clean: function () {
    
    fs.writeFile("outputAdapter.cs", "", function(err) {
    
    if(err) {
        console.log(err);
    } else {
        console.log("outputAdapter.cs cleared");
    }

	});

	fs.writeFile("outputSelectJson.ashx", "", function(err) {
    
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("outputSelectJson.ashx cleared");
	    }

	});


  } 
};

 