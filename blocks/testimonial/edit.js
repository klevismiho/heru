import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
	const {
		testimonial,
		person
	} = attributes;

	const blockProps = useBlockProps();

	return (
		<>

			<section
				{...blockProps}>

				<div className="section-content">

					<RichText
						tagName="h2"
						className="section-title"
						value={testimonial}
						placeholder="Enter testimonial..."
						onChange={(value) =>
							setAttributes({ testimonial: value })
						}
					/>

					<RichText
						tagName="p"
						value={person}
						placeholder="Enter person..."
						onChange={(value) =>
							setAttributes({ person: value })
						}
					/>

				</div>

			</section>
		</>
	);
}