import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<section {...blockProps}>
			<div className="top-section">
				<div className="top-presentation">
					<div className="section-left">
						<div className="section-eyebrow">ABOUT HERU</div>
						<h2 className="section-title">Clinical Excellence</h2>
					</div>

					<div className="wp-block-buttons">
						<div className="wp-block-button">
							<a className="wp-block-button__link wp-element-button" href="#">
								Shop Heru
							</a>
						</div>

						<div className="wp-block-button is-style-outline">
							<a className="wp-block-button__link wp-element-button" href="#">
								Meet the Team
							</a>
						</div>
					</div>
				</div>

				<div className="top-details">
					<p>
						Our technology is the culmination of over 15 years of
						clinical and scientific research and development led by
						Heru’s Founder and CEO Mohamed Abou Shousha, MD, PhD,
						associate professor of clinical ophthalmology, Bascom
						Palmer Eye Institute.
					</p>

					
				</div>
			</div>

			<div className="bottom-section">
				<div className="item">
					<h3>For ECPs</h3>
					<p>
						Increased exam lane throughput with less time spent on
						manual, variable pre-testing and more time on patient
						care.
					</p>
				</div>

				<div className="item">
					<h3>For Technicians</h3>
					<p>
						Faster, guided workflows with cleaner outputs and fewer
						"what happened here?" moments.
					</p>
				</div>

				<div className="item">
					<h3>For Patients</h3>
					<p>
						Higher confidence in the practice and process when the
						experience feels modern and guided.
					</p>
				</div>
			</div>
		</section>
	);
}