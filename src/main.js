
/** REGION: UTILITARIOS */

String.prototype.removeAccents = function() {
    const accentsMap = new Map([
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

    const reducer = (acc, [key]) => acc.replace(new RegExp(accentsMap.get(key), "g"), key);;

    return [...accentsMap].reduce(reducer, this.valueOf());
}

/** END REGION: FIN UTILITARIOS */

/** REGION: VALIDATORS */

function validateRequestType (rows) {
    const requestType = rows.filter(row => row.indexOf('TIPO DE SOLICITUD') !== -1);

    if (!requestType.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "TIPO DE SOLICITUD"' }];

    const identify = requestType[0].match(/^-(\s?)TIPO DE SOLICITUD:(\s?)((PASE A PRODUCCION(\s?)(FASEADO)?)|(CONGELAMIENTO)|(ADELANTO DE FORMATO(S?)))/gm);

    if (!identify) return [{ 'group': 'Notes', 'type': 'Error', 'comment': `Tipo de solicitud incorrecta: [${requestType[0]}]` }];

    const response = [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Tipo de solicitud correcta: [${identify}]` }];
    validationType = identify[0].split(':')[1];

    const hito = document.querySelectorAll('.ardbnz1DMilestone > textarea')[0].value.removeAccents().toUpperCase();
    const targetDate = document.querySelectorAll('.ardbnTargetDate > input')[0].value.removeAccents().toUpperCase();

    if ((validationType.indexOf('CONGELAMIENTO') !== -1 || validationType.indexOf('FORMATO') !== -1) && hito != 'PRUEBA') {
        response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `La solicitud ${validationType} esta en el hito ${hito}, debería estar en PRUEBA.]` });
    }
    else if (validationType.indexOf('PASE A PRODUCCION') !== -1 && hito != 'APLICACION') {
        response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `La solicitud ${validationType} esta en el hito ${hito}, debería estar en APLICACION.]` });
    }
    else if (validationType.indexOf('PASE A PRODUCCION') !== -1 && targetDate.length < 1) {
        response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `La solicitud ${validationType} debe tener el campo 'Fecha deseada' completa.` });
    }

    return response;
}

function validateDateRequest (rows) {
    const dateRequest = rows.filter(row => row.indexOf('FECHA DE SOLICITUD') !== -1 || row.indexOf('FECHA DE LA SOLICITUD') !== -1);

    if (!dateRequest.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "FECHA DE SOLICITUD"' }]

    const identify = dateRequest[0].match(/^(-(\s?)FECHA DE (LA)?(\s?)SOLICITUD(:)(\s?))([0-9]{2}[-?\/?][0-9]{2}[-?\/?][0-9]{4})/)

    if (!identify) return [{ 'group': 'Notes', 'type': 'Error', 'comment': `Fecha de solicitud incorrecta: [${dateRequest[0]}]` }];

    const response = [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Fecha de solicitud correcta: [${identify[0]}]` }];

    dateCatch = identify[identify.length - 1].replaceAll('-', '/').split('/');
    dateCatchFormated = new Date(+dateCatch[2], dateCatch[1] - 1, +dateCatch[0]);
    differenceFromNow = (new Date() - dateCatchFormated) / (1000 * 3600 * 24);

    if (differenceFromNow != 0) response.push({ 'group': 'Notes', 'type': 'Warning', 'comment': `Existen ${differenceFromNow} días de diferencia respecto a hoy!` })

    return response;
}

