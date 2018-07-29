/**
 * Created by chTing on 2017/7/23.
 */
var path = require('path');
var express = require('express');
var app = express();
app.use('/dist', express.static(path.resolve('./dist')));
var port = 2000;
app.get('*', function (req, res) {
    res.sendFile(path.resolve('./html/index.html'))
})
app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {

        console.info("==>  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});
