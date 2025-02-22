export interface Alumno {
    codigoAlumno: string; 
    codigoProfesor: string;  
    nombre: string;
    apellido: string;
    grado? : string;
    grupo? :string;
    correo: string;
    password: string;
    escuela: string;
    codigoEscuela: string;
    urlImagen?: string;
    oneSignalUserId? :string;
}
