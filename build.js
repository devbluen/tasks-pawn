
        // Requires
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');



/*

                    oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.     .oooooo.   oooooooooooo  .oooooo..o 
                    `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b   d8P'  `Y8b  `888'     `8 d8P'    `Y8 
                    888          888       8   8 `88b.    8  888          888      888  888         Y88bo.      
                    888oooo8     888       8   8   `88b.  8  888          888      888  888oooo8     `"Y8888o.  
                    888    "     888       8   8     `88b.8  888          888      888  888    "         `"Y88b 
                    888          `88.    .8'   8       `888  `88b    ooo  `88b    d88'  888       o oo     .d8P 
                    o888o           `YbodP'    o8o        `8   `Y8bood8P'   `Y8bood8P'  o888ooooood8 8""88888P'  

*/

function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês de 0-11, ajustado para 1-12
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function playWindowsAlertSound() {
    const soundPath = "C:\\Windows\\Media\\Windows Error.wav"; // Som padrão do Windows
    // const command = `powershell -c "(New-Object Media.SoundPlayer '${soundPath}').PlaySync()"`;
  
    // Executa o comando PowerShell com spawnSync
    const result = spawnSync('powershell', ['-c', `(New-Object Media.SoundPlayer '${soundPath}').PlaySync()`], {
        stdio: 'ignore', // Não mostra a saída do PowerShell
        shell: true,
    });
  
    if (result.error) {
        console.error("Failed to play sound:", result.error.message);
    }
}



/*

                    oooooooooooo ooooooo  ooooo oooooooooooo   .oooooo.   ooooo     ooo   .oooooo.         .o.         .oooooo.   
                    `888'     `8  `8888    d8'  `888'     `8  d8P'  `Y8b  `888'     `8'  d8P'  `Y8b       .888.       d8P'  `Y8b  
                    888            Y888..8P     888         888           888       8  888              .8"888.     888      888 
                    888oooo8        `8888'      888oooo8    888           888       8  888             .8' `888.    888      888 
                    888    "       .8PY888.     888    "    888           888       8  888            .88ooo8888.   888      888 
                    888       o   d8'  `888b    888       o `88b    ooo   `88.    .8'  `88b    ooo   .8'     `888.  `88b    d88' 
                    o888ooooood8 o888o  o88888o o888ooooood8  `Y8bood8P'     `YbodP'     `Y8bood8P'  o88o     o8888o  `Y8bood8P'  

*/

// Dados inicial
const start = Date.now();

// Iniciar Compilação
const [pawnccPath, ...args] = process.argv.slice(2);                                                                // Capturar todos os argumentos
const result = spawnSync(`"${pawnccPath}"`, args.map(arg => `"${arg}"`), { stdio: 'inherit', shell: true });        // Executa o comando pawncc com os argumentos

// Dados final
const end = Date.now();
const endDate = getFormattedDate();
const pathAmx = args[0].replace(".pwn", ".amx");

const stats = fs.statSync(pathAmx).size / (1024 * 1024);

console.log(" ");
console.log(`Compilado em ${(end - start) / 1000} segundos`);
console.log(`Data: ${endDate}`);
console.log(`Tamanho: ${stats.toFixed(2)} MB`);
console.log(" ");

playWindowsAlertSound();
process.exit(result.status);