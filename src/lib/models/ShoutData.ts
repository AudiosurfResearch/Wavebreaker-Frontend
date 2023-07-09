import type { UserInfo } from "./UserData";

export type Shout = {
    id: number;
    authorId: number;
    songId: number;
    content: string;
    timeCreated: Date;
    author?: UserInfo;
};

export type GetSongShoutsResponse = {
    shouts: Shout[];
    totalCount: number;
};