'use strict';

import en_US from 'antd/lib/locale-provider/en_US';
export default {
    GsApp: {
        graphicalEditor: 'Graphical Editor',
        codeEditor: 'Code Editor'
    },
    GsRule: {
        removeRuleBtnText: 'Remove Rule',
        scaleFieldTitle: 'Use scale',
        filterFieldTitle: 'Use filter',
        nameFieldLabel: 'Name',
        nameFieldPlaceholder: 'Name eingeben'
    },
    GsStyle: {
        addRuleBtnText: 'Add Rule',
        removeRulesBtnText: 'Remove Rules',
        nameFieldLabel: 'Name',
        nameFieldPlaceholder: 'Enter Name'
    },
    GsStyleLoader: {
        label: 'Load Style: ',
        uploadButtonLabel: 'Upload Style'
    },
    GsDataLoader: {
        label: 'Load Data: ',
        uploadButtonLabel: 'Upload Data'
    },
    GsWfsParserInput: {
      requestButtonText: 'Get Data',
      urlLabel: 'Url',
      versionLabel: 'Version',
      typeNameLabel: 'FeatureTypeName',
      featureIDLabel: 'FeatureID',
      propertyNameLabel: 'PropertyName',
      maxFeaturesLabel: 'MaxFeatures',
      fetchParamsLabel: 'fetchParams'
    },
    GsCodeEditor: {
        downloadButtonLabel: 'Save as File',
        formatSelectLabel: 'Format'
    },
    GsWellKnownNameEditor: {
        radiusLabel: 'Radius',
        fillOpacityLabel: 'Fill-Opacity',
        fillColorLabel: 'Fill-Color',
        strokeColorLabel: 'Stroke-Color',
        strokeWidthLabel: 'Stroke-Width',
        strokeOpacityLabel: 'Stroke-Opacity',
        rotateLabel: 'Rotation'
    },
    GsFillEditor: {
        fillOpacityLabel: 'Fill-Opacity',
        fillColorLabel: 'Fill-Color',
        outlineColorLabel: 'Outline-Color',
        outlineWidthLabel: 'Outline-Width',
        outlineDasharrayLabel: 'Outline-Dasharray',
        graphicFillTypeLabel: 'Graphic Fill Type'
    },
    GsIconEditor: {
        imageLabel: 'Source',
        sizeLabel: 'Size',
        rotateLabel: 'Rotation',
        opacityLabel: 'Opacity'
    },
    GsLineEditor: {
        colorLabel: 'Color',
        widthLabel: 'Width',
        opacityLabel: 'Opacity',
        dashLabel: 'Dash Pattern',
        dashOffsetLabel: 'Dash Offset',
        capLabel: 'Cap',
        joinLabel: 'Join',
        graphicStrokeTypeLabel: 'Graphic Stroke Type',
        graphicFillTypeLabel: 'Graphic Fill Type'
    },
    GsTextEditor: {
        templateFieldLabel: 'Template',
        opacityLabel: 'Text-Opacity',
        colorLabel: 'Text-Color',
        sizeLabel: 'Text-Size',
        offsetXLabel: 'Offset X',
        offsetYLabel: 'Offset Y',
        attributeComboPlaceholder: 'Select Field',
        rotateLabel: 'Rotation',
        haloColorLabel: 'Halo-Color',
        haloWidthLabel: 'Halo-Width'
    },
    GsPropTextEditor: {
        propFieldLabel: 'Field',
        opacityLabel: 'Text-Opacity',
        colorLabel: 'Text-Color',
        sizeLabel: 'Text-Size',
        offsetXLabel: 'Offset X',
        offsetYLabel: 'Offset Y',
        attributeComboPlaceholder: 'Select Field',
        rotateLabel: 'Rotation',
        haloColorLabel: 'Halo-Color',
        haloWidthLabel: 'Halo-Width'
    },
    GsPreview: {
        openEditorText: 'Edit Symbolizer',
        closeEditorText: 'Close Editor'
    },
    GsColorField: {
        closeText: 'Close',
        editText: 'Change',
        chooseText: 'Pick',
    },
    GsKindField: {
        label: 'Kind',
        symbolizerKinds: {
            Mark: 'Mark',
            Fill: 'Fill',
            Icon: 'Icon',
            Line: 'Line',
            Text: 'Text'
        }
    },
    GsGraphicTypeField: {
      Mark: 'Mark',
      Icon: 'Icon'
    },
    GsScaleDenominator: {
        minScaleDenominatorLabelText: 'Min. Scale',
        maxScaleDenominatorLabelText: 'Max. Scale',
        minScaleDenominatorPlaceholderText: 'Enter min. Scale (Optional)',
        maxScaleDenominatorPlaceholderText: 'Enter max. Scale (Optional)'
    },
    GsWellKnownNameField: {
        label: 'Symbol',
        wellKnownNames: {
          Circle: 'Circle',
          Square: 'Square',
          Triangle: 'Triangle',
          Star: 'Star',
          Cross: 'Cross',
          X: 'X'
        }
    },
    GsSymbolizerEditorWindow: {
      symbolizersEditor: 'Symbolizer Editor'
    },
    GsFilterEditorWindow: {
      filterEditor: 'Filter Editor'
    },
    GsMultiEditor: {
      add: 'Add',
      remove: 'Remove'
    },
    GsUploadButton: {
      upload: 'Upload'
    },
    GsRuleTable: {
      symbolizersColumnTitle: 'Symbolizers',
      nameColumnTitle: 'Name',
      filterColumnTitle: 'Filter',
      minScaleColumnTitle: 'Min. Scale',
      maxScaleColumnTitle: 'Max. Scale'
    },
    GsRuleGenerator: {
      attribute: 'Attribute',
      generateButtonText: 'Generate Rules',
      levelOfMeasurement: 'Level of Measurement',
      nominal: 'Nominal',
      ordinal: 'Ordinal',
      cardinal: 'Cardinal',
      numberOfRules: 'Number of Rules',
      colorRamp: 'Color Ramp',
      colorRampPlaceholder: 'Select…'
    },
    GsRuleGeneratorWindow: {
      ruleGenerator: 'Rule Generator'
    },
    ...en_US
};
