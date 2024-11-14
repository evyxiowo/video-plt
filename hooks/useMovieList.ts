import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovieList = () => {
    const { data, error, isLoading } = useSWR('/api/movies', fetcher,{
        // Fetch movies from the API and cache the response
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateInterval: 60 * 60 * 1000, // Cache response for 1 hour
        revalidateOnReconnect: false, 
    });

    return {
        data,
        error,
        isLoading
    }
}

export default useMovieList;