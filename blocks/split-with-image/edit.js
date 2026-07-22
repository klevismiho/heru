import {
	useBlockProps,
	RichText,
	InspectorControls,
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
		title,
		description,
		buttons = [],
		image,
	} = attributes;


	const blockProps = useBlockProps();


	const updateButton = (index, field, value) => {
		const updated = buttons.map((button, i) =>
			i === index
				? { ...button, [field]: value }
				: button
		);

		setAttributes({
			buttons: updated,
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
		const newButtons = buttons.filter(
			(_, buttonIndex) => buttonIndex !== index
		);

		setAttributes({
			buttons: newButtons,
		});
	};


	return (
		<>
			<InspectorControls>

				<PanelBody title="Image" initialOpen={true}>

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
							allowedTypes={['image']}
							value={image?.id}
							render={({ open }) => (
								<Button
									variant="secondary"
									onClick={open}
								>
									{image
										? 'Replace Image'
										: 'Select Image'}
								</Button>
							)}
						/>
					</MediaUploadCheck>


					{image && (
						<Button
							isDestructive
							onClick={() =>
								setAttributes({
									image: null,
								})
							}
							style={{ marginTop: '10px' }}
						>
							Remove Image
						</Button>
					)}

				</PanelBody>

				<PanelBody title="Buttons" initialOpen={false}>

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
									updateButton(index, 'text', value)
								}
							/>


							<TextControl
								label="URL"
								value={button.url}
								onChange={(value) =>
									updateButton(index, 'url', value)
								}
							/>


							<CheckboxControl
								label="Outlined"
								checked={button.outlined}
								onChange={(value) =>
									updateButton(index, 'outlined', value)
								}
							/>


							<Button
								isDestructive
								variant="secondary"
								onClick={() => removeButton(index)}
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


			</InspectorControls>


			<section {...blockProps}>

				<div className="section-content">

					<RichText
						tagName="h2"
						className="section-title"
						value={title}
						placeholder="Enter title..."
						onChange={(value) =>
							setAttributes({ title: value })
						}
					/>


					<RichText
						tagName="p"
						value={description}
						placeholder="Enter description..."
						onChange={(value) =>
							setAttributes({ description: value })
						}
					/>


					<div className="wp-block-buttons">

						{buttons.map((button, index) => (

							<div
								key={index}
								className={
									index === 1
										? "wp-block-button is-style-outline"
										: "wp-block-button"
								}
							>

								<a
									className="wp-block-button__link wp-element-button"
									href={button.url}
									onClick={(e) =>
										e.preventDefault()
									}
								>
									{button.text}
								</a>

							</div>

						))}

					</div>

				</div>


				<div className="section-image">

					{image && (
						<img
							src={image.url}
							alt={image.alt}
						/>
					)}

				</div>

			</section>

		</>
	);
}