const magenta = "#c080b5";
const yellow = "#ec9345";
const violet = "#a68bcc";
const numerics = "#ee7f52";
const yellowPre = "#e1d86b";
const blue = "#64a2e4";



const colorMap = 
{
    "int": blue, 
    "object": blue,
    "void": blue,
    "bool": blue,
    "null": blue,
    "var": blue,
    "string": blue,
    "float": blue,
    "double": blue,
    "byte": blue,
    "char": blue,
    "public": blue,
    "private": blue,
    "as": blue,
    "new": blue,
    "true": blue,
    "false": blue,
    "class": blue,
    "const": blue,
    "override": blue,
    "using": blue,
    "namespace": blue,
    "main": yellow,
    "switch": magenta,
    "case": magenta,
    "break": magenta,
    "continue": magenta,
    "default": magenta,
    "try": magenta,
    "catch": magenta,
    "finally": magenta,
    "throw": magenta,
    "break": magenta,
    "return": magenta,
    "if": magenta,
    "while": magenta,
    "foreach": magenta,
    "in": magenta,
    "do": magenta,
    "else": magenta,
    "for": magenta,
}

class HypeTextBox extends HTMLElement {
    constructor() {
        super();
        
        customElements.define('hype-text-box', HypeTextBox);
    }        
}

var panel = document.createElement('div');
var input = document.createElement('textarea');
var output = document.createElement('div');

panel.setAttribute('class', 'panel');
input.setAttribute('id', 'input');
output.setAttribute('id', 'output');

collection = document.getElementsByTagName('hype-text-box');
for (let i = 0; i < collection.length; i++) {
    collection[i].appendChild(panel);
    panel.appendChild(output);
    panel.appendChild(input);
}

document.getElementById('input').addEventListener('keydown', e => {
	if ( e.key === 'Tab' && !e.shiftKey ) {
		document.execCommand('insertText', false, "\t ");
		e.preventDefault();
		return false;
	}
});

input.addEventListener("input", function()
{
    output.innerHTML = applyColors(input.value);
});

input.addEventListener("scroll", function()
{
    output.scrollTop = input.scrollTop;
});

function applyColors(text)
{
    let re = new RegExp(Object.keys(colorMap).join("|"), "gi");

    return text.replace(re, function(m)
    {
        let c = colorMap[m.toLowerCase()];
        return `<spam style="color:${c}">${m}</spam>`;
    });
}