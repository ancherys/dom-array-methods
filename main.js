const main = document.getElementById("main");
const addUserButton = document.getElementById("add-user");
const doubleButton = document.getElementById("double");
const showMillionairesButton = document.getElementById("show-millionaire");
const sortButton = document.getElementById("sort");
const calculateWealthButton = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");

  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10000000),
  };

  addData(newUser);
}

// Double every ones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort by Richest
function sortRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

function showMillionaires() {
  data = data.filter(function (user) {
    return user.money > 1000000;
  });

  updateDOM();
}

function calculateTotal() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new object to data Arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM -- if nothing is passed we use DATA as regular input
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach(function (item) {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event Listeners
addUserButton.addEventListener("click", getRandomUser);
doubleButton.addEventListener("click", doubleMoney);
sortButton.addEventListener("click", sortRichest);
showMillionairesButton.addEventListener("click", showMillionaires);
calculateWealthButton.addEventListener("click", calculateTotal);

// MAP ARRAY
