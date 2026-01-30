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
import antd_pl_PL from 'antd/lib/locale/pl_PL';
import type GeoStylerLocale from './locale';
const pl_PL: GeoStylerLocale = {
  StyleFieldContainer: {
    nameFieldLabel: 'Nazwa',
    nameFieldPlaceholder: 'Wprowadź nazwę',
    titleFieldLabel: 'Tytuł',
    titleFieldPlaceholder: 'Wprowadź tytuł'
  },
  Editor: {
    kindFieldLabel: 'Rodzaj',
    unknownSymbolizerText: 'Symbolizer nieznany!'
  },
  RuleFieldContainer: {
    nameFieldLabel: 'Nazwa',
    nameFieldPlaceholder: 'Wprowadź nazwę'
  },
  CodeEditor: {
    downloadButtonLabel: 'Zapisz jako plik',
    copyButtonLabel: 'Kopiuj do schowka',
    uploadButtonLabel: 'Otwórz plik',
    formatSelectLabel: 'Format',
    styleCopied: 'Styl skopiowany do schowka!',
    writeFeedback: 'Informacja zwrotna podczas pisania z',
    readFeedback: 'Informacja zwrotna podczas czytania z'
  },
  BulkEditModals: {
    colorLabel: 'Wybierz kolor',
    radiusLabel: 'Ustaw promień',
    opacityLabel: 'Ustaw przezroczystość',
    symbolLabel: 'Wybierz symbol',
    imageFieldLabel: 'Źródło',
    imageFieldTooltipLabel: 'Otwórz galerię'
  },
  BulkEditor: {
    colorLabel: 'Wybierz kolor',
    radiusLabel: 'Ustaw promień',
    opacityLabel: 'Ustaw przezroczystość',
    symbolLabel: 'Wybierz symbol',
    imageFieldLabel: 'Źródło'
  },
  Rule: {
    removeRuleBtnText: 'Usuń regułę',
    scaleFieldTitle: 'Użyj skali',
    filterFieldTitle: 'Użyj filtru',
    nameFieldLabel: 'Nazwa',
    nameFieldPlaceholder: 'Wprowadź nazwę',
    attributeLabel: 'Atrybut',
    attributePlaceholderString: 'Wybierz atrybut',
    attributeValidationHelpString: 'Proszę wybrać atrybut.',
    operatorLabel: 'Operator',
    operatorPlaceholderString: 'Wybierz operator',
    operatorValidationHelpString: 'Proszę wybrać operator.',
    valueLabel: 'Wartość',
    valuePlaceholder: 'Wprowadź wartość',
    valueValidationHelpString: 'Proszę wprowadzić wartość.'
  },
  Style: {
    addRuleBtnText: 'Dodaj regułę',
    cloneRulesBtnText: 'Duplikuj reguły',
    removeRulesBtnText: 'Usuń reguły',
    nameFieldLabel: 'Nazwa',
    nameFieldPlaceholder: 'Wprowadź nazwę',
    titleFieldLabel: 'Tytuł',
    titleFieldPlaceholder: 'Wprowadź tytuł',
    colorLabel: 'Wybierz kolor',
    radiusLabel: 'Wybierz promień',
    opacityLabel: 'Wybierz przezroczystość',
    symbolLabel: 'Wybierz symbol',
    multiEditLabel: 'Edytuj selekcję',
    ruleGeneratorWindowBtnText: 'Klasyfikacja'
  },
  CardStyle: {
    styleTitle: 'Styl',
    classificationTitle: 'Klasyfikacja',
    multiEditTitle: 'Edytuj selekcję',
    symbolizerTitle: 'Symbolizacja',
    filterTitle: 'Filtr',
    iconLibrariesTitle: 'Galeria'
  },
  StyleOverview: {
    styleTitle: 'Styl'
  },
  RuleOverview: {
    ruleTitle: 'Reguła'
  },
  Symbolizers: {
    symbolizersTitle: 'Symbolizacja',
    addSymbolizer: 'Dodaj symbolizację',
    showAll: 'Pokaż wszystkie',
    hide: 'Ukryj'
  },
  StyleLoader: {
    label: 'Wczytaj styl: ',
    uploadButtonLabel: 'Załaduj styl'
  },
  DataLoader: {
    label: 'Wczytaj dane: ',
    uploadButtonLabel: 'Załaduj dane'
  },
  WfsParserInput: {
    requestButtonText: 'Poproś o dane',
    urlLabel: 'Url',
    versionLabel: 'Wersja',
    typeNameLabel: 'Nazwa typu cechy',
    featureIDLabel: 'ID cechy',
    propertyNameLabel: 'Nazwa właściwości',
    maxFeaturesLabel: 'Maksymalna liczba cech',
    fetchParamsLabel: 'Parametry pobierania',
    srsNameLabel: 'Nazwa SRS'
  },
  ParserFeedback: {
    notSupported: 'nie jest wspierany przez używany parser',
    partiallySupported: 'jest częściowo wspierany przez używany parser'
  },
  WellKnownNameEditor: {
    fillColorLabel: 'Kolor wypełnienia',
    fillOpacityLabel: 'Przezroczystość wypełnienia',
    offsetXLabel: 'Przesunięcie X',
    offsetYLabel: 'Przesunięcie Y',
    opacityLabel: 'Przezroczystość',
    radiusLabel: 'Promień',
    rotateLabel: 'Obrót',
    strokeColorLabel: 'Kolor obrysu',
    strokeOpacityLabel: 'Przezroczystość obrysu',
    strokeWidthLabel: 'Grubość obrysu'
  },
  FillEditor: {
    opacityLabel: 'Przezroczystość',
    fillOpacityLabel: 'Przezroczystość wypełnienia',
    outlineOpacityLabel: 'Przezroczystość obrysu',
    fillColorLabel: 'Kolor wypełnienia',
    outlineColorLabel: 'Kolor obrysu',
    outlineWidthLabel: 'Szerokość obrysu',
    outlineDasharrayLabel: 'Wzór kreskowania obrysu',
    graphicFillTypeLabel: 'Typ graficznego wypełnienia',
    visibilityLabel: 'Widoczność',
    generalSectionLabel: 'Ogólne',
    graphicFillSectionLabel: 'Graficzne wypełnienie'
  },
  IconEditor: {
    iconTooltipLabel: 'Otwórz galerię',
    iconSpriteTooltipLabel: 'Użyj sprite’a',
    imageLabel: 'Źródło',
    imagePlaceholder: 'URL do ikony',
    offsetXLabel: 'Przesunięcie X',
    offsetYLabel: 'Przesunięcie Y',
    opacityLabel: 'Przezroczystość',
    rotateLabel: 'Obrót',
    sizeLabel: 'Rozmiar',
    visibilityLabel: 'Widoczność'
  },
  LineEditor: {
    capLabel: 'Zakończenie',
    colorLabel: 'Kolor',
    dashLabel: 'Wzór kreskowania',
    dashOffsetLabel: 'Przesunięcie wzoru kreskowania',
    graphicFillTypeLabel: 'Typ graficznego wypełnienia',
    graphicStrokeTypeLabel: 'Typ graficznego obrysu',
    joinLabel: 'Łączenie',
    opacityLabel: 'Przezroczystość',
    perpendicularOffsetLabel: 'Prostopadłe przesunięcie',
    widthLabel: 'Szerokość',
    visibilityLabel: 'Widoczność',
    generalSectionLabel: 'Ogólne',
    graphicStrokeSectionLabel: 'Graficzny obrys',
    graphicFillSectionLabel: 'Graficzne wypełnienie'
  },
  MarkEditor: {
    wellKnownNameFieldLabel: 'Symbol',
    visibilityLabel: 'Widoczność'
  },
  TextEditor: {
    fontLabel: 'Czcionka',
    templateFieldLabel: 'Szablon tekstu',
    opacityLabel: 'Przezroczystość',
    colorLabel: 'Kolor tekstu',
    sizeLabel: 'Rozmiar tekstu',
    offsetXLabel: 'Przesunięcie X',
    offsetYLabel: 'Przesunięcie Y',
    attributeComboPlaceholder: 'Wybierz pole',
    rotateLabel: 'Obrót',
    haloColorLabel: 'Kolor halo',
    haloWidthLabel: 'Szerokość halo',
    attributeNotFound: 'Atrybut nie znaleziony',
    visibilityLabel: 'Widoczność',
    placementLabel: 'Umiejscowienie',
    repeatLabel: 'Powtórz'
  },
  PropTextEditor: {
    propFieldLabel: 'Pole',
    opacityLabel: 'Przezroczystość',
    colorLabel: 'Kolor tekstu',
    sizeLabel: 'Rozmiar tekstu',
    offsetXLabel: 'Przesunięcie X',
    offsetYLabel: 'Przesunięcie Y',
    attributeComboPlaceholder: 'Wybierz pole',
    rotateLabel: 'Obrót',
    fontLabel: 'Czcionka',
    haloColorLabel: 'Kolor halo',
    haloWidthLabel: 'Szerokość halo'
  },
  RasterEditor: {
    opacityLabel: 'Przezroczystość',
    hueRotateLabel: 'Obrót odcienia',
    brightnessMinLabel: 'Min. jasność',
    brightnessMaxLabel: 'Max. jasność',
    saturationLabel: 'Nasycenie',
    contrastLabel: 'Kontrast',
    fadeDurationLabel: 'Czas zanikania',
    resamplingLabel: 'Resampling',
    contrastEnhancementLabel: 'Wzmocnienie kontrastu',
    gammaValueLabel: 'Gamma',
    colorMapLabel: 'Ustawienia koloru',
    symbolizerLabel: 'Symbolizacja',
    channelSelectionLabel: 'Wybór kanału',
    visibilityLabel: 'Widoczność'
  },
  RasterChannelEditor: {
    channelSelectionLabel: 'Edytuj kanały',
    redBandLabel: 'Czerwony',
    greenBandLabel: 'Zielony',
    blueBandLabel: 'Niebieski',
    grayBandLabel: 'Szary',
    channelSelectionGrayLabel: 'Skala szarości',
    channelSelectionRgbLabel: 'RGB',
    titleLabel: 'Wybór kanału'
  },
  ColorMapEditor: {
    typeLabel: 'Typ',
    extendedLabel: 'Głębia koloru',
    titleLabel: 'Ustawienia koloru',
    nrOfClassesLabel: 'Liczba klas',
    colorRampLabel: 'Gradient kolorów',
    colorMapEntriesLabel: 'Wpisy ColorMap',
    colorLabel: 'Kolor',
    quantityLabel: 'Wartość',
    labelLabel: 'Etykieta',
    opacityLabel: 'Przezroczystość'
  },
  PreviewMap: {
    errorTitle: 'Nieprawidłowy styl geostyler',
    couldNotGetDataProjection: 'Nie można określić projekcji danych',
    couldNotCreateSampleGeometries: 'Nie można utworzyć przykładowych geometrii'
  },
  ColorField: {
    chooseText: 'Wybierz'
  },
  KindField: {
    symbolizerKinds: {
      Mark: 'Symbol punktowy',
      Fill: 'Wypełnienie',
      Icon: 'Plik graficzny',
      Line: 'Linia',
      Text: 'Tekst',
      Raster: 'Raster'
    }
  },
  ScaleDenominator: {
    minScaleDenominatorLabelText: 'Minimalna skala',
    maxScaleDenominatorLabelText: 'Maksymalna skala',
    minScaleDenominatorPlaceholderText: 'Wprowadź minimalną skalę (opcjonalnie)',
    maxScaleDenominatorPlaceholderText: 'Wprowadź maksymalną skalę (opcjonalnie)'
  },
  WellKnownNameField: {
    wellKnownNames: {
      circle: 'Koło',
      square: 'Kwadrat',
      triangle: 'Trójkąt',
      star: 'Gwiazda',
      cross: 'Krzyż',
      x: 'X'
    }
  },
  ColorMapEntryField: {
    colorLabel: 'Kolor',
    labelLabel: 'Etykieta legendy',
    quantityLabel: 'Wartość',
    opacityLabel: 'Przezroczystość'
  },
  ChannelField: {
    sourceChannelNameLabel: 'Nazwa pasma',
    contrastEnhancementTypeLabel: 'Wzmocnienie kontrastu',
    gammaValueLabel: 'Gamma'
  },
  ColorMapTypeField: {
    rampMapTypeLabel: 'Interpolowany',
    intervalsMapTypeLabel: 'Interwały',
    valuesMapTypeLabel: 'Pojedyncze wartości'
  },
  GraphicTypeField: {
    Mark: 'Symbol punktowy',
    Icon: 'Plik graficzny'
  },
  RgbChannelField: {
    redLabel: 'Czerwone pasmo',
    greenLabel: 'Zielone pasmo',
    blueLabel: 'Niebieskie pasmo'
  },
  GrayChannelField: {
    grayLabel: 'Szare pasmo'
  },
  SymbolizerEditorWindow: {
    symbolizersEditor: 'Edytor symbolizacji',
    cancelButtonLabel: 'Anuluj',
    saveButtonLabel: 'Zastosuj'
  },
  FilterOverview: {
    filterTitle: 'Filtry'
  },
  FilterEditorWindow: {
    filterEditor: 'Edytor filtra',
    cancelButtonLabel: 'Anuluj',
    saveButtonLabel: 'Zapisz'
  },
  MultiEditor: {
    add: 'Dodaj',
    remove: 'Usuń'
  },
  UploadButton: {
    upload: 'Prześlij'
  },
  FilterTree: {
    andDrpdwnLabel: 'Filtr I',
    orDrpdwnLabel: 'Filtr LUB',
    notDrpdwnLabel: 'Filtr NIE',
    comparisonDrpdwnLabel: 'Filtr porównania',
    addFilterLabel: 'Dodaj filtr',
    changeFilterLabel: 'Zmień filtr',
    removeFilterLabel: 'Usuń filtr',
    andFilterText: 'I',
    orFilterText: 'LUB',
    notFilterText: 'NIE'
  },
  RuleTable: {
    symbolizersColumnTitle: 'Symbolizatory',
    nameColumnTitle: 'Nazwa',
    filterColumnTitle: 'Filtr',
    minScaleColumnTitle: 'Min. skala',
    maxScaleColumnTitle: 'Maks. skala',
    scalesColumnTitle: 'Skale',
    errorMaxScaleGreaterThanMinScale: 'Maksymalna skala musi być większa niż minimalna',
    amountColumnTitle: 'Ilość',
    duplicatesColumnTitle: 'Duplikaty',
    actionsColumnTitle: 'Akcje',
    actionCloneLabel: 'Duplikuj',
    actionRemoveLabel: 'Usuń'
  },
  Rules: {
    rulesTitle: 'Reguły',
    multiEdit: 'Wybierz',
    addRule: 'Dodaj',
    classification: 'Klasyfikacja',
    remove: 'Usuń',
    clone: 'Dublikuj',
    edit: 'Edytuj',
    defaultRuleTitle: 'Bez nazwy'
  },
  RuleReorderButtons: {
    ruleMoveUpTip: 'Przesuń regułę o jedno miejsce w górę',
    ruleMoveDownTip: 'Przesuń regułę o jedno miejsce w dół'
  },
  RuleGenerator: {
    attribute: 'Atrybut',
    generateButtonText: 'Klasyfikuj',
    levelOfMeasurement: 'Poziom pomiaru',
    nominal: 'Nominalny',
    ordinal: 'Porządkowy',
    cardinal: 'Liczbowy',
    numberOfRules: 'Liczba klas',
    colorRamp: 'Skala kolorów',
    colorSpace: 'Przestrzeń kolorów',
    colorRampPlaceholder: 'Wybierz…',
    colorRampMinClassesWarningPre: 'Skala kolorów wymaga co najmniej',
    colorRampMinClassesWarningPost: 'klas',
    symbolizer: 'Symbolizator',
    classification: 'Metoda klasyfikacji',
    classificationPlaceholder: 'Wybierz…',
    equalInterval: 'Równe przedziały',
    preview: 'Podgląd kolorów',
    numberOfRulesViaKmeans: '…dotyczy klasyfikacji k-średnich.',
    allDistinctValues: 'Użyj wszystkich unikalnych wartości'
  },
  ColorRampCombo: {
    colorRampPlaceholder: 'Wybierz…'
  },
  ColorSpaceCombo: {
    colorSpacePlaceholder: 'Wybierz…'
  },
  ClassificationCombo: {
    equalInterval: 'Równe przedziały',
    quantile: 'Kwantyle',
    logarithmic: 'Logarytmiczna',
    kmeans: 'k-średnich'
  },
  RuleGeneratorWindow: {
    ruleGenerator: 'Klasyfikacja'
  },
  IconSelectorWindow: {
    windowLabel: 'Wybierz ikonę'
  },
  IconSelector: {
    librarySelectLabel: 'Wybierz bibliotekę'
  },
  SLDUnitsSelect: {
    symbolizerUnitsLabel: 'Jednostki symbolizatora',
    symbolizerUnitsPixel: 'piksel',
    symbolizerUnitsMeter: 'metr',
    symbolizerUnitsFoot: 'stopa'
  },
  AttributeCombo: {
    label: 'Atrybut',
    placeholder: 'Wybierz atrybut',
    help: 'Proszę wybrać atrybut.'
  },
  TextFilterField: {
    label: 'Wartość',
    placeholder: 'Wprowadź tekst',
    help: 'Proszę wprowadzić tekst.'
  },
  NumberFilterField: {
    label: 'Wartość',
    placeholder: 'Wprowadź liczbę',
    help: 'Proszę wprowadzić liczbę.'
  },
  BoolFilterField: {
    label: 'Wartość'
  },
  LineCapField: {
    lineCapOptions: {
      butt: 'Prosty',
      round: 'Zaokrąglony',
      square: 'Kwadratowy'
    }
  },
  LineJoinField: {
    lineJoinOptions: {
      bevel: 'Ścięty',
      round: 'Zaokrąglony',
      miter: 'Ostry'
    }
  },
  PlacementField: {
    placementOptions: {
      point: 'Punkt',
      line: 'Linia',
      'line-center': 'Środek linii'
    }
  },
  ImageField: {
    sprite: {
      x: 'X',
      y: 'Y',
      height: 'Wysokość',
      width: 'Szerokość'
    }
  },
  UnsupportedPropertiesUtil: {
    notSupported: 'Nieobsługiwane przez wybrany parser.',
    partiallySupported: 'Częściowo obsługiwane przez wybrany parser.'
  },
  FunctionNameCombo: {
    placeholder: '… wybierz GeoStylerFunction'
  },
  VisibilityField: {
    on: 'włączone',
    off: 'wyłączone'
  },
  UnknownInput: {
    typeSelectToolip: 'Wybierz typ wejścia'
  },
  FunctionUI: {
    add: 'dodaj',
    remove: 'usuń'
  },
  Renderer: {
    placeholderInfo: 'To jest symbol zastępczy, ponieważ symbolizator zawiera funkcje i nie można go wyświetlić.'
  },
  ...antd_pl_PL
};

export default pl_PL;
