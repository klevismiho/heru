import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function Edit( { attributes } ) {
	const blockProps = useBlockProps();
	const { title } = attributes;

	const blogPosts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'post', {
			per_page: 10,
			status: 'publish',
		} );
	}, [] );

	return (
		<section { ...blockProps }>
			<h2 className="section-title">
				{ title }
			</h2>

			{ blogPosts?.length > 0 && (
				<div className="blog-list">
					{ blogPosts.map( ( post ) => (
						<div className="blog-item" key={ post.id }>

							<div className="item-image">
								{ post.featured_media ? (
									<img
										src={
											post._embedded?.['wp:featuredmedia']?.[0]?.source_url
										}
										alt={
											post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || ''
										}
									/>
								) : null }
							</div>

							<div className="item-content">
								<h3>
									<a href={ post.link }>
										{ post.title.rendered }
									</a>
								</h3>

								<div className="item-exerpt">
									{ post.excerpt.rendered && (
										<div
											dangerouslySetInnerHTML={ {
												__html: post.excerpt.rendered,
											} }
										/>
									) }
								</div>

								<div className="wp-block-button is-style-outline">
									<a
										className="wp-block-button__link wp-element-button"
										href={ post.link }
									>
										Read More →
									</a>
								</div>
							</div>

						</div>
					) ) }
				</div>
			) }
		</section>
	);
}