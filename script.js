"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  userID: "js",
  ownar: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  data: [
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
  ],
  cashBackRate: 1.2,
  pin: 1111,
};
const account2 = {
  userID: "jd",
  ownar: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  data: [
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
  ],
  cashBackRate: 1.5,
  pin: 2222,
};
const account3 = {
  userID: "stw",
  ownar: "Steven Thomas Williams",
  movements: [430, 1000, 700, -300, -20, 50, 400, -460],
  data: [
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
  ],
  cashBackRate: 0.7,
  pin: 3333,
};
const account4 = {
  userID: "ss",
  ownar: "Sarah Smith",
  movements: [200, -200, 340, 50, 90],
  data: [
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
    new Date(1995, 11, 17, 3, 24, 0),
  ],
  cashBackRate: 1,
  pin: 4444,
};
let currentProfile;
const accounts = [account1, account2, account3, account4];
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumCashback = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const btnLogin = document.querySelector(".login__btn");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");

const btnTransfer = document.querySelector(".form__btn--transfer");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");

const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const username = document.querySelector(".login_input--user");
const loginBtn = document.querySelector(".login__btn");
const PIN = document.querySelector(".login_input--pin");

const alertDiv = document.querySelector(".alert");

function alert(text) {
  alertDiv.textContent = text;
  alertDiv.style.display = "block";
  setTimeout(() => {
    alertDiv.style.display = "none";
  }, 1_000);
}

btnLoan.addEventListener("click", (e) => {
  e.preventDefault
  // for lent money
  let isEnaught = currentProfile.movements.some(el=>el>=el*0.1)
  setTimeout(()=>{
    if(!isEnaught){
      alert("This request will not be accepted.")
    }
    else if ( inputLoanAmount.value>0){
      accounts.forEach((element) => {
        if (element.ownar == labelWelcome.textContent) {
          element.movements.push(+inputLoanAmount.value);
          element.data.push(new Date());
          displayBalance(element.movements);
          displayMovements(element.movements, element.data);
          displaySummary(element);
          inputLoanAmount.value = "";
        }
      });
    }else{
      alert("You use wrong amound format !!!")
    }
  },3000)
});



