import axios from "axios";
import {
	IDynamoDBMusicItem,
	IDynamoDBPhotoItem,
	IDynamoDBResponse,
	IMusicItem,
	IPhotoItem,
} from "./interfaces";

const API_URL = "https://um62dngkq4.execute-api.eu-central-1.amazonaws.com/prod";

const awsDynamoDBScanMusicAction = {
	TableName: "music-list",
	ReturnConsumedCapacity: "TOTAL",
};

const awsDynamoDBScanPhotoAction = {
	TableName: "photo-list",
	ReturnConsumedCapacity: "TOTAL",
};

const headers = {
	"Content-Type": "application/json",
};

export const fetchMusicList = async (): Promise<IMusicItem[]> => {
	const result = await axios.post<IDynamoDBResponse<IDynamoDBMusicItem>>(
		`${API_URL}/music`,
		awsDynamoDBScanMusicAction,
		{ headers }
	);

	if (!result || !result.data.Items) {
		return [];
	}

	return result.data.Items.map<IMusicItem>((item) => ({
		id: Number(item.id.N),
		name: String(item.name.S),
		url: String(item.url.S),
		desc: String(item.desc.S),
		duration: String(item.duration.S),
	}));
};

export const fetchPhotoList = async (): Promise<IPhotoItem[]> => {
	const result = await axios.post<IDynamoDBResponse<IDynamoDBPhotoItem>>(
		`${API_URL}/photo`,
		awsDynamoDBScanPhotoAction,
		{ headers }
	);

	if (!result || !result.data.Items) {
		return [];
	}

	return result.data.Items.map<IPhotoItem>((item) => ({
		id: Number(item.id.N),
		header: String(item.header.S),
		url: String(item.url.S),
	}));
};
