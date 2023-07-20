import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

function Regular({ imageInfo, imageUrlSmall, imageUrlMedium, imageUrlLarge, handleToggleBookmark }) { 
    const [windowWidth, setWindowWidth] = useState(0);
    const { data : session, status} = useSession();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getImageUrl = () => {
        if (windowWidth >= 1200) {
            return imageUrlLarge;
        } else if (windowWidth >= 992) {
            return imageUrlMedium;
        } else {
            return imageUrlSmall;
        }
    };

    const imageCategory = () => {
        if (imageInfo.category === "Movie") {
            return "/assets/icon-category-movie.svg";
        } else {
            return "/assets/icon-category-tv.svg";
        }
    };

    const handleBookmarkToggle = () => {
        handleToggleBookmark(imageInfo.title);
    }

    return (
        <>
            <li>
                <figure>
                    <div className="image-wrapper">
                        <Image
                            src={getImageUrl()}
                            alt={imageInfo.title}
                            fill={true}
                            priority={false}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

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
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </button>
                    )}

                    <div className="overlay">
                        <button className="icon-play">
                            <div>
                                <Image
                                    src="/assets/icon-play.svg"
                                    alt="icon-play"
                                    fill={true}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            Play
                        </button>
                    </div>
                </figure>

                <figcaption>
                    <dl>
                        <dt>{imageInfo.year}</dt>
                        <dt>
                            <Image
                                src={imageCategory()}
                                alt={imageInfo.title}
                                width={15}
                                height={15}
                            />
                            {imageInfo.category}
                        </dt>
                        <dt>{imageInfo.rating}</dt>
                    </dl>

                    <h3>{imageInfo.title}</h3>
                </figcaption>
            </li>
        </>
    );
}

export default Regular;
