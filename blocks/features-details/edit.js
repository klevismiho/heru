import {
    useBlockProps,
    RichText,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor';

import {
    Button,
} from '@wordpress/components';

import {
    useState,
} from '@wordpress/element';


export default function Edit({
    attributes,
    setAttributes,
}) {
    const blockProps = useBlockProps();

    const [openIndex, setOpenIndex] = useState(0);


    const {
        title = 'Heru Prime Modalities',

        description =
        'Heru Prime replaces an entire exam lane of traditional diagnostic equipment with a single wearable device.',

        features = [
            {
                name: 'PretestPro™',
                summary: 'This is a summary of feature 1',
                isNew: true,
            },
            {
                name: 'PretestPro™',
                summary: 'This is a summary of feature 1',
                isNew: false,
            },
            {
                name: 'PretestPro™',
                summary: 'This is a summary of feature 1',
                isNew: true,
            },
        ],

        contents = [
            {
                title: 'Test item 1',
                description: 'Test item 1 description',
                mediaId: 0,
                mediaUrl: '',
                mediaType: '',
            },
            {
                title: 'Test item 2',
                description: 'Test item 2 description',
                mediaId: 0,
                mediaUrl: '',
                mediaType: '',
            },
            {
                title: 'Test item 3',
                description: 'Test item 3 description',
                mediaId: 0,
                mediaUrl: '',
                mediaType: '',
            },
        ],
    } = attributes;



    const updateFeature = (
        index,
        key,
        value
    ) => {
        const updatedFeatures = [
            ...features,
        ];

        updatedFeatures[index] = {
            ...updatedFeatures[index],
            [key]: value,
        };

        setAttributes({
            features: updatedFeatures,
        });
    };



    const updateContent = (
        index,
        key,
        value
    ) => {
        const updatedContents = [
            ...contents,
        ];

        updatedContents[index] = {
            ...updatedContents[index],
            [key]: value,
        };

        setAttributes({
            contents: updatedContents,
        });
    };



    const updateContentMedia = (
        index,
        media
    ) => {
        const updatedContents = [
            ...contents,
        ];

        updatedContents[index] = {
            ...updatedContents[index],
            mediaId: media.id,
            mediaUrl: media.url,
            mediaType: media.type,
        };

        setAttributes({
            contents: updatedContents,
        });
    };



    const moveFeature = (
        index,
        direction
    ) => {
        const newIndex = index + direction;

        if (
            newIndex < 0 ||
            newIndex >= features.length
        ) {
            return;
        }


        const updatedFeatures = [
            ...features,
        ];

        const updatedContents = [
            ...contents,
        ];


        [
            updatedFeatures[index],
            updatedFeatures[newIndex],
        ] = [
                updatedFeatures[newIndex],
                updatedFeatures[index],
            ];


        [
            updatedContents[index],
            updatedContents[newIndex],
        ] = [
                updatedContents[newIndex],
                updatedContents[index],
            ];


        setAttributes({
            features: updatedFeatures,
            contents: updatedContents,
        });


        setOpenIndex(newIndex);
    };



    const addFeature = () => {
        setAttributes({
            features: [
                ...features,
                {
                    name: 'New Feature',
                    summary: '',
                    isNew: false,
                },
            ],

            contents: [
                ...contents,
                {
                    title: 'New Feature',
                    description: '',
                    mediaId: 0,
                    mediaUrl: '',
                    mediaType: '',
                },
            ],
        });
    };



    const removeFeature = (index) => {
        const newFeatures = features.filter(
            (_, i) => i !== index
        );

        const newContents = contents.filter(
            (_, i) => i !== index
        );


        setAttributes({
            features: newFeatures,
            contents: newContents,
        });


        if (openIndex >= newFeatures.length) {
            setOpenIndex(
                Math.max(
                    0,
                    newFeatures.length - 1
                )
            );
        }
    };

    return (
        <section {...blockProps}>

            <div className="section-header">

                <RichText
                    tagName="h2"
                    className="section-title"
                    value={title}
                    onChange={(value) =>
                        setAttributes({
                            title: value,
                        })
                    }
                    placeholder="Section Title"
                />


                <RichText
                    tagName="p"
                    value={description}
                    onChange={(value) =>
                        setAttributes({
                            description: value,
                        })
                    }
                    placeholder="Section Description"
                />

            </div>



            <div className="section-inner">

                <div className="features-list">

                    {features.map((feature, index) => (

                        <div
                            key={index}
                            className={`feature ${openIndex === index
                                    ? 'is-open'
                                    : ''
                                }`}
                            onClick={() =>
                                setOpenIndex(index)
                            }
                        >

                            <div className="feature-header">


                                <div className="feature-actions">

                                    <Button
                                        icon="arrow-up-alt2"
                                        label="Move up"
                                        disabled={
                                            index === 0
                                        }
                                        onClick={(event) => {
                                            event.stopPropagation();

                                            moveFeature(
                                                index,
                                                -1
                                            );
                                        }}
                                    />


                                    <Button
                                        icon="arrow-down-alt2"
                                        label="Move down"
                                        disabled={
                                            index === features.length - 1
                                        }
                                        onClick={(event) => {
                                            event.stopPropagation();

                                            moveFeature(
                                                index,
                                                1
                                            );
                                        }}
                                    />

                                </div>



                                <label
                                    onClick={(event) =>
                                        event.stopPropagation()
                                    }
                                >

                                    <input
                                        type="checkbox"
                                        checked={
                                            feature.isNew
                                        }
                                        onChange={(event) =>
                                            updateFeature(
                                                index,
                                                'isNew',
                                                event.target.checked
                                            )
                                        }
                                    />

                                    NEW

                                </label>



                                <div className="feature-header-inner">

                                    <RichText
                                        tagName="h3"
                                        className="feature-name"
                                        value={
                                            feature.name
                                        }
                                        onChange={(value) =>
                                            updateFeature(
                                                index,
                                                'name',
                                                value
                                            )
                                        }
                                        placeholder="Feature Name"
                                        onClick={(event) =>
                                            event.stopPropagation()
                                        }
                                    />

                                </div>

                            </div>



                            <div
                                className="feature-summary"
                                onClick={(event) =>
                                    event.stopPropagation()
                                }
                            >

                                <RichText
                                    tagName="p"
                                    value={
                                        feature.summary
                                    }
                                    onChange={(value) =>
                                        updateFeature(
                                            index,
                                            'summary',
                                            value
                                        )
                                    }
                                    placeholder="Feature Summary"
                                />

                            </div>


                        </div>

                    ))}

                </div>





                <div className="features-content">

                    {contents.map((content, index) => (

                        <div
                            key={index}
                            className={`feature-content ${openIndex === index
                                    ? 'is-active'
                                    : ''
                                }`}
                        >

                            <RichText
                                tagName="h3"
                                value={
                                    content.title
                                }
                                onChange={(value) =>
                                    updateContent(
                                        index,
                                        'title',
                                        value
                                    )
                                }
                                placeholder="Content Title"
                            />



                            <RichText
                                tagName="p"
                                value={
                                    content.description
                                }
                                onChange={(value) =>
                                    updateContent(
                                        index,
                                        'description',
                                        value
                                    )
                                }
                                placeholder="Content Description"
                            />



                            <MediaUploadCheck>

                                <MediaUpload
                                    onSelect={(media) =>
                                        updateContentMedia(
                                            index,
                                            media
                                        )
                                    }
                                    allowedTypes={[
                                        'image',
                                        'video',
                                    ]}
                                    value={
                                        content.mediaId
                                    }
                                    render={({ open }) => (

                                        <Button
                                            onClick={open}
                                            isSecondary
                                        >
                                            {
                                                content.mediaUrl
                                                    ? 'Replace Media'
                                                    : 'Upload Media'
                                            }
                                        </Button>

                                    )}
                                />

                            </MediaUploadCheck>





                            {content.mediaUrl &&
                                content.mediaType === 'image' && (

                                    <div className="feature-media-preview">

                                        <img
                                            src={
                                                content.mediaUrl
                                            }
                                            alt=""
                                            style={{
                                                maxWidth: '100%',
                                                height: 'auto',
                                            }}
                                        />

                                    </div>

                                )}




                            {content.mediaUrl &&
                                content.mediaType === 'video' && (

                                    <div className="feature-media-preview">

                                        <video
                                            src={
                                                content.mediaUrl
                                            }
                                            controls
                                            style={{
                                                maxWidth: '100%',
                                                height: 'auto',
                                            }}
                                        />

                                    </div>

                                )}





                            <Button
                                isDestructive
                                onClick={() =>
                                    removeFeature(
                                        index
                                    )
                                }
                                style={{
                                    marginTop: '10px',
                                }}
                            >
                                Remove Feature
                            </Button>


                        </div>

                    ))}

                </div>

            </div>





            <Button
                isPrimary
                onClick={addFeature}
                style={{
                    marginTop: '20px',
                }}
            >
                Add Feature
            </Button>


        </section>
    );
}