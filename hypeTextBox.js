//регулярки
var stringRegExp = /(".*?")/g,
    charRegExp = /('.*?')/g,
    keywordRegExp = /\b(int|object|void|bool|null|var|float|double|byte|char|public|private|as|new|true|false|const|override|using|namespace)\b/g,
    statekeywordRegExp = /\b(new|var|if|else|do|while|case|switch|for|foreach|in|continue|break|try|catch|finally|throw|return)\b/g,
    numericRegExp = /\b(\d+\.?\d*)\b/g,
    directiveRegExp  = /(#\S*)/g,
    multiLineCommentRegExp  = /(\/\*[\s\S]*?\*\/)/g,
    singleLineCommentRegExp = /(\/\/.*)/g,
    methodRegExp = /\b([a-zA-Z]\w*(?=\())/g;

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
    panel.appendChild(input);
    panel.appendChild(output);
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

    //наследование цвета от родительского блока
    var collection = output.querySelectorAll(".keyword, .state-keyword, .string, .comment, .numeric, .directive, .method");
    for (let i = 0; i < collection.length; i++) {
        console.log(collection[i].className, collection[i].parentNode.className)
        if (collection[i].parentNode.className == "string" || collection[i].parentNode.className == "comment")        {
            console.log(window.getComputedStyle(collection[i].parentNode).getPropertyValue("color"));
            collection[i].style.color = window.getComputedStyle(collection[i].parentNode).getPropertyValue("color");
        }
    }
});

input.addEventListener("scroll", function()
{
    //синхронихпця прокручивания
    output.scrollTop = input.scrollTop;
});

function applyColors(code)
{
    code = code.replace(stringRegExp,`<span class="string">$1</span>`);
    code = code.replace(numericRegExp,'<span class="numeric">$1</span>');
    code = code.replace(directiveRegExp,'<span class="directive">$1</span>');
    code = code.replace(charRegExp,`<span class="string">$1</span>`);
    code = code.replace(singleLineCommentRegExp,'<span class="comment">$1</span>');
    code = code.replace(multiLineCommentRegExp,'<span class="comment">$1</span>');
    code = code.replace(keywordRegExp,'<span class="keyword">$1</span>');
    code = code.replace(statekeywordRegExp,'<span class="state-keyword">$1</span>');
    code = code.replace(methodRegExp,'<span class="method">$1</span>');

    //специальные выражения для избежания ошибок
    code = code.replace(/\b(?<!<span )(class)\b/g, '<span class="keyword">$1</span>')
    code = code.replace(/\b(?<!<span class=")(string)\b/g, '<span class="keyword">$1</span>')

    return code;
}