import { Locale } from 'antd/lib/locale';

export interface GeoStylerLocale extends Locale {
  CodeEditor: {
    downloadButtonLabel: string;
    formatSelectLabel: string;
    copyButtonLabel: string;
    styleCopied: string;
    writeFeedback: string;
    readFeedback: string;
  };
  BulkEditModals: {
    colorLabel: string;
    radiusLabel: string;
    opacityLabel: string;
    symbolLabel: string;
    imageFieldLabel: string;
    imageFieldTooltipLabel: string;
  };
  BulkEditor: {
    colorLabel: string;
    radiusLabel: string;
    opacityLabel: string;
    symbolLabel: string;
    imageFieldLabel: string;
  };
  Rule: {
    removeRuleBtnText: string;
    scaleFieldTitle: string;
    filterFieldTitle: string;
    nameFieldLabel: string;
    nameFieldPlaceholder: string;
    attributeLabel: string;
    attributePlaceholderString: string;
    attributeValidationHelpString: string;
    operatorLabel: string;
    operatorPlaceholderString: string;
    operatorValidationHelpString: string;
    valueLabel: string;
    valuePlaceholder: string;
    valueValidationHelpString: string;
  };
  RuleFieldContainer: {
    nameFieldLabel?: string;
    nameFieldPlaceholder?: string;
  };
  Style: {
    addRuleBtnText: string;
    cloneRulesBtnText: string;
    removeRulesBtnText: string;
    nameFieldLabel: string;
    nameFieldPlaceholder: string;
    titleFieldLabel: string;
    titleFieldPlaceholder: string;
    colorLabel: string;
    radiusLabel: string;
    opacityLabel: string;
    symbolLabel: string;
    multiEditLabel: string;
    ruleGeneratorWindowBtnText: string;
  };
  CardStyle: {
    styleTitle: string;
    classificationTitle: string;
    multiEditTitle: string;
    symbolizerTitle: string;
    filterTitle: string;
    iconLibrariesTitle: string;
  };
  StyleOverview: {
    styleTitle: string;
  };
  RuleOverview: {
    ruleTitle: string;
  };
  Symbolizers: {
    symbolizersTitle: string;
    addSymbolizer: string;
    showAll: string;
    hide: string;
  };
  StyleLoader: {
    label: string;
    uploadButtonLabel: string;
  };
  DataLoader: {
    label: string;
    uploadButtonLabel: string;
  };
  WfsParserInput: {
    requestButtonText: string;
    urlLabel: string;
    versionLabel: string;
    typeNameLabel: string;
    featureIDLabel: string;
    propertyNameLabel: string;
    maxFeaturesLabel: string;
    fetchParamsLabel: string;
    srsNameLabel: string;
  };
  ParserFeedback: {
    notSupported: string;
    partiallySupported: string;
  };
  WellKnownNameEditor: {
    fillColorLabel: string;
    fillOpacityLabel: string;
    offsetXLabel: string;
    offsetYLabel: string;
    opacityLabel: string;
    radiusLabel: string;
    rotateLabel: string;
    strokeColorLabel: string;
    strokeOpacityLabel: string;
    strokeWidthLabel: string;
  };
  FillEditor: {
    opacityLabel: string;
    fillOpacityLabel: string;
    outlineOpacityLabel: string;
    fillColorLabel: string;
    outlineColorLabel: string;
    outlineWidthLabel: string;
    outlineDasharrayLabel: string;
    graphicFillTypeLabel: string;
  };
  IconEditor: {
    iconTooltipLabel: string;
    imageLabel: string;
    imagePlaceholder: string;
    offsetXLabel: string;
    offsetYLabel: string;
    opacityLabel: string;
    rotateLabel: string;
    sizeLabel: string;
  };
  LineEditor: {
    colorLabel: string;
    widthLabel: string;
    opacityLabel: string;
    dashLabel: string;
    dashOffsetLabel: string;
    perpendicularOffsetLabel: string;
    capLabel: string;
    joinLabel: string;
    graphicStrokeTypeLabel: string;
    graphicFillTypeLabel: string;
  };
  MarkEditor: {
    wellKnownNameFieldLabel: string;
  };
  TextEditor: {
    fontLabel: string;
    templateFieldLabel: string;
    opacityLabel: string;
    colorLabel: string;
    sizeLabel: string;
    offsetXLabel: string;
    offsetYLabel: string;
    attributeComboPlaceholder: string;
    rotateLabel: string;
    haloColorLabel: string;
    haloWidthLabel: string;
    attributeNotFound: string;
  };
  PropTextEditor: {
    fontLabel: string;
    propFieldLabel: string;
    haloColorLabel: string;
    haloWidthLabel: string;
    opacityLabel: string;
    colorLabel: string;
    sizeLabel: string;
    offsetXLabel: string;
    offsetYLabel: string;
    attributeComboPlaceholder: string;
    rotateLabel: string;
  };
  RasterEditor: {
    opacityLabel: string;
    hueRotateLabel: string;
    brightnessMinLabel: string;
    brightnessMaxLabel: string;
    saturationLabel: string;
    contrastLabel: string;
    fadeDurationLabel: string;
    resamplingLabel: string;
    contrastEnhancementLabel: string;
    gammaValueLabel: string;
    colorMapLabel: string;
    symbolizerLabel: string;
    channelSelectionLabel: string;
  };
  RasterChannelEditor: {
    channelSelectionLabel: string;
    redBandLabel: string;
    greenBandLabel: string;
    blueBandLabel: string;
    grayBandLabel: string;
    channelSelectionGrayLabel: string;
    channelSelectionRgbLabel: string;
    titleLabel: string;
  };
  ColorMapEditor: {
    typeLabel: string;
    extendedLabel: string;
    titleLabel: string;
    nrOfClassesLabel: string;
    colorMapEntriesLabel: string;
    colorRampLabel: string;
    colorLabel: string;
    quantityLabel: string;
    labelLabel: string;
    opacityLabel: string;
  };
  Preview: {
    openEditorText: string;
    closeEditorText: string;
  };
  ColorField: {
    clearText: string;
    closeText: string;
    editText: string;
    chooseText: string;
  };
  KindField: {
    symbolizerKinds: {
      Mark: string;
      Fill: string;
      Icon: string;
      Line: string;
      Text: string;
      Raster: string;
    };
  };
  ScaleDenominator: {
    minScaleDenominatorLabelText: string;
    maxScaleDenominatorLabelText: string;
    minScaleDenominatorPlaceholderText: string;
    maxScaleDenominatorPlaceholderText: string;
  };
  WellKnownNameField: {
    wellKnownNames: {
      Circle: string;
      Square: string;
      Triangle: string;
      Star: string;
      Cross: string;
      X: string;
    };
  };
  ColorMapEntryField: {
    colorLabel: string;
    labelLabel: string;
    quantityLabel: string;
    opacityLabel: string;
  };
  ChannelField: {
    sourceChannelNameLabel: string;
    contrastEnhancementTypeLabel: string;
    gammaValueLabel: string;
  };
  ColorMapTypeField: {
    rampMapTypeLabel: string;
    intervalsMapTypeLabel: string;
    valuesMapTypeLabel: string;
  };
  GraphicTypeField: {
    Mark: string;
    Icon: string;
  };
  RgbChannelField: {
    redLabel: string;
    greenLabel: string;
    blueLabel: string;
  };
  GrayChannelField: {
    grayLabel: string;
  };
  SymbolizerEditor: {
    kindFieldLabel: string;
    unknownSymbolizerText: string;
  };
  SymbolizerEditorWindow: {
    symbolizersEditor: string;
  };
  FilterOverview: {
    filterTitle: string;
  };
  FilterEditorWindow: {
    filterEditor: string;
  };
  MultiEditor: {
    add: string;
    remove: string;
  };
  UploadButton: {
    upload: string;
  };
  FilterTree: {
    andDrpdwnLabel: string;
    orDrpdwnLabel: string;
    notDrpdwnLabel: string;
    comparisonDrpdwnLabel: string;
    addFilterLabel: string;
    changeFilterLabel: string;
    removeFilterLabel: string;
    andFilterText: string;
    orFilterText: string;
    notFilterText: string;
  };
  RuleTable: {
    symbolizersColumnTitle: string;
    nameColumnTitle: string;
    filterColumnTitle: string;
    minScaleColumnTitle: string;
    maxScaleColumnTitle: string;
    amountColumnTitle: string;
    duplicatesColumnTitle: string;
    // locale from antd
    filterConfirm?: string;
    filterReset?: string;
    emptyText?: string;
  };
  Rules: {
    rulesTitle: string;
    multiEdit: string;
    addRule: string;
    classification: string;
    remove: string;
    clone: string;
    edit: string;
    defaultRuleTitle: string;
  };
  RuleReorderButtons: {
    ruleMoveUpTip: string;
    ruleMoveDownTip: string;
  };
  RuleGenerator: {
    attribute: string;
    generateButtonText: string;
    levelOfMeasurement: string;
    nominal: string;
    ordinal: string;
    cardinal: string;
    numberOfRules: string;
    colorRamp: string;
    colorSpace: string;
    colorRampPlaceholder: string;
    colorRampMinClassesWarningPre: string;
    colorRampMinClassesWarningPost: string;
    equalInterval: string;
    symbolizer: string;
    classification: string;
    classificationPlaceholder: string;
    preview: string;
    numberOfRulesViaKmeans: string;
    allDistinctValues: string;
  };
  ColorRampCombo: {
    colorRampPlaceholder: string;
  };
  ColorSpaceCombo: {
    colorSpacePlaceholder: string;
  };
  ClassificationCombo: {
    equalInterval: string;
    quantile: string;
    logarithmic: string;
    kmeans: string;
  };
  RuleGeneratorWindow: {
    ruleGenerator: string;
  };
  IconSelectorWindow: {
    windowLabel: string;
  };
  IconSelector: {
    librarySelectLabel: string;
  };
  SLDUnitsSelect: {
    symbolizerUnitsLabel: string;
    symbolizerUnitsPixel: string;
    symbolizerUnitsMeter: string;
    symbolizerUnitsFoot: string;
  };
  StyleFieldContainer: {
    nameFieldLabel: string;
    nameFieldPlaceholder: string;
    titleFieldLabel: string;
    titleFieldPlaceholder: string;
  };
  Editor: {
    kindFieldLabel: string;
  };
  AttributeCombo: {
    label: string;
    placeholder: string;
    help: string;
  };
  TextFilterField: {
    label: string;
    placeholder: string;
    help: string;
  };
  NumberFilterField: {
    label: string;
    placeholder: string;
    help: string;
  };
  BoolFilterField: {
    label: string;
  };
  UnsupportedPropertiesUtil: {
    notSupported: string;
    partiallySupported: string;
  };
  FunctionNameCombo: {
    placeholder: string;
  };
};
