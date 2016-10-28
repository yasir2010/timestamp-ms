var express = require('express');
var path = require('path');
var unixts = require('unix-timestamp');
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var app = express();

function givendate(urldate){
	try{
		var df = new Date(urldate);
		if(monthNames[df.getMonth()] === undefined){
			return null;
		}
		return  monthNames[df.getMonth()]+' '+df.getDate()+', '+df.getFullYear();
	}
	catch(e){
		return null;
	}		
}

function timestamp(date){
	var unixtime;
	var nat_lan_dat ;
	
	if((/^[0-9]+$/).test(date)){
		var mydate = new Date(unixts.toDate(+date));
		unixtime = +date;
		nat_lan_dat = monthNames[mydate.getMonth()]+' '+mydate.getDate()+', '+mydate.getFullYear();
	}else{
		unixtime = unixts.fromDate(date);
		nat_lan_dat = givendate(date);
	}
	
	var myobj = { "unix": unixtime, "natural" :  nat_lan_dat}
	return JSON.stringify(myobj);
}

app.get('/:str',function(req, res){
	res.end(timestamp(req.params.str));
});

app.get('/',function(req, res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
});
app.listen(process.env.PORT || 2000);