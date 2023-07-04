import Head from "next/head";
import Image from "next/image";
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
      <Head>
        <meta name="entertaiment-apps" property="entertaiment-apps" content="entertaiment-apps" key="entertaiment-apps"/>
      </Head>

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
          <AllList searchTerm={searchTerm}/>
        </div>
    </>
  )
}

export default Page;


