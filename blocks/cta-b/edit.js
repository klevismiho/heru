import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	CheckboxControl,
	Button,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { title, description, buttons = [] } = attributes;

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
		setAttributes({
			buttons: buttons.filter((_, i) => i !== index),
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Buttons" initialOpen={true}>

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

						<div className="wp-block-buttons">

							{buttons.map((button, index) => (
								<div
									key={index}
									className={`wp-block-button${
										button.outlined
											? ' is-style-outline'
											: ''
									}`}
								>
									<a
										href={button.url}
										className="wp-block-button__link wp-element-button"
										onClick={(e) => e.preventDefault()}
									>
										{button.text}
									</a>
								</div>
							))}

						</div>

					</div>
				</div>
			</section>
		</>
	);
}