export interface Post {
    id: number;
    title: string;
    desc: string;
    img: string;
    date: Date;
    cat: string;
    uid: number;
}
export interface FetchedSinglePost {
    id: number;
    title: string;
    desc: string;
    img: string;
    date: Date;
    uid: number;
    cat: string | null;
    username: string;
    userImg: string;
}