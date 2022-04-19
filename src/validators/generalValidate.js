const validate = async () => {
    const repository = 'PELKDVI';
    
    const validations = [];
    const resume = document.querySelectorAll('.ardbnDescription > textarea')[0].value.split('\n').map(row => row.replace(/\s+/g, ' ').trim().removeAccents().toUpperCase());
    const notes = document.querySelectorAll('.ardbnDetailedDescription  > textarea')[0].value.split('\n').map(row => row.replace(/\s+/g, ' ').trim().removeAccents().toUpperCase());
    //resumeValid.applicative
    validations.push(validateTemplate());

    const resumeValid = validateResume(resume);
    validations = validations.concat(resumeValid.validations);

    validations = validations.concat(validateRequestType(notes));
    validations = validations.concat(validateDateRequest(notes));
    validations.push(validateVoB(notes, repository));
    validations = validations.concat(validateCordinator(notes));
    validations = validations.concat(validateDiagramns(notes));
    validations = validations.concat(validateContact(notes));
    validations = validations.concat(await validateLastCommitId(notes, resumeValid.applicative, repository, resumeValid.agilTicket));

    return validations;
}