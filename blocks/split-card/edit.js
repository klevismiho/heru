import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	TextareaControl,
	CheckboxControl,
	Button,
} from '@wordpress/components';


export default function Edit({ attributes, setAttributes }) {

	const {
		eyebrow,
		title,
		subtitle,
		description,
		listItems,
		buttons,
		image,
	} = attributes;


	const updateButton = (index, key, value) => {

		const newButtons = [...buttons];

		newButtons[index] = {
			...newButtons[index],
			[key]: value,
		};

		setAttributes({
			buttons: newButtons,
		});
	};


	const addButton = () => {

		setAttributes({
			buttons: [
				...buttons,
				{
					text: 'New Button',
					url: '#',
					outlined: false,
				},
			],
		});

	};


	const removeButton = (index) => {

		setAttributes({
			buttons: buttons.filter(
				(_, buttonIndex) =>
					buttonIndex !== index
			),
		});

	};



	const updateListItem = (index, value) => {

		const newItems = [...listItems];

		newItems[index] = value;

		setAttributes({
			listItems: newItems,
		});

	};


	const addListItem = () => {

		setAttributes({
			listItems: [
				...listItems,
				'New test item',
			],
		});

	};


	const removeListItem = (index) => {

		setAttributes({
			listItems: listItems.filter(
				(_, itemIndex) =>
					itemIndex !== index
			),
		});

	};



	return (
		<>

			<InspectorControls>


				<PanelBody
					title="Buttons"
					initialOpen={false}
				>

					{buttons.map((button, index) => (

						<div
							key={index}
							style={{
								marginBottom: '24px',
								paddingBottom: '24px',
								borderBottom: '1px solid #ddd',
							}}
						>

							<TextControl
								label={`Button ${index + 1} Text`}
								value={button.text}
								onChange={(value) =>
									updateButton(
										index,
										'text',
										value
									)
								}
							/>


							<TextControl
								label="URL"
								value={button.url}
								onChange={(value) =>
									updateButton(
										index,
										'url',
										value
									)
								}
							/>


							<CheckboxControl
								label="Outlined"
								checked={button.outlined}
								onChange={(value) =>
									updateButton(
										index,
										'outlined',
										value
									)
								}
							/>


							<Button
								isDestructive
								variant="secondary"
								onClick={() =>
									removeButton(index)
								}
							>
								Remove Button
							</Button>

						</div>

					))}


					<Button
						variant="primary"
						onClick={addButton}
					>
						Add Button
					</Button>


				</PanelBody>



				<PanelBody
					title="Tests"
					initialOpen={false}
				>

					{listItems.map((item, index) => (

						<div
							key={index}
							style={{
								marginBottom: '20px',
								paddingBottom: '20px',
								borderBottom: '1px solid #ddd',
							}}
						>

							<TextControl
								label={`Test ${index + 1}`}
								value={item}
								onChange={(value) =>
									updateListItem(
										index,
										value
									)
								}
							/>


							<Button
								isDestructive
								variant="secondary"
								onClick={() =>
									removeListItem(index)
								}
							>
								Remove Test
							</Button>


						</div>

					))}


					<Button
						variant="primary"
						onClick={addListItem}
					>
						Add Test
					</Button>


				</PanelBody>


			</InspectorControls>



			<section {...useBlockProps()}>


				<div className="section-presentation">


					<div className="section-left">


						<RichText
							tagName="div"
							className="section-eyebrow"
							value={eyebrow}
							onChange={(value) =>
								setAttributes({
									eyebrow: value,
								})
							}
							placeholder="Add eyebrow..."
						/>


						<RichText
							tagName="h2"
							className="section-title"
							value={title}
							onChange={(value) =>
								setAttributes({
									title: value,
								})
							}
							placeholder="Add title..."
						/>


						<RichText
							tagName="h3"
							value={subtitle}
							onChange={(value) =>
								setAttributes({
									subtitle: value,
								})
							}
							placeholder="Add subtitle..."
						/>



						<ul>

							{listItems.map((item, index) => (

								<li key={index}>
									{item}
								</li>

							))}

						</ul>


					</div>



					<div className="wp-block-buttons">

						{buttons.map((button, index) => (

							<div
								key={index}
								className={
									button.outlined
										? "wp-block-button is-style-outline"
										: "wp-block-button"
								}
							>

								<a
									className="wp-block-button__link wp-element-button"
									href={button.url}
								>
									{button.text}
								</a>


							</div>

						))}


					</div>


				</div>



				<div className="section-details">


					<RichText
						tagName="p"
						value={description}
						onChange={(value) =>
							setAttributes({
								description: value,
							})
						}
						placeholder="Add description..."
					/>



					<MediaUploadCheck>

						<MediaUpload
							onSelect={(media) =>
								setAttributes({
									image: {
										id: media.id,
										url: media.url,
										alt: media.alt,
									},
								})
							}
							allowedTypes={[
								'image'
							]}
							value={image?.id}
							render={({ open }) => (

								<div>

									{image?.url ? (

										<>

											<img
												src={image.url}
												alt={image.alt}
											/>


											<Button
												variant="secondary"
												onClick={open}
											>
												Replace Image
											</Button>

										</>

									) : (

										<Button
											variant="primary"
											onClick={open}
										>
											Select Image
										</Button>

									)}

								</div>

							)}
						/>

					</MediaUploadCheck>


				</div>


			</section>

		</>
	);
}