let oradorId;
let oradores = [];
let oradorActual;

const setId=(id)=>{
  oradorId = id;
  const orador = oradores.find(o=>o.id===id)
  oradorActual=orador;

  document.getElementById('nombreActualizar').value = oradorActual.nombre;
  document.getElementById('apellidoActualizar').value=oradorActual.apellido;
  document.getElementById('mailActualizar').value = oradorActual.mail;
  document.getElementById('temaActualizar').value = oradorActual.tema;
}

const setOradores=(nuevosOradores)=>{
    oradores=nuevosOradores;
    
  }



const eliminarOrador = (id) => {
      if(!confirm('ESTAS POR ELIMINAR EL ORADOR, ESTAS SEGURO?')) {
          return;
      }

      fetch(`http://localhost:8080/web-app-/api/orador?id=${id}`, {
          method: "DELETE",
      })
      .then(response => response) 
      .then(respuesta => {
          alert(`se ha eliminado el orador id: ${id}`);
          getOradores();
      })
      .catch(err => console.log(err));
  }

const nuevoOrador=()=>{
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const mail = document.getElementById('mail').value;
      const tema = document.getElementById('tema').value;
  
  const orador ={
      nombre,
      apellido,
      mail,
      tema
  };
  //post al servidor
   //1 api fetch --preparo la peticion
const respuesta = fetch('http://localhost:8080/web-app-/api/orador', {
  method:'POST',
  body: JSON.stringify(orador)

});
//2 intento resolver la promesa
respuesta
.then(response =>response.json())
.then(respuesta =>{
  //actualizar el div del html con la informacion que me trae data
 // system.out.println(respuesta)
 alert(`Has dado de alta al orador con id${respuesta.id}`)
 document.getElementById('formOradores').reset();
 getOradores();
 //console.log(respuesta)
}) 
.catch(error => console.log(error)) 
} 

const getOradores = () => {
 //alert('funciona');
//1 api fetch --preparo la peticion
const respuesta = fetch('http://localhost:8080/web-app-/api/orador');
//2 intento resolver la promesa
respuesta
.then(response =>response.json())
.then(oradores =>{
setOradores(oradores);  
//actualizar el div del html con la informacion que me trae data
  //console.log(oradores)
 dibujarTabla(oradores)
}) 
.catch(error => console.log(error))  

}
function dibujarTabla(data){
// console.log(data)
const rows = dibujarFilas(data)
document.getElementById('oradoresRows').innerHTML= rows
}
function dibujarFilas(oradores){
let rows = ``;
console.log(oradores)
for(let orador of oradores){

 // console.log(orador.tema)
  rows += ` 
  <tr>
  <th scope="row">${orador.id}</th>
  
  <td>${orador.nombre}</td>
  <td>${orador.apellido}</td>
  <td>${orador.mail}</td>
  <td>${orador.tema}</td>

  <td>
  <button type="button"  class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="setId(${orador.id})">
  Editar
  </button>  
  <button  class="btn btn-outline-danger" onclick="eliminarOrador(${orador.id})">
      Eliminar
  </button>
  </td>
</tr>
`
}
return rows

}  

const actualizarOrador=()=>{
    if(!oradorActual){
        return;
    }
    const nombre = document.getElementById('nombreActualizar').value;
    const apellido= document.getElementById('apellidoActualizar').value;
    const mail = document.getElementById('mailActualizar').value;
    const tema= document.getElementById('temaActualizar').value;
    //alert("Actualizar Orador");
    const orador ={
      
        nombre,
        apellido,
        mail,
        tema
    };
     //post al servidor
       //1 api fetch --preparo la peticion
       console.log(oradorActual.id)
       const respuesta = fetch(`http://localhost:8080/web-app-/api/orador?id=${oradorActual.id}`, {
        method:'PUT',
        body: JSON.stringify(orador)
      
      });
      //2 intento resolver la promesa
      respuesta
      .then(response =>response)
      .then(respuesta =>{
        //actualizar el div del html con la informacion que me trae data
       alert(`Has Modificado el orador con id${oradorActual.id}`)
       console.log(respuesta)
       //cerrar modal
       document.getElementById('btnCerrar').click();
       getOradores();
      }) 
      .catch(error => console.log(error)) 
    
    }

  //document.getElementById('btnListado').addEventListener('click', getOradores);
  getOradores();
  document.getElementById('btnGrabar').addEventListener('click', nuevoOrador);
