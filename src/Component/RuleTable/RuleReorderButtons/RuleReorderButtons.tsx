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

import React from "react";
import { Button } from "antd";

import { Rule as GsRule } from "geostyler-style";

import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { CSS } from '@dnd-kit/utilities';


const ButtonGroup = Button.Group;
import _cloneDeep from "lodash/cloneDeep";
import { useGeoStylerLocale } from "../../../context/GeoStylerContext/GeoStylerContext";
import { useSortable } from "@dnd-kit/sortable";

export interface RuleReorderButtonsProps {
  /** Index of the corresponding Rule object */
  ruleIndex: number;
  /** Callback for click = move a rule position */
  onRulesMove?: (rules: GsRule[]) => void;
  /** all rules */
  rules: GsRule[];
}

/**
 * Button group to re-order positions of rules.
 */
export const RuleReorderButtons: React.FC<RuleReorderButtonsProps> = ({
  ruleIndex,
  onRulesMove,
  rules,
}) => {
  const locale = useGeoStylerLocale("RuleReorderButtons");

  const onRuleOrderChange = (moveDown: boolean) => {
    const nextRuleIndex = moveDown ? ruleIndex + 1 : ruleIndex - 1;
    const rulesClone = _cloneDeep(rules);
    // shift rule one position up / down in rules array
    rulesClone.splice(nextRuleIndex, 0, rulesClone.splice(ruleIndex, 1)[0]);

    if (onRulesMove) {
      onRulesMove(rulesClone);
    }
  };

  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({ id: ruleIndex });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div  >
      {/* ☰ */}
    </div>
  );

  return (
    <div>
      ☰
      {/* <Button
          role="button"
          name="move-rule-up"
          icon={<UpOutlined />}
          disabled={ruleIndex === 0}
          title={locale.ruleMoveUpTip}
          onClick={() => {
            onRuleOrderChange(false);
          }}
        />
        <Button
          role="button"
          name="move-rule-down"
          icon={<DownOutlined />}
          disabled={ruleIndex === rules.length - 1}
          title={locale.ruleMoveDownTip}
          onClick={() => {
            onRuleOrderChange(true);
          }}
        /> */}
    </div>
  );
};
