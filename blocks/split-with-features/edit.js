import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';

import {
	PanelBody,
	Button,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

import { trash } from '@wordpress/icons';

export default function Edit({ attributes, setAttributes }) {
	const {
		description,
		buttons = [],
		features = [],
	} = attributes;

	/* ---------------- Buttons ---------------- */

	const updateButton = (index, field, value) => {
		const newButtons = [...buttons];

		newButtons[index] = {
			...newButtons[index],
			[field]: value,
		};

		setAttributes({ buttons: newButtons });
	};

	const addButton = () => {
		setAttributes({
			buttons: [
				...buttons,
				{
					text: '',
					url: '',
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

	/* ---------------- Features ---------------- */

	const updateFeature = (index, value) => {
		const newFeatures = [...features];
		newFeatures[index] = value;

		setAttributes({ features: newFeatures });
	};

	const addFeature = () => {
		setAttributes({
			features: [...features, ''],
		});
	};

	const removeFeature = (index) => {
		setAttributes({
			features: features.filter((_, i) => i !== index),
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
								paddingBottom: '16px',
								borderBottom: '1px solid #ddd',
							}}
						>
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

							<ToggleControl
								label="Outlined Button"
								checked={!!button.outlined}
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
								onClick={() => removeButton(index)}
							>
								Remove Button
							</Button>
						</div>
					))}

					<Button variant="primary" onClick={addButton}>
						Add Button
					</Button>
				</PanelBody>

				<PanelBody title="Features" initialOpen={false}>

					{features.map((feature, index) => (
						<div
							key={index}
							style={{
								display: 'flex',
								alignItems: 'flex-end',
								gap: '8px',
								marginBottom: '12px',
							}}
						>
							<div style={{ flex: 1 }}>
								<TextControl
									value={feature}
									onChange={(value) =>
										updateFeature(index, value)
									}
								/>
							</div>

							<Button
								icon={trash}
								label="Remove feature"
								isDestructive
								onClick={() => removeFeature(index)}
							/>
						</div>
					))}

					<Button variant="primary" onClick={addFeature}>
						Add Feature
					</Button>
				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps()}>
				<div className="section-content">
					<RichText
						tagName="h2"
						className="section-title"
						value={attributes.title}
						onChange={(value) =>
							setAttributes({
								title: value,
							})
						}
						placeholder="Add title..."
					/>

					{buttons.length > 0 && (
						<div className="wp-block-buttons">
							{buttons.map((button, index) => (
								<div
									key={index}
									className={
										`wp-block-button ${button.outlined
											? 'is-style-outline'
											: ''
										}`
									}
								>
									<span className="wp-block-button__link wp-element-button">
										{button.text || 'Button'}
									</span>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="features">
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

					{features.length > 0 && (
						<ul className="features-list">
							{features.map((feature, index) => (
								<li key={index}>
									{feature || 'Feature'}
								</li>
							))}
						</ul>
					)}
				</div>
			</section>
		</>
	);
}