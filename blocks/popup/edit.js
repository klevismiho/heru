import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	Button,
	CheckboxControl,
	ToggleControl,
	RangeControl,
} from '@wordpress/components';


export default function Edit({
	attributes,
	setAttributes,
}) {

	const {
		enabled,
		title,
		description,
		showOnce,
		delay,
		buttons = [],
	} = attributes;


	const updateButton = (index, key, value) => {
		const updated = [...buttons];

		updated[index] = {
			...updated[index],
			[key]: value,
		};

		setAttributes({
			buttons: updated,
		});
	};


	const addButton = () => {
		setAttributes({
			buttons: [
				...buttons,
				{
					text: '',
					url: '#',
					outlined: false,
				},
			],
		});
	};


	const removeButton = (index) => {
		setAttributes({
			buttons: buttons.filter(
				(_, i) => i !== index
			),
		});
	};


	return (
		<>
			<InspectorControls>

				<PanelBody
					title="Popup Settings"
					initialOpen={true}
				>

					<ToggleControl
						label="Enable popup"
						checked={enabled}
						onChange={(value) =>
							setAttributes({
								enabled: value,
							})
						}
					/>

				</PanelBody>

				<PanelBody
					title="Popup Settings"
					initialOpen={true}
				>

					<ToggleControl
						label="Show only once"
						checked={showOnce}
						onChange={(value) =>
							setAttributes({
								showOnce: value,
							})
						}
					/>

					<RangeControl
						label="Delay before showing (seconds)"
						value={delay}
						onChange={(value) =>
							setAttributes({
								delay: value,
							})
						}
						min={0}
						max={30}
					/>

				</PanelBody>

				<PanelBody
					title="Buttons"
					initialOpen={true}
				>

					{buttons.map((btn, index) => (
						<div
							key={index}
							style={{
								marginBottom: '16px',
								paddingBottom: '16px',
								borderBottom: '1px solid #ddd',
							}}
						>

							<TextControl
								label={`Button ${index + 1} Text`}
								value={btn.text}
								onChange={(value) =>
									updateButton(index, 'text', value)
								}
							/>

							<TextControl
								label="URL"
								value={btn.url}
								onChange={(value) =>
									updateButton(index, 'url', value)
								}
							/>

							<CheckboxControl
								label="Outlined"
								checked={btn.outlined}
								onChange={(value) =>
									updateButton(index, 'outlined', value)
								}
							/>

							<Button
								variant="secondary"
								isDestructive
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


			<div {...useBlockProps()}>

				<RichText
					tagName="h2"
					value={title}
					onChange={(value) =>
						setAttributes({
							title: value,
						})
					}
					placeholder="Popup title..."
				/>


				<RichText
					tagName="p"
					value={description}
					onChange={(value) =>
						setAttributes({
							description: value,
						})
					}
					placeholder="Popup description..."
				/>

				{buttons.length > 0 && (
					<div className="wp-block-buttons">

						{buttons.map((btn, index) => (
							<div
								key={index}
								className={`wp-block-button${btn.outlined
									? ' is-style-outline'
									: ''
									}`}
							>
								<a
									className="wp-block-button__link wp-element-button"
									href={btn.url}
								>
									{btn.text}
								</a>
							</div>
						))}

					</div>
				)}

			</div>
		</>
	);
}