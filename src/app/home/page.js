'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
//import './styles.css'; // Adjust the path if necessary

export default function Home() {
  const router = useRouter();
  const [mydata, setMydata] = useState([]);
  const [post, setPost] = useState({
    title: '',
    description: ''
  });

  const handleInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const submith = (event) => {
    event.preventDefault();
    axios.post('https://dummyjson.com/products/add', post)
      .then(response => {
        console.log("Item added:", response.data);
        // Add the new item to the mydata state
        setMydata([...mydata, response.data]);
        // Clear the input fields
        setPost({ title: '', description: '' });
      })
      .catch(err => console.log("Error:", err));
  };

  const deleteItem = (id) => {
    axios.delete(`https://dummyjson.com/products/${id}`)
      .then(response => {
        console.log("Item deleted:", response.data);
        // Update the mydata state to remove the deleted item
        setMydata(mydata.filter(item => item.id !== id));
      })
      .catch(err => console.log("Error:", err));
  };

  //authentication 
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth !== 'true') {
      router.push('/login');
    }
  }, [router]);

  // Fetch data only if authenticated
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth === 'true') {
      axios.get('https://dummyjson.com/products')
        .then((res) => setMydata(res.data.products))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  return (
    <main>
      <h1>Hiiiii</h1>
      {Array.isArray(mydata) && mydata.length > 0 ? (
        mydata.map((post) => {
          const { id, title, description } = post;
          return (
            <div className="card" key={id}>
              <h2>{title}</h2>
              <p>{description}</p>
              <button onClick={() => deleteItem(id)}>Delete</button>
            </div>
          );
        })
      ) : (
        <p>Loading or no data available</p>
      )}
      <form onSubmit={submith}>
        <label>
          Title: <input type="text" onChange={handleInput} name="title" value={post.title} required />
        </label>
        <label>
          Post: <input type="text" onChange={handleInput} name="description" value={post.description} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
