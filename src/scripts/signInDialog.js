const userPasswordEl = document.getElementById('user-password');
const resetLinkEl = document.getElementById('reset-link');
const registerLinkEl = document.getElementById('register-link');
const signInEl = document.getElementById('sign-in');
const dialogLoginEl = document.getElementById('dialog-login');
const dialogCloseBtn = document.getElementById('close-dialog-btn');
const registerInfoEl = document.getElementById('register-info');
const resetInfoEl = document.getElementById('reset-info');
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const resetBtn = document.getElementById('reset-btn');
const gobackEl = document.getElementById('goback-info');

signInEl.addEventListener('click', () => dialogLoginEl.showModal());

const hide = element => element.classList.add('hidden');
const show = element => element.classList.remove('hidden');
const resetContainer = () => {
  show(registerInfoEl);
  show(resetInfoEl);
  show(loginBtn);
  show(userPasswordEl);
  hide(registerBtn);
  hide(resetBtn);
  hide(gobackEl);
};

dialogCloseBtn.addEventListener('click', () => {
  resetContainer();
  dialogLoginEl.close();
});

const showRegister = () => {
  hide(loginBtn);
  hide(registerInfoEl);
  hide(resetInfoEl);
  show(registerBtn);
  show(gobackEl);
};

const showReset = () => {
  hide(loginBtn);
  hide(registerInfoEl);
  hide(resetInfoEl);
  hide(userPasswordEl);
  show(resetBtn);
  show(gobackEl);
};

export const dialogBehavior = () => {
  registerLinkEl.addEventListener('click', () => showRegister());
  resetLinkEl.addEventListener('click', () => showReset());
  gobackEl.addEventListener('click', () => resetContainer());
};
