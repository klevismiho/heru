import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls
} from '@wordpress/block-editor';

import {
	Button,
	PanelBody,
	TextControl,
	CheckboxControl
} from '@wordpress/components';

import { Fragment, useState } from '@wordpress/element';


export default function Edit({ attributes, setAttributes }) {

	const {
		eyebrow,
		title,
		description,
		buttons = [],
		slides = []
	} = attributes;


	const [activeSlide, setActiveSlide] = useState(0);



	/**
	 * BUTTONS
	 */

	const addButton = () => {

		setAttributes({
			buttons: [
				...buttons,
				{
					text: '',
					url: '',
					outlined: false
				}
			]
		});

	};


	const removeButton = (index) => {

		setAttributes({
			buttons: buttons.filter(
				(_, i) => i !== index
			)
		});

	};


	const updateButton = (
		index,
		key,
		value
	) => {

		const newButtons = [...buttons];

		newButtons[index][key] = value;

		setAttributes({
			buttons: newButtons
		});

	};



	/**
	 * SLIDES
	 */

	const addSlide = () => {

		const newSlides = [
			...slides,
			{
				description: '',
				icon: '',
				footer: ''
			}
		];


		setAttributes({
			slides: newSlides
		});


		setActiveSlide(
			newSlides.length - 1
		);

	};



	const removeSlide = (index) => {

		const newSlides = slides.filter(
			(_, i) => i !== index
		);


		setAttributes({
			slides: newSlides
		});


		if (
			activeSlide >= newSlides.length
		) {

			setActiveSlide(
				Math.max(
					newSlides.length - 1,
					0
				)
			);

		}

	};



	const updateSlide = (
		index,
		key,
		value
	) => {

		const newSlides = [
			...slides
		];


		newSlides[index][key] = value;


		setAttributes({
			slides: newSlides
		});

	};



	return (

		<Fragment>


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
								borderBottom: '1px solid #ddd'
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
							>


							</CheckboxControl>


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
									eyebrow: value
								})
							}
						/>


						<RichText
							tagName="h2"
							className="section-title"
							value={title}
							onChange={(value) =>
								setAttributes({
									title: value
								})
							}
						/>


						<RichText
							tagName="p"
							value={description}
							onChange={(value) =>
								setAttributes({
									description: value
								})
							}
						/>


					</div>



					<div className="wp-block-buttons">


						{buttons.map((button,index)=>(

							<div
								key={index}
								className={`wp-block-button ${
									button.outlined
										? 'is-style-outline'
										: ''
								}`}
							>

								<RichText
									tagName="a"
									className="wp-block-button__link wp-element-button"
									value={button.text}
									onChange={(value)=>
										updateButton(
											index,
											'text',
											value
										)
									}
								/>

							</div>

						))}


					</div>


				</div>




				<div className="section-slides">



					<div className="embla__dots">


						{slides.map((slide,index)=>(

							<button
								key={index}
								type="button"
								className={
									activeSlide === index
										? 'is-active'
										: ''
								}
								onClick={() =>
									setActiveSlide(index)
								}
							>

								{index + 1}

							</button>

						))}


					</div>





					{slides[activeSlide] && (

						<div className="embla__slide">


							<div className="slide-description">


								<RichText
									tagName="p"
									placeholder="Slide description..."
									value={
										slides[activeSlide].description
									}
									onChange={(value)=>
										updateSlide(
											activeSlide,
											'description',
											value
										)
									}
								/>


							</div>




							<div className="slide-footer">


								<div className="slide-logo">


									<MediaUploadCheck>

										<MediaUpload

											onSelect={(media)=>
												updateSlide(
													activeSlide,
													'icon',
													media.url
												)
											}

											allowedTypes={[
												'image'
											]}

											render={({open})=>(

												<Button
													variant="secondary"
													onClick={open}
												>

													{
														slides[activeSlide].icon
															? 'Replace Icon'
															: 'Upload Icon'
													}

												</Button>

											)}

										/>

									</MediaUploadCheck>



									{
										slides[activeSlide].icon && (

											<img
												src={
													slides[activeSlide].icon
												}
												alt=""
											/>

										)
									}


								</div>





								<RichText
									tagName="p"
									placeholder="Footer text..."
									value={
										slides[activeSlide].footer
									}
									onChange={(value)=>
										updateSlide(
											activeSlide,
											'footer',
											value
										)
									}
								/>



							</div>





							<Button
								isDestructive
								variant="secondary"
								onClick={() =>
									removeSlide(activeSlide)
								}
							>

								Remove Slide

							</Button>



						</div>

					)}





					<Button
						variant="primary"
						onClick={addSlide}
					>

						Add Slide

					</Button>




				</div>



			</section>


		</Fragment>

	);

}