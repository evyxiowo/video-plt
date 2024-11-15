import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavourites";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession} from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const {data: movies = [] } = useMovieList()
  const {data: favorites = [] } = useFavorites()

  return (
    <>
    <Navbar/>
    <Billboard/>
    <div className="pb-40">
    <MovieList title="Trending Now" data={movies}/>
    <MovieList title="My List" data={favorites}/>

    </div>
    </>
  )
}
//   const { data: user, isLoading } = useCurrentUser(); // Added loading state

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//     } catch (error) {
//       console.error("Error signing out:", error); // Handle potential errors
//     }
//   };

//   if (isLoading) {
//     return <p className="text-white">Loading...</p>; // Display loading state
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl text-green-500 mb-4">Netflix Clone</h1>
//       <p className="text-white mb-4">
//         {user ? `Logged in as: ${user?.email}` : "No user data available"}
//       </p>
//       <button
//         className="h-10 px-6 bg-white text-black rounded hover:bg-gray-300 transition-colors"
//         onClick={handleSignOut}
//       >
//         Log Out
//       </button>
//     </div>
//   );
// }
