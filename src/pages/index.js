import Image from "next/image";
import SearchIcon from "../../public/assets/icon-search.svg"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AllList from "./AllList";

function Page() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const { query } = router;
        const { search } = query;

        if (search) {
            setSearchTerm(search);
        }
    }, [router]);

    const handleSearch = (event) => {
        event.preventDefault();
        const inputValue = event.target.search.value;
        setSearchTerm(inputValue);
        inputValue === '' || null ? router.push('') : router.push(`/?search=${encodeURIComponent(inputValue)}`);
    };

  return (
    <>
      <form onSubmit={handleSearch}>
        <label htmlFor="search">
          <div>
            <Image
              src={SearchIcon}
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
          <AllList searchTerm={searchTerm}/>
        </div>
    </>
  )
}

export default Page;


