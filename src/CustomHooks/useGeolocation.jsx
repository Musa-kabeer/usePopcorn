import { useState } from 'react';

const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { position, error, isLoading, getPosition };
};

export default useGeolocation;

///////////////////////
///////////////////
// RENDERING PART
// import { useState } from 'react';
// import useGeolocation from './components/useGeolocation';

// export default function App() {
//   const [count, setCount] = useState(0);

//   const {
//     position: { lat, lng },
//     error,
//     isLoading,
//     getPosition,
//   } = useGeolocation();

//   function handlePosition() {
//     setCount((count) => count + 1);

//     getPosition();
//   }

//   return (
//     <div>
//       <button onClick={handlePosition} disabled={isLoading}>
//         Get my position
//       </button>

//       {isLoading && <p>Loading position...</p>}

//       {error && <p>{error}</p>}

//       {!isLoading && !error && lat && lng && (
//         <p>
//           Your GPS position:{' '}
//           <a
//             target="_blank"
//             rel="noreferrer"
//             href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
//           >
//             {lat}, {lng}
//           </a>
//         </p>
//       )}

//       <p>You requested position {count} times</p>
//     </div>
//   );
// }
