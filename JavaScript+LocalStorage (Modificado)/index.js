function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='Selecciona';
    document.getElementById("Input4").value='Selecciona';
}

function createR() {
    
    
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var rol = document.getElementById("Input3").value;
    var panteon = document.getElementById("Input4").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var dios = {
            id, //matricula:id
            nombre,
            rol,
            panteon,
        }

        var lista_dioses=JSON.parse(localStorage.getItem("Dioses"));

        if(lista_dioses==null)
        { 
            var lista_dioses = [];
        }
        
        const existe = lista_dioses.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_dioses=lista_dioses.filter(dios=>dios.id!=id);

            }
                
            lista_dioses.push(dios);
            var temporal = lista_dioses.sort((a,b) => a.id-b.id);
            localStorage.setItem("Dioses", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de dios","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_dioses = JSON.parse(localStorage.getItem("Dioses"));
    
     
    if(lista_dioses)
    {
        lista_dioses.forEach((dios)=>printRow(dios));
    }
}


function printRow(dios){
    
    if(dios!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = dios.id;
        cell2.innerHTML = dios.nombre; 
        cell3.innerHTML = dios.rol;
        cell4.innerHTML = dios.panteon; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${dios.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+dios.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_dioses = JSON.parse(localStorage.getItem("Dioses"));
    var temporal=lista_dioses.filter(dios=>dios.id!=id);
    localStorage.setItem("Dioses", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Dioses");
    }
  
    read();
    
}

function seekR(id){

    const lista_dioses = JSON.parse(localStorage.getItem("Dioses"));
    var dios=lista_dioses.filter(dios=>dios.id==id);
    //console.log(dios[0]);
    updateR(dios[0]);
}

function updateR(dios){
    if(dios!=null)
    {
        document.getElementById("Input1").value=dios.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=dios.nombre;
        document.getElementById("Input3").value=dios.rol;
        document.getElementById("Input4").value=dios.panteon;
    }
}


//Para consulta de panteon
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_dioses = JSON.parse(localStorage.getItem("Dioses"));
    var diosesC=lista_dioses.filter(dios=>dios.panteon==c);
    if(diosesC)
    {
        diosesC.forEach((dios)=>printRowQ(dios));
    }
    //console.log(diosesC)

}


function printRowQ(dios){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = dios.id;
    cell2.innerHTML = dios.nombre; 
    cell3.innerHTML = dios.rol;
    cell4.innerHTML = dios.panteon; 
   
}