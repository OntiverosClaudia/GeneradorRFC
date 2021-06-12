function Calcular(datos){
    // Obtiene los valores en mayusculas y la fecha sin guiones/espacios
    var nombre = datos.nombre.toUpperCase(); 
    var Apaterno = datos.Apaterno.toUpperCase();
    var Amaterno = datos.Amaterno.toUpperCase();
    var fecha = datos.fecha.replace(/-/g, '');
    console.log(fecha)

    // Comprobar si tiene apellido paterno compuesto
    var DosApellidos = Apaterno.split(' ');
    //Si tiene dos:
    if(Array.isArray(DosApellidos) && DosApellidos.length > 1)
    {
        Apaterno = QuitarApellido(DosApellidos);
    }
    else{
        Apaterno = Apaterno;
    }

    // Verificar primera letra del apellido paterno y primera vocal
    var LIPVApaterno = Apaterno.match(/^.*?([A-ZÑ])(.*?([AEIOU]))/i);
    // Si el AP no tiene vocal:
    if(LIPVApaterno == null){
        var LIApaterno = Apaterno.substring(0, 1);
        var PVApaterno = 'X';
    }
    else{
        var LIApaterno = LIPVApaterno[1]; // primera letra AP 
        var PVApaterno = LIPVApaterno[3]; // primera vocal AP 
    }
    // Si letra inicial es ñ la cambia por x
    if(LIApaterno == 'Ñ'){
        LIApaterno = 'X';
    }

    // Si no tiene apellido materno
    if(Amaterno == '')
    {
        var LIAmaterno = 'X';
    }
    else{
        var LIAmaterno = Amaterno.substring(0, 1);
    }

    //Comprobar si son dos nombres
    var DosNombres = nombre.split(' ');
    
    //Si son dos nombres,
    if(Array.isArray(DosNombres) && DosNombres.length > 1)
    {
        nombre = CambiarNombre(DosNombres);
    }
    else{
        nombre = nombre;
    }
    LInombre = nombre.substring(0, 1);

    // Obtener fecha 
    var Faño = fecha.substring(2, 4);
    var Fmes = fecha.substring(4, 6);
    var Fdia = fecha.substring(6, 8); 
    // Palabra 4 letras
    var Comparar = (LIApaterno + PVApaterno + LIAmaterno + LInombre);
    // LLama funcion de palabras antisonantes
    Comparar = FiltroPalabras(Comparar);
    // Formar RFC
    var RFC = Comparar + Faño + Fmes + Fdia;
    console.log(RFC);
    return RFC;
}

// Importante para exportar en NodeJS
module.exports = {
    "Calcular": Calcular
}

function QuitarApellido(DosApellidos){
    const Cambiar = ['DA', 'DAS', 'DE', 'DEL', 'DER', 'DI', 'DIE', 'DD', 'EL', 'LA', 'LOS', 
    'LAS', 'LE', 'LES', 'MAC', 'MC', 'VAN', 'VON', 'Y']
    var quitar = Cambiar.includes(DosApellidos[0]);
    if(quitar == true){
        return DosApellidos[1];
    }
    else{
        return DosApellidos[0];
    }
}

function CambiarNombre(DosNombres){
    if(DosNombres[0] == 'MARIA' || DosNombres[0].substring(0, 2) == 'MA' || DosNombres[0] == 'JOSE' 
    || DosNombres[0].substring(0, 1) == 'J'){
        return DosNombres[1];
    }
    else{
        return DosNombres[0];
    }
}
function FiltroPalabras(Comparar){
    const PInconvenientes = ['BACA', 'BAKA', 'BUEI', 'BUEY', 'CACA', 'CACO', 'CAGA', 'CAGO', 
    'CAKA', 'CAKO', 'COGE', 'COGI', 'COJA', 'COJE', 'COJI', 'COJO', 'COLA', 'CULO', 'FALO', 
    'FETO', 'GETA', 'GUEI', 'GUEY', 'JETA', 'JOTO', 'KACA', 'KACO', 'KAGA', 'KAGO', 'KAKA', 
    'KAKO', 'KOGE', 'KOGI', 'KOJA', 'KOJE', 'KOJI', 'KOJO', 'KOLA', 'KULO', 'LILO', 'LOCA',
    'LOCO', 'LOKA', 'LOKO', 'MAME', 'MAMO', 'MEAR', 'MEAS', 'MEON','MIAR', 'MION', 'MOCO', 
    'MOKO', 'MULA', 'MULO', 'NACA', 'NACO', 'PEDA', 'PEDO', 'PENE', 'PIPI', 'PITO', 'POPO', 
    'PUTA', 'PUTO', 'QULO', 'RATA', 'ROBA', 'ROBE', 'ROBO', 'RUIN', 'SENO', 'TETA', 'VACA', 
    'VAGA', 'VAGO', 'VAKA', 'VUEI', 'VUEY', 'WUEI', 'WUEY']
    var filtrar = PInconvenientes.includes(Comparar);
    if(filtrar == true){
        return Comparar.substring(0, 1) + 'X' + Comparar.substring(2, 4);
    }
    else{
        return Comparar;
    }
}