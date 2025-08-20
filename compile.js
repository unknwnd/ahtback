const { exec } = require('child_process');

const command = '"./node_modules/.bin/tact" --config ./tact.config.json';

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
}); 