function displayTime(date) {
  let now = new Date();

  function calcPassedDay(date1, date2) {
    let day = Math.trunc(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

    if (date1.getHours() - date2.getHours() < 0) return ++day;
    return day;
  }
  let passedDay = calcPassedDay(now, date);

  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  let hour = String(date.getHours()).padStart(2, '0');
  let minut = String(date.getMinutes()).padStart(2, '0');
  // 15/10/2023, 21:30
  if (passedDay == 0) return `Today, ${hour}:${minut}`;
  if (passedDay == 1) return `Yesterday, ${hour}:${minut}`;

  return `${day}/${month}/${year}, ${hour}:${minut}`;
}








// for transfer money
btnTransfer.addEventListener("click", () => {
  if (accounts.indexOf(inputTransferTo.value) && inputTransferAmount.value>0 && inputTransferTo.value!=currentProfile.userID) {
    accounts.forEach((element) => {
      if (element.ownar == labelWelcome.textContent) {
        element.movements.push(+`-${inputTransferAmount.value}`);
        element.data.push(new Date());
        displayBalance(element.movements);
        displayMovements(element.movements, element.data);
        displaySummary(element);
      }
    });
    accounts.forEach((element) => {
      if (element.userID == inputTransferTo.value) {
        element.movements.push(+inputTransferAmount.value);
        element.data.push(new Date());
        inputTransferAmount.value = "";
        inputTransferTo.value = "";
      }
    });
  }
  else alert("Wrong enything !!!")
});

// for close accaunt

btnClose.addEventListener("click", () => {
  let working = false;
  accounts.forEach((element) => {
    if (
      element.userID == currentProfile.userID &&
      element.pin == +inputClosePin.value
    ) {
      containerApp.classList.add("hidden");
      working = true;
      inputTransferTo.value = "";
      labelWelcome.textContent = "Log in to get started";
    }
  });
  inputCloseUsername.value = "";
  inputClosePin.value = "";
  if (!working) alert("Pin or username error !!!");
});

// Functions

function displayMovements(movements, date) {
  containerMovements.textContent = "";
  let i = 0;
  movements.forEach((move) => {
    let type = move > 0 ? "deposit" : "withdrawal";
    const html = `        <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          1 ${type}
        </div>
        <div class="movements__date">${displayTime(date[i])}</div>
        <div class="movements__value">${move}$</div>
      </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
    console.log(i);
    i++;
  });
}



let sorted = false;
function displayMovementsSort(movements, date) {
  console.log(movements);
  let array
  if(!sorted){
    array = movements.slice();
    array.sort((a, b) => a - b);
    sorted = true;
  } else{
    array = movements;
    sorted = false;
  } 
  containerMovements.textContent = "";
  let i = 0;
  array.forEach((move) => {
    let type = move > 0 ? "deposit" : "withdrawal";
    const html = `        <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          1 ${type}
        </div>
        <div class="movements__date">${date[1].toLocaleString()}</div>
        <div class="movements__value">${move}$</div>
      </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
    i++;
  });
}
function displayBalance(movements) {
  let balance = movements.reduce((acc, element) => acc + element, 0);
  labelBalance.textContent = `${balance}$`;
}
function displaySummary(account) {
  labelWelcome.textContent = account.ownar;
  const income = account.movements
    .filter((move) => move > 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumIn.textContent = `${income}$`;
  const outcome = account.movements
    .filter((move) => move < 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}$`;
  const cashback = account.movements
    .filter((move) => move > 0)
    .map((move) => move * (account.cashBackRate / 100))
    .filter((cash) => cash > 1)
    .reduce((acc, val) => acc + val);
  labelSumCashback.textContent = `${cashback}$`;
}

function swichAcount() {
  let working = false;
  accounts.forEach((element) => {
    if (element.userID == username.value && element.pin == PIN.value) {
      displayMovements(element.movements, element.data);
      displayBalance(element.movements);
      displaySummary(element);
      containerApp.classList.remove("hidden");
      currentProfile = element;
      working = true;
      username.value = "";
      PIN.value = "";
      startTimer(5 * 60);
      timeInSecs = 0;
      setTimeout(() => {
        containerApp.classList.add("hidden");
      }, 300_000);
      overly.classList.add("dn");
      login.classList.remove("loginShow");
    }
  });
  if (!working) alert("Pin or username error !!!");
}

btnSort.addEventListener("click", () => {
  accounts.forEach((element) => {
    if (element.ownar == labelWelcome.textContent) {
      displayMovementsSort(element.movements, element.data);
    }
  });
});
loginBtn.addEventListener("click", swichAcount);
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (username.value && PIN.value) {
      swichAcount();
    }
  }
});

// for timer
let timeInSecs;
let ticker;
function startTimer(secs) {
  timeInSecs = parseInt(secs);
  ticker = setInterval("tick()", 1000);
}
function tick() {
  let secs = timeInSecs;
  if (secs > 0) {
    timeInSecs--;
  } else {
    clearInterval(ticker);
    startTimer(5 * 60); // 4 minutes in seconds
  }
  let mins = Math.floor(secs / 60);
  secs %= 60;
  let pretty =
    (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
  document.getElementById("countdown").innerHTML = pretty;
}

// for burger
const burgerBtn = document.querySelector(".burger");
const login = document.querySelector(".Login");
const overly = document.querySelector(".overite");
const x = document.querySelector(".x");

burgerBtn.addEventListener("click", () => {
  overly.classList.remove("dn");
  login.classList.add("loginShow");
});
overly.addEventListener("click", () => {
  overly.classList.add("dn");
  login.classList.remove("loginShow");
});
x.addEventListener("click", () => {
  overly.classList.add("dn");
  login.classList.remove("loginShow");
});
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    overly.classList.add("dn");
    login.classList.remove("loginShow");
  }
});
