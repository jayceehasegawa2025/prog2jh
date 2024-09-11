import Link from "next/link";

const mockUrls = [
"https://utfs.io/f/15ec9275-0827-4adf-a383-d9409b911b3a-1jqe77.jpg",
"https://utfs.io/f/734144b2-b540-4099-8b9a-9b5b3f4b7f02-24vw.jpg",
"https://utfs.io/f/a46038db-428e-4124-9a73-ad2d0329291a-1ta9k.jpg",
"https://utfs.io/f/5d8e35a8-16a7-40c3-a4fb-574712927e3c-b3dzdh.jpg",
"https://utfs.io/f/386224fe-11ca-43b6-9f92-200b17442d15-1r5ov0.jpg",
"https://utfs.io/f/be3a7841-0376-44c2-a9f2-d16325b4a03d-23ti.jpg"
];

const mockImages = mockUrls.map((url, index) => ({
  url,  
  id: index + 1,
}))

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{image.id}</h2>
            </div>
            <figure>
              <img src={image.url} />
            </figure>
          </div>
        ))}
      </div>
    </main>
  );
}


// export default function HomePage() {
//   return (
//     <main className="">
//       <div className="flex flex-wrap gap-4">
//         {mockImages.map((image) => (
//           <div key={image.id} className="w-48">
//             <img src={image.url} />
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
