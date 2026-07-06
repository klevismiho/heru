import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<section {...blockProps}>
			<div className="section-presentation">
				<div className="section-left">
					<div className="section-eyebrow">NEW TO HERU PRIME</div>
					<h2 className="section-title">PretestPro™</h2>
					<h3>
						Four tests. 90 Seconds.
						<br />
						Zero Guesswork.
					</h3>
					<ul>
						<li>8-Point Screening Visual Field</li>
						<li>Quantitative Cover Near Test</li>
						<li>Extraocular Motility</li>
						<li>Quantitative Pupil Test</li>
					</ul>
				</div>

				<div className="wp-block-buttons">
					<div className="wp-block-button">
						<a className="wp-block-button__link wp-element-button" href="#" onClick={(e) => e.preventDefault()}>
							Shop Heru
						</a>
					</div>
					<div className="wp-block-button is-style-outline">
						<a className="wp-block-button__link wp-element-button" href="#" onClick={(e) => e.preventDefault()}>
							Test Drive
						</a>
					</div>
				</div>
			</div>

			<div className="section-details">
				<p>
					When paired with Heru's Visual Acuity test, PretestPro™ reduces time spent running four crucial pretests so that you can complete 50% of your pretesting in 90 seconds; all guided by Nora, our friendly fixation target.
				</p>
				<img src="" alt="" />
			</div>
		</section>
	);
}