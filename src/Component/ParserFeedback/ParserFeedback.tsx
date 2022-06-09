/* Released under the BSD 2-Clause License
 *
 * Copyright © 2022-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

import { ExclamationCircleTwoTone, WarningTwoTone } from '@ant-design/icons';
import { Alert } from 'antd';
import { ReadStyleResult, WriteStyleResult } from 'geostyler-style';
import React, { useState } from 'react';

import './ParserFeedback.less';

export interface ParserFeedbackProps {
  feedback: ReadStyleResult | WriteStyleResult;
}

/**
 * Checkbox field for a boolean filter value.
 */
export const ParserFeedback: React.FC<ParserFeedbackProps> = ({
  feedback
}) => {

  const [showAlerts, setShowAlerts] = useState<boolean>(false);

  if (!feedback) {
    return null;
  }

  const {
    errors,
    warnings,
    unsupportedProperties
  } = feedback;

  const warningAlerts = warnings?.map((warning, index) => (
    <Alert
      showIcon
      key={`warning-${index}`}
      type='warning'
      message={warning}
    />
  ));

  const errorAlerts = errors?.map((error, index) => (
    <Alert
      showIcon
      key={`error-${index}`}
      type='error'
      message={error.message}
    />
  ));

  const strings: string[] = [];

  const getTextualRepresentation = (value: any) => {
    let text;
    if (typeof value === 'string' || value instanceof String) {
      if (value === 'none') {
        text = 'is not supported.';
      } else if (value === 'partial') {
        text = 'is only partialy supported.';
      }
    } else if (value.support) {
      if (value.support === 'none') {
        text = `is not supported. ${value.info}`;
      } else if (value.support === 'partial') {
        text = `is only partialy supported. ${value.info}`;
      }
    }
    return text;
  };

  const prepareUnsupportedProperties = (obj: any, prefix = '') => {
    Object.keys(obj)
      .forEach(key => {
        const value = obj[key];
        if (typeof value === 'string' || value instanceof String || value.support) {
          strings.push(`${prefix}${key} ${getTextualRepresentation(value)}`);
        } else {
          prepareUnsupportedProperties(value, `${key}.`);
        }
      });
  };

  if (unsupportedProperties) {
    prepareUnsupportedProperties(unsupportedProperties);
  }

  const unsupportedPropertiesAlerts = strings?.map((unsupportedProperty, index) => (
    <Alert
      showIcon
      key={`unsupportedProperty-${index}`}
      type='warning'
      message={unsupportedProperty}
    />
  ));

  const toggleAlerts = () => {
    setShowAlerts(!showAlerts);
  };

  const hasAlerts = errorAlerts?.length > 0;
  const hasWarnings = warningAlerts?.length > 0 || unsupportedPropertiesAlerts?.length > 0;
  const alertExtraClass = showAlerts ? 'alert-visible' : 'alert-hidden';

  return (
    <div className="gs-parser-feedback">
      { hasAlerts && <WarningTwoTone twoToneColor="#ff4d4f" onClick={toggleAlerts} /> }
      { hasWarnings && <ExclamationCircleTwoTone twoToneColor="#faad14" onClick={toggleAlerts} /> }
      <div className={'error-alerts ' + alertExtraClass}>
        {errorAlerts}
      </div>
      <div className={'warning-alerts ' + alertExtraClass}>
        {warningAlerts}
        {unsupportedPropertiesAlerts}
      </div>
    </div>
  );
};

export default ParserFeedback;
