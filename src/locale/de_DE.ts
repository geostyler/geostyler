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
import antd_de_DE from 'antd/lib/locale/de_DE';
import type GeoStylerLocale from './locale';

const de_DE: GeoStylerLocale = {
  StyleFieldContainer: {
    nameFieldLabel: 'Name',
    nameFieldPlaceholder: 'Name eingeben',
    titleFieldLabel: 'Titel',
    titleFieldPlaceholder: 'Titel eingeben'
  },
  Editor: {
    kindFieldLabel: 'Kind'
  },
  RuleFieldContainer: {
    nameFieldLabel: 'Name',
    nameFieldPlaceholder: 'Name eingeben'
  },
  CodeEditor: {
    downloadButtonLabel: 'Als Datei speichern',
    copyButtonLabel: 'In Zwischenablage kopieren',
    uploadButtonLabel: 'TODO(de_DE):Open a file',
    formatSelectLabel: 'Format',
    styleCopied: 'Style in Zwischenablage kopiert!',
    writeFeedback: 'Feedback während des Schreibens mit dem',
    readFeedback: 'Feedback während des Lesens mit dem',
  },
  BulkEditModals: {
    colorLabel: 'Farbe wählen',
    radiusLabel: 'Radius festlegen',
    opacityLabel: 'Deckkraft festlegen',
    symbolLabel: 'Symbol wählen',
    imageFieldLabel: 'Quelle',
    imageFieldTooltipLabel: 'Öffne Galerie'
  },
  BulkEditor: {
    colorLabel: 'Farbe wählen',
    radiusLabel: 'Radius festlegen',
    opacityLabel: 'Deckkraft festlegen',
    symbolLabel: 'Symbol wählen',
    imageFieldLabel: 'Quelle'
  },
  Rule: {
    removeRuleBtnText: 'Regel entfernen',
    scaleFieldTitle: 'Maßstab verwenden',
    filterFieldTitle: 'Filter verwenden',
    nameFieldLabel: 'Name',
    nameFieldPlaceholder: 'Name eingeben',
    attributeLabel: 'Attribut',
    attributePlaceholderString: 'Attribut wählen',
    attributeValidationHelpString: 'Bitte wähle ein Attribut.',
    operatorLabel: 'Operator',
    operatorPlaceholderString: 'Operator wählen',
    operatorValidationHelpString: 'Bitte wähle einen Operator.',
    valueLabel: 'Wert',
    valuePlaceholder: 'Wert eingeben',
    valueValidationHelpString: 'Bitte gib einen Wert ein.'
  },
  Style: {
    addRuleBtnText: 'Regel hinzufügen',
    cloneRulesBtnText: 'Regeln duplizieren',
    removeRulesBtnText: 'Regeln entfernen',
    nameFieldLabel: 'Name',
    nameFieldPlaceholder: 'Name eingeben',
    titleFieldLabel: 'Titel',
    titleFieldPlaceholder: 'Titel eingeben',
    colorLabel: 'Farbe wählen',
    radiusLabel: 'Radius wählen',
    opacityLabel: 'Deckkraft wählen',
    symbolLabel: 'Symbol wählen',
    multiEditLabel: 'Selektion editieren',
    ruleGeneratorWindowBtnText: 'Klassifizierung'
  },
  CardStyle: {
    styleTitle: 'Stil',
    classificationTitle: 'Klassifizierung',
    multiEditTitle: 'Selektion editieren',
    symbolizerTitle: 'Symbolisierung',
    filterTitle: 'Filter',
    iconLibrariesTitle: 'Galerie'
  },
  StyleOverview: {
    styleTitle: 'Stil'
  },
  RuleOverview: {
    ruleTitle: 'Regel'
  },
  Symbolizers: {
    symbolizersTitle: 'Symbolisierung',
    addSymbolizer: 'Symbolisierung hinzufügen',
    showAll: 'Alle anzeigen',
    hide: 'Verbergen'
  },
  StyleLoader: {
    label: 'Stil laden: ',
    uploadButtonLabel: 'Stil hochladen'
  },
  DataLoader: {
    label: 'Daten laden: ',
    uploadButtonLabel: 'Daten hochladen'
  },
  WfsParserInput: {
    requestButtonText: 'Daten anfordern',
    urlLabel: 'Url',
    versionLabel: 'Version',
    typeNameLabel: 'FeatureTypeName',
    featureIDLabel: 'FeatureID',
    propertyNameLabel: 'PropertyName',
    maxFeaturesLabel: 'MaxFeatures',
    fetchParamsLabel: 'fetchParams',
    srsNameLabel: 'SrsName'
  },
  ParserFeedback: {
    notSupported: 'wird vom verwendeten Parser nicht unterstützt',
    partiallySupported: 'wird vom verwendeten Parser nur teilweise unterstützt'
  },
  WellKnownNameEditor: {
    fillColorLabel: 'Füllfarbe',
    fillOpacityLabel: 'Fülldeckkraft',
    offsetXLabel: 'Versatz X',
    offsetYLabel: 'Versatz Y',
    opacityLabel: 'Deckkraft',
    radiusLabel: 'Radius',
    rotateLabel: 'Drehung',
    strokeColorLabel: 'Strichfarbe',
    strokeOpacityLabel: 'Strichdeckkraft',
    strokeWidthLabel: 'Strichstärke',
  },
  FillEditor: {
    opacityLabel: 'Deckkraft',
    fillOpacityLabel: 'Fülldeckkraft',
    outlineOpacityLabel: 'Strichdeckkraft',
    fillColorLabel: 'Füllfarbe',
    outlineColorLabel: 'Randfarbe',
    outlineWidthLabel: 'Randbreite',
    outlineDasharrayLabel: 'Rand-Strichmuster',
    graphicFillTypeLabel: 'Graphic Fill Type'
  },
  IconEditor: {
    iconTooltipLabel: 'Öffne Galerie',
    imageLabel: 'Quelle',
    imagePlaceholder: 'URL zum Icon',
    offsetXLabel: 'Versatz X',
    offsetYLabel: 'Versatz Y',
    opacityLabel: 'Deckkraft',
    rotateLabel: 'Drehung',
    sizeLabel: 'Größe',
  },
  LineEditor: {
    capLabel: 'Verschluss',
    colorLabel: 'Farbe',
    dashLabel: 'Strichmuster',
    dashOffsetLabel: 'Strichmuster Versatz',
    graphicFillTypeLabel: 'Graphic Fill Type',
    graphicStrokeTypeLabel: 'Graphic Stroke Type',
    joinLabel: 'Verknüpfung',
    opacityLabel: 'Deckkraft',
    perpendicularOffsetLabel: 'Senkrechter Versatz',
    widthLabel: 'Breite',
  },
  MarkEditor: {
    wellKnownNameFieldLabel: 'Symbol'
  },
  TextEditor: {
    fontLabel: 'Schriftart',
    templateFieldLabel: 'Textvorlage',
    opacityLabel: 'Deckkraft',
    colorLabel: 'Textfarbe',
    sizeLabel: 'Textgröße',
    offsetXLabel: 'Versatz X',
    offsetYLabel: 'Versatz Y',
    attributeComboPlaceholder: 'Feld wählen',
    rotateLabel: 'Drehung',
    haloColorLabel: 'Halofarbe',
    haloWidthLabel: 'Halobreite',
    attributeNotFound: 'Attribut nicht vorhanden'
  },
  PropTextEditor: {
    propFieldLabel: 'Feld',
    opacityLabel: 'Deckkraft',
    colorLabel: 'Textfarbe',
    sizeLabel: 'Textgröße',
    offsetXLabel: 'Versatz X',
    offsetYLabel: 'Versatz Y',
    attributeComboPlaceholder: 'Feld wählen',
    rotateLabel: 'Drehung',
    fontLabel: 'Schriftart',
    haloColorLabel: 'Halo-Farbe',
    haloWidthLabel: 'Halo-Breite'
  },
  RasterEditor: {
    opacityLabel: 'Deckkraft',
    hueRotateLabel: 'Farbtonrotation',
    brightnessMinLabel: 'Min. Helligkeit',
    brightnessMaxLabel: 'Max. Helligkeit',
    saturationLabel: 'Sättigung',
    contrastLabel: 'Kontrast',
    fadeDurationLabel: 'Überblendzeit',
    resamplingLabel: 'Resampling',
    contrastEnhancementLabel: 'Kontrast ändern',
    gammaValueLabel: 'Gamma',
    colorMapLabel: 'Farbeinstellungen',
    symbolizerLabel: 'Symbolisierung',
    channelSelectionLabel: 'Bandauswahl'
  },
  RasterChannelEditor: {
    channelSelectionLabel: 'Kanäle editieren',
    redBandLabel: 'Rot',
    greenBandLabel: 'Grün',
    blueBandLabel: 'Blau',
    grayBandLabel: 'Grau',
    channelSelectionGrayLabel: 'Grau',
    channelSelectionRgbLabel: 'RGB',
    titleLabel: 'Bandauswahl'
  },
  ColorMapEditor: {
    typeLabel: 'Art',
    extendedLabel: 'Farbtiefe',
    titleLabel: 'Farbeinstellungen',
    nrOfClassesLabel: 'Anzahl Klassen',
    colorRampLabel: 'Farbverlauf',
    colorMapEntriesLabel: 'ColorMap Einträge',
    colorLabel: 'Farbe',
    quantityLabel: 'Wert',
    labelLabel: 'Beschriftung',
    opacityLabel: 'Deckkraft'
  },
  Preview: {
    openEditorText: 'Symbolisierung editieren',
    closeEditorText: 'Editor schließen'
  },
  ColorField: {
    clearText: 'Löschen',
    closeText: 'Schließen',
    editText: 'Ändern',
    chooseText: 'Wählen',
  },
  KindField: {
    symbolizerKinds: {
      Mark: 'Punktsymbol',
      Fill: 'Füllung',
      Icon: 'Bilddatei',
      Line: 'Linie',
      Text: 'Text',
      Raster: 'Raster'
    }
  },
  ScaleDenominator: {
    minScaleDenominatorLabelText: 'Min. Maßstabszahl',
    maxScaleDenominatorLabelText: 'Max. Maßstabszahl',
    minScaleDenominatorPlaceholderText: 'Min. Maßstabszahl eingeben (Optional)',
    maxScaleDenominatorPlaceholderText: 'Max. Maßstabszahl eingeben (Optional)'
  },
  WellKnownNameField: {
    wellKnownNames: {
      Circle: 'Kreis',
      Square: 'Quadrat',
      Triangle: 'Dreieck',
      Star: 'Stern',
      Cross: 'Kreuz',
      X: 'X'
    }
  },
  ColorMapEntryField: {
    colorLabel: 'Farbe',
    labelLabel: 'Legenden Beschriftung',
    quantityLabel: 'Wert',
    opacityLabel: 'Deckkraft'
  },
  ChannelField: {
    sourceChannelNameLabel: 'Band Name',
    contrastEnhancementTypeLabel: 'Kontrast ändern',
    gammaValueLabel: 'Gamma'
  },
  ColorMapTypeField: {
    rampMapTypeLabel: 'Interpoliert',
    intervalsMapTypeLabel: 'Intervalle',
    valuesMapTypeLabel: 'Einzelwerte'
  },
  GraphicTypeField: {
    Mark: 'Punktsymbol',
    Icon: 'Bilddatei'
  },
  RgbChannelField: {
    redLabel: 'Rotes band',
    greenLabel: 'Grünes band',
    blueLabel: 'Blaues band'
  },
  GrayChannelField: {
    grayLabel: 'Graues band'
  },
  SymbolizerEditor: {
    kindFieldLabel: 'Art',
    unknownSymbolizerText: 'Symbolizer unbekannt!'
  },
  SymbolizerEditorWindow: {
    symbolizersEditor: 'Symbolisierungseditor'
  },
  FilterOverview: {
    filterTitle: 'Filter'
  },
  FilterEditorWindow: {
    filterEditor: 'Filtereditor'
  },
  MultiEditor: {
    add: 'Hinzufügen',
    remove: 'Entfernen'
  },
  UploadButton: {
    upload: 'Upload'
  },
  FilterTree: {
    andDrpdwnLabel: 'UND-Filter',
    orDrpdwnLabel: 'ODER-Filter',
    notDrpdwnLabel: 'NICHT-Filter',
    comparisonDrpdwnLabel: 'Vergleichs-Filter',
    addFilterLabel: 'Filter hinzufügen',
    changeFilterLabel: 'Filter ändern',
    removeFilterLabel: 'Filter entfernen',
    andFilterText: 'UND',
    orFilterText: 'ODER',
    notFilterText: 'NICHT'
  },
  RuleTable: {
    symbolizersColumnTitle: 'Symbolisierung',
    nameColumnTitle: 'Name',
    filterColumnTitle: 'Filter',
    minScaleColumnTitle: 'Min. Maßstab',
    maxScaleColumnTitle: 'Max. Maßstab',
    amountColumnTitle: 'Anzahl',
    duplicatesColumnTitle: 'Doppelte'
  },
  Rules: {
    rulesTitle: 'Regeln',
    multiEdit: 'Auswählen',
    addRule: 'Hinzufügen',
    classification: 'Klassifizierung',
    remove: 'Entfernen',
    clone: 'Duplizieren',
    edit: 'Bearbeiten',
    defaultRuleTitle: 'Unbenannt'
  },
  RuleReorderButtons: {
    ruleMoveUpTip: 'Verschiebe Regel eine Position nach oben',
    ruleMoveDownTip: 'Verschiebe Regel eine Position nach unten'
  },
  RuleGenerator: {
    attribute: 'Attribute',
    generateButtonText: 'Klassifizieren',
    levelOfMeasurement: 'Skalenniveau',
    nominal: 'Nominal',
    ordinal: 'Ordinal',
    cardinal: 'Kardinal',
    numberOfRules: 'Klassenanzahl',
    colorRamp: 'Farbverlauf',
    colorSpace: 'Farbraum',
    colorRampPlaceholder: 'Auswählen…',
    colorRampMinClassesWarningPre: 'Color Ramp benötigt mindestens',
    colorRampMinClassesWarningPost: 'Klassen',
    symbolizer: 'Symbolizer',
    classification: 'Klassifizierungs Methode',
    classificationPlaceholder: 'Auswählen…',
    preview: 'Farb Vorschau',
    equalInterval: 'Equal-Interval',
    numberOfRulesViaKmeans: '…betroffen durch k-Means Klassifizierung.',
    allDistinctValues: 'Alle eindeutigen Werte verwenden'
  },
  ColorRampCombo: {
    colorRampPlaceholder: 'Auswählen…'
  },
  ColorSpaceCombo: {
    colorSpacePlaceholder: 'Auswählen…'
  },
  ClassificationCombo: {
    equalInterval: 'Equal Interval',
    quantile: 'Quantile ',
    logarithmic: 'Logarithmic',
    kmeans: 'k-Means'
  },
  RuleGeneratorWindow: {
    ruleGenerator: 'Klassifizierung'
  },
  IconSelectorWindow: {
    windowLabel: 'Wähle Icon'
  },
  IconSelector: {
    librarySelectLabel: 'Wähle Bibliothek'
  },
  SLDUnitsSelect: {
    symbolizerUnitsLabel: 'Symbolizer Einheiten',
    symbolizerUnitsPixel: 'Pixel',
    symbolizerUnitsMeter: 'Meter',
    symbolizerUnitsFoot: 'Fuß'
  },
  AttributeCombo: {
    label: 'Attribut',
    placeholder: 'Attribut auswählen',
    help: 'Bitte ein Attribut auswählen'
  },
  TextFilterField: {
    label: 'Wert',
    placeholder: 'Textwert eingeben',
    help: 'Bitte geben Sie einen Text ein.'
  },
  NumberFilterField: {
    label: 'Wert',
    placeholder: 'Numerischen Wert eintragen',
    help: 'Bitte eine Zahl eingeben.'
  },
  BoolFilterField: {
    label: 'Wert'
  },
  UnsupportedPropertiesUtil: {
    notSupported: 'Vom ausgewählten Parser nicht unterstützt.',
    partiallySupported: 'Vom ausgewählten Parser nur teilweise unterstützt.'
  },
  FunctionNameCombo: {
    placeholder: '… GeoStylerFunction wählen'
  },
  ...antd_de_DE
};

export default de_DE;
