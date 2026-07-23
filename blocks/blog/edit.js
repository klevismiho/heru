import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit( { attributes } ) {
	
	const blockProps = useBlockProps();

	return (
		<section { ...blockProps }>
			Blog
		</section>
	);
}