/* Inkwell Campus Bookstore — client-side scripting */

/* ---------- Registration form validation ---------- */
function validateRegister(e) {
  e.preventDefault();
  var ok = true;

  var name = document.getElementById('regName');
  var nameErr = document.getElementById('nameError');
  var nameVal = name.value.trim();
  if (!/^[A-Za-z ]{6,}$/.test(nameVal)) {
    nameErr.textContent = 'Name must contain alphabets only and be at least 6 characters.';
    ok = false;
  } else {
    nameErr.textContent = '';
  }

  var pass = document.getElementById('regPassword');
  var passErr = document.getElementById('passwordError');
  if (pass.value.length < 6) {
    passErr.textContent = 'Password must be at least 6 characters.';
    ok = false;
  } else {
    passErr.textContent = '';
  }

  var email = document.getElementById('regEmail');
  var emailErr = document.getElementById('emailError');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    emailErr.textContent = 'Enter a valid email address (name@domain.com).';
    ok = false;
  } else {
    emailErr.textContent = '';
  }

  var phone = document.getElementById('regPhone');
  var phoneErr = document.getElementById('phoneError');
  if (!/^[0-9]{10}$/.test(phone.value.trim())) {
    phoneErr.textContent = 'Phone number must contain exactly 10 digits.';
    ok = false;
  } else {
    phoneErr.textContent = '';
  }

  var note = document.getElementById('formNote');
  if (ok) {
    note.textContent = 'All fields look good — registration form validated.';
    note.classList.add('show');
  } else {
    note.classList.remove('show');
  }
  return false;
}

/* ---------- Login demo handler (no backend in a static assignment) ---------- */
function handleLogin(e) {
  e.preventDefault();
  var note = document.getElementById('loginNote');
  var user = document.getElementById('loginUser').value.trim();
  if (user.length === 0) {
    note.textContent = 'Enter a username to continue.';
  } else {
    note.textContent = 'This is a static demo page — login is not connected to a server.';
  }
  note.classList.add('show');
  return false;
}

/* ---------- Catalogue: "add to cart" visual confirmation ---------- */
function flashAdded(btn) {
  var flag = btn.parentElement.querySelector('.added-flag');
  if (!flag) return;
  flag.classList.add('show');
  setTimeout(function () { flag.classList.remove('show'); }, 1500);
}

/* ---------- Cart page: quantity +/- and totals ---------- */
function changeQty(rowId, delta) {
  var qtyEl = document.getElementById('qty-' + rowId);
  var amtEl = document.getElementById('amt-' + rowId);
  var price = parseFloat(qtyEl.getAttribute('data-price'));
  var qty = parseInt(qtyEl.textContent, 10) + delta;
  if (qty < 1) qty = 1;
  qtyEl.textContent = qty;
  amtEl.textContent = '$' + (price * qty).toFixed(2);
  recalcTotal();
}

function removeRow(rowId) {
  var row = document.getElementById('row-' + rowId);
  if (row) row.parentNode.removeChild(row);
  recalcTotal();
}

function recalcTotal() {
  var amounts = document.querySelectorAll('[id^="amt-"]');
  var total = 0;
  amounts.forEach(function (el) {
    total += parseFloat(el.textContent.replace('$', '')) || 0;
  });
  var totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
}
