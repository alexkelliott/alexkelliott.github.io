/*document.body.innerHTML = document.body.innerHTML.replace(/b/g, '🅱');
document.body.innerHTML = document.body.innerHTML.replace(/B/g, '🅱');
document.body.innerHTML = document.body.innerHTML.replace(/<🅱utton/g, '<button');
document.body.innerHTML = document.body.innerHTML.replace(/<ta🅱le/g, '<table');*/

var originalContent = document.body.innerHTML;
var output = "";
var inside = false;
for (var i = 0; i < originalContent.length; i++) {
    if (originalContent[i] == "<") {
        inside = true;
    } else if (originalContent[i] == ">") {
        inside = false;
    }
    if(inside) {
        output += originalContent[i];
    } else {
        if(originalContent[i] == "b" || originalContent[i] == "B") {
            output += "🅱";
        } else {
            output += originalContent[i];
        }
    }
    
    //console.log("B");
}

output = output.replace(/&n🅱sp/g, '&nbsp');

document.body.innerHTML = output;
//console.log(output);