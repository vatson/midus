'use strict';

var fs = require('fs');
var wav = require('wav');
var Speaker = require('speaker');

var streamToBuffer = require('stream-to-buffer');
var streamBuffers = require('stream-buffers');
// var reader = ;

let sample = buffer => {
  return _ => {
    let b = new streamBuffers.ReadableStreamBuffer();
    b.put(buffer);

    return b;
  }
};
let sampleLoader = (files) => {
  return files.reduce((samples, file, i) => {
    let reader = new wav.Reader();
    reader.on('format', function (format) {
      samples[i] = {format: format};
      streamToBuffer(reader, (e, buf) => {
        samples[i].sample = sample(buf);
      });
    });
    fs.createReadStream(file).pipe(reader);


    return samples;
  }, [])
};

let samples = sampleLoader(['track11.wav', 'track12.wav', 'track13.wav']);

// var buffer;

// streamToBuffer(file.pipe(reader), function (err, buf) {
//   buffer = buf
// });

var launchpadder = require("launchpadder").Launchpad;
var launchpadColor = require("launchpadder").Color;
var pad = new launchpadder();



pad.on("press", function (button) {
  // console.log(samples[0]());
  // var b = new streamBuffers.ReadableStreamBuffer();
  // b.put(buffer);
  // b.pipe(new Speaker());
  // console.log(`track0${button.getX()+1}.wav`);
  // var reader = new wav.Reader();
  // reader.on('format', function (format) {
  //   reader.pipe(new Speaker(format));
  // });
  //
  // fs.createReadStream(`track${button.getX() + 11}.wav`).pipe(reader).pipe(new Speaker());

  if (samples[button.getX()]) {
    console.log(samples[button.getX()]);
    samples[button.getX()].sample().pipe(new Speaker(samples[button.getX()].format));
  }

  button.light(launchpadColor.RED);
  // console.log(button.getX() + " was pressed");
});

pad.on("release", function (button) {
  button.dark();
  // console.log(button + " was released");
});
