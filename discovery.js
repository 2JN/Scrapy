var http = require("http");

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

var cheerio = require("cheerio");

var url = "http://www.tudiscovery.com/programacion-de-tv/?type=day&channel_code=DCLA-SP"

download(url, function(data) {
	if (data) {
		var $ = cheerio.load(data);
		$("tr.no-reminders").each(function(i, e){
			var time = $(e).find("td.listings-time > span.time").text();
			//var program = $(e).find("tr.no-reminders > td > dl > dt > strong > em > a").text();
			console.log(time)
		})
	}else console.log("error");
});