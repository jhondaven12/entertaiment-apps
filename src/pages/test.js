import { useEffect, useState } from "react";

async function getData() {
  const res = await fetch('http://localhost:4000/movie')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData()
        setData(result)
      } catch (error) {
        console.error(error)
      }
    };

    fetchData();
  }, []);

  if (data === null) {
    return <p>Loading...</p>
  }
  return (
    <>
      <h1>Helo World</h1>
      {data.map((item, index) => (
        <p key={index}>{item.title}</p>
      ))}
    </>
  )
}