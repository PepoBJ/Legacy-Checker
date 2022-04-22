function renderEvents () {
    document.getElementById('btn-minify').addEventListener('click', (event) => {
        const element = event.target;
        const container = document.getElementById('containner-checker');

        if (container.style.height === '0px') {
            container.style.setProperty('height', "200px", "important");
            container.style.setProperty('padding', "5px", "important");
            element.innerHTML = '&#128469;'
        }
        else {
            container.style.setProperty('height', "0px", "important");
            container.style.setProperty('padding', "0px", "important");
            element.innerHTML = '&#128470;';
        }
    });

    document.getElementById('btn-close').addEventListener('click', (event) => {
        document.getElementById('general-checker').remove();
    });
    
    document.getElementById('btn-cleaner').addEventListener('click', () => {
        const table = document.querySelector('#checker-table tbody');
        table.innerHTML = `<tr>
            <td colspan="3"></td>
        </tr>`;
    });

    document.getElementById('btn-checker').addEventListener('click', async (event) => {
        const table = document.querySelector('#checker-table tbody');
        table.innerHTML = `<tr>
            <td colspan="3" style="text-align: center !important" class="checker-td-bold">Analizando...</td>
        </tr>`;

        try {
            const data = await validate();
            let contentStr = '';

            data.forEach(element => {
                contentStr += `<tr>
                    <td class='checker-td-bold checker-td-group'>${element.group}</td>
                    <td class='checker-td-text checker-td-commend'>${element.comment}</td>
                    <td class='${element.type === 'Error' ? 'checker-td-error' : element.type === 'Warning' ? 'checker-td-warn' : 'checker-td-success'} checker-td-type'>${element.type}</td>
                </tr>`;
            });

            table.innerHTML = contentStr;
        }
        catch(error)
        {
            table.innerHTML = `<tr>
                <td colspan="3"></td>
            </tr>`;
            document.getElementById('error-checkers').innerHTML = "ERR: No se pudo identificar los campos de entrada, asegurese estar en la vista de un RLM.";
            console.dir(error);
        }

    });
}   