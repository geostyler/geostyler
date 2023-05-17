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
import antd_fr_FR from 'antd/lib/locale/fr_FR';
import type GeoStylerLocale from './locale';

const fr_FR: GeoStylerLocale = {
  StyleFieldContainer: {
    nameFieldLabel: 'Nom',
    nameFieldPlaceholder: 'Saisir un nom',
    titleFieldLabel: 'Titre',
    titleFieldPlaceholder: 'Saisir un titre'
  },
  Editor: {
    kindFieldLabel: 'Type'
  },
  RuleFieldContainer: {
    nameFieldLabel: 'Nom',
    nameFieldPlaceholder: 'Saisir un nom'
  },
  BulkEditor: {
    colorLabel: 'Sélectionner une couleur',
    radiusLabel: 'Sélectionner un rayon',
    opacityLabel: 'Sélectionner une opacité',
    symbolLabel: 'Sélectionner un symbole',
    imageFieldLabel: 'Source'
  },
  BulkEditModals: {
    colorLabel: 'Sélectionner une couleur',
    radiusLabel: 'Sélectionner un rayon',
    opacityLabel: 'Sélectionner une opacité',
    symbolLabel: 'Sélectionner un symbole',
    imageFieldLabel: 'Source',
    imageFieldTooltipLabel: 'Ouvrir la galerie'
  },
  Rule: {
    removeRuleBtnText: 'Supprimer une règle',
    scaleFieldTitle: 'Utiliser l\'échelle',
    filterFieldTitle: 'Utiliser le filtrage',
    nameFieldLabel: 'Nom',
    nameFieldPlaceholder: 'Donner un nom',
    attributeLabel: 'Attribut',
    attributePlaceholderString: 'Choisir un attribut',
    attributeValidationHelpString: 'Veuillez sélectionner un attribut',
    operatorLabel: 'Opérateur',
    operatorPlaceholderString: 'Choisir un opérateur',
    operatorValidationHelpString: 'Veuillez choisir un opérateur',
    valueLabel: 'Valeur',
    valuePlaceholder: 'Saisir une valeur',
    valueValidationHelpString: 'Veuillez choisir une valeur'
  },
  Style: {
    addRuleBtnText: 'Ajouter une règle',
    cloneRulesBtnText: 'Dupliquer les règles',
    removeRulesBtnText: 'Supprimer les règles',
    nameFieldLabel: 'Nom',
    nameFieldPlaceholder: 'Saisir un nom',
    titleFieldLabel: 'Titre',
    titleFieldPlaceholder: 'Saisir un titre',
    colorLabel: 'Sélectionner une couleur',
    radiusLabel: 'Sélectionner un rayon',
    opacityLabel: 'Sélectionner une opacité',
    symbolLabel: 'Sélectionner un symbole',
    multiEditLabel: 'Édition multiple',
    ruleGeneratorWindowBtnText: 'Classification'
  },
  CardStyle: {
    styleTitle: 'Style',
    classificationTitle: 'Classification',
    multiEditTitle: 'Édition multiple',
    symbolizerTitle: 'Symbolisation',
    filterTitle: 'Filtres',
    iconLibrariesTitle: 'Bibliothèque d\'icônes'
  },
  StyleOverview: {
    styleTitle: 'Style'
  },
  RuleOverview: {
    ruleTitle: 'Règle'
  },
  Symbolizers: {
    symbolizersTitle: 'Symbolisations',
    addSymbolizer: 'Ajouter une symbolisation',
    showAll: 'Tout montrer',
    hide: 'Masquer'
  },
  StyleLoader: {
    label: 'Charger un style : ',
    uploadButtonLabel: 'Charger un style'
  },
  DataLoader: {
    label: 'Charger des données : ',
    uploadButtonLabel: 'Charger des données'
  },
  WfsParserInput: {
    requestButtonText: 'Obtenir des données',
    urlLabel: 'Url',
    versionLabel: 'Version',
    typeNameLabel: 'FeatureTypeName',
    featureIDLabel: 'FeatureID',
    propertyNameLabel: 'PropertyName',
    maxFeaturesLabel: 'MaxFeatures',
    fetchParamsLabel: 'fetchParams',
    srsNameLabel: 'SrsName'
  },
  CodeEditor: {
    downloadButtonLabel: 'Sauvegarder',
    copyButtonLabel: 'Copier dans le presse-papier',
    formatSelectLabel: 'Format',
    styleCopied: 'Style copié dans le presse-papier!',
    writeFeedback: 'Erreurs et avertissements lors de l\'écriture avec',
    readFeedback: 'Erreurs et avertissements lors de la lecture avec'
  },
  ParserFeedback: {
    notSupported : 'n\'est pas supporté par l\'analyseur utilisé',
    partiallySupported : 'n\'est que partiellement supporté par l\'analyseur utilisé'
  },
  WellKnownNameEditor: {
    fillColorLabel: 'Couleur du remplissage',
    fillOpacityLabel: 'Opacité du remplissage',
    offsetXLabel: 'Décalage horizontal',
    offsetYLabel: 'Décalage vertical',
    opacityLabel: 'Opacité',
    radiusLabel: 'Rayon',
    rotateLabel: 'Rotation',
    strokeColorLabel: 'Couleur du contour',
    strokeOpacityLabel: 'Opacité du contour',
    strokeWidthLabel: 'Épaisseur du contour',
  },
  FillEditor: {
    opacityLabel: 'Opacité',
    fillOpacityLabel: 'Opacité du remplissage',
    outlineOpacityLabel: 'Opacité du contour',
    fillColorLabel: 'Couleur du remplissage',
    outlineColorLabel: 'Couleur du contour',
    outlineWidthLabel: 'Épaisseur du contour',
    outlineDasharrayLabel: 'Tireté ou pointillé du remplissage',
    graphicFillTypeLabel: 'Motif du remplissage'
  },
  IconEditor: {
    iconTooltipLabel: 'Ouvrir la galerie',
    imageLabel: 'Source',
    imagePlaceholder: 'URL de l\'icône',
    offsetXLabel: 'Décalage horizontal',
    offsetYLabel: 'Décalage vertical',
    opacityLabel: 'Opacité',
    rotateLabel: 'Rotation',
    sizeLabel: 'Taille',
  },
  MarkEditor: {
    wellKnownNameFieldLabel: 'Symbole'
  },
  LineEditor: {
    capLabel: 'Terminaison',
    colorLabel: 'Couleur',
    dashLabel: 'Motif de tireté',
    dashOffsetLabel: 'Décalage du tireté',
    graphicFillTypeLabel: 'Type de remplissage',
    graphicStrokeTypeLabel: 'Type de tracé',
    joinLabel: 'Jointure',
    opacityLabel: 'Opacité',
    perpendicularOffsetLabel: 'Décalage perpendiculaire',
    widthLabel: 'Épaisseur',
  },
  TextEditor: {
    fontLabel: 'Police',
    templateFieldLabel: 'Template',
    opacityLabel: 'Opacité du texte',
    colorLabel: 'Couleur du texte',
    sizeLabel: 'Taille du texte',
    offsetXLabel: 'Décalage horizontal',
    offsetYLabel: 'Décalage vertical',
    attributeComboPlaceholder: 'Sélectionner un champ',
    rotateLabel: 'Rotation',
    haloColorLabel: 'Couleur du halo',
    haloWidthLabel: 'Épaisseur du halo',
    attributeNotFound: 'Champ nom trouvé'
  },
  PropTextEditor: {
    propFieldLabel: 'Champ',
    opacityLabel: 'Opacité du texte',
    fontLabel: 'Police',
    colorLabel: 'Couleur du texte',
    sizeLabel: 'Taille du texte',
    offsetXLabel: 'Décalage horizontal',
    offsetYLabel: 'Décalage vertical',
    attributeComboPlaceholder: 'Sélectionner un champ',
    rotateLabel: 'Rotation',
    haloColorLabel: 'Couleur du halo',
    haloWidthLabel: 'Épaisseur du halo'
  },
  RasterEditor: {
    opacityLabel: 'Opacité',
    hueRotateLabel: 'Teinte',
    brightnessMinLabel: 'Luminosité minimum',
    brightnessMaxLabel: 'Luminosité maximum',
    saturationLabel: 'Saturation',
    contrastLabel: 'Contraste',
    fadeDurationLabel: 'Durée de disparition',
    resamplingLabel: 'Rééchantillonnage',
    contrastEnhancementLabel: 'Amélioration du contraste',
    gammaValueLabel: 'Transparence (Gamma)',
    colorMapLabel: 'Color Map',
    symbolizerLabel: 'Symbolisation',
    channelSelectionLabel: 'Sélection des canaux'
  },
  RasterChannelEditor: {
    channelSelectionLabel: 'Modifier les canaux',
    redBandLabel: 'Rouge',
    greenBandLabel: 'Vert',
    blueBandLabel: 'Bleu',
    grayBandLabel: 'Gris',
    channelSelectionGrayLabel: 'Gris',
    channelSelectionRgbLabel: 'RVB',
    titleLabel: 'Sélection des canaux'
  },
  ColorMapEditor: {
    typeLabel: 'Type',
    extendedLabel: 'Profondeur de couleur',
    colorMapEntriesLabel: 'Colormap',
    titleLabel: 'Color Map',
    nrOfClassesLabel: 'Nombre de classes',
    colorRampLabel: 'Palette de couleurs',
    colorLabel: 'Couleur',
    quantityLabel: 'Quantité',
    labelLabel: 'Étiquette',
    opacityLabel: 'Opacité'
  },
  Preview: {
    openEditorText: 'Modifier la symbolisation',
    closeEditorText: 'Fermer l\'éditeur'
  },
  ColorField: {
    clearText: 'Effacer',
    closeText: 'Fermer',
    editText: 'Modifier',
    chooseText: 'Choisir',
  },
  KindField: {
    symbolizerKinds: {
      Mark: 'Marqueur',
      Fill: 'Remplissage',
      Icon: 'Icône',
      Line: 'Ligne',
      Text: 'Texte',
      Raster: 'Image'
    }
  },
  GraphicTypeField: {
    Mark: 'Marqueur',
    Icon: 'Icône'
  },
  RgbChannelField: {
    redLabel: 'Canal rouge',
    greenLabel: 'Canal vert',
    blueLabel: 'Canal bleu'
  },
  GrayChannelField: {
    grayLabel: 'Canal gris'
  },
  ScaleDenominator: {
    minScaleDenominatorLabelText: 'Échelle minimum',
    maxScaleDenominatorLabelText: 'Échelle maximum',
    minScaleDenominatorPlaceholderText: 'Saisir une échelle minimum (Facultatif)',
    maxScaleDenominatorPlaceholderText: 'Saisir une échelle maximum (Facultatif)'
  },
  WellKnownNameField: {
    wellKnownNames: {
      Circle: 'Cercle',
      Square: 'Carré',
      Triangle: 'Triangle',
      Star: 'Etoile',
      Cross: 'Croix',
      X: 'X'
    }
  },
  ColorMapEntryField: {
    colorLabel: 'Couleur',
    labelLabel: 'Étiquette de légende',
    quantityLabel: 'Quantité',
    opacityLabel: 'Opacité'
  },
  ChannelField: {
    sourceChannelNameLabel: 'Nom du canal',
    contrastEnhancementTypeLabel: 'Amélioration du contraste',
    gammaValueLabel: 'Transparence (Gamma)'
  },
  ColorMapTypeField: {
    rampMapTypeLabel: 'Interpolé',
    intervalsMapTypeLabel: 'Intervalles',
    valuesMapTypeLabel: 'Valeurs'
  },
  SymbolizerEditor: {
    kindFieldLabel: 'Type',
    unknownSymbolizerText: 'Symbolisation inconnue !',
    visibilityFieldLabel: 'Visibilité'
  },
  SymbolizerEditorWindow: {
    symbolizersEditor: 'Éditeur de symbolisation'
  },
  FilterOverview: {
    filterTitle: 'Filters'
  },
  FilterEditorWindow: {
    filterEditor: 'Éditeur de filtre'
  },
  MultiEditor: {
    add: 'Ajouter',
    remove: 'Supprimer'
  },
  UploadButton: {
    upload: 'Téléverser'
  },
  FilterTree: {
    andDrpdwnLabel: 'Filtre ET',
    orDrpdwnLabel: 'Filtre OU',
    notDrpdwnLabel: 'Filtre NON',
    comparisonDrpdwnLabel: 'Filtre de comparaison',
    addFilterLabel: 'Ajouter un filtre',
    changeFilterLabel: 'Modifier un filtre',
    removeFilterLabel: 'Supprimer un filtre',
    andFilterText: 'ET',
    orFilterText: 'OU',
    notFilterText: 'NON'
  },
  RuleTable: {
    symbolizersColumnTitle: 'Symbolisations',
    nameColumnTitle: 'Nom',
    filterColumnTitle: 'Filtre',
    minScaleColumnTitle: 'Échelle minimum',
    maxScaleColumnTitle: 'Échelle maximum',
    amountColumnTitle: 'Nombre d\'objets concernés',
    duplicatesColumnTitle: 'Doublons'
  },
  Rules: {
    rulesTitle: 'Règles',
    multiEdit: 'Sélectionner',
    addRule: 'Ajouter',
    classification: 'Classification',
    remove: 'Supprimer',
    clone: 'Cloner',
    edit: 'Modifier',
    defaultRuleTitle: 'Sans titre'
  },
  RuleReorderButtons: {
    ruleMoveUpTip: 'Déplacer la règle vers le haut',
    ruleMoveDownTip: 'Déplacer la règle vers le bas'
  },
  RuleGenerator: {
    attribute: 'Attribut',
    generateButtonText: 'Classifier',
    levelOfMeasurement: 'Niveau de mesure',
    nominal: 'Nominal',
    ordinal: 'Ordinal',
    cardinal: 'Cardinal',
    numberOfRules: 'Nombre de classes',
    colorRamp: 'Palette de couleurs',
    colorSpace: 'Espace colorimétrique',
    colorRampPlaceholder: 'Choisir…',
    colorRampMinClassesWarningPre: 'La palette de couleur a besoin d\'au moins',
    colorRampMinClassesWarningPost: 'classes',
    symbolizer: 'Symbolisation',
    classification: 'Méthode de classification',
    classificationPlaceholder: 'Choisir…',
    equalInterval: 'Intervalles égaux',
    preview: 'Prévisualisation',
    numberOfRulesViaKmeans: '…affecté par la classification en k-moyennes.',
    allDistinctValues: 'Utiliser toutes les valeurs distinctes'
  },
  ColorRampCombo: {
    colorRampPlaceholder: 'Choisir…'
  },
  ColorSpaceCombo: {
    colorSpacePlaceholder: 'Choisir…'
  },
  ClassificationCombo: {
    equalInterval: 'Intervalles égaux',
    quantile: 'Quantile',
    logarithmic: 'Logarithmique',
    kmeans: 'k-moyennes'
  },
  RuleGeneratorWindow: {
    ruleGenerator: 'Classification'
  },
  IconSelectorWindow: {
    windowLabel: 'Sélectionner une icône'
  },
  IconSelector: {
    librarySelectLabel: 'Sélectionner une bibliothèque'
  },
  SLDUnitsSelect: {
    symbolizerUnitsLabel: 'Unités de symbolisation',
    symbolizerUnitsPixel: 'pixels',
    symbolizerUnitsMeter: 'mètres',
    symbolizerUnitsFoot: 'pieds'
  },
  AttributeCombo: {
    label: 'Attribut',
    placeholder: 'Sélectionner l\'attribut',
    help: 'Veuillez sélectionner un attribut'
  },
  TextFilterField: {
    label: 'Valeur',
    placeholder: 'Entrez la valeur du texte',
    help: 'Veuillez entrer un texte'
  },
  NumberFilterField: {
    label: 'Valeur',
    placeholder: 'Entrer la valeur numérique',
    help: 'Veuillez entrer un numéro.'
  },
  BoolFilterField: {
    label: 'Valeur'
  },
  UnsupportedPropertiesUtil: {
    notSupported: 'Non supporté par l\'analyseur sélectionné.',
    partiallySupported: 'Partiellement supporté par l\'analyseur sélectionné.'
  },
  FunctionNameCombo: {
    placeholder: '… choisissez GeoStylerFunction'
  },
  ...antd_fr_FR
};

export default fr_FR;
