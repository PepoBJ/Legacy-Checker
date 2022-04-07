
/** REGION: UTILITARIOS */

String.prototype.removeAccents = function () {
    var accentsMap = new Map([
        ["A", "Á|À|Ã|Â|Ä"],
        ["a", "á|à|ã|â|ä"],
        ["E", "É|È|Ê|Ë"],
        ["e", "é|è|ê|ë"],
        ["I", "Í|Ì|Î|Ï"],
        ["i", "í|ì|î|ï"],
        ["O", "Ó|Ò|Ô|Õ|Ö"],
        ["o", "ó|ò|ô|õ|ö"],
        ["U", "Ú|Ù|Û|Ü"],
        ["u", "ú|ù|û|ü"],
        ["C", "Ç"],
        ["c", "ç"],
        ["N", "Ñ"],
        ["n", "ñ"]
    ]);

    var reducer = (acc, [key]) => acc.replace(new RegExp(accentsMap.get(key), "g"), key);;

    return [...accentsMap].reduce(reducer, this.valueOf());
}

/** END REGION: FIN UTILITARIOS */

/** REGION: VALIDATORS */

function validateRequestType(rows) {
    var requestType = rows.filter(row => row.indexOf('TIPO DE SOLICITUD') !== -1);

    if (!requestType.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "TIPO DE SOLICITUD"' }];

    var identify = requestType[0].match(/^-(\s?)TIPO DE SOLICITUD:(\s?)((PASE A PRODUCCION(\s?)(FASEADO)?)|(CONGELAMIENTO)|(ADELANTO DE FORMATO(S?)))/gm);

    if (!identify) return [{ 'group': 'Notes', 'type': 'Error', 'comment': `Tipo de solicitud incorrecta: [${requestType[0]}]` }];

    var response = [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Tipo de solicitud correcta: [${identify}]` }];
    validationType = identify[0].split(':')[1];

    var hito = document.querySelectorAll('.ardbnz1DMilestone > textarea')[0].value.removeAccents().toUpperCase();
    var targetDate = document.querySelectorAll('.ardbnTargetDate > input')[0].value.removeAccents().toUpperCase();

    if ((validationType.indexOf('CONGELAMIENTO') !== -1 || validationType.indexOf('FORMATO') !== -1) && hito != 'PRUEBA') {
        response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `La solicitud ${validationType} esta en el hito ${hito}, debería estar en [PRUEBA].` });
    }
    else if (validationType.indexOf('PASE A PRODUCCION') !== -1 && hito != 'APLICACION') {
        response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `La solicitud ${validationType} esta en el hito ${hito}, debería estar en [APLICACION].` });
    }
    else if (validationType.indexOf('PASE A PRODUCCION') !== -1 && targetDate.length < 1) {
        response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `La solicitud ${validationType} debe tener el campo 'Fecha deseada' completa.` });
    }

    return response;
}

function validateDateRequest(rows) {
    var dateRequest = rows.filter(row => row.indexOf('FECHA DE SOLICITUD') !== -1 || row.indexOf('FECHA DE LA SOLICITUD') !== -1);

    if (!dateRequest.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "FECHA DE SOLICITUD"' }]

    var identify = dateRequest[0].match(/^(-(\s?)FECHA DE (LA)?(\s?)SOLICITUD(:)(\s?))([0-9]{2}[-?\/?][0-9]{2}[-?\/?][0-9]{4})/)

    if (!identify) return [{ 'group': 'Notes', 'type': 'Error', 'comment': `Fecha de solicitud incorrecta: [${dateRequest[0]}]` }];

    var response = [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Fecha de solicitud correcta: [${identify[0]}]` }];

    dateCatch = identify[identify.length - 1].replaceAll('-', '/').split('/');
    dateCatchFormated = new Date(+dateCatch[2], dateCatch[1] - 1, +dateCatch[0]);
    differenceFromNow = (new Date() - dateCatchFormated) / (1000 * 3600 * 24);

    if (differenceFromNow != 0) response.push({ 'group': 'Notes', 'type': 'Warning', 'comment': `Existen ${differenceFromNow.toFixed(2)} días de diferencia respecto a hoy!` })

    return response;
}

