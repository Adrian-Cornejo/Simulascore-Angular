export interface Profesor {
    codigoProfesor: string;  
    codigoDirectivo: string; 
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    escuela: string;
    codigoEscuela: string;
    urlImagen?: string;
    oneSignalUserId? :string;
}
