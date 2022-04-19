const validateTemplate = () => {
    const validateTemplate = document.querySelectorAll('.ardbnz1D_Template_Name > textarea')[0].value === 'SOLICITUD CONGELAMIENTO PREPARACION AMBIENTE Y PASE A PRODUCCION - LEGACY';

    if (!validateTemplate) return { 'group': 'Template', 'type': 'Error', 'comment': 'Plantilla incorrecta, debe usar "SOLICITUD CONGELAMIENTO PREPARACION AMBIENTE Y PASE A PRODUCCION - LEGACY"' }

    return { 'group': 'Template', 'type': 'Ok', 'comment': 'Plantilla utilizada correcta.' }
}