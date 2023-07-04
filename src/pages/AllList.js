import useLocalJson from '../../components/useLocalJson';
import Trending from '../../components/Trending';
import Regular from '../../components/Regular';
import Loading from '../../components/loading';

function AllList({ searchTerm }) {
    const { data, loading, error, handleToggleBookmark } = useLocalJson();

    if (loading) {
        return <Loading/>
    }

    if (error) {
        return <h1>Error: {error.message}</h1>
    }

    const trendFiltered = data.filter(item => item.isTrending === true);
    const regularFiltered = data.filter(item => item.isTrending === false);

    const filteredData = data.filter(
        item => item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            <section className='trending-container'>
                <div className='trending'>
                    <h1>Trending</h1>
                    <div className='trending-list' id='scrollbar'>
                        {trendFiltered.map((item, index) => (
                            <Trending
                                key={index}
                                imageInfo={item}
                                imageUrlMobile={item.thumbnail.trending.small}
                                imageUrlDesktop={item.thumbnail.trending.large}
                                handleToggleBookmark={() => handleToggleBookmark(item.title)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className='regular-container'>
                <header>
                    <h1>Recommended for you</h1>
                </header>

                <div className='regular-list'>
                    <ul>
                        {regularFiltered.map((item, index) => (
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

export default AllList;

  