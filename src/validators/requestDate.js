function validateDateRequest (rows) {
    const dateRequest = rows.filter(row => row.indexOf('FECHA DE SOLICITUD') !== -1 || row.indexOf('FECHA DE LA SOLICITUD') !== -1);

    if (!dateRequest.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "FECHA DE SOLICITUD"' }]

    const identify = dateRequest[0].match(/^(-(\s?)FECHA DE (LA)?(\s?)SOLICITUD(\s?)(:)(\s?))([0-9]{2}[-?\/?][0-9]{2}[-?\/?][0-9]{4})/)

    if (!identify) return [{ 'group': 'Notes', 'type': 'Error', 'comment': `Fecha de solicitud incorrecta: [${dateRequest[0]}]` }];

    const response = [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Fecha de solicitud correcta: [${identify[0]}]` }];

    dateCatch = identify[identify.length - 1].replaceAll('-', '/').split('/');
    dateCatchFormated = new Date(+dateCatch[2], dateCatch[1] - 1, +dateCatch[0]);
    differenceFromNow = (new Date() - dateCatchFormated) / (1000 * 3600 * 24);

    if (differenceFromNow != 0) response.push({ 'group': 'Notes', 'type': 'Warning', 'comment': `Existen ${differenceFromNow.toFixed(2)} días de diferencia respecto a hoy y la fecha de solicitud!` })

    return response;
}