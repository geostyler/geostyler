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
import antd_es_ES from 'antd/lib/locale/es_ES';
import type GeoStylerLocale from './locale';

const es_ES: GeoStylerLocale = {
  RgbChannelField: {
    redLabel: 'TODO(es_ES):Red band',
    greenLabel: 'TODO(es_ES):Green band',
    blueLabel: 'TODO(es_ES):Blue band'
  },
  GrayChannelField: {
    grayLabel: 'TODO(es_ES):Gray band'
  },
  ColorMapEntryField: {
    colorLabel: 'TODO(es_ES):Color',
    labelLabel: 'TODO(es_ES):Legend Label',
    quantityLabel: 'TODO(es_ES):Quantity',
    opacityLabel: 'TODO(es_ES):Opacity'
  },
  ChannelField: {
    sourceChannelNameLabel: 'TODO(es_ES):Channel Name',
    contrastEnhancementTypeLabel: 'TODO(es_ES):Contrast Enhancement',
    gammaValueLabel: 'TODO(es_ES):Gamma'
  },
  ColorMapTypeField: {
    rampMapTypeLabel: 'TODO(es_ES):Interpolated',
    intervalsMapTypeLabel: 'TODO(es_ES):Intervals',
    valuesMapTypeLabel: 'TODO(es_ES):Values'
  },
  RasterEditor: {
    opacityLabel: 'TODO(es_ES):Opacity',
    hueRotateLabel: 'TODO(es_ES):Hue Rotation',
    brightnessMinLabel: 'TODO(es_ES):Min. Brightness',
    brightnessMaxLabel: 'TODO(es_ES):Max. Brightness',
    saturationLabel: 'TODO(es_ES):Saturation',
    contrastLabel: 'TODO(es_ES):Contrast',
    fadeDurationLabel: 'TODO(es_ES):Fade Duration',
    resamplingLabel: 'TODO(es_ES):Resampling',
    contrastEnhancementLabel: 'TODO(es_ES):Contrast Enhancement',
    gammaValueLabel: 'TODO(es_ES):Gamma',
    colorMapLabel: 'TODO(es_ES):Color Map',
    symbolizerLabel: 'TODO(es_ES):Symbolizer',
    channelSelectionLabel: 'TODO(es_ES):Channel Selection'
  },
  RasterChannelEditor: {
    channelSelectionLabel: 'TODO(es_ES):Edit Channels',
    redBandLabel: 'TODO(es_ES):Red',
    greenBandLabel: 'TODO(es_ES):Green',
    blueBandLabel: 'TODO(es_ES):Blue',
    grayBandLabel: 'TODO(es_ES):Gray',
    channelSelectionGrayLabel: 'TODO(es_ES):Gray',
    channelSelectionRgbLabel: 'TODO(es_ES):RGB',
    titleLabel: 'TODO(es_ES):Channel Selection'
  },
  ColorMapEditor: {
    typeLabel: 'TODO(es_ES):Type',
    extendedLabel: 'TODO(es_ES):Color Depth',
    colorMapEntriesLabel: 'TODO(es_ES):Colormap',
    titleLabel: 'TODO(es_ES):Color Map',
    nrOfClassesLabel: 'TODO(es_ES):Nr. of classes',
    colorRampLabel: 'TODO(es_ES):Color Ramp',
    colorLabel: 'TODO(es_ES):Color',
    quantityLabel: 'TODO(es_ES):Quantity',
    labelLabel: 'TODO(es_ES):Label',
    opacityLabel: 'TODO(es_ES):Opacity'
  },
  StyleFieldContainer: {
    nameFieldLabel: 'TODO(es_ES):Name',
    nameFieldPlaceholder: 'TODO(es_ES):Enter name',
    titleFieldLabel: 'TODO(es_ES):Title',
    titleFieldPlaceholder: 'TODO(es_ES):Enter title'
  },
  Editor: {
    kindFieldLabel: 'TODO(es_ES):Kind'
  },
  RuleFieldContainer: {
    nameFieldLabel: 'TODO(es_ES):Name',
    nameFieldPlaceholder: 'TODO(es_ES):Enter name'
  },
  BulkEditModals: {
    colorLabel: 'Seleccionar color',
    radiusLabel: 'Seleccionar radio',
    opacityLabel: 'Seleccionar transparencia',
    symbolLabel: 'Seleccionar simbolo',
    imageFieldLabel: 'Fuente',
    imageFieldTooltipLabel: 'Abrir galería'
  },
  BulkEditor: {
    colorLabel: 'Seleccionar color',
    radiusLabel: 'Seleccionar radio',
    opacityLabel: 'Seleccionar transparencia',
    symbolLabel: 'Seleccionar simbolo',
    imageFieldLabel: 'Fuente'
  },
  Rule: {
    removeRuleBtnText: 'Eliminar regla',
    scaleFieldTitle: 'Usar escala',
    filterFieldTitle: 'Usar filtro',
    nameFieldLabel: 'Nombre',
    nameFieldPlaceholder: 'Ingrese nombre',
    attributeLabel: 'TODO(es_ES):Attribute',
    attributePlaceholderString: 'TODO(es_ES):Choose attribute',
    attributeValidationHelpString: 'TODO(es_ES):Please choose an attribute',
    operatorLabel: 'TODO(es_ES):Operator',
    operatorPlaceholderString: 'TODO(es_ES):Choose operator',
    operatorValidationHelpString: 'TODO(es_ES):Please choose an operator',
    valueLabel: 'TODO(es_ES):Value',
    valuePlaceholder: 'TODO(es_ES):Enter value',
    valueValidationHelpString: 'TODO(es_ES):Please enter a value'
  },
  Style: {
    addRuleBtnText: 'Añadir regla',
    cloneRulesBtnText: 'Duplicar reglas',
    removeRulesBtnText: 'Eliminar reglas',
    nameFieldLabel: 'Nombre',
    nameFieldPlaceholder: 'Ingrese nombre',
    colorLabel: 'Seleccionar color',
    radiusLabel: 'Seleccionar radio',
    opacityLabel: 'Seleccionar transparencia',
    symbolLabel: 'Seleccionar simbolo',
    multiEditLabel: 'Editor múltiple',
    ruleGeneratorWindowBtnText: 'Clasificación',
    titleFieldLabel: 'TODO(es_ES):Title',
    titleFieldPlaceholder: 'TODO(es_ES):Enter Title'
  },
  CardStyle: {
    styleTitle: 'Estilo',
    classificationTitle: 'Clasificación',
    multiEditTitle: 'Editor múltiple',
    symbolizerTitle: 'Simbolización',
    filterTitle: 'Filtros',
    iconLibrariesTitle: 'Galería'
  },
  StyleOverview: {
    styleTitle: 'Estilo'
  },
  RuleOverview: {
    ruleTitle: 'Regla'
  },
  Symbolizers: {
    symbolizersTitle: 'TODO(es_ES):Symbolizers',
    addSymbolizer: 'TODO(es_ES):Add symbolizer',
    showAll: 'TODO(es_ES):Show all',
    hide: 'TODO(es_ES):Hide'
  },
  StyleLoader: {
    label: 'Leer estilo: ',
    uploadButtonLabel: 'Cargar estilo'
  },
  DataLoader: {
    label: 'Leer datos: ',
    uploadButtonLabel: 'Cargar datos'
  },
  WfsParserInput: {
    requestButtonText: 'Obtener datos',
    urlLabel: 'Url',
    versionLabel: 'Versión',
    typeNameLabel: 'FeatureTypeName',
    featureIDLabel: 'FeatureID',
    propertyNameLabel: 'PropertyName',
    maxFeaturesLabel: 'MaxFeatures',
    fetchParamsLabel: 'fetchParams',
    srsNameLabel: 'SrsName'
  },
  CodeEditor: {
    downloadButtonLabel: 'Guardar archivo',
    copyButtonLabel: 'Copiar al portapapeles',
    formatSelectLabel: 'Formato',
    styleCopied: 'Estilo copiado al portapapales!',
    writeFeedback: 'Retroalimentación al escribir con',
    readFeedback: 'Retroalimentación mientras se lee con'
  },
  ParserFeedback: {
    notSupported: 'no es compatible con el analizador sintáctico utilizado',
    partiallySupported: 'sólo es parcialmente soportado por el parser utilizado'
  },
  WellKnownNameEditor: {
    fillColorLabel: 'Fondo-Color',
    fillOpacityLabel: 'Relleno-Transparencia',
    offsetXLabel: 'Desplazamiento X',
    offsetYLabel: 'Desplazamiento Y',
    opacityLabel: 'Transparencia',
    radiusLabel: 'Radio',
    rotateLabel: 'Rotación',
    strokeColorLabel: 'Trazo-Color',
    strokeOpacityLabel: 'Trazo-Transparencia',
    strokeWidthLabel: 'Trazo-Ancho',
  },
  FillEditor: {
    fillOpacityLabel: 'Relleno-Transparencia',
    outlineOpacityLabel: 'Trazo-Transparencia',
    opacityLabel: 'Transparencia',
    fillColorLabel: 'Relleno-Color',
    outlineColorLabel: 'Contorno-Color',
    outlineWidthLabel: 'Contorno-Ancho',
    outlineDasharrayLabel: 'Outline-Dasharray',
    graphicFillTypeLabel: 'Tipo gráfico de relleno'
  },
  IconEditor: {
    iconTooltipLabel: 'Abrir galería',
    imageLabel: 'Fuente',
    imagePlaceholder: 'URL a Icono',
    offsetXLabel: 'Desplazamiento X',
    offsetYLabel: 'Desplazamiento Y',
    opacityLabel: 'Transparencia',
    rotateLabel: 'Rotación',
    sizeLabel: 'Tamaño',
  },
  LineEditor: {
    capLabel: 'Cap',
    colorLabel: 'Color',
    dashLabel: 'Patrón de achurado',
    dashOffsetLabel: 'Dash Offset',
    graphicFillTypeLabel: 'Tipo de gráfico de relleno',
    graphicStrokeTypeLabel: 'Tipo de gráfico de trazado',
    joinLabel: 'Join',
    opacityLabel: 'Transparencia',
    perpendicularOffsetLabel: 'Perpendicular Offset',
    widthLabel: 'Ancho',
  },
  MarkEditor: {
    wellKnownNameFieldLabel: 'Simbolo'
  },
  TextEditor: {
    fontLabel: 'Fuente',
    templateFieldLabel: 'Plantilla',
    opacityLabel: 'Texto-Transparencia',
    colorLabel: 'Texto-Color',
    sizeLabel: 'Texto-Tamaño',
    offsetXLabel: 'Desplazamiento X',
    offsetYLabel: 'Desplazamiento Y',
    attributeComboPlaceholder: 'Seleccionar campo',
    rotateLabel: 'Rotación',
    haloColorLabel: 'Halo-Color',
    haloWidthLabel: 'Halo-Ancho',
    attributeNotFound: 'Campo no encontrado'
  },
  PropTextEditor: {
    propFieldLabel: 'Campo',
    opacityLabel: 'Texto-Transparencia',
    fontLabel: 'TODO(es_ES):Font',
    colorLabel: 'Texto-Color',
    sizeLabel: 'Texto-Tamaño',
    offsetXLabel: 'Desplazamiento X',
    offsetYLabel: 'Desplazamiento Y',
    attributeComboPlaceholder: 'Seleccionar campo',
    rotateLabel: 'Rotación',
    haloColorLabel: 'Halo-Color',
    haloWidthLabel: 'Halo-Width'
  },
  Preview: {
    openEditorText: 'Editor de simbología',
    closeEditorText: 'Cerrar editor'
  },
  ColorField: {
    clearText: 'TODO(es_ES):Clear',
    closeText: 'Cerrar',
    editText: 'Cambiar',
    chooseText: 'Elegir',
  },
  KindField: {
    symbolizerKinds: {
      Mark: 'Marcador',
      Fill: 'Relleno',
      Icon: 'Icono',
      Line: 'Línea',
      Text: 'Texto',
      Raster: 'TODO(es_ES):Raster'
    }
  },
  GraphicTypeField: {
    Mark: 'Marcador',
    Icon: 'Icono'
  },
  ScaleDenominator: {
    minScaleDenominatorLabelText: 'Escala Min.',
    maxScaleDenominatorLabelText: 'Escala Max.',
    minScaleDenominatorPlaceholderText: 'Ingrese escala min. (Opcional)',
    maxScaleDenominatorPlaceholderText: 'Ingrese escala max. (Opcionar)'
  },
  WellKnownNameField: {
    wellKnownNames: {
      Circle: 'Círculo',
      Square: 'Cuadrado',
      Triangle: 'Triangulo',
      Star: 'Estrella',
      Cross: 'Cruz',
      X: 'X'
    }
  },
  SymbolizerEditor: {
    kindFieldLabel: 'Tipo',
    unknownSymbolizerText: 'TODO(es_ES):Symbolizer unknown!',
    visibilityFieldLabel: 'Visibilidad',
  },
  SymbolizerEditorWindow: {
    symbolizersEditor: 'Editor de simbología'
  },
  FilterOverview: {
    filterTitle: 'Filtros'
  },
  FilterEditorWindow: {
    filterEditor: 'Editor de filtro'
  },
  MultiEditor: {
    add: 'Añadir',
    remove: 'Eliminar'
  },
  UploadButton: {
    upload: 'Cargar'
  },
  FilterTree: {
    andDrpdwnLabel: 'AND-Filtro',
    orDrpdwnLabel: 'OR-Filtro',
    notDrpdwnLabel: 'NOT-Filtro',
    comparisonDrpdwnLabel: 'Comparación-Filtro',
    addFilterLabel: 'Añadir filtro',
    changeFilterLabel: 'Cambiar filtro',
    removeFilterLabel: 'Eliminar filtro',
    andFilterText: 'AND',
    orFilterText: 'OR',
    notFilterText: 'NOT'
  },
  RuleTable: {
    symbolizersColumnTitle: 'Simbolizador',
    nameColumnTitle: 'Nombre',
    filterColumnTitle: 'Filtro',
    minScaleColumnTitle: 'Escala Min.',
    maxScaleColumnTitle: 'Escala Max.',
    amountColumnTitle: 'Cantidad',
    duplicatesColumnTitle: 'Duplicados'
  },
  Rules: {
    rulesTitle: 'Reglas',
    multiEdit: 'Seleccionar',
    addRule: 'Añadir',
    classification: 'Clasificación',
    remove: 'Eliminar',
    clone: 'Duplicar',
    edit: 'Cambiar',
    defaultRuleTitle: 'Sin título'
  },
  RuleReorderButtons: {
    ruleMoveUpTip: 'Mueve la regla una posición arriba',
    ruleMoveDownTip: 'Mueve la regla una posición hacia abajo'
  },
  RuleGenerator: {
    attribute: 'Atributo',
    generateButtonText: 'Clasificar',
    levelOfMeasurement: 'Nivel de medida',
    nominal: 'Nominal',
    ordinal: 'Ordinal',
    cardinal: 'Cardinal',
    numberOfRules: 'Número de clases',
    colorRamp: 'Rampa de color',
    colorSpace: 'Espacio de color',
    colorRampPlaceholder: 'Seleccionar…',
    colorRampMinClassesWarningPre: 'La rampa de color requiere al menos',
    colorRampMinClassesWarningPost: 'clases',
    symbolizer: 'Simbolizador',
    classification: 'Método de clasificación',
    classificationPlaceholder: 'Seleccionar…',
    preview: 'Avance de color',
    numberOfRulesViaKmeans: '…afectados por la clasificación k-Means.',
    allDistinctValues: 'Utilizar todos los valores distintos',
    equalInterval: 'TODO(es_ES):Equal Interval',
  },
  ColorRampCombo: {
    colorRampPlaceholder: 'Seleccionar…'
  },
  ColorSpaceCombo: {
    colorSpacePlaceholder: 'Seleccionar…'
  },
  ClassificationCombo: {
    equalInterval: 'Equal Interval',
    quantile: 'Quantile ',
    logarithmic: 'Logarithmic',
    kmeans: 'k-Means'
  },
  RuleGeneratorWindow: {
    ruleGenerator: 'Clasificación'
  },
  IconSelectorWindow: {
    windowLabel: 'Seleccionar icono'
  },
  IconSelector: {
    librarySelectLabel: 'Seleccionar biblioteca'
  },
  SLDUnitsSelect: {
    symbolizerUnitsLabel: 'Unidades simbolizadoras',
    symbolizerUnitsPixel: 'Pixel',
    symbolizerUnitsMeter: 'Metro',
    symbolizerUnitsFoot: 'Escándalo'
  },
  AttributeCombo: {
    label: 'Atributo',
    placeholder: 'Seleccionar atributo',
    help: 'Seleccione un atributo'
  },
  TextFilterField: {
    label: 'Valor',
    placeholder: 'Introducir valor de texto',
    help: 'Introduzca un texto.'
  },
  NumberFilterField: {
    label: 'Valor',
    placeholder: 'Introducir valor numérico',
    help: 'Introduzca un número'
  },
  BoolFilterField: {
    label: 'Valor'
  },
  UnsupportedPropertiesUtil: {
    notSupported: 'TODO(es_ES):Not supported by selected parser.',
    partiallySupported: 'TODO(es_ES):Only partially supported by selected parser.'
  },
  FunctionNameCombo: {
    placeholder: '… elija GeoStylerFunction'
  },
  ...antd_es_ES
};

export default es_ES;
