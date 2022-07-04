import Task from "./task.js";

class Tasks {
    //Creacion del objeto que contiene las tareas
    constructor() {
        this._listed = {};
    }

    get listedArr() {
        const listed = [];

        Object.keys(this._listed).forEach((key) => {
            const task = this._listed[key];
            listed.push(task);
        });

        return listed;
    }

    checkCompleted(tasks) {
        tasks.forEach((taskCom) => {
            Object.keys(this._listed).map((key) => {
                if (this._listed[key].id === taskCom.id){
                    this._listed[key].completedAt = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()} a las ${new Date().getHours()}:${new Date().getMinutes()}`;
                }
            })
        })

       console.log("Tareas completadas");
    }

    eraseTask(id = "") {
        
        if (this._listed[id]) {
            delete this._listed[id]
        }else{
          return 
        }
    }

    listTasks(tasks) {
        console.log("");
        tasks.forEach(({ completedAt, desc }, i) => {
            console.log(
                `${i + 1}. `.blue +
                    `${desc}::`.magenta +
                    ` ${completedAt ?  `Completada ${completedAt}`.green : `Pendiente`.red}`
            );
        });
    }

    listComTasks(tasks) {
        console.log("");
        tasks.forEach(({ completedAt, desc }, i) => {
            if (completedAt) {
                console.log(
                    `${i + 1}. `.blue + `${desc}::`.green + `Completada ${completedAt}`.green
                );
            }
        });
    }

    listPenTasks(tasks) {
        console.log("");
        tasks.forEach(({ completedAt, desc }, i) => {
            if (!completedAt) {
                console.log(
                    `${i + 1}. `.blue + `${desc}::`.red + "Pendiente".red
                );
            }
        });
    }

    loadTasks(tasks) {
        tasks.forEach((task) => (this._listed[task.id] = task));
    }
    //Metodo 1 para crear tareas a partir de la clase Task en Task.js, este recibe la descripcion que el usuario envia
    createTask(desc = "") {
        //Crea la clase Task
        const task = new Task(desc);
        //Creamos un objeto que contenga el id creado en la clase Task, que contenga el objeto que regresa task
        this._listed[task.id] = task;
    }
}

export default Tasks;
