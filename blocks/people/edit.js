import { useState, useEffect } from '@wordpress/element';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	Button,
	TextControl,
	Spinner,
	ToggleControl
} from '@wordpress/components';

import apiFetch from '@wordpress/api-fetch';


export default function Edit({ attributes, setAttributes }) {

	const {
		title,
		description,
		selectedGroup,
		buttons = [],
		showImages,
	} = attributes;

	const [groups, setGroups] = useState([]);
	const [people, setPeople] = useState([]);
	const [loading, setLoading] = useState(true);

	// Get groups
	useEffect(() => {

		apiFetch({
			path: '/wp/v2/people_group?per_page=100',
		})
			.then((terms) => {
				setGroups(terms);
			});

	}, []);

	// Get people
	useEffect(() => {

		setLoading(true);

		let url = '/wp/v2/people?_embed&per_page=10';


		if (selectedGroup) {
			url += `&people_group=${selectedGroup}`;
		}


		apiFetch({
			path: url,
		})
			.then((posts) => {
				console.log('PEOPLE:', posts);
				setPeople(posts);
				setLoading(false);
			});


	}, [selectedGroup]);

	const addButton = () => {

		setAttributes({
			buttons: [
				...buttons,
				{
					text: 'New Button',
					url: '#',
				},
			],
		});

	};

	const updateButton = (index, field, value) => {

		const updated = [...buttons];

		updated[index][field] = value;

		setAttributes({
			buttons: updated,
		});

	};

	const removeButton = (index) => {

		setAttributes({
			buttons: buttons.filter((_, i) => i !== index),
		});

	};

	const blockProps = useBlockProps();

	return (
		<>

			<InspectorControls>

				<PanelBody title="People Group">

					<SelectControl
						label="Group"
						value={selectedGroup}
						options={[
							{
								label: 'All People',
								value: 0,
							},
							...groups.map((group) => ({
								label: group.name,
								value: group.id,
							}))
						]}
						onChange={(value) =>
							setAttributes({
								selectedGroup: Number(value),
							})
						}
					/>

				</PanelBody>

				<PanelBody title="Settings">

					<ToggleControl
						label="Show Person Images"
						checked={attributes.showImages}
						onChange={(value) =>
							setAttributes({
								showImages: value,
							})
						}
					/>

				</PanelBody>

				<PanelBody title="Buttons">

					<Button
						variant="primary"
						onClick={addButton}
					>
						Add Button
					</Button>



					{buttons.map((button, index) => (

						<div
							key={index}
							style={{
								marginTop: 20
							}}
						>

							<TextControl
								label="Text"
								value={button.text}
								onChange={(value) =>
									updateButton(
										index,
										'text',
										value
									)
								}
							/>


							<TextControl
								label="URL"
								value={button.url}
								onChange={(value) =>
									updateButton(
										index,
										'url',
										value
									)
								}
							/>


							<Button
								isDestructive
								onClick={() =>
									removeButton(index)
								}
							>
								Remove
							</Button>

						</div>

					))}

				</PanelBody>

			</InspectorControls>


			<section {...blockProps}>

				<div className="section-content">

					<RichText
						tagName="h2"
						className="section-title"
						value={title}
						onChange={(value) =>
							setAttributes({
								title: value
							})
						}
						placeholder="Title..."
					/>


					<RichText
						tagName="p"
						value={description}
						onChange={(value) =>
							setAttributes({
								description: value
							})
						}
						placeholder="Description..."
					/>




					<div className="wp-block-buttons">

						{buttons.map((button, index) => (

							<div
								className="wp-block-button is-style-outline"
								key={index}
							>

								<a className="wp-block-button__link wp-element-button">
									{button.text}
								</a>

							</div>

						))}

					</div>


				</div>

				<div className="people-list">

					{
						loading && <Spinner />
					}



					{
						people.map((person) => (

							<div
								className="person"
								key={person.id}
							>

								<div className="person-summary">

									{
										showImages && (
											<div className="person-image">

												{
													person._embedded?.['wp:featuredmedia'] &&
													<img
														src={
															person._embedded['wp:featuredmedia'][0].source_url
														}
													/>
												}

											</div>
										)
									}

									<div className="person-details">

										<h3>
											{
												person.title.rendered
											}
										</h3>


										<div
											dangerouslySetInnerHTML={{
												__html:
													person.acf?.person_title || ''
											}}
										/>

									</div>


								</div>



								<div
									className="person-bio"
									dangerouslySetInnerHTML={{
										__html:
											person.content.rendered
									}}
								/>


							</div>

						))

					}

				</div>

			</section>

		</>
	);
}