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
import antd_es_ES from 'antd/lib/locale-provider/es_ES';
import { GeoStylerLocale } from './locale';

const es_ES: GeoStylerLocale = {
  RgbChannelField: {
    redLabel: 'es_ES:Red band',
    greenLabel: 'es_ES:Green band',
    blueLabel: 'es_ES:Blue band'
  },
  GrayChannelField: {
    grayLabel: 'es_ES:Gray band'
  },
  ColorMapEntryField: {
    colorLabel: 'es_ES:Color',
    labelLabel: 'es_ES:Legend Label',
    quantityLabel: 'es_ES:Quantity',
    opacityLabel: 'es_ES:Opacity'
  },
  ChannelField: {
    sourceChannelNameLabel: 'es_ES:Channel Name',
    contrastEnhancementTypeLabel: 'es_ES:Contrast Enhancement',
    gammaValueLabel: 'es_ES:Gamma'
  },
  ColorMapTypeField: {
    rampMapTypeLabel: 'es_ES:Interpolated',
    intervalsMapTypeLabel: 'es_ES:Intervals',
    valuesMapTypeLabel: 'es_ES:Values'
  },
  RasterEditor: {
    opacityLabel: 'es_ES:Opacity',
    hueRotateLabel: 'es_ES:Hue Rotation',
    brightnessMinLabel: 'es_ES:Min. Brightness',
    brightnessMaxLabel: 'es_ES:Max. Brightness',
    saturationLabel: 'es_ES:Saturation',
    contrastLabel: 'es_ES:Contrast',
    fadeDurationLabel: 'es_ES:Fade Duration',
    resamplingLabel: 'es_ES:Resampling',
    contrastEnhancementLabel: 'es_ES:Contrast Enhancement',
    gammaValueLabel: 'es_ES:Gamma',
    colorMapLabel: 'es_ES:Color Map',
    symbolizerLabel: 'es_ES:Symbolizer',
    channelSelectionLabel: 'es_ES:Channel Selection'
  },
  RasterChannelEditor: {
    channelSelectionLabel: 'es_ES:Edit Channels',
    redBandLabel: 'es_ES:Red',
    greenBandLabel: 'es_ES:Green',
    blueBandLabel: 'es_ES:Blue',
    grayBandLabel: 'es_ES:Gray',
    channelSelectionGrayLabel: 'es_ES:Gray',
    channelSelectionRgbLabel: 'es_ES:RGB',
    titleLabel: 'es_ES:Channel Selection'
  },
  ColorMapEditor: {
    typeLabel: 'es_ES:Type',
    extendedLabel: 'es_ES:Color Depth',
    colorMapEntriesLabel: 'es_ES:Colormap',
    titleLabel: 'es_ES:Color Map',
    nrOfClassesLabel: 'es_ES:Nr. of classes',
    colorRampLabel: 'es_ES:Color Ramp',
    colorLabel: 'es_ES:Color',
    quantityLabel: 'es_ES:Quantity',
    labelLabel: 'es_ES:Label',
    opacityLabel: 'es_ES:Opacity'
  },
  StyleFieldContainer: {
    nameFieldLabel: 'es_ES:Name',
    nameFieldPlaceholder: 'es_ES:Enter name',
    titleFieldLabel: 'es_ES:Title',
    titleFieldPlaceholder: 'es_ES:Enter title'
  },
  Editor: {
    kindFieldLabel: 'es_ES:Kind'
  },
  RuleFieldContainer: {
    nameFieldLabel: 'es_ES:Name',
    nameFieldPlaceholder: 'es_ES:Enter name'
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
    attributeLabel: 'es_ES:Attribute',
    attributePlaceholderString: 'es_ES:Choose attribute',
    attributeValidationHelpString: 'es_ES:Please choose an attribute',
    operatorLabel: 'es_ES:Operator',
    operatorPlaceholderString: 'es_ES:Choose operator',
    operatorValidationHelpString: 'es_ES:Please choose an operator',
    valueLabel: 'es_ES:Value',
    valuePlaceholder: 'es_ES:Enter value',
    valueValidationHelpString: 'es_ES:Please enter a value'
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
    titleFieldLabel: 'es_ES:Title',
    titleFieldPlaceholder: 'es_ES:Enter Title'
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
    symbolizersTitle: 'es_ES:Symbolizers',
    addSymbolizer: 'es_ES:Add symbolizer',
    showAll: 'es_ES:Show all',
    hide: 'es_ES:Hide'
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
    fetchParamsLabel: 'fetchParams'
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
    radiusLabel: 'Radio',
    fillOpacityLabel: 'Relleno-Transparencia',
    fillColorLabel: 'Fondo-Color',
    opacityLabel: 'Transparencia',
    strokeColorLabel: 'Trazo-Color',
    strokeWidthLabel: 'Trazo-Ancho',
    strokeOpacityLabel: 'Trazo-Transparencia',
    rotateLabel: 'Rotación'
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
    imageLabel: 'Fuente',
    sizeLabel: 'Tamaño',
    rotateLabel: 'Rotación',
    opacityLabel: 'Transparencia',
    iconTooltipLabel: 'Abrir galería'
  },
  LineEditor: {
    colorLabel: 'Color',
    widthLabel: 'Ancho',
    opacityLabel: 'Transparencia',
    dashLabel: 'Patrón de achurado',
    dashOffsetLabel: 'Dash Offset',
    capLabel: 'Cap',
    joinLabel: 'Join',
    graphicStrokeTypeLabel: 'Tipo de gráfico de trazado',
    graphicFillTypeLabel: 'Tipo de gráfico de relleno'
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
    fontLabel: 'es_ES:Font',
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
      Raster: 'es_ES:Raster'
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
    kindFieldLabel: 'Tipo'
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
    equalInterval: 'es_ES:Equal Interval',
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
  ...antd_es_ES
};

export default es_ES;
