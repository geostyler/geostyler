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

import * as React from 'react';

import {
  Channel,
  ContrastEnhancement
} from 'geostyler-style';
import SourceChannelNameField from '../SourceChannelNameField/SourceChannelNameField';
import { Form } from 'antd';
import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';
import ContrastEnhancementField from '../ContrastEnhancementField/ContrastEnhancementField';
import GammaField from '../GammaField/GammaField';

import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import { GeoStylerLocale } from '../../../../locale/locale';
import { useGeoStylerComposition } from '../../../../context/GeoStylerContext/GeoStylerContext';

// default props
interface ChannelFieldDefaultProps {
  locale: GeoStylerLocale['ChannelField'];
  contrastEnhancementTypes: ContrastEnhancement['enhancementType'][];
}

// non default props
export interface ChannelFieldProps extends Partial<ChannelFieldDefaultProps> {
  onChange?: (channel: Channel) => void;
  sourceChannelNames?: string[];
  channel?: Channel;
}

/**
 * ChannelField to select different Channel options
 */
export const ChannelField: React.FC<ChannelFieldProps> = (props) => {

  const composition = useGeoStylerComposition('RasterChannelEditor', {});

  const composed = {...props, ...composition};

  const {
    onChange,
    locale = en_US.ChannelField,
    sourceChannelNames,
    contrastEnhancementTypes = ['histogram', 'normalize'],
    channel
  } = composed;

  const updateChannel = (key: string, value: any) => {
    let newChannel: Channel;
    if (channel) {
      newChannel = _cloneDeep(channel);
    } else {
      newChannel = {};
    }
    newChannel[key as keyof Channel] = value;

    if (onChange) {
      onChange(newChannel);
    }
  };

  const onSourceChannelNameChange = (name: string) => {
    updateChannel('sourceChannelName', name);
  };

  const onContrastEnhancementChange = (type: ContrastEnhancement['enhancementType']) => {
    const contrastEnhancement = channel?.contrastEnhancement;
    let newContrastEnhancement: ContrastEnhancement;
    if (contrastEnhancement) {
      newContrastEnhancement = _cloneDeep(contrastEnhancement);
    } else {
      newContrastEnhancement = {};
    }
    newContrastEnhancement.enhancementType = type;
    updateChannel('contrastEnhancement', newContrastEnhancement);
  };

  const onGammaChange = (gammaValue: number|string) => {
    const contrastEnhancement = channel?.contrastEnhancement;
    let newContrastEnhancement: ContrastEnhancement;
    if (contrastEnhancement) {
      newContrastEnhancement = _cloneDeep(contrastEnhancement);
    } else {
      newContrastEnhancement = {};
    }
    newContrastEnhancement.gammaValue = gammaValue as number;
    updateChannel('contrastEnhancement', newContrastEnhancement);
  };

  const sourceChannelName = _get(channel, 'sourceChannelName');
  const contrastEnhancementType = _get(channel, 'contrastEnhancement.enhancementType');
  const gamma = _get(channel, 'contrastEnhancement.gammaValue');

  return (
    <div>
      {
        composition.sourceChannelNameField?.visibility === false ? null : (
          <Form.Item
            label={locale.sourceChannelNameLabel}
          >
            <SourceChannelNameField
              onChange={onSourceChannelNameChange}
              sourceChannelName={sourceChannelName as string}
              sourceChannelNames={sourceChannelNames}
            />
          </Form.Item>
        )
      }
      {
        composition.contrastEnhancementField?.visibility === false ? null : (
          <Form.Item
            label={locale.contrastEnhancementTypeLabel}
          >
            <ContrastEnhancementField
              contrastEnhancement={contrastEnhancementType}
              contrastEnhancementOptions={contrastEnhancementTypes}
              onChange={onContrastEnhancementChange}
            />
          </Form.Item>
        )
      }
      {
        composition.gammaValueField?.visibility === false ? null : (
          <Form.Item
            label={locale.gammaValueLabel}
          >
            <GammaField
              gamma={gamma as any}
              defaultValue={composition.gammaValueField?.default}
              onChange={onGammaChange}
            />
          </Form.Item>
        )
      }
    </div>
  );
};

export default localize(ChannelField, 'ChannelField');
