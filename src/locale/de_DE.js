'use strict';

import de_DE from 'antd/lib/locale-provider/de_DE';
export default {
    GsApp: {
        graphicalEditor: 'Graphischer Editor',
        codeEditor: 'Code Editor'
    },
    GsRule: {
        removeRuleBtnText: 'Regel entfernen',
        scaleFieldSetTitle: 'Maßstab verwenden',
        filterFieldSetTitle: 'Filter verwenden',
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
        nameFieldLabel: 'Name',
        nameFieldPlaceholder: 'Name eingeben'
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
        formatSelectLabel: 'Format'
    },
    GsCircleEditor: {
        radiusLabel: 'Radius',
        fillOpacityLabel: 'Deckkraft Füllung',
        fillColorLabel: 'Füllfarbe',
        strokeColorLabel: 'Randfarbe',
        strokeWidthLabel: 'Randbreite',
        strokeOpacityLabel: 'Deckkraft Rand'
    },
    GsFillEditor: {
        fillOpacityLabel: 'Deckkraft Füllung',
        fillColorLabel: 'Füllfarbe',
        outlineColorLabel: 'Randfarbe'
    },
    GsIconEditor: {
        imageLabel: 'Quelle',
        sizeLabel: 'Größe',
        rotateLabel: 'Rotation',
        opacityLabel: 'Deckkraft'
    },
    GsLineEditor: {
        colorLabel: 'Farbe',
        widthLabel: 'Breite',
        opacityLabel: 'Deckkraft',
        dashLabel: 'Strichmuster'
    },
    GsTextEditor: {
        fieldLabel: 'Feld',
        opacityLabel: 'Deckkraft Text',
        colorLabel: 'Textfarbe',
        sizeLabel: 'Textgröße',
        offsetXLabel: 'Versatz X',
        offsetYLabel: 'Versatz Y',
        attributeComboPlaceholder: 'Feld wählen'
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
        label: 'Art',
        symbolizerKinds: {
            Circle: 'Kreis',
            Fill: 'Füllung',
            Icon: 'Icon',
            Line: 'Linie',
            Text: 'Text'
        }
    },
    GsScaleDenominator: {
        minScaleDenominatorLabelText: 'Min. Maßstab',
        maxScaleDenominatorLabelText: 'Max. Maßstab',
        minScaleDenominatorPlaceholderText: 'Min. Maßstab eingeben (Optional)',
        maxScaleDenominatorPlaceholderText: 'Max. Maßstab eingeben (Optional)'
    },
    ...de_DE
};