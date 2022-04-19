const validateRequestType = (rows) => {
    const requestType = rows.filter(row => row.indexOf('TIPO DE SOLICITUD') !== -1);

    if (!requestType.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "TIPO DE SOLICITUD"' }];

    const identify = requestType[0].match(/^-(\s?)TIPO DE SOLICITUD:(\s?)((PASE A PRODUCCION(\s?)(FASEADO)?)|(CONGELAMIENTO)|(ADELANTO DE FORMATO(S?)))/gm);

    if (!identify) return [{ 'group': 'Notes', 'type': 'Error', 'comment': `Tipo de solicitud incorrecta: [${requestType[0]}]` }];

    const response = [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Tipo de solicitud correcta: [${identify}]` }];
    validationType = identify[0].split(':')[1];

    const hito = document.querySelectorAll('.ardbnz1DMilestone > textarea')[0].value.removeAccents().toUpperCase();
    const targetDate = document.querySelectorAll('.ardbnTargetDate > input')[0].value.removeAccents().toUpperCase();

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