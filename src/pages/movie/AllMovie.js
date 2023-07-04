import useLocalJson from "../../../components/useLocalJson";
import Regular from "../../../components/Regular";
import Loading from "../../../components/loading";


function AllMovie({ searchTerm }) {
    const { data, loading, error , handleToggleBookmark } = useLocalJson();

    if (loading) {
        return <Loading/>
    }

    if (error) {
        return <h1>Error: {error.message}</h1>
    }

    const filteredMovie = data.filter(item => item.category === 'Movie');

    const filteredData = filteredMovie.filter(
        item => item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSearchResult = searchTerm && filteredData.length > 0;

    if (handleSearchResult) {
        return (
            <>
                <section className="regular-container">
                    <header>
                        <h1>Found {filteredData.length} Results for &#34;{searchTerm}&#34;</h1>
                    </header>

                    <div className="regular-list">
                        <ul>
                            {filteredData.map((item, index) => (
                                <Regular
                                    key={index}
                                    imageInfo={item}
                                    imageUrlSmall={item.thumbnail.regular.small}
                                    imageUrlMedium={item.thumbnail.regular.medium}
                                    imageUrlLarge={item.thumbnail.regular.large}
                                    handleToggleBookmark={() => handleToggleBookmark(item.title)}
                                />
                            ))}
                        </ul>
                    </div>
                </section>
            </>
        )
    }

    if (searchTerm && !handleSearchResult) {
        return (
            <>
                <section className="regular-container">
                    <header>
                        <h1>No results found for &#34;{searchTerm}&#34;</h1>
                    </header>
                </section>
            </>
        )
    }

    return (
        <>
            <section className="regular-container">
                <header>
                    <h1>Movies</h1>
                </header>

                <div className="regular-list">
                    <ul>
                        {filteredMovie.map((item, index) => (
                            <Regular
                                key={index}
                                imageInfo={item}
                                imageUrlSmall={item.thumbnail.regular.small}
                                imageUrlMedium={item.thumbnail.regular.medium}
                                imageUrlLarge={item.thumbnail.regular.large}
                                handleToggleBookmark={() => handleToggleBookmark(item.title)}
                            />
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}


export default AllMovie;