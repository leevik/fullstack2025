import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = async (id) => {
  try {
     console.log("hohoh", id)
    await axios.delete(`${baseUrl}/${id}`)
    const response = await axios.get(baseUrl)
    return response.data
  } catch(err){
    console.error(err)
  }
 
}

/* export default { 
  getAll: getAll, 
  create: create, 
  update: update 
} */

//jos key ja value sama, niin ei tarvitse molempia
export default { 
  getAll, 
  create, 
  update,
  remove
}