const nameIn = document.querySelector('#name')
const mobileIn = document.querySelector('#mobile')
const emailIn = document.querySelector('#email')
const addVendorIn = document.querySelector('#submit')
const searchIn = document.querySelector('#search')
const contactsTable = document.querySelector('#summaryTable')
const errorDiv = document.querySelector('#error')
let contacts = [{
  name: "Admin", mobile: '9999999999', email: 'admin@xyzcompany.com'
}]

function validateName (name) {
  return /^[A-Za-z\s]{1,20}$/.test(name)
}
function validateMobile (mobile) {
  return /^\d{10}$/.test(mobile)
}
function validateEmail (email) {
  return /^[A-Za-z][A-Za-z0-9.]{1,9}@[A-Za-z0-9]{2,20}\.[A-Za-z]{2,10}$/.test(email)
}
function showError () {
  errorDiv.style.display = 'block'
}
function hideError () {
  errorDiv.style.display = 'none'
}

function addContact () {
  const name = nameIn.value.trim()
  const mobile = mobileIn.value.trim()
  const email = emailIn.value.trim()
  if (!validateName(name) || !validateEmail(email) || !validateMobile(mobile)) {
    showError()
    return
  }
  hideError()
  contacts.push({name, mobile, email})
  const newRow = contactsTable.insertRow()
  newRow.insertCell(0).textContent = name
  newRow.insertCell(1).textContent = mobile
  newRow.insertCell(2).textContent = email
  nameIn.value = ''
  mobileIn.value = ''
  emailIn.value = ''
}

function searchContact () {
  const query = searchIn.value.trim()
  const rows = contactsTable.getElementsByTagName('tr')
  console.log(query, rows)

  for (let i = 0; i < rows.length; i++) {
    const nameCell = rows[i].getElementsByTagName('td')[0]
    if (nameCell) {
      const nameValue = nameCell.textContent || nameCell.innerText

      rows[i].style.display = nameValue.includes(query) ? "" : "none"
    }
  }
}
addVendorIn.addEventListener('click', addContact)
searchIn.addEventListener('input', searchContact)