import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps();

	const testimonials = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'testimonial', {
			per_page: 10,
			order: 'desc',
			orderby: 'date',
			_embed: true,
		});
	}, []);

	return (
		<section {...blockProps}>
			<div className="section-header">
				<h2 className="section-title">
					Trusted by Industry Experts
				</h2>

				<div className="embla__dots"></div>
			</div>


			<div className="embla">
				<div className="embla__viewport">
					<div className="embla__container">

						{!testimonials && (
							<div className="embla__slide">
								<p>
									Loading testimonials...
								</p>
							</div>
						)}


						{testimonials &&
							testimonials.map((item) => {

								const featuredImage =
									item._embedded?.['wp:featuredmedia']?.[0]
										?.media_details?.sizes?.medium
										?.source_url ||
									item._embedded?.['wp:featuredmedia']?.[0]
										?.source_url;


								return (
									<div
										className="embla__slide"
										key={item.id}
									>

										<div className="testimonial">


											<div className="testimonial__image">

												{featuredImage ? (
													<img
														src={featuredImage}
														alt={item.title.rendered}
													/>
												) : (
													<img
														src="https://via.placeholder.com/200"
														alt="placeholder"
													/>
												)}

											</div>


											<div className="testimonial__content">

												<div
													dangerouslySetInnerHTML={{
														__html: item.content.rendered,
													}}
												/>


												<div className="testimonial__author">
													-- {item.title.rendered}
												</div>

											</div>


										</div>

									</div>
								);
							})}

					</div>
				</div>
			</div>

		</section>
	);
}