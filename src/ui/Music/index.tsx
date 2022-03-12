import { useCallback, useState } from "react";
import "./style.scss";
import Player from "./player";
import { useEffect } from "react";
import { fetchMusicList } from "../../API";
import { IMusicItem } from "../../API/interfaces";

const calcX = () => (410 * window.innerWidth) / 1200 - 285;
const calcY = () => (335 * window.innerWidth) / 1200 - 335;

export const Music = ({ headerElem }: { headerElem: HTMLElement | null }) => {
	const [xMenu, setXMenu] = useState(calcX());
	const [yMenu, setYMenu] = useState(calcY());
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [musicList, setMusicList] = useState<IMusicItem[]>([]);
	const [width, setWidth] = useState(window.innerWidth);

	const updateMusicPosition = useCallback(() => {
		if (window.innerWidth !== width) {
			setXMenu(calcX());
			setYMenu(calcY());
			setWidth(window.innerWidth);
		}
	}, [width]);

	useEffect(() => {
		fetchMusicList().then((musicList) => {
			setMusicList(musicList.sort((a, b) => a.id - b.id) ?? []);
		});
	}, []);

	useEffect(() => {
		Player.init(musicList[0]);

		if (headerElem) headerElem.innerHTML = musicList?.[0]?.name ?? "";

		window.addEventListener("resize", updateMusicPosition);
		updateMusicPosition();

		return () => {
			window.removeEventListener("resize", updateMusicPosition);
		};
	}, [headerElem, musicList, updateMusicPosition]);

	const loadTrack = useCallback(
		(id: number) => () => {
			const currentSongIndexElem = document.getElementById(`loading${currentSongIndex}`);

			if (
				id >= 0 &&
				id < musicList.length &&
				currentSongIndexElem?.innerHTML === "" &&
				currentSongIndex !== id
			) {
				setCurrentSongIndex(id);

				if (headerElem) headerElem.innerHTML = musicList?.[id]?.name ?? "";

				Player.pause();
				Player.init(musicList[id]);
			}
		},
		[currentSongIndex, headerElem, musicList]
	);

	return (
		<div>
			<link
				href="https://fonts.googleapis.com/css?family=Roboto:100"
				rel="stylesheet"
				type="text/css"
			/>
			<div
				className="player"
				style={{ "--x": xMenu + "px", "--y": yMenu + "px" } as React.CSSProperties}>
				<canvas></canvas>
				<div className="song">
					<div className="name" id="songName"></div>
				</div>
				<div className="time">00:00</div>
				<div className="playarea">
					<div className="prevSong" onClick={loadTrack(currentSongIndex - 1)}></div>
					<div className="play"></div>
					<div className="pause"></div>
					<div className="nextSong" onClick={loadTrack(currentSongIndex + 1)}></div>
				</div>
				<div className="soundControl"></div>
			</div>
			<div>
				<ul className="songList">
					{(musicList ?? []).map((song) => (
						<li key={song.id} className="song-list-item" onClick={loadTrack(song.id)}>
							<div className="songID">{song.id + 1}</div>
							<div className="songName">{song.name}</div>
							<div className="songDuration">{song.duration}</div>
							<div className="songDuration" id={`loading${song.id}`}></div>
							<div className="songDesc">{song.desc}</div>
							<div />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
