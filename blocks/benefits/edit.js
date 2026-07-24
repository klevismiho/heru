import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	Button,
	IconButton,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

import {
	close,
	arrowUp,
	arrowDown,
} from '@wordpress/icons';


export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		description,
		benefits = [],
		hasBackground,
		headingLevel = 'h2',
	} = attributes;


	const updateBenefit = (index, key, value) => {
		const newBenefits = [...benefits];

		newBenefits[index] = {
			...newBenefits[index],
			[key]: value,
		};

		setAttributes({
			benefits: newBenefits,
		});
	};


	const addBenefit = () => {
		setAttributes({
			benefits: [
				...benefits,
				{
					iconId: 0,
					iconUrl: '',
					text: '',
				},
			],
		});
	};


	const removeBenefit = (index) => {
		setAttributes({
			benefits: benefits.filter(
				(_, i) => i !== index
			),
		});
	};


	const moveBenefit = (index, direction) => {
		const updated = [...benefits];

		const newIndex = index + direction;

		if (
			newIndex < 0 ||
			newIndex >= updated.length
		) {
			return;
		}

		[
			updated[index],
			updated[newIndex],
		] = [
			updated[newIndex],
			updated[index],
		];

		setAttributes({
			benefits: updated,
		});
	};


	return (
		<>
			<InspectorControls>

				<PanelBody
					title="Settings"
					initialOpen={true}
				>

					<ToggleControl
						label="Enable background"
						checked={hasBackground}
						onChange={(value) =>
							setAttributes({
								hasBackground: value,
							})
						}
					/>

					<SelectControl
						label="Heading level"
						value={headingLevel}
						options={[
							{
								label: 'H1',
								value: 'h1',
							},
							{
								label: 'H2',
								value: 'h2',
							},
						]}
						onChange={(value) =>
							setAttributes({
								headingLevel: value,
							})
						}
					/>

				</PanelBody>


				<PanelBody
					title="Benefits"
					initialOpen={true}
				>

					{benefits.map(
						(benefit, index) => (
							<div
								key={index}
								style={{
									marginBottom: '20px',
									paddingBottom: '20px',
									borderBottom:
										'1px solid #ddd',
								}}
							>

								<div
									style={{
										display: 'flex',
										justifyContent:
											'space-between',
										alignItems:
											'center',
										marginBottom:
											'10px',
									}}
								>

									<strong>
										Benefit {index + 1}
									</strong>


									<div
										style={{
											display: 'flex',
											gap: '4px',
										}}
									>

										<IconButton
											icon={arrowUp}
											label="Move up"
											onClick={() =>
												moveBenefit(
													index,
													-1
												)
											}
											disabled={
												index === 0
											}
										/>

										<IconButton
											icon={arrowDown}
											label="Move down"
											onClick={() =>
												moveBenefit(
													index,
													1
												)
											}
											disabled={
												index ===
												benefits.length - 1
											}
										/>

										<IconButton
											icon={close}
											label="Remove benefit"
											onClick={() =>
												removeBenefit(
													index
												)
											}
										/>

									</div>

								</div>


								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => {
											updateBenefit(
												index,
												'iconId',
												media.id
											);

											updateBenefit(
												index,
												'iconUrl',
												media.url
											);
										}}
										allowedTypes={[
											'image',
										]}
										value={
											benefit.iconId
										}
										render={({
											open,
										}) => (
											<Button
												variant="secondary"
												onClick={
													open
												}
												style={{
													marginBottom:
														'10px',
												}}
											>
												{benefit.iconUrl
													? 'Change Icon'
													: 'Select Icon'}
											</Button>
										)}
									/>
								</MediaUploadCheck>


								<TextControl
									label="Text"
									value={
										benefit.text
									}
									onChange={(value) =>
										updateBenefit(
											index,
											'text',
											value
										)
									}
								/>

							</div>
						)
					)}


					<Button
						variant="primary"
						onClick={addBenefit}
					>
						Add Benefit
					</Button>

				</PanelBody>

			</InspectorControls>


			<section
				{...useBlockProps({
					className: hasBackground
						? 'has-background'
						: '',
				})}
			>

				<div className="section-inner">

					<RichText
						tagName={headingLevel}
						className="section-title"
						value={title}
						onChange={(value) =>
							setAttributes({
								title: value,
							})
						}
						placeholder="Enter title..."
					/>


					<RichText
						tagName="p"
						value={description}
						onChange={(value) =>
							setAttributes({
								description: value,
							})
						}
						placeholder="Enter description..."
					/>


					<div className="benefits-items">

						{benefits.map(
							(benefit, index) => (
								<div
									className="benefit-item"
									key={index}
								>

									{benefit.iconUrl && (
										<img
											src={
												benefit.iconUrl
											}
											alt=""
										/>
									)}


									<div className="benefit-name">
										{benefit.text}
									</div>

								</div>
							)
						)}

					</div>

				</div>

			</section>
		</>
	);
}