window.onload = function () {
    document.getElementById('formLogin').addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    document.getElementById('btnLogin').addEventListener('click', login);
  };
  
  async function login() {
      const response = await callAPI(
          'http://localhost:3000/login',
          'POST',
          JSON.stringify({
              username: document.getElementById('username').value,
              password: document.getElementById('password').value,
          })
      );
  
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



async function callAPI(url, method, body) {
    let setting = {
        method: method,
        body: body,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    };

    const response = await fetch(url, setting);

    return response;
}

function getWorkingDirectory() {
    var filePath = window.location.pathname;
    var directory = filePath.substring(0, filePath.lastIndexOf('/'));
    return directory;
}