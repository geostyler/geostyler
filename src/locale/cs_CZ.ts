/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
/* Released under the BSD 2-Clause License
 *
 * Copyright © 2025-present, terrestris GmbH & Co. KG and GeoStyler contributors
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
import antd_cs_CZ from 'antd/lib/locale/cs_CZ';
import type GeoStylerLocale from './locale';
const cs_CZ: GeoStylerLocale = {
  StyleFieldContainer: {
    nameFieldLabel: 'Jméno',
    nameFieldPlaceholder: 'Zadejte jméno',
    titleFieldLabel: 'Titul',
    titleFieldPlaceholder: 'Zadejte titul'
  },
  Editor: {
    kindFieldLabel: 'Druh',
    unknownSymbolizerText: 'Symbolizér neznámý!'
  },
  RuleFieldContainer: {
    nameFieldLabel: 'Jméno',
    nameFieldPlaceholder: 'Zadejte jméno'
  },
  BulkEditModals: {
    colorLabel: 'Vyberte barvu',
    radiusLabel: 'Vyberte poloměr',
    opacityLabel: 'Vyberte průhlednost',
    symbolLabel: 'Vyberte symbol',
    imageFieldLabel: 'Zdroj',
    imageFieldTooltipLabel: 'Otevřít galerii'
  },
  BulkEditor: {
    colorLabel: 'Vyberte barvu',
    radiusLabel: 'Vyberte poloměr',
    opacityLabel: 'Vyberte průhlednost',
    symbolLabel: 'Vyberte symbol',
    imageFieldLabel: 'Zdroj'
  },
  Rule: {
    removeRuleBtnText: 'Odstranit pravidlo',
    scaleFieldTitle: 'Použít měřítko',
    filterFieldTitle: 'Použít filtr',
    nameFieldLabel: 'Jméno',
    nameFieldPlaceholder: 'Zadejte jméno',
    attributeLabel: 'Atribut',
    attributePlaceholderString: 'Vyberte atribut',
    attributeValidationHelpString: 'Prosím vyberte atribut',
    operatorLabel: 'Operátor',
    operatorPlaceholderString: 'Vyberte operátor',
    operatorValidationHelpString: 'Prosím vyberte operátor',
    valueLabel: 'Hodnota',
    valuePlaceholder: 'Zadejte hodnotu',
    valueValidationHelpString: 'Prosím zadejte hodnotu'
  },
  Style: {
    addRuleBtnText: 'Přidat pravidlo',
    cloneRulesBtnText: 'Klonovat pravidla',
    removeRulesBtnText: 'Odstranit pravidla',
    nameFieldLabel: 'Jméno',
    nameFieldPlaceholder: 'Zadejte jméno',
    titleFieldLabel: 'Titul',
    titleFieldPlaceholder: 'Zadejte titul',
    colorLabel: 'Vyberte barvu',
    radiusLabel: 'Vyberte poloměr',
    opacityLabel: 'Vyberte průhlednost',
    symbolLabel: 'Vyberte symbol',
    multiEditLabel: 'Hromadná úprava',
    ruleGeneratorWindowBtnText: 'Klasifikace'
  },
  CardStyle: {
    styleTitle: 'Styl',
    classificationTitle: 'Klasifikace',
    multiEditTitle: 'Hromadná úprava',
    symbolizerTitle: 'Symbolizér',
    filterTitle: 'Filtry',
    iconLibrariesTitle: 'Galerie'
  },
  StyleOverview: {
    styleTitle: 'Styl'
  },
  RuleOverview: {
    ruleTitle: 'Pravidlo'
  },
  Symbolizers: {
    symbolizersTitle: 'Symbolizéry',
    addSymbolizer: 'Přidat symbolizér',
    showAll: 'Zobrazit vše',
    hide: 'Skrýt'
  },
  StyleLoader: {
    label: 'Načíst styl: ',
    uploadButtonLabel: 'Nahrát styl'
  },
  DataLoader: {
    label: 'Načíst data: ',
    uploadButtonLabel: 'Nahrát data'
  },
  WfsParserInput: {
    requestButtonText: 'Získat data',
    urlLabel: 'Url',
    versionLabel: 'Verze',
    typeNameLabel: 'Název typu prvku',
    featureIDLabel: 'ID prvku',
    propertyNameLabel: 'Název vlastnosti',
    maxFeaturesLabel: 'Max. počet prvků',
    fetchParamsLabel: 'fetchParams',
    srsNameLabel: 'SrsName'
  },
  CodeEditor: {
    downloadButtonLabel: 'Uložit jako soubor',
    copyButtonLabel: 'Kopírovat do schránky',
    uploadButtonLabel: 'Nahrát soubor',
    formatSelectLabel: 'Formát',
    styleCopied: 'Styl zkopírován do schránky!',
    writeFeedback: 'Zpětná vazba při zápisu s',
    readFeedback: 'Zpětná vazba při čtení s'
  },
  ParserFeedback: {
    notSupported: 'není podporováno použitým parserem',
    partiallySupported: 'je jen částečně podporováno použitým parserem'
  },
  WellKnownNameEditor: {
    fillColorLabel: 'Barva výplně',
    fillOpacityLabel: 'Průhlednost výplně',
    offsetXLabel: 'Posunutí X',
    offsetYLabel: 'Posunutí Y',
    opacityLabel: 'Průhlednost',
    radiusLabel: 'Poloměr',
    rotateLabel: 'Rotace',
    strokeColorLabel: 'Barva obrysu',
    strokeOpacityLabel: 'Průhlednost obrysu',
    strokeWidthLabel: 'Šířka obrysu'
  },
  FillEditor: {
    opacityLabel: 'Průhlednost',
    fillOpacityLabel: 'Průhlednost výplně',
    outlineOpacityLabel: 'Průhlednost obrysu',
    fillColorLabel: 'Barva výplně',
    outlineColorLabel: 'Barva obrysu',
    outlineWidthLabel: 'Šířka obrysu',
    outlineDasharrayLabel: 'Vzor obrysu',
    graphicFillTypeLabel: 'Typ grafické výplně',
    visibilityLabel: 'Viditelnost',
    generalSectionLabel: 'Obecné',
    graphicFillSectionLabel: 'Grafická výplň'
  },
  IconEditor: {
    iconTooltipLabel: 'Otevřít galerii',
    iconSpriteTooltipLabel: 'Použít sprite',
    imageLabel: 'Zdroj',
    imagePlaceholder: 'URL ke ikoně',
    offsetXLabel: 'Posunutí X',
    offsetYLabel: 'Posunutí Y',
    opacityLabel: 'Průhlednost',
    rotateLabel: 'Rotace',
    sizeLabel: 'Velikost',
    visibilityLabel: 'Viditelnost'
  },
  MarkEditor: {
    wellKnownNameFieldLabel: 'Symbol',
    visibilityLabel: 'Viditelnost'
  },
  LineEditor: {
    capLabel: 'Čepička',
    colorLabel: 'Barva',
    dashLabel: 'Vzor čáry',
    dashOffsetLabel: 'Ofset vzoru',
    graphicFillTypeLabel: 'Typ grafické výplně',
    graphicStrokeTypeLabel: 'Typ grafického tahu',
    joinLabel: 'Spoj',
    opacityLabel: 'Průhlednost',
    perpendicularOffsetLabel: 'Kolmý odklad',
    widthLabel: 'Šířka',
    visibilityLabel: 'Viditelnost',
    generalSectionLabel: 'Obecné',
    graphicStrokeSectionLabel: 'Grafický tah',
    graphicFillSectionLabel: 'Grafická výplň'
  },
  TextEditor: {
    fontLabel: 'Písmo',
    templateFieldLabel: 'Šablona',
    opacityLabel: 'Průhlednost textu',
    colorLabel: 'Barva textu',
    sizeLabel: 'Velikost textu',
    offsetXLabel: 'Posunutí X',
    offsetYLabel: 'Posunutí Y',
    attributeComboPlaceholder: 'Vyberte pole',
    rotateLabel: 'Rotace',
    haloColorLabel: 'Barva halo',
    haloWidthLabel: 'Šířka halo',
    attributeNotFound: 'Pole nenalezeno',
    visibilityLabel: 'Viditelnost'
  },
  PropTextEditor: {
    propFieldLabel: 'Pole',
    opacityLabel: 'Průhlednost textu',
    fontLabel: 'Písmo',
    colorLabel: 'Barva textu',
    sizeLabel: 'Velikost textu',
    offsetXLabel: 'Posunutí X',
    offsetYLabel: 'Posunutí Y',
    attributeComboPlaceholder: 'Vyberte pole',
    rotateLabel: 'Rotace',
    haloColorLabel: 'Barva halo',
    haloWidthLabel: 'Šířka halo'
  },
  RasterEditor: {
    opacityLabel: 'Průhlednost',
    hueRotateLabel: 'Otočení odstínu',
    brightnessMinLabel: 'Min. jas',
    brightnessMaxLabel: 'Max. jas',
    saturationLabel: 'Sytost',
    contrastLabel: 'Kontrast',
    fadeDurationLabel: 'Doba vyblednutí',
    resamplingLabel: 'Převzorkování',
    contrastEnhancementLabel: 'Vylepšení kontrastu',
    gammaValueLabel: 'Gama',
    colorMapLabel: 'Barevná mapa',
    symbolizerLabel: 'Symbolizér',
    channelSelectionLabel: 'Výběr kanálu',
    visibilityLabel: 'Viditelnost'
  },
  RasterChannelEditor: {
    channelSelectionLabel: 'Upravit kanály',
    redBandLabel: 'Červený',
    greenBandLabel: 'Zelený',
    blueBandLabel: 'Modrý',
    grayBandLabel: 'Šedý',
    channelSelectionGrayLabel: 'Šedá',
    channelSelectionRgbLabel: 'RGB',
    titleLabel: 'Výběr kanálu'
  },
  ColorMapEditor: {
    typeLabel: 'Typ',
    extendedLabel: 'Barevná hloubka',
    colorMapEntriesLabel: 'Barevná mapa',
    titleLabel: 'Barevná mapa',
    nrOfClassesLabel: 'Počet tříd',
    colorRampLabel: 'Barevná rampa',
    colorLabel: 'Barva',
    quantityLabel: 'Množství',
    labelLabel: 'Popisek',
    opacityLabel: 'Průhlednost'
  },
  PreviewMap: {
    errorTitle: 'Neplatný geostyler-style',
    couldNotGetDataProjection: 'Nelze získat projekci dat',
    couldNotCreateSampleGeometries: 'Nelze vytvořit vzorové geometrie'
  },
  ColorField: {
    chooseText: 'Vybrat'
  },
  KindField: {
    symbolizerKinds: {
      Mark: 'Značka',
      Fill: 'Výplň',
      Icon: 'Ikona',
      Line: 'Čára',
      Text: 'Text',
      Raster: 'Raster'
    }
  },
  GraphicTypeField: {
    Mark: 'Značka',
    Icon: 'Ikona'
  },
  RgbChannelField: {
    redLabel: 'Červený kanál',
    greenLabel: 'Zelený kanál',
    blueLabel: 'Modrý kanál'
  },
  GrayChannelField: {
    grayLabel: 'Šedý kanál'
  },
  ScaleDenominator: {
    minScaleDenominatorLabelText: 'Min. měřítko',
    maxScaleDenominatorLabelText: 'Max. měřítko',
    minScaleDenominatorPlaceholderText: 'Zadejte min. měřítko (volitelné)',
    maxScaleDenominatorPlaceholderText: 'Zadejte max. měřítko (volitelné)'
  },
  WellKnownNameField: {
    wellKnownNames: {
      circle: 'Kruh',
      square: 'Čtverec',
      triangle: 'Trojúhelník',
      star: 'Hvězda',
      cross: 'Kříž',
      x: 'X'
    }
  },
  ColorMapEntryField: {
    colorLabel: 'Barva',
    labelLabel: 'Legenda',
    quantityLabel: 'Množství',
    opacityLabel: 'Průhlednost'
  },
  ChannelField: {
    sourceChannelNameLabel: 'Název kanálu',
    contrastEnhancementTypeLabel: 'Vylepšení kontrastu',
    gammaValueLabel: 'Gama'
  },
  ColorMapTypeField: {
    rampMapTypeLabel: 'Interpolované',
    intervalsMapTypeLabel: 'Intervaly',
    valuesMapTypeLabel: 'Hodnoty'
  },
  SymbolizerEditorWindow: {
    symbolizersEditor: 'Editor symbolizérů',
    cancelButtonLabel: 'Zrušit',
    saveButtonLabel: 'Uložit'
  },
  FilterOverview: {
    filterTitle: 'Filtry'
  },
  FilterEditorWindow: {
    filterEditor: 'Editor filtru',
    cancelButtonLabel: 'Zrušit',
    saveButtonLabel: 'Uložit'
  },
  MultiEditor: {
    add: 'Přidat',
    remove: 'Odebrat'
  },
  UploadButton: {
    upload: 'Nahrát'
  },
  FilterTree: {
    andDrpdwnLabel: 'A-filtr',
    orDrpdwnLabel: 'NEBO-filtr',
    notDrpdwnLabel: 'NE-filtr',
    comparisonDrpdwnLabel: 'Porovnávací filtr',
    addFilterLabel: 'Přidat filtr',
    changeFilterLabel: 'Změnit filtr',
    removeFilterLabel: 'Odebrat filtr',
    andFilterText: 'A',
    orFilterText: 'Nebo',
    notFilterText: 'Ne'
  },
  RuleTable: {
    symbolizersColumnTitle: 'Symbolizéry',
    nameColumnTitle: 'Název',
    filterColumnTitle: 'Filtr',
    minScaleColumnTitle: 'Min. měřítko',
    maxScaleColumnTitle: 'Max. měřítko',
    scalesColumnTitle: 'Měřítka',
    errorMaxScaleGreaterThanMinScale: 'Maximální měřítko musí být větší než minimální měřítko',
    amountColumnTitle: 'Množství',
    duplicatesColumnTitle: 'Duplikáty',
    actionsColumnTitle: 'Akce',
    actionCloneLabel: 'Klonovat',
    actionRemoveLabel: 'Odstranit'
  },
  Rules: {
    rulesTitle: 'Pravidla',
    multiEdit: 'Vybrat',
    addRule: 'Přidat',
    classification: 'Klasifikace',
    remove: 'Odstranit',
    clone: 'Klonovat',
    edit: 'Upravit',
    defaultRuleTitle: 'Bez názvu'
  },
  RuleReorderButtons: {
    ruleMoveUpTip: 'Posunout pravidlo o jednu pozici nahoru',
    ruleMoveDownTip: 'Posunout pravidlo o jednu pozici dolů'
  },
  RuleGenerator: {
    attribute: 'Atribut',
    generateButtonText: 'Klasifikovat',
    levelOfMeasurement: 'Úroveň měření',
    nominal: 'Nominální',
    ordinal: 'Ordinale',
    cardinal: 'Kardinální',
    numberOfRules: 'Počet tříd',
    colorRamp: 'Barevná rampa',
    colorSpace: 'Barevný prostor',
    colorRampPlaceholder: 'Vybrat…',
    colorRampMinClassesWarningPre: 'Barevná rampa vyžaduje alespoň',
    colorRampMinClassesWarningPost: 'tříd',
    symbolizer: 'Symbolizér',
    classification: 'Metoda klasifikace',
    classificationPlaceholder: 'Vybrat…',
    equalInterval: 'Stejný interval',
    preview: 'Náhled barev',
    numberOfRulesViaKmeans: '… ovlivněno klasifikací k-means.',
    allDistinctValues: 'Použít všechny odlišné hodnoty'
  },
  ColorRampCombo: {
    colorRampPlaceholder: 'Vybrat…'
  },
  ColorSpaceCombo: {
    colorSpacePlaceholder: 'Vybrat…'
  },
  ClassificationCombo: {
    equalInterval: 'Stejný interval',
    quantile: 'Kvantil',
    logarithmic: 'Logaritmický',
    kmeans: 'k-means'
  },
  RuleGeneratorWindow: {
    ruleGenerator: 'Klasifikace'
  },
  IconSelectorWindow: {
    windowLabel: 'Vybrat ikonu'
  },
  IconSelector: {
    librarySelectLabel: 'Vybrat knihovnu'
  },
  SLDUnitsSelect: {
    symbolizerUnitsLabel: 'Jednotky symbolizéru',
    symbolizerUnitsPixel: 'pixel',
    symbolizerUnitsMeter: 'metr',
    symbolizerUnitsFoot: 'stopa'
  },
  AttributeCombo: {
    label: 'Atribut',
    placeholder: 'Vybrat atribut',
    help: 'Prosím vyberte atribut.'
  },
  TextFilterField: {
    label: 'Hodnota',
    placeholder: 'Zadejte textovou hodnotu',
    help: 'Prosím zadejte text.'
  },
  NumberFilterField: {
    label: 'Hodnota',
    placeholder: 'Zadejte číslicovou hodnotu',
    help: 'Prosím zadejte číslo.'
  },
  BoolFilterField: {
    label: 'Hodnota'
  },
  LineCapField: {
    lineCapOptions: {
      butt: 'Plochý',
      round: 'Kulatý',
      square: 'Čtvercový'
    }
  },
  LineJoinField: {
    lineJoinOptions: {
      bevel: 'Zkosený',
      round: 'Kulatý',
      miter: 'Hrot'
    }
  },
  ImageField: {
    sprite: {
      x: 'X',
      y: 'Y',
      height: 'Výška',
      width: 'Šířka'
    }
  },
  UnsupportedPropertiesUtil: {
    notSupported: 'Není podporováno vybraným parserem.',
    partiallySupported: 'Pouze částečně podporováno vybraným parserem.'
  },
  FunctionNameCombo: {
    placeholder: '… vyberte GeoStylerFunction'
  },
  VisibilityField: {
    on: 'zapnuto',
    off: 'vypnuto'
  },
  UnknownInput: {
    typeSelectToolip: 'Vyberte typ vstupu'
  },
  FunctionUI: {
    add: 'přidat',
    remove: 'odebrat'
  },
  Renderer: {
    placeholderInfo: 'Toto je zástupný text, protože symbolizér obsahuje funkce a nelze jej zobrazit.'
  },
  ...antd_cs_CZ
};

export default cs_CZ;
