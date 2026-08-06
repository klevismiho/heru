import { 
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl,
	RangeControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';


export default function Edit( { attributes, setAttributes } ) {

	const blockProps = useBlockProps();

	const {
		showPagination,
		postsPerPage,
	} = attributes;


	const blogPosts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'post', {
			per_page: postsPerPage,
			status: 'publish',
			_embed: true,
		} );
	}, [ postsPerPage ] );


	return (
		<>
			<InspectorControls>

				<PanelBody title="Blog Settings">

					<RangeControl
						label="Posts per page"
						value={ postsPerPage }
						onChange={ ( value ) =>
							setAttributes( {
								postsPerPage: value,
							} )
						}
						min={ 1 }
						max={ 20 }
					/>

					<ToggleControl
						label="Show pagination"
						checked={ showPagination }
						onChange={ ( value ) =>
							setAttributes( {
								showPagination: value,
							} )
						}
					/>

				</PanelBody>

			</InspectorControls>


			<section { ...blockProps }>

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
		</>
	);
}