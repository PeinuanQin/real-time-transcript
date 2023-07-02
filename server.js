const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
//设定静态文件夹
app.use(express.static(path.join(__dirname, 'public')))
console.log("this is server")
app.get('/token', async (req, res) => {
  console.log("a message here !!!!")
  try {
    const response = await axios.post('https://api.assemblyai.com/v2/realtime/token', // use account token to get a temp user token
      { expires_in: 3600 }, // can set a TTL timer in seconds.
      { headers: { authorization: "PLEASE INPUT YOUR OWN TOKEN FROM ASSEMBLY AI" } }); // AssemblyAI API Key goes here
    const { data } = response;
    console.log("server response:", response)
    res.json(data);
  } catch (error) {
    const {response: {status, data}} = error;
    res.status(status).json(data);
  }
});

const port = process.env.PORT || 30001
// const port = 8000
// const port = 30001
// app.set('port', 8000);
// const server = app.listen(app.get('port'), () => {
const server = app.listen(port, () => {
  console.log(`Server is running on port ${server.address().port}`);
});
