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
}

output = output.replace(/&n🅱sp/g, '&nbsp');

document.body.innerHTML = output;
