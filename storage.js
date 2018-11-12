/*
 vwebstorage

 Browser FileSystem Library
*/

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