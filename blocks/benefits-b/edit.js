import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

import {
	PanelBody,
	Button,
	IconButton,
	ToggleControl,
	TextControl,
	TextareaControl,
} from '@wordpress/components';

import {
	close,
	arrowUp,
	arrowDown,
} from '@wordpress/icons';


export default function Edit({ attributes, setAttributes }) {
	const {
		benefits = [],
		hasBackground,
	} = attributes;


	const updateBenefit = (index, key, value) => {
		const updated = [...benefits];

		updated[index] = {
			...updated[index],
			[key]: value,
		};

		setAttributes({
			benefits: updated,
		});
	};


	const addBenefit = () => {
		setAttributes({
			benefits: [
				...benefits,
				{
					iconId: 0,
					iconUrl: '',
					title: '',
					list: '',
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


	const blockProps = useBlockProps({
		className: hasBackground
			? 'has-background'
			: '',
	});


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

				</PanelBody>


				<PanelBody
					title="Benefits"
					initialOpen={true}
				>

					{benefits.map((benefit, index) => (
						<div
							key={index}
							style={{
								marginBottom: '30px',
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
								}}
							>

								<strong>
									Benefit {index + 1}
								</strong>


								<div>

									<IconButton
										icon={arrowUp}
										label="Move up"
										disabled={
											index === 0
										}
										onClick={() =>
											moveBenefit(
												index,
												-1
											)
										}
									/>


									<IconButton
										icon={arrowDown}
										label="Move down"
										disabled={
											index ===
											benefits.length - 1
										}
										onClick={() =>
											moveBenefit(
												index,
												1
											)
										}
									/>


									<IconButton
										icon={close}
										label="Remove"
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
									value={
										benefit.iconId
									}
									allowedTypes={[
										'image',
									]}
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
									render={({ open }) => (
										<Button
											variant="secondary"
											onClick={open}
											style={{
												marginTop:
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
								label="Title"
								value={
									benefit.title
								}
								onChange={(value) =>
									updateBenefit(
										index,
										'title',
										value
									)
								}
							/>


							<TextareaControl
								label="List HTML"
								value={
									benefit.list
								}
								onChange={(value) =>
									updateBenefit(
										index,
										'list',
										value
									)
								}
								placeholder={`<ul>
<li>Item one</li>
<li>Item two</li>
</ul>`}
								help="Paste your UL/LI markup here."
							/>

						</div>
					))}


					<Button
						variant="primary"
						onClick={addBenefit}
					>
						Add Benefit
					</Button>

				</PanelBody>

			</InspectorControls>


			<section {...blockProps}>

				<div className="benefits-items">

					{benefits.map((benefit, index) => (
						<div
							className="benefit-item"
							key={index}
						>

							{benefit.iconUrl && (
								<div className="benefit-item-image">
									<img
										src={
											benefit.iconUrl
										}
										alt=""
									/>
								</div>
							)}


							<div className="benefit-name">
								{benefit.title}
							</div>


							<div
								className="benefit-list"
								dangerouslySetInnerHTML={{
									__html: benefit.list,
								}}
							/>

						</div>
					))}

				</div>

			</section>
		</>
	);
}