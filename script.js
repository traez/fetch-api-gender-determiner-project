(function(){
/*
The codebase gets data from the Genderize API and populates fields in an HTML page

Biggest takeaway from building this project was adopting "Separation of concerns" or "Single Responsibility Principle" part of the SOLID code writing principles. The codebase has 4 functions. Old me would have probably left everything in 1 function. Lols.

Also BigUps to ChatGPT, answered all my code enquiries efficiently and even advised on Javascript code commenting
*/
const searchTerm = document.querySelector("#search-term");
const button = document.querySelector("button");
const aside = document.querySelector("aside");
const chosenName = document.querySelector("#chosen-name");
const likelyGender = document.querySelector("#likely-gender");
const probability = document.querySelector("#probability");
const count = document.querySelector("#count");

/*
addEventListener on button element to kickstart code.
setTimeout function resets input value to blank after 5 seconds
*/
  button.addEventListener('click', () => {
    let named = searchTerm.value;
    regexName(named);
    setTimeout(() => {
      searchTerm.value = "";
      }, "5000");
  })

/*
function confirms the searchTerm using a regular expression
setTimeout function resets aside text to blank after 5 seconds
*/
function regexName(name){
  let result =  /^[a-zA-Z]+$/.test(name);
  if (result === true){
    fetchAnswer(name);
  } else {
    aside.textContent = result + ": Regex check failed. Input only letters for name";
    setTimeout(() => {
      aside.textContent = "";
      }, "5000");
  }
}

/*
function uses the fetch API to get data from the Genderize API.
*/
async function fetchAnswer(named){
  const response = await fetch(`https://api.genderize.io?name=${named}`);
  const data = await response.json();
  populateFields(data);
}

/*
function populates the fields in the HTML page with data from the Genderize API
*/
function populateFields(data){
  chosenName.value = data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
  likelyGender.value = data.gender;
  probability.value = data.probability.toFixed(2);
  count.value = data.count;
}

})();


