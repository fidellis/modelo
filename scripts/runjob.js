/**
 * Apenas para ser usado em linha de cmd, util para testes, o job já é registrado e agendado automaticamente em scripts/jobs/index.js
 * Sintaxe: node scripts/runjob.js [nome do arquivo de job - precisa estar localizado dentro de scripts/jobs]
 * Ex.: node scripts/runjob.js funcionarioJob
 */

const file = process.argv[2];

if (!file) {
  console.error('Arquivo faltando');
  return process.exit(1);
}

const job = require(`./jobs/${file}`);

console.log('job', job);

job.execute().then(() => console.log(`Job ${job.name} successfully executed.`)).catch(err => console.error(err));
