const validateContact = (rows) => {
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