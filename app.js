const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("INDEX...");
});

app.get("/abc", (req, res) => {
  res.send("böyle sayfa tanımlı değil");
});

app.listen(PORT, () => {
  console.log(`Uygulama ${PORT} portunda ayağa kaldırıldı...`);
});
