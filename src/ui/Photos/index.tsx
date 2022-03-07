import { useState, useEffect, useCallback } from "react";
import aws from "aws-sdk";
import "./style.css";
import { dbClient } from "../../aws/init";

export const Photos = ({ headerElem }: { headerElem: HTMLElement | null }) => {
	const [photoList, setPhotoList] = useState<aws.DynamoDB.DocumentClient.ItemList>([]);

	useEffect(() => {
		dbClient.scan({ TableName: "photo-list" }, (err, data) => {
			if (err) console.log(err);

			const sortedData = data?.Items?.sort((a, b) => a.id - b.id) ?? [];

			if (headerElem) headerElem.innerHTML = sortedData[0].header ?? "";

			setPhotoList(sortedData);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const photosBtnClick = useCallback(
		(id: number) => {
			if (photoList[id - 1])
				setTimeout(() => {
					if (headerElem) headerElem.innerHTML = photoList[id - 1].header ?? "";
				}, 500);
		},
		[headerElem, photoList]
	);

	return (
		<section className="carousel" aria-label="Gallery">
			<ol className="carousel__viewport">
				{photoList.map((photo) => (
					<li
						key={photo.id}
						id={"carousel__slide" + parseInt(photo.id)}
						tabIndex={0}
						className="carousel__slide">
						<div className="carousel__snapper">
							<img src={photo.url} className="photo" alt="" />
							<a
								href={
									"#carousel__slide" +
									(photo.id - 1 < 1 ? photoList.length : photo.id - 1)
								}
								className="carousel__prev"
								onClick={() => {
									photosBtnClick(
										photo.id - 1 < 1 ? photoList.length : photo.id - 1
									);
								}}>
								{/* <font style={{ color: "transparent" }}>a</font> */}
							</a>
							<a
								href={
									"#carousel__slide" +
									(photo.id + 1 > photoList.length ? "1" : photo.id + 1)
								}
								className="carousel__next"
								onClick={() => {
									photosBtnClick(
										photo.id + 1 > photoList.length ? "1" : photo.id + 1
									);
								}}>
								{/* <font style={{ color: "transparent" }}>a</font> */}
							</a>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
};
