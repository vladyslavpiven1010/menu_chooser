// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [dishes, setDishes] = useState([]);
//   const [search, setSearch] = useState('');
//   const [selectedDish, setSelectedDish] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:4000/dishes').then((res) => setDishes(res.data));
//   }, []);

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleChoose = (id) => {
//     axios.patch(`http://localhost:4000/dishes/${id}`, { isChoosable: false });
//     setDishes(dishes.map(d => d.id === id ? { ...d, isChoosable: false } : d));
//   };

//   const handleModal = (dish) => {
//     setSelectedDish(dish);
//   };

//   return (
//     <div className="p-4">
//       <input
//         type="text"
//         placeholder="Search dishes"
//         value={search}
//         onChange={handleSearch}
//         className="p-2 border rounded w-full mb-4"
//       />
//       <div className="grid grid-cols-2 gap-4">
//         {dishes
//           .filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
//           .map((dish) => (
//             <div key={dish.id} className={`dish-card ${!dish.isChoosable ? 'opacity-50' : ''}`} onClick={() => handleModal(dish)}>
//               <img src={dish.photoUrl} alt={dish.name} className="w-full h-32 object-cover rounded" />
//               <h3 className="text-lg font-bold mt-2">{dish.name}</h3>
//               {dish.isChoosable && (
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleChoose(dish.id);
//                   }}
//                 >
//                   Choose
//                 </button>
//               )}
//             </div>
//           ))}
//       </div>

//       {selectedDish && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded">
//             <img src={selectedDish.photoUrl} alt={selectedDish.name} className="w-full h-48 object-cover rounded" />
//             <h2 className="text-xl font-bold mt-4">{selectedDish.name}</h2>
//             <p>{selectedDish.description}</p>
//             <ul className="list-disc ml-6 mt-2">
//               {selectedDish.ingredients.split(',').map((ing, i) => (
//                 <li key={i}>{ing.trim()}</li>
//               ))}
//             </ul>
//             <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={() => setSelectedDish(null)}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure CSS is imported
import './index.css'

function App() {
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/dishes').then((res) => setDishes(res.data));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChoose = (id) => {
    axios.patch(`http://localhost:4000/dishes/${id}`, { isChoosable: false });
    setDishes(dishes.map(d => d.id === id ? { ...d, isChoosable: false } : d));
  };

  const handleModal = (dish) => {
    setSelectedDish(dish);
  };

  return (
    <div className="app-container">
      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search dishes"
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* 🍽 Dish Grid */}
      <div className="grid">
        {dishes
          .filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
          .map((dish) => (
            <div
              key={dish.id}
              className={`dish-card ${dish.isChoosable ? '' : 'opacity-50'}`}
              onClick={() => handleModal(dish)}
            >
              <img src={dish.photoUrl} alt={dish.name} className="dish-image" />
              <h3 className="dish-title">{dish.name}</h3>
              {dish.isChoosable && (
                <button
                  className="choose-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChoose(dish.id);
                  }}
                >
                  Choose
                </button>
              )}
            </div>
          ))}
      </div>

      {/* 📜 Dish Modal */}
      {selectedDish && (
        <div className="fixed">
          <div className="dish-modal">
            <img src={selectedDish.photoUrl} alt={selectedDish.name} className="dish-modal-img" />
            <h2 className="dish-modal-title">{selectedDish.name}</h2>
            <p className="dish-modal-desc">{selectedDish.description}</p>
            <ul className="dish-modal-list">
              {selectedDish.ingredients.split(',').map((ing, i) => (
                <li key={i} className="dish-modal-item">{ing.trim()}</li>
              ))}
            </ul>
            <button className="close-btn" onClick={() => setSelectedDish(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;