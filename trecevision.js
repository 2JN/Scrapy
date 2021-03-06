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
connection.query("DELETE FROM programa WHERE canal_idcanal = 6");

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

var url = "http://www.gatotv.com/canal/13_de_guatemala_trecevision"

//contador para el programa en la BD
var id = 103;

download(url, function(data){
  if (data){
    var $ = cheerio.load(data);

    //horarios y programas 1
    $("tr.tbl_EPG_row").each(function(i,e){
      var time = $(e).find("td > div.tbl_EPG_TimesColumn").text();
      var program = $(e).find("td.programa > div").text();
      var cartoon = $(e).find("td.caricatura > div").text();
      var notice = $(e).find("td.noticiero > div").text();
      var sports = $(e).find("td.deporte > div").text();
      
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
      console.log(program);
      console.log(notice);
      console.log(cartoon);
      console.log(sports);

      //ingresar los datos nuevos
      if (program.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(program.length > 45){
          program = program.slice(0,26);
        }

        var programa = {idprograma: id, nombre: program.trim(), horaDeInicio: time, canal_idcanal: 6};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      if (notice.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(notice.length > 45){
          notice = notice.slice(0,26);
        }

        var programa = {idprograma: id, nombre: notice.trim(), horaDeInicio: time, canal_idcanal: 6};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      if (cartoon.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(cartoon.length > 45){
          cartoon = cartoon.slice(0,26);
        }

        var programa = {idprograma: id, nombre: cartoon.trim(), horaDeInicio: time, canal_idcanal: 6};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      if (sports.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(sports.length > 45){
          sports = sports.slice(0,26);
        }

        var programa = {idprograma: id, nombre: sports.trim(), horaDeInicio: time, canal_idcanal: 6};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      id = id + 1;
    });

    
    //horarios y programas 2
    $("tr.tbl_EPG_rowAlternate").each(function(i,e){
      var time = $(e).find("td > div.tbl_EPG_TimesColumn").text();
      var program = $(e).find("td.programa > div").text();
      var cartoon = $(e).find("td.caricatura > div").text();
      var notice = $(e).find("td.noticiero > div").text();
      var sports = $(e).find("td.deporte > div").text();

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
      console.log(program);
      console.log(notice);
      console.log(cartoon);
      console.log(sports);

      //ingresar los datos nuevos
      if (program.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(program.length > 45){
          program = program.slice(0,26);
        }

        var programa = {idprograma: id, nombre: program.trim(), horaDeInicio: time, canal_idcanal: 6};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      if (notice.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(notice.length > 45){
          notice = notice.slice(0,26);
        }

        var programa = {idprograma: id, nombre: notice.trim(), horaDeInicio: time, canal_idcanal: 6};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      if (cartoon.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(cartoon.length > 45){
          cartoon = cartoon.slice(0,26);
        }

        var programa = {idprograma: id, nombre: cartoon.trim(), horaDeInicio: time, canal_idcanal: 6};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      if (sports.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardarn en la BD
        if(sports.length > 45){
          sports = sports.slice(0,26);
        }

        var programa = {idprograma: id, nombre: sports.trim(), horaDeInicio: time, canal_idcanal: 6};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      id = id + 1;
    });

    //horario y programa actual
    $("tr.tbl_EPG_row_selected").each(function(i,e){
      var time = $(e).find("td > div.tbl_EPG_TimesColumn").text();
      var program = $(e).find("td.programa > div").text();
      var cartoon = $(e).find("td.caricatura > div").text();
      var notice = $(e).find("td.noticiero > div").text();
      var sports = $(e).find("td.deporte > div").text();
      
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
      console.log(program);
      console.log(notice);
      console.log(cartoon);
      console.log(sports);

      //ingresar los datos nuevos
      if (program.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(program.length > 45){
          program = program.slice(0,26);
        }

        var programa = {idprograma: id, nombre: program.trim(), horaDeInicio: time, canal_idcanal: 6};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      if (notice.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(notice.length > 45){
          notice = notice.slice(0,26);
        }

        var programa = {idprograma: id, nombre: notice.trim(), horaDeInicio: time, canal_idcanal: 6};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      if (cartoon.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(cartoon.length > 45){
          cartoon = cartoon.slice(0,26);
        }

        var programa = {idprograma: id, nombre: cartoon.trim(), horaDeInicio: time, canal_idcanal: 6};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      if (sports.trim() == ""){
        //cadena vacia, no hacer nada
      }else {
        //guardar en la BD
        if(sports.length > 45){
          sports = sports.slice(0,26);
        }

        var programa = {idprograma: id, nombre: sports.trim(), horaDeInicio: time, canal_idcanal: 6};
        connection.query("INSERT INTO programa SET ?", programa);
        connection.commit();
      }

      id = id + 1;
    });

  }
  connection.end();
});