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

import de_DE from 'antd/lib/locale-provider/de_DE';
export default {
  GsApp: {
    graphicalEditor: 'Graphischer Editor',
    codeEditor: 'Code Editor'
  },
  GsBulkEditModals: {
    colorLabel: 'Farbe wählen',
    radiusLabel: 'Radius festlegen',
    opacityLabel: 'Deckkraft festlegen',
    symbolLabel: 'Symbol wählen',
    imageFieldLabel: 'Quelle',
    imageFieldTooltipLabel: 'Öffne Galerie'
  },
  GsRule: {
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
  GsStyle: {
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
  GsStyleLoader: {
    label: 'Stil laden: ',
    uploadButtonLabel: 'Stil hochladen'
  },
  GsDataLoader: {
    label: 'Daten laden: ',
    uploadButtonLabel: 'Daten hochladen'
  },
  GsCodeEditor: {
    downloadButtonLabel: 'Als Datei speichern',
    copyButtonLabel: 'In Zwischenablage kopieren',
    formatSelectLabel: 'Format',
    styleCopied: 'Style in Zwischenablage kopiert!'
  },
  GsWellKnownNameEditor: {
    radiusLabel: 'Radius',
    fillOpacityLabel: 'Fülldeckkraft',
    fillColorLabel: 'Füllfarbe',
    opacityLabel: 'Deckkraft',
    strokeColorLabel: 'Strichfarbe',
    strokeWidthLabel: 'Strichstärke',
    strokeOpacityLabel: 'Strichdeckkraft',
    rotateLabel: 'Drehung'
  },
  GsFillEditor: {
    opacityLabel: 'Deckkraft',
    fillOpacityLabel: 'Fülldeckkraft',
    outlineOpacityLabel: 'Strichdeckkraft',
    fillColorLabel: 'Füllfarbe',
    outlineColorLabel: 'Randfarbe',
    outlineWidthLabel: 'Randbreite',
    outlineDasharrayLabel: 'Rand-Strichmuster',
    graphicFillTypeLabel: 'Graphic Fill Type'
  },
  GsIconEditor: {
    imageLabel: 'Quelle',
    sizeLabel: 'Größe',
    rotateLabel: 'Drehung',
    opacityLabel: 'Deckkraft',
    iconTooltipLabel: 'Öffne Galerie'
  },
  GsLineEditor: {
    colorLabel: 'Farbe',
    widthLabel: 'Breite',
    opacityLabel: 'Deckkraft',
    dashLabel: 'Strichmuster',
    dashOffsetLabel: 'Strichmuster Versatz',
    capLabel: 'Verschluss',
    joinLabel: 'Verknüpfung',
    graphicStrokeTypeLabel: 'Graphic Stroke Type',
    graphicFillTypeLabel: 'Graphic Fill Type'
  },
  GsMarkEditor: {
    wellKnownNameFieldLabel: 'Symbol'
  },
  GsTextEditor: {
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
  GsPropTextEditor: {
    propFieldLabel: 'Feld',
    opacityLabel: 'Deckkraft',
    colorLabel: 'Textfarbe',
    sizeLabel: 'Textgröße',
    offsetXLabel: 'Versatz X',
    offsetYLabel: 'Versatz Y',
    attributeComboPlaceholder: 'Feld wählen',
    rotateLabel: 'Drehung'
  },
  GsRasterEditor: {
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
  GsRasterChannelEditor: {
    channelSelectionLabel: 'Kanäle editieren',
    redBandLabel: 'Rot',
    greenBandLabel: 'Grün',
    blueBandLabel: 'Blau',
    grayBandLabel: 'Grau',
    channelSelectionGrayLabel: 'Grau',
    channelSelectionRgbLabel: 'RGB',
    titleLabel: 'Bandauswahl'
  },
  GsColorMapEditor: {
    typeLabel: 'Art',
    extendedLabel: 'Farbtiefe',
    titleLabel: 'Farbeinstellungen',
    nrOfClassesLabel: 'Anzahl Klassen',
    colorRampLabel: 'Farbverlauf',
    colorLabel: 'Farbe',
    quantityLabel: 'Wert',
    labelLabel: 'Beschriftung',
    opacityLabel: 'Deckkraft'
  },
  GsPreview: {
    openEditorText: 'Symbolisierung editieren',
    closeEditorText: 'Editor schließen'
  },
  GsColorField: {
    closeText: 'Schließen',
    editText: 'Ändern',
    chooseText: 'Wählen',
  },
  GsKindField: {
    symbolizerKinds: {
      Mark: 'Punktsymbol',
      Fill: 'Füllung',
      Icon: 'Bilddatei',
      Line: 'Linie',
      Text: 'Text',
      Raster: 'Raster'
    }
  },
  GsScaleDenominator: {
    minScaleDenominatorLabelText: 'Min. Maßstabszahl',
    maxScaleDenominatorLabelText: 'Max. Maßstabszahl',
    minScaleDenominatorPlaceholderText: 'Min. Maßstabszahl eingeben (Optional)',
    maxScaleDenominatorPlaceholderText: 'Max. Maßstabszahl eingeben (Optional)'
  },
  GsWellKnownNameField: {
    wellKnownNames: {
      Circle: 'Kreis',
      Square: 'Quadrat',
      Triangle: 'Dreieck',
      Star: 'Stern',
      Cross: 'Kreuz',
      X: 'X'
    }
  },
  GsColorMapEntryField: {
    colorLabel: 'Farbe',
    labelLabel: 'Legenden Beschriftung',
    quantityLabel: 'Wert',
    opacityLabel: 'Deckkraft'
  },
  GsChannelField: {
    sourceChannelNameLabel: 'Band Name',
    contrastEnhancementTypeLabel: 'Kontrast ändern',
    gammaValueLabel: 'Gamma'
  },
  GsColorMapTypeField: {
    rampMapTypeLabel: 'Interpoliert',
    intervalsMapTypeLabel: 'Intervalle',
    valuesMapTypeLabel: 'Einzelwerte'
  },
  GsGraphicTypeField: {
    Mark: 'Punktsymbol',
    Icon: 'Bilddatei'
  },
  GsRgbChannelField: {
    redLabel: 'Rotes band',
    greenLabel: 'Grünes band',
    blueLabel: 'Blaues band'
  },
  GsGrayChannelField: {
    grayLabel: 'Graues band'
  },
  GsSymbolizerEditor: {
    kindFieldLabel: 'Art'
  },
  GsSymbolizerEditorWindow: {
    symbolizersEditor: 'Symbolisierungseditor'
  },
  GsFilterEditorWindow: {
    filterEditor: 'Filtereditor'
  },
  GsMultiEditor: {
    add: 'Hinzufügen',
    remove: 'Entfernen'
  },
  GsUploadButton: {
    upload: 'Upload'
  },
  GsFilterTree: {
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
  GsRuleTable: {
    symbolizersColumnTitle: 'Symbolisierung',
    nameColumnTitle: 'Name',
    filterColumnTitle: 'Filter',
    minScaleColumnTitle: 'Min. Maßstab',
    maxScaleColumnTitle: 'Max. Maßstab',
    amountColumnTitle: 'Anzahl',
    duplicatesColumnTitle: 'Doppelte'
  },
  GsRules: {
    rulesTitle: 'Regeln',
    multiEdit: 'Auswählen',
    addRule: 'Hinzufügen',
    classification: 'Klassifizierung',
    remove: 'Entfernen',
    clone: 'Duplizieren',
    edit: 'Bearbeiten',
    defaultRuleTitle: 'Unbenannt'
  },
  GsRuleReorderButtons: {
    ruleMoveUpTip: 'Verschiebe Regel eine Position nach oben',
    ruleMoveDownTip: 'Verschiebe Regel eine Position nach unten'
  },
  GsRuleGenerator: {
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
    numberOfRulesViaKmeans: '…betroffen durch k-Means Klassifizierung.',
    allDistinctValues: 'Alle eindeutigen Werte verwenden'
  },
  GsColorRampCombo: {
    colorRampPlaceholder: 'Auswählen…'
  },
  GsColorSpaceCombo: {
    colorSpacePlaceholder: 'Auswählen…'
  },
  GsClassificationCombo: {
    equalInterval: 'Equal Interval',
    quantile: 'Quantile ',
    logarithmic: 'Logarithmic',
    kmeans: 'k-Means'
  },
  GsRuleGeneratorWindow: {
    ruleGenerator: 'Klassifizierung'
  },
  GsIconSelectorWindow: {
    windowLabel: 'Wähle Icon'
  },
  GsIconSelector: {
    librarySelectLabel: 'Wähle Bibliothek'
  },
  GsSLDUnitsSelect: {
    symbolizerUnitsLabel: 'Symbolizer Einheiten',
    symbolizerUnitsPixel: 'Pixel',
    symbolizerUnitsMeter: 'Meter',
    symbolizerUnitsFoot: 'Fuß'
  },
  ...de_DE
};
