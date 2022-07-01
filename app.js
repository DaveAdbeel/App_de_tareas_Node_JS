//IMPORTS EXTERNOS
import pkg from "colors";
const { Color } = pkg;

//IMPORTS MIOS
import {
    inquirerMenu,
    pause,
    readInput,
    selectTask,
    check,
} from "./helpers/inquirer.js";
import { saveDB, readDB } from "./helpers/handleDB.js";
import Tasks from "./models/tasks.js";

async function main() {
    let opt = null;
    const tasks = new Tasks();
    let dataDB = readDB();

    if (dataDB) {
        tasks.loadTasks(dataDB);
    }
    console.clear();
    do {
        dataDB = readDB();
        //Llamamos al menu principal
        opt = await inquirerMenu();

        //Creamos las opciones
        switch (opt) {
            case "1":
                const desc = await readInput("Description:");
                tasks.createTask(desc);
                break;
            case "2":
                tasks.listTasks(dataDB);
                break;
            case "3":
                tasks.listComTasks(dataDB);
                break;
            case "4":
                tasks.listPenTasks(dataDB);
                break;
            case "5":
                const complete = await check(dataDB);
                tasks.checkCompleted(complete);
                break;
            case "6":
                const opt = await selectTask(dataDB);
                tasks.eraseTask(opt);
                break;
            case "7":
                break;
        }
        console.log("");
        //Pausa despues de cada accion
        await pause();
        //Lectura y escritura de nuevos datos en la base de datos
        saveDB(tasks.listedArr);
    } while (opt != "0");
}

main();
