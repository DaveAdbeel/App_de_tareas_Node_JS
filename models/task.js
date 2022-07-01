import { v4 as uuidv4 } from 'uuid';

//Creando clase para llamarla en el Tasks y crear una tarea
class Task {
    constructor( desc ){
        //Creamos el id unico
        this.id = uuidv4();
        //La descripcion que el usuario ingrese a travez del metodo createTask en Tasks
        this.desc = desc
        //Y la fecha en que el usuario completo la tarea
        this.completedAt = null
    }
}

export default Task;
