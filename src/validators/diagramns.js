function validateDiagramns (rows) {
    const architectureUnified = rows.filter(row => row.indexOf('HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/COEDAPUB/COMPONENTES+DE+LA+ARQUITECTURA+UNIFICADA+DE+DATOS') !== -1);
    const architectureRed = rows.filter(row => row.indexOf('HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/COEDAPUB/ARQUITECTURA+DE+RED') !== -1);
    const architectureDataLake = rows.filter(row => row.indexOf('HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/COEDAPUB/TAXONOMIA+DEL+DATA+LAKE') !== -1);
    const softwareDiagram = rows.filter(row => row.indexOf('HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/TCAC/2.6+DIAGRAMA+DE+SOFTWARE') !== -1);
    const sequenceDiagram = rows.filter(row => row.indexOf('HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/TCAC/2.5+DIAGRAMA+DE+SECUENCIA') !== -1);

    const responses = [];

    if (!architectureUnified.length) responses.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "ARQUITECTURA UNIFICADA DE DATOS"' });
    if (!architectureRed.length) responses.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "ARQUITECTURA DE RED"' });
    if (!architectureDataLake.length) responses.push({ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "TAXONOMIA DE DATALAKE"' });
    if (!softwareDiagram.length) responses.push({ 'group': 'Notes', 'type': 'Warning', 'comment': 'No se pudo identificar "DIAGRAMA DE SOFTWARE"' });
    if (!sequenceDiagram.length) responses.push({ 'group': 'Notes', 'type': 'Warning', 'comment': 'No se pudo identificar "DIAGRAMA DE SECUENCIAS"' });

    if (architectureUnified.length) responses.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `UDA correcto: ${architectureUnified[architectureUnified.length - 1]}` });
    if (architectureRed.length) responses.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Arquitectura de red correcto: ${architectureRed[architectureRed.length - 1]}` });
    if (architectureDataLake.length) responses.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Arquitectura de LKDV correcto: ${architectureDataLake[architectureDataLake.length - 1]}` });
    if (softwareDiagram.length) responses.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Diagrama de software correcto: ${softwareDiagram[softwareDiagram.length - 1]}` });
    if (sequenceDiagram.length) responses.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Diagrama de secuencias correcto: ${sequenceDiagram[sequenceDiagram.length - 1]}` });


    return responses;
}