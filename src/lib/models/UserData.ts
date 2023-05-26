export interface UserInfo {
	id: number;
	username: string;
	steamid64: string;
	steamid32: string;
	locationid: number;
	accountType: number;
	joinedAt: Date;
	avatarUrl: string;
}

export type Song = {
    id: number;
    title: string;
    artist: string;
}

export interface ExtendedUserInfo extends UserInfo {
	totalScore: number;
	totalPlays: number;
	favoriteCharacter?: number;
	favoriteSong?: Song;
}

export interface UserTokenResponse {
	token: string;
}