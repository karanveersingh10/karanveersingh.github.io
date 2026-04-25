
/*
Name: Karanveer Singh
Date: 21 April 2026
Description: This script checks the contact form inputs like name, phone, email, and message, and shows errors or a success message based on the input.
*/


// Regex to check a valid email
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Show an error message under a field
function showError(fieldId, message) {
  var field = document.getElementById(fieldId);
  field.classList.add('error');

  // Find or create the error span
  var errEl = field.parentElement.querySelector('.error-msg');
  if (!errEl) {
    errEl = document.createElement('span');
    errEl.classList.add('error-msg');
    field.parentElement.appendChild(errEl);
  }
  errEl.textContent = message;
}

// Remove error styling from a field
function clearError(fieldId) {
  var field = document.getElementById(fieldId);
  field.classList.remove('error');
  var errEl = field.parentElement.querySelector('.error-msg');
  if (errEl) {
    errEl.textContent = '';
  }
}

// Validate the form when submitted
function validateForm(event) {
  event.preventDefault();

  var name    = document.getElementById('name').value.trim();
  var phone   = document.getElementById('phone').value.trim();
  var email   = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();

  // Clear old errors
  clearError('name');
  clearError('phone');
  clearError('email');
  clearError('message');

  var firstError = null;

  // Check name
  if (name === '') {
    showError('name', 'Please enter your name.');
    if (!firstError) firstError = 'name';
  }

  // Phone must be exactly 10 digits
  if (!/^\d{10}$/.test(phone)) {
    showError('phone', 'Phone number must be exactly 10 digits.');
    if (!firstError) firstError = 'phone';
  }

  // Check email
  if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address.');
    if (!firstError) firstError = 'email';
  }

  // Check message
  if (message === '') {
    showError('message', 'Please write a message.');
    if (!firstError) firstError = 'message';
  }

  // Focus the first field with an error
  if (firstError) {
    document.getElementById(firstError).focus();
    return;
  }


  document.getElementById('success-msg').style.display = 'block';
  document.getElementById('contact-form').reset();
}


window.onload = function () {
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', validateForm);
  }
};
