/**
 * Tabs with Content Block - Editor Component
 */

import {
  useBlockProps,
  InspectorControls,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  InnerBlocks,
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  Button,
  ToggleControl,
  __experimentalNumberControl as NumberControl,
  Tooltip,
  Icon,
} from '@wordpress/components';
import { trash, plus } from '@wordpress/icons';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  const { title, description, tabs } = attributes;
  const [selectedTabId, setSelectedTabId] = useState(tabs && tabs.length > 0 ? tabs[0].id : null);

  // Initialize tabs if they don't exist
  if (!tabs || tabs.length === 0) {
    setAttributes({
      tabs: [
        {
          id: 1,
          name: 'RealView',
          image: null,
          itemTitle: 'RealView™',
          itemDescription:
            "Never retest again. Confirm results and educate patients with Heru's RealView™ video playback.",
          listItems: [
            'Video bookmarks for detected anomalies',
            'IR video data for patient education',
            'Reduce the need for retesting',
          ],
          buttonText: 'Learn More',
          buttonUrl: '#',
          showButton: true,
        },
      ],
    });
    setSelectedTabId(1);
    return null;
  }

  // Update tab data
  const updateTab = (tabIndex, key, value) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex] = {
      ...updatedTabs[tabIndex],
      [key]: value,
    };
    setAttributes({ tabs: updatedTabs });
  };

  // Update list items
  const updateListItem = (tabIndex, itemIndex, value) => {
    const updatedTabs = [...tabs];
    const listItems = [...updatedTabs[tabIndex].listItems];
    listItems[itemIndex] = value;
    updatedTabs[tabIndex].listItems = listItems;
    setAttributes({ tabs: updatedTabs });
  };

  // Add list item
  const addListItem = (tabIndex) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex].listItems.push('');
    setAttributes({ tabs: updatedTabs });
  };

  // Remove list item
  const removeListItem = (tabIndex, itemIndex) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex].listItems.splice(itemIndex, 1);
    setAttributes({ tabs: updatedTabs });
  };

  // Add new tab
  const addTab = () => {
    const newTabId = Math.max(...tabs.map((t) => t.id), 0) + 1;
    setAttributes({
      tabs: [
        ...tabs,
        {
          id: newTabId,
          name: `Tab ${newTabId}`,
          image: null,
          itemTitle: 'Tab Title',
          itemDescription: 'Tab description goes here.',
          listItems: ['Item 1', 'Item 2'],
          buttonText: 'Learn More',
          buttonUrl: '#',
          showButton: true,
        },
      ],
    });
    setSelectedTabId(newTabId);
  };

  // Remove tab
  const removeTab = (tabIndex) => {
    const updatedTabs = tabs.filter((_, index) => index !== tabIndex);
    setAttributes({ tabs: updatedTabs });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Block Settings" initialOpen={true}>
          <TextControl
            label="Section Title"
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />
          <TextControl
            label="Section Description"
            value={description}
            onChange={(value) => setAttributes({ description: value })}
            help="Optional description displayed under the title"
          />
        </PanelBody>

        {tabs.map((tab, tabIndex) => (
          <PanelBody
            key={tab.id}
            title={`Tab: ${tab.name}`}
            initialOpen={selectedTabId === tab.id}
            onClick={() => setSelectedTabId(tab.id)}
            style={{
              cursor: 'pointer',
              borderLeft: selectedTabId === tab.id ? '4px solid #0073aa' : '4px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <TextControl
              label="Tab Name"
              value={tab.name}
              onChange={(value) => updateTab(tabIndex, 'name', value)}
              help="Displayed on the tab button"
            />

            <TextControl
              label="Tab Title"
              value={tab.itemTitle}
              onChange={(value) => updateTab(tabIndex, 'itemTitle', value)}
            />

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '13px' }}>
                Tab Description
              </label>
              <textarea
                value={tab.itemDescription}
                onChange={(e) => updateTab(tabIndex, 'itemDescription', e.target.value)}
                placeholder="Tab description goes here..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #8f8f8f',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <ToggleControl
              label="Show Button"
              checked={tab.showButton !== false}
              onChange={(value) => updateTab(tabIndex, 'showButton', value)}
              help="Toggle to show or hide the action button"
            />

            {tab.showButton !== false && (
              <>
                <TextControl
                  label="Button Text"
                  value={tab.buttonText}
                  onChange={(value) => updateTab(tabIndex, 'buttonText', value)}
                />

                <TextControl
                  label="Button URL"
                  value={tab.buttonUrl}
                  onChange={(value) => updateTab(tabIndex, 'buttonUrl', value)}
                />
              </>
            )}

            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
              <h3>List Items</h3>
              {tab.listItems.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '8px',
                    alignItems: 'center',
                  }}
                >
                  <TextControl
                    value={item}
                    onChange={(value) => updateListItem(tabIndex, itemIndex, value)}
                    placeholder="List item text"
                  />
                  <Tooltip text="Remove item">
                    <Button
                      isDestructive
                      isSmall
                      onClick={() => removeListItem(tabIndex, itemIndex)}
                      icon={trash}
                    />
                  </Tooltip>
                </div>
              ))}
              <Button
                variant="secondary"
                onClick={() => addListItem(tabIndex)}
                icon={plus}
              >
                Add Item
              </Button>
            </div>

            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) =>
                  updateTab(tabIndex, 'image', {
                    id: media.id,
                    url: media.url,
                    alt: media.alt,
                  })
                }
                allowedTypes={['image']}
                render={({ open }) => (
                  <div style={{ marginBottom: '20px' }}>
                    {tab.image && tab.image.url && (
                      <div style={{ marginBottom: '10px' }}>
                        <img
                          src={tab.image.url}
                          alt={tab.image.alt || 'Tab image'}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '4px',
                          }}
                        />
                      </div>
                    )}
                    <Button variant="primary" onClick={open}>
                      {tab.image && tab.image.url
                        ? 'Change Image'
                        : 'Select Image'}
                    </Button>
                    {tab.image && tab.image.url && (
                      <Button
                        isDestructive
                        onClick={() => updateTab(tabIndex, 'image', null)}
                        style={{ marginLeft: '8px' }}
                      >
                        Remove Image
                      </Button>
                    )}
                  </div>
                )}
              />
            </MediaUploadCheck>

            <Button
              isDestructive
              onClick={() => removeTab(tabIndex)}
              style={{ marginTop: '10px', width: '100%' }}
            >
              Remove Tab
            </Button>
          </PanelBody>
        ))}

        <PanelBody title="Add Tab" initialOpen={false}>
          <Button isPrimary onClick={addTab} style={{ width: '100%' }}>
            + Add New Tab
          </Button>
        </PanelBody>
      </InspectorControls>

      <section {...blockProps}>
        <div className="section-header">
          {title && <h2 className="section-title">{title}</h2>}
          {description && <p>{description}</p>}
        </div>

        <div className="tabs-container">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${selectedTabId === tab.id ? 'is-active' : ''}`}
                onClick={() => setSelectedTabId(tab.id)}
                style={{ cursor: 'pointer' }}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="tabs-content">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className="tab-content"
                style={{ display: selectedTabId === tab.id ? 'flex' : 'none' }}
              >
                <div className="image-wrapper">
                  {tab.image && tab.image.url ? (
                    <img src={tab.image.url} alt={tab.image.alt || ''} />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '300px',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        color: '#999',
                      }}
                    >
                      Image placeholder
                    </div>
                  )}
                </div>

                <div className="content-wrapper">
                  <h3>{tab.itemTitle}</h3>
                  <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {tab.itemDescription}
                  </p>

                  {tab.listItems.length > 0 && (
                    <ul>
                      {tab.listItems.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {tab.showButton !== false && (
                    <div className="wp-block-buttons">
                      <div className="wp-block-button">
                        <a href={tab.buttonUrl} className="wp-block-button__link wp-element-button">
                          {tab.buttonText}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}