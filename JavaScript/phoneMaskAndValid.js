//Маска ввода номера телефона и валидация для неё

function maskPhone(event) {
    event.keyCode && (keyCode = event.keyCode);
    let pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    let matrix = "+7 (___) ___-__-__",
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, ""),
    new_value = matrix.replace(/[_\d]/g, function(a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
    });
    i = new_value.indexOf("_");
    if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
    }
    let reg = matrix.substring(0, this.value.length).replace(/_+/g,
    function(a) {
        return "\\d{1," + a.length + "}"
    }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
    if (event.type == "blur" && this.value.length < 5)  this.value = "";
}

function validPhoneContacts(tel) {
    if (tel.match(/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/)) {
        return true;
    } else {
        return false;
    }
}

//Пример использования

const input = document.querySelector('#input');

input.addEventListener('input', maskPhone, false);
input.addEventListener("focus", maskPhone, false);
input.addEventListener("blur", maskPhone, false);
input.addEventListener("keydown", maskPhone, false);

if (!validPhoneContacts(input.value)) {
  console.log('Номер не прошел валидацию');
}