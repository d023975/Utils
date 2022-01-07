const fs = require('fs');
const util = require('util');
const ff = require('./filenameFormatter');
var parseString = require('xml2js').parseString;

const readFilePromise = util.promisify(fs.readFile);
const parseStringPromise = util.promisify(parseString);

const filename = 'C:\\Users\\bachmh\\git\\Utils\\currentSession.xml';

readFilePromise(filename, 'utf8')
  .then(parseStringPromise)
  .then((result) => result.NotepadPlus.Session[0].mainView[0].File)
  .then((filelist) =>
    ff.formatfilePaths(
      '\\',
      filelist
    )
  )
  .then((filelist) => {
    //console.log(filelist);
    ff.copyFiles('C:\\STUFF\\' , filelist);
  })
  .catch((err) => {
    console.log('Error', err);
  });

  readFilePromise(filename, 'utf8')
  .then(parseStringPromise)
  .then((result) => result.NotepadPlus.Session[0].subView[0].File)
  .then((filelist) =>
    ff.formatfilePaths(
      '\\',
      filelist
    )
  )
  .then((filelist) => {
    //console.log(filelist);
    ff.copyFiles('C:\\STUFF\\' , filelist);
  })
  .catch((err) => {
    console.log('Error', err);
  });