function validateVoB(rows, repository = 'PELKDVI') {
    var vOB = rows.filter(row => row.indexOf('VOB') !== -1);

    if (!vOB.length) return { 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "VOB"' }

    var regex = new RegExp(`^-(\\s?)VOB:(\\s?)${repository}`, 'gm');

    var identify = vOB[vOB.length - 1].match(regex);

    if (!identify) return { 'group': 'Notes', 'type': 'Error', 'comment': `VoB incorrecta: [${vOB[0]}]` }

    return { 'group': 'Notes', 'type': 'Ok', 'comment': `VoB correcta: [${identify}]` }
}

function validateCordinator(rows) {
    var groupOfCordinator = rows.filter(row => row.indexOf('GRUPO COORDINADOR') !== -1);
    var nameOfCordinator = rows.filter(row => row.indexOf('COORDINADOR DE LANZAMIENTOS') !== -1);

    if (!groupOfCordinator.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "GRUPO COORDINADOR"' }];
    if (!nameOfCordinator.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "COORDINADOR DE LANZAMIENTOS"' }];

    return [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Grupo coordinador correcto: ${groupOfCordinator[groupOfCordinator.length - 1]}` },
    { 'group': 'Notes', 'type': 'Ok', 'comment': `Coordinador de lanzamientos correcto: ${nameOfCordinator[nameOfCordinator.length - 1]}` }];
}

function validateDiagramns(rows) {
    var architectureUnified = rows.filter(row => row.indexOf('HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/COEDAPUB/COMPONENTES+DE+LA+ARQUITECTURA+UNIFICADA+DE+DATOS') !== -1);
    var architectureRed = rows.filter(row => row.indexOf('HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/COEDAPUB/ARQUITECTURA+DE+RED') !== -1);
    var architectureDataLake = rows.filter(row => row.indexOf('HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/COEDAPUB/TAXONOMIA+DEL+DATA+LAKE') !== -1);

    var responses = [];

    if (!architectureUnified.length) responses.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "ARQUITECTURA UNIFICADA DE DATOS"' });
    if (!architectureRed.length) responses.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "ARQUITECTURA DE RED"' });
    if (!architectureDataLake.length) responses.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "TAXONOMIA DE DATALAKE"' });

    if (architectureUnified.length) responses.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `UDA correcto: ${architectureUnified[architectureUnified.length - 1]}` });
    if (architectureRed.length) responses.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Arquitectura de red correcto: ${architectureRed[architectureRed.length - 1]}` });
    if (architectureDataLake.length) responses.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Arquitectura de LKDV correcto: ${architectureDataLake[architectureDataLake.length - 1]}` });


    return responses;
}

function validateContact(rows) {
    var nameContact = rows.filter(row => row.indexOf('NOMBRE CONTACTO PASE') !== -1);
    var phoneContact = rows.filter(row => row.indexOf('CELULAR CONTACTO PASE') !== -1);
    var response = [];

    if (!nameContact.length) response.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "NOMBRE CONTACTO PASE"' });
    if (!phoneContact.length) response.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "CELULAR CONTACTO PASE"' });

    var identifyNameContact = nameContact.length ? nameContact[0].match(/^-(\s?)NOMBRE CONTACTO PASE(:)(.*)/gm) : null;
    var identifyPhoneContact = phoneContact.length ? phoneContact[0].match(/^-(\s?)CELULAR CONTACTO PASE(:)(.*)/gm) : null;

    if (nameContact.length && !identifyNameContact) response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `Nombre contacto pase incorrecto: [${nameContact[0]}]` });
    if (phoneContact.length && !identifyPhoneContact) response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `Celular contacto pase incorrecto: [${phoneContact[0]}]` });

    if (identifyNameContact) response.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Nombre contacto pase correcta: [${identifyNameContact[0]}]` })
    if (identifyPhoneContact) response.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Celular contacto pase correcta: [${identifyPhoneContact[0]}]` })

    return response;
}

async function validateLastCommitId(rows, bitbucketToken, agilTicket) {
    var commitId = rows.filter(row => row.indexOf('COMMIT') !== -1);

    if (!commitId.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "COMMIT ID"' }];

    var identify = commitId[0].match(/^(-(\s?)(.*)COMMIT(.*)(:)(\s?))([0-9a-zA-Z]{11})/);

    if (!identify) return [{ 'group': 'Notes', 'type': 'Error', 'comment': `Commit incorrecto: [${commitId[0]}]` }];

    var response = [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Commit correcto: [${identify[0]}]` }];

    commitIdCatch = identify[identify.length - 1].toLowerCase();

    if (bitbucketToken && agilTicket) {
        try {
            var url = new Request(`http://localhost:5000/BitbucketLegacy/GetLastCommitId/${agilTicket}/${bitbucketToken}`);

            var commitResponse = await fetch(url)
                .then(result => {
                    if (!result.ok) return Promise.reject(result.json())

                    return result.json();
                })
                .then(commitData => commitData.values[0].displayId)
                .catch(error => {
                    error.then(errorResponse => response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se pudo verificar último commit id en bitbucket: [${errorResponse.message}]` }))
                });

            if (commitResponse && commitIdCatch.toLowerCase() != commitResponse) {
                response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `El commit id no coincide con lo obtenido de bitbucket: RLM:[${commitIdCatch.toLowerCase()}] - BB[${commitResponse}]` });
            }

            if (commitResponse) response.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `El commit id coincide con lo obtenido de bitbucket: RLM:[${commitIdCatch.toLowerCase()}] - BB[${commitResponse}]` });
        }
        catch (error) {

            response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se pudo verificar último commit id en bitbucket: [${commitIdCatch.toLowerCase()}]` });

            console.error(error);
        }

    }
    else {
        response.push({ 'group': 'Notes', 'type': 'Warning', 'comment': `No se pudo verificar último commit id en bitbucket, asegurese de ingresar un toker correcto y tener prendido el servicio.` });
    }

    return response;
}

