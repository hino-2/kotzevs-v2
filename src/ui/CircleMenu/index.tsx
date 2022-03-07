import { useCallback, useEffect, useMemo, useState } from "react";
import "./style.scss";
import { Photos } from "../Photos";
import { Music } from "../Music";
import Player from "../Music/player"; // чтобы тормозить музон при показе меню
import { Master } from "../Master";

enum MenuMode {
	Menu,
	Photos,
	Music,
	Master,
}

const calcX = () => (410 * window.innerWidth) / 1200 - 5;
const calcY = () => (335 * window.innerWidth) / 1200 - 10;

export const CircleMenu = () => {
	const header = useMemo(() => "привет я Зевс плз нажми на нос", []);
	const headerElem = useMemo(() => document.getElementById("header"), []);

	const [mode, setMode] = useState(MenuMode.Menu);
	const [width, setWidth] = useState(window.innerWidth);
	const [xMenu, setXMenu] = useState(calcX());
	const [yMenu, setYMenu] = useState(calcY());

	const updateMenuPosition = useCallback(() => {
		if (window.innerWidth !== width) {
			setXMenu(calcX());
			setYMenu(calcY());
			setWidth(window.innerWidth);
		}
	}, [width]);

	useEffect(() => {
		updateMenuPosition();

		window.addEventListener("resize", updateMenuPosition);

		if (headerElem) headerElem.innerHTML = header;

		return () => {
			window.removeEventListener("resize", updateMenuPosition);
		};
	}, [header, headerElem, updateMenuPosition]);

	const showMenu = () => {
		setMode(MenuMode.Menu);

		if (headerElem) headerElem.innerHTML = header;

		if (mode === MenuMode.Music) Player.pause();
	};

	const setMenuMode = useCallback(
		(mode: MenuMode) => () => {
			setMode(mode);
		},
		[]
	);

	if (mode === MenuMode.Photos) {
		return (
			<div>
				<div className="close-button">
					<button onClick={showMenu}>
						<i className="fa fa-times"></i>
					</button>
				</div>
				<div>
					<Photos headerElem={headerElem} />
				</div>
			</div>
		);
	}

	if (mode === MenuMode.Music) {
		return (
			<div>
				<div className="close-button">
					<button onClick={showMenu}>
						<i className="fa fa-times"></i>
					</button>
				</div>
				<div>
					<Music headerElem={headerElem} />
				</div>
			</div>
		);
	}

	if (mode === MenuMode.Master) {
		return (
			<div>
				<div className="close-button">
					<button onClick={showMenu}>
						<i className="fa fa-times"></i>
					</button>
				</div>
				<div>
					<Master headerElem={headerElem} />
				</div>
			</div>
		);
	}

	return (
		<div>
			<nav
				className="menu"
				style={{ "--x": xMenu + "px", "--y": yMenu + "px" } as React.CSSProperties}>
				<input type="checkbox" className="menu-open" name="menu-open" id="menu-open" />
				<label className="menu-open-button" htmlFor="menu-open">
					<span className="hamburger hamburger-1"></span>
					<span className="hamburger hamburger-2"></span>
					<span className="hamburger hamburger-3"></span>
				</label>

				<button onClick={setMenuMode(MenuMode.Music)} className="menu-item">
					{" "}
					<i className="fa fa-microphone"></i>{" "}
				</button>
				<button
					onClick={() => {
						window.location.href = "tg://resolve?domain=Zeus_catbot";
					}}
					className="menu-item">
					{" "}
					<i className="fa fa-telegram"></i>{" "}
				</button>
				<button className="menu-item" style={{ display: "none" }}></button>
				<button onClick={setMenuMode(MenuMode.Master)} className="menu-item">
					{" "}
					<i className="fa fa-user"></i>{" "}
				</button>
				<button className="menu-item" style={{ display: "none" }}></button>
				<button onClick={setMenuMode(MenuMode.Photos)} className="menu-item">
					{" "}
					<i className="fa fa-camera-retro"></i>{" "}
				</button>
			</nav>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<defs>
					<filter id="shadowed-goo">
						<feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
							result="goo"
						/>
						<feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
						<feColorMatrix
							in="shadow"
							mode="matrix"
							values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
							result="shadow"
						/>
						<feOffset in="shadow" dx="1" dy="1" result="shadow" />
						<feComposite in2="shadow" in="goo" result="goo" />
						<feComposite in2="goo" in="SourceGraphic" result="mix" />
					</filter>
					<filter id="goo">
						<feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
							result="goo"
						/>
						<feComposite in2="goo" in="SourceGraphic" result="mix" />
					</filter>
				</defs>
			</svg>
		</div>
	);
};
