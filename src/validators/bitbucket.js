HOST_BCP_SERVER = 'http://localhost:5555';

async function validateLastCommitId (rows, project, repository, agilTicket) {
    const commitId = rows.filter(row => row.indexOf('COMMIT') !== -1);

    if (!commitId.length) return [{ 'group': 'Notes', 'type': 'Error', 'comment': 'No se pudo identificar "COMMIT ID"' }];

    const identify = commitId[0].match(/^(-(\s?)(.*)COMMIT(.*)(:)(\s?))([0-9a-zA-Z]{11})/);

    if (!identify) return [{ 'group': 'Notes', 'type': 'Error', 'comment': `Commit incorrecto: [${commitId[0]}]` }];

    const response = [{ 'group': 'Notes', 'type': 'Ok', 'comment': `Commit correcto: [${identify[0]}]` }];

    commitIdCatch = identify[identify.length - 1].toLowerCase();

    if (project && repository && agilTicket) {
        try {
            const url = new Request(`${HOST_BCP_SERVER}/BitbucketLegacy/LastCommit/${project}/${repository}/develop%2F${agilTicket}`);

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
        response.push({ 'group': 'Notes', 'type': 'Warning', 'comment': `No se pudo verificar último commit id en bitbucket, asegurese de ingresar un token correcto y tener prendido el servicio.` });
    }

    return response;
}

async function validateDevelopBranchOrigin(project, repository, agilTicket) {
    const response = [];

    if (project && repository && agilTicket) {
        try {
            const urlDevelop = new Request(`${HOST_BCP_SERVER}/BitbucketLegacy/LastCommit/${project}/${repository}/develop%2F${agilTicket}/50`);
            const urlFeature = new Request(`${HOST_BCP_SERVER}/BitbucketLegacy/LastCommit/${project}/${repository}/feature%2F${agilTicket}/50`);
            const commitIdBaseline = '8c7b2c1a475';

            const commitsDevelop = await fetch(urlDevelop)
                .then(result => {
                    if (!result.ok) return Promise.reject(result.json())

                    return result.json();
                })
                .then(data => data.values)
                .catch(error => {
                    error.then(errorResponse => response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se pudo verificar la rama develop/${agilTicket}: [${errorResponse.message}]` }))
                });

            const commitsFeature = await fetch(urlFeature)
                .then(result => {
                    if (!result.ok) return Promise.reject(result.json())

                    return result.json();
                })
                .then(data => data.values)
                .catch(error => {
                    error.then(errorResponse => response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se pudo verificar la rama feature/${agilTicket}: [${errorResponse.message}]` }))
                });

            if (commitsDevelop && commitsDevelop.length > 0 && commitsDevelop[commitsDevelop.length - 1].displayId !== commitIdBaseline) {
                response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `La rama develop/${agilTicket} no fue creada a partir de la rama baseline [Commit id origen ${commitsDevelop[commitsDevelop.length - 1].displayId}]` });
            }

            if (commitsFeature && commitsFeature.length > 0 && commitsFeature[commitsFeature.length - 1].displayId !== commitIdBaseline) {
                response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `La rama feature/${agilTicket} no fue creada a partir de la rama develop/${agilTicket} [Commit id origen ${commitsFeature[commitsFeature.length - 1].displayId}]` });
            }

            if (commitsDevelop && commitsDevelop.length > 1 && commitsFeature && commitsFeature.length > 0 && commitsDevelop[1].displayId !== commitsFeature[0].displayId) {
                response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `La rama feature/${agilTicket} tiene cambios que no fueron fusionados en la rama develop/${agilTicket}. [Develop> commitsDevelop[1].displayId | Feature> commitsFeature[0].displayId]` });
            }

            if (response.filter(item => item.type === 'Error').length === 0 && commitsDevelop) response.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `La rama develop/${agilTicket} fue creada correctamente.` });
            if (response.filter(item => item.type === 'Error').length === 0 && commitsFeature) response.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `La rama feature/${agilTicket} fue creada correctamente.` });
        }
        catch (error) {

            response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se pudo validar creación de ramas en bitbucket: [${agilTicket}]` });

            console.error(error);
        }

    }
    else {
        response.push({ 'group': 'Notes', 'type': 'Warning', 'comment': `No se pudo verificar ramas en bitbucket, asegurese de ingresar un token correcto y tener prendido el servicio.` });
    }

    return response;
}


async function validateBranches(project, repository, agilTicket) {
    const response = [];

    if (project && repository && agilTicket) {
        try {
            const url = new Request(`${HOST_BCP_SERVER}/BitbucketLegacy/Branches/${project}/${repository}/${agilTicket}`);

            const branchesResponse = await fetch(url)
                .then(result => {
                    if (!result.ok) return Promise.reject(result.json())

                    return result.json();
                })
                .then(data => data.values)
                .catch(error => {
                    error.then(errorResponse => response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se pudo verificar las ramas creadas para el ${agilTicket}: [${errorResponse.message}]` }))
                });

            const branchNames = branchesResponse.map(branch => branch.displayId);
            const developBranches = branchNames.filter(branch => branch.indexOf("develop") !== -1);
            const featureBranches = branchNames.filter(branch => branch.indexOf("feature") !== -1);

            if (branchNames && developBranches.length > 1) {
                response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `Se encontraron más de 1 rama develop para el ${agilTicket} [${developBranches.join('|')}]` });
            }

            if (branchNames && featureBranches.length > 1) {
                response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `Se encontraron más de 1 rama feature para el ${agilTicket} [${featureBranches.join('|')}]` });
            }

            if (!developBranches.length) response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se encontró ninguna rama develop para ${agilTicket}.` });
            if (!featureBranches.length) response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se encontró ninguna rama feature para ${agilTicket}.` });

            if (developBranches.length === 1) response.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Se tiene solo una rama develop para ${agilTicket} [${developBranches.join('|')}].` });
            if (featureBranches.length === 1) response.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Se tiene solo una rama feature para ${agilTicket} [${featureBranches.join('|')}].` });
        }
        catch (error) {

            response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se pudo verificar ramas develop/feature para ${agilTicket}` });

            console.error(error);
        }

    }
    else {
        response.push({ 'group': 'Notes', 'type': 'Warning', 'comment': `No se pudo verificar ramas develop/feature en bitbucket, asegurese de ingresar un token correcto y tener prendido el servicio.` });
    }

    return response;
}

async function validateChangePullRequest(project, repository, agilTicket) {
    const response = [];

    if (project && repository && agilTicket) {
        try {
            const urlLastPullRequest = new Request(`${HOST_BCP_SERVER}/BitbucketLegacy/LastPullRequest/${project}/${repository}/develop%2F${agilTicket}`);
            
            const lastPullRequest = await fetch(urlLastPullRequest)
                .then(result => {
                    if (!result.ok) return Promise.reject(result.json())

                    return result.json();
                })
                .then(data => data.values)
                .catch(error => {
                    error.then(errorResponse => response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se pudo verificar último PR de la rama develop/${agilTicket}: [${errorResponse.message}]` }))
                });

            if(lastPullRequest && !lastPullRequest.length) {
                response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se encontró ningun Pull Request en estado MERGED a la rama develop/${agilTicket}` });
            }

            if(lastPullRequest && lastPullRequest.length && lastPullRequest[0].fromRef.id !== `refs/heads/feature/${agilTicket}`) {
                response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `El último Pull Request en estado MERGED a la rama develop/${agilTicket} no fue desde la rama feature/${agilTicket}` });

                return response;
            }

            const pullRequestId = lastPullRequest[0].id;
            const ulrChanges = new Request(`${HOST_BCP_SERVER}/BitbucketLegacy/ChangesOfPullRequest/${project}/${repository}/${pullRequestId}`);

            const changes = await fetch(ulrChanges)
                .then(result => {
                    if (!result.ok) return Promise.reject(result.json())

                    return result.json();
                })
                .then(data => data.values)
                .catch(error => {
                    error.then(errorResponse => response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se pudo  verificar cambios del PR(${pullRequestId}) de la rama feature/${agilTicket}: [${errorResponse.message}]` }))
                });
            
            const changesNames = changes.filter(item => item.type !== 'DELETE').map(item => item.path.name);
            
            if (changesNames && changesNames.length > 2) {
                response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `Se encontraron más de 2 ficheros en el PR(${pullRequestId}) > [${changesNames.join('|')}]` });
            }

            if (changesNames && !changesNames.filter(item => item === `${project}-FDS-${agilTicket}.xml`).length) {
                response.push({ 'group': 'Notes', 'type': 'Warning', 'comment': `No se encontró FDS en los cambios asociados al último commit id. [Se busco (${project}-FDS-${agilTicket}), se encontraron (${changesNames.join('|')})]` });
            }

            if (changesNames && !changesNames.filter(item => item === `${project}-FPH-${agilTicket}.xml`).length) {
                response.push({ 'group': 'Notes', 'type': 'Warning', 'comment': `No se encontró FPH en los cambios asociados al último commit id. [Se busco (${project}-FPH-${agilTicket}), se encontraron (${changesNames.join('|')})]` });
            }

            if (response.length === 0 && changesNames) response.push({ 'group': 'Notes', 'type': 'Ok', 'comment': `Se encontraron los documentos correctos (${changesNames.join('|')}) asociados al último commit id.` });
        }
        catch (error) {

            response.push({ 'group': 'Notes', 'type': 'Error', 'comment': `No se pudo verificar los cambios del último PR de develop/${agilTicket} asociados al último commit id` });

            console.error(error);
        }

    }
    else {
        response.push({ 'group': 'Notes', 'type': 'Warning', 'comment': `No se pudo verificar los cambios en el PR en bitbucket, asegurese de ingresar un token correcto y tener prendido el servicio.` });
    }

    return response;
}