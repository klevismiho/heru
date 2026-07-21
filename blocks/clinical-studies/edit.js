import { useBlockProps } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import './editor.scss';

export default function Edit( { attributes } ) {
	const { title } = attributes;

	const clinicalStudies = useSelect(
		( select ) =>
			select( 'core' ).getEntityRecords( 'postType', 'clinical-study', {
				per_page: -1,
				_embed: true,
			} ),
		[]
	);

	const blockProps = useBlockProps();

	if ( ! clinicalStudies ) {
		return (
			<section { ...blockProps }>
				<Spinner />
			</section>
		);
	}

	return (
		<section { ...blockProps }>
			<h2 className="section-title">
				{ title || 'Clinical Studies' }
			</h2>

			{ clinicalStudies.length > 0 ? (
				<div className="clinical-studies-list">

					{ clinicalStudies.map( ( study ) => {
						const featuredImage =
							study._embedded?.['wp:featuredmedia']?.[0]?.source_url;

						return (
							<div
								key={ study.id }
								className="clinical-study-item"
							>

								<div className="item-image">
									{ featuredImage && (
										<img
											src={ featuredImage }
											alt={ study.title.rendered }
										/>
									) }
								</div>

								<div className="item-content">

									<h3
										dangerouslySetInnerHTML={ {
											__html: study.title.rendered,
										} }
									/>

									{ study.excerpt?.rendered && (
										<p
											dangerouslySetInnerHTML={ {
												__html: study.excerpt.rendered,
											} }
										/>
									) }

								</div>

								<div className="item-button">
									<div className="wp-block-button">
										<span className="wp-block-button__link wp-element-button">
											Read More
										</span>
									</div>
								</div>

							</div>
						);
					} ) }

				</div>
			) : (
				<p>No clinical studies found.</p>
			) }

		</section>
	);
}