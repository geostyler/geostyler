/* eslint-disable @typescript-eslint/naming-convention */
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
import antd_en_US from 'antd/lib/locale-provider/en_US';
import { GeoStylerLocale } from './locale';
const en_US: GeoStylerLocale = {
  StyleFieldContainer: {
    nameFieldLabel: 'Name',
    nameFieldPlaceholder: 'Enter name',
    titleFieldLabel: 'Title',
    titleFieldPlaceholder: 'Enter title'
  },
  Editor: {
    kindFieldLabel: 'Kind'
  },
  RuleFieldContainer: {
    nameFieldLabel: 'Name',
    nameFieldPlaceholder: 'Enter name'
  },
  BulkEditModals: {
    colorLabel: 'Select color',
    radiusLabel: 'Select radius',
    opacityLabel: 'Select opacity',
    symbolLabel: 'Select symbol',
    imageFieldLabel: 'Source',
    imageFieldTooltipLabel: 'Open Gallery'
  },
  BulkEditor: {
    colorLabel: 'Select color',
    radiusLabel: 'Select radius',
    opacityLabel: 'Select opacity',
    symbolLabel: 'Select symbol',
    imageFieldLabel: 'Source'
  },
  Rule: {
    removeRuleBtnText: 'Remove Rule',
    scaleFieldTitle: 'Use scale',
    filterFieldTitle: 'Use filter',
    nameFieldLabel: 'Name',
    nameFieldPlaceholder: 'Enter name',
    attributeLabel: 'Attribute',
    attributePlaceholderString: 'Choose attribute',
    attributeValidationHelpString: 'Please choose an attribute',
    operatorLabel: 'Operator',
    operatorPlaceholderString: 'Choose operator',
    operatorValidationHelpString: 'Please choose an operator',
    valueLabel: 'Value',
    valuePlaceholder: 'Enter value',
    valueValidationHelpString: 'Please enter a value'
  },
  Style: {
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
  CardStyle: {
    styleTitle: 'Style',
    classificationTitle: 'Classification',
    multiEditTitle: 'Multi edit',
    symbolizerTitle: 'Symbolizer',
    filterTitle: 'Filters',
    iconLibrariesTitle: 'Gallery'
  },
  StyleOverview: {
    styleTitle: 'Style'
  },
  RuleOverview: {
    ruleTitle: 'Rule'
  },
  Symbolizers: {
    symbolizersTitle: 'Symbolizers',
    addSymbolizer: 'Add symbolizer',
    showAll: 'Show all',
    hide: 'Hide'
  },
  StyleLoader: {
    label: 'Load Style: ',
    uploadButtonLabel: 'Upload Style'
  },
  DataLoader: {
    label: 'Load Data: ',
    uploadButtonLabel: 'Upload Data'
  },
  WfsParserInput: {
    requestButtonText: 'Get Data',
    urlLabel: 'Url',
    versionLabel: 'Version',
    typeNameLabel: 'FeatureTypeName',
    featureIDLabel: 'FeatureID',
    propertyNameLabel: 'PropertyName',
    maxFeaturesLabel: 'MaxFeatures',
    fetchParamsLabel: 'fetchParams',
    srsNameLabel: 'SrsName'
  },
  CodeEditor: {
    downloadButtonLabel: 'Save as File',
    copyButtonLabel: 'Copy to Clipboard',
    formatSelectLabel: 'Format',
    styleCopied: 'Style copied to clipboard!',
    writeFeedback: 'Feedback while writing with',
    readFeedback: 'Feedback while reading with',
  },
  ParserFeedback: {
    notSupported: 'is not supported by used parser',
    partiallySupported: 'is only partially supported by used parser'
  },
  WellKnownNameEditor: {
    radiusLabel: 'Radius',
    fillOpacityLabel: 'Fill-Opacity',
    fillColorLabel: 'Fill-Color',
    opacityLabel: 'Opacity',
    strokeColorLabel: 'Stroke-Color',
    strokeWidthLabel: 'Stroke-Width',
    strokeOpacityLabel: 'Stroke-Opacity',
    rotateLabel: 'Rotation'
  },
  FillEditor: {
    opacityLabel: 'Opacity',
    fillOpacityLabel: 'Fill-Opacity',
    outlineOpacityLabel: 'Stroke-Opacity',
    fillColorLabel: 'Fill-Color',
    outlineColorLabel: 'Outline-Color',
    outlineWidthLabel: 'Outline-Width',
    outlineDasharrayLabel: 'Outline-Dasharray',
    graphicFillTypeLabel: 'Graphic Fill Type'
  },
  IconEditor: {
    imageLabel: 'Source',
    imagePlaceholder: 'URL to Icon',
    sizeLabel: 'Size',
    rotateLabel: 'Rotation',
    opacityLabel: 'Opacity',
    iconTooltipLabel: 'Open Gallery'
  },
  MarkEditor: {
    wellKnownNameFieldLabel: 'Symbol'
  },
  LineEditor: {
    capLabel: 'Cap',
    colorLabel: 'Color',
    dashLabel: 'Dash Pattern',
    dashOffsetLabel: 'Dash Offset',
    graphicFillTypeLabel: 'Graphic Fill Type',
    graphicStrokeTypeLabel: 'Graphic Stroke Type',
    joinLabel: 'Join',
    opacityLabel: 'Opacity',
    perpendicularOffsetLabel: 'Perpendicular Offset',
    widthLabel: 'Width',
  },
  TextEditor: {
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
  PropTextEditor: {
    propFieldLabel: 'Field',
    opacityLabel: 'Text-Opacity',
    fontLabel: 'Font',
    colorLabel: 'Text-Color',
    sizeLabel: 'Text-Size',
    offsetXLabel: 'Offset X',
    offsetYLabel: 'Offset Y',
    attributeComboPlaceholder: 'Select Field',
    rotateLabel: 'Rotation',
    haloColorLabel: 'Halo-Color',
    haloWidthLabel: 'Halo-Width'
  },
  RasterEditor: {
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
  RasterChannelEditor: {
    channelSelectionLabel: 'Edit Channels',
    redBandLabel: 'Red',
    greenBandLabel: 'Green',
    blueBandLabel: 'Blue',
    grayBandLabel: 'Gray',
    channelSelectionGrayLabel: 'Gray',
    channelSelectionRgbLabel: 'RGB',
    titleLabel: 'Channel Selection'
  },
  ColorMapEditor: {
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
  Preview: {
    openEditorText: 'Edit Symbolizer',
    closeEditorText: 'Close Editor'
  },
  ColorField: {
    clearText: 'Clear',
    closeText: 'Close',
    editText: 'Change',
    chooseText: 'Pick',
  },
  KindField: {
    symbolizerKinds: {
      Mark: 'Mark',
      Fill: 'Fill',
      Icon: 'Icon',
      Line: 'Line',
      Text: 'Text',
      Raster: 'Raster'
    }
  },
  GraphicTypeField: {
    Mark: 'Mark',
    Icon: 'Icon'
  },
  RgbChannelField: {
    redLabel: 'Red band',
    greenLabel: 'Green band',
    blueLabel: 'Blue band'
  },
  GrayChannelField: {
    grayLabel: 'Gray band'
  },
  ScaleDenominator: {
    minScaleDenominatorLabelText: 'Min. Scale',
    maxScaleDenominatorLabelText: 'Max. Scale',
    minScaleDenominatorPlaceholderText: 'Enter min. Scale (Optional)',
    maxScaleDenominatorPlaceholderText: 'Enter max. Scale (Optional)'
  },
  WellKnownNameField: {
    wellKnownNames: {
      Circle: 'Circle',
      Square: 'Square',
      Triangle: 'Triangle',
      Star: 'Star',
      Cross: 'Cross',
      X: 'X'
    }
  },
  ColorMapEntryField: {
    colorLabel: 'Color',
    labelLabel: 'Legend Label',
    quantityLabel: 'Quantity',
    opacityLabel: 'Opacity'
  },
  ChannelField: {
    sourceChannelNameLabel: 'Channel Name',
    contrastEnhancementTypeLabel: 'Contrast Enhancement',
    gammaValueLabel: 'Gamma'
  },
  ColorMapTypeField: {
    rampMapTypeLabel: 'Interpolated',
    intervalsMapTypeLabel: 'Intervals',
    valuesMapTypeLabel: 'Values'
  },
  SymbolizerEditor: {
    kindFieldLabel: 'Kind'
  },
  SymbolizerEditorWindow: {
    symbolizersEditor: 'Symbolizer Editor'
  },
  FilterOverview: {
    filterTitle: 'Filters'
  },
  FilterEditorWindow: {
    filterEditor: 'Filter Editor'
  },
  MultiEditor: {
    add: 'Add',
    remove: 'Remove'
  },
  UploadButton: {
    upload: 'Upload'
  },
  FilterTree: {
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
  RuleTable: {
    symbolizersColumnTitle: 'Symbolizers',
    nameColumnTitle: 'Name',
    filterColumnTitle: 'Filter',
    minScaleColumnTitle: 'Min. Scale',
    maxScaleColumnTitle: 'Max. Scale',
    amountColumnTitle: 'Amount',
    duplicatesColumnTitle: 'Duplicates'
  },
  Rules: {
    rulesTitle: 'Rules',
    multiEdit: 'Select',
    addRule: 'Add',
    classification: 'Classification',
    remove: 'Remove',
    clone: 'Clone',
    edit: 'Edit',
    defaultRuleTitle: 'Untitled'
  },
  RuleReorderButtons: {
    ruleMoveUpTip: 'Move rule one position up',
    ruleMoveDownTip: 'Move rule one position down'
  },
  RuleGenerator: {
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
  ColorRampCombo: {
    colorRampPlaceholder: 'Select…'
  },
  ColorSpaceCombo: {
    colorSpacePlaceholder: 'Select…'
  },
  ClassificationCombo: {
    equalInterval: 'Equal Interval',
    quantile: 'Quantile ',
    logarithmic: 'Logarithmic',
    kmeans: 'k-Means'
  },
  RuleGeneratorWindow: {
    ruleGenerator: 'Classification'
  },
  IconSelectorWindow: {
    windowLabel: 'Select Icon'
  },
  IconSelector: {
    librarySelectLabel: 'Select Library'
  },
  SLDUnitsSelect: {
    symbolizerUnitsLabel: 'Symbolizer units',
    symbolizerUnitsPixel: 'pixel',
    symbolizerUnitsMeter: 'meter',
    symbolizerUnitsFoot: 'foot'
  },
  AttributeCombo: {
    label: 'Attribute',
    placeholder: 'Select Attribute',
    help: 'Please select an attribute.'
  },
  TextFilterField: {
    label: 'Value',
    placeholder: 'Enter Text Value',
    help: 'Please enter a text.'
  },
  NumberFilterField: {
    label: 'Value',
    placeholder: 'Enter Numeric Value',
    help: 'Please enter a number.'
  },
  BoolFilterField: {
    label: 'Value'
  },
  UnsupportedPropertiesUtil: {
    notSupported: 'Not supported by selected parser.',
    partiallySupported: 'Only partially supported by selected parser.'
  },
  ...antd_en_US
};

export default en_US;
