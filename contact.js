// ===================================================================
// Contact form validation
// Demonstrates: event handling, DOM manipulation, form validation
// ===================================================================

(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");
  const status = document.getElementById("form-status");

  const fields = [
    { input: nameInput, error: document.getElementById("name-error") },
    { input: emailInput, error: document.getElementById("email-error") },
    { input: phoneInput, error: document.getElementById("phone-error") },
    { input: messageInput, error: document.getElementById("message-error") },
  ];

  function clearErrors() {
    fields.forEach(({ input, error }) => {
      input.classList.remove("error");
      error.textContent = "";
    });
  }

  function setError(input, error, message) {
    input.classList.add("error");
    error.textContent = message;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isDigitsOnly(value) {
    return /^[0-9]+$/.test(value.replace(/[\s+()-]/g, ""));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    if (nameInput.value.trim() === "") {
      setError(nameInput, document.getElementById("name-error"), "Name is required.");
      valid = false;
    }

    if (emailInput.value.trim() === "") {
      setError(emailInput, document.getElementById("email-error"), "Email is required.");
      valid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      setError(emailInput, document.getElementById("email-error"), "Enter a valid email address.");
      valid = false;
    }

    if (phoneInput.value.trim() === "") {
      setError(phoneInput, document.getElementById("phone-error"), "Phone number is required.");
      valid = false;
    } else if (!isDigitsOnly(phoneInput.value.trim())) {
      setError(phoneInput, document.getElementById("phone-error"), "Phone number must contain digits only.");
      valid = false;
    }

    if (messageInput.value.trim() === "") {
      setError(messageInput, document.getElementById("message-error"), "Message cannot be empty.");
      valid = false;
    }

    status.classList.remove("show", "success", "fail");

    if (valid) {
      status.textContent = "Message sent successfully. Justin will get back to you soon.";
      status.classList.add("show", "success");
      form.reset();
    } else {
      status.textContent = "Please fix the highlighted fields and try again.";
      status.classList.add("show", "fail");
    }
  });

  // Clear individual field error as user corrects it
  fields.forEach(({ input, error }) => {
    input.addEventListener("input", () => {
      input.classList.remove("error");
      error.textContent = "";
    });
  });
})();
