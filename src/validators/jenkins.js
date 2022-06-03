function validateJenkinsPipelines (rows) {
    const validationPipeline = rows.filter(row => row.indexOf('HTTPS://JENKINS.LIMA.BCP.COM.PE/VIEW/INCT/JOB/INCT-DEV/JOB/MAINFRAME/JOB/INCT_DEVOPS_FPH_CERT_VALIDACION/') !== -1);
    const pipelineCertification = rows.filter(row => row.indexOf('RUTA JENKINS CERT') !== -1);
    const pipelineProduction = rows.filter(row => row.indexOf('RUTA JENKINS PROD') !== -1);

    const responses = [];

    if (!validationPipeline.length) responses.push({ 'group': 'Notes', 'type': 'Warning', 'comment': 'No se pudo identificar "PIPELINE JENKINS DE VALIDACIÓN"' });
    if (!pipelineCertification.length) responses.push({ 'group': 'Resume', 'type': 'Warning', 'comment': 'No se pudo identificar "Pipeline FPH Certificación"' });
    if (!pipelineProduction.length) responses.push({ 'group': 'Resume', 'type': 'Warning', 'comment': 'No se pudo identificar "Pipeline FPH Producción"' });

    if (validationPipeline.length) responses.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Pipeline Jenkins de validación correcto: ${validationPipeline[validationPipeline.length - 1]}` });
    if (pipelineCertification) responses.push({ 'group': 'Resume', 'type': 'Ok', 'comment': `Pipeline FPH Certificación correcto: ${pipelineCertification[pipelineCertification.length - 1]}` });
    if (pipelineProduction) responses.push({ 'group': 'Resume', 'type': 'Ok', 'comment': `Pipeline FPH Producción correcto: ${pipelineProduction[pipelineProduction.length - 1]}` });

    return responses;
}