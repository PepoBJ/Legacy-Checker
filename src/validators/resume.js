const validateResume = (rows) => {
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
    const productOwner = productOwnerResume.length ? productOwnerResume[0].match(/^PO:(\s?)(.*)/gm) : null;

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