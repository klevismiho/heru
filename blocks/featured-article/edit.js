import { useSelect } from '@wordpress/data';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	RadioControl,
	ComboboxControl,
} from '@wordpress/components';

import './editor.scss';


export default function Edit( { attributes, setAttributes } ) {

	const {
		eyebrow,
		newsMode,
		selectedPostId,
	} = attributes;


	const blockProps = useBlockProps();


	/**
	 * Get latest post
	 */
	const latestPost = useSelect(
		( select ) =>
			select( 'core' ).getEntityRecords(
				'postType',
				'post',
				{
					per_page: 1,
					orderby: 'date',
					order: 'desc',
					_embed: true,
				}
			)?.[ 0 ],
		[]
	);


	/**
	 * Get selected post
	 */
	const selectedPost = useSelect(
		( select ) =>
			selectedPostId
				? select( 'core' ).getEntityRecord(
						'postType',
						'post',
						selectedPostId,
						{
							_embed: true,
						}
				  )
				: null,
		[ selectedPostId ]
	);


	/**
	 * Posts for selector
	 */
	const posts = useSelect(
		( select ) =>
			select( 'core' ).getEntityRecords(
				'postType',
				'post',
				{
					per_page: 20,
					_embed: true,
				}
			),
		[]
	);


	const postOptions =
		posts?.map( ( post ) => ( {
			label: post.title.rendered,
			value: post.id,
		} ) ) || [];


	const post =
		newsMode === 'selected'
			? selectedPost
			: latestPost;


	const postDate = post
		? new Date( post.date ).toLocaleDateString(
				'en-US',
				{
					weekday: 'long',
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				}
		  )
		: '';


	const categoryName =
		post?._embedded?.['wp:term']?.[ 0 ]?.[ 0 ]?.name || 'NEWS';


	const excerpt = post?.excerpt?.rendered
		? post.excerpt.rendered.replace( /<[^>]+>/g, '' )
		: '';


	return (
		<>
			<InspectorControls>

				<PanelBody
					title="News Settings"
					initialOpen={ true }
				>

					<RadioControl
						label="Post source"
						selected={ newsMode }
						options={ [
							{
								label: 'Show latest post',
								value: 'latest',
							},
							{
								label: 'Select post',
								value: 'selected',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( {
								newsMode: value,
								selectedPostId: 0,
							} )
						}
					/>


					{ newsMode === 'selected' && (
						<ComboboxControl
							label="Search post"
							value={ selectedPostId }
							options={ postOptions }
							onChange={ ( value ) =>
								setAttributes( {
									selectedPostId: value,
								} )
							}
						/>
					) }

				</PanelBody>

			</InspectorControls>


			<section { ...blockProps }>

				<div className="section-presentation">

					<RichText
						tagName="div"
						className="section-eyebrow"
						value={ eyebrow }
						onChange={ ( value ) =>
							setAttributes( {
								eyebrow: value,
							} )
						}
						placeholder="News & Press"
					/>


					{ post && (
						<h1 className="section-title">
							{ post.title.rendered }
						</h1>
					) }


					<div className="contact-details">

						<div className="contact-label">
							{ categoryName }
						</div>


						<div className="item-meta">
							{ postDate }
						</div>


						<div className="reading-time">
							2 min read →
						</div>

					</div>

				</div>


				<div className="section-details">

					{ post && (
						<div className="post-excerpt">
							{ excerpt }
						</div>
					) }


					<div className="wp-block-button">

						<a className="wp-block-button__link wp-element-button">
							Read More
						</a>

					</div>

				</div>

			</section>
		</>
	);
}