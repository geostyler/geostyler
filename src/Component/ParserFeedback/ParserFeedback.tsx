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

import { Alert } from 'antd';
import { ReadStyleResult, UnsupportedProperties, WriteStyleResult } from 'geostyler-style';
import React from 'react';
import { useGeoStylerLocale } from '../../context/GeoStylerContext/GeoStylerContext';

export interface ParserFeedbackProps {
  feedback: ReadStyleResult | WriteStyleResult;
}

/**
 * Checkbox field for a boolean filter value.
 */
export const ParserFeedback: React.FC<ParserFeedbackProps> = ({
  feedback
}) => {

  const locale = useGeoStylerLocale('ParserFeedback');

  if (!feedback || Object.keys(feedback).length < 1) {
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

  const getAlerts = (obj?: UnsupportedProperties) => {
    if (!obj) {
      return null;
    }
    const alerts: React.ReactNode[] = [];
    const iterate = (subObj: UnsupportedProperties, path: string[]) => {
      // Check if current object has a 'support' key
      if ('support' in subObj) {
        // create alert for this level
        let infoText = '';
        if ('info' in subObj) {
          infoText = ` - ${subObj.info}`;
        }
        const propertyPath = path.join('.');
        const supportLevel = subObj.support;
        const {
          partiallySupported,
          notSupported
        } = locale;
        const notSupportedText = supportLevel === 'partial' ? partiallySupported : notSupported;
        const message = `${propertyPath} ${notSupportedText}${infoText}`;
        alerts.push(
          <Alert
            showIcon
            key={`unsupported-${path.join('-')}`}
            type='warning'
            message={message}
          />
        );
      }

      // Continue iterating through all keys (except 'support' and 'info')
      Object.keys(subObj).forEach((key) => {
        if (key === 'support' || key === 'info') {
          return;
        }
        const value = subObj[key as keyof UnsupportedProperties];
        const currentPath = [...path, key];
        if (typeof value === 'object' && value !== null) {
          iterate(value as UnsupportedProperties, currentPath);
        }
      });
    };
    iterate(obj, []);
    return alerts;
  };

  return (
    <div className="gs-parser-feedback">
      <div className={'error-alerts'}>
        {errorAlerts}
      </div>
      <div className={'warning-alerts'}>
        {warningAlerts}
        {getAlerts(unsupportedProperties)}
      </div>
    </div>
  );
};

export default ParserFeedback;
