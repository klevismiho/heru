import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, CheckboxControl, Flex, FlexItem } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		title,
		description,
		subtitle,
		buttons,
		statistics,
	} = attributes;

	const blockProps = useBlockProps();

	const updateStatistic = ( index, field, value ) => {
		const updated = statistics.map( ( item, i ) =>
			i === index ? { ...item, [ field ]: value } : item
		);
		setAttributes( { statistics: updated } );
	};

	const updateButton = ( index, field, value ) => {
		const updated = buttons.map( ( btn, i ) =>
			i === index ? { ...btn, [ field ]: value } : btn
		);
		setAttributes( { buttons: updated } );
	};

	const addButton = () => {
		setAttributes( {
			buttons: [ ...buttons, { text: 'New Button', url: '#', outlined: false } ],
		} );
	};

	const removeButton = ( index ) => {
		setAttributes( {
			buttons: buttons.filter( ( _, i ) => i !== index ),
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Buttons" initialOpen={ true }>
					{ buttons.map( ( btn, index ) => (
						<div key={ index } style={ { marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e0e0e0' } }>
							<TextControl
								label={ `Button ${ index + 1 } Text` }
								value={ btn.text }
								onChange={ ( value ) => updateButton( index, 'text', value ) }
							/>
							<TextControl
								label="URL"
								value={ btn.url }
								onChange={ ( value ) => updateButton( index, 'url', value ) }
							/>
							<CheckboxControl
								label="Outlined"
								checked={ btn.outlined }
								onChange={ ( value ) => updateButton( index, 'outlined', value ) }
							/>
							<Button
								isDestructive
								variant="secondary"
								onClick={ () => removeButton( index ) }
							>
								Remove
							</Button>
						</div>
					) ) }
					<Button variant="primary" onClick={ addButton }>
						Add Button
					</Button>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>

				<RichText
					tagName="div"
					className="section-subtitle"
					value={ subtitle }
					onChange={ ( value ) => setAttributes( { subtitle: value } ) }
					placeholder="Subtitle…"
				/>

				<RichText
					tagName="h1"
					className="section-title"
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
					placeholder="Enter heading…"
				/>

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( value ) => setAttributes( { description: value } ) }
					placeholder="Enter description…"
				/>

				<div className="wp-block-buttons">
					{ buttons.map( ( btn, index ) => (
						<div
							key={ index }
							className={ `wp-block-button${ btn.outlined ? ' is-style-outline' : '' }` }
						>
							<a className="wp-block-button__link wp-element-button" href={ btn.url }>
								{ btn.text }
							</a>
						</div>
					) ) }
				</div>

				<div className="hero-statistics">
					{ statistics.map( ( item, index ) => (
						<div className="statistic-item" key={ index }>
							<RichText
								tagName="div"
								className="statistic-number"
								value={ item.number }
								onChange={ ( value ) => updateStatistic( index, 'number', value ) }
								placeholder="0"
							/>
							<RichText
								tagName="div"
								className="statistic-label"
								value={ item.label }
								onChange={ ( value ) => updateStatistic( index, 'label', value ) }
								placeholder="Label"
							/>
						</div>
					) ) }
				</div>

			</section>
		</>
	);
}