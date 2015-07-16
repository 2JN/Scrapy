var http = require("http");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host : "db4free.net",
  user : "josuechaqui",
  password : "root123",
  database : "bdapptele",
})

connection.connect(function(err){
  if(err){
    console.error('error connecting: ' + err.stack);
    return;
  }
  
  console.log('connected as id ' + connection.threadId);
})

//borrar los datos viejos
connection.query("DELETE FROM programa WHERE canal_idcanal = 9");

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

var url = "http://www.gatotv.com/canal/the_film_zone"

//contador para el programa en la BD
var id = 160;

download(url, function(data){
  if (data){
    var $ = cheerio.load(data);

    //horarios y programas 1
    $("tr.tbl_EPG_row").each(function(i,e){
      var time = $(e).find("td > div.tbl_EPG_TimesColumn").text();
      var movie = $(e).find("td.pelicula > div").text();

      //arreglar las cadenas de hora
      if(time.slice(6,7) == "p"){
        if(time.slice(0,2) == "12"){
          time = time.slice(0,5);
        }
        else{
          var format = (parseInt(time.slice(0,2)) + 12);
          time = (format.toString() + time.slice(2,5));
        }
      }else if(time.slice(5,6) == "p"){
        var format = (parseInt(time.slice(0,1)) + 12);
        time = (format.toString() + time.slice(1,4));
      }else if(time.slice(6,7) == "a"){
        if(time.slice(0,2) == "12"){
         var format = (parseInt(time.slice(0,2)) + 12);
         time = (format.toString() + time.slice(2,5));
        }else{
          time = time.slice(0,5);
        }        
      }else if(time.slice(5,6) == "a"){
        time = time.slice(0,4);
      }

      console.log(time);
      console.log(movie);

      if (movie.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(movie.length > 45){
          movie = movie.slice(0,26);
        }
        var programa = {idprograma: id, nombre: movie.trim(), horaDeInicio: time, canal_idcanal: 9};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      id = id + 1;
    });

    
    //horarios y programas 2
    $("tr.tbl_EPG_rowAlternate").each(function(i,e){
      var time = $(e).find("td > div.tbl_EPG_TimesColumn").text();
      var movie = $(e).find("td.pelicula > div").text();

      //arreglar las cadenas de hora
      if(time.slice(6,7) == "p"){
        if(time.slice(0,2) == "12"){
          time = time.slice(0,5);
        }
        else{
          var format = (parseInt(time.slice(0,2)) + 12);
          time = (format.toString() + time.slice(2,5));
        }
      }else if(time.slice(5,6) == "p"){
        var format = (parseInt(time.slice(0,1)) + 12);
        time = (format.toString() + time.slice(1,4));
      }else if(time.slice(6,7) == "a"){
        if(time.slice(0,2) == "12"){
         var format = (parseInt(time.slice(0,2)) + 12);
         time = (format.toString() + time.slice(2,5));
        }else{
          time = time.slice(0,5);
        }        
      }else if(time.slice(5,6) == "a"){
        time = time.slice(0,4);
      }

      console.log(time);
      console.log(movie);

      if (movie.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(movie.length > 45){
          movie = movie.slice(0,26);
        }
        var programa = {idprograma: id, nombre: movie.trim(), horaDeInicio: time, canal_idcanal: 9};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      id = id + 1;
    });

    //horario y programa actual
    $("tr.tbl_EPG_row_selected").each(function(i,e){
      var time = $(e).find("td > div.tbl_EPG_TimesColumn").text();
      var movie = $(e).find("td.pelicula > div").text();

      //arreglar las cadenas de hora
      if(time.slice(6,7) == "p"){
        if(time.slice(0,2) == "12"){
          time = time.slice(0,5);
        }
        else{
          var format = (parseInt(time.slice(0,2)) + 12);
          time = (format.toString() + time.slice(2,5));
        }
      }else if(time.slice(5,6) == "p"){
        var format = (parseInt(time.slice(0,1)) + 12);
        time = (format.toString() + time.slice(1,4));
      }else if(time.slice(6,7) == "a"){
        if(time.slice(0,2) == "12"){
         var format = (parseInt(time.slice(0,2)) + 12);
         time = (format.toString() + time.slice(2,5));
        }else{
          time = time.slice(0,5);
        }        
      }else if(time.slice(5,6) == "a"){
        time = time.slice(0,4);
      }

      console.log(time);
      console.log(movie);

      if (movie.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(movie.length > 45){
          movie = movie.slice(0,26);
        }
        var programa = {idprograma: id, nombre: movie.trim(), horaDeInicio: time, canal_idcanal: 9};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      id = id + 1;
    });

  }
  connection.end();
});