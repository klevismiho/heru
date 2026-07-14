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
	CheckboxControl,
	Button,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		description,
		buttons = [],
		image = {}
	} = attributes;

	const blockProps = useBlockProps({
		className: 'alignfull',
	});

	const updateButton = (index, field, value) => {
		const updatedButtons = buttons.map((button, i) =>
			i === index
				? { ...button, [field]: value }
				: button
		);

		setAttributes({ buttons: updatedButtons });
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
			buttons: buttons.filter((_, i) => i !== index),
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
										alt: media.alt || '',
									},
								})
							}
							allowedTypes={['image']}
							value={image.id}
							render={({ open }) => (
								<>
									{image.url && (
										<img
											src={image.url}
											alt=""
											style={{
												width: '100%',
												marginBottom: '12px',
											}}
										/>
									)}

									<Button
										variant="secondary"
										onClick={open}
									>
										{image.url ? 'Replace Image' : 'Select Image'}
									</Button>

									{image.url && (
										<Button
											isDestructive
											onClick={() =>
												setAttributes({ image: {} })
											}
										>
											Remove Image
										</Button>
									)}
								</>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
				<PanelBody title="Buttons" initialOpen={true}>

					{buttons.map((button, index) => (
						<div key={index}>

							<TextControl
								label="Button Text"
								value={button.text}
								onChange={(value) =>
									updateButton(index, 'text', value)
								}
							/>

							<TextControl
								label="Button URL"
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
								Remove
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
				<div className="cta-inner">
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

						{buttons.length > 0 && (
							<div className="wp-block-buttons">
								{buttons.map((button, index) => (
									<div
										key={index}
										className={`wp-block-button${button.outlined
											? ' is-style-outline'
											: ''
											}`}
									>
										<a
											className="wp-block-button__link wp-element-button"
											href={button.url || '#'}
											onClick={(e) => e.preventDefault()}
										>
											{button.text}
										</a>
									</div>
								))}
							</div>
						)}
					</div>

					<div className="section-image">
						{image.url && (
							<img
								src={image.url}
								alt={image.alt || ''}
							/>
						)}
					</div>
				</div>
			</section>
		</>
	);
}