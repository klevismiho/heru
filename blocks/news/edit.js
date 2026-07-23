import { useBlockProps } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import './editor.scss';

export default function Edit( { attributes } ) {
	const { title } = attributes;

	const newsPosts = useSelect(
		( select ) =>
			select( 'core' ).getEntityRecords( 'postType', 'news', {
				per_page: 10,
				_embed: true,
			} ),
		[]
	);

	const blockProps = useBlockProps();

	if ( ! newsPosts ) {
		return (
			<section { ...blockProps }>
				<Spinner />
			</section>
		);
	}

	return (
		<section { ...blockProps }>

			<h2 className="section-title">
				{ title || 'News' }
			</h2>

			{ newsPosts.length > 0 ? (
				<div className="news-list">

					{ newsPosts.map( ( post ) => {
						const featuredImage =
							post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

						const postDate = new Date( post.date ).toLocaleDateString(
							'en-US',
							{
								month: 'long',
								year: 'numeric',
							}
						);

						return (
							<div
								key={ post.id }
								className="news-item"
							>

								<div className="item-image">

									{ featuredImage && (
										<a href={ post.link }>
											<img
												src={ featuredImage }
												alt={ post.title.rendered }
											/>
										</a>
									) }

								</div>

								<div className="item-content">

									<div className="item-date">
										{ postDate }
									</div>

									<h3>
										<a href={ post.link }>
											<span
												dangerouslySetInnerHTML={ {
													__html: post.title.rendered,
												} }
											/>
										</a>
									</h3>

								</div>

							</div>
						);
					} ) }

				</div>
			) : (
				<p>No news found.</p>
			) }

		</section>
	);
}