import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {

  const {id} = useParams()

  const [cliente, setCliente] = useState({})

  const [cargando, setCargando] = useState(true)
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_SOME_KEY}/${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCliente(resultado)
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setCargando(!cargando)
      }, 3000);
      
    }

    obtenerClienteAPI()
  }, [])

  return (
    cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <p>No hay Resultados</p> : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Ver Cliente: {cliente.nombre}</h1>
      <p className="mt-3">Informacion del Cliente</p>

      {cliente.nombre && (<p className="text-4xl text-gray-700">
        <span className="text-gray-800 uppercase font-bold">Cliente: </span>
        {cliente.nombre}
      </p>
      )}
      {cliente.telefono && (<p className="text-2xl text-gray-700 mt-4">
        <span className="text-gray-800 uppercase font-bold">Email: </span>
        {cliente.email}
      </p>
      )}
      {cliente.telefono && (<p className="text-2xl text-gray-700 mt-4">
        <span className="text-gray-800 uppercase font-bold">Telefono: </span>
        {cliente.telefono}
      </p>
        )}
      {cliente.empresa && (<p className="text-2xl text-gray-700 mt-4">
        <span className="text-gray-800 uppercase font-bold">Empresa: </span>
        {cliente.empresa}
      </p>
      )}
      {cliente.notas && (
        <p className="text-2xl text-gray-700 mt-4">
          <span className="uppercase font-bold">Notas: </span>
          {cliente.notas}
        </p>
      )}
      
    </div>)
  )
}

export default VerCliente
