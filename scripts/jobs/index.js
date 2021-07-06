const register = require('common/jobs').register;
const fs = require('fs');

const jobFiles = fs.readdirSync(__dirname).filter(file => !/(index|util)/.test(file));

jobFiles.forEach((jobFile) => {
  const job = require(`./${jobFile}`);
  console.log('registrando', job.name);
  register(job);
});

