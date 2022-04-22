function renderHTML () {
    const body = document.body || document.getElementsByTagName("body")[0];
    const content = document.createElement('div');

    content.id = 'general-checker';
    content.innerHTML = `
      <div class="containner-checker" id="containner-checker">
  
        <div class="buttons-checker">
            <span class="banner-checker">LEGACY CHECKER | <span class="checker-autor">MINSAIT</span></span>
            <button id="btn-minify" class="btn-minify">&#128469;</button>
            <button id="btn-close" class="btn-close">&#x2715;</button>
        </div>
        <div class="forms-checker">
            <button class="btn-checker" id="btn-checker" >Validar</button>
            <button class="btn-cleaner" id="btn-cleaner" >Limpiar</button>
        </div>
        <div id="error-checkers"></div>
  
        <table class="checker-table" id='checker-table'>
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
    
    body.appendChild(content);
}