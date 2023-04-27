window.onload = function () {
    document.getElementById('formLogin').addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    document.getElementById('btnLogin').addEventListener('click', login);
  };
  
  async function login() {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
        let jsonData = await response.json();     
        sessionStorage.setItem('userToken', JSON.stringify(jsonData));
       
        window.location.href = getWorkingDirectory() + '/index.html';
    }
    else
    {
        let jsonData = await response.json();
        document.getElementById('errorMessage').innerHTML = jsonData;
    }
  }

function getWorkingDirectory() {
    var filePath = window.location.pathname;
    var directory = filePath.substring(0, filePath.lastIndexOf('/'));
    return directory;
}