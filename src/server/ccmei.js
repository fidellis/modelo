/*eslint-disable */
const puppeteer = require('puppeteer');
const pg = require('pg');
const moment = require('moment');
const conString = "postgres://teste:teste@localhost:5432/diemp";
const client = new pg.Client(conString);
client.connect();

async function get(page, row, i) {
    try {

        await page.evaluate(({ row }) => {
            const input = document.getElementById('Cnpj');
            input.value = row.cnpj;
            const button = document.getElementsByClassName('btn-verde');
            button[0].setAttribute('id', 'consulta')
            // await button[0].click();
        }, { row });

        await page.click('#consulta');

        await page.waitForNavigation();
        await page.waitForSelector('#btnMaisInfo');
        await page.click('#btnMaisInfo');

        const data = await page.evaluate(async ({ row }) => {
            const periodos = [];
            let dataSituacao = '';
            const paineis = document.getElementsByClassName('panel panel-success');
            const painelSituacao = paineis[1];
            const campoSituacao = painelSituacao.getElementsByClassName('spanValorVerde')[1].innerHTML;
            const situacao = campoSituacao.substring(0, 19);
            if (situacao === 'Enquadrado no SIMEI') dataSituacao = campoSituacao.substring(26);
            const painelPeriodo = paineis[2];
            const tables = painelPeriodo.getElementsByTagName('table');
            const table = tables[1] || tables[0];

            if (table) {
                const tr = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

                for (let i = 0; i < tr.length; i++) {
                    const td = tr[i].getElementsByTagName('td');
                    const periodo = {
                        dataInicio: td[0].innerHTML.trim(),
                        dataFim: td[1].innerHTML.trim(),
                        detalhamento: td[2].innerHTML.trim()
                    };
                    periodos.push(periodo);
                };
            }
            return { cnpj: row.cnpj, situacao, dataSituacao, periodos }
        }, { row });

        const sqlSituacao = await `INSERT INTO teste.situacao(cnpj, situacao, data_situacao) VALUES(${data.cnpj}, '${data.situacao}', '${data.dataSituacao ? moment(data.dataSituacao, 'DD/MM/YYYY').format('YYYY-DD-MM') : ''}');`;
        const sqlPeriodo = await data.periodos.map(periodo => (`INSERT INTO teste.periodo (cnpj, data_inicio, data_fim, detalhamento) VALUES(${data.cnpj}, '${moment(periodo.dataInicio, 'DD/MM/YYYY').format('YYYY-MM-DD')}', '${moment(periodo.dataFim, 'DD/MM/YYYY').format('YYYY-MM-DD')}', '${periodo.detalhamento}');`)).join(' ');

        console.log(i, sqlSituacao);
        await client.query(sqlSituacao);
        console.log(sqlPeriodo);
        await client.query(sqlPeriodo);

        await page.screenshot({ path: `C:\\Users\\f4103757\\Pictures\\ccmei\\${row.cnpj}.png`, fullPage: true });

        await Promise.all([page.waitForNavigation(), page.click('a[href="/consultaoptantes"]')]);
        // await browser.close();
    } catch (error) {
        console.log(error)
    }
}

async function start() {
    const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    const page = await browser.newPage();
    await page.goto('https://consopt.www8.receita.fazenda.gov.br/consultaoptantes');

    const response = await client.query(`
            select LPAD(cast(cod_cpf_cgc as varchar),14,'0') as cnpj
            from ccmei.ccmei left join teste.situacao on situacao.cnpj = ccmei.ccmei.cod_cpf_cgc 
            where situacao.cnpj is null and carga = 1 limit 3;`);

    response.rows.forEach(async (row, i) => {
        setTimeout(async () => {
            get(page, row, i)
        }, 18000 * i)
    });
};

start();
