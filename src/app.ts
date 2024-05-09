import fs from "node:fs"
import path from "node:path"

const percorso = process.cwd();

const read_Dir_File = async () => {
    try{
        const cartella = process.argv[2];
    console.log("|--",cartella);
    const letturaCartella = fs.readdirSync(path.join(percorso,cartella),{ withFileTypes: true });
    letturaCartella.forEach((element) => {
        if(element.isDirectory()){
            const lettura2livello = fs.readdirSync(path.join(element.path,element.name),{ withFileTypes: true });
            console.log("| |--",element.name);
            lettura2livello.forEach((c) => {
                console.log("| | |--",c.name);
            const lettura3livello = fs.readdirSync(path.join(c.path,c.name),{ withFileTypes: true });
            lettura3livello.forEach((liv3) => {
                if(liv3.isFile()){
                    console.log("| | | |--",liv3.name);
                }
                // else if(liv3.)
            })
            })
        }
        else if(element.isFile()){
            console.log("| |--",element.name);
        }
    })
    }
    catch (err){
        console.log(err);
        
    }
    
    
}

read_Dir_File()