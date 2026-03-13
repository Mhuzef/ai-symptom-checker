// Save symptoms and move to result page
function submitSymptoms(e){

e.preventDefault();

let select = document.getElementById("symptoms");

let symptoms = Array.from(select.selectedOptions).map(o => o.value);

localStorage.setItem("symptoms", JSON.stringify(symptoms));

window.location.href = "result.html";

}


// Get prediction from backend
async function getPrediction(){

let result = document.getElementById("result");

let symptoms = JSON.parse(localStorage.getItem("symptoms"));

if(!symptoms){
result.innerText = "No symptoms selected";
return;
}

try{

let response = await fetch("http://127.0.0.1:5000/predict",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({symptoms:symptoms})

});

let data = await response.json();

result.innerText =
"Possible Disease: " + data.disease +
" (" + data.probability + "% confidence)";

}
catch(err){

result.innerText = "⚠ Backend not responding";

}

}
