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
		description,
		buttons,
		items,
		iconImage,
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
				(_, buttonIndex) => buttonIndex !== index
			),
		});
	};


	const updateItem = (index, key, value) => {
		const newItems = [...items];

		newItems[index] = {
			...newItems[index],
			[key]: value,
		};

		setAttributes({
			items: newItems,
		});
	};


	const addItem = () => {
		setAttributes({
			items: [
				...items,
				{
					title: 'New Item',
					description: 'Item description',
				},
			],
		});
	};


	const removeItem = (index) => {
		setAttributes({
			items: items.filter(
				(_, itemIndex) => itemIndex !== index
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
					title="Items"
					initialOpen={false}
				>

					{items.map((item, index) => (

						<div
							key={index}
							style={{
								marginBottom: '24px',
								paddingBottom: '24px',
								borderBottom: '1px solid #ddd',
							}}
						>

							<TextControl
								label={`Item ${index + 1} Title`}
								value={item.title}
								onChange={(value) =>
									updateItem(
										index,
										'title',
										value
									)
								}
							/>

							<TextareaControl
								label="Description"
								value={item.description}
								onChange={(value) =>
									updateItem(
										index,
										'description',
										value
									)
								}
							/>

							<Button
								isDestructive
								variant="secondary"
								onClick={() =>
									removeItem(index)
								}
							>
								Remove Item
							</Button>

						</div>

					))}


					<Button
						variant="primary"
						onClick={addItem}
					>
						Add Item
					</Button>

				</PanelBody>

			</InspectorControls>



			<section {...useBlockProps()}>

				<div className="top-section">

					<div className="top-presentation">

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



					<div className="top-details">

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
										iconImage: {
											id: media.id,
											url: media.url,
											alt: media.alt,
										},
									})
								}
								allowedTypes={[
									'image'
								]}
								value={iconImage?.id}
								render={({ open }) => (

									<div>

										{iconImage?.url ? (

											<>
												<img
													src={iconImage.url}
													alt={iconImage.alt}
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

				</div>



				<div className="bottom-section">

					{items.map((item, index) => (

						<div
							className="item"
							key={index}
						>

							<h3>
								{item.title}
							</h3>


							<p>
								{item.description}
							</p>

						</div>

					))}

				</div>

			</section>

		</>
	);
}