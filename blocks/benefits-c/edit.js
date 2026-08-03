import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

import {
	Button,
	TextControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		benefits = [],
	} = attributes;

	const updateBenefit = (index, field, value) => {
		const newBenefits = [...benefits];

		newBenefits[index] = {
			...newBenefits[index],
			[field]: value,
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
					title: '',
					description: '',
					image: '',
				},
			],
		});
	};

	const removeBenefit = (index) => {
		setAttributes({
			benefits: benefits.filter((_, i) => i !== index),
		});
	};

	return (
		<section {...useBlockProps()}>

			<RichText
				tagName="h2"
				className="section-title"
				placeholder="Section title..."
				value={title}
				onChange={(value) =>
					setAttributes({
						title: value,
					})
				}
			/>

			<div className="benefits-items">

				{benefits.map((benefit, index) => (

					<div
						className="benefit-item"
						key={index}
					>

						<div className="benefit-item-image">

							<MediaUploadCheck>

								<MediaUpload
									allowedTypes={['image']}
									onSelect={(media) =>
										updateBenefit(
											index,
											'image',
											media.url
										)
									}
									render={({ open }) => (
										<Button
											onClick={open}
											variant="secondary"
										>
											{benefit.image ? (
												<img
													src={benefit.image}
													alt=""
													style={{
														maxWidth: '120px',
														display: 'block',
													}}
												/>
											) : (
												'Select Image'
											)}
										</Button>
									)}
								/>

							</MediaUploadCheck>

						</div>


						<TextControl
							label="Benefit title"
							value={benefit.title}
							onChange={(value) =>
								updateBenefit(
									index,
									'title',
									value
								)
							}
						/>


						<RichText
							tagName="p"
							placeholder="Benefit description..."
							value={benefit.description}
							onChange={(value) =>
								updateBenefit(
									index,
									'description',
									value
								)
							}
						/>


						<Button
							variant="secondary"
							isDestructive
							onClick={() => removeBenefit(index)}
						>
							Remove
						</Button>

					</div>

				))}

			</div>


			<Button
				variant="primary"
				onClick={addBenefit}
			>
				Add Benefit
			</Button>

		</section>
	);
}