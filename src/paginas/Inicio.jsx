import React, {useState, useEffect} from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {
  console.log(import.meta.env.VITE_SOME_KEY);
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = import.meta.env.VITE_SOME_KEY
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setClientes(resultado)
        
      } catch (error) {
        console.log(error);
      }
    }
    obtenerClientesAPI()
  }, [])

  const handleEliminar = async id => {
    const confirmar = confirm('Desea eliminar este cliente')
    if(confirmar){
      try {
        const url = `${import.meta.env.VITE_SOME_KEY}/${id}`
        const respuesta = await fetch (url, {
          method: 'DELETE'
        })
        await respuesta.json()
        const arrayClientes = clientes.filter(cliente => cliente.id !== id)
        setClientes(arrayClientes)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus Clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contactos</th>
            <th className="p-2">Empresas</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map( cliente => (
              <Cliente
                key={cliente.id}
                cliente={cliente}
                handleEliminar={handleEliminar}
              />
            ))
          }
        </tbody>
      </table>


    </>
  )
}

export default Inicio
