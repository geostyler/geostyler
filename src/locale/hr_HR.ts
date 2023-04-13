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
import antd_hr_HR from 'antd/lib/locale-provider/hr_HR';
import { GeoStylerLocale } from './locale';
const hr_HR: GeoStylerLocale = {
  StyleFieldContainer: {
    nameFieldLabel: 'Ime',
    nameFieldPlaceholder: 'Unesite ime',
    titleFieldLabel: 'Naslov',
    titleFieldPlaceholder: 'Unesite naslov'
  },
  Editor: {
    kindFieldLabel: 'Vrsta'
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
    imageFieldTooltipLabel: 'Otvori Galeriju'
  },
  BulkEditor: {
    colorLabel: 'Izaberite boju',
    radiusLabel: 'Izaberite opseg',
    opacityLabel: 'Odredite prozirnost',
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
    ruleGeneratorWindowBtnText: 'Klasificikacija'
  },
  CardStyle: {
    styleTitle: 'Stil',
    classificationTitle: 'Klasificikacija',
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
    typeNameLabel: 'ImeTipaObjekta',
    featureIDLabel: 'ObjektID',
    propertyNameLabel: 'ImeSvojstva',
    maxFeaturesLabel: 'MaksObjekata',
    fetchParamsLabel: 'dohvatiParametre',
    srsNameLabel: 'SrsIme'
  },
  CodeEditor: {
    downloadButtonLabel: 'Spremi kao',
    copyButtonLabel: 'Kopiraj u međuspremnik',
    formatSelectLabel: 'Formatiraj',
    styleCopied: 'Stil kopiran u međuspremnik!',
    writeFeedback: 'Feedback while writing with',
    readFeedback: 'Feedback while reading with',
  },
  ParserFeedback: {
    notSupported: 'Nije podržano od strane korštenog parsera',
    partiallySupported: 'Samo je djelimično podržano od strane korištenog parsera'
  },
  WellKnownNameEditor: {
    fillColorLabel: 'Ispuna-Boja',
    fillOpacityLabel: 'Ispuna-Prozirnost',
    offsetXLabel: 'Kompenziraj X',
    offsetYLabel: 'Kompenziraj Y',
    opacityLabel: 'Prozirnost',
    radiusLabel: 'Radius',
    rotateLabel: 'Rotacija',
    strokeColorLabel: 'Stroke-boja',
    strokeOpacityLabel: 'Stroke-Prozirnost',
    strokeWidthLabel: 'Stroke-Širina',
  },
  FillEditor: {
    opacityLabel: 'Prozirnost',
    fillOpacityLabel: 'Ispuna-Prozirnost',
    outlineOpacityLabel: 'Stroke-Prozirnost',
    fillColorLabel: 'Ispuna-Boja',
    outlineColorLabel: 'Obrub-Boja',
    outlineWidthLabel: 'Obrub-Širina',
    outlineDasharrayLabel: 'Obrub-Dasharray',
    graphicFillTypeLabel: 'Vrsta grafičke ispune'
  },
  IconEditor: {
    iconTooltipLabel: 'Otvori galeriju',
    imageLabel: 'Izvor',
    imagePlaceholder: 'URL to Icon',
    offsetXLabel: 'Kompenziraj X',
    offsetYLabel: 'Kompenziraj Y',
    opacityLabel: 'Prozirnost',
    rotateLabel: 'Rotation',
    sizeLabel: 'Veličina',
  },
  MarkEditor: {
    wellKnownNameFieldLabel: 'Simbol'
  },
  LineEditor: {
    capLabel: 'Gornja granica',
    colorLabel: 'Boja',
    dashLabel: 'Crtica uzorak',
    dashOffsetLabel: 'Prijeboj s crticom',
    graphicFillTypeLabel: 'Vrsta grafičke ispune',
    graphicStrokeTypeLabel: 'Tip grafičke ispune',
    joinLabel: 'Pridruži',
    opacityLabel: 'Prozirnost',
    perpendicularOffsetLabel: 'Perpendicular Offset',
    widthLabel: 'Width',
  },
  TextEditor: {
    fontLabel: 'Font',
    templateFieldLabel: 'Template',
    opacityLabel: 'Tekst-Prozirnost',
    colorLabel: 'Tekst-Boja',
    sizeLabel: 'Tekst-Veličina',
    offsetXLabel: 'Kompenziraj X',
    offsetYLabel: 'Kompenziraj Y',
    attributeComboPlaceholder: 'Izaberi polje',
    rotateLabel: 'Rotacija',
    haloColorLabel: 'Halo-Boja',
    haloWidthLabel: 'Halo-Širina',
    attributeNotFound: 'Polje nije pronađeno'
  },
  PropTextEditor: {
    propFieldLabel: 'Polje',
    opacityLabel: 'Tekst-Prozirnost',
    fontLabel: 'Font',
    colorLabel: 'Tekst-Boja',
    sizeLabel: 'Tekst-Veličina',
    offsetXLabel: 'Kompenziraj X',
    offsetYLabel: 'Kompenziraj Y',
    attributeComboPlaceholder: 'Odaberi polje',
    rotateLabel: 'Rotacija',
    haloColorLabel: 'Halo-Boja',
    haloWidthLabel: 'Halo-Širina'
  },
  RasterEditor: {
    opacityLabel: 'Prozirnost',
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
    channelSelectionLabel: 'Odabir kanala'
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
  Preview: {
    openEditorText: 'Uredi Simbolizator',
    closeEditorText: 'Zatvori editor'
  },
  ColorField: {
    clearText: 'Očisti',
    closeText: 'Zatvori',
    editText: 'Promjeni',
    chooseText: 'Izaberi',
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
    minScaleDenominatorLabelText: 'Min. Skala',
    maxScaleDenominatorLabelText: 'Max. SKala',
    minScaleDenominatorPlaceholderText: 'Unesi min. Skalu (Neobavezno)',
    maxScaleDenominatorPlaceholderText: 'Unesi maks. Skalu (Neobavezno)'
  },
  WellKnownNameField: {
    wellKnownNames: {
      Circle: 'Krug',
      Square: 'Kocka',
      Triangle: 'Trokut',
      Star: 'Zvijezda',
      Cross: 'Križ',
      X: 'X'
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
  SymbolizerEditor: {
    kindFieldLabel: 'Vrsta',
    unknownSymbolizerText: 'Simbolizator nepoznat!'
  },
  SymbolizerEditorWindow: {
    symbolizersEditor: 'Urednica simbolizatora'
  },
  FilterOverview: {
    filterTitle: 'Filteri'
  },
  FilterEditorWindow: {
    filterEditor: 'Urednica filtra'
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
    minScaleColumnTitle: 'Min. Skala',
    maxScaleColumnTitle: 'Max. Skala',
    amountColumnTitle: 'Količina',
    duplicatesColumnTitle: 'Duplikati'
  },
  Rules: {
    rulesTitle: 'Pravila',
    multiEdit: 'Odabir',
    addRule: 'Dodaj',
    classification: 'Klasificikacija',
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
    nominal: 'Nominalo',
    ordinal: 'Redni',
    cardinal: 'Glavni',
    numberOfRules: 'Broj klasa',
    colorRamp: 'Intenzitet boje',
    colorSpace: 'Paleta boja',
    colorRampPlaceholder: 'Odabir...',
    colorRampMinClassesWarningPre: 'Intenzitet boja zahtjeva barem',
    colorRampMinClassesWarningPost: 'Klase',
    symbolizer: 'Simbolizator',
    classification: 'Metoda klasifikacije',
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
    ruleGenerator: 'Klasificikacija'
  },
  IconSelectorWindow: {
    windowLabel: 'Odaberi ikonu'
  },
  IconSelector: {
    librarySelectLabel: 'Odaberi temu'
  },
  SLDUnitsSelect: {
    symbolizerUnitsLabel: 'Jedinice simbolizatora',
    symbolizerUnitsPixel: 'pksel',
    symbolizerUnitsMeter: 'metar',
    symbolizerUnitsFoot: 'stopa'
  },
  AttributeCombo: {
    label: 'Svojstvo',
    placeholder: 'Odaberi atribut',
    help: 'Odaberite atribut'
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
  UnsupportedPropertiesUtil: {
    notSupported: 'Nije podržano od strane odabranog parsera.',
    partiallySupported: 'Samo djelomično podržano od strane odabranog parsera.'
  },
  ...antd_hr_HR
};

export default hr_HR;
