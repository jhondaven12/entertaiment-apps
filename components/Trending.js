import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

function Trending({ imageInfo, imageUrlMobile, imageUrlDesktop, handleToggleBookmark }){
    const [windowWidth, setWindowWidth] = useState(0);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsWideScreen(windowWidth >= 992);
    }, [windowWidth]);

    //Change image depends on screen size
    const getImageUrl = () => {
        if(isWideScreen){
            return imageUrlDesktop;
        } else {
            return imageUrlMobile;
        };
    }

    //Change category icon
    const imageCategory = () => {
        if (imageInfo.category === "Movie") {
            return "/assets/icon-category-movie.svg";
        } else {
            return "/assets/icon-category-tv.svg";
        }
    }

    const handleBookmarkToggle = () => {
        handleToggleBookmark(imageInfo.title)
    }
    
    return (
        <>
            <figure>
                <div className="overlay">
                    <div className="icon-play">
                        <div className="image-wrapper">
                            <Image
                                src="/assets/icon-play.svg"
                                alt="play"
                                fill={true}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>

                        <span>Play</span>
                    </div>
                </div>

                <div className="movie-image">
                    <Image
                        src={getImageUrl()}
                        alt={imageInfo.title}
                        fill={true}
                        priority={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <div className="info-container">
                    <div className="info">
                        <ul>
                            <li>{imageInfo.year}</li>

                            <li>
                                <Image
                                    src={imageCategory()}
                                    alt={imageInfo.title}
                                    width={15}
                                    height={15}
                                />
                                {imageInfo.category}
                            </li>
                        </ul>

                        <h3>{imageInfo.title}</h3>
                    </div>

                    <div className="rating">
                        <h3>{imageInfo.rating}</h3>
                    </div>
                </div>

                <div className="save-icon">
                    {session && status == "authenticated" && (
                        <button onClick={handleBookmarkToggle}>
                            <div>
                                <Image
                                    src={imageInfo.isBookmarked ? "/assets/icon-bookmark-full.svg" : "/assets/icon-bookmark-empty.svg"}
                                    alt="save-icon"
                                    fill={true}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </button>
                    )}

                    {!session && status == "unauthenticated" && (
                        <button onClick={e => {
                            e.preventDefault()
                            signIn()
                        }}>
                            <div>
                                <Image
                                    src={imageInfo.isBookmarked ? "/assets/icon-bookmark-full.svg" : "/assets/icon-bookmark-empty.svg"}
                                    alt="save-icon"
                                    fill={true}
                                />
                            </div>
                        </button>
                    )}
                </div>
            </figure>
        </>
    )
}

export default Trending;