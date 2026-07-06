import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<section {...blockProps}>
			<div className="section-content">
				<h2 className="section-title">
					Prime Your
					<br />
					Practice
				</h2>

				<p>
					Heru Prime’s patented AI and VR-powered technology empowers
					ECPs with a fast, repeatable, and clinically validated
					platform for a streamlined diagnostic experience. With 13
					modalities, and more in development, you’ll receive over the
					air updates at no additional cost as we innovate.
				</p>

				<div className="wp-block-buttons">
					<div className="wp-block-button">
						<a
							className="wp-block-button__link wp-element-button"
							href="#"
						>
							Learn More
						</a>
					</div>

					<div className="wp-block-button is-style-outline">
						<a
							className="wp-block-button__link wp-element-button"
							href="#"
						>
							Test Drive
						</a>
					</div>
				</div>
			</div>

			<div className="section-image">
			
			</div>
		</section>
	);
}