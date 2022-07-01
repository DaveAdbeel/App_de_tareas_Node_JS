import inquirer from "inquirer";
import pkg from "colors";
const { Color } = pkg;

//El menu principal
async function inquirerMenu() {
    const questionConfig = [
        {
            type: "list",
            name: "questions",
            message: "Que desea hacer",
            choices: [
                { value: "1", name: `${"1.".blue} ${"Crear una tarea"}` },
                { value: "2", name: `${"2.".blue} ${"Listar tareas"}` },
                {
                    value: "3",
                    name: `${"3.".blue} ${"Listar tareas completadas"}`,
                },
                {
                    value: "4",
                    name: `${"4.".blue} ${"Listar tareas pendientes"}`,
                },
                { value: "5", name: `${"5.".blue} ${"Completar tareas"}` },
                { value: "6", name: `${"6.".blue} ${"Borrar tarea"}` },
                { value: "0", name: `${"0.".blue} ${"Salir \n"}` },
            ],
        },
    ];
    console.log("======================".green);
    console.log("Seleccione una opcion".white);
    console.log("======================\n".green);

    const opt = await inquirer.prompt(questionConfig);
    return opt.questions;
}
//Cada vez que la persona haga una accion se hara una pausa
async function pause() {
    const pauseConfig = [
        {
            type: "input",
            name: "pause",
            message: `Aprete la tecla ${"ENTER".green} para continuar`,
        },
    ];
    const opt = await inquirer.prompt(pauseConfig);
}
//La funcion que maneja las opciones que requieran un input
async function readInput(message) {
    const readInputConfig = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) return " Porfavor ingrese un valor";
                return true;
            },
        },
    ];

    const { desc } = await inquirer.prompt(readInputConfig);
    return desc;
}

async function selectTask(data) {
    console.log("");
    const newData = [];
    data.forEach((el, i) => {
        newData.push({
            value: { id: `${el.id}`.toString(), desc: el.desc },
            name: `${i + 1}. `.red + `${el.desc}`,
        });
    });

    newData.push({ value: "0", desc: "0. Salir".green, name: "0. Salir" });

    const selTaskConfig = [
        {
            type: "list",
            name: "opt",
            message: "Cual tarea desea eliminar?".red,
            choices: newData,
        },
    ];

    const delOpt = await inquirer.prompt(selTaskConfig);

    if (delOpt.opt === "0") {
        return null;
    }

    const questionConf = [
        {
            type: "input",
            name: "opt",
            message: `Esta seguro/a de eliminar la tarea ${delOpt.opt.desc} N/y >`,
            validate(value) {
                if (value.length === 0) return " Porfavor ingrese un valor";
                return true;
            },
        },
    ];

    const opt = await inquirer.prompt(questionConf);

    if (opt.opt === "N" || opt.opt === "n") {
        return null;
    }
    console.log("\nTarea borrada con exito \n");
    return delOpt.opt.id;
}

async function check(tasks) {
    const taskfiltred = [];

    tasks.forEach(({id, desc, completedAt}, i) => {
     if (!completedAt){
        taskfiltred.push( { 
            value: { id: `${id}`.toString(), desc},
            name: `${i + 1}. `.red + `${desc}`,
         } )
     }
   })
    console.log("");
    
    const TaskConfig = [
        {
            type: "checkbox",
            name: "opt",
            message: "Marque o descarque las tareas".green,
            choices: taskfiltred,
        },
    ];

    const {opt} = await inquirer.prompt(TaskConfig); 

    return opt;
}
    

export { inquirerMenu, pause, readInput, selectTask, check };
