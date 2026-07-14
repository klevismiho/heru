import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

import {
	PanelBody,
	Button,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { eyebrow, title, videoUrl, videoId } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title="Video Settings" initialOpen={true}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) =>
								setAttributes({
									videoUrl: media.url,
									videoId: media.id,
								})
							}
							allowedTypes={['video']}
							value={videoId}
							render={({ open }) => (
								<Button
									variant="primary"
									onClick={open}
								>
									{videoUrl ? 'Replace video' : 'Select video'}
								</Button>
							)}
						/>
					</MediaUploadCheck>

					{videoUrl && (
						<Button
							variant="secondary"
							isDestructive
							onClick={() =>
								setAttributes({
									videoUrl: '',
									videoId: 0,
								})
							}
							style={{ marginTop: '10px' }}
						>
							Remove video
						</Button>
					)}
				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps()}>
				<div className="section-content">
					<RichText
						tagName="div"
						className="section-eyebrow"
						value={eyebrow}
						onChange={(value) =>
							setAttributes({ eyebrow: value })
						}
					/>

					<RichText
						tagName="h2"
						className="section-title"
						value={title}
						onChange={(value) =>
							setAttributes({ title: value })
						}
					/>
				</div>

				<div className="section-video">
					{videoUrl ? (
						<video
							src={videoUrl}
							controls
							style={{ width: '100%' }}
						/>
					) : (
						<div className="video-placeholder">
							<p>No video selected</p>
							<p>Select a video from the block settings.</p>
						</div>
					)}
				</div>
			</section>
		</>
	);
}