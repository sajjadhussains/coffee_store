
import { useLoaderData } from 'react-router-dom'
import Card from './components/Card'
import { useState } from 'react';

function App() {
  const loadedCoffees = useLoaderData(); 
  const [coffees,setCoffees] = useState(loadedCoffees);
  
  return (
    <div className='m-20'>
      <h1 className="text-center text-3xl mt-3 mb-3">Totoa Coffee Type {coffees.length}</h1>
     <div className="grid md:grid-cols-2 gap-4">
     {
       coffees.map(coffee=><Card 
        key={coffee._id} 
        coffee={coffee}
        coffees={coffees}
        setCoffees={setCoffees}
        >
        </Card>) 
      }
     </div>
    </div>
  )
}

export default App
