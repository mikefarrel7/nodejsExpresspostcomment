var express = require('express'); 
var app = express();
var fs = require('fs'); 

app.get('/api/posts', function(req, res){
    fs.readFile("./databases/" +"posts.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data); 
    });
});

app.get('/api/posts/:id', function (req, res) {
    fs.readFile("./databases/" +"posts.json", 'utf8', function(err, data){
       var json = JSON.parse( data );
        var idreq = req.params.id
        var posts = {};
        var filtered = json.data.filter(function(val){
            return val.id == idreq;
        });
        for (var i = 0; i < filtered.length; ++i)
            i == 0 ? posts["data"] = filtered[i] : posts[i] = filtered[i];
        Object.keys(posts).length > 0 ? res.end(JSON.stringify(posts)) : res.sendStatus(404);
    });
 });

 app.get('/api/posts/:id/comments', function (req, res) {
    fs.readFile("./databases/" +"comments.json", 'utf8', function(err, data){
       var json = JSON.parse( data );
        var idreq = req.params.id
        var posts = {};
        var filtered = json.data.filter(function(val){
            return val.postid == idreq;
        });
        posts["data"] = filtered;
        posts.data.length > 0 ? res.end(JSON.stringify(posts)) : res.sendStatus(404);
    });
 });

 app.get('/api/tags/:name', function(req, res){
    fs.readFile("./databases/" +"posts.json", 'utf8', function(err, data){
        var json = JSON.parse(data);
        var namereq = req.params.name;
        var posts = {};
        var filtered = json.data.filter(function(val){
            for(let i=0; i<val.tags.length; i++)
                if(val.tags[i] == namereq)
                    return json.data; 
        });
        posts["data"] = filtered;
        posts.data.length > 0 ? res.end(JSON.stringify(posts)) : res.sendStatus(404);
    });
});

app.get('*',function(req,res){
    res.sendStatus(404);
})
  
app.listen(3000, function(){
    console.log(`Example app listening on port 3000`)
})
