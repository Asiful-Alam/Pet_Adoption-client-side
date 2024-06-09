import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthContext } from '../../provider/AuthProvider';
import MyListCard from '../Dashboard/MyListCard';

const MyList = () => {
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`http://localhost:5000/mypets/${user?.email}`, { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setPets(data);
        } else {
          console.error('Failed to fetch pets:', response.status);
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchPets();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10">
        <Skeleton height={40} count={6} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6">My Pets</h1>
      {pets.length > 0 ? (
        pets.map(pet => (
          <MyListCard key={pet._id} pet={pet} />
        ))
      ) : (
        <p>No pets found.</p>
      )}
    </div>
  );
};

export default MyList;
