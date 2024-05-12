import fs from "node:fs";
import path from "node:path";
import { DateTime } from "luxon";
import chalk from "chalk";

const dataEntity = (ms:number) =>  {
    
    const dateTime  = DateTime.fromMillis(ms);
    const dataAttuale = DateTime.now();
    let differenzaMesi = Math.floor(dataAttuale.diff(dateTime).as("months"));
    let differenzaGiorni = Math.floor(dataAttuale.diff(dateTime).as("days"));
    let differenzaMinuti = Math.floor(dataAttuale.diff(dateTime).as("minutes"));
    let differenzaOre = Math.floor(dataAttuale.diff(dateTime).as("hours"));
    let differenzaSecondi = Math.floor(dataAttuale.diff(dateTime).as("seconds"));
    let differenzaMs = Math.floor(dataAttuale.diff(dateTime).as("milliseconds"));
    let tempo:number | string = differenzaSecondi;

    if (differenzaSecondi >= 60){
        tempo = `${differenzaMinuti} minuti fa`
    }
    if(differenzaMinuti >= 60){
        tempo = `${differenzaOre} ore fa`
    }
    if(differenzaOre >= 24){
        tempo = `${differenzaGiorni} giorni fa`
    }
    if(differenzaGiorni >= 31){
        tempo = `${differenzaMesi} mesi fa`
    }
    if(differenzaMesi >= 24){
        tempo = `modificato il ${dateTime.toFormat("MM-dd-yyyy")}`;
    }

    return tempo;
}


let percorso = process.cwd();
let cartella = process.argv[2];

console.log(chalk.green(`|--${cartella}`));

let count = 2;

    const openDir = (dir:any,count:number) => {
    
        if(dir.isDirectory()){
            const readDir = fs.readdirSync(path.join(dir.path,dir.name),{withFileTypes:true});
            readDir.forEach((sotto_dir) => {
                if(sotto_dir.isDirectory()){
                    console.log(chalk.green("  |".repeat(count),sotto_dir.name));
                    openDir(sotto_dir,count+1)
                }
                else{
                    const fileStat = fs.statSync(path.join(sotto_dir.path,sotto_dir.name));
                    const array = dataEntity(fileStat.mtimeMs).toLocaleString().split(" ");
                    if(array.includes("ore") && +array[0] < 24){
                        console.log(chalk.red("  |".repeat(count),sotto_dir.name,dataEntity(fileStat.mtimeMs)));
                    }
                    else if(array.includes("giorni") && +array[0] < 2){
                        console.log(chalk.blue("  |".repeat(count),sotto_dir.name,dataEntity(fileStat.mtimeMs)));
                    }
                    else{
                        console.log("  |".repeat(count),sotto_dir.name,dataEntity(fileStat.mtimeMs));
                    }
                            
                        
                }
            })
        }
    } 

    export default () => {
        const readDir = fs.readdirSync(path.join(percorso,cartella),{withFileTypes:true});
    
        readDir.forEach(element => {
            if(element.isDirectory()){
                console.log(chalk.green(`${"  |".repeat(count)}${element.name}`));
                openDir(element,count+1)
            }else{
                const fileStat = fs.statSync(path.join(element.path,element.name));
                console.log("  |".repeat(count),element.name,dataEntity(fileStat.mtimeMs));
            }
        });
    }