function validateResume(rows) {
    var applicationResume = rows.filter(row => row.indexOf('APP:') !== -1);
    var agilTicketResume = rows.filter(row => row.indexOf('TA:') !== -1);
    var criticalityResume = rows.filter(row => row.indexOf('CRITICIDAD:') !== -1);
    var productOwnerResume = rows.filter(row => row.indexOf('PO:') !== -1);
    var response = [];

    if (!applicationResume.length) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': 'No se pudo identificar "APP"' });
    if (!agilTicketResume.length) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': 'No se pudo identificar "TA"' });
    if (!criticalityResume.length) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': 'No se pudo identificar "CRITICIDAD"' });
    if (!productOwnerResume.length) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': 'No se pudo identificar "PO"' });

    var application = applicationResume.length ? applicationResume[0].match(/^APP:(\s?)(LKDV|DWI)/) : null;
    var agilTicket = agilTicketResume.length ? agilTicketResume[0].match(/^TA:(\s?)(TA[0-9]{9})$/) : null;
    var criticality = criticalityResume.length ? criticalityResume[0].match(/^CRITICIDAD:(\s?)(2)/gm) : null;
    var productOwner = productOwnerResume.length ? productOwnerResume[0].match(/^PO:(\s?)(.*)/gm) : null;

    if (applicationResume.length && !application) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': `APP incorrecto: ${applicationResume[0]}` });
    if (agilTicketResume.length && !agilTicket) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': `TA incorrecto: ${agilTicketResume[0]}` });
    if (criticalityResume.length && !criticality) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': `CRITICIDAD incorrecto: ${criticalityResume[0]}` });
    if (productOwnerResume.length && !productOwner) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': `PO incorrecto: ${productOwnerResume[0]}` });

    if (application) response.push({ 'group': 'Resume', 'type': 'Ok', 'comment': `APP correcto: ${application[0]}` });
    if (agilTicket) response.push({ 'group': 'Resume', 'type': 'Ok', 'comment': `TA correcto: ${agilTicket[0]}` });
    if (criticality) response.push({ 'group': 'Resume', 'type': 'Ok', 'comment': `CRITICIDAD correcto: ${criticality[0]}` });
    if (productOwner) response.push({ 'group': 'Resume', 'type': 'Ok', 'comment': `PO correcto: ${productOwner[0]}` });

    return {
        'applicative': application ? application[application.length - 1] : null,
        'agilTicket': agilTicket ? agilTicket[agilTicket.length - 1] : null,
        'validations': response
    };
}

