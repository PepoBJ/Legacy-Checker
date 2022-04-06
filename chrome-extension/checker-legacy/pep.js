function validateRequestType(e){const t=e.filter((e=>-1!==e.indexOf("TIPO DE SOLICITUD")));if(!t.length)return[{group:"Notes",type:"Error",comment:'No se pudo identificar "TIPO DE SOLICITUD"'}];const o=t[0].match(/^-(\s?)TIPO DE SOLICITUD:(\s?)((PASE A PRODUCCION(\s?)(FASEADO)?)|(CONGELAMIENTO)|(ADELANTO DE FORMATO(S?)))/gm);if(!o)return[{group:"Notes",type:"Error",comment:`Tipo de solicitud incorrecta: [${t[0]}]`}];const r=[{group:"Notes",type:"Ok",comment:`Tipo de solicitud correcta: [${o}]`}];validationType=o[0].split(":")[1];const n=document.querySelectorAll(".ardbnz1DMilestone > textarea")[0].value.removeAccents().toUpperCase(),c=document.querySelectorAll(".ardbnTargetDate > input")[0].value.removeAccents().toUpperCase();return-1===validationType.indexOf("CONGELAMIENTO")&&-1===validationType.indexOf("FORMATO")||"PRUEBA"==n?-1!==validationType.indexOf("PASE A PRODUCCION")&&"APLICACION"!=n?r.push({group:"Notes",type:"Error",comment:`La solicitud ${validationType} esta en el hito ${n}, debería estar en APLICACION.]`}):-1!==validationType.indexOf("PASE A PRODUCCION")&&c.length<1&&r.push({group:"Notes",type:"Error",comment:`La solicitud ${validationType} debe tener el campo 'Fecha deseada' completa.`}):r.push({group:"Notes",type:"Error",comment:`La solicitud ${validationType} esta en el hito ${n}, debería estar en PRUEBA.]`}),r}function validateDateRequest(e){const t=e.filter((e=>-1!==e.indexOf("FECHA DE SOLICITUD")||-1!==e.indexOf("FECHA DE LA SOLICITUD")));if(!t.length)return[{group:"Notes",type:"Error",comment:'No se pudo identificar "FECHA DE SOLICITUD"'}];const o=t[0].match(/^(-(\s?)FECHA DE (LA)?(\s?)SOLICITUD(:)(\s?))([0-9]{2}[-?\/?][0-9]{2}[-?\/?][0-9]{4})/);if(!o)return[{group:"Notes",type:"Error",comment:`Fecha de solicitud incorrecta: [${t[0]}]`}];const r=[{group:"Notes",type:"Ok",comment:`Fecha de solicitud correcta: [${o[0]}]`}];return dateCatch=o[o.length-1].replaceAll("-","/").split("/"),dateCatchFormated=new Date(+dateCatch[2],dateCatch[1]-1,+dateCatch[0]),differenceFromNow=(new Date-dateCatchFormated)/864e5,0!=differenceFromNow&&r.push({group:"Notes",type:"Warning",comment:`Existen ${differenceFromNow} días de diferencia respecto a hoy!`}),r}function validateVoB(e,t="PELKDVI"){const o=e.filter((e=>-1!==e.indexOf("VOB")));if(!o.length)return{group:"Notes",type:"Error",comment:'No se pudo identificar "VOB"'};const r=new RegExp(`^-(\\s?)VOB:(\\s?)${t}`,"gm"),n=o[o.length-1].match(r);return n?{group:"Notes",type:"Ok",comment:`VoB correcta: [${n}]`}:{group:"Notes",type:"Error",comment:`VoB incorrecta: [${o[0]}]`}}function validateCordinator(e){const t=e.filter((e=>-1!==e.indexOf("GRUPO COORDINADOR"))),o=e.filter((e=>-1!==e.indexOf("COORDINADOR DE LANZAMIENTOS")));return t.length?o.length?[{group:"Notes",type:"Ok",comment:`Grupo coordinador correcto: ${t[t.length-1]}`},{group:"Notes",type:"Ok",comment:`Coordinador de lanzamientos correcto: ${o[o.length-1]}`}]:[{group:"Notes",type:"Error",comment:'No se pudo identificar "COORDINADOR DE LANZAMIENTOS"'}]:[{group:"Notes",type:"Error",comment:'No se pudo identificar "GRUPO COORDINADOR"'}]}function validateDiagramns(e){const t=e.filter((e=>-1!==e.indexOf("HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/COEDAPUB/COMPONENTES+DE+LA+ARQUITECTURA+UNIFICADA+DE+DATOS"))),o=e.filter((e=>-1!==e.indexOf("HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/COEDAPUB/ARQUITECTURA+DE+RED"))),r=e.filter((e=>-1!==e.indexOf("HTTPS://CONFLUENCE.LIMA.BCP.COM.PE/DISPLAY/COEDAPUB/TAXONOMIA+DEL+DATA+LAKE"))),n=[];return t.length||n.push({group:"Notes",type:"Error",comment:'No se pudo identificar "ARQUITECTURA UNIFICADA DE DATOS"'}),o.length||n.push({group:"Notes",type:"Error",comment:'No se pudo identificar "ARQUITECTURA DE RED"'}),r.length||n.push({group:"Notes",type:"Error",comment:'No se pudo identificar "TAXONOMIA DE DATALAKE"'}),t.length&&n.push({group:"Notes",type:"Ok",comment:`UDA correcto: ${t[t.length-1]}`}),o.length&&n.push({group:"Notes",type:"Ok",comment:`Arquitectura de red correcto: ${o[o.length-1]}`}),r.length&&n.push({group:"Notes",type:"Ok",comment:`Arquitectura de LKDV correcto: ${r[r.length-1]}`}),n}function validateContact(e){const t=e.filter((e=>-1!==e.indexOf("NOMBRE CONTACTO PASE"))),o=e.filter((e=>-1!==e.indexOf("CELULAR CONTACTO PASE"))),r=[];t.length||r.push({group:"Notes",type:"Error",comment:'No se pudo identificar "NOMBRE CONTACTO PASE"'}),o.length||r.push({group:"Notes",type:"Error",comment:'No se pudo identificar "CELULAR CONTACTO PASE"'});const n=t.length?t[0].match(/^-(\s?)NOMBRE CONTACTO PASE(:)(.*)/gm):null,c=o.length?o[0].match(/^-(\s?)CELULAR CONTACTO PASE(:)(.*)/gm):null;return t.length&&!n&&r.push({group:"Notes",type:"Error",comment:`Nombre contacto pase incorrecto: [${t[0]}]`}),o.length&&!c&&r.push({group:"Notes",type:"Error",comment:`Celular contacto pase incorrecto: [${o[0]}]`}),n&&r.push({group:"Notes",type:"Ok",comment:`Nombre contacto pase correcta: [${n[0]}]`}),c&&r.push({group:"Notes",type:"Ok",comment:`Celular contacto pase correcta: [${c[0]}]`}),r}async function validateLastCommitId(e,t,o){const r=e.filter((e=>-1!==e.indexOf("COMMIT")));if(!r.length)return[{group:"Notes",type:"Error",comment:'No se pudo identificar "COMMIT ID"'}];const n=r[0].match(/^(-(\s?)(.*)COMMIT(.*)(:)(\s?))([0-9a-zA-Z]{11})/);if(!n)return[{group:"Notes",type:"Error",comment:`Commit incorrecto: [${r[0]}]`}];const c=[{group:"Notes",type:"Ok",comment:`Commit correcto: [${n[0]}]`}];if(commitIdCatch=n[n.length-1].toLowerCase(),t&&o)try{var i=new Request(`http://localhost:5000/BitbucketLegacy/GetLastCommitId/${o}/${t}`);const e=await fetch(i).then((e=>e.ok?e.json():Promise.reject(e.json()))).then((e=>e.values[0].displayId)).catch((e=>{e.then((e=>c.push({group:"Notes",type:"Error",comment:`No se pudo verificar último commit id en bitbucket: [${e.message}]`})))}));e&&commitIdCatch.toLowerCase()!=e&&c.push({group:"Notes",type:"Error",comment:`El commit id no coincide con lo obtenido de bitbucket: RLM:[${commitIdCatch.toLowerCase()}] - BB[${e}]`}),e&&c.push({group:"Notes",type:"Ok",comment:`El commit id coincide con lo obtenido de bitbucket: RLM:[${commitIdCatch.toLowerCase()}] - BB[${e}]`})}catch(e){c.push({group:"Notes",type:"Error",comment:`No se pudo verificar último commit id en bitbucket: [${commitIdCatch.toLowerCase()}]`}),console.error(e)}return c}function validateResume(e){const t=e.filter((e=>-1!==e.indexOf("APP:"))),o=e.filter((e=>-1!==e.indexOf("TA:"))),r=e.filter((e=>-1!==e.indexOf("CRITICIDAD:"))),n=e.filter((e=>-1!==e.indexOf("PO:"))),c=[];t.length||c.push({group:"Resume",type:"Error",comment:'No se pudo identificar "APP"'}),o.length||c.push({group:"Resume",type:"Error",comment:'No se pudo identificar "TA"'}),r.length||c.push({group:"Resume",type:"Error",comment:'No se pudo identificar "CRITICIDAD"'}),n.length||c.push({group:"Resume",type:"Error",comment:'No se pudo identificar "PO"'});const i=t.length?t[0].match(/^APP:(\s?)(LKDV|DWI)/):null,a=o.length?o[0].match(/^TA:(\s?)(TA[0-9]{9})$/):null,s=r.length?r[0].match(/^CRITICIDAD:(\s?)(2)/gm):null,p=n.length?n[0].match(/^PO:(\s?)(.*)/gm):null;return t.length&&!i&&c.push({group:"Resume",type:"Error",comment:`APP incorrecto: ${t[0]}`}),o.length&&!a&&c.push({group:"Resume",type:"Error",comment:`TA incorrecto: ${o[0]}`}),r.length&&!s&&c.push({group:"Resume",type:"Error",comment:`CRITICIDAD incorrecto: ${r[0]}`}),n.length&&!p&&c.push({group:"Resume",type:"Error",comment:`PO incorrecto: ${n[0]}`}),i&&c.push({group:"Resume",type:"Ok",comment:`APP correcto: ${i[0]}`}),a&&c.push({group:"Resume",type:"Ok",comment:`TA correcto: ${a[0]}`}),s&&c.push({group:"Resume",type:"Ok",comment:`CRITICIDAD correcto: ${s[0]}`}),p&&c.push({group:"Resume",type:"Ok",comment:`PO correcto: ${p[0]}`}),{applicative:i?i[i.length-1]:null,agilTicket:a?a[a.length-1]:null,validations:c}}function validateTemplate(){return"SOLICITUD CONGELAMIENTO PREPARACION AMBIENTE Y PASE A PRODUCCION - LEGACY"===document.querySelectorAll(".ardbnz1D_Template_Name > textarea")[0].value?{group:"Template",type:"Ok",comment:'Plantilla utilizada correcta."'}:{group:"Template",type:"Error",comment:'Plantilla incorrecta, debe usar "SOLICITUD CONGELAMIENTO PREPARACION AMBIENTE Y PASE A PRODUCCION - LEGACY"'}}async function validate(e){const t=[],o=document.querySelectorAll(".ardbnDescription > textarea")[0].value.split("\n").map((e=>e.replace(/\s+/g," ").trim().removeAccents().toUpperCase())),r=document.querySelectorAll(".ardbnDetailedDescription  > textarea")[0].value.split("\n").map((e=>e.replace(/\s+/g," ").trim().removeAccents().toUpperCase()));t.push(validateTemplate());const n=validateResume(o);return t=t.concat(n.validations),t=t.concat(validateRequestType(r)),t=t.concat(validateDateRequest(r)),t.push(validateVoB(r,"PELKDVI")),t=t.concat(validateCordinator(r)),t=t.concat(validateDiagramns(r)),t=t.concat(validateContact(r)),t=t.concat(await validateLastCommitId(r,e,n.agilTicket)),t}String.prototype.removeAccents=function(){const e=new Map([["A","Á|À|Ã|Â|Ä"],["a","á|à|ã|â|ä"],["E","É|È|Ê|Ë"],["e","é|è|ê|ë"],["I","Í|Ì|Î|Ï"],["i","í|ì|î|ï"],["O","Ó|Ò|Ô|Õ|Ö"],["o","ó|ò|ô|õ|ö"],["U","Ú|Ù|Û|Ü"],["u","ú|ù|û|ü"],["C","Ç"],["c","ç"],["N","Ñ"],["n","ñ"]]);return[...e].reduce(((t,[o])=>t.replace(new RegExp(e.get(o),"g"),o)),this.valueOf())};
//# sourceMappingURL=main.js.map