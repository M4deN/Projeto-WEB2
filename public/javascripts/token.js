fetch('/armazenar-token')
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      // Armazena o token no localStorage
      localStorage.setItem('token', data.token);
      console.log('Token armazenado:', data.token);
    } else {
      console.error('Erro ao obter o token.');
    }
  })
  .catch(error => {
    console.error(error);
    console.log('Erro ao armazenar o token.');
  });