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
    GsCodeEditor: {
        downloadButtonLabel: 'Save as File',
        formatSelectLabel: 'Format'
    },
    GsCircleEditor: {
        radiusLabel: 'Radius',
        fillOpacityLabel: 'Fill-Opacity',
        fillColorLabel: 'Fill-Color',
        strokeColorLabel: 'Stroke-Color',
        strokeWidthLabel: 'Stroke-Width',
        strokeOpacityLabel: 'Stroke-Opacity'
    },
    GsFillEditor: {
        fillOpacityLabel: 'Fill-Opacity',
        fillColorLabel: 'Fill-Color',
        outlineColorLabel: 'Stroke-Color'
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
        joinLabel: 'Join'
    },
    GsTextEditor: {
        fieldLabel: 'Field',
        opacityLabel: 'Text-Opacity',
        colorLabel: 'Text-Color',
        sizeLabel: 'Text-Size',
        offsetXLabel: 'Offset X',
        offsetYLabel: 'Offset Y',
        attributeComboPlaceholder: 'Select Field'
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
            Circle: 'Circle',
            Fill: 'Fill',
            Icon: 'Icon',
            Line: 'Line',
            Text: 'Text'
        }
    },
    GsScaleDenominator: {
        minScaleDenominatorLabelText: 'Min. Scale',
        maxScaleDenominatorLabelText: 'Max. Scale',
        minScaleDenominatorPlaceholderText: 'Enter min. Scale (Optional)',
        maxScaleDenominatorPlaceholderText: 'Enter max. Scale (Optional)'
    },
    ...en_US
};