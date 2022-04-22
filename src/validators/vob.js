function validateVoB (rows, repository = 'PELKDVI') {
    const vOB = rows.filter(row => row.indexOf('VOB') !== -1);

    if (!vOB.length) return { 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "VOB"' }

    const regex = new RegExp(`^-(\\s?)VOB:(\\s?)${repository}`, 'gm');

    const identify = vOB[vOB.length - 1].match(regex);

    if (!identify) return { 'group': 'Notes', 'type': 'Error', 'comment': `VoB incorrecta: [${vOB[0]}]` }

    return { 'group': 'Notes', 'type': 'Ok', 'comment': `VoB correcta: [${identify}]` }
}