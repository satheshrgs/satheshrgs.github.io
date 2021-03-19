var mainArea = document.getElementById("commandArea");
var commands = ["help", "about", "contact", "projects", "clear","reload"];
var name="root";
var browser=navigator.userAgent;
var os=navigator.platform;
var latitude="";
var longitude="";
var ip_det_url="https://freegeoip.net/json/";
detectip(ip_det_url);
var v=0;
function detectip(url)
{
	latitude="1";
				longitude="2";
				init();
	
}
function init()
{
	var name1=document.createElement("div");
	name1.innerHTML="<i>Loading....Please Wait...<br><b><center>Sathesh Rgs's CLI</center></b><br>Detected Browser  :  "+browser+"<br>Detected Operating System   : "+os+"<br>Latitude  : "+latitude+"<br>Longitude  : "+longitude+"<br><br></i>";
	var textBox = document.createElement("input");
    var cmdContainer = document.createElement("div");
    var userText = document.createElement("div");
    cmdContainer.className = "row";
    userText.className = "col-auto col-md-auto usr";
    userText.innerHTML = "Enter your name $";
    textBox.setAttribute("type", "text");
    textBox.className = "col col-md";
	mainArea.appendChild(name1);
    name1.appendChild(cmdContainer);
    cmdContainer.appendChild(userText);
    cmdContainer.appendChild(textBox);
    textBox.focus();
	
   textBox.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            textBox.disabled = true;
			name=textBox.value;
			
            generator();
        }
    });
}
function generator(){
	if(v==0)
	{
		var cmdContainer = document.createElement("div");
		var userText = document.createElement("div");
		userText.innerHTML = "Hello "+name+" ! <br>Type 'ls' for list of available commands";
		mainArea.appendChild(cmdContainer);
		cmdContainer.appendChild(userText);
		v=1;
	}
    var textBox = document.createElement("input");
    var cmdContainer = document.createElement("div");
    var userText = document.createElement("div");
    cmdContainer.className = "row";
    userText.className = "col-auto col-md-auto";
    userText.innerHTML = name+' @ '+ ip +'  $  ';
    textBox.setAttribute("type", "text");
    textBox.className = "col col-md";
    mainArea.appendChild(cmdContainer);
    cmdContainer.appendChild(userText);
    cmdContainer.appendChild(textBox);
    textBox.focus();
    textBox.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            textBox.disabled = true;
            procmd(textBox.value.toLowerCase());
        }
    });
}

//Show Output
function procmd(val){
    var outputText = document.createElement("div");
    var outputContainer = document.createElement("div");
    outputContainer.className = "row";
    outputText.className = "col-sm-12 col-md-12 outcol";
    switch(val) {
        case "":
            break;
        case "ls":
            var lstext = "";
            for(i = 1; i < commands.length; i++){
                lstext = lstext + commands[i] + "&nbsp&nbsp";
            }
            outputText.innerHTML = lstext;
            break;
        case "about":
            outputText.innerHTML = "Hello "+name+"!  It's Sathesh Rgs. <br>I Love to code.<br>Beginner level Coder from India";
            break;
        case "contact":
            outputText.innerHTML = 'Contact: +91 9843370220 &nbsp&nbsp&nbsp&nbsp<a target="_blank" href="https://github.com/satheshrgs">Github</a>&nbsp&nbsp&nbsp&nbsp<a href="mailto:satheshrgs@gmail.com">Email: satheshrgs@gmail.com</a>';
            break;
        case "projects":
            disp_proj("https://api.github.com/users/satheshrgs/repos");
            break;
        case "clear":
            mainArea.innerHTML = "";
            break;
		case "reload":
			location.reload();
			break;
        default:
            outputText.innerHTML = "Invalid Command.";
            break;
    }
    if(val != "clear" || val != "projects") {
        mainArea.appendChild(outputContainer);
        outputContainer.appendChild(outputText);
    }
    if(val != "projects") {
        generator();
    }
}

function disp_proj(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() 
	{ 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
		{
			    var outputText = document.createElement("div");
    var outputContainer = document.createElement("div");
    var res = JSON.parse(xmlHttp.responseText);
    var githubText = "";
    for(var i = 0; i < res.length ; i++) {
        githubText = githubText + '<a target="_blank" href="' + res[i].html_url + '"> ' + res[i].name  + ' </a> <br>'
    }

  

    outputContainer.className = "row";
    outputText.className = "col-sm-12 col-md-12";
    outputText.innerHTML = githubText;
    mainArea.appendChild(outputContainer);
    outputContainer.appendChild(outputText);
    generator();
            }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}
