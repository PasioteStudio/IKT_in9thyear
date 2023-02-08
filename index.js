//import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const bodyParser = require("body-parser");
const formidable = require("formidable");
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fs = require("fs");
const https = require("https");
const { exec } = require("child_process");
//eden.ai
const sdk = require("api")("@eden-ai/v2.0#5gtpn2pldnbv2gf");

sdk.auth(process.env.apiKey_eden);

async function whatisit(file, provider) {
  let c = 0;
  console.log(provider);
  form.append("providers", provider);
  console.log(file);
  form.append("file", fs.createReadStream(file));
  c = await axios
    .request(options)
    .then((response) => (c = response))
    .catch((error) => {
      console.error(error);
    });
  form.destroy();
  return c.data.amazon;
}
//
const axios = require("axios").default;
const Agent = require("agentkeepalive");
const HttpsAgent = require("agentkeepalive").HttpsAgent;

const keepAliveAgent = new Agent({
  maxSockets: 160,
  maxFreeSockets: 160,
  timeout: 60000,
  freeSocketTimeout: 30000,
  keepAliveMsecs: 60000,
});

const httpsKeepAliveAgent = new HttpsAgent({
  maxSockets: 160,
  maxFreeSockets: 160,
  timeout: 60000,
  freeSocketTimeout: 30000,
  keepAliveMsecs: 60000,
});
const domain = "https://api.edenai.run/v2/image/object_detection";
const axiosInstance = axios.create({
  baseURL: domain,
  httpAgent: keepAliveAgent,
  httpsAgent: httpsKeepAliveAgent,
});
const FormData = require("form-data");

const form = new FormData();

const options = {
  method: "POST",
  url: "https://api.edenai.run/v2/image/object_detection",
  headers: {
    authorization: `Bearer ${process.env.apiKey_eden}`,
    "Content-Type": "multipart/form-data; boundary=" + form.getBoundary(),
  },
  data: form,
};

//
async function translate(text, source_language, to) {
  let a = 0;
  a = await sdk
    .translation_automatic_translation_create({
      response_as_dict: true,
      attributes_as_list: false,
      show_original_response: true,
      providers: "google",
      source_language: source_language,
      target_language: to,
      text: text,
    })
    .then(({ data }) => (a = data.google.text))
    .catch((err) => console.error(err));
  return a;
}

async function mehetedenai(text) {
  let b = 0;
  b = await sdk
    .text_moderation_create({
      response_as_dict: true,
      attributes_as_list: false,
      show_original_response: true,
      providers: "openai",
      language: "en",
      text: text,
    })
    .then(({ data }) => (b = data))
    .catch((err) => console.error(err));
  return b.openai;
}

const express = require("express");
const app = express();
app.engine("html", require("ejs").renderFile);
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  express.static(__dirname + "/public")
);

app.get("/", function (req, res) {
  res.render(__dirname + "/public/index.html", {
    flagged: false,
    sexualres: "",
    hateres: "",
    violanceres: "",
    selfres: "",
    minres: "",
    threateningres: "",
    graphicres: "",
    images0: "",
    images1: "",
    images2: "",
    images3: "",
    images4: "",
    onf0: "",
    conf1: "",
    conf2: "",
    conf3: "",
    conf4: "",
    imageresulted: "",
  });
});
app.post("/moderation", async function (req, res) {
  var prompt = String(req.body.num1);
  let translatedtext = await translate(prompt, "hu", "en");
  let result = await mehetedenai(translatedtext);
  console.log(result.items[4].likelihood);
  //https://docs.edenai.co/reference/translation_automatic_translation_create
  await res.render(__dirname + "/public/index.html", {
    flagged: result.original_response.results[0].flagged,
    sexualres: result.items[0].likelihood,
    hateres: result.items[1].likelihood,
    violanceres: result.items[2].likelihood,
    selfres: result.items[3].likelihood,
    minres: result.items[4].likelihood,
    threateningres: result.items[5].likelihood,
    graphicres: result.items[6].likelihood,
    images0: "",
    images1: "",
    images2: "",
    images3: "",
    images4: "",
    conf0: "",
    conf1: "",
    conf2: "",
    conf3: "",
    conf4: "",
    imageresulted: "",
  });
});
let images = ["/0.jpg", "/1.png", "/2.png", "/3.png"];
let providers = [
  "amazon",
  "google",
  "clarifai",
  "sentisight",
  "api4ai",
  "microsoft",
];
var bela = 0;
app.post("/fileupload", async function (req, res) {
  var image = String(req.body.realSelect);
  console.log(req.body.realSelect1);
  var provider = providers[Number(req.body.realSelect1)];
  let resi = await whatisit("./public" + images[image], provider);
  console.log(resi);
  if (resi == undefined) {
    console.log("haa");
    await res.render(__dirname + "/public/index.html", {
      flagged: false,
      sexualres: "",
      hateres: "",
      violanceres: "",
      selfres: "",
      minres: "",
      threateningres: "",
      graphicres: "",
      images0: "",
      images1: "",
      images2: "",
      images3: "",
      images4: "",
      onf0: "",
      conf1: "",
      conf2: "",
      conf3: "",
      conf4: "",
      imageresulted: "",
    });
  } else {
    await res.render(__dirname + "/public/index.html", {
      flagged: req.body.flagged,
      sexualres: req.body.sexualres,
      hateres: req.body.hateres,
      violanceres: req.body.violanceres,
      selfres: req.body.selfres,
      minres: req.body.minres,
      threateningres: req.body.threateningres,
      graphicres: req.body.graphicres,
      images0: resi.items[0].label,
      images1: resi.items[1].label,
      images2: resi.items[2].label,
      images3: resi.items[3].label,
      images4: resi.items[4].label,
      conf0: resi.items[0].confidence,
      conf1: resi.items[1].confidence,
      conf2: resi.items[2].confidence,
      conf3: resi.items[3].confidence,
      conf4: resi.items[4].confidence,
      imageresulted: image,
    });
  }
  //var result = await whatisit();

  //https://docs.edenai.co/reference/translation_automatic_translation_create

  setTimeout(function () {
    // Listen for the 'exit' event.
    // This is emitted when our app exits.
    process.on("exit", function () {
      //  Resolve the `child_process` module, and `spawn`
      //  a new process.
      //  The `child_process` module lets us
      //  access OS functionalities by running any bash command.`.
      require("child_process").spawn(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: true,
        stdio: "inherit",
      });
    });
    process.exit();
  }, 1000);
});
function meheteee() {
  bela = app.listen(4000, function () {
    console.log("server is running on port 4000");
  });
}
meheteee();
