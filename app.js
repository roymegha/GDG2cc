var express = require('express'),
    app     = express(),
    request = require('request');
    const fetch = require('node-fetch')
    

    const port = process.env.PORT||3000;
    app.use(express.static('public'));
 //for multiple res.send()
    app.set("view engine", "ejs");
    function get(url) {
        return new Promise((resolve, reject) => {
          fetch(url)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
      }

  

        app.get('/', (req, res) => {
            Promise.all([
              get('http://api.open-notify.org/astros.json'),
              get('http://api.open-notify.org/iss-now.json')//not required:used seperste js file to fetch 
            ]).then(([detail, pos]) =>
              res.render("index",{
                detail:detail,
                pos:pos
              }))
              .catch(err => res.send('Ops, something has gone wrong'))
          })







        // request('http://api.open-notify.org/astros.json', function (error, response, body) {
        //     if(!error && response.statusCode == 200)
        //          global.detail =JSON.parse(body);
        //         // console.log(detail["people"][0]["name"]);
        //         res.write({detail:detail});
                
                
        // });

        // request('http://api.open-notify.org/iss-now.json', function (error, response, body) {
        //     if(!error && response.statusCode == 200)
        //         var pos =JSON.parse(body);
        //         // console.log(pos["iss_position"]["latitude"]);
        //             res.send("index",{pos:pos}); 
        // });
        // // res.end();
        // res.render("index");
   
    

    app.listen(port,()=>{
        console.log(`server started at port:${port}`)
    });