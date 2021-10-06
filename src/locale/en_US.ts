/* eslint-disable camelcase */
/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

import en_US from 'antd/lib/locale-provider/en_US';
export default {
  GsApp: {
    graphicalEditor: 'Graphical Editor',
    codeEditor: 'Code Editor'
  },
  GsBulkEditModals: {
    colorLabel: 'Select color',
    radiusLabel: 'Select radius',
    opacityLabel: 'Select opacity',
    symbolLabel: 'Select symbol',
    imageFieldLabel: 'Source',
    imageFieldTooltipLabel: 'Open Gallery'
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
    cloneRulesBtnText: 'Clone Rules',
    removeRulesBtnText: 'Remove Rules',
    nameFieldLabel: 'Name',
    nameFieldPlaceholder: 'Enter Name',
    titleFieldLabel: 'Title',
    titleFieldPlaceholder: 'Enter Title',
    colorLabel: 'Select color',
    radiusLabel: 'Select radius',
    opacityLabel: 'Select opacity',
    symbolLabel: 'Select symbol',
    multiEditLabel: 'Multi edit',
    ruleGeneratorWindowBtnText: 'Classification'
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
    copyButtonLabel: 'Copy to Clipboard',
    formatSelectLabel: 'Format',
    styleCopied: 'Style copied to clipboard!'
  },
  GsWellKnownNameEditor: {
    radiusLabel: 'Radius',
    fillOpacityLabel: 'Fill-Opacity',
    fillColorLabel: 'Fill-Color',
    opacityLabel: 'Opacity',
    strokeColorLabel: 'Stroke-Color',
    strokeWidthLabel: 'Stroke-Width',
    strokeOpacityLabel: 'Stroke-Opacity',
    rotateLabel: 'Rotation'
  },
  GsFillEditor: {
    opacityLabel: 'Opacity',
    fillOpacityLabel: 'Fill-Opacity',
    outlineOpacityLabel: 'Stroke-Opacity',
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
    opacityLabel: 'Opacity',
    iconTooltipLabel: 'Open Gallery'
  },
  GsMarkEditor: {
    wellKnownNameFieldLabel: 'Symbol'
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
    fontLabel: 'Font',
    templateFieldLabel: 'Template',
    opacityLabel: 'Text-Opacity',
    colorLabel: 'Text-Color',
    sizeLabel: 'Text-Size',
    offsetXLabel: 'Offset X',
    offsetYLabel: 'Offset Y',
    attributeComboPlaceholder: 'Select Field',
    rotateLabel: 'Rotation',
    haloColorLabel: 'Halo-Color',
    haloWidthLabel: 'Halo-Width',
    attributeNotFound: 'Field not found'
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
  GsRasterEditor: {
    opacityLabel: 'Opacity',
    hueRotateLabel: 'Hue Rotation',
    brightnessMinLabel: 'Min. Brightness',
    brightnessMaxLabel: 'Max. Brightness',
    saturationLabel: 'Saturation',
    contrastLabel: 'Contrast',
    fadeDurationLabel: 'Fade Duration',
    resamplingLabel: 'Resampling',
    contrastEnhancementLabel: 'Contrast Enhancement',
    gammaValueLabel: 'Gamma',
    colorMapLabel: 'Color Map',
    symbolizerLabel: 'Symbolizer',
    channelSelectionLabel: 'Channel Selection'
  },
  GsRasterChannelEditor: {
    channelSelectionLabel: 'Edit Channels',
    redBandLabel: 'Red',
    greenBandLabel: 'Green',
    blueBandLabel: 'Blue',
    grayBandLabel: 'Gray',
    channelSelectionGrayLabel: 'Gray',
    channelSelectionRgbLabel: 'RGB',
    titleLabel: 'Channel Selection'
  },
  GsColorMapEditor: {
    typeLabel: 'Type',
    extendedLabel: 'Color Depth',
    colorMapEntriesLabel: 'Colormap',
    titleLabel: 'Color Map',
    nrOfClassesLabel: 'Nr. of classes',
    colorRampLabel: 'Color Ramp',
    colorLabel: 'Color',
    quantityLabel: 'Quantity',
    labelLabel: 'Label',
    opacityLabel: 'Opacity'
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
    symbolizerKinds: {
      Mark: 'Mark',
      Fill: 'Fill',
      Icon: 'Icon',
      Line: 'Line',
      Text: 'Text',
      Raster: 'Raster'
    }
  },
  GsGraphicTypeField: {
    Mark: 'Mark',
    Icon: 'Icon'
  },
  GsRgbChannelField: {
    redLabel: 'Red band',
    greenLabel: 'Green band',
    blueLabel: 'Blue band'
  },
  GsGrayChannelField: {
    grayLabel: 'Gray band'
  },
  GsScaleDenominator: {
    minScaleDenominatorLabelText: 'Min. Scale',
    maxScaleDenominatorLabelText: 'Max. Scale',
    minScaleDenominatorPlaceholderText: 'Enter min. Scale (Optional)',
    maxScaleDenominatorPlaceholderText: 'Enter max. Scale (Optional)'
  },
  GsWellKnownNameField: {
    wellKnownNames: {
      Circle: 'Circle',
      Square: 'Square',
      Triangle: 'Triangle',
      Star: 'Star',
      Cross: 'Cross',
      X: 'X'
    }
  },
  GsColorMapEntryField: {
    colorLabel: 'Color',
    labelLabel: 'Legend Label',
    quantityLabel: 'Quantity',
    opacityLabel: 'Opacity'
  },
  GsChannelField: {
    sourceChannelNameLabel: 'Channel Name',
    contrastEnhancementTypeLabel: 'Contrast Enhancement',
    gammaValueLabel: 'Gamma'
  },
  GsColorMapTypeField: {
    rampMapTypeLabel: 'Interpolated',
    intervalsMapTypeLabel: 'Intervals',
    valuesMapTypeLabel: 'Values'
  },
  GsSymbolizerEditor: {
    kindFieldLabel: 'Kind'
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
  GsFilterTree: {
    andDrpdwnLabel: 'AND-Filter',
    orDrpdwnLabel: 'OR-Filter',
    notDrpdwnLabel: 'NOT-Filter',
    comparisonDrpdwnLabel: 'Comparison-Filter',
    addFilterLabel: 'Add Filter',
    changeFilterLabel: 'Change Filter',
    removeFilterLabel: 'Remove Filter',
    andFilterText: 'AND',
    orFilterText: 'OR',
    notFilterText: 'NOT'
  },
  GsRuleTable: {
    symbolizersColumnTitle: 'Symbolizers',
    nameColumnTitle: 'Name',
    filterColumnTitle: 'Filter',
    minScaleColumnTitle: 'Min. Scale',
    maxScaleColumnTitle: 'Max. Scale',
    amountColumnTitle: 'Amount',
    duplicatesColumnTitle: 'Duplicates'
  },
  GsRules: {
    rulesTitle: 'Rules',
    multiEdit: 'Select',
    addRule: 'Add',
    classification: 'Classification',
    remove: 'Remove',
    clone: 'Clone',
    edit: 'Edit',
    defaultRuleTitle: 'Untitled'
  },
  GsRuleReorderButtons: {
    ruleMoveUpTip: 'Move rule one position up',
    ruleMoveDownTip: 'Move rule one position down'
  },
  GsRuleGenerator: {
    attribute: 'Attribute',
    generateButtonText: 'Classify',
    levelOfMeasurement: 'Level of Measurement',
    nominal: 'Nominal',
    ordinal: 'Ordinal',
    cardinal: 'Cardinal',
    numberOfRules: 'Number of Classes',
    colorRamp: 'Color Ramp',
    colorSpace: 'Color Space',
    colorRampPlaceholder: 'Select…',
    colorRampMinClassesWarningPre: 'Color Ramp requires at least',
    colorRampMinClassesWarningPost: 'classes',
    symbolizer: 'Symbolizer',
    classification: 'Classification Method',
    classificationPlaceholder: 'Select…',
    equalInterval: 'Equal Interval',
    preview: 'Color Preview',
    numberOfRulesViaKmeans: '…affected by k-Means classification.',
    allDistinctValues: 'Use all distinct values'
  },
  GsColorRampCombo: {
    colorRampPlaceholder: 'Select…'
  },
  GsColorSpaceCombo: {
    colorSpacePlaceholder: 'Select…'
  },
  GsClassificationCombo: {
    equalInterval: 'Equal Interval',
    quantile: 'Quantile ',
    logarithmic: 'Logarithmic',
    kmeans: 'k-Means'
  },
  GsRuleGeneratorWindow: {
    ruleGenerator: 'Classification'
  },
  GsIconSelectorWindow: {
    windowLabel: 'Select Icon'
  },
  GsIconSelector: {
    librarySelectLabel: 'Select Library'
  },
  GsSLDUnitsSelect: {
    symbolizerUnitsLabel: 'Symbolizer units',
    symbolizerUnitsPixel: 'pixel',
    symbolizerUnitsMeter: 'meter',
    symbolizerUnitsFoot: 'foot'
  },
  ...en_US
};
