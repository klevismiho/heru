import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

import {
	Button,
	PanelBody,
	TextareaControl,
} from '@wordpress/components';


export default function Edit({ attributes, setAttributes }) {

	const {
		title,
		description,
		smallText,
		image,
		embedCode,
	} = attributes;


	const blockProps = useBlockProps();


	return (
		<>

			<InspectorControls>

				<PanelBody
					title="Image"
					initialOpen={true}
				>

					<MediaUploadCheck>

						<MediaUpload
							onSelect={(media) =>
								setAttributes({
									image: {
										id: media.id,
										url: media.url,
										alt: media.alt,
									},
								})
							}
							allowedTypes={['image']}
							value={image?.id}
							render={({ open }) => (
								<Button
									variant="secondary"
									onClick={open}
								>
									{image
										? 'Replace Image'
										: 'Select Image'}
								</Button>
							)}
						/>

					</MediaUploadCheck>


					{image && (
						<Button
							isDestructive
							variant="secondary"
							onClick={() =>
								setAttributes({
									image: null,
								})
							}
						>
							Remove Image
						</Button>
					)}

				</PanelBody>


				<PanelBody
					title="Embed Code"
					initialOpen={false}
				>

					<TextareaControl
						label="HTML Embed"
						value={embedCode}
						onChange={(value) =>
							setAttributes({
								embedCode: value,
							})
						}
						rows={12}
						help="Paste your embed code here"
					/>

				</PanelBody>


			</InspectorControls>



			<section {...blockProps}>

				<div className="section-content">


					<RichText
						tagName="h2"
						className="section-title"
						value={title}
						placeholder="Enter title..."
						onChange={(value) =>
							setAttributes({
								title: value,
							})
						}
					/>


					<RichText
						tagName="p"
						value={description}
						placeholder="Enter description..."
						onChange={(value) =>
							setAttributes({
								description: value,
							})
						}
					/>


					<RichText
						tagName="p"
						value={smallText}
						placeholder="Enter small text..."
						onChange={(value) =>
							setAttributes({
								smallText: value,
							})
						}
					/>


					{embedCode && (
						<div
							className="embed-code"
							dangerouslySetInnerHTML={{
								__html: embedCode,
							}}
						/>
					)}


				</div>



				<div className="section-image">

					{image && (
						<img
							src={image.url}
							alt={image.alt}
						/>
					)}

				</div>


			</section>

		</>
	);
}