import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AllBookmark from "./AllBookmark";
import Loading from "../../../components/loading";

function Bookmark(){
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const { data: session, status } = useSession();

    useEffect(() => {
        const { query } = router;
        const { search } = query;
        
        if(search){
           return setSearchTerm(search);
        }
    }, [router]);

    if(status === 'loading'){
        return <Loading/>
    }

    if(status === 'unauthenticated'){
        return router.push('/api/auth/signin')
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const inputValue = event.target.search.value;
        setSearchTerm(inputValue);
        inputValue === '' || null ? router.push('/bookmark') : router.push(`/bookmark?search=${encodeURIComponent(inputValue)}`) 
    };

    return (
        <>
            <form onSubmit={handleSearch}>
                <label htmlFor="search">
                    <div>
                        <Image
                            src="/assets/icon-search.svg"
                            alt="search"
                            fill={true}
                        />
                    </div>

                    <input
                        type="search"
                        id="search"
                        name="search"
                        placeholder="Seach for movies or TV series"
                        defaultValue={searchTerm}
                    />
                </label>
            </form>

            <div className="content-container">
                <AllBookmark searchTerm={searchTerm} />
            </div>
        </>
    )
}

export default Bookmark;