function validateVoB (rows, repository = 'PELKDVI') {
    const vOB = rows.filter(row => row.indexOf('VOB') !== -1);

    if (!vOB.length) return { 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "VOB"' }

    const regex = new RegExp(`^-(\\s?)VOB:(\\s?)${repository}`, 'gm');

    const identify = vOB[vOB.length - 1].match(regex);

    if (!identify) return { 'group': 'Notes', 'type': 'Error', 'comment': `VoB incorrecta: [${vOB[0]}]` }

    return { 'group': 'Notes', 'type': 'Ok', 'comment': `VoB correcta: [${identify}]` }
}

function validateCordinator (rows) {
    const groupOfCordinator = rows.filter(row => row.indexOf('GRUPO COORDINADOR') !== -1);
    const nameOfCordinator = rows.filter(row => row.indexOf('COORDINADOR DE LANZAMIENTOS') !== -1);

    if (!groupOfCordinator.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "GRUPO COORDINADOR"' }];
    if (!nameOfCordinator.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "COORDINADOR DE LANZAMIENTOS"' }];

    return [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Grupo coordinador correcto: ${groupOfCordinator[groupOfCordinator.length - 1]}` },
    { 'group': 'Notes', 'type': 'Ok', 'comment': `Coordinador de lanzamientos correcto: ${nameOfCordinator[nameOfCordinator.length - 1]}` }];
}

function validateDiagramns (rows) {
    const architectureUnified = rows.filter(row => row.indexOf('HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/COEDAPUB/COMPONENTES+DE+LA+ARQUITECTURA+UNIFICADA+DE+DATOS') !== -1);
    const architectureRed = rows.filter(row => row.indexOf('HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/COEDAPUB/ARQUITECTURA+DE+RED') !== -1);
    const architectureDataLake = rows.filter(row => row.indexOf('HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/COEDAPUB/TAXONOMIA+DEL+DATA+LAKE') !== -1);

    const responses = [];

    if (!architectureUnified.length) responses.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "ARQUITECTURA UNIFICADA DE DATOS"' });
    if (!architectureRed.length) responses.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "ARQUITECTURA DE RED"' });
    if (!architectureDataLake.length) responses.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "TAXONOMIA DE DATALAKE"' });

    if (architectureUnified.length) responses.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `UDA correcto: ${architectureUnified[architectureUnified.length - 1]}` });
    if (architectureRed.length) responses.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Arquitectura de red correcto: ${architectureRed[architectureRed.length - 1]}` });
    if (architectureDataLake.length) responses.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Arquitectura de LKDV correcto: ${architectureDataLake[architectureDataLake.length - 1]}` });
    
    
    return responses;
}

function validateContact (rows) {
    const nameContact = rows.filter(row => row.indexOf('NOMBRE CONTACTO PASE') !== -1);
    const phoneContact = rows.filter(row => row.indexOf('CELULAR CONTACTO PASE') !== -1);
    const response = [];

    if (!nameContact.length) response.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "NOMBRE CONTACTO PASE"' });
    if (!phoneContact.length) response.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "CELULAR CONTACTO PASE"' });

    const identifyNameContact = nameContact.length ? nameContact[0].match(/^-(\s?)NOMBRE CONTACTO PASE(:)(.*)/gm) : null;
    const identifyPhoneContact = phoneContact.length ? phoneContact[0].match(/^-(\s?)CELULAR CONTACTO PASE(:)(.*)/gm) : null;

    if (nameContact.length && !identifyNameContact) response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `Nombre contacto pase incorrecto: [${nameContact[0]}]` });
    if (phoneContact.length && !identifyPhoneContact) response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `Celular contacto pase incorrecto: [${phoneContact[0]}]` });

    if (identifyNameContact) response.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Nombre contacto pase correcta: [${identifyNameContact[0]}]` })
    if (identifyPhoneContact) response.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Celular contacto pase correcta: [${identifyPhoneContact[0]}]` })

    return response;
}

async function validateLastCommitId (rows, bitbucketToken, agilTicket) {
    const commitId = rows.filter(row => row.indexOf('COMMIT') !== -1);

    if (!commitId.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "COMMIT ID"' }];

    const identify = commitId[0].match(/^(-(\s?)(.*)COMMIT(.*)(:)(\s?))([0-9a-zA-Z]{11})/);

    if (!identify) return [{ 'group': 'Notes', 'type': 'Error', 'comment': `Commit incorrecto: [${commitId[0]}]` }];

    const response = [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Commit correcto: [${identify[0]}]` }];

    commitIdCatch = identify[identify.length - 1].toLowerCase();

    if (bitbucketToken && agilTicket) {
        try {
            var url = new Request(`http://localhost:5000/BitbucketLegacy/GetLastCommitId/${agilTicket}/${bitbucketToken}`);

            const commitResponse = await fetch(url)
            .then(result => {
                if(!result.ok) return Promise.reject(result.json())

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

    return response;
}

function validateResume (rows) {
    const applicationResume = rows.filter(row => row.indexOf('APP:') !== -1);
    const agilTicketResume = rows.filter(row => row.indexOf('TA:') !== -1);
    const criticalityResume = rows.filter(row => row.indexOf('CRITICIDAD:') !== -1);
    const productOwnerResume = rows.filter(row => row.indexOf('PO:') !== -1);
    const response = [];

    if (!applicationResume.length) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': 'No se pudo identificar "APP"' });
    if (!agilTicketResume.length) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': 'No se pudo identificar "TA"' });
    if (!criticalityResume.length) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': 'No se pudo identificar "CRITICIDAD"' });
    if (!productOwnerResume.length) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': 'No se pudo identificar "PO"' });

    const application = applicationResume.length ? applicationResume[0].match(/^APP:(\s?)(LKDV|DWI)/) : null;
    const agilTicket = agilTicketResume.length ? agilTicketResume[0].match(/^TA:(\s?)(TA[0-9]{9})$/) : null;
    const criticality = criticalityResume.length ? criticalityResume[0].match(/^CRITICIDAD:(\s?)(2)/gm) : null;
    const productOwner= productOwnerResume.length ? productOwnerResume[0].match(/^PO:(\s?)(.*)/gm) : null;

    if (applicationResume.length && !application) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': `APP incorrecto: ${applicationResume[0]}` });
    if (agilTicketResume.length && !agilTicket) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': `TA incorrecto: ${agilTicketResume[0]}` });
    if (criticalityResume.length && !criticality) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': `CRITICIDAD incorrecto: ${criticalityResume[0]}` });
    if (productOwnerResume.length && !productOwner) response.push({ 'group': 'Resume', 'type': 'Error', 'comment': `PO incorrecto: ${productOwnerResume[0]}` });

    if (application) response.push({ 'group': 'Resume', 'type': 'Ok', 'comment': `APP correcto: ${application[0]}` });
    if (agilTicket) response.push({ 'group': 'Resume', 'type': 'Ok', 'comment': `TA correcto: ${agilTicket[0]}` });
    if (criticality) response.push({ 'group': 'Resume', 'type': 'Ok', 'comment': `CRITICIDAD correcto: ${criticality[0]}` });
    if (productOwner) response.push({ 'group': 'Resume', 'type': 'Ok', 'comment': `PO correcto: ${productOwner[0]}` });

    return { 'applicative': application ? application[application.length - 1] : null,
        'agilTicket': agilTicket ? agilTicket[agilTicket.length - 1] : null,
        'validations': response};
}

function validateTemplate () {
    const validateTemplate = document.querySelectorAll('.ardbnz1D_Template_Name > textarea')[0].value ===  'SOLICITUD CONGELAMIENTO PREPARACION AMBIENTE Y PASE A PRODUCCION - LEGACY';

    if (!validateTemplate) return { 'group': 'Template', 'type': 'Error', 'comment': 'Plantilla incorrecta, debe usar "SOLICITUD CONGELAMIENTO PREPARACION AMBIENTE Y PASE A PRODUCCION - LEGACY"' }

    return { 'group': 'Template', 'type': 'Ok', 'comment': 'Plantilla utilizada correcta."' }
}

/** END REGION: VALIDATORS */


async function validate (token) {
    const validations = [];
    const resume = document.querySelectorAll('.ardbnDescription > textarea')[0].value.split('\n').map(row => row.replace(/\s+/g, ' ').trim().removeAccents().toUpperCase());
    const notes = document.querySelectorAll('.ardbnDetailedDescription  > textarea')[0].value.split('\n').map(row => row.replace(/\s+/g, ' ').trim().removeAccents().toUpperCase());
    //resumeValid.applicative
    validations.push(validateTemplate());
    
    const resumeValid = validateResume(resume);
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
