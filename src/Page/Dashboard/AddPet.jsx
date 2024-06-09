import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../provider/AuthProvider";

const AddPet = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const categories = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Bird", label: "Bird" },
    { value: "Fish", label: "Fish" },
    { value: "Other", label: "Other" },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      category: "",
      location: "",
      shortDescription: "",
      longDescription: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      age: Yup.number().required("Required"),
      category: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      shortDescription: Yup.string().required("Required"),
      longDescription: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      if (!imageUrl) {
        toast.error("Please upload an image");
        return;
      }
      const newPet = { 
        ...values, 
        photo: imageUrl, 
        dateAdded: new Date(), 
        adopted: false,
        email: user.email,
        displayName: user.displayName
      };

      try {
        const response = await fetch("http://localhost:5000/pets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPet),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        toast("Pet created successfully!");
      } catch (error) {
        console.error("Error adding pet:", error);
        toast.error("Error adding pet");
      }
    },
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload?key=6b00410e7298a08634c9d8f7abd48fe9", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setImageUrl(data.data.url);
      toast("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  return (

      <div className=" max-w-md mx-auto mt-8">
      <div className="bg-purple-gradient shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Pet</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="photo" className="block mb-1">Pet Image</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-1">Pet Name</label>
            <input
              type="text"
              id="name"
              name="name"
              {...formik.getFieldProps('name')}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="age" className="block mb-1">Pet Age</label>
            <input
              type="number"
              id="age"
              name="age"
              {...formik.getFieldProps('age')}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            {formik.touched.age && formik.errors.age ? (
              <div className="text-red-500 text-sm">{formik.errors.age}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="category" className="block mb-1">Pet Category</label>
            <Select
              id="category"
              name="category"
              options={categories}
              onChange={(option) => formik.setFieldValue('category', option.value)}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-300 rounded"
              required
            />
            {formik.touched.category && formik.errors.category ? (
              <div className="text-red-500 text-sm">{formik.errors.category}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="location" className="block mb-1">Pet Location</label>
            <input
              type="text"
              id="location"
              name="location"
              {...formik.getFieldProps('location')}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500 text-sm">{formik.errors.location}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="shortDescription" className="block mb-1">Short Description</label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              {...formik.getFieldProps('shortDescription')}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            ></textarea>
            {formik.touched.shortDescription && formik.errors.shortDescription ? (
              <div className="text-red-500 text-sm">{formik.errors.shortDescription}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="longDescription" className="block mb-1">Long Description</label>
            <textarea
              id="longDescription"
              name="longDescription"
              {...formik.getFieldProps('longDescription')}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            ></textarea>
            {formik.touched.longDescription && formik.errors.longDescription ? (
              <div className="text-red-500 text-sm">{formik.errors.longDescription}</div>
            ) : null}
          </div>
          <div>
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 focus:outline-none"
              type="submit"
            >
              Add Pet
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  
  );
};

export default AddPet;

