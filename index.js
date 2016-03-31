var fs = require('fs');
var wav = require('wav');

var Speaker = require('speaker');


var AudioBuffer = require("audio-buffer");


var streamToBuffer = require('stream-to-buffer')
var file = fs.createReadStream('track04.wav');
var reader = new wav.Reader();

var buffer;
var streamBuffers = require('stream-buffers');
streamToBuffer(file.pipe(reader), function (err, buf) {
  buffer = buf
});


// var utils = require('audio-buffer-utils');
// var AudioBufferStream = require('audio-buffer-stream')

var launchpadder = require("launchpadder").Launchpad;
var launchpadColor = require("launchpadder").Color;
var pad = new launchpadder();

pad.on("press", function(button) {
  // var file = fs.createReadStream('track01.wav');
  // var reader = new wav.Reader();
  // reader.on('format', function (format) {
    // the WAVE header is stripped from the output of the reader
    // reader.pipe(new Speaker(format));
  // });
  // var s = AudioBufferStream();
  // s.write(utils.clone(buffer));

  var b = new streamBuffers.ReadableStreamBuffer();
  b.put(buffer);
  b.pipe(new Speaker());
  // pipe the WAVE file to the Reader instance
  // file.pipe(reader);

    button.light(launchpadColor.RED);
    // console.log(button + " was pressed");
});

pad.on("release", function(button) {
    button.dark();
    // console.log(button + " was released");
});
