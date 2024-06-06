import React, { useContext, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../provider/AuthProvider";

const CreateDonation = () => {
  const { user } = useContext(AuthContext);
  const [petPicture, setPetPicture] = useState(null);
  const [maxDonation, setMaxDonation] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // If user is null, show a loading skeleton
  if (!user) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
        <h1 className="text-2xl font-bold mb-6"><Skeleton width={200} /></h1>
        <form>
          <div className="mb-4"><Skeleton height={40} /></div>
          <div className="mb-4"><Skeleton height={40} /></div>
          <div className="mb-4"><Skeleton height={40} /></div>
          <div className="mb-4"><Skeleton height={40} /></div>
          <div className="mb-4"><Skeleton height={40} /></div>
          <div className="mb-4"><Skeleton height={50} /></div>
        </form>
      </div>
    );
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setPetPicture(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload?key=6b00410e7298a08634c9d8f7abd48fe9", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setImageUrl(data.data.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCampaign = {
      petPicture: imageUrl,
      maxDonation,
      lastDate,
      shortDescription,
      longDescription,
      email: user.email,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCampaign),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Donation Campaign:", data);
        toast.success("Donation campaign created successfully!");
      } else {
        toast.error("Failed to create donation campaign");
      }
    } catch (error) {
      console.error("Error creating donation campaign:", error);
      toast.error("Error creating donation campaign");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6">Create Donation Campaign</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petPicture">
            Pet Picture
          </label>
          <input
            type="file"
            id="petPicture"
            name="petPicture"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxDonation">
            Maximum Donation Amount
          </label>
          <input
            type="number"
            id="maxDonation"
            name="maxDonation"
            value={maxDonation}
            onChange={(e) => setMaxDonation(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastDate">
            Last Date of Donation
          </label>
          <input
            type="date"
            id="lastDate"
            name="lastDate"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortDescription">
            Short Description
          </label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longDescription">
            Long Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          ></textarea>
        </div>
        <div className="mb-4">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonation;
