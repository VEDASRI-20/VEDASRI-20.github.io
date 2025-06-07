const users = [];
let user = {};

const showLogin = () => {
  let str = `
    <div>
      <h1>Login Form</h1>
      <p><div id="dvMsg" style="color:red;"></div></p>
      <p><input type="text" id="txtEmail" placeholder="Email"></p>
      <p><input type="password" id="txtPass" placeholder="Password"></p>
      <p><button onclick='validateUser()'>Log In</button></p>
      <p><button onclick='showRegister()'>Create Account</button></p>
    </div>
  `;
  root.innerHTML = str;
};

const showRegister = () => {
  let str = `
    <h1>Register Form</h1>
    <p><input type="text" id="txtName" placeholder="Name"></p>
    <p><input type="text" id="txtEmail" placeholder="Email"></p>
    <p><input type="password" id="txtPass" placeholder="Password"></p>
    <p><button onclick='addUser()'>Register</button></p>
    <hr>
    <p><button onclick='showLogin()'>Already a Member? Login here...</button></p>
  `;
  root.innerHTML = str;
};

const showHome = () => {
  let str = `
    <h1>Welcome ${user.name}</h1>
    <hr>
    <div id="dvMsg" style="color:red;"></div>
    <p>
      <select id="actionSelect">
        <option value="0">--select--</option>
        <option value="1">Deposit</option>
        <option value="2">Withdraw</option>
      </select>
    </p>
    <p><input type='number' id='txtAmount' placeholder="Enter amount"></p>
    <p>
      <button onclick='submitTransaction()'>Submit</button>
      <button onclick='showLogin()'>Logout</button>
    </p>
    <hr>
    <p>Current balance: ₹${user.balance.toFixed(2)}</p>
  `;
  root.innerHTML = str;
};

const addUser = () => {
  const obj = {
    name: document.getElementById("txtName").value,
    email: document.getElementById("txtEmail").value,
    pass: document.getElementById("txtPass").value,
    balance: 0
  };
  users.push(obj);
  showLogin();
};

const validateUser = () => {
  const email = document.getElementById("txtEmail").value;
  const pass = document.getElementById("txtPass").value;

  user = users.find(e => e.email === email && e.pass === pass);

  if (user) {
    showHome();
  } else {
    document.getElementById("dvMsg").innerHTML = "❌ Access Denied. Invalid credentials!";
  }
};

const submitTransaction = () => {
  const action = document.getElementById("actionSelect").value;
  const amount = parseFloat(document.getElementById("txtAmount").value);
  const msg = document.getElementById("dvMsg");
  msg.innerHTML = "";

  if (isNaN(amount) || amount <= 0) {
    msg.innerHTML = "❌ Please enter a valid amount greater than 0.";
    return;
  }

  if (action === "1") {
    // Deposit
    user.balance += amount;
    showHome();
  } else if (action === "2") {
    // Withdraw
    if (amount > user.balance) {
      msg.innerHTML = "❌ Insufficient balance to withdraw!";
      return;
    }
    user.balance -= amount;
    showHome();
  } else {
    msg.innerHTML = "❌ Please select an action (Deposit or Withdraw).";
  }
};
