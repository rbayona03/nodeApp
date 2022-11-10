console.log("Testing Terminal");
//Node modules
const http = require("http");
const path = require("path");
const fs = require("fs");

//Server Create/Connect
const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  /////Browser Resources
  //Extension to File (.html, .js, .png ect)
  let extName = path.extname(filePath);

  //Content-Types
  let contentType = "text/html"; //Default

  //File Type Check
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;

    case ".css":
      contentType = "text/css";
      break;

    case ".json":
      contentType = "application/json";
      break;

    case ".png":
      contentType = "image/png";
      break;

    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        //ERROR - PAGE NOT FOUND
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //Error - Sever Error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      //Successful response/ page found
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

//Port && Server Listen
const PORT = process.env.PORT || 5000; //Check user port or listen on port 5000
server.listen(PORT, () => console.log(`Server: ${PORT}`)); //listen and check connection
