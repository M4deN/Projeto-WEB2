document.getElementById('form-contato').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que o formulário seja enviado

  var form = this;
  var formData = new FormData(form);

  // Envie os dados do formulário usando AJAX
  var xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Se a resposta do servidor for 200 (OK), a mensagem foi enviada com sucesso
      alert('Mensagem enviada com sucesso!');
      form.reset(); // Limpa o formulário
    } else {
      // Se a resposta do servidor não for 200, ocorreu um erro
      alert('Ocorreu um erro ao enviar a mensagem.');
    }
  };
  xhr.onerror = function() {
    // Se ocorrer um erro durante a requisição AJAX
    alert('Ocorreu um erro ao enviar a mensagem.');
  };
  xhr.send(formData);
});