function validateTemplate() {
    var validateTemplate = document.querySelectorAll('.ardbnz1D_Template_Name > textarea')[0].value === 'SOLICITUD CONGELAMIENTO PREPARACION AMBIENTE Y PASE A PRODUCCION - LEGACY';

    if (!validateTemplate) return { 'group': 'Template', 'type': 'Error', 'comment': 'Plantilla incorrecta, debe usar "SOLICITUD CONGELAMIENTO PREPARACION AMBIENTE Y PASE A PRODUCCION - LEGACY"' }

    return { 'group': 'Template', 'type': 'Ok', 'comment': 'Plantilla utilizada correcta.' }
}

/** END REGION: VALIDATORS */

/** REGION: VALIDATOR BCP LEGACY */

async function validate(token) {
    var validations = [];
    var resume = document.querySelectorAll('.ardbnDescription > textarea')[0].value.split('\n').map(row => row.replace(/\s+/g, ' ').trim().removeAccents().toUpperCase());
    var notes = document.querySelectorAll('.ardbnDetailedDescription  > textarea')[0].value.split('\n').map(row => row.replace(/\s+/g, ' ').trim().removeAccents().toUpperCase());
    //resumeValid.applicative
    validations.push(validateTemplate());

    var resumeValid = validateResume(resume);
    validations = validations.concat(resumeValid.validations);

    validations = validations.concat(validateRequestType(notes));
    validations = validations.concat(validateDateRequest(notes));
    validations.push(validateVoB(notes, 'PELKDVI'));
    validations = validations.concat(validateCordinator(notes));
    validations = validations.concat(validateDiagramns(notes));
    validations = validations.concat(validateContact(notes));
    validations = validations.concat(await validateLastCommitId(notes, token, resumeValid.agilTicket));

    return validations;
}

/** END REGION: VALIDATOR BCP LEGACY */

/** REGION: UI VALIDATOR */

