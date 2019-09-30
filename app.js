var express= require("express");
var app=express();
var request=require("request");

app.set("view engine","ejs");

var requestRender=function(url,res,page,search){
    request(url,function(error,response,body){
        if(!error&&response.statusCode==200){
            var movie= JSON.parse(body);
            res.render(page,{
                movie:movie, 
                currentPage:search.currentPage,
                movieName:search.movieName, 
                year:search.year, 
                type:search.type
            });
        }
    });
}
app.get("/",function(req,res){
    res.render("search");
});
app.get("/result",function(req,res){
    var url="http://omdbapi.com/?s="+req.query.m+"&apikey=b1f8c36e&y="+req.query.y+"&type="+req.query.t;
    var search={
        movieName:req.query.m,
        currentPage:1,
        year:req.query.y,
        type:req.query.t
    }
    requestRender(url,res,"result",search);
});

app.get("/result/:page",function(req,res){
    var url="http://omdbapi.com/?s="+req.query.m+"&apikey=b1f8c36e&page="+req.params.page+"&y="+req.query.y+"&type="+req.query.t;
    var search={
        movieName:req.query.m,
        currentPage:req.params.page,
        year:req.query.y,
        type:req.query.t
    }
    requestRender(url,res,"result",search);
});

app.get("/movie/:id",function(req,res){
    var url="http://omdbapi.com/?i="+req.params.id+"&apikey=b1f8c36e&plot=full";
    request(url,function(error,response,body){
        if(!error&&response.statusCode==200){
            var movie= JSON.parse(body);
            res.render("movie",{movie:movie});
        }
    });
});

app.listen(process.env.PORT||3000, process.env.IP, function(){
    console.log("Server start working.");
});