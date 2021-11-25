const puppeteer = require('puppeteer');
const pg = require('pg');
const conString = "postgres://teste:teste@localhost:5432/diemp";

async function start() {
    try {
        const client = new pg.Client(conString);
        client.connect();
        const response = await client.query("select LPAD(cast(cod_cpf_cgc as varchar),14,'0') as cnpj from ccmei.ccmei limit 2;");
        console.log('rows', response.rows)

        const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
        const page = await browser.newPage();
        await page.goto('https://consopt.www8.receita.fazenda.gov.br/consultaoptantes');

        response.rows.forEach(async row => {

            await page.evaluate(async ({ row }) => {
                const input = document.getElementById('Cnpj');
                input.value = row.cnpj;
                const button = document.getElementsByClassName('btn-verde');
                button[0].click();
            }, { row });

            await page.waitForNavigation({ waitUntil: 'networkidle0' });

            await page.evaluate(async () => {
                const button = document.getElementById('btnMaisInfo');
                button.click();
            });

            // setTimeout(async () => {
            const cliente = await page.evaluate(async ({ row }) => {
                // const periodos = [];
                // const painelIdentificacao = document.getElementsByClassName('panel panel-success')[0];
                // const cnpj = painelIdentificacao.getElementsByClassName('spanValorVerde')[0].innerHTML;
                // const painelSituacao = document.getElementsByClassName('panel panel-success')[1];
                // const situacao = painelSituacao.getElementsByClassName('spanValorVerde')[1].innerHTML;
                // const tables = document.getElementsByTagName('table');
                // const table = tables[1] || tables[0];

                // if (table) {
                //     const tr = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

                //     for (let i = 0; i < tr.length; i++) {
                //         const td = tr[i].getElementsByTagName('td');
                //         const periodo = {
                //             dataInicio: td[0].innerHTML.trim(),
                //             dataFim: td[1].innerHTML.trim(),
                //             detalhamento: td[2].innerHTML.trim()
                //         };

                //         periodos.push(periodo);
                //     };
                // }

                // return {
                //     cnpj: row.cnpj,
                //     situacao,
                //     periodos
                // }
            }, { row });

            // const data = cliente;
            // const periodos = data.periodos;
            console.log('**************', row.cnpj, '************');
            //voltar
            await page.evaluate(async () => {
                const button = document.getElementsByClassName('btn-verde');
                button[0].click();
            });

            // }, 2000)
        });

        // await browser.close();
    } catch (error) {
        console.log(error)
    }
}

start();