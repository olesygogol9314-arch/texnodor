const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Открыть меню');
  }));
}
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.getElementById('service-type');
    if (select) select.value = link.dataset.service;
  });
});

const form = document.getElementById('request-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!document.getElementById('consent').checked) return;
  const data = new FormData(form);
  const subject = `Заявка на работы — ООО «Технодор»`;
  const body = [
    `Имя / компания: ${data.get('name')}`,
    `Телефон: ${data.get('phone')}`,
    `Услуга: ${data.get('service')}`,
    `Информация об объекте: ${data.get('details') || 'Не указана'}`
  ].join('\n');
  const status = document.getElementById('form-status');
  status.textContent = 'Открываем почтовое приложение. Проверьте письмо и нажмите «Отправить».';
  window.location.href = `mailto:sibmetsiti@mail.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
