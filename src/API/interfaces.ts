export interface IDynamoDBResponse<T> {
	Count: number;
	Items: T[];
}

export interface IDynamoDBMusicItem {
	id: Record<string, string>;
	url: Record<string, string>;
	name: Record<string, string>;
	duration: Record<string, string>;
	desc: Record<string, string>;
}

export interface IMusicItem {
	id: number;
	url: string;
	name: string;
	duration: string;
	desc: string;
}

export interface IDynamoDBPhotoItem {
	id: Record<string, string>;
	url: Record<string, string>;
	header: Record<string, string>;
}

export interface IPhotoItem {
	id: number;
	url: string;
	header: string;
}
