import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from "next/router";

function Navigation() {
    const router = useRouter();
    const { data : session, status } = useSession();

    return (
        <>
            <nav>
                <div className="nav-container">
                    <header>
                        <Link href="/">
                            <div>
                                <Image
                                    src="assets/logo.svg"
                                    alt="logo-icon"
                                    fill={true}
                                />
                            </div>
                        </Link>
                    </header>

                    <ul>
                        <li>
                            <Link href="/">
                                <div className={router.pathname === "/" ? 'activeLink' : ''}>
                                    <Image
                                        src="/assets/icon-nav-home.svg"
                                        alt="home-icon"
                                        fill={true}
                                    />
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/movie">
                                <div className={router.pathname === "/movie" ? 'activeLink' : ''}>
                                    <Image
                                        src="/assets/icon-nav-movies.svg"
                                        alt="movie-icon"
                                        fill={true}
                                    />
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/series">
                                <div className={router.pathname === "/series" ? 'activeLink' : ''}>
                                    <Image
                                        src="/assets/icon-nav-tv-series.svg"
                                        alt="movie-icon"
                                        fill={true}
                                    />
                                </div>
                            </Link>
                        </li>
                        {session && status == "authenticated" &&(
                            <li>
                            <Link href="/bookmark">
                                <div className={router.pathname === "/bookmark" ? 'activeLink' : ''}>
                                    <Image
                                        src="/assets/icon-nav-bookmark.svg"
                                        alt="movie-icon"
                                        fill={true}
                                    />
                                </div>
                            </Link>
                        </li>
                        )}
                    </ul>

                    <figure className="thumbnail">
                        {!session && status == "unauthenticated" && (
                            <button
                                onClick={e => {
                                    e.preventDefault()
                                    signIn('github')
                                }}>
                                <div className="user-profile">
                                    <Image
                                        src="/assets/image-avatar.png"
                                        alt="Profile Picture"
                                        fill={true}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={false}
                                    />
                                </div>
                            </button>
                        )}

                        {session && status == "authenticated" && (
                             <button
                             onClick={e => {
                                 e.preventDefault()
                                 signOut()
                             }}>
                             <div className="user-profile">
                                 <Image
                                     src={session.user.image}
                                     alt="avatar-icon"
                                     fill={true}
                                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                     priority={false}
                                 />
                             </div>
                         </button>
                        )}
                    </figure>
                </div>
            </nav>
        </>
    )
}

export default Navigation;
