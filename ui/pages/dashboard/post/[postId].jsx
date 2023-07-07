// import axios from "axios";

// export default function Avatars({post}) {
//   console.log(post);
//   return (
//     <div>
//       <h1>Avatars</h1>
//       <p>All of the Avatars that appeared in the show:</p>
//       <ul>
//         <li>Aang</li>
//       </ul>
//     </div>
//   )
// }

// // export async function getStaticProps(){
// //   const res = await axios.get(`https://dummyjson.com/products?limit=10`)
// //   const data = res.data
// //   console.log(data)

// //   return{
// //       props:{
// //           products: data
// //       }
// //   }
// // }

// export async function getStaticProps({ params }) {
//   const api_url = process.env.NEXT_PUBLIC_API_URL;

//   const postId = params.postId.replace(/\-/g, '+')
//   const results = await axios.get(`${api_url}/api/blog/post/${postId}`);
//   return {
//     props: {
//       post: results[0]
//     }
//   }
// }

// export async function getStaticPaths() {
//   const api_url = process.env.NEXT_PUBLIC_API_URL;

//   const res = await axios.get(`${api_url}/api/blog/post`).then((res) => {
//     return res
//   })
//   const paths = res.map(post => ({
//       params: {
//         postId: post._id
//       }
//   }));
  
//   console.log(posts)
//   return {
//     paths,
//     fallback: false
//   }
// }