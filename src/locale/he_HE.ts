/* eslint-disable @typescript-eslint/naming-convention */
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
 * this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
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
import antd_he_IL from 'antd/lib/locale/he_IL';
import type GeoStylerLocale from './locale';

const he_IL: GeoStylerLocale = {
  StyleFieldContainer: {
    nameFieldLabel: 'שם',
    nameFieldPlaceholder: 'הזן שם',
    titleFieldLabel: 'כותרת',
    titleFieldPlaceholder: 'הזן כותרת'
  },
  Editor: {
    kindFieldLabel: 'סוג',
    unknownSymbolizerText: 'סימול לא ידוע!'
  },
  RuleFieldContainer: {
    nameFieldLabel: 'שם',
    nameFieldPlaceholder: 'הזן שם'
  },
  BulkEditModals: {
    colorLabel: 'בחר צבע',
    radiusLabel: 'בחר רדיוס',
    opacityLabel: 'בחר אטימות',
    symbolLabel: 'בחר סמל',
    imageFieldLabel: 'מקור',
    imageFieldTooltipLabel: 'פתח גלריה'
  },
  BulkEditor: {
    colorLabel: 'בחר צבע',
    radiusLabel: 'בחר רדיוס',
    opacityLabel: 'בחר אטימות',
    symbolLabel: 'בחר סמל',
    imageFieldLabel: 'מקור'
  },
  Rule: {
    removeRuleBtnText: 'הסר כלל',
    scaleFieldTitle: 'השתמש בקנה מידה',
    filterFieldTitle: 'השתמש במסנן',
    nameFieldLabel: 'שם',
    nameFieldPlaceholder: 'הזן שם',
    attributeLabel: 'מאפיין',
    attributePlaceholderString: 'בחר מאפיין',
    attributeValidationHelpString: 'אנא בחר מאפיין',
    operatorLabel: 'אופרטור',
    operatorPlaceholderString: 'בחר אופרטור',
    operatorValidationHelpString: 'אנא בחר אופרטור',
    valueLabel: 'ערך',
    valuePlaceholder: 'הזן ערך',
    valueValidationHelpString: 'אנא הזן ערך'
  },
  Style: {
    addRuleBtnText: 'הוסף כלל',
    cloneRulesBtnText: 'שכפל כללים',
    removeRulesBtnText: 'הסר כללים',
    nameFieldLabel: 'שם',
    nameFieldPlaceholder: 'הזן שם',
    titleFieldLabel: 'כותרת',
    titleFieldPlaceholder: 'הזן כותרת',
    colorLabel: 'בחר צבע',
    radiusLabel: 'בחר רדיוס',
    opacityLabel: 'בחר אטימות',
    symbolLabel: 'בחר סמל',
    multiEditLabel: 'עריכה מרובה',
    ruleGeneratorWindowBtnText: 'סיווג'
  },
  CardStyle: {
    styleTitle: 'סגנון',
    classificationTitle: 'סיווג',
    multiEditTitle: 'עריכה מרובה',
    symbolizerTitle: 'סימול',
    filterTitle: 'מסננים',
    iconLibrariesTitle: 'גלריה'
  },
  StyleOverview: {
    styleTitle: 'סגנון'
  },
  RuleOverview: {
    ruleTitle: 'כלל'
  },
  Symbolizers: {
    symbolizersTitle: 'סימולים',
    addSymbolizer: 'הוסף סימול',
    showAll: 'הצג הכל',
    hide: 'הסתר'
  },
  StyleLoader: {
    label: 'טען סגנון: ',
    uploadButtonLabel: 'העלה סגנון'
  },
  DataLoader: {
    label: 'טען נתונים: ',
    uploadButtonLabel: 'העלה נתונים'
  },
  WfsParserInput: {
    requestButtonText: 'קבל נתונים',
    urlLabel: 'כתובת (Url)',
    versionLabel: 'גרסה',
    typeNameLabel: 'שם סוג ישות (FeatureTypeName)',
    featureIDLabel: 'מזהה ישות (FeatureID)',
    propertyNameLabel: 'שם מאפיין (PropertyName)',
    maxFeaturesLabel: 'מספר ישויות מקסימלי (MaxFeatures)',
    fetchParamsLabel: 'פרמטרים לשליפה (fetchParams)',
    srsNameLabel: 'מערכת צירים (SrsName)'
  },
  CodeEditor: {
    downloadButtonLabel: 'שמור כקובץ',
    copyButtonLabel: 'העתק ללוח',
    uploadButtonLabel: 'העלה קובץ',
    formatSelectLabel: 'פורמט',
    styleCopied: 'הסגנון הועתק ללוח!',
    writeFeedback: 'משוב בעת כתיבה עם',
    readFeedback: 'משוב בעת קריאה עם'
  },
  ParserFeedback: {
    notSupported: 'אינו נתמך על ידי המנתח',
    partiallySupported: 'נתמך חלקית בלבד על ידי המנתח'
  },
  WellKnownNameEditor: {
    fillColorLabel: 'צבע מילוי',
    fillOpacityLabel: 'אטימות מילוי',
    offsetXLabel: 'היסט X',
    offsetYLabel: 'היסט Y',
    opacityLabel: 'אטימות',
    radiusLabel: 'רדיוס',
    rotateLabel: 'סיבוב',
    strokeColorLabel: 'צבע קו',
    strokeOpacityLabel: 'אטימות קו',
    strokeWidthLabel: 'עובי קו'
  },
  FillEditor: {
    opacityLabel: 'אטימות',
    fillOpacityLabel: 'אטימות מילוי',
    outlineOpacityLabel: 'אטימות קו מתאר',
    fillColorLabel: 'צבע מילוי',
    outlineColorLabel: 'צבע קו מתאר',
    outlineWidthLabel: 'עובי קו מתאר',
    outlineDasharrayLabel: 'תבנית קו מתאר',
    graphicFillTypeLabel: 'סוג מילוי גרפי',
    visibilityLabel: 'נראות',
    generalSectionLabel: 'כללי',
    graphicFillSectionLabel: 'מילוי גרפי'
  },
  IconEditor: {
    iconTooltipLabel: 'פתח גלריה',
    iconSpriteTooltipLabel: 'השתמש ב-sprite',
    imageLabel: 'מקור',
    imagePlaceholder: 'כתובת (URL) לסמל',
    offsetXLabel: 'היסט X',
    offsetYLabel: 'היסט Y',
    opacityLabel: 'אטימות',
    rotateLabel: 'סיבוב',
    sizeLabel: 'גודל',
    visibilityLabel: 'נראות'
  },
  MarkEditor: {
    wellKnownNameFieldLabel: 'סמל',
    visibilityLabel: 'נראות'
  },
  LineEditor: {
    capLabel: 'סיומת קו',
    colorLabel: 'צבע',
    dashLabel: 'תבנית קו מקווקו',
    dashOffsetLabel: 'היסט קו מקווקו',
    graphicFillTypeLabel: 'סוג מילוי גרפי',
    graphicStrokeTypeLabel: 'סוג קו גרפי',
    joinLabel: 'חיבור קו',
    opacityLabel: 'אטימות',
    perpendicularOffsetLabel: 'היסט ניצב',
    widthLabel: 'רוחב',
    visibilityLabel: 'נראות',
    generalSectionLabel: 'כללי',
    graphicStrokeSectionLabel: 'קו גרפי',
    graphicFillSectionLabel: 'מילוי גרפי'
  },
  TextEditor: {
    fontLabel: 'גופן',
    templateFieldLabel: 'תבנית',
    opacityLabel: 'אטימות טקסט',
    colorLabel: 'צבע טקסט',
    sizeLabel: 'גודל טקסט',
    offsetXLabel: 'היסט X',
    offsetYLabel: 'היסט Y',
    attributeComboPlaceholder: 'בחר שדה',
    rotateLabel: 'סיבוב',
    haloColorLabel: 'צבע הילה',
    haloWidthLabel: 'רוחב הילה',
    attributeNotFound: 'שדה לא נמצא',
    visibilityLabel: 'נראות'
  },
  PropTextEditor: {
    propFieldLabel: 'שדה',
    opacityLabel: 'אטימות טקסט',
    fontLabel: 'גופן',
    colorLabel: 'צבע טקסט',
    sizeLabel: 'גודל טקסט',
    offsetXLabel: 'היסט X',
    offsetYLabel: 'היסט Y',
    attributeComboPlaceholder: 'בחר שדה',
    rotateLabel: 'סיבוב',
    haloColorLabel: 'צבע הילה',
    haloWidthLabel: 'רוחב הילה'
  },
  RasterEditor: {
    opacityLabel: 'אטימות',
    hueRotateLabel: 'סיבוב גוון',
    brightnessMinLabel: 'בהירות מינימלית',
    brightnessMaxLabel: 'בהירות מקסימלית',
    saturationLabel: 'רוויה',
    contrastLabel: 'ניגודיות',
    fadeDurationLabel: 'משך עמעום',
    resamplingLabel: 'דגימה מחדש (Resampling)',
    contrastEnhancementLabel: 'הדגשת ניגודיות',
    gammaValueLabel: 'ערך גאמה',
    colorMapLabel: 'מפת צבעים',
    symbolizerLabel: 'סימול',
    channelSelectionLabel: 'בחירת ערוצים',
    visibilityLabel: 'נראות'
  },
  RasterChannelEditor: {
    channelSelectionLabel: 'ערוך ערוצים',
    redBandLabel: 'אדום',
    greenBandLabel: 'ירוק',
    blueBandLabel: 'כחול',
    grayBandLabel: 'אפור',
    channelSelectionGrayLabel: 'אפור',
    channelSelectionRgbLabel: 'RGB',
    titleLabel: 'בחירת ערוצים'
  },
  ColorMapEditor: {
    typeLabel: 'סוג',
    extendedLabel: 'עומק צבע',
    colorMapEntriesLabel: 'מפת צבעים',
    titleLabel: 'מפת צבעים',
    nrOfClassesLabel: 'מספר מחלקות',
    colorRampLabel: 'רצף צבעים',
    colorLabel: 'צבע',
    quantityLabel: 'כמות',
    labelLabel: 'תווית',
    opacityLabel: 'אטימות'
  },
  PreviewMap: {
    errorTitle: 'סגנון geostyler לא תקין',
    couldNotGetDataProjection: 'לא ניתן לקבל את היטל הנתונים',
    couldNotCreateSampleGeometries: 'לא ניתן ליצור גאומטריות לדוגמה'
  },
  ColorField: {
    chooseText: 'בחר'
  },
  KindField: {
    symbolizerKinds: {
      Mark: 'סמן',
      Fill: 'מילוי',
      Icon: 'סמל',
      Line: 'קו',
      Text: 'טקסט',
      Raster: 'רסטר'
    }
  },
  GraphicTypeField: {
    Mark: 'סמן',
    Icon: 'סמל'
  },
  RgbChannelField: {
    redLabel: 'ערוץ אדום',
    greenLabel: 'ערוץ ירוק',
    blueLabel: 'ערוץ כחול'
  },
  GrayChannelField: {
    grayLabel: 'ערוץ אפור'
  },
  ScaleDenominator: {
    minScaleDenominatorLabelText: 'קנ"מ מינימלי',
    maxScaleDenominatorLabelText: 'קנ"מ מקסימלי',
    minScaleDenominatorPlaceholderText: 'הזן קנ"מ מינימלי (אופציונלי)',
    maxScaleDenominatorPlaceholderText: 'הזן קנ"מ מקסימלי (אופציונלי)'
  },
  WellKnownNameField: {
    wellKnownNames: {
      circle: 'עיגול',
      square: 'ריבוע',
      triangle: 'משולש',
      star: 'כוכב',
      cross: 'צלב',
      x: 'איקס'
    }
  },
  ColorMapEntryField: {
    colorLabel: 'צבע',
    labelLabel: 'תווית מקרא',
    quantityLabel: 'כמות',
    opacityLabel: 'אטימות'
  },
  ChannelField: {
    sourceChannelNameLabel: 'שם הערוץ',
    contrastEnhancementTypeLabel: 'הדגשת ניגודיות',
    gammaValueLabel: 'ערך גאמה'
  },
  ColorMapTypeField: {
    rampMapTypeLabel: 'אינטרפולציה',
    intervalsMapTypeLabel: 'מרווחים',
    valuesMapTypeLabel: 'ערכים'
  },
  SymbolizerEditorWindow: {
    symbolizersEditor: 'עורך סימולים',
    cancelButtonLabel: 'ביטול',
    saveButtonLabel: 'שמור'
  },
  FilterOverview: {
    filterTitle: 'מסננים'
  },
  FilterEditorWindow: {
    filterEditor: 'עורך מסננים',
    cancelButtonLabel: 'ביטול',
    saveButtonLabel: 'שמור'
  },
  MultiEditor: {
    add: 'הוסף',
    remove: 'הסר'
  },
  UploadButton: {
    upload: 'העלה'
  },
  FilterTree: {
    andDrpdwnLabel: 'מסנן וגם (AND)',
    orDrpdwnLabel: 'מסנן או (OR)',
    notDrpdwnLabel: 'מסנן שלילה (NOT)',
    comparisonDrpdwnLabel: 'מסנן השוואה',
    addFilterLabel: 'הוסף מסנן',
    changeFilterLabel: 'שנה מסנן',
    removeFilterLabel: 'הסר מסנן',
    andFilterText: 'וגם',
    orFilterText: 'או',
    notFilterText: 'לא'
  },
  RuleTable: {
    symbolizersColumnTitle: 'סימולים',
    nameColumnTitle: 'שם',
    filterColumnTitle: 'מסנן',
    minScaleColumnTitle: 'קנ"מ מינ\'',
    maxScaleColumnTitle: 'קנ"מ מקס\'',
    scalesColumnTitle: 'קני מידה',
    errorMaxScaleGreaterThanMinScale: 'קנ"מ מקסימלי חייב להיות גדול מהקנ"מ המינימלי',
    amountColumnTitle: 'כמות',
    duplicatesColumnTitle: 'כפילויות',
    actionsColumnTitle: 'פעולות',
    actionCloneLabel: 'שכפל',
    actionRemoveLabel: 'הסר'
  },
  Rules: {
    rulesTitle: 'כללים',
    multiEdit: 'בחר',
    addRule: 'הוסף',
    classification: 'סיווג',
    remove: 'הסר',
    clone: 'שכפל',
    edit: 'ערוך',
    defaultRuleTitle: 'ללא כותרת'
  },
  RuleReorderButtons: {
    ruleMoveUpTip: 'העלה כלל מיקום אחד למעלה',
    ruleMoveDownTip: 'הורד כלל מיקום אחד למטה'
  },
  RuleGenerator: {
    attribute: 'מאפיין',
    generateButtonText: 'סווג',
    levelOfMeasurement: 'רמת מדידה',
    nominal: 'שמי',
    ordinal: 'סודר',
    cardinal: 'כמותי',
    numberOfRules: 'מספר מחלקות',
    colorRamp: 'רצף צבעים',
    colorSpace: 'מרחב צבע',
    colorRampPlaceholder: 'בחר…',
    colorRampMinClassesWarningPre: 'רצף צבעים דורש לפחות',
    colorRampMinClassesWarningPost: 'מחלקות',
    symbolizer: 'סימול',
    classification: 'שיטת סיווג',
    classificationPlaceholder: 'בחר…',
    equalInterval: 'מרווחים שווים',
    preview: 'תצוגה מקדימה של צבע',
    numberOfRulesViaKmeans: '…מושפע מסיווג k-Means.',
    allDistinctValues: 'השתמש בכל הערכים הייחודיים'
  },
  ColorRampCombo: {
    colorRampPlaceholder: 'בחר…'
  },
  ColorSpaceCombo: {
    colorSpacePlaceholder: 'בחר…'
  },
  ClassificationCombo: {
    equalInterval: 'מרווחים שווים',
    quantile: 'מאיון',
    logarithmic: 'לוגריתמי',
    kmeans: 'k-Means'
  },
  RuleGeneratorWindow: {
    ruleGenerator: 'סיווג'
  },
  IconSelectorWindow: {
    windowLabel: 'בחר סמל'
  },
  IconSelector: {
    librarySelectLabel: 'בחר ספרייה'
  },
  SLDUnitsSelect: {
    symbolizerUnitsLabel: 'יחידות סימול',
    symbolizerUnitsPixel: 'פיקסל',
    symbolizerUnitsMeter: 'מטר',
    symbolizerUnitsFoot: 'רגל'
  },
  AttributeCombo: {
    label: 'מאפיין',
    placeholder: 'בחר מאפיין',
    help: 'אנא בחר מאפיין.'
  },
  TextFilterField: {
    label: 'ערך',
    placeholder: 'הזן ערך טקסט',
    help: 'אנא הזן טקסט.'
  },
  NumberFilterField: {
    label: 'ערך',
    placeholder: 'הזן ערך מספרי',
    help: 'אנא הזן מספר.'
  },
  BoolFilterField: {
    label: 'ערך'
  },
  LineCapField: {
    lineCapOptions: {
      butt: 'שטוח',
      round: 'עגול',
      square: 'מרובע'
    }
  },
  LineJoinField: {
    lineJoinOptions: {
      bevel: 'משופע',
      round: 'עגול',
      miter: 'חד'
    }
  },
  ImageField: {
    sprite: {
      x: 'X',
      y: 'Y',
      height: 'גובה',
      width: 'רוחב'
    }
  },
  UnsupportedPropertiesUtil: {
    notSupported: 'לא נתמך על ידי המנתח שנבחר.',
    partiallySupported: 'נתמך חלקית בלבד על ידי המנתח שנבחר.'
  },
  FunctionNameCombo: {
    placeholder: '… בחר GeoStylerFunction'
  },
  VisibilityField: {
    on: 'פעיל',
    off: 'כבוי'
  },
  UnknownInput: {
    typeSelectToolip: 'בחר סוג קלט'
  },
  FunctionUI: {
    add: 'הוסף',
    remove: 'הסר'
  },
  Renderer: {
    placeholderInfo: 'זהו ממלא מקום מכיוון שהסימול מכיל פונקציות ולא ניתן להציגו בתצוגה מקדימה.'
  },
  ...antd_he_IL
};

export default he_IL;
