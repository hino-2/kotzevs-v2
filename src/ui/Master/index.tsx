import "./style.css";

export const Master = ({ headerElem }: { headerElem: HTMLElement | null }) => {
	if (headerElem) headerElem.innerHTML = "мой хозяин лучший он меня кормит";

	return (
		<div>
			<div className="master-card" />
			<div className="master-card-text">
				<div>
					<h3>Игорь Ушаков</h3>
				</div>
				<div>хозяин Зевса</div>
				<div style={{ marginTop: "50px" }}>
					<a
						href="tg://resolve?domain=hino_2"
						style={{ textDecoration: "none", color: "#0558b2" }}>
						<i className="fa fa-telegram"></i> @hino_2
					</a>
				</div>
				<div style={{ marginTop: "5px" }}>
					<a
						href="mailto:sinigami0@gmail.com?subject=котзевс.рф"
						style={{ textDecoration: "none", color: "#0558b2" }}>
						<i className="fa fa-envelope"></i> sinigami0@gmail.com
					</a>
				</div>
			</div>
		</div>
	);
};
