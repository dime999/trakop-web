// Trakop – mala skripta za obrazac za upit.
// Stranica nema server, pa upit otvara SMS poruku na broj firme sa popunjenim tekstom.
// Kad bude backend (npr. Formspree, Netlify Forms ili vlastiti mail), zamijenite ovaj dio.
document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('#kontakt form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form);
    var text = 'Upit sa web stranice\n' +
      'Ime: ' + (f.get('ime') || '') + '\n' +
      'Telefon: ' + (f.get('telefon') || '') + '\n' +
      'Posao: ' + (f.get('posao') || '') + '\n' +
      'Opis: ' + (f.get('opis') || '');
    window.location.href = 'sms:+38762344770?body=' + encodeURIComponent(text);
  });
});
