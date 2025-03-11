import Link from "next/link";
import { db } from "~/server/db"
import { getMyImages } from "~/server/queries"

// const mockUrls = [
// "https://utfs.io/f/15ec9275-0827-4adf-a383-d9409b911b3a-1jqe77.jpg",
// "https://utfs.io/f/734144b2-b540-4099-8b9a-9b5b3f4b7f02-24vw.jpg",
// "https://utfs.io/f/a46038db-428e-4124-9a73-ad2d0329291a-1ta9k.jpg",
// "https://utfs.io/f/5d8e35a8-16a7-40c3-a4fb-574712927e3c-b3dzdh.jpg",
// "https://utfs.io/f/386224fe-11ca-43b6-9f92-200b17442d15-1r5ov0.jpg",
// "https://utfs.io/f/be3a7841-0376-44c2-a9f2-d16325b4a03d-23ti.jpg",
// ];

// const mockImages = mockUrls.map((url, index) => ({
//   url,  
//   id: index + 1,
// }))

//    export default async function HomePage() {
//     const images = await db.query.images.findMany()
    
//     return (
//       <main className="">
//         <div className="flex flex-wrap gap-40">
//           {images.map((image) => (
//             <div key={image.id} className="w-48">
//               <img src={image.url} className="w-48 h-48"/>
//               <div>{image.name}</div>
//             </div>
//           ))}
//         </div>
//       </main>
//     );
//  }

 
// export default async function HomePage() {
//   const images = await getMyImages().catch((error) => {
//     console.error(error);
//     return null;
//   });
//   console.log(images);
//    return (
//      <main className="">
//        <div className="flex flex-wrap gap-4">
//          {images?.map((image, index) => (
//            <div key={image.id} className="w-48">
//                <div className="card bg-base-100 w-70 shadow-xl">
//                   <div className="card-body">
//                     <h2 className="card-title">{image.id}</h2>
//                   </div>
//                   <figure>
//                     <img src={image.url} className="w-48 h-48" />
//                   </figure>
//                 </div>
//            </div>
//          ))}
//        </div>
//      </main>
//    );
//   }

"use client";

import { useState, ChangeEvent } from "react";

type ReturnData = {
  message: string;
  error?: string;
};

export default function HomePage() {
  const [text, setText] = useState<string>(""); // To track the input text
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state
  const [error, setError] = useState<string | null>(null); // To show any error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // To show success message

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = async () => {
    if (text.trim() === "") {
      alert("Please enter some text.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch("/api/upload-stuff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Use JSON for request body
        },
        body: JSON.stringify({
          content: text,
        }),
      });

      const data = await response.json() as ReturnData;

      if (response.ok) {
        setSuccessMessage(data.message); // Show success message
        setText(""); // Clear input
        setError(null); // Reset error state
      } else {
        setError(data.error || "An unknown error occurred");
      }
    } catch (error) {
      console.error("Error uploading text:", error);
      setError("An error occurred while uploading the text.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Upload Text</h1>
        
        {/* Display any error message */}
        {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}

        {/* Display success message */}
        {successMessage && <div className="alert alert-success mb-4"><span>{successMessage}</span></div>}

        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text here"
          className="input input-bordered w-full mb-4"
        />

        <button 
          onClick={handleButtonClick}
          className="btn btn-primary w-full"
          disabled={loading} // Disable button during loading
        >
          {loading ? "Uploading..." : "Upload Text"}
        </button>
      </div>
    </main>
  );
}