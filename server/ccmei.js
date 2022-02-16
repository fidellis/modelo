'use strict';

/*eslint-disable */
const puppeteer = require('puppeteer');
const pg = require('pg');
const moment = require('moment');
const conString = "postgres://teste:teste@localhost:5432/diemp";
const client = new pg.Client(conString);
client.connect();

async function get(page, row, i) {
    try {
        const start = Date.now();
        console.log('***', i, '***');
        await page.evaluate(({ row }) => {
            const input = document.getElementById('Cnpj');
            input.value = row.cnpj;
            const button = document.getElementsByClassName('btn-verde');
            button[0].setAttribute('id', 'consulta');
            // await button[0].click();
        }, { row });

        await page.click('#consulta');
        console.log('1 - clicou consulta');
        // await page.waitForNavigation();

        await page.waitForSelector('#btnMaisInfo');
        console.log('2 - abriu consulta');
        await page.click('#btnMaisInfo');
        console.log('3 - clicou mais info');
        await page.waitForSelector('#maisInfo');
        console.log('4 - abriu mais info');

        const data = await page.evaluate(async ({ row }) => {
            const periodos = [];
            let dataSituacao = '';
            let cnpj = document.getElementsByClassName('spanValorVerde')[0].innerHTML;
            cnpj = Number(cnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', ''));
            const paineis = document.getElementsByClassName('panel panel-success');
            const painelSituacao = paineis[1];
            const campoSituacao = painelSituacao.getElementsByClassName('spanValorVerde')[1].innerHTML;
            let situacao = campoSituacao.substring(0, 19);
            if (situacao === 'Enquadrado no SIMEI') {
                dataSituacao = campoSituacao.substring(26);
            } else {
                situacao = campoSituacao;
            }
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
            return { cnpj: row.cnpj, cnpjPagina: cnpj, situacao, dataSituacao, periodos };
        }, { row });

        if (Number(data.cnpj) === Number(data.cnpjPagina)) {
            console.log('5 - copiou dados');
            const sqlSituacao = await `INSERT INTO ccmei.situacao(cnpj, situacao, data_situacao) VALUES(${data.cnpj}, '${data.situacao}', '${data.dataSituacao ? moment(data.dataSituacao, 'DD/MM/YYYY').format('YYYY-MM-DD') : ''}');`;
            const sqlPeriodo = await data.periodos.map(periodo => `INSERT INTO ccmei.periodo (cnpj, data_inicio, data_fim, detalhamento) VALUES(${data.cnpj}, '${moment(periodo.dataInicio, 'DD/MM/YYYY').format('YYYY-MM-DD')}', '${moment(periodo.dataFim, 'DD/MM/YYYY').format('YYYY-MM-DD')}', '${periodo.detalhamento}');`).join(' ');

            await client.query(sqlSituacao);
            console.log('6 - inseriu situacao', sqlSituacao);
            await client.query(sqlPeriodo);
            console.log('7 - inseriu periodo', sqlPeriodo);
        } else {
            console.log('****************** pulou cnpj', data.cnpj, '***************************');
        }

        // const path = `/home/henrique/Imagens/ccmei/${row.cnpj}.png`;
        //await page.screenshot({ path, fullPage: true });
        // console.log(i, path)

        await Promise.all([page.waitForNavigation(), page.click('a[href="/consultaoptantes"]')]);
        // await browser.close();
        console.log(`8 - Voltar - ${(Date.now() - start) / 1000}s`);
    } catch (error) {
        await page.screenshot({ path: `/home/henrique/Imagens/ccmei/error_${row.cnpj}.png`, fullPage: true });
        console.log(moment(), error);
    }
}

async function start() {
    const browser = await puppeteer.launch({ headless: true, slowMo: 200 });
    const page = await browser.newPage();
    await page.goto('https://consopt.www8.receita.fazenda.gov.br/consultaoptantes');

    const response = await client.query(`
    select distinct LPAD(cast(ccmei.cnpj as varchar),14,'0') as cnpj
    from ccmei.ccmei left join ccmei.situacao on situacao.cnpj = ccmei.ccmei.cnpj 
    where situacao.cnpj is null
    order by LPAD(cast(ccmei.cnpj as varchar),14,'0');`);
    console.log('rows', response.rows.length);
    response.rows.forEach(async (row, i) => {
        setTimeout(async () => {
            await get(page, row, i);
        }, 15000 * i);
    });
};

start();