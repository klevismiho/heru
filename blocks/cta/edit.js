import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	return (
		<section {...useBlockProps({ className: 'alignfull' })}>
			<div className="cta-inner">
				<div className="section-content">
					<h2 className="section-title">
						Ready to Prime
						<br />
						your Practice?
					</h2>

					<p>
						Learn how Heru Prime can streamline your team’s productivity
						while providing an improved patient experience—without
						compromising the quality of care.
					</p>

					<div className="wp-block-buttons">
						<div className="wp-block-button">
							<a
								className="wp-block-button__link wp-element-button"
								href="#"
								onClick={(e) => e.preventDefault()}
							>
								Schedule a Demo Today
							</a>
						</div>
					</div>
				</div>

				<div className="section-image">
					<img
						src={`${window.themeData?.themeUrl || ''}/assets/src/images/cta.jpg`}
						alt=""
					/>
				</div>
			</div>
		</section>
	);
}