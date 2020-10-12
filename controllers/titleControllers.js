const async = require("async");
const https = require("https");

exports.getTitles = async (req, res) => {
   let address = req.query.address;
   if (!Array.isArray(req.query.address)) {
      address = [req.query.address];
   }
   let titles = [];
   async.forEachOf(address, (url, index, callback) => {
      let title = "";

      https.get(url, (resp) => {
         let data = '';

         // A chunk of data has been recieved.
         resp.on('data', (chunk) => {
            data += chunk;
         });

         // The whole response has been received. Print out the result.
         resp.on('end', () => {
            title = url + " - " + data.split("<title>").pop().split("</title>")[0];
            titles.push(title);
            callback();
            if (titles.length == address.length) {
               res.status(200).render('index', {
                  titles: titles
               });
            }
         });

      }).on("error", (err) => {
         let title = url + " - NO RESPONSE";
         titles.push(title);
         callback();
         if (titles.length == address.length) {
            res.status(200).render('index', {
               titles: titles
            });
         }
      });
      
   }, (err) => {
      if (err) {
         console.log(err);
      }
   })

};
