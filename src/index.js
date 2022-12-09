const express = require('express');
const bodyParser = require('body-parser');
const route = require('./router/route');
const mongoose = require('mongoose');
const app = express();
mongoose.set('strictQuery', true);

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://Madhurilenka:Madhuri1998@cluster0.zcysdvm.mongodb.net/telewebs", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});