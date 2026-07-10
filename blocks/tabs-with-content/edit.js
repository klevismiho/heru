/**
 * Tabs with Content Block - Editor Component
 */

import { __ } from '@wordpress/i18n';
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
        <PanelBody title={__('Block Settings', 'heru-tabs')} initialOpen={true}>
          <TextControl
            label={__('Section Title', 'heru-tabs')}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />
          <TextControl
            label={__('Section Description', 'heru-tabs')}
            value={description}
            onChange={(value) => setAttributes({ description: value })}
            help={__('Optional description displayed under the title', 'heru-tabs')}
          />
        </PanelBody>

        {tabs.map((tab, tabIndex) => (
          <PanelBody
            key={tab.id}
            title={__(`Tab: ${tab.name}`, 'heru-tabs')}
            initialOpen={selectedTabId === tab.id}
            onClick={() => setSelectedTabId(tab.id)}
            style={{
              cursor: 'pointer',
              borderLeft: selectedTabId === tab.id ? '4px solid #0073aa' : '4px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <TextControl
              label={__('Tab Name', 'heru-tabs')}
              value={tab.name}
              onChange={(value) => updateTab(tabIndex, 'name', value)}
              help={__('Displayed on the tab button', 'heru-tabs')}
            />

            <TextControl
              label={__('Tab Title', 'heru-tabs')}
              value={tab.itemTitle}
              onChange={(value) => updateTab(tabIndex, 'itemTitle', value)}
            />

            <TextControl
              label={__('Tab Description', 'heru-tabs')}
              value={tab.itemDescription}
              onChange={(value) => updateTab(tabIndex, 'itemDescription', value)}
            />

            <ToggleControl
              label={__('Show Button', 'heru-tabs')}
              checked={tab.showButton !== false}
              onChange={(value) => updateTab(tabIndex, 'showButton', value)}
              help={__('Toggle to show or hide the action button', 'heru-tabs')}
            />

            {tab.showButton !== false && (
              <>
                <TextControl
                  label={__('Button Text', 'heru-tabs')}
                  value={tab.buttonText}
                  onChange={(value) => updateTab(tabIndex, 'buttonText', value)}
                />

                <TextControl
                  label={__('Button URL', 'heru-tabs')}
                  value={tab.buttonUrl}
                  onChange={(value) => updateTab(tabIndex, 'buttonUrl', value)}
                />
              </>
            )}

            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
              <h3>{__('List Items', 'heru-tabs')}</h3>
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
                    placeholder={__('List item text', 'heru-tabs')}
                  />
                  <Tooltip text={__('Remove item', 'heru-tabs')}>
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
                {__('Add Item', 'heru-tabs')}
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
                        ? __('Change Image', 'heru-tabs')
                        : __('Select Image', 'heru-tabs')}
                    </Button>
                    {tab.image && tab.image.url && (
                      <Button
                        isDestructive
                        onClick={() => updateTab(tabIndex, 'image', null)}
                        style={{ marginLeft: '8px' }}
                      >
                        {__('Remove Image', 'heru-tabs')}
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
              {__('Remove Tab', 'heru-tabs')}
            </Button>
          </PanelBody>
        ))}

        <PanelBody title={__('Add Tab', 'heru-tabs')} initialOpen={false}>
          <Button isPrimary onClick={addTab} style={{ width: '100%' }}>
            {__('+ Add New Tab', 'heru-tabs')}
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
                      {__('Image placeholder', 'heru-tabs')}
                    </div>
                  )}
                </div>

                <div className="content-wrapper">
                  <h3>{tab.itemTitle}</h3>
                  <p>{tab.itemDescription}</p>

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