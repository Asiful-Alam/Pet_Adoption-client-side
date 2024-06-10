import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditDonation = () => {
  const { id } = useParams();
  const history = useHistory();
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await fetch(`https://full-project-server.vercel.app/donations/${id}`);
        const data = await response.json();
        setDonation(data);
      } catch (error) {
        console.error("Error fetching donation:", error);
      }
    };
    fetchDonation();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://full-project-server.vercel.app/donation/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donation),
      });
      if (response.ok) {
        toast.success("Donation updated successfully!");
        history.push("/donations");
      } else {
        toast.error("Failed to update donation");
      }
    } catch (error) {
      console.error("Error updating donation:", error);
      toast.error("Failed to update donation");
    }
  };

  if (!donation) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Donation Campaign</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="petName"
          >
            Pet Name
          </label>
          <input
            type="text"
            id="petName"
            name="petName"
            value={donation.petName}
            onChange={(e) => setDonation({ ...donation, petName: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="maxDonation"
          >
            Maximum Donation Amount
          </label>
          <input
            type="number"
            id="maxDonation"
            name="maxDonation"
            value={donation.maxDonation}
            onChange={(e) => setDonation({ ...donation, maxDonation: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="shortDescription"
          >
            Short Description
          </label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={donation.shortDescription}
            onChange={(e) => setDonation({ ...donation, shortDescription: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="longDescription"
          >
            Long Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={donation.longDescription}
            onChange={(e) => setDonation({ ...donation, longDescription: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          ></textarea>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonation;

