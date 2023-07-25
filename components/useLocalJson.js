import axios from "axios";
import { useEffect, useState } from "react";

function useLocalJson() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const token = process.env.GITHUB_TOKEN;
                const headers = {
                    Authorization: `token ${token}`,
                    'Content-Type': 'application/json',
                }
                const response = await axios.get('https://jhondaven12.github.io/entertaimentApi/movie.json');
                setData(response.data.movie);
                sessionStorage.setItem('localJsonData', JSON.stringify(response.data.movie));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const storedData = sessionStorage.getItem('localJsonData');

        if(storedData) {
            setData(JSON.parse(storedData));
            setLoading(false);
        } else {
            fetchData();
        }
    }, []);

    const handleToggleBookmark = (title) => {
        setData((prevData) => {
            const updatedData = prevData.map((item) => {
                if(item.title === title){
                    return {
                        ...item,
                        isBookmarked: !item.isBookmarked,
                    };
                }
                return item;
            });

            sessionStorage.setItem('localJsonData', JSON.stringify(updatedData));
            return updatedData;
        });
    };

    return { data, loading, error, handleToggleBookmark };
}

export default useLocalJson;
