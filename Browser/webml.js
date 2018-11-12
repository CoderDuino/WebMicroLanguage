/*

webML Micro Language

Insert Script

Example:

---
app HelloWorld;
add UI as ui;
ui clear;
ui write <p>HI</p>;
alert "UITEST";
---

*/
var onload = true;
var isout = false;

if(onload){
window.onload=setTimeout(webml, 300);
}


var ApplicationStorage = {

	app : {
		appname : "",
		parseroutinfo : ""
	},
	packages : {
		includes : "",
		names : ""
	}

};

var Parser = {

	version : "4.5.0"

};

var cacheLanguage;
var scriptExecCode = "";

function webml(){
	var scripts = document.getElementsByTagName( 'script' );
	var clen = 0;
	console.log("Run Start!");
	while(scripts.length >= clen){
		console.log("Checking For Scripts...");
		if(scripts[clen].type == "text/webml"){
			console.log("Found Script!");
			scriptExecCode = scripts[clen].text;
			webml_eval();
			console.log("Ran Script!");
		}else{
			console.log("Script Error!");
		}
		clen = clen + 1;
		console.log("Restarting!");
	}

	
	document.body.innerHTML = document.body.innerHTML + '<script id="prerun">var ScriptStart = "webml";</script>';
}

function webml_eval(scriptcode){
	var clen2 = 0;
	scriptExecCode = scriptExecCode.replace(/(\r\n|\n|\r)/gm,"");
	var codewebml = scriptExecCode.split(";");
	console.log(scriptExecCode);
	while(clen2 < codewebml.length){
	
	
	var codewebcommand = codewebml[clen2].split(" ");
	console.log(codewebcommand[0] + " : " + codewebcommand[1]);
	switch (codewebcommand[0]) {
	  case 'app':
	    ApplicationStorage.app.appname = codewebcommand[1];
	    break;
	  case 'add':
	    //ApplicationStorage.packages.includes = ApplicationStorage.packages.includes + " " + codewebcommand[1];
	    var pdocs = document.body; 
	     if(codewebcommand[1] == "webmllib"){
	     docs.innerHTML = docs.innerHTML + '<script type="text/webml" src="' + codewebcommand[2] + '.wl' + '"></script>';
	     }
	     if(codewebcommand[1] == "javascriptlib"){	
	     docs.innerHTML = docs.innerHTML + '<script type="application/javascript" src="' + codewebcommand[2] + '.js' + '"></script>';
	     }
	     console.log("Added File");
	    break;
	  case '@@':
	    break;
	  case 'ui':
	    if(codewebcommand[1] == "clear"){
	    	var docT = document.body;
		docT.innerHTML = "";
	    }
	    if(codewebcommand[1] == "write"){
	    	var docG = document.body;
		docG.innerHTML = codewebcommand[2];
	    }
	    if(codewebcommand[1] == "add"){
	    	var docG = document.body;
		docG.innerHTML = docG.innerHTML + codewebcommand[2];
	    }
	    break;
          case 'out':
	    if(codewebcommand[1] == "append"){
	    	var docG = document.body;
		docG.innerHTML = docG.innerHTML + codewebcommand[2];
	    }
	    if(codewebcommand[1] == "write"){
	    	var docT = document.body;
		docT.innerHTML = codewebcommand[2];
	    }
	    if(codewebcommand[1] == "newline"){
	    	var docG = document.body;
		docG.innerHTML = docG.innerHTML + "<br></br>";
	    }
	    break;
	  case 'input':
	    //document.getElementById('codeoutputset').onchange = "if(document.getElementById('codeoutputset').text.endsWith('\n')){isout=true;}";
	    //changeWait();
	    console.log("Not Supported in Browser (No Console) Input!");
	    break;
	  case 'ffi':
 	    var pstring = "";
	    for(bi = 1; bi <= codewebcommand.length - 1;bi++){
	        console.log(bi);
		pstring = pstring + " " + codewebcommand[bi];
	    }
	    pstring = pstring + ";";
	    console.log("FFI:");
	    console.log(pstring);
	    eval(pstring);
	    break;
          case 'if':
	    if(eval(codewebcommand[1]) == true){
	        eval(codewebcommand[2]);
	    }
	    break;
	  case 'while':
	    while(eval(codewebcommand[1]) == true){
	        eval(codewebcommand[2]);
	    }
	    break;
	  case 'debug':
	    eval("debugger;");
	    break;
	  case 'error':
	    while(true){errorCase(codewebcommand[1]);}
	    break;
	  case 'sv':
	    eval("var " + codewebcommand[1] + codewebcommand[2] + codewebcommand[3] + ";");
	    break;
	  case 'modf':
	    vw_load_modfile(codewebcommand[1], codewebcommand[2]);	
	    break;
	  case 'readf':
	    val("var " + codewebcommand[2] + " = " + vw_load_read(codewebcommand[1]) + ";");
	    break;
	  case 'newf':
	    vw_load_newfile(codewebcommand[1], codewebcommand[2]);
	    break;
	  defalt:
	    var webCommand = codewebcommand[0] + " " + codewebcommand[1] + " " + ";";
	    var ndcs = String(webCommand.replace(" ", "("));
	    var ndcs2 = String(ndcs.replace(";", ");"));
	    var ndcs3 = String(ndcs2.replace("#", "."));
	    var DocumentElementText = document.getElementById('prerun');
	    //var docText = String(DocumentElementText.text);
	    console.log("Javascript Call!  ");
	    console.log(ndcs3);
            eval(ndcs3);
	}
	clen2 = clen2 + 1;
}

}

function changeWait(){
while(true){
	if(isout == true){
		break;
	}
}
}

function errorCase(strer){
	console.log("runtime: error: " + strer);
}

/*
 webML Javascript Libraries
*/

//WebFS Library
var Files[5000];
var vs_Fn[5000];

var search_index;
var cn_file;
var sr_max = 5000;

function vw_load_read(fname){
	var fncontentsl;
	for(b = 0;b <= sr_max;b++){
		if(vs_Fn[b] == fname){
			fncontentsl = Files[b];
		}
	}
	cn_file = 0;
	return fncontentsl;
}

function vw_load_modfile(fname, fcont){
	for(b = 0;b <= sr_max;b++){
		if(vs_Fn[b] == fname){
			Files[b] = fcont;
		}
	}
}

function vw_load_newfile(fname, fcont){
	for(b = 0;b <= sr_max;b++){
		if(Files[b] == ""){
			vs_Fn[b] = fname;
			Files[b] = fcont;
		}
	}		
}
