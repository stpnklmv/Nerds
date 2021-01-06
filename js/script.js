var contactsBtn = document.querySelector(".contacts__button");
var modal = document.querySelector(".overlay");
var modalClose = modal.querySelector(".modal-close");
var modalContainer = modal.querySelector(".modal-container");

var modalForm = modal.querySelector("form");
var modalFormName = modal.querySelector("[name=name]");
var modalFormEmail = modal.querySelector("[name=email]");
var modalFormText = modal.querySelector("[name=text]");

var isStorageSupport = true;
var storageFormName = localStorage.getItem("modalFormName");
var storageFormEmail = localStorage.getItem("modalFormEmail");

try {
  storageFormName = localStorage.getItem("modalFormName");
  storageFormEmail = localStorage.getItem("modalFormEmail");
} catch (err) {
  isStorageSupport = false;
}

contactsBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.toggle("modal");
  modalContainer.classList.toggle("modal-bounce");
  modalFormName.focus();
  if (storageFormName) {
    modalFormName.value = storageFormName;
    modalFormEmail.focus();
    if (storageFormEmail) {
      modalFormEmail.value = storageFormEmail;
      modalFormText.focus();
    } else {
      modalFormEmail.focus();
    }
  } else {
    modalFormName.focus();
  }
});

modalClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.toggle("modal");
  modalContainer.classList.remove("modal-error");
  modalContainer.classList.remove("modal-bounce");
});

modalForm.addEventListener("submit", function (evt) {
  if (!modalFormName.value || !modalFormEmail.value || !modalFormText.value) {
    evt.preventDefault();
    modalContainer.classList.remove("modal-error");
    modalContainer.offsetWidth = modalContainer.offsetWidth;
    modalContainer.classList.add("modal-error");

  } else {
    if (isStorageSupport) {
      localStorage.setItem("modalFormName", modalFormName.value);
      localStorage.setItem("modalFormEmail", modalFormEmail.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (!modal.classList.contains("modal")) {
      evt.preventDefault();
      modal.classList.toggle("modal");
      modalForm.classList.remove("modal-error");
      modalContainer.classList.remove("modal-bounce");
    }
  }
})