function renderCSS() {
    var head = document.head || document.getElementsByTagName("head")[0];
    var style = document.createElement("style");

    style.id = "extension";
    style.textContent = `
        .containner-checker {
        background-color:#fff!important;
        border-radius:5px 5px 0 0!important;
        padding:5px!important;
        box-shadow:rgba(6,24,44,0.4) 0 0 0 2px,rgba(6,24,44,0.65) 0 4px 6px -1px,rgba(255,255,255,0.08) 0 1px 0 inset!important;
        width:500px!important;
        height:200px!important;
        position:fixed!important;
        bottom:0!important;
        right:0!important;
        z-index:1000000000!important;
        margin-right:5px!important;
        overflow-y:scroll!important;
        scrollbar-width:thin!important;
        scrollbar-color:#90A4AE #CFD8DC!important;
        transition:all .5s ease-out!important;
        }
        
        .containner-checker::-webkit-scrollbar {
        width:10px!important;
        border-radius:50%!important;
        }
        
        .containner-checker::-webkit-scrollbar-track {
        background:#CFD8DC!important;
        }
        
        .containner-checker::-webkit-scrollbar-thumb {
        background-color:#1c6589!important;
        border-radius:10px!important;
        border:3px solid #CFD8DC!important;
        }
        
        .buttons-checker {
        position:fixed!important;
        right:0!important;
        margin-right:10px!important;
        margin-top:-32px!important;
        }
        
        .btn-close,.btn-minify {
        border:none!important;
        outline:none!important;
        cursor:pointer!important;
        font-weight:700!important;
        color:#fff!important;
        box-shadow:rgba(0,0,0,0.24) 0 3px 8px!important;
        padding-bottom:3px!important;
        box-sizing:border-box!important;
        width:26px!important;
        height:21px!important;
        }
        
        .btn-close {
        background-color:red!important;
        }
        
        .btn-minify {
        background-color:#1e6ddd!important;
        }
        
        .forms-checker {
        display:flex!important;
        justify-content:space-around!important;
        padding-top:5px!important;
        }
        
        .forms-checker .token-checker {
        width:75%!important;
        box-sizing:border-box!important;
        padding:3px!important;
        }
        
        .forms-checker .btn-checker, .forms-checker .btn-cleaner {
        background-color:#13aa52!important;
        border:1px solid #13aa52!important;
        border-radius:4px!important;
        box-shadow:rgba(0,0,0,.1) 0 2px 4px 0!important;
        box-sizing:border-box!important;
        color:#fff!important;
        cursor:pointer!important;
        font-size:12px!important;
        font-weight:400!important;
        outline:none!important;
        outline:0!important;
        text-align:center!important;
        transform:translateY(0)!important;
        transition:transform 150ms,box-shadow 150ms!important;
        user-select:none!important;
        -webkit-user-select:none!important;
        touch-action:manipulation!important;
        padding: 1px 6px !important;
        }

        .forms-checker .btn-cleaner {
            background-color:rgba(255, 140, 0, 1) !important;
            border-color:rgba(255, 110, 0, 1) !important;
        }
        
        .forms-checker .btn-checker:hover,.btn-close:hover,.btn-minify:hover,.btn-cleaner:hover {
        box-shadow:rgba(0,0,0,.15) 0 3px 9px 0!important;
        transform:translateY(-2px)!important;
        }
        
        #error-checkers {
        color:red!important;
        display:flex!important;
        font-size:12px!important;
        padding:5px 8px!important;
        }
        
        .banner-checker {
        display:inline-block!important;
        font-family: monospace !important;
        color:#fff!important;
        background-color: #3d77ff !important;
        border-radius: 5px !important;
        padding: 4px !important;
        vertical-align: bottom;
        border: 1px solid rgba(0,0,0,0.5);
        font-weight: bold;
        text-shadow: 0px 0px 1px rgba(81,67,21,0.8);
        letter-spacing: 1px;
        }
        .checker-autor {
            letter-spacing: 5px;
        }
        
        .checker-table {
        border-collapse:collapse!important;
        margin:25px 0!important;
        font-size:.8em!important;
        font-family:sans-serif!important;
        min-width:100%!important;
        box-shadow:0 0 20px rgba(0,0,0,0.15)!important;
        margin:0!important;
        }
        
        .checker-table thead tr {
        background-color:#3d77ff!important;
        color:#fff!important;
        text-align:center!important;
        }
        
        .checker-table th,.checker-table td {
        padding:4px!important;
        }
        
        .checker-table tbody tr {
        border-bottom:1px solid #ddd!important;
        }
        
        .checker-table tbody tr:nth-of-type(even) {
        background-color:#f3f3f3!important;
        }
        
        .checker-table tbody tr:last-of-type {
        border-bottom:2px solid #3d77ff!important;
        }
        
        .checker-table tbody tr.active-row {
        font-weight:700!important;
        color:#009879!important;
        }
        
        .btn-minify,.btn-close,.btn-checker,.forms-checker,.forms-checker .token-checker,.forms-checker .btn-checker,.forms-checker .btn-cleaner,.banner-checker,#error-checkers,.checker-table {
        position:relative!important;
        z-index:1000000000!important;
        }

        .checker-td-error{
            color: red !important;
            font-weight: bold !important;
        }
        .checker-td-warn{
            color: #ab8e1a !important;
            font-weight: bold !important;
        }
        .checker-td-success{
            color: green !important;
            font-weight: bold !important;
        }
        .checker-td-bold {
            font-weight: bold !important;
            color:#3d77ff!important;
        }
        .checker-td-text {
            word-wrap: break-word !important;
        }
        .checker-td-commend {
            width: 350px !important;
            max-width: 350px !important;
        }
        .checker-td-group, .checker-td-type {
            vertical-align: middle !important;
        }
        .checker-td-type { 
            text-align: center !important;
        }
    `;

    head.appendChild(style);
}

