// import React, { useState, useEffect } from 'react';

// const UserAdoption = () => {
//     const [adoptionRequests, setAdoptionRequests] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchAdoptionRequests = async () => {
//             try {
//                 const response = await fetch(`https://full-project-server.vercel.app/adoptionRequests?userId=${userId}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch adoption requests');
//                 }
//                 const data = await response.json();
//                 setAdoptionRequests(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching adoption requests:', error);
//                 setLoading(false);
//             }
//         };

//         fetchAdoptionRequests();
//     }, []);

//     const handleAccept = (requestId) => {
//         // Handle accepting the adoption request
//         // Make an API call to update the status of the adoption request
//     };

//     const handleReject = (requestId) => {
//         // Handle rejecting the adoption request
//         // Make an API call to update the status of the adoption request
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>User Adoption Requests</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Phone Number</th>
//                         <th>Location</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {adoptionRequests.map((request) => (
//                         <tr key={request.id}>
//                             <td>{request.name}</td>
//                             <td>{request.email}</td>
//                             <td>{request.phoneNumber}</td>
//                             <td>{request.location}</td>
//                             <td>
//                                 <button onClick={() => handleAccept(request.id)}>Accept</button>
//                                 <button onClick={() => handleReject(request.id)}>Reject</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default UserAdoption;
import React from 'react';

const UserAdoption = () => {
    return (
        <div>
            
        </div>
    );
};

export default UserAdoption;