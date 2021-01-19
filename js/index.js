let pageNum = 1;
document.addEventListener("DOMContentLoaded", () => {
  getMonsters();
  nextEvent();
  previousEvent();
  createForm();
  addNewMonsterEvent();
});

function getMonsters() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then((resp) => resp.json())
    .then((object) => createMonsterElements(object));
}

function createMonsterElements(monsters) {
  for (monster of monsters) {
    const loadMonster = document.createElement("div");
    loadMonster.id = monster.id;
    const monsterName = document.createElement("h4");
    monsterName.innerText = monster.name;
    const monsterDesc = document.createElement("p");
    monsterDesc.innerText = monster.description;
    const monsterAge = document.createElement("p");
    monsterAge.innerText = `Age: ${Math.floor(monster.age)}`;
    loadMonster.appendChild(monsterName);
    loadMonster.appendChild(monsterAge);
    loadMonster.appendChild(monsterDesc);
    let monsterDiv = document.getElementById("monster-container");
    monsterDiv.appendChild(loadMonster);
  }
}

function nextEvent() {
  document.getElementById("forward").addEventListener("click", nextPage);
}

function nextPage() {
  pageNum++;
  let monsterDiv = document.getElementById("monster-container");
  monsterDiv.innerHTML = "";
  getMonsters();
}
function previousEvent() {
  document.getElementById("back").addEventListener("click", previousPage);
}

function previousPage() {
  if (pageNum > 0) {
    pageNum--;
    let monsterDiv = document.getElementById("monster-container");
    monsterDiv.innerHTML = "";
    getMonsters();
  }
}

function createForm() {
  const newMonsterForm = document.createElement("form");
  newMonsterForm.id = "newMonster";
  const name = document.createElement("input");
  name.type = "text";
  name.name = "name";
  const age = document.createElement("input");
  age.type = "text";
  age.name = "age";
  const description = document.createElement("input");
  description.type = "text";
  description.name = "description";
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.name = "submit";
  newMonsterForm.appendChild(name);
  newMonsterForm.appendChild(age);
  newMonsterForm.appendChild(description);
  newMonsterForm.appendChild(submit);
  document.getElementById("create-monster").appendChild(newMonsterForm);
}

function addNewMonsterEvent() {
  const newMonsterForm = document.getElementById("newMonster");
  newMonsterForm.addEventListener("submit", createMonster);
}

function createMonster(event) {
  event.preventDefault();
  fetch("http://localhost:3000/monsters"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: event.target.name.value,
        age: event.target.age.value,
        description: event.target.description.value,
      }),
    };
}
