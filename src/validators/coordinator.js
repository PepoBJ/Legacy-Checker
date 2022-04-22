function validateCordinator (rows) {
    const groupOfCordinator = rows.filter(row => row.indexOf('GRUPO COORDINADOR') !== -1);
    const nameOfCordinator = rows.filter(row => row.indexOf('COORDINADOR DE LANZAMIENTOS') !== -1);

    if (!groupOfCordinator.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "GRUPO COORDINADOR"' }];
    if (!nameOfCordinator.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "COORDINADOR DE LANZAMIENTOS"' }];

    return [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Grupo coordinador correcto: ${groupOfCordinator[groupOfCordinator.length - 1]}` },
    { 'group': 'Notes', 'type': 'Ok', 'comment': `Coordinador de lanzamientos correcto: ${nameOfCordinator[nameOfCordinator.length - 1]}` }];
}