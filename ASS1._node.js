const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fs = require("fs");

var dirname = "";
var filename = "";
var content = "";

var instruction = () => {
   console.log("\n  1 :- CREATE DIRECTORY");
   console.log("\n  2 :- REMOVE DIRECTORY");
   console.log("\n  3 :- WRITE FILE");
   console.log("\n  4 :- READ FILE");
   console.log("\n  5 :- DELETE TEXT FILE");
   console.log("\n  6 :- APPEND DATA TO FILE");
   console.log("\n  7 :- UPDATE/REPLACE TO NEW DATA");
   console.log("\n  8 :- RNAME A TXT FILE");
   console.log("\n  9 :- EXIT");
};

var start = () => {
   rl.question("Enter Your Choice :- ",(answer) => {
    if(answer === "1"){
      createDirWizard();
    }
    else if(answer === "2"){
      removeDirWizard();
    }
    else if(answer === "3"){
      writeFileWizard();
    }
    else if(answer === "4"){
      readFileWizard();
    }
    else if(answer === "5"){
      deleteFileWizard();
    }
    else if(answer === "6"){
      appendFileWizard();
    }
    else if(answer === "7"){
      replaceFileWizard();
    }
    else if(answer === "8"){
      renameFileWizard();
    }
    else if(answer === "9"){
      rl.close()
    }
  });
};

var createDirWizard = () => {
  console.log("\n Welcome to the file Creation");
  rl.question("Name Of The Directory :-",(ans) => {
     dirname = ans;
     create_Dir();
  });
};

var create_Dir = () => {
   fs.mkdir(dirname,(err) => {
      if(err){
        console.log(err);
      }else{
        console.log("Directory Created SuccessFully..." + dirname);
      }
      repeat();
   });
};

var removeDirWizard = () => {
  rl.question("Enter Directory Name :- ",(ans) => {
    dirname = ans;
    removeDir();
  })
};

var removeDir = () => {
   fs.rmdir(dirname,(err) => {
      if(err){
        console.log(err);
      }else{
        console.log("Directory Removed Successfully...!");
      }
      repeat();
   });
}

var writeFileWizard = () => {
  rl.question("Enter File Name :-",(ans) => {
      filename = ans;
      rl.question("Enter File Content :-",(ans) => {
         content = ans;
         writeFileData();
      });
  });
};

var writeFileData = () => {
   fs.writeFile(filename + ".txt",content,(err) => {
      if(err){
        console.log(err);
      }
      else
      {
        console.log("File Created SuccessFully...!",filename);
      }
      repeat();
   });
};

var readFileWizard = () => {
   rl.question("Enter File Name :- ",(ans) => {
      filename = ans;
      fs.readFile(filename + ".txt","utf8",(err,result) => {
         if(err){
            console.log(err);
         }else{
            console.log(result);
         }
         repeat();
      });
   });
};

var deleteFileWizard = () => {
   rl.question("Enter File Name :- ",(ans) => {
     fs.unlink(ans + ".txt",(err) => {
         if(err){
              console.log(err);
         }else{
              console.log("File Deleted SuccessFully ....!" + ans);
         }
         repeat();
     });
   });
};

var appendFileWizard = () => {
  rl.question("Enter File Name To A Append :- ",(ans) => {
     filename = ans;
     rl.question("Enter Content :-",(ans) => {
        content = ans;
        fs.appendFile(filename + ".txt",content,(err) => {
          if(err){
             console.log(err);
          }else{
             console.log("File Appended Successfully..!" + filename);
          }
          repeat();
        });
     });
  });
};

var replaceFileWizard = () => {
    rl.question("Enter Your File Name :- ",(ans) => {
       filename = ans;
       rl.question("Enter Content Of Replace :- ",(ans) => {
         content = ans;
         rl.question("Enter New Content To Replace :-",(ans) => {
           const replace_Str = ans;
           fs.readFile(filename + ".txt","utf8",(err,data) => {
              if(err){
                 console.log(err);
                 repeat();
              }else{
                const res = data.replace(content,replace_Str);
                fs.writeFile(filename + ".txt",res,(err) => {
                  if(err){
                      console.log(err);
                  }else{
                     console.log("File Updated / Replaced SuccessFully...!" + filename);
                  }
                  repeat();
                });
              }
           });
         });
       });
    });
};

var renameFileWizard = () => {
   rl.question("Enter Old File Name :-",(ans) => {
     var oldFile = ans;
     rl.question("Enter New File Name :- ",(ans) => {
       fs.rename(oldFile + ".txt",ans + ".txt",(err) => {
          if(err){
             console.log(err);
          }else{
             console.log("File Renamed SuccessFully ... !" + ans + ".txt");
          }
          repeat();
       }); 
     });
   });
};

var repeat = () => {
  instruction();
  start();
};

console.log("Welcome to javascript files");
repeat();