// import required modules
var fs = require("fs");
var striptags = require("striptags");

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " JSON_FILE_HERE");
    process.exit(-1);
}
var json = process.argv[2];
// Get content from file
var contents = fs.readFileSync(json);
var jsonContent = JSON.parse(contents);

var storyName = jsonContent.name;
console.log("Name: ", storyName);

var storyAuthor = jsonContent.author;
// console.log("Author: ", storyAuthor);

var storyDesc = jsonContent.description;
// console.log("Description: ", storyDesc);

var numLoc = jsonContent.locations.length;
console.log("# locations: ", numLoc);

var storyFunc = jsonContent.functions;
console.log("# functions: ", storyFunc.length);
// console.log("Functions Array: ", storyFunc);

var storyCond = jsonContent.conditions;
var numCond = Object.keys(storyCond).length;
console.log("# conditions: ", numCond);
// console.log("Conditions Array: ", storyCond);
for (var i = numCond - 1; i >= 0; i--){
    if (storyCond[i]["type"] == 'location'){
        storyCond.splice(i,1);
    }
}
console.log("# conditions (minus location conditions): ", storyCond.length);
// console.log("Conditions Array (minus location conditions): ", storyCond);

var storyPages = jsonContent.pages;
// console.log("Pages: ", storyPages);
var numNodes = storyPages.length;
console.log("# nodes/pages: ", numNodes);

var storyContent = [];
for (var i = 0; i < numNodes; i++) {
    storyContent.push(striptags(storyPages[i].content, [], ));
    console.log("\n**START NODE EXTRACTION**\n")
    console.log("Node #:", i+1);
    console.log("Node name:", storyPages[i].name);
    console.log("Pre-requisites:", storyPages[i].conditions);
    console.log("Behaviour:", storyPages[i].functions);
    console.log("Content:", storyContent[i]);
    console.log("\n**END NODE EXTRACTION**\n")  
}

// console.log(storyContent);