function renderHTML() {
    var body = document.body || document.getElementsByTagName("body")[0];
    var content = document.createElement('div');

    content.id = 'general-checker';
    content.innerHTML = `
      <div class="containner-checker" id="containner-checker">
  
        <div class="buttons-checker">
            <span class="banner-checker">LEGACY CHECKER | <span class="checker-autor">MINSAIT</span></span>
            <button id="btn-minify" class="btn-minify">&#128469;</button>
            <button id="btn-close" class="btn-close">&#x2715;</button>
        </div>
        <div class="forms-checker">
            <input type="text" class="token-checker" id="token-checker" placeholder="Ingresa tu token de bitbucket">
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

function renderEvents() {
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
    
    document.getElementById('btn-cleaner').addEventListener('click', function () {
        var table = document.querySelector('#checker-table tbody');
        table.innerHTML = `<tr>
            <td colspan="3"></td>
        </tr>`;
    });

    document.getElementById('btn-checker').addEventListener('click', async function (event) {
        var token = document.getElementById('token-checker').value;

        if (!token) {

            var storageToken = localStorage.getItem('chekcert-token-bitbucket');

            if (!storageToken) document.getElementById('error-checkers').innerHTML = "OJO: No se ingreso un toker para bitbutcket!"
            else token = localStorage.getItem('chekcert-token-bitbucket')
        }

        localStorage.setItem('chekcert-token-bitbucket', token);
        var table = document.querySelector('#checker-table tbody');
        table.innerHTML = `<tr>
            <td colspan="3" style="text-align: center !important" class="checker-td-bold">Analizando...</td>
        </tr>`;

        try {
            var data = await validate(token);
            var contentStr = '';

            data.forEach(element => {
                contentStr += `<tr>
                    <td class='checker-td-bold checker-td-group'>${element.group}</td>
                    <td class='checker-td-text checker-td-commend'>${element.comment}</td>
                    <td class='${element.type === 'Error' ? 'checker-td-error' : element.type === 'Warning' ? 'checker-td-warn' : 'checker-td-success'} checker-td-type'>${element.type}</td>
                </tr>`;
            });

            table.innerHTML = contentStr;
        }
        catch(error)
        {
            table.innerHTML = `<tr>
                <td colspan="3"></td>
            </tr>`;
            document.getElementById('error-checkers').innerHTML = "ERR: No se pudo identificar los campos de entrada, asegurese estar en la vista de un RLM.";
            console.dir(error);
        }

    });
}        

/** END REGION: UI VALIDATOR */

function launchUI() {
    if (document.getElementById('general-checker')) {
        alert('Ya se desplego validador!');

        return false;
    }

    renderCSS();
    renderHTML();

    window.requestAnimationFrame(function () {
        var storageToken = localStorage.getItem('chekcert-token-bitbucket');
        var token = document.getElementById('token-checker')

        token.value = storageToken;

        renderEvents();
    });
}

(function () {
    launchUI();    
})();
