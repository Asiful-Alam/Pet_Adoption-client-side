
// import React, { useContext } from "react";
// import { UserContext } from "../context/UserContext";
// import { toast } from "react-toastify";

// const DonationsTable = () => {
//   const { user } = useContext(UserContext);

//   // Check if user is undefined
//   if (!user) {
//     return <div>Loading...</div>; // or handle this case as needed
//   }

//   const handlePause = async (id, pause) => {
//     try {
//       const response = await fetch(`http://localhost:5000/donation/pause/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ pause }),
//       });
//       const data = await response.json();
//       setDonations(donations.map(donation => donation._id === id ? { ...donation, paused: pause } : donation));
//       toast.success(pause ? "Donation paused!" : "Donation unpaused!");
//     } catch (error) {
//       console.error("Error pausing/unpausing donation:", error);
//       toast.error("Failed to update donation status.");
//     }
//   };

//   const handleEdit = (id) => {
//     // Redirect to edit donation page
//     window.location.href = `/edit-donation/${id}`;
//   };

//   const handleViewDonators = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/donation/donators/${id}`);
//       const data = await response.json();
//       setSelectedDonation(id);
//       setDonators(data);
//     } catch (error) {
//       console.error("Error fetching donators:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Your Donations</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Pet Name</th>
//             <th>Max Donation</th>
//             <th>Progress</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {donations.map(donation => (
//             <tr key={donation._id}>
//               <td>{donation.petName}</td>
//               <td>{donation.maxDonation}</td>
//               <td>
//                 <progress value={donation.currentDonation} max={donation.maxDonation}></progress>
//               </td>
//               <td>
//                 <button onClick={() => handleEdit(donation._id)}>Edit</button>
//                 <button onClick={() => handlePause(donation._id, !donation.paused)}>
//                   {donation.paused ? "Unpause" : "Pause"}
//                 </button>
//                 <button onClick={() => handleViewDonators(donation._id)}>View Donators</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {selectedDonation && (
//         <div>
//           <h2>Donators</h2>
//           <ul>
//             {donators.map(donator => (
//               <li key={donator._id}>
//                 {donator.name} - {donator.amount}
//               </li>
//             ))}
//           </ul>
//           <button onClick={() => setSelectedDonation(null)}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DonationsTable;


const DonationsTable = () => {
    return (
        <div>
            
        </div>
    );
};

export default DonationsTable;