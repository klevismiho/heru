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


export default function Edit({ attributes, setAttributes }) {
	const {
		eyebrow,
		title,
		contactLabel,
		email,
		emailUrl,
		phone,
		phoneUrl,
		newsMode,
		selectedPostId,
	} = attributes;


	const blockProps = useBlockProps();


	/**
	 * Get latest news
	 */
	const latestPosts = useSelect((select) =>
		select('core').getEntityRecords('postType', 'post', {
			per_page: 1,
			orderby: 'date',
			order: 'desc',
		})
	);


	/**
	 * Get selected news
	 */
	const selectedPost = useSelect(
		(select) =>
			selectedPostId
				? select('core').getEntityRecord(
						'postType',
						'post',
						selectedPostId
				  )
				: null,
		[selectedPostId]
	);


	/**
	 * Search posts
	 */
	const posts = useSelect((select) =>
		select('core').getEntityRecords('postType', 'post', {
			per_page: 20,
			search: '',
		})
	);


	const postOptions =
		posts?.map((post) => ({
			label: post.title.rendered,
			value: post.id,
		})) || [];


	const newsPost =
		newsMode === 'latest'
			? latestPosts?.[0]
			: selectedPost;


	return (
		<>
			<InspectorControls>
				<PanelBody title="News Settings" initialOpen={true}>

					<RadioControl
						label="News source"
						selected={newsMode}
						options={[
							{
								label: 'Show latest news',
								value: 'latest',
							},
							{
								label: 'Select news article',
								value: 'selected',
							},
						]}
						onChange={(value) =>
							setAttributes({
								newsMode: value,
								selectedPostId: 0,
							})
						}
					/>


					{newsMode === 'selected' && (
						<ComboboxControl
							label="Search news"
							value={selectedPostId}
							options={postOptions}
							onChange={(value) =>
								setAttributes({
									selectedPostId: value,
								})
							}
						/>
					)}

				</PanelBody>
			</InspectorControls>


			<section {...blockProps}>

				<div className="section-presentation">

					<RichText
						tagName="div"
						className="section-eyebrow"
						value={eyebrow}
						onChange={(value) =>
							setAttributes({
								eyebrow: value,
							})
						}
						placeholder="News category"
					/>


					<RichText
						tagName="div"
						className="section-title"
						value={title}
						onChange={(value) =>
							setAttributes({
								title: value,
							})
						}
						placeholder="Section title"
					/>


					<div className="contact-details">

						<RichText
							tagName="div"
							className="contact-label"
							value={contactLabel}
							onChange={(value) =>
								setAttributes({
									contactLabel: value,
								})
							}
							placeholder="Contact label"
						/>


						<RichText
							tagName="a"
							value={email}
							href={emailUrl}
							onChange={(value) =>
								setAttributes({
									email: value,
								})
							}
							placeholder="Email address"
						/>


						<RichText
							tagName="a"
							value={phone}
							href={phoneUrl}
							onChange={(value) =>
								setAttributes({
									phone: value,
								})
							}
							placeholder="Phone number"
						/>

					</div>

				</div>


				<div className="section-details">

					{newsPost && (
						<h1>
							<a href={newsPost.link}>
								{newsPost.title.rendered}
							</a>
						</h1>
					)}


					<div className="wp-block-button">
						<a
							className="wp-block-button__link wp-element-button"
							href="#"
						>
							Shop Heru
						</a>
					</div>

				</div>

			</section>
		</>
	);
}