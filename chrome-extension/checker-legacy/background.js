function reddenPage() {

  if (document.getElementById('general-checker')) {
    alert('Ya se desplego validador!');

    return false;
  }

  var body = document.body || document.getElementsByTagName("body")[0];
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  var content = document.createElement('div');

  style.id = "extension";
  style.textContent = `
    .containner-checker {
        background-color: white !important;
        border-radius: 5px 5px 0 0 !important;
        padding: 5px !important;
        box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset !important;
        width: 500px !important;
        height: 200px !important;
        position: fixed !important;
        bottom: 0 !important;
        right: 0 !important;
        z-index: 1000000000 !important;
        margin-right: 5px !important;
        overflow-y: scroll !important;
        scrollbar-width: thin !important;
        scrollbar-color: #90A4AE #CFD8DC !important;
        transition: all 0.5s ease-out !important;
    }

    .containner-checker::-webkit-scrollbar {
        width: 10px !important;
        border-radius: 50% !important;
    }

    .containner-checker::-webkit-scrollbar-track {
        background: #CFD8DC !important;
    }

    .containner-checker::-webkit-scrollbar-thumb {
        background-color: #1c6589 !important;
        border-radius: 10px !important;
        border: 3px solid #CFD8DC !important;
    }

    .buttons-checker {
        position: fixed !important;
        right: 0 !important;
        margin-right: 10px !important;
        margin-top: -30px !important;
    }

    .btn-close,
    .btn-minify {
        border: none !important;
        outline: none !important;
        cursor: pointer !important;
        font-weight: bold !important;
        color: white !important;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
        padding-bottom: 3px !important;
        box-sizing: border-box !important;
        width: 26px !important;
        height: 21px !important;
    }

    .btn-close {
        background-color: red !important;
    }

    .btn-minify {
        background-color: rgb(30, 109, 221) !important;
    }

    .forms-checker {
        display: flex !important;
        justify-content: space-around !important;
        padding-top: 5px !important;
    }

    .forms-checker .token-checker {
        width: 85% !important;
        box-sizing: border-box !important;
        padding: 3px !important;
    }

    .forms-checker .btn-checker {
        background-color: #13aa52 !important;
        border: 1px solid #13aa52 !important;
        border-radius: 4px !important;
        box-shadow: rgba(0, 0, 0, .1) 0 2px 4px 0 !important;
        box-sizing: border-box !important;
        color: #fff !important;
        cursor: pointer !important;
        font-size: 12px !important;
        font-weight: 400 !important;
        outline: none !important;
        outline: 0 !important;
        /* padding: 10px 25px; */
        text-align: center !important;
        transform: translateY(0) !important;
        transition: transform 150ms, box-shadow 150ms !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        touch-action: manipulation !important;
    }

    .forms-checker .btn-checker:hover,
    .btn-close:hover,
    .btn-minify:hover {
        box-shadow: rgba(0, 0, 0, .15) 0 3px 9px 0 !important;
        transform: translateY(-2px) !important;
    }

    #error-checkers {
        color: red !important;
        display: flex !important;
        font-size: 12px !important;
        padding: 5px 8px !important;
    }

    .banner-checker {
        display: inline-block !important;
        width: 160px !important;
        font-size: 3px !important;
        height: 22px !important;
        vertical-align: -webkit-baseline-middle !important;
        color: #113001 !important;
    }

    .checker-table {
        border-collapse: collapse !important;
        margin: 25px 0 !important;
        font-size: 0.8em !important;
        font-family: sans-serif !important;
        min-width: 100% !important;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15) !important;
        margin: 0 !important;
    }

    .checker-table thead tr {
        background-color: #3d77ff !important;
        color: #ffffff !important;
        text-align: center !important;
    }

    .checker-table th,
    .checker-table td {
        padding: 4px 4px !important;
    }

    .checker-table tbody tr {
        border-bottom: 1px solid #dddddd !important;
    }

    .checker-table tbody tr:nth-of-type(even) {
        background-color: #f3f3f3 !important;
    }

    .checker-table tbody tr:last-of-type {
        border-bottom: 2px solid #3d77ff !important;
    }

    .checker-table tbody tr.active-row {
        font-weight: bold !important;
        color: #009879 !important;
    }

    .btn-minify,
    .btn-close,
    .btn-checker,
    .forms-checker,
    .forms-checker .token-checker,
    .forms-checker .btn-checker,
    .banner-checker,
    #error-checkers,
    .checker-table
    {
        position: relative !important;
        z-index: 1000000000 !important;
    }
  `;

  content.id = 'general-checker';
  content.innerHTML = `
    <div class="containner-checker" id="containner-checker">

      <div class="buttons-checker">
          <span class="banner-checker">
              ████████████████████████████████████████████████████████████████████████
              █▄─▄─▀█─▄▄▄─█▄─▄▄─███▀▀▀▀▀████▄─▀█▀─▄█▄─▄█▄─▀█▄─▄█─▄▄▄▄██▀▄─██▄─▄█─▄─▄─█
              ██─▄─▀█─███▀██─▄▄▄█████████████─█▄█─███─███─█▄▀─██▄▄▄▄─██─▀─███─████─███
              ▀▄▄▄▄▀▀▄▄▄▄▄▀▄▄▄▀▀▀▀▀▀▀▀▀▀▀▀▀▀▄▄▄▀▄▄▄▀▄▄▄▀▄▄▄▀▀▄▄▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▀▀▄▄▄▀▀
          </span>
          <button id="btn-minify" class="btn-minify">&#128469;</button>
          <button id="btn-close" class="btn-close">&#10006;</button>
      </div>
      <div class="forms-checker">
          <input type="text" class="token-checker" id="token-checker" placeholder="Ingresa tu token de bitbucket">
          <button class="btn-checker" id="btn-checker" >Validar</button>
      </div>
      <div id="error-checkers"></div>

      <table class="checker-table">
          <thead>
              <tr>
                  <th>Grupo</th>
                  <th>Validación</th>
                  <th>Estado</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td colspan="3"></td>
              </tr>
          </tbody>
      </table>
    </div>
  `;

  head.appendChild(style);
  body.appendChild(content);

  window.requestAnimationFrame( () => {
    var storageToken = localStorage.getItem('chekcert-token-bitbucket');
    var token = document.getElementById('token-checker')

    console.dir(token);
    token.value = storageToken;


    document.getElementById('btn-minify').addEventListener('click', function (event) {
      var element = event.target;
      var container = document.getElementById('containner-checker');

      if (container.style.height === '0px') {
        container.style.setProperty('height', "200px", "important");
        container.style.setProperty('padding', "5px", "important");
        element.innerHTML = '&#128469;'
      }
      else {
        container.style.setProperty('height', "0px", "important");
        container.style.setProperty('padding', "0px", "important");
        element.innerHTML = '&#128470;';
      }
    });

    document.getElementById('btn-close').addEventListener('click', function (event) {
      document.getElementById('general-checker').remove();
    });

    document.getElementById('btn-checker').addEventListener('click', async function (event) {
      var token = document.getElementById('token-checker').value;

      if (!token) {

        var storageToken = localStorage.getItem('chekcert-token-bitbucket');

        if (!storageToken) document.getElementById('error-checkers').innerHTML = "OJO: No se ingreso un toker para bitbutcket!"
        else token = localStorage.getItem('chekcert-token-bitbucket')
      }

      localStorage.setItem('chekcert-token-bitbucket', token);

      // console.log('CAMÓN'.removeAccents());
      // res = await validate(token);

      // console.dir(res);

      var actualCode = `// Code here.
      function rob () {alert('si')};
// If you want to use a variable, use $ and curly braces.
// For example, to use a fixed random number:
var someFixedRandomValue = ${ Math.random() };
// NOTE: Do not insert unsafe variables in this way, see below
// at "Dynamic values in the injected code"
`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
// script.remove();

      rob();
      
    });

    
  });

  // data =  fetch(new Request('https://unpkg.com/legacy-checker/dist/main.js')).then(x=> x.text()).then(y=>{ console.dir(y)});

  // console.dir(data);
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});
