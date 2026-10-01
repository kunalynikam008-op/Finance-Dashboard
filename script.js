/* =========================================
   FINORA — PERSONAL FINANCE DASHBOARD
========================================= */

const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");
const searchInput = document.getElementById("searchInput");

const totalBalanceEl = document.getElementById("totalBalance");
const incomeTotalEl = document.getElementById("incomeTotal");
const expenseTotalEl = document.getElementById("expenseTotal");


/* =========================================
   FINANCIAL DATA
========================================= */

let finances = {
  balance: 24892.40,
  income: 8420.00,
  expenses: 3184.65
};


/* =========================================
   FORMAT CURRENCY
========================================= */

function formatMoney(number) {
  return "$" + Number(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

  totalBalanceEl.textContent = formatMoney(finances.balance);
  incomeTotalEl.textContent = formatMoney(finances.income);
  expenseTotalEl.textContent = formatMoney(finances.expenses);

}


/* =========================================
   OPEN MODAL
========================================= */

openModal.addEventListener("click", () => {

  modal.classList.add("show");

  document.getElementById("transactionName").focus();

});


/* =========================================
   CLOSE MODAL
========================================= */

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});


modal.addEventListener("click", (event) => {

  if (event.target === modal) {
    modal.classList.remove("show");
  }

});


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    modal.classList.remove("show");
  }

});


/* =========================================
   ADD TRANSACTION
========================================= */

transactionForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const name =
    document.getElementById("transactionName").value.trim();

  const amount =
    Number(document.getElementById("transactionAmount").value);

  const type =
    document.getElementById("transactionType").value;

  const category =
    document.getElementById("transactionCategory").value;


  if (!name || !amount || amount <= 0) {
    return;
  }


  /* Update financial totals */

  if (type === "income") {

    finances.income += amount;
    finances.balance += amount;

  } else {

    finances.expenses += amount;
    finances.balance -= amount;

  }


  updateDashboard();


  /* Create transaction */

  const transaction = document.createElement("div");

  transaction.className = "transaction";

  transaction.dataset.name = name;


  const initials = name
    .split(" ")
    .map(word => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();


  const amountText =
    type === "income"
      ? `+$${amount.toLocaleString("en-US", {
          minimumFractionDigits: 2
        })}`
      : `−$${amount.toLocaleString("en-US", {
          minimumFractionDigits: 2
        })}`;


  transaction.innerHTML = `

    <div class="transaction-icon ${
      type === "income" ? "purple" : "green"
    }">
      ${initials}
    </div>

    <div class="transaction-info">

      <strong>${escapeHTML(name)}</strong>

      <span>
        ${escapeHTML(category)} · Just now
      </span>

    </div>

    <span class="transaction-status">
      Completed
    </span>

    <strong class="amount ${
      type === "income"
        ? "income-amount"
        : "expense-amount"
    }">
      ${amountText}
    </strong>

  `;


  transactionList.prepend(transaction);


  /* Reset */

  transactionForm.reset();

  modal.classList.remove("show");

});


/* =========================================
   SEARCH TRANSACTIONS
========================================= */

searchInput.addEventListener("input", () => {

  const search =
    searchInput.value.toLowerCase().trim();

  const transactions =
    document.querySelectorAll(".transaction");


  transactions.forEach(transaction => {

    const name =
      transaction.dataset.name?.toLowerCase() || "";

    const content =
      transaction.textContent.toLowerCase();

    if (
      name.includes(search) ||
      content.includes(search)
    ) {

      transaction.style.display = "grid";

    } else {

      transaction.style.display = "none";

    }

  });

});


/* =========================================
   CHART PERIOD BUTTONS
========================================= */

const periodButtons =
  document.querySelectorAll(".period");


periodButtons.forEach(button => {

  button.addEventListener("click", () => {

    periodButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    /*
      In a real application you would
      fetch new chart data here.
    */

    console.log(
      "Selected period:",
      button.textContent
    );

  });

});


/* =========================================
   SIDEBAR NAVIGATION
========================================= */

const navItems =
  document.querySelectorAll(".nav-item");


navItems.forEach(item => {

  item.addEventListener("click", (event) => {

    event.preventDefault();

    navItems.forEach(nav => {
      nav.classList.remove("active");
    });

    item.classList.add("active");

  });

});


/* =========================================
   VIEW ALL
========================================= */

const viewAll =
  document.querySelector(".view-all");


viewAll.addEventListener("click", () => {

  alert(
    "Full transaction history will be available here."
  );

});


/* =========================================
   NOTIFICATION
========================================= */

const notification =
  document.querySelector(".notification");


notification.addEventListener("click", () => {

  alert(
    "You have 3 new financial insights."
  );

});


/* =========================================
   HTML ESCAPE
========================================= */

function escapeHTML(string) {

  const div = document.createElement("div");

  div.textContent = string;

  return div.innerHTML;

}


/* =========================================
   KEYBOARD SHORTCUT
   CMD/CTRL + K
========================================= */

document.addEventListener("keydown", (event) => {

  if (
    (event.metaKey || event.ctrlKey) &&
    event.key.toLowerCase() === "k"
  ) {

    event.preventDefault();

    searchInput.focus();

  }

});


/* =========================================
   INITIALIZE
========================================= */

updateDashboard();


/* =========================================
   SUBTLE LIVE TIME
========================================= */

function updateGreeting() {

  const hour = new Date().getHours();

  const heading =
    document.querySelector(".topbar h1");

  if (!heading) return;

  let greeting = "Good morning";

  if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  }

  if (hour >= 18) {
    greeting = "Good evening";
  }

  heading.innerHTML =
    `${greeting}, Alex <span>✦</span>`;

}


updateGreeting();
