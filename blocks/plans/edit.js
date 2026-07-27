import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	Button,
	TextControl,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const { plans = [] } = attributes;

	const blockProps = useBlockProps();

	const updatePlan = (index, field, value) => {
		const newPlans = [...plans];

		newPlans[index] = {
			...newPlans[index],
			[field]: value,
		};

		setAttributes({
			plans: newPlans,
		});
	};

	const addPlan = () => {
		setAttributes({
			plans: [
				...plans,
				{
					title: 'New Plan',
					content: '<p>Plan description</p>',
					buttonText: 'Learn More',
					buttonLink: '#',
					featured: false,
				},
			],
		});
	};

	const removePlan = (index) => {
		setAttributes({
			plans: plans.filter((_, i) => i !== index),
		});
	};

	return (
		<Fragment>

			<InspectorControls>
				<PanelBody title="Plans" initialOpen={true}>

					<Button
						variant="primary"
						onClick={addPlan}
					>
						Add Plan
					</Button>

					{plans.map((plan, index) => (
						<div key={index}>

							<hr />

							<strong>
								Plan {index + 1}
							</strong>

							<ToggleControl
								label="Featured plan"
								checked={plan.featured}
								onChange={(value) =>
									updatePlan(index, 'featured', value)
								}
							/>

							<TextControl
								label="Title"
								value={plan.title}
								onChange={(value) =>
									updatePlan(index, 'title', value)
								}
							/>

							<TextareaControl
								label="HTML Content"
								value={plan.content}
								onChange={(value) =>
									updatePlan(index, 'content', value)
								}
								help="Add HTML like <p>, <ul>, <li>"
								rows={8}
							/>

							<TextControl
								label="Button text"
								value={plan.buttonText}
								onChange={(value) =>
									updatePlan(index, 'buttonText', value)
								}
							/>

							<TextControl
								label="Button link"
								value={plan.buttonLink}
								onChange={(value) =>
									updatePlan(index, 'buttonLink', value)
								}
							/>

							<Button
								variant="secondary"
								isDestructive
								onClick={() => removePlan(index)}
							>
								Remove
							</Button>

						</div>
					))}

				</PanelBody>
			</InspectorControls>


			<section {...blockProps}>

				<div className="plans-items">

					{plans.map((plan, index) => (

						<div
							key={index}
							className={`plan-item ${
								plan.featured ? 'best-item' : ''
							}`}
						>

							<div className="benefit-name">
								{plan.title}
							</div>

							<div
								className="plan-content"
								dangerouslySetInnerHTML={{
									__html: plan.content,
								}}
							/>

							<div className="wp-block-button">
								<a className="wp-block-button__link wp-element-button">
									{plan.buttonText}
								</a>
							</div>

						</div>

					))}

				</div>

			</section>

		</Fragment>
	);
}