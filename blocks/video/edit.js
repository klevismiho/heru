import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

import {
	Button,
} from '@wordpress/components';


export default function Edit({ attributes, setAttributes }) {
	const {
		videoId = 0,
		videoUrl = '',
	} = attributes;


	const selectVideo = (media) => {
		setAttributes({
			videoId: media.id,
			videoUrl: media.url,
		});
	};


	const removeVideo = () => {
		setAttributes({
			videoId: 0,
			videoUrl: '',
		});
	};


	const blockProps = useBlockProps();


	return (
		<div {...blockProps}>

			<MediaUploadCheck>

				<MediaUpload
					onSelect={selectVideo}
					allowedTypes={[
						'video',
					]}
					value={videoId}
					render={({ open }) => (
						<>
							<Button
								variant="primary"
								onClick={open}
							>
								{videoUrl
									? 'Replace Video'
									: 'Upload Video'}
							</Button>


							{videoUrl && (
								<Button
									variant="secondary"
									onClick={removeVideo}
									style={{
										marginLeft:
											'10px',
									}}
								>
									Remove Video
								</Button>
							)}
						</>
					)}
				/>

			</MediaUploadCheck>


			{videoUrl && (
				<div
					style={{
						marginTop: '20px',
					}}
				>

					<video
						src={videoUrl}
						controls
						style={{
							width: '100%',
							height: 'auto',
						}}
					/>

				</div>
			)}

		</div>
	);
}