import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const [openIndex, setOpenIndex] = useState(0);

    const {
        title = 'Heru Prime Modalities',
        description = 'Heru Prime replaces an entire exam lane of traditional diagnostic equipment with a single wearable device.',
        features = [
            { name: 'PretestPro™', summary: 'This is a summary of feature 1', isNew: true },
            { name: 'PretestPro™', summary: 'This is a summary of feature 1', isNew: false },
            { name: 'PretestPro™', summary: 'This is a summary of feature 1', isNew: true }
        ],
        contents = [
            { title: 'Test item 1', description: 'Test item 1 description' },
            { title: 'Test item 2', description: 'Test item 2 description' },
            { title: 'Test item 3', description: 'Test item 3 description' }
        ]
    } = attributes;

    const updateFeature = (index, key, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = { ...updatedFeatures[index], [key]: value };
        setAttributes({ features: updatedFeatures });
    };

    const updateContent = (index, key, value) => {
        const updatedContents = [...contents];
        updatedContents[index] = { ...updatedContents[index], [key]: value };
        setAttributes({ contents: updatedContents });
    };

    const addFeature = () => {
        setAttributes({
            features: [...features, { name: 'New Feature', summary: '', isNew: false }],
            contents: [...contents, { title: 'New Feature', description: '' }]
        });
    };

    const removeFeature = (index) => {
        setAttributes({
            features: features.filter((_, i) => i !== index),
            contents: contents.filter((_, i) => i !== index)
        });
    };

    return (
        <section {...blockProps}>
            <div className="section-header">
                <RichText
                    tagName="h2"
                    className="section-title"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder="Section Title"
                />
                <RichText
                    tagName="p"
                    value={description}
                    onChange={(value) => setAttributes({ description: value })}
                    placeholder="Section Description"
                />
            </div>

            <div className="section-inner">
                <div className="features-list">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`feature ${openIndex === index ? 'is-open' : ''}`}
                            onClick={() => setOpenIndex(index)}
                        >
                            <div className="feature-header">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={feature.isNew}
                                        onChange={(e) =>
                                            updateFeature(index, 'isNew', e.target.checked)
                                        }
                                    />
                                    NEW
                                </label>
                                <div className="feature-header-inner">
                                    <RichText
                                        tagName="h3"
                                        className="feature-name"
                                        value={feature.name}
                                        onChange={(value) =>
                                            updateFeature(index, 'name', value)
                                        }
                                        placeholder="Feature Name"
                                    />
                                </div>
                            </div>
                            <div className="feature-summary">
                                <RichText
                                    tagName="p"
                                    value={feature.summary}
                                    onChange={(value) =>
                                        updateFeature(index, 'summary', value)
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
                            className={`feature-content ${openIndex === index ? 'is-active' : ''}`}
                        >
                            <RichText
                                tagName="h3"
                                value={content.title}
                                onChange={(value) => updateContent(index, 'title', value)}
                                placeholder="Content Title"
                            />
                            <RichText
                                tagName="p"
                                value={content.description}
                                onChange={(value) =>
                                    updateContent(index, 'description', value)
                                }
                                placeholder="Content Description"
                            />
                            <Button
                                isDestructive
                                onClick={() => removeFeature(index)}
                                style={{ marginTop: '10px' }}
                            >
                                Remove Feature
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <Button isPrimary onClick={addFeature} style={{ marginTop: '20px' }}>
                Add Feature
            </Button>
        </section>
    );
}