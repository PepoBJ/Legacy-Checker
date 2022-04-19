const validateLastCommitId = async (rows, project, repository, agilTicket) => {
    const commitId = rows.filter(row => row.indexOf('COMMIT') !== -1);

    if (!commitId.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "COMMIT ID"' }];

    const identify = commitId[0].match(/^(-(\s?)(.*)COMMIT(.*)(:)(\s?))([0-9a-zA-Z]{11})/);

    if (!identify) return [{ 'group': 'Notes', 'type': 'Error', 'comment': `Commit incorrecto: [${commitId[0]}]` }];

    const response = [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Commit correcto: [${identify[0]}]` }];

    commitIdCatch = identify[identify.length - 1].toLowerCase();

    if (project && repository && agilTicket) {
        try {
            const url = new Request(`http://localhost:5000/BitbucketLegacy/LastCommit/${project}/${repository}/develop%2F${agilTicket}`);

            const commitResponse = await fetch(url)
                .then(result => {
                    if (!result.ok) return Promise.reject(result.json())

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
    else {
        response.push({ 'group': 'Notes', 'type': 'Warning', 'comment': `No se pudo verificar último commit id en bitbucket, asegurese de ingresar un toker correcto y tener prendido el servicio.` });
    }

    return response;
}