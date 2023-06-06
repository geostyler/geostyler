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
import { InterpolationMode } from 'chroma-js';

import {
  Rule
} from 'geostyler-style';

import './RuleGeneratorWindow.less';
import { Modal, ModalProps } from 'antd';

import { RuleGenerator } from './RuleGenerator';

import _isEqual from 'lodash/isEqual';
import _isFinite from 'lodash/isFinite';
import { useGeoStylerLocale } from '../../context/GeoStylerContext/GeoStylerContext';

export interface RuleGeneratorWindowProps extends Partial<ModalProps> {
  onClose?: () => void;
  onRulesChange?: (rules: Rule[]) => void;
  colorRamps?: {
    [name: string]: string[];
  };
  useBrewerColorRamps?: boolean;
  colorSpaces?: (InterpolationMode)[];
}

export const RuleGeneratorWindow: React.FC<RuleGeneratorWindowProps> = ({
  onClose,
  onRulesChange,
  ...passThroughProps
}) => {

  const locale = useGeoStylerLocale('RuleGeneratorWindow');

  return (
    <Modal
      className="rule-generator-window"
      title={locale.ruleGenerator}
      onCancel={onClose}
      width={800}
      footer={false}
      centered={true}
      {...passThroughProps}
    >
      <RuleGenerator
        onRulesChange={onRulesChange}
      />
    </Modal>
  );
};
