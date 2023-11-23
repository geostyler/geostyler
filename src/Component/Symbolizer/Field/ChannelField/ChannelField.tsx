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

import React from 'react';

import {
  Channel,
  ContrastEnhancement
} from 'geostyler-style';
import { SourceChannelNameField } from '../SourceChannelNameField/SourceChannelNameField';
import { Form } from 'antd';
import { ContrastEnhancementField } from '../ContrastEnhancementField/ContrastEnhancementField';
import { GammaField, GammaFieldProps } from '../GammaField/GammaField';

import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import {
  InputConfig,
  useGeoStylerComposition,
  useGeoStylerLocale
} from '../../../../context/GeoStylerContext/GeoStylerContext';
import { getFormItemConfig } from '../../../../Util/FormItemUtil';

export interface ChannelFieldComposableProps {
  sourceChannelNameField?: {
    visibility?: boolean;
  };
  // TODO add support for default values in ContrastEnhancementField
  contrastEnhancementField?: {
    visibility?: boolean;
  };
  gammaValueField?: InputConfig<GammaFieldProps['gamma']>;
}

export interface ChannelFieldInternalProps {
  contrastEnhancementTypes?: ContrastEnhancement['enhancementType'][];
  onChange?: (channel: Channel) => void;
  sourceChannelNames?: string[];
  channel?: Channel;
}

export type ChannelFieldProps = ChannelFieldInternalProps & ChannelFieldComposableProps;

/**
 * ChannelField to select different Channel options
 */
export const ChannelField: React.FC<ChannelFieldProps> = (props) => {

  const composition = useGeoStylerComposition('ChannelField');
  const composed = { ...props, ...composition };
  const {
    channel,
    contrastEnhancementTypes = ['histogram', 'normalize'],
    onChange,
    sourceChannelNames,
    contrastEnhancementField,
    gammaValueField,
    sourceChannelNameField
  } = composed;

  const locale = useGeoStylerLocale('ChannelField');

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

  const onGammaChange = (gammaValue: ContrastEnhancement['gammaValue']) => {
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

  const itemConfig = getFormItemConfig();

  return (
    <div>
      {
        sourceChannelNameField?.visibility === false ? null : (
          <Form.Item
            {...itemConfig}
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
        contrastEnhancementField?.visibility === false ? null : (
          <Form.Item
            {...itemConfig}
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
        gammaValueField?.visibility === false ? null : (
          <Form.Item
            {...itemConfig}
            label={locale.gammaValueLabel}
          >
            <GammaField
              gamma={gamma as any}
              defaultValue={gammaValueField?.default}
              onChange={onGammaChange}
            />
          </Form.Item>
        )
      }
    </div>
  );
};
