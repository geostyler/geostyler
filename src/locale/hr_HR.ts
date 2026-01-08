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
import antd_hr_HR from 'antd/lib/locale/hr_HR';
import type GeoStylerLocale from './locale';
const hr_HR: GeoStylerLocale = {
  StyleFieldContainer: {
    nameFieldLabel: 'Ime',
    nameFieldPlaceholder: 'Unesite ime',
    titleFieldLabel: 'Naslov',
    titleFieldPlaceholder: 'Unesite naslov'
  },
  Editor: {
    pixelInfo: 'TODO(hr_HR):All dimension-related fields use pixels',
    kindFieldLabel: 'Vrsta',
    unknownSymbolizerText: 'Simbolizator nepoznat!'
  },
  RuleFieldContainer: {
    nameFieldLabel: 'Ime',
    nameFieldPlaceholder: 'Unesite ime'
  },
  BulkEditModals: {
    colorLabel: 'Izaberite boju',
    radiusLabel: 'Izaberite opseg',
    opacityLabel: 'Odredite prozirnost',
    symbolLabel: 'Izaberite znak',
    imageFieldLabel: 'Izvor',
    imageFieldTooltipLabel: 'Otvori galeriju'
  },
  BulkEditor: {
    colorLabel: 'Izaberite boju',
    radiusLabel: 'Izaberite opseg',
    opacityLabel: 'Odredite prozirnost',
    opacityExtra: 'TODO(hr_HR):Number between 0 (fully transparent) and 1 (fully visible)',
    symbolLabel: 'Izaberite znak',
    imageFieldLabel: 'Izvor'
  },
  Rule: {
    removeRuleBtnText: 'Ukloni pravilo',
    scaleFieldTitle: 'Koristi skalu',
    filterFieldTitle: 'Koristi filter',
    nameFieldLabel: 'Ime',
    nameFieldPlaceholder: 'Unesite ime',
    attributeLabel: 'Svojstvo',
    attributePlaceholderString: 'Izaberite svojstvo',
    attributeValidationHelpString: 'Odaberite svojstvo',
    operatorLabel: 'Operator',
    operatorPlaceholderString: 'Odaberite operatora',
    operatorValidationHelpString: 'Odaberite operatora',
    valueLabel: 'Vrijednost',
    valuePlaceholder: 'Unesite vrijednost',
    valueValidationHelpString: 'Unesite vrijednost'
  },
  Style: {
    addRuleBtnText: 'Dodaj pravilo',
    cloneRulesBtnText: 'Kopiraj pravilo',
    removeRulesBtnText: 'Ukloni pravilo',
    nameFieldLabel: 'Ime',
    nameFieldPlaceholder: 'Unesite ime',
    titleFieldLabel: 'Naslov',
    titleFieldPlaceholder: 'Unesi naslov',
    colorLabel: 'Izaberite boju',
    radiusLabel: 'Izaberite opseg',
    opacityLabel: 'Odredite prozirnost',
    symbolLabel: 'Izaberite znak',
    multiEditLabel: 'Višestruko uređivanje',
    ruleGeneratorWindowBtnText: 'Klasifikacija'
  },
  CardStyle: {
    styleTitle: 'Stil',
    classificationTitle: 'Klasifikacija',
    multiEditTitle: 'Višestruko uređivanje',
    symbolizerTitle: 'Simbolizator',
    filterTitle: 'Filters',
    iconLibrariesTitle: 'Galerija'
  },
  StyleOverview: {
    styleTitle: 'Stil'
  },
  RuleOverview: {
    ruleTitle: 'Pravilo'
  },
  Symbolizers: {
    symbolizersTitle: 'Simbolizatori',
    addSymbolizer: 'Dodaj simbolizator',
    showAll: 'Prikaži sve',
    hide: 'Sakrij'
  },
  StyleLoader: {
    label: 'Učitaj stil: ',
    uploadButtonLabel: 'Prenesi Sil'
  },
  DataLoader: {
    label: 'Učitaj podatke: ',
    uploadButtonLabel: 'Prenesi podatke'
  },
  WfsParserInput: {
    requestButtonText: 'Dohvati podatke',
    urlLabel: 'Url',
    versionLabel: 'Verzija',
    typeNameLabel: 'Ime Tipa Objekta',
    featureIDLabel: 'Objekt ID',
    propertyNameLabel: 'Ime Svojstva',
    maxFeaturesLabel: 'Maks Objekata',
    fetchParamsLabel: 'dohvati Parametre',
    srsNameLabel: 'Srs Ime'
  },
  CodeEditor: {
    downloadButtonLabel: 'Spremi kao',
    copyButtonLabel: 'Kopiraj u međuspremnik',
    uploadButtonLabel: 'TODO(hr_HR):Open a file',
    formatSelectLabel: 'Formatiraj',
    styleCopied: 'Stil kopiran u međuspremnik!',
    writeFeedback: 'Povratne informacije tijekom pisanja s',
    readFeedback: 'Povratne informacije tijekom čitanja sa',
  },
  ParserFeedback: {
    notSupported: 'Nije podržano od strane korištenog parsera',
    partiallySupported: 'Samo je djelimično podržano od strane korištenog parsera'
  },
  WellKnownNameEditor: {
    fill: 'TODO(hr_HR):Fill',
    fillColorLabel: 'Ispuna-Boja',
    fillOpacityLabel: 'Ispuna-Prozirnost',
    position: 'TODO(hr_HR):Position',
    offsetXLabel: 'Pomak X',
    offsetXExtra: 'TODO(hr_HR):Positive values move right, negative left',
    offsetYLabel: 'Pomak Y',
    offsetYExtra: 'TODO(hr_HR):Positive values move up, negative down',
    opacityLabel: 'Prozirnost',
    opacityExtra: 'TODO(hr_HR):Number between 0 (fully transparent) and 1 (fully visible)',
    radiusLabel: 'Radius',
    rotateLabel: 'Rotacija',
    rotateExtra: 'TODO(hr_HR):Positive values rotate clockwise, negative counterclockwise (in degrees)',
    stroke: 'TODO(hr_HR):Stroke',
    strokeColorLabel: 'Linija-boja',
    strokeOpacityLabel: 'Linija-Prozirnost',
    strokeWidthLabel: 'Linija-Širina',
  },
  FillEditor: {
    opacityLabel: 'Prozirnost',
    fill: 'TODO(hr_HR):Fill',
    fillOpacityLabel: 'Ispuna-Prozirnost',
    opacityExtra: 'TODO(hr_HR):Number between 0 (fully transparent) and 1 (fully visible)',
    outline: 'TODO(hr_HR):Outline',
    outlineOpacityLabel: 'Linija-Prozirnost',
    fillColorLabel: 'Ispuna-Boja',
    outlineColorLabel: 'Obrub-Boja',
    outlineWidthLabel: 'Obrub-Širina',
    outlineDasharrayLabel: 'Obrub-Crtkano',
    outlineDasharrayExtra: 'TODO(hr_HR):Numbers in pixels of successive sizes of dashes and spaces',
    graphicFillTypeLabel: 'Vrsta grafičke ispune',
    visibilityLabel: 'Vidljivost',
    generalSectionLabel: 'Általános',
    graphicFillSectionLabel: 'Grafikus kitöltés'
  },
  IconEditor: {
    iconTooltipLabel: 'Otvori galeriju',
    iconSpriteTooltipLabel: 'TODO(hr_HR): Use sprite',
    imageLabel: 'Izvor',
    imagePlaceholder: 'URL to Icon',
    position: 'TODO(hr_HR):Position',
    offsetXLabel: 'Pomak X',
    offsetXExtra: 'TODO(hr_HR):Positive values move right, negative left',
    offsetYLabel: 'Pomak Y',
    offsetYExtra: 'TODO(hr_HR):Positive values move up, negative down',
    opacityLabel: 'Prozirnost',
    opacityExtra: 'TODO(hr_HR):Number between 0 (fully transparent) and 1 (fully visible)',
    rotateLabel: 'Rotation',
    rotateExtra: 'TODO(hr_HR):Positive values rotate clockwise, negative counterclockwise (in degrees)',
    sizeLabel: 'Veličina',
    visibilityLabel: 'Vidljivost'
  },
  MarkEditor: {
    wellKnownNameFieldLabel: 'Simbol',
    visibilityLabel: 'Vidljivost'
  },
  LineEditor: {
    capLabel: 'Gornja granica',
    colorLabel: 'Boja',
    dashLabel: 'Crtica uzorak',
    dashExtra: 'TODO(hr_HR):Numbers in pixels of successive sizes of dashes and spaces',
    dashOffsetLabel: 'Poravnjanje crtkane linije',
    graphicFillTypeLabel: 'Vrsta grafičke ispune',
    graphicStrokeTypeLabel: 'Vrsta poteza',
    joinLabel: 'Pridruži',
    opacityLabel: 'Prozirnost',
    opacityExtra: 'TODO(hr_HR):Number between 0 (fully transparent) and 1 (fully visible)',
    perpendicularOffsetLabel: 'Okomiti pomak',
    widthLabel: 'Širina',
    visibilityLabel: 'Vidljivost',
    generalSectionLabel: 'Általános',
    graphicStrokeSectionLabel: 'Grafikus potez',
    graphicFillSectionLabel: 'Grafikus kitöltés'
  },
  TextEditor: {
    fontLabel: 'Font',
    templateFieldLabel: 'Template',
    opacityLabel: 'Tekst-Prozirnost',
    opacityExtra: 'TODO(hr_HR):Number between 0 (fully transparent) and 1 (fully visible)',
    colorLabel: 'Tekst-Boja',
    sizeLabel: 'Tekst-Veličina',
    position: 'TODO(hr_HR):Position',
    offsetXLabel: 'Pomak X',
    offsetXExtra: 'TODO(hr_HR):Positive values move right, negative left',
    offsetYLabel: 'Pomak Y',
    offsetYExtra: 'TODO(hr_HR):Positive values move up, negative down',
    attributeComboPlaceholder: 'Izaberi polje',
    rotateLabel: 'Rotacija',
    rotateExtra: 'TODO(hr_HR):Positive values rotate clockwise, negative counterclockwise (in degrees)',
    halo: 'TODO(hr_HR):Halo',
    haloColorLabel: 'Halo-Boja',
    haloWidthLabel: 'Halo-Širina',
    attributeNotFound: 'Polje nije pronađeno',
    visibilityLabel: 'Vidljivost'
  },
  PropTextEditor: {
    propFieldLabel: 'Polje',
    opacityLabel: 'Tekst-Prozirnost',
    opacityExtra: 'TODO(hr_HR):Number between 0 (fully transparent) and 1 (fully visible)',
    fontLabel: 'Font',
    colorLabel: 'Tekst-Boja',
    sizeLabel: 'Tekst-Veličina',
    offsetXLabel: 'Pomak X',
    offsetXExtra: 'TODO(hr_HR):Positive values move right, negative left',
    offsetYLabel: 'Pomak Y',
    offsetYExtra: 'TODO(hr_HR):Positive values move up, negative down',
    attributeComboPlaceholder: 'Odaberi polje',
    rotateLabel: 'Rotacija',
    rotateExtra: 'TODO(hr_HR):Positive values rotate clockwise, negative counterclockwise (in degrees)',
    haloColorLabel: 'Halo-Boja',
    haloWidthLabel: 'Halo-Širina'
  },
  RasterEditor: {
    opacityLabel: 'Prozirnost',
    opacityExtra: 'TODO(hr_HR):Number between 0 (fully transparent) and 1 (fully visible)',
    hueRotateLabel: 'Nijansa Rotacija',
    brightnessMinLabel: 'Min. Svjetlina',
    brightnessMaxLabel: 'Max. Svjetlina',
    saturationLabel: 'Zasićenost',
    contrastLabel: 'Kontrast',
    fadeDurationLabel: 'Trajanje Blijeđenja',
    resamplingLabel: 'Ponovno uzrokovanje',
    contrastEnhancementLabel: 'Poboljšanje kontrasta',
    gammaValueLabel: 'Gamma',
    colorMapLabel: 'Mapa boja',
    symbolizerLabel: 'Simbolizator',
    channelSelectionLabel: 'Odabir kanala',
    visibilityLabel: 'Vidljivost'
  },
  RasterChannelEditor: {
    channelSelectionLabel: 'Uredi kanale',
    redBandLabel: 'Crvena',
    greenBandLabel: 'Zelena',
    blueBandLabel: 'Plava',
    grayBandLabel: 'Siva',
    channelSelectionGrayLabel: 'Siva',
    channelSelectionRgbLabel: 'RGB',
    titleLabel: 'Odabir kanala'
  },
  ColorMapEditor: {
    typeLabel: 'Tip',
    extendedLabel: 'Dubina boje',
    colorMapEntriesLabel: 'Mapa boja',
    titleLabel: 'Mapa boja',
    nrOfClassesLabel: 'Broj klasa',
    colorRampLabel: 'Intenzitet boje',
    colorLabel: 'Boja',
    quantityLabel: 'Količina',
    labelLabel: 'Oznaka',
    opacityLabel: 'Prozirnost'
  },
  PreviewMap: {
    errorTitle: 'Nevažeći geostyler-style',
    couldNotGetDataProjection: 'Nije moguće dobiti projekciju podataka',
    couldNotCreateSampleGeometries: 'Nije moguće kreirati uzorak geometrije',
  },
  ColorField: {
    chooseText: 'Izaberi'
  },
  KindField: {
    symbolizerKinds: {
      Mark: 'Oznaka',
      Fill: 'Ispuna',
      Icon: 'Ikona',
      Line: 'Linija',
      Text: 'Tekst',
      Raster: 'Raster'
    }
  },
  GraphicTypeField: {
    Mark: 'Oznaka',
    Icon: 'Ikona'
  },
  RgbChannelField: {
    redLabel: 'Crvena traka',
    greenLabel: 'Zelena traka',
    blueLabel: 'Plava traka'
  },
  GrayChannelField: {
    grayLabel: 'Siva traka'
  },
  ScaleDenominator: {
    minScaleDenominatorLabelText: 'Min. Mjerilo',
    maxScaleDenominatorLabelText: 'Max. Mjerilo',
    minScaleDenominatorPlaceholderText: 'Unesi min. mjerilo (Neobavezno)',
    maxScaleDenominatorPlaceholderText: 'Unesi maks. mjerilo (Neobavezno)'
  },
  WellKnownNameField: {
    wellKnownNames: {
      circle: 'Krug',
      square: 'Kocka',
      triangle: 'Trokut',
      star: 'Zvijezda',
      cross: 'Križ',
      x: 'X'
    }
  },
  ColorMapEntryField: {
    colorLabel: 'Boja',
    labelLabel: 'Oznaka legende',
    quantityLabel: 'Količina',
    opacityLabel: 'Prozirnost'
  },
  ChannelField: {
    sourceChannelNameLabel: 'Ime Kanala',
    contrastEnhancementTypeLabel: 'Poboljšanje kontrasta',
    gammaValueLabel: 'Gamma'
  },
  ColorMapTypeField: {
    rampMapTypeLabel: 'Interpolirano',
    intervalsMapTypeLabel: 'Interval',
    valuesMapTypeLabel: 'Vrijednost'
  },
  SymbolizerEditorWindow: {
    symbolizersEditor: 'Uređenje simbola',
    cancelButtonLabel: 'Otkazati',
    saveButtonLabel: 'TODO'
  },
  FilterOverview: {
    filterTitle: 'Filteri'
  },
  FilterEditorWindow: {
    filterEditor: 'Uređenje filtera',
    cancelButtonLabel: 'Otkazati',
    saveButtonLabel: 'TODO'
  },
  MultiEditor: {
    add: 'Dodaj',
    remove: 'Ukloni'
  },
  UploadButton: {
    upload: 'Prenesi'
  },
  FilterTree: {
    andDrpdwnLabel: 'I-Filter',
    orDrpdwnLabel: 'ILI-Filter',
    notDrpdwnLabel: 'NE-Filter',
    comparisonDrpdwnLabel: 'Usporedba-Filter',
    addFilterLabel: 'Dodaj Filter',
    changeFilterLabel: 'Promjeni Filter',
    removeFilterLabel: 'Ukloni Filter',
    andFilterText: 'I',
    orFilterText: 'ILI',
    notFilterText: 'NE'
  },
  RuleTable: {
    symbolizersColumnTitle: 'Simbolizator',
    nameColumnTitle: 'Ime',
    filterColumnTitle: 'Filter',
    minScaleColumnTitle: 'Min. Mjerilo',
    maxScaleColumnTitle: 'Max. Mjerilo',
    scalesColumnTitle: 'TODO(hr_HR): Scales',
    errorMaxScaleGreaterThanMinScale: 'TODO(hr_HR): errorMaxScaleGreaterThanMinScale',
    amountColumnTitle: 'Količina',
    duplicatesColumnTitle: 'Duplikati',
    actionsColumnTitle: 'Akcije',
    actionCloneLabel: 'Kloniraj',
    actionRemoveLabel: 'Ukloni'
  },
  Rules: {
    rulesTitle: 'Pravila',
    multiEdit: 'Odabir',
    addRule: 'Dodaj',
    classification: 'Klasifikacija',
    remove: 'Ukloni',
    clone: 'Kloniraj',
    edit: 'Uredi',
    defaultRuleTitle: 'Nenaslovljeno'
  },
  RuleReorderButtons: {
    ruleMoveUpTip: 'Gurni pravilo gore',
    ruleMoveDownTip: 'Gurni pravilo dolje'
  },
  RuleGenerator: {
    attribute: 'Svojstvo',
    generateButtonText: 'Klasificirati',
    levelOfMeasurement: 'Nivo mjere',
    nominal: 'Nominalno',
    ordinal: 'Redni',
    cardinal: 'Glavni',
    numberOfRules: 'Broj klasa',
    colorRamp: 'Intenzitet boje',
    colorSpace: 'Paleta boja',
    colorRampPlaceholder: 'Odabir...',
    colorRampMinClassesWarningPre: 'Intenzitet boja zahtjeva barem',
    colorRampMinClassesWarningPost: 'Klase',
    symbolizer: 'Simbolizator',
    classification: 'Metoda klasifikacija',
    classificationPlaceholder: 'Odabir...',
    equalInterval: 'Jednaki interval',
    preview: 'Pretpregled boje',
    numberOfRulesViaKmeans: '...utjecano od strane k-centar klasifikacije.',
    allDistinctValues: 'Koristi sve različite vrijednosti'
  },
  ColorRampCombo: {
    colorRampPlaceholder: 'Odabir...'
  },
  ColorSpaceCombo: {
    colorSpacePlaceholder: 'Odabir...'
  },
  ClassificationCombo: {
    equalInterval: 'Jednaki interval',
    quantile: 'Kvantitativna vrijednost ',
    logarithmic: 'Logaritamska vijednost',
    kmeans: 'k-centar'
  },
  RuleGeneratorWindow: {
    ruleGenerator: 'Klasifikacija'
  },
  IconSelectorWindow: {
    windowLabel: 'Odaberi ikonu'
  },
  IconSelector: {
    librarySelectLabel: 'Odaberi temu'
  },
  SLDUnitsSelect: {
    symbolizerUnitsLabel: 'Jedinice simbolizatora',
    symbolizerUnitsPixel: 'piksel',
    symbolizerUnitsMeter: 'metar',
    symbolizerUnitsFoot: 'stopa'
  },
  AttributeCombo: {
    label: 'Svojstvo',
    placeholder: 'Odaberi svojstvo',
    help: 'Odaberite svojstvo'
  },
  TextFilterField: {
    label: 'Vrijednost',
    placeholder: 'Unesite tekst',
    help: 'Unesite tekst'
  },
  NumberFilterField: {
    label: 'Vrijednost',
    placeholder: 'Unesite brojčanu vrijednost',
    help: 'Unesite brojčanu vrijednost'
  },
  BoolFilterField: {
    label: 'Vrijednost'
  },
  LineCapField: {
    lineCapOptions: {
      butt: 'TODO(hr_HR): butt',
      round: 'TODO(hr_HR): round',
      square: 'TODO(hr_HR): square'
    }
  },
  LineJoinField: {
    lineJoinOptions: {
      bevel: 'TODO(hr_HR): bevel',
      round: 'TODO(hr_HR): round',
      miter: 'TODO(hr_HR): miter'
    }
  },
  ImageField: {
    sprite: {
      x: 'TODO(hr_HR): x',
      y: 'TODO(hr_HR): y',
      height: 'TODO(hr_HR): height',
      width: 'TODO(hr_HR): width'
    }
  },
  UnsupportedPropertiesUtil: {
    notSupported: 'Nije podržano od strane odabranog parsera.',
    partiallySupported: 'Samo djelomično podržano od strane odabranog parsera.'
  },
  FunctionNameCombo: {
    placeholder: '… odaberite GeoStylerFunction'
  },
  VisibilityField: {
    on: 'uključeno',
    off: 'isključeno'
  },
  UnknownInput: {
    typeSelectToolip: 'Odaberite tip unosa'
  },
  FunctionUI: {
    add: 'Dodaj',
    remove: 'Ukloni'
  },
  Renderer: {
    placeholderInfo: 'Ovo je mjesto kao simbolizator sadrži funkcije i ne može se pregledati.'
  },
  ...antd_hr_HR
};
export default hr_HR;
